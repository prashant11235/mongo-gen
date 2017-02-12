import assert from "assert";
import * as utils from "./utils/utils";
import * as utf8 from "utf8";
import * as operatorClasses from "./operators";
import ProxyAggregator from "./operators/ProxyAggregator";

export default class TemplateDecoder {

  constructor() {

    // add all operators classes from the operators module, pass in decode method
    this.operators = [];

    for (const operatorClass in operatorClasses) {
      if (operatorClasses.hasOwnProperty(operatorClass)) {

        // create a bounded context copy of decode function so that scope is retained
        const boundedDecode = this.decode.bind(this);
        const operatorInstance = new ProxyAggregator(operatorClass, boundedDecode);
        this.operators.push(operatorInstance);
      }
    }

    // associative-map with keys as operator name and value as operator instance
    this.stringOperators = {};
    this.dictOperators = {};

    for (const operator of this.operators) {
      // populate string operators
      if (operator.stringFormat) {
        for (const name of operator.names) {
          this.stringOperators[name] = operator;
        }
      }

      // populate dict operators
      if (operator.dictFormat) {
        for (const name of operator.names) {
          this.dictOperators[name] = operator;
        }
      }
    }
  }

  decode(data) {

    if (data === null) {
      return data;
    }

    if (Object.prototype.toString.call(data) === "[object Object]") {
      if (this.dictOperators.hasOwnProperty(Object.keys(data)[0])) {
        return this._decodeOperator(data);
      }

      return this._decodeDict(data);
    }

    // decode as list
    if (data instanceof Array) {
      return this._decodeList(data);
    }

    // if it's a unicode string, encode as utf-8
    let encodedData = data;
    if (typeof data === "string" && utils.hasUnicode(data)) {
      encodedData = utf8.encode(data);
    }

    // decode string-format commands
    if ((typeof encodedData === "string") && encodedData !== "$missing" && this.stringOperators[encodedData]) {
      return this._decodeOperator(encodedData);
    }

    // everything else, just return the data as is
    return encodedData;
  }

  _decodeOperator(data) {

    if (typeof data === "string") {
      // string-format operator
      return this.decode(this.stringOperators[data].handler());
    }

    // dict-format operators should only ever have one key
    assert((Object.keys(data).length) === 1);

    const key = Object.keys(data)[0];
    const value = data[key];

    // call operator with parameters (which will recursively evaluate sub-documents) and return result
    return this.decode(this.dictOperators[key].handler(value));
  }


  _decodeList(data) {
    const rv = [];
    for (let item of data) {
      item = this.decode(item);
      if (item !== "$missing") {
        rv.push(item);
      }
    }

    return rv;
  }

  _decodeDict(data) {
    const rv = {};
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];

        key = this.decode(key);
        value = this.decode(value);

        if (value !== "$missing") {
          rv[key] = value;
        }
      }
    }

    return rv;
  }
}
