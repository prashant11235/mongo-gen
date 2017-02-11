import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class PickOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$pick"];
    this.dictFormat = true;
    this.stringFormat = false;
    this.defaults = new Map([["array", []], ["element", {}]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // decode min and max first
    const array = this.decode(parsedOptions.array);
    const element = this.decode(parsedOptions.element);

    if (array.length <= element) {
      return "$missing";
    }

    return array[element];
  }
}
