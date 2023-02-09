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

module.exports = {
    getSpamMetaData
}
