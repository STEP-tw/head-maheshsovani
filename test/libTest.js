const assert = require("assert");
const {
  head,
  tail,
  isPresent,
  getData,
  isValidSingleFile,
  generateRequiredContent,
  generateHeader,
  extractRequiredContent
} = require("../src/lib.js");

const readFileSync = function(fileName) {
  let fileContents = {
    names: "mahesh\nswapnil\narnab\naftab\ndheeraj",
    numbers: "one\ntwo\nthree\nfour\nfive"
  };
  return fileContents[fileName];
};
const existsSync = function(fileName) {
  let files = ["names", "numbers"];
  return files.includes(fileName);
};

const fs = { readFileSync: readFileSync, existsSync: existsSync };
describe("extractRequiredContent", function() {
  let expectedOutput;
  let numbers = "One\nTwo\nThree\nFour\nFive\nsix\nSeven\nEight\nNine\nTen";

  it("should return head content when -n is given as option", function() {
    expectedOutput = "One\nTwo\nThree";
    assert.deepEqual(
      extractRequiredContent("n", 3, "head", numbers),
      expectedOutput
    );
  });

  it("should return tail content when -c is given as option", function() {
    expectedOutput = "Ten";
    assert.deepEqual(
      extractRequiredContent("c", 3, "tail", numbers),
      expectedOutput
    );
  });

  it("should return tail content when -n is given as option", function() {
    expectedOutput = "Eight\nNine\nTen";
    assert.deepEqual(
      extractRequiredContent("n", 3, "tail", numbers),
      expectedOutput
    );
  });

  it("should return head content when -c is given as option", function() {
    expectedOutput = "One";
    assert.deepEqual(
      extractRequiredContent("c", 3, "head", numbers),
      expectedOutput
    );
  });
});

describe("Head function with single file", function() {
  it("should return the first ten lines of file when count is not specified", function() {
    assert.deepEqual(
      head({ count: 10, option: "n", files: ["names"] }, fs),
      "mahesh\nswapnil\narnab\naftab\ndheeraj"
    );
  });

  it("should return the given number of lines when only count is given", function() {
    assert.deepEqual(
      head({ count: 3, files: ["names"], option: "n" }, fs),
      "mahesh\nswapnil\narnab"
    );
  });

  it("should return the given number of lines when count and option is given without spaces", function() {
    assert.deepEqual(
      head({ count: 2, files: ["names"], option: "n" }, fs),
      "mahesh\nswapnil"
    );
  });

  it("should return the given number of lines when count and option is given with spaces", function() {
    assert.deepEqual(
      head({ count: 1, files: ["names"], option: "n" }, fs),
      "mahesh"
    );
  });

  it("should return the given number of characters when count is given with spaces", function() {
    assert.deepEqual(
      head({ count: 3, files: ["names"], option: "c" }, fs),
      "mah"
    );
  });

  it("should return the given number of characters when count is given without spaces", function() {
    assert.deepEqual(
      head({ count: 6, files: ["names"], option: "c" }, fs),
      "mahesh"
    );
  });
});

