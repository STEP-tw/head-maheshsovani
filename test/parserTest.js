const assert = require("assert");
const { parseInput , isOptionWithCount ,isValidOption } = require("../src/parser.js")
describe("parseInput", function () {
  let inputData;
  let expectedOutput;

  it("should give default option -n and count 10 when count and option are not specified", function () {
    inputData = ["names"];
    expectedOutput = { option: "n", count: 10, files: ["names"] };
    assert.deepEqual(parseInput(inputData), expectedOutput);
  });

  it("should give default option -n and count as given when option is not specified", function () {
    inputData = [-15, "names", "numbers"];
    expectedOutput = {
      option: "n",
      count: 15,
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

describe("isValidOption Function", function () {
  it("should return true when option given is either -n or -c ", function () {
    assert.equal(isValidOption("-n"), true);
    assert.equal(isValidOption("-c"), true);
  });

  it("should return false when option given is neither -n nor -c", function () {
    assert.equal(isValidOption("-x"), false);
    assert.equal(isValidOption("-y"), false);
  });
});

describe("isOptionWithCount", function() {
  it("should return true when option and count is given without spaces", function() {
    assert.equal(isOptionWithCount("-n2"),true)
    assert.equal(isOptionWithCount("-c2"),true)
  });
  it("should return false when only option is given without count", function () {
    assert.deepEqual(isOptionWithCount("-3"), false);
    assert.deepEqual(isOptionWithCount("-1"), false);
  });
});