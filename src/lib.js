const parseInput = require('./parser.js').parseInput;
const extractHeadLines = function(file, numberOfLines) {
  return file.slice(0, numberOfLines).join("\n");
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

const isInvalidOption = function(inputDetails){
  return (
    inputDetails[0][0] == "-" &&
    inputDetails[0][1] != "n" &&
    inputDetails[0][1] != "c" &&
    !parseInt(inputDetails[0])
  );
};

const hasZero = function (inputDetails){
  return (inputDetails[0][0] == '-'  
    && inputDetails[0][1] == 0 
    || inputDetails[0][2] == 0 );
};

const illegalOptionError = function(fileName ){
  return ("tail: illegal option --  "+ fileName+
    "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]");
};


const singleFileContents = function(funcName ,fileDetails , fileName){
  const {count , existsSync , readFileSync , funcRef} = fileDetails;
  if (!isPresent(fileName, existsSync)) {
    return (funcName + ": " + fileName + ": No such file or directory");
  }
  return funcRef(readFileSync(fileName, "utf8").split("\n"), count);
}

const retrieveData = function(fileDetails, fileName) {
  let { readFileSync, existsSync, delimeter, content,
    funcRef, count, funcName } = fileDetails;

  if (isPresent(fileName, existsSync)) {
    content.push(delimeter + "==> " + fileName + " <==");
    content.push(funcRef(readFileSync(fileName, "utf8").split("\n"),count));
    fileDetails.delimeter = "\n";
    return fileDetails;
  }
  content.push(funcName +": " + fileName + ": No such file or directory");
  return fileDetails;
};

const head = function(inputDetails, fs) {
  const { existsSync , readFileSync }  = fs ;
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractHeadLines, c: extractHeadCharacters };
  let funcRef = getOutput[option];
  let fileDetails = { content: [], delimeter: "", count,
    funcRef, readFileSync, existsSync, funcName : "head" };

  if (inputDetails[0] == 0 || count == 0) {
    return "head: illegal line count -- 0";
  }
  if (isInvalidOption(inputDetails)){
    return  "head: illegal option -- " + inputDetails[0][1] + "\nusage: head [-n lines | -c bytes] [file ...]";
  }

  if (isNaN(count) || count < 1) {
    return option == "n"
      ? "head: illegal line count -- " + count
      : "head: illegal byte count -- " + count;
  }

  if (files.length == 1) {
    return singleFileContents("head",fileDetails , files[0]);
  }

  return files.reduce(retrieveData, fileDetails).content.join("\n");
};

const tail = function(inputDetails, fs) {
  const { existsSync , readFileSync } = fs
  let { option, count , files } = parseInput(inputDetails);
  let getOutput = { n: extractTailLines, c: extractTailCharacters };
  let funcRef = getOutput[option];
  let fileDetails = { content: [], delimeter: "", count : parseInt(count),
    funcRef, readFileSync, existsSync, funcName : "tail" };

  if(hasZero(inputDetails)){
    return '';
  }

  if (isInvalidOption(inputDetails)){
    return illegalOptionError(inputDetails[0][1] ) 
  }

  if (isNaN(count)) {
    return  "tail: illegal offset -- " + count;
  }

  if (files.length == 1) {
    return singleFileContents("tail",fileDetails , files[0]);
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