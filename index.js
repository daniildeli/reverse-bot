const TelegramBot = require('node-telegram-bot-api');

const token = '815338231:AAHcB8ujZ-XahIvGTyOPlQttHeqjdMGxAM8';
const url = process.env.APP_URL || 'https://revert-bot.herokuapp.com:443';
const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const reverted = msg.text.split('').revert().join('')
  bot.sendMessage(chatId, 'reverted')
});