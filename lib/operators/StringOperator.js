import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as utils from "../utils/utils";
import * as randy from "randy";

export default class StringOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["string", "$str"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = {"length": 10, "mask": null};
  }

  handler(options) {

    const parsedOptions = this.parseOptions(options);

    // decode min and max first
    const length = this.decode(parsedOptions.length);
    let mask = this.decode(parsedOptions.mask);

    if (mask === null) {
      mask = Array(length).join(".");
    }

    assert(length > 0);
    const string = () => {
      let sampleStr = "";
      for (let index = 0; index < length; index++) {
        sampleStr += randy.choice(utils.getAlphaNumericArray());
      }

      return sampleStr;
    };
    return string;
  }
}
