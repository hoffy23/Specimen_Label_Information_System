// test-connection.js
const sequelize = require('./config/db.config'); 
const Patient = require('./models/patient'); 

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync the User model with the database
    await Patient.sync({ force: true });
    console.log('Patient table has been created.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();