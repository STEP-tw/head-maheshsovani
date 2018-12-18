const { parseInput } = require('./parser.js');

const isInvalidOption = function (option) {
  return (!["n","c"].includes(option));
};

const hasZero = function (count) {
  return count == 0
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

const illegalCountError = function (funcName, count,option) {
  let errors = {
    tail : {n: "tail: illegal offset -- "+ count,
            c: "tail: illegal offset -- "+ count
    },
    head: {n: "head: illegal line count -- " + count,
           c : "head: illegal byte count -- " + count
    }
  }
  return errors[funcName][option];
};

const manageHeadErrors = function(inputDetails){
  let { option, count, files} = parseInput(inputDetails);


  if (files.includes("0")  || count == 0) {
    return "head: illegal line count -- 0";
 }

  if (isInvalidOption(option)) {
    return invalidOptionError("head", option);
  }

  if (isNaN(count) || count < 1) {
    return illegalCountError("head",count,option);
  }
}

const manageTailErrors = function(inputDetails){
  let { option, count } = parseInput(inputDetails);

  if (hasZero(count)) {
    return ' ';
  }

  if (isInvalidOption(option)) {
    return invalidOptionError("tail",option);
  }

  if (isNaN(count)) {
    return illegalCountError("tail",count,option);
  } 
}

module.exports = { 
  manageHeadErrors,
  manageTailErrors
}