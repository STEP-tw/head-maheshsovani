const parseInput = require("./parser.js").parseInput;
const { manageHeadErrors, manageTailErrors } = require("./errorHandler.js");
const extractHeadLines = function(file, numberOfLines) {
  return file.slice(0, numberOfLines).join("\n");
};

const generateHeader = function(fileName) {
  return "==> " + fileName + " <==\n";
};

const extractHeadCharacters = function(file, numberOfCharacters) {
  return file.join("\n").slice(0, numberOfCharacters);
};

const extractTailLines = function(file, numberOfLines) {
  return file.slice(-numberOfLines).join("\n");
};

const extractTailCharacters = function(file, numberOfCharacters) {
  return file.join("\n").slice(-numberOfCharacters);
};

const isPresent = function(fileName, existsSync) {
  return existsSync(fileName);
};

const isValidSingleFile = function(files, existsSync) {
  return files.length == 1 && existsSync(files[0]);
};

const generateRequiredContent = function(details, fs) {
  const { existsSync, readFileSync } = fs;
  const { files, funcName, count, funcRef } = details;
  let delimeter = "";
  let content = [];

  if (isValidSingleFile(files, existsSync)) {
    return funcRef(readFileSync(files[0], "utf8").split("\n"), count);
  }

  for (let file of files) {
    let fileContent = funcName + ": " + file + ": No such file or directory";
    if (isPresent(file, existsSync)) {
      fileContent = delimeter + generateHeader(file);
      fileContent += funcRef(readFileSync(file, "utf8").split("\n"), count);
      delimeter = "\n";
    }
    content.push(fileContent);
  }
  return content.join("\n");
};

const head = function(inputDetails, fs) {
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractHeadLines, c: extractHeadCharacters };
  let funcRef = getOutput[option];
  let fileDetails = { count, files, funcRef, funcName: "head" };
  return (
    manageHeadErrors(inputDetails) || generateRequiredContent(fileDetails, fs)
  );
};

const tail = function(inputDetails, fs) {
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractTailLines, c: extractTailCharacters };
  let funcRef = getOutput[option];
  let fileDetails = {
    count: parseInt(count),
    files,
    funcRef,
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
