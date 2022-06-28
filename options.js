module.exports = {
    registerOptions: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "☎️", request_contact: true }]
            ]
        })
    },
    profileEditOptionsCustom(name, age, sex, sexLike) {
        return {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "Имя" + name, callback_data: "name_clbck" },
                    { text: "Возраст" + age, callback_data: "age_clbck" },
                    { text: "Описание", callback_data: "description_clbck" }],
                    [{ text: "Пол" + sex, callback_data: "sex_clbck" },
                    { text: "Поиск" + sexLike, callback_data: "sexLike_clbck" },
                    { text: "Фото", callback_data: "photo_clbck" }],
                ]
            })
        }
    },
    profileEditOptionsCustomWithEnd(name, age, sex, sexLike) {
        return {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "Имя" + name, callback_data: "name_clbck" },
                    { text: "Возраст" + age, callback_data: "age_clbck" },
                    { text: "Описание", callback_data: "description_clbck" }],
                    [{ text: "Пол" + sex, callback_data: "sex_clbck" },
                    { text: "Поиск" + sexLike, callback_data: "sexLike_clbck" },
                    { text: "Фото", callback_data: "photo_clbck" }],
                    [{ text: "Закончить", callback_data: "end_clbck" }],
                ],
                remove_keyboard: true
            })
        }
    },
    matchOptions: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "🚪" }, { text: "👀" }, { text: "🤮" }],
            ],
            resize_keyboard: true
        })
    },
    deleteKeyboardOptions: {
        reply_markup: JSON.stringify({
            remove_keyboard: true
        })
    },
    profileOptionsCustom(pasteCaption) {
        return {
            caption: pasteCaption,
            reply_markup: JSON.stringify({
                keyboard: [
                    [{ text: "📝" }],
                    [{ text: "🔫" }],
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            })
        }
    },
    searchUserProfileOptionsCustom(pasteText) {
        return {
            caption: pasteText,
            reply_markup: JSON.stringify({
                keyboard: [
                    [{ text: "🚪" }, { text: "👀" }, { text: "🤮" }],
                ],
                resize_keyboard: true
            })
        }
    }
}
