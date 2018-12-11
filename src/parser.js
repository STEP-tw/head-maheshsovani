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

module.exports = {parseInput}