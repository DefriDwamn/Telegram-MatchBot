const userModel = require('../models/user');
const options = require('../options');

module.exports = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });

        if (user.phoneNumber) {
            if (!isUserFilledProfile(user)) {
                await bot.sendMessage(chatId, `Ваша анкета пуста! Вам необходимо ее заполнить.`, options.profileEditOptions)
            } else {
                await bot.sendMessage(chatId, `Профиль`)
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function isUserFilledProfile(user) {
    if (user.name && user.age && user.sex && user.sex_like && user.photoId) {
        return true
    }
    return false
}