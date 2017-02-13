import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import * as utils from "../utils/utils";

export function getTemplate(callback) {

  const returnMessage = "Please enter template file path or the template JSON:";
  let templateData;

  const questions = [
    {
      "name": "template",
      "type": "input",
      "message": "Enter template file path or the template JSON:",
      validate(template) {

        // if json is directly provided try to parse it
        if (template.startsWith("{")) {
          try {
            templateData = JSON.parse(template);
          } catch (exception) {
            console.log(chalk.red(`Error in parsing provided json ${exception.message}`));
            return returnMessage;
          }
          return true;
        }

        // read the file path provided
        try {
          const contents = fs.readFileSync(template, "utf8");

          try {
            templateData = JSON.parse(contents);
          } catch (exception) {
            console.log(chalk.red(`Error in parsing provided json ${exception.message}`));
            return returnMessage;
          }
          return true;
        } catch (exception) {
          // Error in reading file
          console.log(chalk.red(`Error in reading file with path provided ${exception.message}`));
          return returnMessage;
        }
      }
    },
    {
      "name": "documentCount",
      "type": "input",
      "message": "Enter number of documents to generate:",
      validate(value) {
        if (!utils.isInteger(value)) {
          return false;
        }

        return true;
      }
    }
  ];

  inquirer.prompt(questions).then(answers => {
    const intDocumentCount = parseInt(Number(answers.documentCount), 10);
    return callback(templateData, intDocumentCount);
  });
}
