const assert = require("assert");
const { parseInput } = require("../src/parser.js")
describe("parseInput", function () {
  let inputData;
  let expectedOutput;

  it("should give default option -n and count 10 when count and option are not specified", function () {
    inputData = ["names"];
    expectedOutput = { option: "n", count: 10, files: ["names"] };
    assert.deepEqual(parseInput(inputData), expectedOutput);
  });

  it("should give default option -n and count as given when option is not specified", function () {
    inputData = [-5, "names", "numbers"];
    expectedOutput = {
      option: "n",
      count: 5,
      files: ["names", "numbers"]
    };
    assert.deepEqual(parseInput(inputData), expectedOutput);
  });

  it("should return organised option and count when both are given without spaces", function () {
    inputData = ["-n10", "names", "numbers"];
    expectedOutput = {
      option: "n",
      count: 10,
      files: ["names", "numbers"]
    };
    assert.deepEqual(parseInput(inputData), expectedOutput);

    inputData = ["-c10", "names", "numbers"];
    expectedOutput = {
      option: "c",
      count: 10,
      files: ["names", "numbers"]
    };
    assert.deepEqual(parseInput(inputData), expectedOutput);
  });

  it("should return organised option and count when both are given with spaces in between.", function () {
    let inputData = ["-n", 12, "names", "numbers"];
    let expectedOutput = {
      option: "n",
      count: 12,
      files: ["names", "numbers"]
    };
    assert.deepEqual(parseInput(inputData), expectedOutput);

    inputData = ["-c", 15, "names", "numbers"];
    expectedOutput = {
      option: "c",
      count: 15,
      files: ["names", "numbers"]
    };
    assert.deepEqual(parseInput(inputData), expectedOutput);
  });
});