import assert from "assert";
import BaseOperator from "./BaseOperator";
import * as randy from "randy";

export default class ChooseOperator extends BaseOperator {

  constructor(decodeMethod) {

    assert(decodeMethod, "decodeMethod is a required argument");

    super(decodeMethod);

    this.names = ["$choose"];
    this.dictFormat = true;
    this.defaults = new Map([["from", []], ["weights", null]]);
  }

  call(options = null) {

    let parsedOptions;
    // options can be arbitrary long list, store as "from" in options dictionary
    if (options instanceof Array) {
      parsedOptions = {"from": options};
    }

    parsedOptions = this.parseOptions(parsedOptions);

    // decode min and max first
    const choices = parsedOptions.from;
    const weights = this.decode(parsedOptions.weight);

    if (!weights) {

      // pick one choice, uniformly distributed, but don't evaluate yet
      return randy.choice(choices);
    } else {

      assert(weights.length === choices.length);
      let totalWeight = 0;
      let accWeightItems = [];

      const zipChoiceWeight = Object.keys(choices).map((enumerable, index) => {
        return [enumerable, weights[index]];
      });

      for (const [item, weight] in zipChoiceWeight) {
        totalWeight += weight;
        accWeightItems.append((totalWeight, item));
      }

      const pick = randy.random() * totalWeight;
      for (const [weight, item] in accWeightItems) {
        if (weight >= pick) {

          return item;
        }
      }
    }
  }
}
