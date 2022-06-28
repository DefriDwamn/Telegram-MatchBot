const userModel = require('../models/user');

module.exports = (bot) => async (cback) => {
    try {
        const message = cback.message;
        bot.answerCallbackQuery(cback.id);

        let dataCallback = cback.data.match(/(name|age|sex|sexLike|photo|description|end)_clbck$/);
        if (dataCallback && dataCallback[0]) {
            let dataCallbackName = dataCallback[0].replace('_clbck', '');
            const messageValidator = require(`../profileValidators/${dataCallbackName}`);
            await new messageValidator(bot).listenReplyMessage(message);
        }
    } catch (err) {
        console.log(err);
    }
}