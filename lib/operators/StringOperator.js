import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class StringOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["string", "$str"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = new Map([["length", 10], ["mask", null]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // decode min and max first
    const length = this.decode(parsedOptions.length);
    let mask = this.decode(parsedOptions.mask);

    if (mask === null) {
      mask = "." * length;
    }

    assert(length > 0);

    const result = "";
    return result;
  }
}
