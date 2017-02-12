import assert from "assert";
import BaseOperator from "./BaseOperator";

export default class CoordinateOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$coordinates", "$coordinate", "$coord", "$geo"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = {"long_lim": [-180, 180], "lat_lim": [-90, 90]};
  }

  handler(options) {

    const parsedOptions = this.parseOptions(options);

    // evaluate limits
    const longLimit = this.decode(parsedOptions.long_lim);
    const latLimit = this.decode(options.lat_lim);

    // return coordinate by using random numbers between limits
    return [{"$float": longLimit}, {"$float": latLimit}];
  }
}
