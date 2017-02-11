import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as randy from "randy";
import Moment from "moment";

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

    let returnValue;

    if (typeof input === "string") {
      // string needs conversion, try parsing with dateutil's parser
      let date;

      try {

        date = Moment(input).unix();
      } catch (exception) {

        throw new Error(`Can't parse date/time format for ${input}`);
      }

      returnValue = date;
    } else {
      returnValue = input;
    }

    return returnValue;
  }
}
