const { manageHeadErrors, manageTailErrors } = require("./errorHandler.js");

const seperator = { n: "\n", c: "" };

const extractRequiredContent = function(option, count, utility, file) {
  let ranges = { head: [0, count], tail: [-count] };
  let range = ranges[utility];
  return file.split(seperator[option]).slice(range[0], range[1]).join(seperator[option]);
};

const generateHeader = function(fileName) {
  return "==> " + fileName + " <==\n";
};

const isPresent = function(fileName, existsSync) {
  return existsSync(fileName);
};

const isValidFile = function(files, existsSync) {
  return files.length == 1 && isPresent(files[0], existsSync);
};

const generateRequiredContent = function(details, fs) {
  const { existsSync, readFileSync } = fs;
  const { files, count, option , utility } = details;
  let getContent = extractRequiredContent.bind(null, option, count, utility);
  let delimeter = "";
  let content = [];

  if (isValidFile(files, existsSync)) {
    return getContent(readFileSync(files[0], "utf8"));
  }

  for (let file of files) {
    let fileContent = utility + ": " + file + ": No such file or directory";
    if (isPresent(file, existsSync)) {
      fileContent = delimeter + generateHeader(file);
      fileContent += getContent(readFileSync(file, "utf8"));
      delimeter = "\n";
    }
    content.push(fileContent);
  }
  return content.join("\n");
};

const head = function(inputDetails, fs) {
  let { option, count, files } = inputDetails;
  let fileDetails = { count, files, utility: "head", option };
  return (
    manageHeadErrors(inputDetails) ||
    generateRequiredContent(fileDetails, fs)
  );
};

const tail = function(inputDetails, fs) {
  let { option, count, files } = inputDetails;
  let fileDetails = { count:Math.abs(count), files, utility: "tail", option };
  return (
    manageTailErrors(inputDetails) ||
    generateRequiredContent(fileDetails, fs)
  );
};

module.exports = {
  head,
  tail,
  isPresent,
  generateRequiredContent,
  isValidFile,
  generateHeader,
  extractRequiredContent,
};
