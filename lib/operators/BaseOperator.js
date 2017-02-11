import assert from "assert";
import * as utf8 from "utf8";
import * as utils from "../utils/utils";

export default class BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    this.names = [];
    this.dictFormat = false;
    this.stringFormat = false;
    this.defaults = {};
    this.decode = decodeMethod;
  }

  parseOptions(options = {}) {
    let parsed = Object.assign({}, this.defaults);

    if (options instanceof Array) {

      parsed = Object.keys(this.defaults).map((enumerable, index) => {
        return [enumerable, options[index]];
      });
    } else if (options !== null && typeof options === "object") {

      parsed = Object.assign(parsed, options);
    }

    for (const property in parsed) {

      if (parsed.hasOwnProperty(property)) {

        const value = parsed[property];
        if (utils.hasUnicode(value)) {

          parsed[property] = utf8.encode(value);
        }
      }
    }

    return parsed;
  }
}
