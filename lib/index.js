import program from "commander";
// import * as colors from "colors";
import * as pkg from "../package.json";
// import * as cli from "./cli.js";
import chalk from "chalk";
import * as clear from "clear";
import * as figlet from "figlet";
// import co from "co";
// import prompt from "co-prompt";
// import progressBar from "progress";
// import MongoInserter from "./inserter.js";
import * as MongoDb from "mongodb";
import Assert from "assert";
import fs from "fs";
import TemplateDecoder from "./templateDecoder";

const MongoClient = MongoDb.MongoClient;
// const Server = MongoDb.Server;

clear.default();

program.version(pkg.version)
  .option("-t, --template <required>", "template for data generation, JSON or file")
  .option("-n, --number <n>", "number of documents to be inserted")
  .option("-h, --host <required>", "mongod/s host to import data, default=localhost")
  .option("-p, --port <required>", "mongod/s port to import data, default=27017")
  .option("-d, --database <required>", "database D to insert data, default=test")
  .option("-c, --collection <required>", "collection C to import data, default=mgendata")
  .option("-dr, --drop [optional]", "drop collection before inserting data")
  .option("-s, --stdout [optional]", "prints data to stdout instead of inserting to mongod")
  .option("-pre, --pretty [optional]", "if set, prettyfies the output to stdout (indented), requires --stdout")
  .option("-w, --write-concern [optional]", "write concern for inserts, default=1")
  .option("-pro, --processes [optional]", "specify number of processes (# cpus by default)");

program.on("--help", () => {
  console.log(" Examples:");
  console.log("");
  console.log(`$ ${pkg.name} --message hello`);
});

program.parse(process.argv);

function introduce() {
  // Display the package name
  console.log(
    chalk.yellow(
      figlet.textSync(pkg.name, {
        "horizontalLayout": "full"})
    )
  );
}

introduce();

function insertManager(url, collectionName) {
  MongoClient.connect(url, (err, db) => {
    Assert.equal(null, err);
    console.log("Connected correctly to server");

    const collection = db.collection(collectionName);

    collection.insertMany([
      {"sample": 1}, {"sample": 2}, {"sample": 3}
    ], (insertErr, result) => {
      Assert.equal(insertErr, null);
      Assert.equal(3, result.result.n);
      Assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the document collection");
    });

    /*
     db.collection(collectionName, (error, collection) => {
     if (!error) {
     const inserter = new MongoInserter(collection);
     setInterval(function () {
     for (let i = 0; i < numDocuments; i++) {
     inserter.add(insertObj);
     }
     inserter.insert();
     }, 0);
     }
     }); */
  });
}

function templateParser(template, documentCount) {

  let templateVar;

  if (template.startsWith("{")) {
    // not a file
    templateVar = JSON.parse(template);
  } else {
    try {

      fs.readFile(template, "utf8", function (err, contents) {

        if (!err) {
          templateVar = JSON.parse(contents);
          const documents = [];
          const decoder = new TemplateDecoder();

          for (let index = 0; index < documentCount; index++) {
            const doc = decoder.decode(templateVar);
            console.log(`Helper : ${JSON.stringify(doc)}`);
            documents.push(doc);
          }

          return documents;
        }
      });
    } catch (exception) {
      console.log("can't parse template");
    }
  }
}

if (process.argv.length === 2) {

  program.help();
} else {

  try {

    const insertObj = {
      "sample": "sample"
    };

    const host = program.host ? program.host : "localhost";
    const port = program.port ? program.port : "27017";
    const databaseName = program.database ? program.database : "test";
    const collectionName = program.collection ? program.collection : "mongo-gen-test";
    const template = program.template ? program.template : insertObj;
    const numDocuments = program.number ? program.number : 5;

    console.log(`Host: ${host}, Port: ${port}, database: ${databaseName}, collection: ${collectionName}, template: ${template}
    , numDocuments: ${numDocuments}`);

    const url = `mongodb://${host}:${port}/${databaseName}`;
    const documents = templateParser(template, numDocuments);

    if (documents && documents.length && documents.length > 0) {
      insertManager(url, collectionName);
    }

  } catch (_error) {
    console.log("[", pkg.name, "]", _error.toString());
  }
}
