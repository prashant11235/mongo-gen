import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class ArrayOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$array"];
    this.dictFormat = true;
    this.defaults = new Map([["of", null], ["number", 10]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // decode number
    const number = this.decode(parsedOptions.number);

    // build array of 'of' elements, but don't evaluate them yet - not relevant in JS world
    return new Array(number);
  }
}
