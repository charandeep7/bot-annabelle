const { random } = require('glowing-engine')

const emojis = ['😀','😁','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','🥲','😚','🙂','🤗','🤩','🤔','🫡','🤨','😐','😑','😶','🫥','😶‍🌫️','🙄','😏','😣','😮','🤐','😯','🥱','😴','😌','😛','😜','😝','🤤','😒','🙃','🫠','🤑','😲','😟']

function handlewelcomeReply(message) {
  const userName = message.author.username;
  return message.reply({
    content: `Hey ${userName} ${random.randomPickFromArray(emojis)}`,
  });
}

function handleGetTime(message){
    const userName = message.author.username;
    return message.reply({
        content: `It's ${new Date().toLocaleTimeString()} ${userName}`
    })
}

module.exports = {
    handlewelcomeReply,
    handleGetTime
}