const {Sequelize} = require('sequelize');

const sequalize = new Sequelize(
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

module.exports = sequalize;