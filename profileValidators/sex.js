const messageValidator = require('.');
const userModel = require('../models/user');
const { checkUserAndSendProfile } = require('../inputs/profile');
const lang = require('../utils/lang')

module.exports = class sex extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;

        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        this.swapUserProfileSex(user);
        await checkUserAndSendProfile(user, chatId, this.bot);
    }

    swapUserProfileSex(user) {
        if (user.sex === null) {
            user.sex = lang.male;
        } else if (user.sex === lang.male) {
            user.sex = lang.female;
        } else if (user.sex === lang.female) {
            user.sex = lang.male;
        }
    }
}