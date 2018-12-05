const extractLines = function(file,numberOfLines){
  return file.slice(0,numberOfLines).join('\n');
}

const extractCharacters = function(file,numberOfCharacters){
  return file.join('\n').slice(0,numberOfCharacters);
}

const organiseInputData = function(details){

  let organisedData = {type : 'n' , count : 10 , files : details.slice(2)};

  if(details[2] == '-n' || details[2] == '-c'){
    organisedData = {type : details[2][1] , count : details[3] ,files : details.slice(4)};
  }

  if(details[2][0] == '-' && details[2].length >2 ){
    organisedData = {type : details[2][1] , count : details[2].slice(2) , files : details.slice(3) } 
  }

  if(parseInt(details[2])){
    organisedData = {type : 'n' , count : Math.abs(details[2]) , files : details.slice(3)}
  }

  return organisedData;
}

const fetchData = function(fileDetails , fileName){
  let {readFileContent , delimeter , output, funcRef , count} = fileDetails;
  output.push(delimeter + '==> '+ fileName +' <==')
  output.push(funcRef(readFileContent(fileName,'utf8').split('\n'),count));
  fileDetails.delimeter = '\n';
  return fileDetails;
}

const head = function(inputDetails,readFileContent){
  let {type , count , files} = organiseInputData(inputDetails);
  let getOutput = {'n':extractLines , 'c':extractCharacters};
  let funcRef = getOutput[type];
  let fileDetails = {output : [] , delimeter:'' , count , funcRef , readFileContent };

  if( count == 0 ){
    return 'illegal line count -- 0'
  }

  if(files.length == 1){
    return funcRef(readFileContent(files[0],'utf8').split('\n'),count);
  }

  return files.reduce( fetchData ,fileDetails).output.join('\n');
}

module.exports = { extractLines , extractCharacters , organiseInputData , fetchData ,head};
