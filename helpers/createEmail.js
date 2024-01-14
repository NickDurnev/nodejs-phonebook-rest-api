const path = require("path");
const fs = require("fs");
const hbs = require("handlebars");

function createEmail(templateData) {
  // Read the Handlebars template
  const source = fs.readFileSync(
    path.join(process.cwd(), "./templates/verifyEmail.hbs"),
    "utf-8"
  );

  // Compile the Handlebars template
  const template = hbs.compile(source);

  // Render the template with the data
  return template(templateData);
}

module.exports = { createEmail };
