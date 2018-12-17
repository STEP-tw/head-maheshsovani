const { parseInput } = require("./parser.js");
const { manageHeadErrors, manageTailErrors } = require("./errorHandler.js");

const extractHeadLines = function(file, numberOfLines) {
  let fileContent = file.split("\n");
  return fileContent.slice(0, numberOfLines).join("\n");
};

const generateHeader = function(fileName) {
  return "==> " + fileName + " <==\n";
};

const extractHeadCharacters = function(file, numberOfCharacters) {
  return file.slice(0, numberOfCharacters);
};

const extractTailLines = function(file, numberOfLines) {
  let fileContent = file.split("\n")
  return fileContent.slice(-numberOfLines).join("\n");
};

const extractTailCharacters = function(file, numberOfCharacters) {
  return file.slice(-numberOfCharacters);
};

const isPresent = function(fileName, existsSync) {
  return existsSync(fileName);
};

const isValidSingleFile = function(files, existsSync) {
  return files.length == 1 && isPresent(files[0],existsSync);
};

const generateRequiredContent = function(details, fs) {
  const { existsSync, readFileSync } = fs;
  const { files, funcName, count, extractorFunction } = details;
  let delimeter = "";
  let content = [];

  if (isValidSingleFile(files, existsSync)) {
    return extractorFunction(readFileSync(files[0], "utf8"), count);
  }

  for (let file of files) {
    let fileContent = funcName + ": " + file + ": No such file or directory";
    if (isPresent(file, existsSync)) {
      fileContent = delimeter + generateHeader(file);
      fileContent += extractorFunction(readFileSync(file, "utf8"), count);
      delimeter = "\n";
    }
    content.push(fileContent);
  }
  return content.join("\n");
};

const head = function(inputDetails, fs) {
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractHeadLines, c: extractHeadCharacters };
  let extractorFunction = getOutput[option];
  let fileDetails = { count, files, extractorFunction, funcName: "head" };
  return (
    manageHeadErrors(inputDetails) || generateRequiredContent(fileDetails, fs)
  );
};

const tail = function(inputDetails, fs) {
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractTailLines, c: extractTailCharacters };
  let extractorFunction = getOutput[option];
  let fileDetails = {
    count: parseInt(count),
    files,
    extractorFunction,
    funcName: "tail"
  };

  if (manageTailErrors(inputDetails) != undefined) {
    return manageTailErrors(inputDetails);
  }

  return generateRequiredContent(fileDetails, fs);
};

module.exports = {
  extractHeadLines,
  extractHeadCharacters,
  head,
  tail,
  extractTailLines,
  extractTailCharacters,
  isPresent,
  generateRequiredContent,
  isValidSingleFile,
  generateHeader
};
