/**
 * Author: Elliot C
 * 
 * Initializes a new Sequelize instance with the given database configuration.
 *
 * @param {string} dbConfig.DB - The name of the database.
 * @param {string} dbConfig.USER - The username for the database.
 * @param {string} dbConfig.PASSWORD - The password for the database.
 * @param {Object} options - Additional options for Sequelize.
 * @param {string} options.host - The host of the database.
 * @param {string} options.dialect - The dialect of the database (e.g., 'mysql', 'postgres').
 * @param {boolean} options.operatorsAliases - Whether to use string-based operators.
 * @param {Object} options.pool - Pool configuration for Sequelize.
 * @param {number} options.pool.max - Maximum number of connections in the pool.
 * @param {number} options.pool.min - Minimum number of connections in the pool.
 * @param {number} options.pool.acquire - Maximum time, in milliseconds, that pool will try to get connection before throwing error.
 * @param {number} options.pool.idle - Maximum time, in milliseconds, that a connection can be idle before being released.
 */

// Import Sequelize
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'labelsystem',
  process.env.DB_USER || 'james',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'mysql-container',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      max: 5,
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
      ],
      backoffBase: 3000,
      backoffExponent: 1.5,
    },
  });

const db = {};

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the process if connection fails
  }
};

connectDb();

db.Sequelize = Sequelize;
db.sequelize = sequelize;


/* Create database tables and load models */
db.Patient = require("./patient.model.js")(sequelize, DataTypes);
db.Staff = require("./staff.model.js")(sequelize, DataTypes);
db.Ward = require("./ward.model.js")(sequelize, DataTypes);
db.Lab = require("./lab.model.js")(sequelize, DataTypes);
db.Test = require("./test.model.js")(sequelize, DataTypes);
db.Label = require("./label.model.js")(sequelize, DataTypes);
db.LabelHistory = require("./labelHistory.model.js")(sequelize, DataTypes);



// Initialize associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = db;
