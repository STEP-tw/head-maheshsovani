const extractLines = function(file, numberOfLines) {
  return file.slice(0, numberOfLines).join("\n");
};

const extractCharacters = function(file, numberOfCharacters) {
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

const isPresent = function(fileName, doesExist) {
  return doesExist(fileName);
};

const retrieveData = function(fileDetails, fileName) {
  let {
    readFileContent,
    doesExist,
    delimeter,
    content,
    funcRef,
    count
  } = fileDetails;

  if (isPresent(fileName, doesExist)) {
    content.push(delimeter + "==> " + fileName + " <==");
    content.push(funcRef(readFileContent(fileName, "utf8").split("\n"), count));
    fileDetails.delimeter = "\n";
    return fileDetails;
  }
  content.push("head: " + fileName + ": No such file or directory");
  return fileDetails;
};

const head = function(inputDetails, readFileContent, doesExist) {
  let { option, count, files } = parseInput(inputDetails);
  let getOutput = { n: extractLines, c: extractCharacters };
  let funcRef = getOutput[option];
  let fileDetails = {
    content: [],
    delimeter: "",
    count,
    funcRef,
    readFileContent,
    doesExist
  };

  if (inputDetails[0] == 0 || count == 0) {
    return "head: illegal line count -- 0";
  }
  if (
    inputDetails[0][0] == "-" &&
    inputDetails[0][1] != "n" &&
    inputDetails[0][1] != "c" &&
    !parseInt(inputDetails[0])
  ) {
    return (
      "head: illegal option -- " +
      inputDetails[0][1] +
      "\nusage: head [-n lines | -c bytes] [file ...]"
    );
  }
  if (isNaN(count - 0) || count < 1) {
    return option == "n"
      ? "head: illegal line count -- " + count
      : "head: illegal byte count -- " + count;
  }
  if (files.length == 1) {
    if (!isPresent(files[0], doesExist)) {
      return "head: " + files[0] + ": No such file or directory";
    }
    return funcRef(readFileContent(files[0], "utf8").split("\n"), count);
  }
  return files.reduce(retrieveData, fileDetails).content.join("\n");
};

module.exports = {
  extractLines,
  extractCharacters,
  parseInput,
  retrieveData,
  head
};
