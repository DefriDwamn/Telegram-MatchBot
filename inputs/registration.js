const userModel = require('../models/user');
const options = require('../options');
const { checkUserAndSendProfile } = require('./profile');

module.exports = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
        const contactId = message.contact.user_id;
        if (!user.phoneNumber && chatId == contactId) {
            setUserDefualtValues(user, message);
            await bot.sendMessage(chatId, `Вы успешно авторизовались!`, options.deleteKeyboardOptions);
            await checkUserAndSendProfile(user, chatId, bot);
        }
    } catch (err) {
        console.log(err);
    }
}

function setUserDefualtValues(user, message) {
    const contactPhone = message.contact.phone_number;
    const tgTag = message.from.username;
    user.phoneNumber = contactPhone;
    user.tgTag = "@" + tgTag;
    user.matchMode = false;
    user.checkLikesMode = false;
    user.likeUsersChatId = [];
}