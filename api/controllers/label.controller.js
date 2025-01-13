/**
 * Author: Elliot C
 * 
 * Label controller for handling label requests.
 */

const db = require("../models");
const labelHistoryC = require('./labelHistory.controller');
const { Op } = require("sequelize");

const { Label, Patient, Ward, Staff, Lab, Test, LabelHistory } = db;

// Create label
exports.create = async (req, res) => {
	try {
		const label = await Label.create(req.body);
		const remarks = "Initial label creation";
		// Save to label history
		await labelHistoryC.saveLabelHistory(
			label.labelId,
			{
				...req.body,
				remarks: remarks,
			},
			req.body.staffId,
		);
		res.status(201).send(label);
	} catch (err) {
		res.status(500).send({
			message: err.message || "Label not created: 500",
		});
	}
};

// Get one label by id
/*exports.findOne = async (req, res) => {
	try {
		const id = req.params.labelId; // Correct parameter name
		const label = await Label.findByPk(id, {
			include: [
				{ model: Patient },
				{ model: Ward },
				{ model: Staff },
				{ model: Lab },
				{ model: Test },
			],
		});
		if (label) {
			res.send(label);
		} else {
			res.status(404).send({
				message: `Label with id=${id} not found`,
			});
		}
	} catch (err) {
        console.error(`Error retrieving label with id=${req.params.labelId}: ${err.message}`);
        res.status(500).send({
            message: `Error retrieving label with id=${req.params.labelId}: ${err.message}`,
        });
	}
};*/

// Get one label by id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.labelId; // Correct parameter name
        const label = await Label.findByPk(id, {
            include: [
                { model: Patient },
                { model: Ward },
                { model: Staff },
                { model: Lab },
                { model: Test },
            ],
        });
        if (label) {
            res.send(label);
        } else {
            res.status(404).send({
                message: `Label with id=${id} not found`,
            });
        }
    } catch (err) {
        console.error(`Error retrieving label with id=${req.params.labelId}: ${err.message}`);
        res.status(500).send({
            message: `Error retrieving label with id=${req.params.labelId}: ${err.message}`,
        });
    }
};
// Update one label by id
exports.update = async (req, res) => {
	try {
		const id = req.params.labelId;
		const currentLabel = await Label.findByPk(id);

		if (!currentLabel) {
			return res.status(404).send({
				message: `Cannot update label with id=${id}. Label not found.`,
			});
		}

		await Label.update(req.body, {
            where: { labelId: id }
        });

        const updatedLabel = await Label.findByPk(id);

        // Save to label history
        const remarks = "Label updated";
        await labelHistoryC.saveLabelHistory(
            updatedLabel.labelId,
            {
                ...req.body,
                remarks: remarks,
            },
            req.body.staffId,
        );

        res.status(200).send(updatedLabel);
	} catch (err) {
		res.status(500).send({
			message: `Error updating label with id=${req.params.labelId}: ${err.message}`,
		});
	}
};

// Delete one label by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.labelId;
    const num = await Label.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Label was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete label with id=${id}. Label not found.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Could not delete label with id=${req.params.labelId}: ${err.message}`,
    });
  }
};

// Find labels with associated data based on query parameters
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
                    [Op.lt]: nextDate,
                },
            };
        } else if (period) {
            // Period logic
            const now = new Date();
            let startDate;

            switch (period) {
                case "1d":
                    startDate = new Date(now.setDate(now.getDate() - 1));
                    break;
                case "1w":
                    startDate = new Date(now.setDate(now.getDate() - 7));
                    break;
                case "1m":
                    startDate = new Date(now.setMonth(now.getMonth() - 1));
                    break;
                case "1y":
                    startDate = new Date(now.setFullYear(now.getFullYear() - 1));
                    break;
                default:
                    return res.status(400).send({
                        message: "Invalid period specified. Use '1d', '1w', '1m', or '1y'.",
                    });
            }

            whereClause = {
                timestamp: {
                    [Op.gte]: startDate,
                },
            };
        }

        console.log(whereClause);

        const labelHistories = await LabelHistory.findAll({
            where: whereClause,
            order: [["timestamp", "DESC"]],
        });

        /**
         * Processes an array of label histories by adding staff information to each history entry if it exists.
         * 
         * @param {Array} labelHistories - An array of label history objects to be processed.
         * @returns {Promise<Array>} A promise that resolves to an array of processed history objects with added staff information.
         */
        const processedHistories = await Promise.all(
            // goes through each history entry and adds the staff information if they exist
            labelHistories.map(async (history) => {
                const historyData = history.toJSON();
                if (historyData.userId) {
                    const staff = await Staff.findByPk(historyData.userId);
                    if (staff) {
                        historyData.staff = staff;
                    }
                }

                return historyData;
            }),
        );

        res.status(200).send(processedHistories);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "An error occurred while retrieving label histories.",
        });
    }
};
