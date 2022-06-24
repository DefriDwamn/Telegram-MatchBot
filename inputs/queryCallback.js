const userModel = require('../models/user');

module.exports = (bot) => async (cback) => {
    const message = cback.message;
    const chatId = message.chat.id;
    try {
        bot.answerCallbackQuery(cback.id);

        let dataCallback = cback.data.match(/(name|age|sex|sexLike|photo|description)_clbck$/);
        if(dataCallback && dataCallback[0]){
            let dataCallbackName = dataCallback[0].replace('_clbck','');
            const messageValidator = require(`../Validators/${dataCallbackName}`);
            await new messageValidator(bot).listenReplyMessage(message);
        }
    } catch(err) {
        console.log(err);
    }
}