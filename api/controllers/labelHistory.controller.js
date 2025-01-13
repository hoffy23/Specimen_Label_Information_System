/**
 * Author: Elliot C
 * 
 * LabelHistory controller for handling label history requests.
 */

const db = require('../models');
const { LabelHistory } = db;

exports.saveLabelHistory = async function (labelId, labelData, userId) {
  try {
    // Fetch the latest version for the label
    const lastHistory = await LabelHistory.findOne({
      where: { labelId },
      order: [["version", "DESC"]],
    });

    // Determine the new version (increment or start with 1)
    const newVersion = lastHistory ? lastHistory.version + 1 : 1;

    // Create a new LabelHistory entry
    const newHistory = await LabelHistory.create({
      labelId,
      version: newVersion,
      labelData,
      timestamp: new Date(),
      userId,
    });

    console.log(`Label history saved with id ${newHistory.id} and version ${newVersion}`);
    // return res.status(200).send(newHistory);
    return newHistory; // return this and don't send a response as it's used internally
  } catch (error) {
    console.error('Error saving label history:', error);
    throw error;
  }
};

// find label by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.labelHistoryId;
    const labelHistory = await LabelHistory.findByPk(id);
    if (labelHistory) {
      res.status(200).send(labelHistory);
    } else {
      res.status(404).send({
        message: `LabelHistory with id=${id} not found`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving LabelHistory with id=${req.params.labelHistoryId}: ${err.message}`
    });
  }
};

// find all by date/s (for reporting)
exports.findAll = async (req, res) => {
  try {
    const { period, date } = req.query;
    let whereClause = {};

    if (date) {
      // If a specific date is provided
      const selectedDate = new Date(date);
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + 1);

      whereClause = {
        timestamp: {
          [Op.gte]: selectedDate,
          [Op.lt]: nextDate
        }
      }
    };

    const labelHistories = await LabelHistory.findAll({
      where: whereClause,
      order: [['timestamp', 'DESC']]
    });

    res.status(200).send(labelHistories);
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while retrieving label histories."
    });
  }
};

// get available dates (for front end date picker)
exports.getAvailableDates = async (req, res) => {
  try {
    /**
     * Retrieves a list of unique dates from the LabelHistory table.
     * 
     * @returns {Promise<Array<{ date: string }>>} A promise that resolves to an array of objects, 
     * each containing a unique date from the 'timestamp' column in the LabelHistory table.
     */
    const dates = await LabelHistory.findAll({
      attributes: [
        [db.Sequelize.fn('DATE', db.Sequelize.col('timestamp')), 'date']
      ],
      group: [db.Sequelize.fn('DATE', db.Sequelize.col('timestamp'))],
      order: [[db.Sequelize.fn('DATE', db.Sequelize.col('timestamp')), 'DESC']]
    });

    res.status(200).send(dates.map(d => d.get('date')));
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving available dates."
    });
  }
};

// delete label by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.labelHistoryId;
    const num = await LabelHistory.destroy({
      where: { id: id }
    });
    if (num == 1) {
      res.status(200).send({
        message: "LabelHistory was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete LabelHistory with id=${id}. LabelHistory not found.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Could not delete LabelHistory with id=${req.params.labelHistoryId}: ${err.message}`
    });
  }
};
