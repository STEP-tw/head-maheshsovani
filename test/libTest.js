const assert = require("assert");
const {
  extractHeadLines,
  extractHeadCharacters,
  head,
  tail,
  extractTailLines,
  extractTailCharacters,
  isPresent,
  isValidSingleFile,
  generateRequiredContent,
  generateHeader
} = require("../src/lib.js");

const readFileSync = function(fileName) {
  let fileContents = {
    names: "mahesh\nswapnil\narnab\naftab\ndheeraj",
    numbers: "one\ntwo\nthree\nfour\nfive"
  };
  return fileContents[fileName];
};
const existsSync = function(fileName) {
  let fileNames = ["names", "numbers"];
  return fileNames.includes(fileName);
};

const fs = { readFileSync: readFileSync, existsSync: existsSync };

describe("extract head Lines Function", function() {
  let string = [];
  let expectedOutput = "";

  beforeEach("Make string constant", function() {
    string[0] = "Four sided figure is called quadrilateral";
    string[1] = "Five sided figure is called pentagon";
    string[2] = "Six sided figure is called hexagon";
    string[3] = "Seven sided figure is called heptagon";
    string[4] = "Eight sided figure is called octagon";
  });

  it("should return an empty string when empty array is given ", function() {
    assert.deepEqual(extractHeadLines([]), "");
  });

  it("should return a single line when multiple element array is given and length is one", function() {
    expectedOutput = "Four sided figure is called quadrilateral";
    assert.deepEqual(extractHeadLines(string, 1), expectedOutput);
  });

  it("should return a given number of lines when multiple element array is given ", function() {
    expectedOutput = "Four sided figure is called quadrilateral\n";
    expectedOutput += "Five sided figure is called pentagon\n";
    expectedOutput += "Six sided figure is called hexagon";
    assert.deepEqual(extractHeadLines(string, 3), expectedOutput);
  });

  it("should return whole file when multiple element array is given and number of lines is not specified", function() {
    expectedOutput = "Four sided figure is called quadrilateral\n";
    expectedOutput += "Five sided figure is called pentagon\n";
    expectedOutput += "Six sided figure is called hexagon\n";
    expectedOutput += "Seven sided figure is called heptagon\n";
    expectedOutput += "Eight sided figure is called octagon";
    assert.deepEqual(extractHeadLines(string), expectedOutput);
  });
});

describe("extract Head Characters Function", function() {
  let string = [];
  let expectedOutput = "";
  string[0] = "Four sided figure is called quadrilateral";
  string[1] = "Five sided figure is called pentagon";

  it("should return an empty string when empty array is given ", function() {
    assert.deepEqual(extractHeadCharacters([], 2), "");
  });

  it("should return a single character when length given is one", function() {
    assert.deepEqual(extractHeadCharacters(["Four sided figure"], 1), "F");
  });

  it("should return a given number of characters when long text is given ", function() {
    assert.deepEqual(extractHeadCharacters(["Four sided figure"], 3), "Fou");
    assert.deepEqual(
      extractHeadCharacters(["Four sided figure"], 7),
      "Four si"
    );
  });

  it("should return whole file when number of characters is not specified", function() {
    expectedOutput = "Four sided figure is called quadrilateral\n";
    expectedOutput += "Five sided figure is called pentagon";
    assert.deepEqual(extractHeadCharacters(string), expectedOutput);
  });
});

describe("Head function with single file", function() {
  it("should return the first ten lines of file when count is not specified", function() {
    assert.deepEqual(
      head(["names"], fs),
      "mahesh\nswapnil\narnab\naftab\ndheeraj"
    );
  });

  it("should return the given number of lines when only count is given", function() {
    assert.deepEqual(head([-3, "names"], fs), "mahesh\nswapnil\narnab");
  });

  it("should return the given number of lines when count and option is given without spaces", function() {
    assert.deepEqual(head(["-n2", "names"], fs), "mahesh\nswapnil");
  });

  it("should return the given number of lines when count and option is given with spaces", function() {
    assert.deepEqual(head(["-n", "1", "names"], fs), "mahesh");
  });

  it("should return the given number of characters when count is given with spaces", function() {
    assert.deepEqual(head(["-c", "3", "names"], fs), "mah");
  });

  it("should return the given number of characters when count is given without spaces", function() {
    assert.deepEqual(head(["-c6", "names"], fs), "mahesh");
  });
});

