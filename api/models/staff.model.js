/**
 * Author: Elliot C
 * 
 * Staff model definition.
 * 
 * @typedef {Object} Staff
 * @property {number} staffId - The unique identifier for a staff member.
 * @property {string} firstName - The first name of the staff member.
 * @property {string} lastName - The last name of the staff member.
 * @property {string} position - The position or job title of the staff member.
 * 
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} Sequelize - The Sequelize data types.
 * @returns {import('sequelize').Model} The Staff model.
 */

module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define('staff', {
        staffId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING,
        },
        position: {
            type: DataTypes.STRING,
        },
    },{
        freezeTableName: true,  
        tableName: 'staff',
        timestamps: false,
        createdAt: false,
    });

    return Staff;
};