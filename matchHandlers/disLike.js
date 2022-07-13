const matchHandler = require('.');
const userModel = require('../models/user');

module.exports = class disLike extends matchHandler {
    constructor(bot) {
        super(bot);
    }

    async handler(message) {
        const chatId = message.chat.id;
        
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
    }
}