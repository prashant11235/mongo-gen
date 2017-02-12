import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as randy from "randy";

export default class FloatOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$float"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = {"min": 0.0, "max": 1.0};
  }

  handler(options) {

    const parsedOptions = this.parseOptions(options);

    // decode min and max first
    const minValue = this.decode(parsedOptions.min);
    const maxValue = this.decode(parsedOptions.max);

    assert(minValue <= maxValue);

    // return a random value between max and min value
    const value = randy.random() * (maxValue - minValue) + minValue;
    return value;
  }
}
