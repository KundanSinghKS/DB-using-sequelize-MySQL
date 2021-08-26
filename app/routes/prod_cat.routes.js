module.exports = app => {
    const Prodct_categs = require("../controllers/prod_category.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Prod_Cat
    router.post("/", Prodct_categs.create);
  
    // Retrieve all Prod_Cats
    router.get("/", Prodct_categs.findAll);

    router.post("/add", Prodct_categs.insertbynames);
  
    // Retrieve a single Prod_Cat with id
    router.get("/:id", Prodct_categs.findOne);
  
    // Update a Prod_Cat with id
    router.put("/:id", Prodct_categs.update);
  
    // Delete a Prod_Cat with id
    router.delete("/:productId", Prodct_categs.delete);
  
    // Delete all Prod_Cats
    router.delete("/", Prodct_categs.deleteAll);
  
    app.use('/api/Prodct_categs', router);
  };
  