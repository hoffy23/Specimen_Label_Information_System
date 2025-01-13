/**
 * Author: Elliot C
 * 
 * Ward model definition.
 * 
 * @typedef {Object} Ward
 * @property {string} wardId - The unique identifier for the ward.
 * @property {string} wardLocation - The location of the ward.
 * 
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} Sequelize - The Sequelize data types.
 * @returns {import('sequelize').Model} The Ward model.
 */

module.exports = (sequelize, DataTypes) => {
    const Ward = sequelize.define('ward', {
        wardId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        wardLocation: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        tableName: 'ward',
        timestamps: false,
        createdAt: false,
    });

    return Ward;
};