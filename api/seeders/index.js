/**
 * Author: Elliot C
 * 
 * Initializes a new Sequelize instance with the given database configuration.
 *
 * @constant
 * @type {Sequelize}
 * @param {string} dbConfig.DB - The name of the database.
 * @param {string} dbConfig.USER - The username for the database.
 * @param {string} dbConfig.PASSWORD - The password for the database.
 * @param {Object} options - Additional options for the Sequelize instance.
 * @param {string} options.host - The host of the database.
 * @param {string} options.dialect - The dialect of the database (e.g., 'mysql', 'postgres').
 * @param {Object} options.pool - Pool configuration for Sequelize.
 * @param {number} options.pool.max - Maximum number of connections in the pool.
 * @param {number} options.pool.min - Minimum number of connections in the pool.
 * @param {number} options.pool.acquire - Maximum time, in milliseconds, that a connection can be idle before being released.
 * @param {number} options.pool.idle - Maximum time, in milliseconds, that a connection can be idle before being released.
 */

const prompt = require("prompt-sync")({ sigint: true });
const fs = require('fs');
const db = require('../models');// Import the db object from models/index.j

const queryInterface = db.sequelize.getQueryInterface();

// Small interface for seeding table data
// cd api, type -> node ./seeders/index.js
fs.readdirSync('./seeders').filter(file => file.endsWith('.js') && file != 'index.js').forEach((file) => {
  let yn = prompt(`SEED ${file}? (Y/n): `);
  if (yn === undefined) yn = 'y';
  if (!yn.toLowerCase().startsWith('y')) return;

  const seed = require(`./${file}`);
  if (seed.up === undefined) return console.warn('ERR: blank seed file');
  seed.up(queryInterface, db.Sequelize).then(() => {
    console.log(`Seeded ${file}`);
  }).catch(err => {
    console.error(`Error seeding ${file}:`, err);
  });
});