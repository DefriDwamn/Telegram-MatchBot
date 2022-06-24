const userModel = require('../models/user');

module.exports = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
    } catch(err) {
        console.log(err);
    }
}