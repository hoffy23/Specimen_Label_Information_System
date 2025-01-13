/**
 * Author: Elliot C
 * 
 * @constant
 * @type {Object}
 * @description Import the label controller module.
 */

module.exports = app => {
    const Label = require("../controllers/label.controller.js");
    const router = require("express").Router();
  
    router.post("/label/", Label.create);
    router.get("/label/:labelId", Label.findOne);
    router.put("/label/:labelId", Label.update);
    router.get("/label/", Label.findAll);
    // router.delete("/label/:labelId", label.delete);
    
    app.use('/api', router);
};