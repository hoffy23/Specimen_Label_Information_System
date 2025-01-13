 /**
 * Lab model definition.
 * Author: Elliot C 
 * 
 * @typedef {Object} Lab
 * @property {string} labId - The unique identifier for the lab.
 * @property {string} labLocation - The location of the lab.
 * 
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} Sequelize - The Sequelize data types.
 * @returns {import('sequelize').Model} The Lab model.
 */

module.exports = (sequelize, DataTypes) => {
    const Lab = sequelize.define('lab', {
        labId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        labLocation: {
            type: DataTypes.STRING,
        }
    },{
        freezeTableName: true,  
        tableName: 'lab',
        timestamps: false,
        createdAt: false,
    });

    return Lab;
};