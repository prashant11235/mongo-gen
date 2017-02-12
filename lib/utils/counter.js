export default class Counter {

  constructor(start, step) {

    this.start = start;
    this.step = step;
    this.current = start;
  }

  next() {

    this.current += this.step;
    return this.current;
  }
}
