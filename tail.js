const fs = require("fs");
const { parseInput } = require("./src/parser.js");
const { getData } = require("./src/lib.js");

const main = function(args) {
  let inputDetails = parseInput(args.slice(2));
  return getData(inputDetails, fs, "tail");
};
console.log(main(process.argv));
