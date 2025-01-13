/**
 * Author: Elliot C
 * 
 * LabelHistory model definition.
 *
 * @typedef {Object} LabelHistory
 * @property {number} id - The unique identifier for the label history entry.
 * @property {number} labelId - The identifier for the associated label.
 * @property {number} version - The version number of the label.
 * @property {Object} labelData - The JSON data of the label.
 * @property {Date} [timestamp] - The timestamp of the label history entry.
 * @property {number} userId - The identifier for the user who made the change.
 *
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @param {DataTypes} Sequelize - The Sequelize data types.
 * @returns {Model} The LabelHistory model.
 */

module.exports = (sequelize, DataTypes) => {
  const LabelHistory = sequelize.define('labelHistory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    labelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    labelData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "timestamp", // Explicitly specify the field name
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
    {
      freezeTableName: true,
      tableName: "labelHistory",
      timestamps: false,
      createdAt: false,
    }
  );

  LabelHistory.associate = (models) => {
    LabelHistory.belongsTo(models.Label, { foreignKey: "labelId" });
    LabelHistory.belongsTo(models.Staff, { foreignKey: "userId" });
  };

  return LabelHistory;
};
