const TelegramBot = require('node-telegram-bot-api');

const token = '801389212:AAE9vpkNalGg3QJx2HdK6W1RzWr9ZqzQNjw';
const url = process.env.APP_URL || 'https://reverse-text-bot.herokuapp.com:443';
const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const userInfo = {
} ;

const rememberMode = {}

const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const response = msg.text === '/start' ? `Привет, ${msg.from.first_name}! Отправь мне любое сообщение и я перепишу его в обратном порядке.` : msg.text.split('').reverse().join('');
  bot.sendMessage(chatId, response);
});

bot.onText(/\/remember/, (msg) => {
  const chatId = msg.chat.id;
  let text = '';
  if ((`${msg.from.id}` in userInfo)) {
    text = userInfo[`${msg.from.id}`].hobby;
  } else {
    text = 'I do not know your hobby';
    rememberMode[`${msg.from.id}`] = {}
  }
  bot.sendMessage(chatId, text);
  console.log(msg);
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if ((`${msg.from.id}` in rememberMode)) {
    userInfo[`${msg.from.id}`] = {
      hobby: msg.text
    }
    delete rememberMode[`${msg.from.id}`];
    bot.sendMessage(chatId, 'Hobby added');
  }
})