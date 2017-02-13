import inquirer from "inquirer";

export function getMongoDetails(callback) {
  const questions = [
    {
      "name": "host",
      "type": "input",
      "message": "Enter your Mongo DB host name:",
      validate(value) {
        if (value) {
          return true;
        }

        return "Please enter your Mongo DB host name:";
      }
    },
    {
      "name": "port",
      "type": "input",
      "message": "Enter your Mongo DB port:",
      validate(value) {
        if (value) {
          return true;
        }

        return "Please enter your Mongo DB port";
      }
    },
    {
      "name": "databaseName",
      "type": "input",
      "message": "Enter your Mongo DB database name:",
      validate(value) {
        if (value) {
          return true;
        }

        return "Please enter your Mongo DB database name";
      }
    },
    {
      "name": "collectionName",
      "type": "input",
      "message": "Enter name of Mongo DB collection:",
      validate(value) {
        if (value) {
          return true;
        }

        return "Please enter name of Mongo DB collection";
      }
    }
  ];

  inquirer.prompt(questions).then(answers => {

    return callback(answers);
  });
}
