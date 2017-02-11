import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as randy from "randy";

export default class MissingOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$missing"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = new Map([["percent", 100], ["ifnot", null]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // decode min and max first
    const percent = this.decode(parsedOptions.percent);

    // return a random value between max and min value
    let returnValue;

    if (randy.randInt(1, 100) <= percent) {
      returnValue = "$missing";
    } else {

      // ifnot is not yet evaluated, leave that up to another operator
      returnValue = parsedOptions.ifnot;
    }

    return returnValue;
  }
}
