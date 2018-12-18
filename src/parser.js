let hasOption = function(details) {
  return hasDash(details) && details[1].match(/[A-z]/);
};

const isOptionWithCount = function(details) {
  return hasDash(details) && details.length > 2;
};

const isOnlyOption = function(details){
  return hasOption(details) && details.length == 2;
}

const hasDash = function(option) {
  return option.startsWith("-");
}

const parseInput = function(details) {
  if (details[0][0] === "-" && !isNaN(details[0])) {
    return {
      option: "n",
      count: Math.abs(details[0]),
      files: details.slice(1)
    };
  }
  if (isOnlyOption(details[0])) {
    return {
      option: details[0][1],
      count: details[1],
      files: details.slice(2)
    };
  }
  if (isOptionWithCount(details[0])) {
    return {
      option: details[0][1],
      count: details[0].slice(2),
      files: details.slice(1)
    };
  }
  return { option: "n", count: 10, files: details };
};



module.exports = { parseInput, isOptionWithCount };
