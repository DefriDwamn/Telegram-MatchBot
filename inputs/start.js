const userModel = require('../models/user');
const options = require('../options');

module.exports = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        bot.sendChatAction(chatId, "typing");

        const findCreateUser = await userModel.findOrCreate({ where: { chatId: chatId.toString() } });
        const userIsCreatedNow = findCreateUser[1];
        const user = findCreateUser[0];

        const userInfo = message.from;
        const userName = userInfo.first_name;

        if (userIsCreatedNow) {
            await bot.sendMessage(chatId, `${userName}, приветствую в Matchin боте!`);
        }
        if (!user.phoneNumber) {
            await bot.sendMessage(chatId, `Если вы хотите использовать Matchin, вам необходимо подтвердить свой аккаунт.`, options.registerOptions)
        }
    } catch (err) {
        console.log(err);
    }
}