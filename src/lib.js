const extractHeadLines = function(file, numberOfLines) {
  return file.slice(0, numberOfLines).join("\n");
};

const extractHeadCharacters = function(file, numberOfCharacters) {
  return file.join("\n").slice(0, numberOfCharacters);
};

const parseInput = function(details) {
  let organisedData = { option: "n", count: 10, files: details.slice(0) };
  if (details[0] == "-n" || details[0] == "-c") {
    organisedData = {
      option: details[0][1],
      count: details[1],
      files: details.slice(2)
    };
  }
  if (details[0][0] == "-" && details[0].length > 2) {
    organisedData = {
      option: details[0][1],
      count: details[0].slice(2),
      files: details.slice(1)
    };
  }
  if (parseInt(details[0])) {
    organisedData = {
      option: "n",
      count: Math.abs(details[0]),
      files: details.slice(1)
    };
  }
  return organisedData;
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
}

const retrieveData = function(fileDetails, fileName) {
  let {
    readFileSync,
    existsSync,
    delimeter,
    content,
    funcRef,
    count,
    funcName
  } = fileDetails;

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
  const existsSync = fs.existsSync;
  const readFileSync = fs.readFileSync;
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractHeadLines, c: extractHeadCharacters };
  let funcRef = getOutput[option];
  let fileDetails = {
    content: [],
    delimeter: "",
    count,
    funcRef,
    readFileSync,
    existsSync,
    funcName : "head"
  };

  if (inputDetails[0] == 0 || count == 0) {
    return "head: illegal line count -- 0";
  }
  if (isInvalidOption(inputDetails)){
    return  "head: illegal option -- " + inputDetails[0][1] + "\nusage: head [-n lines | -c bytes] [file ...]";
  }

  if (isNaN(count - 0) || count < 1) {
    return option == "n"
      ? "head: illegal line count -- " + count
      : "head: illegal byte count -- " + count;
  }
  if (files.length == 1) {
    if (!isPresent(files[0], existsSync)) {
      return "head: " + files[0] + ": No such file or directory";
    }
    return funcRef(readFileSync(files[0], "utf8").split("\n"), count);
  }
  return files.reduce(retrieveData, fileDetails).content.join("\n");
};

const extractTailLines = function(file, numberOfLines) {
  return file.slice(-numberOfLines).join("\n");
};

const extractTailCharacters = function(file, numberOfCharacters) {
  return file.join("\n").slice(-numberOfCharacters);
};

const tail = function(inputDetails, fs) {
  const existsSync = fs.existsSync;
  const readFileSync = fs.readFileSync;
  let { option, count , files } = parseInput(inputDetails);
  let getOutput = { n: extractTailLines, c: extractTailCharacters };
  let funcRef = getOutput[option];
  let fileDetails = {
    content: [],
    delimeter: "",
    count : parseInt(count),
    funcRef,
    readFileSync,
    existsSync,
    funcName : "tail"
  };

  if(inputDetails[0][0] == '-'  && inputDetails[0][1] == 0 || inputDetails[0][2] == 0 ){
    return '';
  }

  if (isInvalidOption(inputDetails)){
    return "tail: illegal option --  "+ inputDetails[0][1]+"\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
  }

  if (isNaN(count)) {
    return  "tail: illegal offset -- " + count;
  }

  if (files.length == 1) {
    if (!isPresent(files[0], existsSync)) {
      return "tail: " + files[0] + ": No such file or directory";
    }  
    return funcRef(readFileSync(files[0], "utf8").split("\n"),count);
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
