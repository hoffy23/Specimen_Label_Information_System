/**
 * Author: Elliot C
 * 
 * Label model definition.
 * 
 * @typedef {Object} Label
 * @property {number} labelId - The unique identifier for the label.
 * @property {string} mrn - The medical record number associated with the label.
 * @property {string} testType - The type of test associated with the label.
 * @property {number} staffId - The identifier of the staff member associated with the label.
 * @property {string} wardId - The identifier of the ward associated with the label.
 * @property {string} labId - The identifier of the lab associated with the label.
 * @property {Date} createdAt - The date and time when the label was created.
 */

module.exports = (sequelize, DataTypes) => {
    const Label = sequelize.define('label',
      {
        labelId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        mrn: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        testType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        staffId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        wardId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        labId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
        tableName: "label",
        timestamps: false,
        createdAt: false,
      }
    );
  
    Label.associate = (models) => {
      Label.belongsTo(models.Patient, { foreignKey: "mrn" });
      Label.belongsTo(models.Test, { foreignKey: "testType" });
      Label.belongsTo(models.Staff, { foreignKey: "staffId" });
      Label.belongsTo(models.Ward, { foreignKey: "wardId" });
      Label.belongsTo(models.Lab, { foreignKey: "labId" });
      Label.hasMany(models.LabelHistory, { foreignKey: "labelId" });
    };
  
    return Label;
  };
  