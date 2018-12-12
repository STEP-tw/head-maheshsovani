const parseInput = require('./parser.js').parseInput;
const {manageHeadErrors , manageTailErrors} = require('./errorHandler.js');
const extractHeadLines = function (file, numberOfLines) {
  return file.slice(0, numberOfLines).join("\n");
};

const extractHeadCharacters = function (file, numberOfCharacters) {
  return file.join("\n").slice(0, numberOfCharacters);
};

const extractTailLines = function (file, numberOfLines) {
  return file.slice(-numberOfLines).join("\n");
};

const extractTailCharacters = function (file, numberOfCharacters) {
  return file.join("\n").slice(-numberOfCharacters);
};

const isPresent = function (fileName, existsSync) {
  return existsSync(fileName);
};

const singleFileContents = function (funcName, fileDetails, fileName) {
  const { count, existsSync, readFileSync, funcRef } = fileDetails;
  if (!isPresent(fileName, existsSync)) {
    return (funcName + ": " + fileName + ": No such file or directory");
  }
  return funcRef(readFileSync(fileName, "utf8").split("\n"), count);
}

const retrieveData = function (fileDetails, fileName) {
  let { readFileSync, existsSync, delimeter, content,
    funcRef, count, funcName } = fileDetails;

  if (isPresent(fileName, existsSync)) {
    content.push(delimeter + "==> " + fileName + " <==");
    content.push(funcRef(readFileSync(fileName, "utf8").split("\n"), count));
    fileDetails.delimeter = "\n";
    return fileDetails;
  }
  content.push(funcName + ": " + fileName + ": No such file or directory");
  return fileDetails;
};



const head = function (inputDetails, fs) {
  const { existsSync, readFileSync } = fs;
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractHeadLines, c: extractHeadCharacters };
  let funcRef = getOutput[option];
  let fileDetails = {
    content: [], delimeter: "", count,
    funcRef, readFileSync, existsSync, funcName: "head"
  };
  if(manageHeadErrors(inputDetails) != undefined ){
    return manageHeadErrors(inputDetails);
  }
  if (files.length == 1) {
    return singleFileContents("head", fileDetails, files[0]);
  }
  return files.reduce(retrieveData, fileDetails).content.join("\n");
};

const tail = function (inputDetails, fs) {
  const { existsSync, readFileSync } = fs
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractTailLines, c: extractTailCharacters };
  let funcRef = getOutput[option];
  let fileDetails = {
    content: [], delimeter: "", count: parseInt(count),
    funcRef, readFileSync, existsSync, funcName: "tail"
  };
  if(manageTailErrors(inputDetails) != undefined ){
    return manageTailErrors(inputDetails);
  }

  if (files.length == 1) {
    return singleFileContents("tail", fileDetails, files[0]);
  }

  return files.reduce(retrieveData, fileDetails).content.join("\n");
};

module.exports = {
  extractHeadLines,
  extractHeadCharacters,
  parseInput,
  retrieveData,
  head,
  tail,
  extractTailLines,
  extractTailCharacters
};