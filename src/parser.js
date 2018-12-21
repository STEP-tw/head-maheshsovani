let hasOption = function(details) {
  return startsWithDash(details) && !!details[1].match(/[A-z]/);
};

const isOptionWithCount = function(details) {
  return startsWithDash(details) && details.length > 2;
};

const isOnlyOption = function(details) {
  return hasOption(details) && details.length == 2;
};

const startsWithDash = function(option) {
  return option.startsWith("-");
};

const createArgsObject = function(option, count, files) {
  return { option, count, files };
};

const isOnlyCount = function(count) {
  return startsWithDash(count) && !isNaN(count);
};

const parseInput = function(details) {
  if (isOnlyCount(details[0])) {
    return createArgsObject("n", Math.abs(details[0]), details.slice(1));
  }

  if (isOnlyOption(details[0])) {
    return createArgsObject(details[0][1], details[1], details.slice(2));
  }

  if (isOptionWithCount(details[0])) {
    return createArgsObject(details[0][1], details[0].slice(2), details.slice(1));
  }

  return createArgsObject("n", 10, details);
};

module.exports = {
  parseInput,
  isOptionWithCount,
  hasOption,
  isOnlyOption,
  startsWithDash,
  createArgsObject,
  isOnlyCount
};
