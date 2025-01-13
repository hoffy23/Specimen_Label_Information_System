/**
 * Author: Elliot C
 * 
 * @constant {Object} labelHistory - The controller for handling label history related operations.
 * @requires ../controllers/labelHistory.controller.js
 */

module.exports = app => {
    const LabelHistory = require("../controllers/labelHistory.controller.js");
    const router = require("express").Router();

    router.post("/labelhistory/", LabelHistory.saveLabelHistory);
    router.get("/labelhistory/", LabelHistory.findAll); // for reporting
    router.get("/labelhistory/:labelHistoryId", LabelHistory.findOne);
    //router.put("/labelHistory/:labelHistoryId", labelHistory.update);
    // router.delete("/labelHistory/:labelHistoryId", labelHistory.delete);

    app.use('/api', router);
};