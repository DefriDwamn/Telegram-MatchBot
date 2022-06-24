module.exports = {
    registerOptions: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "☎️", request_contact: true }]
            ]
        })
    },
    profileEditOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Имя", callback_data: "name_clbck" }, { text: "Возраст", callback_data: "age_clbck" }, { text: "Описание", callback_data: "description_clbck" }],
                [{ text: "Пол ", callback_data: "sex_clbck" }, { text: "Пол для выбора ", callback_data: "sexLike_clbck" }, { text: "Фото", callback_data: "photo_clbck" }],
            ]
        })
    },
    userInLikeOptions: {
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
    profileOptions: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "📝" }],
                [{ text: "📸" }],
                [{ text: "🔫" }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        })
    },
}
