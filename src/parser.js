const parseInput = function (details) {
  let defaultParameters = { option: "n", count: 10, files: details };

  if (isValidOption(details[0])) {
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
  if (parseInt(details[0])) {
    return {
      option: "n",
      count: Math.abs(details[0]),
      files: details.slice(1)
    };
  }
  return defaultParameters;
};

const isValidOption = function(option){
  return ["-n","-c"].includes(option); 
};

const isOptionWithCount = function(details){
  return ( details[0]==='-' && details.length > 2 );
};

module.exports = { parseInput , isOptionWithCount ,isValidOption }