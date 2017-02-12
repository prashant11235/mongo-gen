import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as randy from "randy";

export default class NumberOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$number", "$num"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = {"min": 0, "max": 100};
  }

  handler(options) {

    const parsedOptions = this.parseOptions(options);

    const minValue = this.decode(parsedOptions.min);
    const maxValue = this.decode(parsedOptions.max);

    assert(minValue <= maxValue);

    // return a random value between max and min value
    return randy.randInt(minValue, maxValue);
  }
}
