const head = require('./src/lib.js').head;
const readFileContent = require('fs').readFileSync;

const main = function(args){
  return head(args,readFileContent);
}
console.log(main(process.argv , readFileContent));
