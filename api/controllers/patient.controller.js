/**
 * Author: Elliot C
 * Revisions: 3
 * 
 * Patient controller for handling patient requests
 */

const db = require("../models");
const { Patient } = db;

// Get one patient by mrn
exports.findOne = async (req, res) => {
    const mrn = req.params.mrn;

    try {
        console.log(`patientMrn: ${mrn}`);

        if (!mrn) {
            return res.status(400).send({
                message: "MRN is required"
            });
        }

        const patient = await Patient.findByPk(mrn);

        if (patient) {
            console.log(`mrn: ${JSON.stringify(patient)}`);
            res.status(200).send(patient);
        } else {
            res.status(404).send({
                message: `Patient with MRN=${mrn} was not found`
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: `Error retrieving Patient with MRN=${mrn}`
        });
    }
};

// Get all patients
/*exports.findAll = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).send(patients);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error retrieving Patients"
        });
    }
};*/
// Get all patients
exports.findAll = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (err) {
        console.error(`Error retrieving patients: ${err.message}`);
        res.status(500).json({
            message: "Error retrieving patients",
            error: err.message
        });
    }
};
// Update a patient by mrn
// Not for production
exports.update = async (req, res) => {
    const mrn = req.params.mrn;

    try {
        const patient = await Patient.findByPk(mrn);

        if (!patient) {
            return res.status(404).send({
                message: `Patient with MRN=${mrn} not found.`
            });
        }

        await patient.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            gender: req.body.gender,
            phone: req.body.phone,
            streetAddress: req.body.streetAddress,
            state: req.body.state,
            country: req.body.country
        });

        console.log(`Patient updated: ${JSON.stringify(patient)}`);
        return res.status(200).json(patient);
    } catch (err) {
        console.error(`Error updating Patient with MRN=${mrn}:`, err);
        return res.status(500).send({
            message: `Error updating Patient with MRN=${mrn}`
        });
    }
};

// Delete a patient by mrn
// Not for production
exports.delete = async (req, res) => {
    const mrn = req.params.mrn;

    try {
        const patient = await Patient.findByPk(mrn);

        if (!patient) {
            return res.status(404).send({
                message: `Patient with MRN=${mrn} not found.`
            });
        }

        await patient.destroy();

        console.log(`Patient deleted: MRN=${mrn}`);
        return res.status(200).send({
            message: `Patient with MRN=${mrn} was deleted successfully.`
        });
    } catch (err) {
        console.error(`Error deleting Patient with MRN=${mrn}:`, err);
        return res.status(500).send({
            message: `Could not delete Patient with MRN=${mrn}`
        });
    }
};