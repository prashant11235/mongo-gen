import assert from "assert";
import BaseOperator from "./BaseOperator";
import Counter from "../utils/counter";

export default class IncOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$inc"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = {"start": 0, "step": 100};
  }

  handler(options) {

    const parsedOptions = this.parseOptions(options);

    const start = this.decode(parsedOptions.start);
    const step = this.decode(parsedOptions.step);

    // initialize counter on first use
    if (!this.counter) {
      this.counter = new Counter(start, step);
    }

    // return a random value between max and min value
    return this.counter.next();
  }
}
