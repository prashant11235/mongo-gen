import inquirer from "inquirer";

export function getMongoAuthDetails(callback) {
  const questions = [
    {
      "name": "userName",
      "type": "input",
      "message": "Enter your Mongo DB username:",
      validate(value) {
        if (value.length) {
          return true;
        }

        return "Please enter your Mongo DB username";
      }
    },
    {
      "name": "password",
      "type": "password",
      "message": "Enter your password:",
      validate(value) {
        if (value.length) {
          return true;
        }

        return "Please enter your password";
      }
    }
  ];

  inquirer.prompt(questions).then(answers => {

    return callback(answers);
  });
}
