import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class ConcatOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$concat"];
    this.dictFormat = true;
    this.defaults = {"items": [], "sep": ""};
  }

  handler(options) {

    let parsedOptions;

    // options can be arbitrary long list, store as "items" in options dictionary
    if (options instanceof Array) {
      parsedOptions = {"items": options};
    }

    parsedOptions = this.parseOptions(parsedOptions);

    // evaluate items
    const items = this.decode(parsedOptions.items);
    const sep = this.decode(parsedOptions.sep);

    // return concatenated string
    let result = "";
    for (const string in items) {

      if (items.hasOwnProperty(string)) {
        result += (sep + string);
      }
    }
    return result;
  }
}
