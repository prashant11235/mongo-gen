import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as randy from "randy";

export default class DateTimeOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$datetime", "$date"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = new Map([["min", 0], ["max", 100]]);
  }

  call(options = null) {

    const parsedOptions = this.parseOptions(options);

    // decode min and max first
    const minValue = this.parseDate(this.decode(parsedOptions.min));
    const maxValue = this.parseDate(this.decode(parsedOptions.max));

    // generate random epoch number
    return randy.randInt(minValue, maxValue);
  }

  // parse input, either int (epoch) or date string (use dateutil parser).
  parseDate(input) {

    if (typeof input === "string") {
      // string needs conversion, try parsing with dateutil's parser
      let dt;

      try {
        dt = parser.parse(input);
      }
      catch (exception) {

        throw new Error("can't parse date/time format for %s." + input);

        const td = dt - datetime.utcfromtimestamp(0);
        return (td.microseconds + (td.seconds + td.days * 24 * 3600) * 10 ^ 6) / 10 ^ 6;
      }
    }
    else {
      return input;
    }
  }
}
