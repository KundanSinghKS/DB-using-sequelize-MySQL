module.exports = app => {
    const food_prefs = require("../controllers/food_pref.controller.js");
  
    var router = require("express").Router();
  
    // Create a new food_pref
    router.post("/", food_prefs.create);
  
    // Retrieve all food_prefs
    router.get("/", food_prefs.findAll);
  
    // Retrieve a single food_pref with id
    router.get("/:id", food_prefs.findOne);
  
    // Update a food_pref with id
    router.put("/:id", food_prefs.update);
  
    // Delete a food_pref with id
    router.delete("/:id", food_prefs.delete);
  
    // Delete all food_prefs
    router.delete("/", food_prefs.deleteAll);
  
    app.use('/api/food_pref', router);
  };
  