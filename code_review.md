### CODE REVIEW

```errorHandler.js has no independent tests
lib.js
1- destructuring can be better
2- file is an array // poor name
29- function isPresent can be reused in isValidSingleFile
57- funcRef poor name
75- duplication in head and tail
75- unnecessary if in tail

parser.js
1- details poor name
2- defaultParameters //poor name 
33- can use startsWith()

errorHandler.js
can use arguments parsed by parseInput()
28- FunctionName //poor name
35- unused variable files
38- poor if condition
38- checkValidOption //poor name
53- inputDetails // poor name
54- option and files are unused variables
56- can remove if conditions

libTest.js
no let for expectedOutput and inputData
27- structuring is bad
42- can extract actualOutput in variable
70- test inputs for extracting lines and characters () can be small
78- if statement can be more precise
94- poor it description
94- misleading tests```