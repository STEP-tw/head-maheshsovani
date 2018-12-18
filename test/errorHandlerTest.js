const assert = require("assert");
const {
  manageHeadErrors,
  manageTailErrors,
  isInvalidOption,
  isIllegalCount,
  invalidOptionError,
  illegalCountError
} = require("../src/errorHandler.js");

describe("isInvalidOption", function() {
  it("should return true when option given is either -c or -n", function() {
    assert.equal(isInvalidOption("-n"), true);
  });
  it("should return false when option given is neither -c nor -n", function() {
    assert.equal(isInvalidOption("-d"), true);
  });
});
describe("illegalCountError", function() {
  let expectedOutput;
  it("should return invalid line count if option is n and function is head", function() {
    expectedOutput = "head: illegal line count -- 5";
    assert.deepEqual(illegalCountError("head", 5, "n"), expectedOutput);
  });

  it("should return invalid byte count if option is c and function is head", function() {
    expectedOutput = "head: illegal byte count -- 5";
    assert.deepEqual(illegalCountError("head", 5, "c"), expectedOutput);
  });

  it("should return invalid offset if option is c and function is tail", function() {
    expectedOutput = "tail: illegal offset -- 5";
    assert.deepEqual(illegalCountError("tail", 5, "c"), expectedOutput);
  });
});

describe("isIllegalCount", function() {
  it("should return true when count given is not a number", function() {
    assert.equal(isIllegalCount("ssa23"), true);
  });

  it("should return false when count given is a positive integer", function() {
    assert.equal(isIllegalCount("123"), false);
  });

  it("should return true when given count is a negative integer", function() {
    assert.equal(isIllegalCount("-123"), true);
  });
});

describe("invalidOptionError", function() {
  let expectedOutput;
  it("should return error when invalid option is specified", function() {
    expectedOutput =
      "head: illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(invalidOptionError("head", "x"), expectedOutput);
  });

  it("should return error when invalid option is specified", function() {
    expectedOutput =
      "tail: illegal option --  z\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    assert.deepEqual(invalidOptionError("tail", "z"), expectedOutput);
  });
});
describe("manageHeadErrors", function() {
  let expectedOutput;
  let inputData;
  it("should return error when option given is invalid", function() {
    inputData = ["-x3", "numbers"];
    expectedOutput =
      "head: illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(manageHeadErrors(inputData), expectedOutput);
  });

  it("should return error when invalid count is given", function() {
    inputData = ["-n-3", "numbers"];
    expectedOutput = "head: illegal line count -- -3";
    assert.deepEqual(manageHeadErrors(inputData), expectedOutput);
  });

  it("should return error when invalid count is given", function() {
    inputData = ["-c-3", "numbers"];
    expectedOutput = "head: illegal byte count -- -3";
    assert.deepEqual(manageHeadErrors(inputData), expectedOutput);
  });

  it("should return error when count given is 0", function() {
    inputData = ["-0", "numbers"];
    expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(manageHeadErrors(inputData), expectedOutput);
  });
});

describe("manageTailErrors", function() {
  let expectedOutput;
  let inputData;
  it("should return error when option given is invalid", function() {
    inputData = ["-x3", "numbers"];
    expectedOutput =
      "tail: illegal option --  x\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    assert.deepEqual(manageTailErrors(inputData), expectedOutput);
  });

  it("should return error when invalid count is given", function() {
    inputData = ["-0", "numbers"];
    assert.deepEqual(manageTailErrors(inputData), " ");
  });

  it("should return error when invalid count is given", function() {
    inputData = ["-caa3", "numbers"];
    expectedOutput = "tail: illegal offset -- aa3";
    assert.deepEqual(manageTailErrors(inputData), expectedOutput);
  });
});
