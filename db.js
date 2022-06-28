const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'Match',
    'root',
    'root',
    {
        host: 'localhost',
        port: '6432',
        dialect: 'postgres',
        logging: false
    }
)

const DBconnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (err) {
        console.log("Bad connection to DB: ", err);
    }
}

module.exports = {
    sequelize,
    DBconnection
}