const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('Please provide a correct bot token');
}

const url = process.env.APP_URL;
const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const response = msg.text === '/start' ? `Hi, ${msg.from.first_name}! Send me any message and I will rewrite it in reverse order.` : msg.text.split('').reverse().join('');
  bot.sendMessage(chatId, response);
});
