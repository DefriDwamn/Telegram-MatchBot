const userModel = require('../models/user');

module.exports = (bot) => async (cback) => {
    const message = cback.message;
    const chatId = message.chat.id;
    try {
        bot.answerCallbackQuery(cback.id);
        const data = JSON.parse(cback.data);
        
        console.log(data);
    } catch(err) {
        console.log(err)
    }
}