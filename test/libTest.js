const assert = require('assert');
const { extractLines , extractCharacters , organiseInputData , fetchData , head } = require('../src/lib.js');

describe("extract Lines Function",function() {

  let string = [];
  let expectedOutput = '';

  beforeEach('Make string constant',function(){
    string[0] = 'Four sided figure is called quadrilateral';
    string[1] = 'Five sided figure is called pentagon';
    string[2] = 'Six sided figure is called hexagon';
    string[3] = 'Seven sided figure is called heptagon';
    string[4] = 'Eight sided figure is called octagon';
  });

  it("should return an empty string when empty array is given ",function() {
    assert.deepEqual(extractLines([]),'');
  });

  it("should return a single line when multiple element array is given and length is one",function() {
    expectedOutput = 'Four sided figure is called quadrilateral';
    assert.deepEqual(extractLines(string,1),expectedOutput);
  });

  it("should return a given number of lines when multiple element array is given ",function() {
    expectedOutput = 'Four sided figure is called quadrilateral\n';
    expectedOutput += 'Five sided figure is called pentagon\n';
    expectedOutput += 'Six sided figure is called hexagon';
    assert.deepEqual(extractLines(string,3),expectedOutput);
  });

  it("should return whole file when multiple element array is given and number of lines is not specified",function() {
    expectedOutput = 'Four sided figure is called quadrilateral\n';
    expectedOutput += 'Five sided figure is called pentagon\n';
    expectedOutput += 'Six sided figure is called hexagon\n';
    expectedOutput += 'Seven sided figure is called heptagon\n';
    expectedOutput += 'Eight sided figure is called octagon';
    assert.deepEqual(extractLines(string),expectedOutput);
  });
});


describe("extract Characters Function",function() {

  let string = [];
  let expectedOutput = '';
  string[0] = 'Four sided figure is called quadrilateral';
  string[1] = 'Five sided figure is called pentagon';

  it("should return an empty string when empty array is given ",function() {
    assert.deepEqual(extractCharacters([],2),'');
  });

  it("should return a single character when length given is one",function() {
    assert.deepEqual(extractCharacters(['Four sided figure'],1),'F');
  });

  it("should return a given number of characters when long text is given ",function() {
    assert.deepEqual(extractCharacters(['Four sided figure'],3),'Fou');
    assert.deepEqual(extractCharacters(['Four sided figure'],7),'Four si');
  });

  it("should return whole file when number of characters is not specified",function() {
    expectedOutput = 'Four sided figure is called quadrilateral\n';
    expectedOutput += 'Five sided figure is called pentagon';
    assert.deepEqual(extractCharacters(string),expectedOutput);
  });
});


describe('organiseInputData', function () {
  let inputData;
  let expectedOutput;

  it('should give default type -n and count 10 when count and type are not specified', function () {
    inputData = ['','','file1.txt']
    expectedOutput = {type : 'n' , count : 10 , files:['file1.txt']}
    assert.deepEqual(organiseInputData(inputData),expectedOutput);
  });

  it('should give default type -n and count as given when type is not specified', function () {
    inputData = ['','',-5,'file1.txt','file2.txt']
    expectedOutput = {type : 'n' , count : 5 , files:['file1.txt','file2.txt']}
    assert.deepEqual(organiseInputData(inputData),expectedOutput);
  });

  it('should return organised type and count when both are given without spaces', function () {
    inputData = ['','','-n10','file1.txt','file2.txt']
    expectedOutput = {type : 'n' , count : 10 , files:['file1.txt','file2.txt']}
    assert.deepEqual(organiseInputData(inputData),expectedOutput);

    inputData = ['','','-c10','file1.txt','file2.txt']
    expectedOutput = {type : 'c' , count : 10 , files:['file1.txt','file2.txt']}
    assert.deepEqual(organiseInputData(inputData),expectedOutput);
  });

  it('should return organised type and count when both are given with spaces in between.', function () {

    let inputData = [,,'-n',12, 'file1.txt','file2.txt']
    let expectedOutput = {type : 'n' , count : 12 , files:['file1.txt','file2.txt']}
    assert.deepEqual(organiseInputData(inputData),expectedOutput);

    inputData = ['','','-c',15,'file1.txt','file2.txt']
    expectedOutput = {type : 'c' , count : 15 , files:['file1.txt','file2.txt']}
    assert.deepEqual(organiseInputData(inputData),expectedOutput);
  });
});

describe('fetchData', function () {
  let inputData;
  let expectedOutput;
  const readFileContent = filename => "yes readContent executed";
  const truthy = value => true;

  it('should return fetched data according to specified file details', function() {
    inputData = {delimeter : '', readFileContent, funcRef : truthy, output : [], count : 2};
    expectedOutput = {delimeter : '\n', readFileContent, funcRef : truthy, output : ["==> fileName <==" ,true], count : 2};
    assert.deepEqual(fetchData(inputData, "fileName"), expectedOutput);
  });

  it('should return fetched data according to specified file details and should not change function reference', function() {
    inputData = {delimeter : '', readFileContent, funcRef : truthy, output : [], count : 2};
    expectedOutput = {delimeter : '\n', readFileContent, funcRef : truthy, output : ["==> fileName <==" , true], count : 2};
    assert.deepEqual(fetchData(inputData, "fileName"), expectedOutput);
  });
});

describe('Head function', function () {
  let inputDetails;
  let expectedOutput;
  let readFileContent = function(x){return 'mahesh\nswapnil\narnab\naftab\ndheeraj'}

  it('should return the first ten lines of file when count is not specified', function () {
    assert.deepEqual(head([,,'file1.txt'],readFileContent),'mahesh\nswapnil\narnab\naftab\ndheeraj');
  });

  it('should return the given number of lines when only count is given', function () {
    assert.deepEqual(head(['','',-3,'file1.txt'],readFileContent),'mahesh\nswapnil\narnab');
  });

  it('should return the given number of lines when count and type is given without spaces', function () {
    assert.deepEqual(head(['','','-n2','file1.txt'],readFileContent),'mahesh\nswapnil');
  });

  it('should return the given number of lines when count and type is given with spaces', function () {
    assert.deepEqual(head(['','',"-n",'1','file1.txt'],readFileContent),'mahesh');
  });

  it('should return the given number of characters when count is given with spaces', function () {
    assert.deepEqual(head(['','',"-c",'3','file1.txt'],readFileContent),'mah');
  });

  it('should return the given number of characters when count is given without spaces', function () {
    assert.deepEqual(head(['','',"-c6",'file1.txt'],readFileContent),'mahesh');
  });
});

