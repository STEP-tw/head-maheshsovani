const head = require('./src/lib.js').head;
const readFileContent = require('fs').readFileSync;
const doesExist = require('fs').existsSync;

const main = function(args){
  return head(args,readFileContent,doesExist);
}
console.log(main(process.argv));
