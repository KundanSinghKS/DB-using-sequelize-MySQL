module.exports = app => {
    const brands = require("../controllers/brand.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Brand
    router.post("/", brands.create);
  
    // Retrieve all Brands
    router.get("/", brands.findAll);
  
    // Retrieve a single Brand with id
    router.get("/:id", brands.findOne);
  
    // Update a Brand with id
    router.put("/:id", brands.update);
  
    // Delete a Brand with id
    router.delete("/:id", brands.delete);
  
    // Delete all Brands
    router.delete("/", brands.deleteAll);
  
    app.use('/api/brands', router);
  };
  