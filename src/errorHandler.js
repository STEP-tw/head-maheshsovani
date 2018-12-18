const { parseInput } = require("./parser.js");

const isInvalidOption = function(option) {
  return !["n", "c"].includes(option);
};

const isIllegalCount = function(count) {
  return isNaN(count) || count < 1;
};

const invalidOptionError = function(funcName, option) {
  let errors = {
    head:
      "head: illegal option -- " +
      option +
      "\nusage: head [-n lines | -c bytes] [file ...]",
    tail:
      "tail: illegal option --  " +
      option +
      "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  };
  return errors[funcName];
};

const illegalCountError = function(funcName, count, option) {
  let errors = {
    tail: {
      n: "tail: illegal offset -- " + count,
      c: "tail: illegal offset -- " + count
    },
    head: {
      n: "head: illegal line count -- " + count,
      c: "head: illegal byte count -- " + count
    }
  };
  return errors[funcName][option];
};

const manageHeadErrors = function(inputDetails) {
  
  let { option, count, files } = inputDetails;

  if (files.includes("0") || count == 0) {
    return illegalCountError("head", 0, "n");
  }

  if (isInvalidOption(option)) {
    return invalidOptionError("head", option);
  }

  if (isIllegalCount(count)) {
    return illegalCountError("head", count, option);
  }
  return false;
};

const manageTailErrors = function(inputDetails) {
  let { option, count } = inputDetails;

  if (count == 0) {
    return " ";
  }

  if (isInvalidOption(option)) {
    return invalidOptionError("tail", option);
  }

  if (isNaN(count)) {
    return illegalCountError("tail", count, option);
  }
  return false;s
};

module.exports = {
  manageHeadErrors,
  manageTailErrors,
  isInvalidOption,
  isIllegalCount,
  invalidOptionError,
  illegalCountError
};
