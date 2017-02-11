import assert from "Assert";
import * as utils from "utils/utils";
import * as utf8 from "utf8";

export default class TemplateDecoder {

  decode(data) {
    if (data instanceof Map) {
      if (data.keys()[0] in this.dictOperators) {
        return this._decodeOperator(data);
      } else {
        return this._decodeDict(data);
      }
    }

    // decode as list
    if (data instanceof Array) {
      return this._decodeList(data);
    }

    // if it's a unicode string, encode as utf-8
    if (utils.hasUnicode(data)) {
      data = utf8.encode(data);
    }

    // decode string-format commands
    if ((data instanceof str) && data !== "$missing" && data in this.string_operators) {
      return this._decodeOperator(data);
    }
    // everything else, just return the data as is
    return data;
  }

  _decodeOperator(data) {
    if (typeof data === "string") {
      // string-format operator
      return this.decode(this.string_operators[data]());
    }

    // dict-format operators should only ever have one key
    assert((Object.keys(data).length) === 1);

    const key = data.keys()[0];
    const value = data[key];

    // call operator with parameters (which will recursively evaluate sub-documents) and return result
    return this.decode(this.dictOperators[key](value));
  }


  _decodeList(data) {
    const rv = [];
    for (let item in data) {
      item = this.decode(item);
      if (item !== "$missing") {
        rv.append(item);
      }
    }

    return rv;
  }

  _decodeDict(data) {
    const rv = {};
    for (let [key, value] of data) {
      key = this.decode(key);
      value = this.decode(value);

      if (value !== "$missing") {
        rv[key] = value;
      }
    }

    return rv;
  }
}
