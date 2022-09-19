const httpMocks = require("node-mocks-http");
const bcrypt = require("bcryptjs");
const ctrUsers = require("../controllers/users");
const User = require("../schemas/users");
const service = require("../service/users");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const user = {
  id: "123",
  email: "bender999@gmail.com",
  password: "Fallout#123",
  subscription: "starter",
};

const email = "bender999@gmail.com";
const password = "Fallout#123";

const req = httpMocks.createRequest({
  method: "POST",
  body: {
    email: email,
    password: password,
  },
});

const res = httpMocks.createResponse();

describe("login", () => {
  beforeAll(async () => {
    const token = jwt.sign({ id: user.id, email: user.email }, secret);

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);

    jest
      .spyOn(bcrypt, "compare")
      .mockImplementationOnce(async () => password === user.password);

    jest.spyOn(service, "addToken").mockImplementationOnce(async () => {
      return { token: token, ...user };
    });

    const mNext = jest.fn();

    await ctrUsers.login(req, res, mNext);
  });
  test("should return status 200 ", () => {
    expect(res.statusCode).toEqual(200);
  });
  test("should return token", () => {
    const { token } = res._getJSONData();
    expect(token).toBeDefined();
  });
  test("should return token", () => {
    const { user } = res._getJSONData();
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
