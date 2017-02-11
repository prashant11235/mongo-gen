import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class BinaryOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$bin"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = new Map([["length", 10], ["type", 0]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // decode limits
    const length = this.decode(parsedOptions.length);
    // const type = this.decode(parsedOptions.type);

    assert(length > 0);

    // return coordinate by using random numbers between limits
    const binData = "";
    return binData;
  }
}
