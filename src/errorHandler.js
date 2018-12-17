const { parseInput } = require('./parser.js');

const isInvalidOption = function (inputDetails) {
  return (
    inputDetails[0][0] == "-" &&
    inputDetails[0][1] != "n" &&
    inputDetails[0][1] != "c" &&
    !parseInt(inputDetails[0])
  );
};

const hasZero = function (inputDetails) {
  return (inputDetails[0][0] == '-'
    && inputDetails[0][1] == 0
    || inputDetails[0][2] == 0);
};

const selectIllegalOption = function (funcName, option) {
  let errors = {
    "head": "head: illegal option -- " + option +
      "\nusage: head [-n lines | -c bytes] [file ...]",
    "tail": "tail: illegal option --  " + option +
      "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  }
  return errors[funcName];
};

const checkValidOption = function (functionName, inputDetails) {
  if (isInvalidOption(inputDetails)) {
    return selectIllegalOption(functionName, inputDetails[0][1])
  }
}

const manageHeadErrors = function(inputDetails){
  let { option, count, files } = parseInput(inputDetails);


  if (inputDetails[0] == 0 || count == 0) {
    return "head: illegal line count -- 0";
  }

  if (checkValidOption("head", inputDetails)) {
    return checkValidOption("head", inputDetails);
  }

  if (isNaN(count) || count < 1) {
    return option == "n"
      ? "head: illegal line count -- " + count
      : "head: illegal byte count -- " + count;
  }
}

const manageTailErrors = function(inputDetails){
  let { option, count, files } = parseInput(inputDetails);

  if (hasZero(inputDetails)) {
    return ' ';
  }

  if (checkValidOption("tail", inputDetails)) {
    return checkValidOption("tail", inputDetails);
  }

  if (isNaN(count)) {
    return "tail: illegal offset -- " + count;
  } 
}

module.exports = { 
  manageHeadErrors,
  manageTailErrors
}