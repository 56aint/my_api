const Sequelize = require('sequelize');

const {
  DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT,
} = process.env;

const setupDatabase = () => {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  });

  sequelize.sync({ alter: true });
  return {
  };
};

module.exports = setupDatabase();
