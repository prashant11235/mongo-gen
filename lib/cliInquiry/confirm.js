import inquirer from "inquirer";

export function getConfirmOption(question, callback) {

  const questions = [
    {
      "name": "confirmationResponse",
      "type": "confirm",
      "message": question
    }
  ];

  inquirer.prompt(questions).then(answers => {

    return callback(answers.confirmationResponse);
  });
}
