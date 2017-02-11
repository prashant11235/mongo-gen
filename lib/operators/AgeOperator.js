import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as gaussian from "gaussian";

export default class AgeOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$age"];
    this.dictFormat = false;
  }

  call() {

    // return a pseudo-random integer value
    const distribution = gaussian(36, 10);

    return Math.trunc(distribution.ppf(Math.random()));
  }
}
