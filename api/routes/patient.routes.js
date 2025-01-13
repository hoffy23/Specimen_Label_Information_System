/**
 * Author: Elliot C
 * 
 * @constant {Object} patient - The patient controller module.
 * @requires ../controllers/patient.controller.js
 */

module.exports = app => {
    const Patient = require("../controllers/patient.controller.js");
    const router = require("express").Router();
      
    router.get("/patient/:mrn", Patient.findOne);
    router.get("/patient/", Patient.findAll);
    // router.post("/patient/", patient.create);
    // router.put("/patient/:mrn", patient.update);
    // router.delete("/patient/:mrn", patient.delete);
      
    app.use('/api', router);

    // GET /backend/patient/:mrn
};