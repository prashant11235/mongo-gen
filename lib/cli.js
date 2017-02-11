import Assert from "assert";
import * as pkg from "../package.json";

export default class MongoGen {

  constructor() {

  }

  initialize() {

  }

  print(options) {

    Assert(options, "options is required");

    if (options && options.message && typeof options.message === "string") {

      return console.log("[", pkg.name.white, "]", options.message.toString().cyan);
    }

    // else-case
    throw new Error("no message defined to print!");
  }
}
