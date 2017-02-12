import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class PickOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$pick"];
    this.dictFormat = true;
    this.stringFormat = false;
    this.defaults = {"array": [], "element": {}};
  }

  handler(options) {

    const parsedOptions = this.parseOptions(options);

    // decode array and element
    const array = this.decode(parsedOptions.array);
    const element = this.decode(parsedOptions.element);

    if (array.length <= element) {
      return "$missing";
    }

    return array[element];
  }
}
