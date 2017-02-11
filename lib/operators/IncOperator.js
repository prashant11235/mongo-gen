import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class IncOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$inc"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = new Map([["start", 0], ["step", 100]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // initialize counter on first use


    // decode min and max first
    const minValue = this.decode(parsedOptions.min);
    const maxValue = this.decode(parsedOptions.max);

    assert(minValue <= maxValue);

    // return a random value between max and min value
    return this.counter.next();
  }
}
