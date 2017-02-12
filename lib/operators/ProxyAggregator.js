import {default as AgeOperator} from "./AgeOperator";
import {default as ArrayOperator} from "./ArrayOperator";
import {default as BinaryOperator} from "./BinaryOperator";
import {default as ChooseOperator} from "./ChooseOperator";
import {default as ConcatOperator} from "./ConcatOperator";
import {default as CoordinateOperator} from "./CoordinateOperator";
import {default as DateTimeOperator} from "./DateTimeOperator";
import {default as FloatOperator} from "./FloatOperator";
import {default as GaussOperator} from "./GaussOperator";
import {default as IncOperator} from "./IncOperator";
import {default as MissingOperator} from "./MissingOperator";
import {default as NumberOperator} from "./NumberOperator";
import {default as ObjectIdOperator} from "./ObjectIdOperator";
import {default as PickOperator} from "./PickOperator";
import {default as PointOperator} from "./PointOperator";
import {default as StringOperator} from "./StringOperator";

// Use ES6 Object Literal Property Value Shorthand to maintain a map
// where the keys share the same names as the classes themselves
const operatorClasses = {
  AgeOperator,
  ArrayOperator,
  BinaryOperator,
  ChooseOperator,
  ConcatOperator,
  CoordinateOperator,
  DateTimeOperator,
  FloatOperator,
  GaussOperator,
  IncOperator,
  MissingOperator,
  NumberOperator,
  ObjectIdOperator,
  PickOperator,
  PointOperator,
  StringOperator
};

class ProxyAggregator {
  constructor(className, opts) {
    return new operatorClasses[className](opts);
  }
}

export default ProxyAggregator;
