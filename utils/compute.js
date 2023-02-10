function getSpamMetaData(params,message) {
  let lastNumber = !isNaN(params[params.length - 1]);
  const text =
    params.length > 2
      ? params
          .slice(
            2,
            params.length > 3
              ? lastNumber
                ? params.length - 1
                : params.length
              : params.length
          )
          .join(" ")
      : message.author.username;
  let times = params.length > 2 ? +params[params.length - 1] : 10;
  if (isNaN(times)) times = 10;
  return [text,times]
}

function getTimeStatus(message,handleGetTime){
  const currentIndiaTime = handleGetTime(message,true).split(':')
  const hour = +currentIndiaTime[0]
  if(hour >= 4 && hour <= 11){
    return "MORNING"
  }else if(hour >= 12 && hour <= 16){
    return "NOON"
  }else if(hour >= 17 && hour <= 22){
    return "EVENING"
  }else{
    return "NIGHT"
  }
}
module.exports = {
    getSpamMetaData,
    getTimeStatus
}
