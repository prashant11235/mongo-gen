import assert from "assert";
import DateTimeOperator from "./DateTimeOperator";
import * as randy from "randy";
import * as ObjectID from "bson-objectid";

/**
 * with no parameters, just generate a new ObjectId. If min and/or max
 * are provided, handle like DateTimeOperator and replace the timestamp
 * portion in the ObjectId with the random date and time.
 */
export default class ObjectIdOperator extends DateTimeOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$objectid", "$oid"];
    this.dictFormat = true;
    this.stringFormat = true;
    this.defaults = {"min": 0, "max": 100};
  }

  handler(options) {

    const parsedOptions = this.parseOptions(options);

    // decode min and max first
    let minTime = this.decode(parsedOptions.min);
    let maxTime = this.decode(parsedOptions.max);

    if (minTime === null && maxTime === null) {
      return ObjectID();
    }

    minTime = this.parseDate(minTime || 0);
    maxTime = this.parseDate(maxTime || new Date());

    assert(minTime <= maxTime);

    // generate random epoch number
    const epoch = randy.randInt(minTime, maxTime);
    const oid = ObjectID(epoch);

    return oid;
  }
}
