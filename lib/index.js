import program from "commander";
// import * as colors from "colors";
import * as pkg from "../package.json";
// import * as cliInquiry from "./cliInquiry.js";
import * as clear from "clear";
// import co from "co";
// import prompt from "co-prompt";
// import progressBar from "progress";
// import MongoInserter from "./inserter.js";
import * as MongoDb from "mongodb";
import Assert from "assert";
import TemplateDecoder from "./templateDecoder";
import chalk from "chalk";

import * as CLIInquiry from "./cliInquiry";
const MongoClient = MongoDb.MongoClient;
// const Server = MongoDb.Server;

function insertManager(url, collectionName, documents) {
  MongoClient.connect(url, (err, db) => {
    Assert.equal(null, err);
    console.log("Connected correctly to server");

    const collection = db.collection(collectionName);

    collection.insertMany(documents, (insertErr, result) => {
      Assert.equal(insertErr, null);
      Assert.equal(documents.length, result.ops.length);
      console.log(chalk.green(`Inserted ${documents.length} documents into ${collectionName} collection`));
      process.exit();
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

  const documents = [];
  const decoder = new TemplateDecoder();

  for (let index = 0; index < documentCount; index++) {
    const doc = decoder.decode(template);
    documents.push(doc);
  }

  return documents;
}

function processArgumentParser() {
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
}

clear.default();

CLIInquiry.introduce();
function handleCommandLine() {
  const operationMode = "I";
  if (operationMode === "F") {
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

    processArgumentParser();

  } else if (operationMode === "I") {

    CLIInquiry.getTemplate((template, documentCount) => {
      if (template) {

        console.log(chalk.green("Template validated successfully!"));

        const decoder = new TemplateDecoder();
        const sampleDocument = decoder.decode(template);

        console.log(`Sample: ${JSON.stringify(sampleDocument, null, 4)}`);

        const documents = templateParser(template, documentCount);
        CLIInquiry.getMongoDetails(mongoDetails => {
          let connectionUrl;
          const confirmQuestion = "Is authorization required?";
          CLIInquiry.getConfirmOption(confirmQuestion, response => {

            if (response) {
              CLIInquiry.getMongoAuthDetails(auth => {
                connectionUrl = `mongodb://${auth.userName}@${auth.password}:${mongoDetails.host}:${mongoDetails.port}/${mongoDetails.databaseName}`;
                insertManager(connectionUrl, mongoDetails.collectionName, documents);
              });
            } else {
              connectionUrl = `mongodb://${mongoDetails.host}:${mongoDetails.port}/${mongoDetails.databaseName}`;
              insertManager(connectionUrl, mongoDetails.collectionName, documents);
            }
          });

        });
      }
    });
  }
}

handleCommandLine();
