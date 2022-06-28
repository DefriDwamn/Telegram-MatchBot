const messageValidator = require('.');
const userModel = require('../models/user');
const { checkUserAndSendProfile } = require('../inputs/profile');
const lang = require('../utils/lang')

module.exports = class sexLike extends messageValidator {
    constructor(bot) {
        super(bot);
    }

    async listenReplyMessage(message) {
        const chatId = message.chat.id;

        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        this.swapUserProfileSexLike(user);
        await checkUserAndSendProfile(user, chatId, this.bot);
    }

    swapUserProfileSexLike(user) {
        if (user.sex_like === null) {
            user.sex_like = lang.anySex;
        } else if (user.sex_like === lang.anySex) {
            user.sex_like = lang.females;
        } else if (user.sex_like === lang.females) {
            user.sex_like = lang.males;
        } else if (user.sex_like === lang.males) {
            user.sex_like = lang.anySex;
        }
    }
}