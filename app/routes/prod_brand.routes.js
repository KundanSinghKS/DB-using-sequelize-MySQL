module.exports = app => {
    const Prodct_brands = require("../controllers/prod_brand.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Category
    router.post("/", Prodct_brands.create);
  
    // Retrieve all Category
    router.get("/", Prodct_brands.findAll);

    router.post("/add", Prodct_brands.insertbynames);
  
    // Retrieve a single Category with id
    router.get("/:id", Prodct_brands.findOne);
  
    // Update a Category with id
    router.put("/:id", Prodct_brands.update);
  
    // Delete a Category with id
    router.delete("/:productId", Prodct_brands.delete);
  
    // Delete all Category
    router.delete("/", Prodct_brands.deleteAll);
  
    app.use('/api/Prodct_brands', router);
  };
  