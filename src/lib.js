const extractLines = function(file,numberOfLines){
  return file.slice(0,numberOfLines).join('\n');
}

const extractCharacters = function(file,numberOfCharacters){
  return file.join('\n').slice(0,numberOfCharacters);
}

const parseInput = function(details){
  let organisedData = {option : 'n' , count : 10 , files : details.slice(2)};
  if(details[2] == '-n' || details[2] == '-c'){
    organisedData = {option : details[2][1] , count : details[3] ,files : details.slice(4)};
  }
  if(details[2][0] == '-' && details[2].length >2 ){
    organisedData = {option : details[2][1] , count : details[2].slice(2) , files : details.slice(3) } 
  }
  if(parseInt(details[2])){
    organisedData = {option : 'n' , count : Math.abs(details[2]) , files : details.slice(3)}
  }
  return organisedData;
}

const isPresent = function(fileName,doesExist){
  return doesExist(fileName);
}

const retrieveData = function(fileDetails , fileName){
  let {readFileContent ,doesExist , delimeter , content, funcRef , count} = fileDetails;

  if(isPresent(fileName,doesExist)){
    content.push(delimeter + '==> '+ fileName +' <==')
    content.push(funcRef(readFileContent(fileName,'utf8').split('\n'),count));
    fileDetails.delimeter = '\n';
    return fileDetails;
  }
  content.push('head: '+fileName+': No such file or directory');
  return fileDetails;
}

const head = function(inputDetails,readFileContent,doesExist){
  let {option , count , files} = parseInput(inputDetails);
  let getOutput = {'n':extractLines , 'c':extractCharacters};
  let funcRef = getOutput[option];
  let fileDetails = {content : [] , delimeter:'' , count , funcRef , readFileContent ,doesExist };

  if( inputDetails[2] == 0 || count == 0 ){
    return 'head: illegal line count -- 0'
  }
  if(inputDetails[2][0]=='-' && inputDetails[2][1] !='n' && inputDetails[2][1] != 'c' && !parseInt(inputDetails[2])){
    return 'head: illegal option -- '+inputDetails[2][1]+'\nusage: head [-n lines | -c bytes] [file ...]'
  }
  if(isNaN(count-0) || count < 1) { 
    return (option == 'n') ? 'head: illegal line count -- ' + count : 'head: illegal byte count -- ' + count; 
  }
  if(files.length == 1){
    if(!isPresent(files[0],doesExist)) { return 'head: '+files[0]+': No such file or directory'}
    return funcRef(readFileContent(files[0],'utf8').split('\n'),count);
  }
  return files.reduce( retrieveData ,fileDetails).content.join('\n');
}

module.exports = { extractLines , extractCharacters , parseInput , retrieveData ,head};
