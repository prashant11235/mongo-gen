import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as utils from "../utils/utils";
import * as randy from "randy";

export default class BinaryOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$bin"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = {"length": 10, "type": 0};
  }

  handler(options) {

    const parsedOptions = this.parseOptions(options);

    // decode limits
    const length = this.decode(parsedOptions.length);

    assert(length > 0);

    // return coordinate by using random numbers between limits
    const binDataStr = () => {
      let sampleStr = "";
      for (let index = 0; index < length; index++) {
        sampleStr += randy.choice(utils.getAlphaNumericArray());
      }

      return sampleStr;
    };

    const binData = utils.stringToArrayBuffer(binDataStr);
    return binData;
  }
}
