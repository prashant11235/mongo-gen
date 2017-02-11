import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as gaussian from "gaussian";

export default class GaussOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$gauss", "$normal"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = new Map([["mean", 0.0], ["std", 1.0]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // decode min and max first
    const mean = this.decode(parsedOptions.mean);
    const variance = this.decode(parsedOptions.std);

    // return a pseudo-random value
    const distribution = gaussian(mean, variance);
    return distribution.ppf(Math.random());
  }
}
