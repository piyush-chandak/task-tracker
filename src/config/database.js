const { Sequelize } = require('sequelize');
const config = require('./config');
const logger = require('./logger');

const sequelize = new Sequelize(config.DATABASE.NAME, config.DATABASE.USER, config.DATABASE.PASSWORD, {
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  dialect: config.DATABASE.DIALECT,
  dialectOptions: {
    decimalNumbers: true,
  },
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  },
  logging: config.DATABASE.LOGGING ? (msg) => logger.info(msg) : null,
});

module.exports = sequelize;
