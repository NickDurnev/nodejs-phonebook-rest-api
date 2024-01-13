const path = require("path");
const fs = require("fs");
const hbs = require("handlebars");

const createEmail = (templateData, filePath) => {
  // Read the Handlebars template
  const source = fs.readFileSync(path.join(process.cwd(), filePath), "utf-8");

  // Compile the Handlebars template
  const template = hbs.compile(source);

  // Render the template with the data
  return template(templateData);
};

module.exports = { createEmail };
