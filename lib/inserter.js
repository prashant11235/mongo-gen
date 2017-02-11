export default class MongoInserter {

  constructor(collection) {
    this.collection = collection;
    this.data = [];
    this.maxThreads = 6;
    this.currentThreads = 0;
    this.batchSize = 5000;
    this.queue = 0;
    this.inserted = 0;
    this.startTime = Date.now();
  }

  add(data) {
    this.data.push(data);
  }

  insert(force) {
    if (this.data.length >= this.batchSize || force) {
      if (this.currentThreads >= this.maxThreads) {
        this.queue++;
        return;
      }
      this.currentThreads++;
      console.log(`Threads: ${this.currentThreads}`);
      this.collection.insert(this.data.splice(0, this.batchSize), {"safe": true}, () => {
        this.inserted += this.batchSize;
        const currentTime = Date.now();
        const workTime = Math.round((currentTime - this.startTime) / 1000);
        console.log(`Speed: ${this.inserted / workTime} per sec`);
        this.currentThreads--;
        if (this.queue > 0) {
          this.queue--;
          this.insert();
        }
      });
    }
  }
}