describe("Head function with multiple file", function() {
  it("should return the first ten lines of file when count is not specified", function() {
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\narnab\naftab\ndheeraj\n\n==> names <==\nmahesh\nswapnil\narnab\naftab\ndheeraj";
    assert.deepEqual(head(["names", "names"], fs), expectedOutput);
  });

  it("should return the given number of lines when only count is given", function() {
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\narnab\n\n==> numbers <==\none\ntwo\nthree";
    assert.deepEqual(head([-3, "names", "numbers"], fs), expectedOutput);
  });

  it("should return the given number of lines when count and option is given without spaces", function() {
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\n\n==> numbers <==\none\ntwo";
    assert.deepEqual(head(["-n2", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the given number of lines when count and option is given with spaces", function() {
    expectedOutput = "==> names <==\nmahesh\n\n==> numbers <==\none";
    assert.deepEqual(head(["-n", "1", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the given number of characters when count is given with spaces", function() {
    expectedOutput = "==> names <==\nmah\n\n==> numbers <==\none";
    assert.deepEqual(head(["-c", "3", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the given number of characters when count is given without spaces", function() {
    expectedOutput = "==> names <==\nmahesh\n\n==> numbers <==\none\ntw";
    assert.deepEqual(head(["-c6", "names", "numbers"], fs), expectedOutput);
  });
});

describe("Head function errors handling", function() {
  it("should return the error message when number of lines is given zero with n without spaces", function() {
    expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(head(["-n0", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the error message when  is count is given zero only without -c or -n", function() {
    expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(head(["-0", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the error message when  is count is given zero only without -c or -n", function() {
    expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(head(["0", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the error message when  is count is invalid with -c or -n", function() {
    expectedOutput = "head: illegal line count -- -12";
    assert.deepEqual(head(["-n-12", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the error message when  file is not present in the directory", function() {
    expectedOutput =
      "head: README.mdafs: No such file or directory\n==> numbers <==\none\ntwo\nthree";
    assert.deepEqual(
      head(["-n3", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
  });

  it("should return the error message when option other than -c or -n is given ", function() {
    expectedOutput =
      "head: illegal option -- x\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(
      head(["-x3", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
  });

  it("should return the error message when option other than -c or -n is given ", function() {
    expectedOutput =
      "head: illegal option -- z\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(
      head(["-z", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
  });

  it("should return the error message when option is correct but only one file which doesn't exist is given", function() {
    expectedOutput = "head: README.mdafs: No such file or directory";
    assert.deepEqual(head(["-n3", "README.mdafs"], fs), expectedOutput);
  });

  it("should return the error message when -n or -c and then alphanumeric combination is given ", function() {
    expectedOutput = "head: illegal line count -- u922";
    assert.deepEqual(
      head(["-nu922", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
    expectedOutput = "head: illegal byte count -- u922";
    assert.deepEqual(
      head(["-cu922", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
  });
});

describe("extract tail Lines Function", function() {
  let string = [];
  let expectedOutput = "";

  beforeEach("Make string constant", function() {
    string[0] = "Four sided figure is called quadrilateral";
    string[1] = "Five sided figure is called pentagon";
    string[2] = "Six sided figure is called hexagon";
    string[3] = "Seven sided figure is called heptagon";
    string[4] = "Eight sided figure is called octagon";
  });

  it("should return an empty string when empty array is given ", function() {
    assert.deepEqual(extractTailLines([]), "");
  });

  it("should return a single line when multiple element array is given and length is one", function() {
    expectedOutput = "Eight sided figure is called octagon";
    assert.deepEqual(extractTailLines(string, 1), expectedOutput);
  });

  it("should return a given number of lines when multiple element array is given ", function() {
    expectedOutput = "Six sided figure is called hexagon\n";
    expectedOutput += "Seven sided figure is called heptagon\n";
    expectedOutput += "Eight sided figure is called octagon";
    assert.deepEqual(extractTailLines(string, 3), expectedOutput);
  });

  it("should return whole file when multiple element array is given and number of lines is not specified", function() {
    expectedOutput = "Four sided figure is called quadrilateral\n";
    expectedOutput += "Five sided figure is called pentagon\n";
    expectedOutput += "Six sided figure is called hexagon\n";
    expectedOutput += "Seven sided figure is called heptagon\n";
    expectedOutput += "Eight sided figure is called octagon";
    assert.deepEqual(extractTailLines(string), expectedOutput);
  });
});

describe("extract tail Characters Function", function() {
  let string = [];
  let expectedOutput = "";
  string[0] = "Four sided figure is called quadrilateral";
  string[1] = "Five sided figure is called pentagon";

  it("should return an empty string when empty array is given ", function() {
    assert.deepEqual(extractTailCharacters([], 2), "");
  });

  it("should return a single character when length given is one", function() {
    assert.deepEqual(extractTailCharacters(["Four sided figure"], 1), "e");
  });

  it("should return a given number of characters when long text is given ", function() {
    assert.deepEqual(extractTailCharacters(["Four sided figure"], 3), "ure");
    assert.deepEqual(
      extractTailCharacters(["Four sided figure"], 7),
      " figure"
    );
  });

  it("should return whole file when number of characters is not specified", function() {
    expectedOutput = "Four sided figure is called quadrilateral\n";
    expectedOutput += "Five sided figure is called pentagon";
    assert.deepEqual(extractTailCharacters(string), expectedOutput);
  });
});

describe("Tail function with single file", function() {
  it("should return the first ten lines of file when count is not specified", function() {
    assert.deepEqual(
      tail(["names"], fs),
      "mahesh\nswapnil\narnab\naftab\ndheeraj"
    );
  });

  it("should return the given number of lines when only count is given", function() {
    assert.deepEqual(tail([-3, "names"], fs), "arnab\naftab\ndheeraj");
  });

  it("should return the given number of lines when count and option is given without spaces", function() {
    assert.deepEqual(tail(["-n2", "names"], fs), "aftab\ndheeraj");
  });

  it("should return the given number of lines when count and option is given with spaces", function() {
    assert.deepEqual(tail(["-n", "1", "names"], fs), "dheeraj");
  });

  it("should return the given number of characters when count is given with spaces", function() {
    assert.deepEqual(tail(["-c", "3", "names"], fs), "raj");
  });

  it("should return the given number of characters when count is given without spaces", function() {
    assert.deepEqual(tail(["-c6", "names"], fs), "heeraj");
  });
});

describe("Tail function with multiple file", function() {
  it("should return the first ten lines of file when count is not specified", function() {
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\narnab\naftab\ndheeraj\n\n==> names <==\nmahesh\nswapnil\narnab\naftab\ndheeraj";
    assert.deepEqual(tail(["names", "names"], fs), expectedOutput);
  });

  it("should return the given number of lines when only count is given", function() {
    expectedOutput =
      "==> names <==\narnab\naftab\ndheeraj\n\n==> numbers <==\nthree\nfour\nfive";
    assert.deepEqual(tail([-3, "names", "numbers"], fs), expectedOutput);
  });

  it("should return the given number of lines when count and option is given without spaces", function() {
    expectedOutput =
      "==> names <==\naftab\ndheeraj\n\n==> numbers <==\nfour\nfive";
    assert.deepEqual(tail(["-n2", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the given number of lines when count and option is given with spaces", function() {
    expectedOutput = "==> names <==\ndheeraj\n\n==> numbers <==\nfive";
    assert.deepEqual(tail(["-n", "1", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the given number of characters when count is given with spaces", function() {
    expectedOutput = "==> names <==\nraj\n\n==> numbers <==\nive";
    assert.deepEqual(tail(["-c", "3", "names", "numbers"], fs), expectedOutput);
  });

  it("should return the given number of characters when count is given without spaces", function() {
    expectedOutput = "==> names <==\nheeraj\n\n==> numbers <==\nr\nfive";
    assert.deepEqual(tail(["-c6", "names", "numbers"], fs), expectedOutput);
  });
});

describe("Tail function errors handling", function() {
  it("should return the error message when number of lines is given zero with n without spaces", function() {
    assert.deepEqual(tail(["-n0", "names", "numbers"], fs), "");
  });

  it("should return the error message when  is count is given zero only without -c or -n", function() {
    assert.deepEqual(tail(["-0", "names", "numbers"], fs), "");
  });

  it("should return the error message when  file is not present in the directory", function() {
    expectedOutput =
      "tail: README.mdafs: No such file or directory\n==> numbers <==\nthree\nfour\nfive";
    assert.deepEqual(
      tail(["-n3", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
  });

  it("should return the error message when option other than -c or -n is given ", function() {
    expectedOutput =
      "tail: illegal option --  x\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    assert.deepEqual(
      tail(["-x3", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
  });

  it("should return the error message when option other than -c or -n is given ", function() {
    expectedOutput =
      "tail: illegal option --  z\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    assert.deepEqual(
      tail(["-z", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
  });

  it("should return the error message when option is correct but only one file which doesn't exist is given", function() {
    expectedOutput = "tail: README.mdafs: No such file or directory";
    assert.deepEqual(tail(["-n3", "README.mdafs"], fs), expectedOutput);
  });

  it("should return the error message when -n or -c and then alphanumeric combination is given ", function() {
    expectedOutput = "tail: illegal offset -- u922";
    assert.deepEqual(
      tail(["-nu922", "README.mdafs", "numbers"], fs),
      expectedOutput
    );
    expectedOutput = "tail: illegal offset -- u922";
    assert.deepEqual(
      tail(["-cu922", "README.mdafs", "numbers"], fs),
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
  it("should return when operation head is specified with count and option(-n)", function() {
    inputData = {
      count: 2,
      files: ["names"],
      funcName: "head",
      funcRef: extractHeadLines
    };
    assert.deepEqual(generateRequiredContent(inputData, fs), "mahesh\nswapnil");
  });

  it("should return when operation tail is specified with count and option(-n)", function() {
    inputData = {
      count: 2,
      files: ["numbers"],
      funcName: "tail",
      funcRef: extractTailLines
    };
    assert.deepEqual(generateRequiredContent(inputData, fs), "four\nfive");
  });

  it("should return when operation head is specified with count and option(-c)", function() {
    inputData = {
      count: 6,
      files: ["names"],
      funcName: "head",
      funcRef: extractHeadCharacters
    };
    assert.deepEqual(generateRequiredContent(inputData, fs), "mahesh");
  });

  it("should return when operation tail is specified with count and option(-c)", function() {
    inputData = {
      count: 6,
      files: ["numbers"],
      funcName: "head",
      funcRef: extractTailCharacters
    };
    assert.deepEqual(generateRequiredContent(inputData, fs), "r\nfive");
  });
});

describe("generateRequiredContent function for multiple files", function() {
  it("should return when operation head is specified with count and option(-n)", function() {
    inputData = {
      count: 2,
      files: ["names", "numbers"],
      funcName: "head",
      funcRef: extractHeadLines
    };
    expectedOutput =
      "==> names <==\nmahesh\nswapnil\n\n==> numbers <==\none\ntwo";
    assert.deepEqual(generateRequiredContent(inputData, fs), expectedOutput);
  });

  it("should return when operation tail is specified with count and option(-n)", function() {
    inputData = {
      count: 2,
      files: ["names", "numbers"],
      funcName: "tail",
      funcRef: extractTailLines
    };
    expectedOutput =
      "==> names <==\naftab\ndheeraj\n\n==> numbers <==\nfour\nfive";
    assert.deepEqual(generateRequiredContent(inputData, fs), expectedOutput);
  });

  it("should return when operation head is specified with count and option(-c)", function() {
    inputData = {
      count: 10,
      files: ["names", "numbers"],
      funcName: "head",
      funcRef: extractHeadCharacters
    };
    expectedOutput =
      "==> names <==\nmahesh\nswa\n\n==> numbers <==\none\ntwo\nth";
    assert.deepEqual(generateRequiredContent(inputData, fs), expectedOutput);
  });

  it("should return when operation tail is specified with count and option(-c)", function() {
    inputData = {
      count: 10,
      files: ["names", "numbers"],
      funcName: "tail",
      funcRef: extractTailCharacters
    };
    expectedOutput =
      "==> names <==\nab\ndheeraj\n\n==> numbers <==\n\nfour\nfive";
    assert.deepEqual(generateRequiredContent(inputData, fs), expectedOutput);
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
