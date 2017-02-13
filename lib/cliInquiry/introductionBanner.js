import * as pkg from "../../package.json";
import chalk from "chalk";
import * as figlet from "figlet";

export function introduce() {

  // Display the package name
  console.log(
    chalk.yellow(
      figlet.textSync(pkg.name, {
        "horizontalLayout": "full"})
    )
  );
}
