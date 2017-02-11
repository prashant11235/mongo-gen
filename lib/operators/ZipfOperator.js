import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class ZipfOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["zipf", "$zeta"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = new Map([["alpha", 2.0]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // decode distribution parameter
    const alpha = this.decode(parsedOptions.alpha);

    // return a random value between max and min value
    return zipf(alpha - 1);
  }
}
