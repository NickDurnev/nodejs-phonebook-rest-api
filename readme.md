# Phonebook REST API

This repository contains the source code for the REST API of the app Phonebook. It is built with Node.js, Express, Mongoose and other dependencies listed in `package.json`.
The API is used to access and manipulate data related to contacts and users in the Phonebook app. It consists of several endpoints that allow you to perform CRUD operations on contacts, authenticate users, comfirm email and change password service, using email sending.

## Technologies Used

- Express
- Mongoose
- Google Cloud
- Sendgrid
- Jest
- Multer
- Jimp
- Nanoid
- Passport-JWT
- Joi
- HTTP Errors

## Scripts Usage

This project uses the following scripts:

```bash
npm start
```

Starts the server.

```bash
npm run start:dev
```

Starts the development server.

```bash
npm run lint
```

Lints the code for any errors or warnings.

```bash
npm run lint:fix
```

Automatically fix any linting errors that are found in a project

```bash
npm run test
```

Run Jest tests.
