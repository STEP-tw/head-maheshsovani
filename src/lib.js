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

module.exports = { extractLines , extractCharacters , organiseInputData };
