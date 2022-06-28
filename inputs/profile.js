const userModel = require('../models/user');
const options = require('../options');

const profile = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
        user.tgTag = "@"+message.from.username;
        user.matchMode = false;
        await checkUserAndSendProfile(user, chatId, bot);
    } catch (err) {
        console.log(err);
    }
}
const profileEdit = (bot) => async (message) => {
    const chatId = message.chat.id;
    try {
        const user = await userModel.findOne({ where: { chatId: chatId.toString() } });
        user.profileEditMode = true;
        user.matchMode = false;
        await checkUserAndSendProfile(user, chatId, bot);
    } catch (err) {
        console.log(err);
    }
}

async function checkUserAndSendProfile(user, chatId, bot) {
    if (user.phoneNumber) {
        if (!isUserFilledProfile(user)) {
            let options = setProfileEditOptionsCustom(user);
            await bot.sendMessage(chatId, `Ваша анкета пуста! Вам необходимо ее заполнить.`, options)
            user.profileEditMode = true;
        } else {
            if (user.profileEditMode) {
                let options = setProfileEditOptionsCustomWithEnd(user);
                await bot.sendMessage(chatId, `Ваша анкета заполнена! Можете что-то поменять.`, options)
            } else {
                let caption = `${user.name}, ${user.age}\n\n${user.description}\n\nПол: ${user.sex}\nПол для поиска: ${user.sex_like}\n\n📝 - изменить анкету\n🔫 - оценивать анкеты\n`
                await bot.sendPhoto(chatId, user.photoId, options.profileOptionsCustom(caption))
            }
        }
    }
}

function setProfileEditOptionsCustom(user) {
    let oname = user.name !== null ? `: ${user.name}` : ``;
    let oAge = user.age !== null ? `: ${user.age}` : ``;
    let oSex = user.sex !== null ? `: ${user.sex}` : ``;
    let oSexLike = user.sex_like !== null ? `: ${user.sex_like}` : ``;

    return options.profileEditOptionsCustom(oname, oAge, oSex, oSexLike)
}

function setProfileEditOptionsCustomWithEnd(user) {
    let oname = user.name !== null ? `: ${user.name}` : ``;
    let oAge = user.age !== null ? `: ${user.age}` : ``;
    let oSex = user.sex !== null ? `: ${user.sex}` : ``;
    let oSexLike = user.sex_like !== null ? `: ${user.sex_like}` : ``;

    return options.profileEditOptionsCustomWithEnd(oname, oAge, oSex, oSexLike)
}

function isUserFilledProfile(user) {
    if (user.name && user.age && user.sex && user.sex_like && user.photoId) {
        return true
    }
    return false
}

module.exports = {
    profile,
    profileEdit,
    checkUserAndSendProfile
}