const assert = require("assert");

const {
  parseInput,
  isOptionWithCount,
  hasOption,
  isOnlyOption,
  startsWithDash,
  createArgsObject,
  isOnlyCount
} = require("../src/parser.js");

describe("parseInput", function() {
  let inputData;
  let expectedOutput;

  it("should give default option -n and count 10 when count and option are not specified", function() {
    inputData = ["names"];
    expectedOutput = { option: "n", count: 10, files: ["names"] };
    assert.deepEqual(parseInput(inputData), expectedOutput);
  });

  it("should give default option -n and count as given when option is not specified", function() {
    inputData = ["-15", "names", "numbers"];
    expectedOutput = {
      option: "n",
      count: 15,
      files: ["names", "numbers"]
    };
    assert.deepEqual(parseInput(inputData), expectedOutput);
  });

  it("should return organised option and count when both are given without spaces", function() {
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

  it("should return organised option and count when both are given with spaces in between.", function() {
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

describe("isOptionWithCount", function() {
  it("should return true when option and count is given without spaces", function() {
    assert.equal(isOptionWithCount("-n2"), true);
    assert.equal(isOptionWithCount("-c2"), true);
  });
  it("should return false when only option is given without count", function() {
    assert.deepEqual(isOptionWithCount("-3"), false);
    assert.deepEqual(isOptionWithCount("-1"), false);
  });
});
describe("hasOption", function() {
  it("should return false when option given is empty string", function() {
    assert.equal(hasOption(""), false);
  });
  it("should return true when option given strarts with - and an alphabet in front of it", function() {
    assert.equal(hasOption("-n"), true);
  });
  it("should return false when option given strarts with - but not have alphabet in front of it", function() {
    assert.equal(hasOption("-3"), false);
  });
});
describe("isOnlyOption", function() {
  it("should return false when option given is empty string", function() {
    assert.equal(isOnlyOption(""), false);
  });
  it("should return true when option given strarts with - and only one alphabet in front of it", function() {
    assert.equal(isOnlyOption("-n"), true);
  });
  it("should return false when option given strarts with - but not have alphabet in front of it", function() {
    assert.equal(isOnlyOption("-3"), false);
  });
  it("should return false when option given strarts with - dash but its lenght is more than two", function() {
    assert.equal(isOnlyOption("-asdf"), false);
  });
});

describe("startsWithDash", function() {
  it("should return true when option given startsWith the dash", function() {
    assert.equal(startsWithDash("maasf"), false);
  });
  it("should return false when option given doesn't start with dash", function() {
    assert.equal(startsWithDash("-n"), true);
  });
});
describe("createArgsObject", function() {
  it("should return undefined values of object if values are not specified", function() {
    expectedOutput = { option: undefined,count: undefined, files: undefined };
    assert.deepEqual(createArgsObject(), expectedOutput);
  });

  it("should return object when given parameters", function() {
    expectedOutput = { option: "n", count: 3, files: ["file1", "file2"] };
    assert.deepEqual(createArgsObject("n", 3, ["file1", "file2"]), expectedOutput);
  });
});

describe("isOnlyCount", function() {
  it("should return true when only number is given with hash at start and only number in front of it", function() {
    assert.deepEqual(isOnlyCount("-123"), true);
  });

  it("should return false when option contain dash and alphabet in front of it", function() {
    assert.deepEqual(isOnlyCount("-n234"), false);
  });
});
