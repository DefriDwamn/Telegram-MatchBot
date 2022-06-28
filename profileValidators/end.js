const messageValidator = require('.');
const userModel = require('../models/user');
const { checkUserAndSendProfile } = require('../inputs/profile');

module.exports = class end extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;

        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        user.profileEditMode = false;
        await checkUserAndSendProfile(user, chatId, this.bot);
    }
}