const { Client, GatewayIntentBits } = require('discord.js');
const { handlewelcomeReply , handleGetTime } = require('./controllers/annabelle')
const { canWelcomeText } = require('./utils/canThisText')

const TOKEN = 'MTA3Mjg3NDAzOTE0NTY2MDQ0Nw.GuY67V.yQkJCZjGQatX7ESA5_L1QtR5EjCMTlwrqx088s'
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages , GatewayIntentBits.MessageContent] });

client.on('messageCreate',(message) => {
    if(message.author.bot) return 
    if(message.content.startsWith('time')){
        handleGetTime(message)
    }
    if(canWelcomeText.includes(message.content)){
        handlewelcomeReply(message)
    }
})

client.on('interactionCreate', interaction => {
    interaction.reply('Pong')
})

client.login(TOKEN)