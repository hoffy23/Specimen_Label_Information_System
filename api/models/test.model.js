/**
 * Author: Elliot C
 * 
 * Defines the Test model.
 * 
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} Sequelize - The Sequelize library.
 * @returns {object} The Test model.
 * 
 * @property {string} testType - The type of the test. This is the primary key.
 * @property {string} testDescription - The description of the test.
 * 
 */

module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define('test', {
        testType: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        testDescription: {
            type: DataTypes.STRING
        },
    }, {
        freezeTableName: true,
        tableName: 'test',
        timestamps: false,
        createdAt: false,
    });

    return Test;
};