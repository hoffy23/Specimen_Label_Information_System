/**
 * Author: Elliot C
 * 
 * Patient model definition.
 * 
 * @typedef {Object} Patient
 * @property {string} mrn - Medical Record Number, primary key.
 * @property {string} firstName - First name of the patient.
 * @property {string} lastName - Last name of the patient.
 * @property {Date} dob - Date of birth of the patient.
 * @property {string} gender - Gender of the patient.
 * @property {string} phone - Phone number of the patient.
 * @property {string} streetAddress - Street address of the patient.
 * @property {string} state - State of residence of the patient.
 * @property {string} country - Country of residence of the patient.
 * 
 * @param {import('sequelize').Sequelize} sequelize - Sequelize instance.
 * @param {import('sequelize').DataTypes} Sequelize - Sequelize data types.
 * @returns {import('sequelize').Model} Patient model.
 */

module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('patient', {
        mrn: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATEONLY,
        },
        gender: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        streetAddress: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
    },
        {
            freezeTableName: true,
            tableName: 'patient',
            timestamps: false,
            createdAt: false,
        }
    );

    return Patient;
};