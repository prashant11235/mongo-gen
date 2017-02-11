import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class PointOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$point"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = new Map([["long_lim", [-180, 180]], ["lat_lim", [-90, 90]]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // evaluate limits
    const longLimit = this.decode(parsedOptions.long_lim);
    const latLimit = this.decode(parsedOptions.lat_lim);

    // return coordinate by using random numbers between limits
    return {"type": "Point", "coordinates": {"$coord": [longLimit, latLimit]}};
  }
}
