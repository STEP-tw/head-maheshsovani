const { parseInput } = require('./parser.js');

const isInvalidOption = function (option) {
  return (!["n","c"].includes(option));
};

const hasZero = function (option,count) {
  return (option == 0  || count == 0)
};

const invalidOptionError = function (funcName, option) {
  let errors = {
    "head": "head: illegal option -- " + option +
      "\nusage: head [-n lines | -c bytes] [file ...]",
    "tail": "tail: illegal option --  " + option +
      "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  }
  return errors[funcName];
};

const checkValidOption = function (functionName, option) {
  if (isInvalidOption(option)) {
    return invalidOptionError(functionName, option)
  }
}

const manageHeadErrors = function(inputDetails){
  let { option, count, files} = parseInput(inputDetails);


  if (files.includes("0")  || count == 0) {
    return "head: illegal line count -- 0";
  }

  if (checkValidOption("head", option)) {
    return checkValidOption("head", option);
  }

  if (isNaN(count) || count < 1) {
    return option == "n"
      ? "head: illegal line count -- " + count
      : "head: illegal byte count -- " + count;
  }
}

const manageTailErrors = function(inputDetails){
  let { option, count, files } = parseInput(inputDetails);

  if (hasZero(option, count)) {
    return ' ';
  }

  if (checkValidOption("tail", option)) {
    return checkValidOption("tail",option);
  }

  if (isNaN(count)) {
    return "tail: illegal offset -- " + count;
  } 
}

module.exports = { 
  manageHeadErrors,
  manageTailErrors
}