describe("Head function with multiple file", function() {
  let expectedOutput;

  it("should return the first ten lines of file when count is not specified", function() {
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\narnab\naftab\ndheeraj\n\n==> names <==\nmahesh\nswapnil\narnab\naftab\ndheeraj";
    assert.deepEqual(
      head({ count: 10, files: ["names", "names"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when only count is given", function() {
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\narnab\n\n==> numbers <==\none\ntwo\nthree";
    assert.deepEqual(
      head({ count: 3, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when count and option is given without spaces", function() {
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\n\n==> numbers <==\none\ntwo";
    assert.deepEqual(
      head({ count: 2, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when count and option is given with spaces", function() {
    expectedOutput = "==> names <==\nmahesh\n\n==> numbers <==\none";
    assert.deepEqual(
      head({ count: 1, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of characters when count is given with spaces", function() {
    expectedOutput = "==> names <==\nmah\n\n==> numbers <==\none";
    assert.deepEqual(
      head({ count: 3, files: ["names", "numbers"], option: "c" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of characters when count is given without spaces", function() {
    expectedOutput = "==> names <==\nmahesh\n\n==> numbers <==\none\ntw";
    assert.deepEqual(
      head({ count: 6, files: ["names", "numbers"], option: "c" }, fs),
      expectedOutput
    );
  });
});

describe("Head function errors handling", function() {
  let expectedOutput;

  it("should return the error message when number of lines is given zero with n without spaces", function() {
    expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(
      head({ count: 0, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when  is count is given zero only without -c or -n", function() {
    expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(
      head({ count: 0, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when  is count is given zero only without -c or -n", function() {
    expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(
      head({ count: 0, files: ["0", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when  is count is invalid with -c or -n", function() {
    expectedOutput = "head: illegal line count -- -12";
    assert.deepEqual(
      head({ count: -12, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when  file is not present in the directory", function() {
    expectedOutput =
      "head: README.mdafs: No such file or directory\n==> numbers <==\none\ntwo\nthree";
    assert.deepEqual(
      head({ count: 3, files: ["README.mdafs", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when option other than -c or -n is given ", function() {
    expectedOutput =
      "head: illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(
      head({ count: 3, files: ["names", "numbers"], option: "x" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when option other than -c or -n is given ", function() {
    expectedOutput =
      "head: illegal option -- z\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(
      head({ count: 10, files: ["names", "numbers"], option: "z" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when option is correct but only one file which doesn't exist is given", function() {
    expectedOutput = "head: README.mdafs: No such file or directory";
    assert.deepEqual(
      head({ count: 10, files: ["README.mdafs"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when -n or -c and then alphanumeric combination is given ", function() {
    expectedOutput = "head: illegal line count -- u922";
    assert.deepEqual(
      head({ count: "u922", files: ["README.mdafs"], option: "n" }, fs),
      expectedOutput
    );

    expectedOutput = "head: illegal byte count -- u922";
    assert.deepEqual(
      head(
        { count: "u922", files: ["README.mdafs", "numbers"], option: "c" },
        fs
      ),
      expectedOutput
    );
  });
});

describe("Tail function with single file", function() {
  it("should return the first ten lines of file when count is not specified", function() {
    expectedOutput = "mahesh\nswapnil\narnab\naftab\ndheeraj";
    assert.deepEqual(
      tail({ count: 10, files: ["names"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when only count is given", function() {
    expectedOutput = "arnab\naftab\ndheeraj";
    assert.deepEqual(
      tail({ count: 3, files: ["names"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when count and option is given without spaces", function() {
    expectedOutput = "aftab\ndheeraj";
    assert.deepEqual(
      tail({ count: 2, files: ["names"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when count and option is given with spaces", function() {
    expectedOutput = "dheeraj";
    assert.deepEqual(
      tail({ count: 1, files: ["names"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of characters when count is given with spaces", function() {
    assert.deepEqual(
      tail({ count: 3, files: ["names"], option: "c" }, fs),
      "raj"
    );
  });

  it("should return the given number of characters when count is given without spaces", function() {
    assert.deepEqual(
      tail({ count: 6, files: ["names"], option: "c" }, fs),
      "heeraj"
    );
  });
});

describe("Tail function with multiple file", function() {
  let expectedOutput;

  it("should return the first ten lines of file when count is not specified", function() {
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\narnab\naftab\ndheeraj\n\n==> names <==\nmahesh\nswapnil\narnab\naftab\ndheeraj";
    assert.deepEqual(
      tail({ count: 10, files: ["names", "names"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when only count is given", function() {
    expectedOutput =
      "==> names <==\narnab\naftab\ndheeraj\n\n==> numbers <==\nthree\nfour\nfive";
    assert.deepEqual(
      tail({ count: 3, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when count and option is given without spaces", function() {
    expectedOutput =
      "==> names <==\naftab\ndheeraj\n\n==> numbers <==\nfour\nfive";
    assert.deepEqual(
      tail({ count: 2, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of lines when count and option is given with spaces", function() {
    expectedOutput = "==> names <==\ndheeraj\n\n==> numbers <==\nfive";
    assert.deepEqual(
      tail({ count: 1, files: ["names", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of characters when count is given with spaces", function() {
    expectedOutput = "==> names <==\nraj\n\n==> numbers <==\nive";
    assert.deepEqual(
      tail({ count: 3, files: ["names", "numbers"], option: "c" }, fs),
      expectedOutput
    );
  });

  it("should return the given number of characters when count is given without spaces", function() {
    expectedOutput = "==> names <==\nheeraj\n\n==> numbers <==\nr\nfive";
    assert.deepEqual(
      tail({ count: 6, files: ["names", "numbers"], option: "c" }, fs),
      expectedOutput
    );
  });
});

describe("Tail function errors handling", function() {
  let expectedOutput;

  it("should return the string with one space when number of lines is given zero with n without spaces", function() {
    assert.deepEqual(
      tail({ count: 0, files: ["names", "numbers"], option: "n" }, fs),
      " "
    );
  });

  it("should return the string with one space when  is count is given zero only without -c or -n", function() {
    assert.deepEqual(
      tail({ count: 0, files: ["names", "numbers"], option: "n" }, fs),
      " "
    );
  });

  it("should return the error message when  file is not present in the directory", function() {
    expectedOutput =
      "tail: README.mdafs: No such file or directory\n==> numbers <==\nthree\nfour\nfive";
    assert.deepEqual(
      tail({ count: 3, files: ["README.mdafs", "numbers"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when option other than -c or -n is given ", function() {
    expectedOutput =
      "tail: illegal option --  x\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    assert.deepEqual(
      tail({ count: 3, files: ["README.mdafs", "numbers"], option: "x" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when option other than -c or -n is given ", function() {
    expectedOutput =
      "tail: illegal option --  z\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    assert.deepEqual(
      tail({ count: 10, files: ["README.mdafs", "numbers"], option: "z" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when option is correct but only one file which doesn't exist is given", function() {
    expectedOutput = "tail: README.mdafs: No such file or directory";
    assert.deepEqual(
      tail({ count: 3, files: ["README.mdafs"], option: "n" }, fs),
      expectedOutput
    );
  });

  it("should return the error message when -n or -c and then alphanumeric combination is given ", function() {
    expectedOutput = "tail: illegal offset -- u922";
    assert.deepEqual(
      tail(
        { count: "u922", files: ["README.mdafs", "numbers"], option: "n" },
        fs
      ),
      expectedOutput
    );

    expectedOutput = "tail: illegal offset -- u922";
    assert.deepEqual(
      tail(
        { count: "u922", files: ["README.mdafs", "numbers"], option: "c" },
        fs
      ),
      expectedOutput
    );
  });
});

describe("isPresent", function() {
  it("should return true if file is present", function() {
    assert.deepEqual(isPresent("numbers", existsSync), true);
  });
  it("should return false if file is not present", function() {
    assert.deepEqual(isPresent("reader.js", existsSync), false);
  });
});

describe("isValidSingleFile", function() {
  it("should return true if it has a single file and which is present", function() {
    assert.deepEqual(isValidSingleFile(["numbers"], existsSync), true);
  });

  it("should return false if it has more than one file", function() {
    assert.deepEqual(
      isValidSingleFile(["names", "numbers"], existsSync),
      false
    );
  });

  it("should return false if it has a single file and which is not present", function() {
    assert.deepEqual(isValidSingleFile(["abcd.js"], existsSync), false);
  });

  it("should return false if it has more than one file and some are not present", function() {
    assert.deepEqual(
      isValidSingleFile(["numbers", "abc.js"], existsSync),
      false
    );
  });
});

describe("generateRequiredContent function for single files", function() {
  let inputData;
  it("should return when operation head is specified with count and option(-n)", function() {
    inputData = {
      count: 2,
      files: ["names"],
      option: "n"
    };
    assert.deepEqual(
      generateRequiredContent(inputData, fs, "head"),
      "mahesh\nswapnil"
    );
  });

  it("should return when operation tail is specified with count and option(-n)", function() {
    inputData = {
      count: 2,
      files: ["numbers"],
      option: "n"
    };
    assert.deepEqual(
      generateRequiredContent(inputData, fs, "tail"),
      "four\nfive"
    );
  });

  it("should return when operation head is specified with count and option(-c)", function() {
    inputData = {
      count: 6,
      files: ["names"],
      option: "c"
    };
    assert.deepEqual(generateRequiredContent(inputData, fs, "head"), "mahesh");
  });

  it("should return when operation tail is specified with count and option(-c)", function() {
    inputData = {
      count: 6,
      files: ["numbers"],
      option: "c"
    };
    assert.deepEqual(generateRequiredContent(inputData, fs, "tail"), "r\nfive");
  });
});

describe("generateRequiredContent function for multiple files", function() {
  let inputData;

  it("should return when operation head is specified with count and option(-n)", function() {
    inputData = {
      count: 2,
      files: ["names", "numbers"],
      option: "n"
    };
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\n\n==> numbers <==\none\ntwo";
    assert.deepEqual(
      generateRequiredContent(inputData, fs, "head"),
      expectedOutput
    );
  });

  it("should return when operation tail is specified with count and option(-n)", function() {
    inputData = {
      count: 2,
      files: ["names", "numbers"],
      option: "n"
    };
    expectedOutput =
      "==> names <==\naftab\ndheeraj\n\n==> numbers <==\nfour\nfive";
    assert.deepEqual(
      generateRequiredContent(inputData, fs, "tail"),
      expectedOutput
    );
  });

  it("should return when operation head is specified with count and option(-c)", function() {
    inputData = {
      count: 10,
      files: ["names", "numbers"],
      option: "c"
    };
    expectedOutput =
      "==> names <==\nmahesh\nswa\n\n==> numbers <==\none\ntwo\nth";
    assert.deepEqual(
      generateRequiredContent(inputData, fs, "head"),
      expectedOutput
    );
  });

  it("should return when operation tail is specified with count and option(-c)", function() {
    inputData = {
      count: 10,
      files: ["names", "numbers"],
      option: "c"
    };
    expectedOutput =
      "==> names <==\nab\ndheeraj\n\n==> numbers <==\n\nfour\nfive";
    assert.deepEqual(
      generateRequiredContent(inputData, fs, "tail"),
      expectedOutput
    );
  });
});

describe("generateHeader", function() {
  it("should create a head line when no file name is given", function() {
    assert.deepEqual(generateHeader(), "==> undefined <==\n");
  });

  it("should create a head line when file name is empty", function() {
    assert.deepEqual(generateHeader(""), "==>  <==\n");
  });

  it("should create a head line using a file name", function() {
    assert.deepEqual(generateHeader("numbers.js"), "==> numbers.js <==\n");
  });
});

describe("getData", function() {
  describe("should return specified number of lines or bytes from file depends upon option", function() {
    it("should return when operation tail is specified with count and option(-n)", function() {
      inputData = { count: "1", option: "n", files: ["numbers"] };
      assert.deepEqual(getData(inputData, fs, "tail"), "five");

      inputData = { count: 3, option: "n", files: ["numbers"] };
      expectedOutput = "three\nfour\nfive";
      assert.deepEqual(getData(inputData, fs, "tail"), expectedOutput);
    });

    it("should return lines when operation head is specified with count and option(-n)", function() {
      inputData = { count: 1, option: "n", files: ["numbers"] };
      assert.deepEqual(getData(inputData, fs, "head"), "one");

      inputData = { count: 3, option: "n", files: ["numbers"] };
      expectedOutput = "one\ntwo\nthree";
      assert.deepEqual(getData(inputData, fs, "head"), expectedOutput);
    });

    it("should return characters when option(-c) and count is specified with operation tail", function() {
      inputData = { count: 1, option: "c", files: ["numbers"] };
      assert.deepEqual(getData(inputData, fs, "tail"), "e");

      inputData = { count: 3, option: "c", files: ["numbers"] };
      assert.deepEqual(getData(inputData, fs, "tail"), "ive");
    });

    it("should return characters when option(-c) and count is specified with operation head", function() {
      inputData = { count: 1, option: "c", files: ["numbers"] };
      assert.deepEqual(getData(inputData, fs, "head"), "o");

      inputData = { count: 3, option: "c", files: ["numbers"] };
      assert.deepEqual(getData(inputData, fs, "head"), "one");
    });
  });

  describe("negative counts", function() {
    it("should return error if option is head and count is negative", function() {
      inputData = { count: -1, option: "c", files: ["numbers"] };
      expectedOutput = "head: illegal byte count -- -1";
      assert.deepEqual(getData(inputData, fs, "head"), expectedOutput);
    });

    it("should return error if option is head and count is negative", function() {
      inputData = { count: -1, option: "n", files: ["numbers"] };
      expectedOutput = "five";
      assert.deepEqual(getData(inputData, fs, "tail"), expectedOutput);
    });
  });

  describe("should return formatted files with their contents for multiple files", function() {
    it("should return when option(-n) and count is specified", function() {
      inputData = { count: 1, option: "n", files: ["names", "numbers"] };
      expectedOutput = "==> names <==\ndheeraj\n\n==> numbers <==\nfive";
      assert.deepEqual(getData(inputData, fs, "tail"), expectedOutput);
    });

    it("should return when option(-c) and count is specified", function() {
      inputData = { count: 3, option: "c", files: ["names", "numbers"] };
      expectedOutput = "==> names <==\nraj\n\n==> numbers <==\nive";
      assert.deepEqual(getData(inputData, fs, "tail"), expectedOutput);
    });
  });

  describe("it should return error if file name is invalid", function() {
    it("should return error if file is not present", function() {
      inputData = { count: 3, option: "n", files: ["abc"] };
      expectedOutput = "head: abc: No such file or directory";
      assert.deepEqual(getData(inputData, fs, "head"), expectedOutput);
    });

    it("should return error if file is not present", function() {
      inputData = { count: "3", option: "n", files: ["abc"] };
      expectedOutput = "tail: abc: No such file or directory";
      assert.deepEqual(getData(inputData, fs, "tail"), expectedOutput);
    });
  });

  describe("invalid option errors", function() {
    it("should return invalid option error if invalid option is specified", function() {
      inputData = { count: "3", option: "z", files: ["abc"] };
      expectedOutput =
        "head: illegal option -- z\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(getData(inputData, fs, "head"), expectedOutput);
    });

    it("should return invalid option error if invalid option is specified", function() {
      inputData = { count: "3", option: "z", files: ["abc"] };
      expectedOutput =
        "tail: illegal option --  z\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(getData(inputData, fs, "tail"), expectedOutput);
    });
  });

  describe("invalid count error", function() {
    it("should return invalid count error if invalid count is specified", function() {
      inputData = { count: "-10", option: "n", files: ["abc"] };
      expectedOutput = "head: illegal line count -- -10";
      assert.deepEqual(getData(inputData, fs, "head"), expectedOutput);
    });

    it("should return invalid count error if invalid count is specified", function() {
      inputData = { count: "-10u", option: "n", files: ["abc"] };
      expectedOutput = "head: illegal line count -- -10u";
      assert.deepEqual(getData(inputData, fs, "head"), expectedOutput);
    });

    it("should return invalid count error if invalid count is specified", function() {
      inputData = { count: "-10u", option: "n", files: ["abc"] };
      expectedOutput = "tail: illegal offset -- -10u";
      assert.deepEqual(getData(inputData, fs, "tail"), expectedOutput);
    });
  });
  describe("file not exist", function() {
    it("should return file not found error message if file is invalid", function() {
      inputData = { count: 10, option: "n", files: ["abc"] };
      expectedOutput = "head: abc: No such file or directory";
      assert.deepEqual(getData(inputData, fs, "head"), expectedOutput);
    });

    it("should return file not found error message if file is invalid", function() {
      inputData = { count: "10", option: "n", files: ["abc"] };
      expectedOutput = "tail: abc: No such file or directory";
      assert.deepEqual(getData(inputData, fs, "tail"), expectedOutput);
    });
  });
});
