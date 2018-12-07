const fs = require('fs');
const head = require('./src/lib.js').head;

const main = function(args){
  args = args.slice(2);
  return head(args,fs);
}
console.log(main(process.argv));
