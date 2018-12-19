const fs = require("fs");
const { parseInput } = require("./src/parser.js");
const { tail } = require("./src/lib.js");

const main = function(args) {
  let inputDetails = parseInput(args.slice(2));
  return tail(inputDetails, fs);
};
console.log(main(process.argv));
