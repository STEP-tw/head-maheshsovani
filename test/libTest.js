const assert = require('assert');
const { extractLines , extractCharacters , organiseInputData } = require('../src/lib.js');

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
