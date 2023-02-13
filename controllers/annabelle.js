const { random } = require("glowing-engine");

const { getTimeStatus } = require("../utils/compute")

const emojis = [
  "😀",
  "😁",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "🥰",
  "😗",
  "😙",
  "🥲",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🫡",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🫥",
  "😶‍🌫️",
  "🙄",
  "😏",
  "😣",
  "😮",
  "🤐",
  "😯",
  "🥱",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "🙃",
  "🫠",
  "🤑",
  "😲",
  "😟",
];

function handlewelcomeReply(message) {
  const userName = message.author.username;
  return message.reply({
    content: `Hey **${userName}** ${random.randomPickFromArray(
      emojis
    )} \n MISS ME ? 👀`,
  });
}

function handleGetTime(message,flag=false) {
  const userName = message.author.username;
  const date = new Date();
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const timeOffset = 5 + 30 / 60;
  const India = new Date(utcTime + 3600000 * timeOffset).toLocaleTimeString();
  if(flag) return new Date().toLocaleTimeString([],{
    hour12: false
  })
  return message.reply({
    content: `It's ${India} ${userName} and The server timing is ${new Date().toLocaleTimeString()}.`,
  });
}

function handleGetDate(message) {
  const userName = message.author.username;
  const date = new Date();
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const timeOffset = 5 + 30 / 60;
  const India = new Date(utcTime + 3600000 * timeOffset).toLocaleDateString({

  });
  return message.reply({
    content: `It's ${India} ${userName} and The server date is ${new Date().toLocaleDateString()}.`,
  });
}

function handleTagWelcomeMessgae(message) {
  const userName = message.author.username;
  const admin = message.author.id;
  return message.channel.send(
    `Hey **${userName}** ${random.randomPickFromArray(
      emojis
    )}. I'm a bot which is developed by <@${admin}>`
  );
}

function handleSpam(canSpam, message, text = "Kitish") {
  if (canSpam === false) {
    return message.reply({
      content: `SORRY !!! MAX_LIMIT = 100 \n Actually, I'm hosted on a free server so it may create issue for me.`,
    });
  }
  return message.reply({
    content: `${text}`,
  });
}

function handleBye(message){
  const byeMsg = [`Bye ${message.author.username}`,`Bye-Bye`,`Bye, See ya`,`Okay, Bye 👋🏻`,`Bye, See you never`]
  return message.reply({
    content: `${random.randomPickFromArray(byeMsg)}`
  })
}

function handleGoodMorning(message){
  const status = getTimeStatus(message,handleGetTime)
  if(status !== "MORNING"){
    return message.reply({
      content: `I think it's **${status}**. Anyway, good morning lol`
    })
  }
  const goodMorningMsg = ['goodmorning',`Good Morning`,'morning','Morning',`Good Morning ${message.author.username}`,`gm`,'good morning',`Good Morning ! Have a nice day ${message.author.username}`]
  return message.reply({
    content: `${random.randomPickFromArray(goodMorningMsg)}`
  })
}

function handleGoodAfterNoon(message){
  const status = getTimeStatus(message,handleGetTime)
  if(status !== "NOON"){
    return message.reply({
      content: `I think it's **${status}**. Anyway, Good Afternoon lol ${random.randomPickFromArray(
        emojis
      )}`
    })
  }
  const goodAfterNoonMsg = ['goodafternoon',`Good AfterNoon`,`Good AfterNoon ${message.author.username}`,`ga`,'good afternoon',`Good AfterNoon ! Have a funny day ${message.author.username}`]
  return message.reply({
    content: `${random.randomPickFromArray(goodAfterNoonMsg)}`
  })
}

function handleGoodEvening(message){
  const status = getTimeStatus(message,handleGetTime)
  if(status !== "EVENING"){
    return message.reply({
      content: `I think it's **${status}**. Anyways, Good Evening}`
    })
  }
  const goodEveningMsg = ['goodevening',`Good Evening`,`Good Evening ${message.author.username}`,`ge`,'good evening','evening','Evening',`Good Evening ! Have a cool evening ${message.author.username}`]
  return message.reply({
    content: `${random.randomPickFromArray(goodEveningMsg)}`
  })
}

function handleGoodNight(message){
  const status = getTimeStatus(message,handleGetTime)
  if(status !== "NIGHT"){
    return message.reply({
      content: `Lol, Okay Good Night but I think it's currently **${status}**`
    })
  }
  const goodNightMsg = ['goodnight',`Good Night`,`Good Night **${message.author.username}**`,`gn`,'good night',`Good Night !! Sweet Dreams ${message.author.username}`,'night','Night','Okay, Good night','gud ni8']
  return message.reply({
    content: `${random.randomPickFromArray(goodNightMsg)}`
  })
}

function handleTemp(message) {
  return message.reply({
    content: `YES, **CAT** IS PRESENT IN THIS SERVER`,
  });
}

function handle404(message) {
  return message.reply({
    content: `Thanks for your message. I'm still learning.`,
  });
}

module.exports = {
  handlewelcomeReply,
  handleGetTime,
  handleGetDate,
  handleTagWelcomeMessgae,
  handleSpam,
  handleBye,
  handleGoodMorning,
  handleGoodAfterNoon,
  handleGoodEvening,
  handleGoodNight,
  handleTemp,
  handle404,
};
