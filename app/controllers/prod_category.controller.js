const { product } = require("../models");
const db = require("../models");
const Product = db.product;
const Category = db.category;
const Product_Category = db.product_category;
const Op = db.Sequelize.Op;



exports.insertbynames = (req, res) => {
  const prod_name = req.body.product_name; 
  const cat_name = req.body.cat_name;
  var c = hello();
  async function hello () {
  const product = await Product.findOne({ where: { product_name : prod_name },  attributes: ['id']});
  const category = await Category.findOne({ where: { cat_name : cat_name },  attributes: ['id']});
  const product_category = {
    categoryId: category.id,
    productId: product.id
  };
  Product_Category.create(product_category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

  //res.send({product, brand});
  };
  
  //console.log(c); 

  
}




// Every operation will effect the MySQL server Database coz we have created the models using 
//database connection object and these models have been imported in this file i.e "Tutorial" variable

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.categoryId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const produc_cat = {
    categoryId: req.body.categoryId,
    productId: req.body.productId
  };

  // Product_Category is the imported db.brands which is cotaining the MySQL server table/model.
  // Save Product_Category in the database
  Product_Category.create(produc_cat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Product_Categorys from the database.
exports.findAll = (req, res) => {
  const categoryId = req.query.categoryId;
  var condition = categoryId ? { categoryId: { [Op.like]: `%${categoryId}%` } } : null;

  Product_Category.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving brands."
      });
    });
};

// Find a single Product_Category with an id
exports.findOne = (req, res) => {
  const categoryId = req.params.id;

  Product_Category.findByPk(categoryId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product_Category with id=" + id
      });
    });
};

// Update a Product_Category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product_Category.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product_Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product_Category with id=${id}. Maybe Product_Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product_Category with id=" + id
      });
    });
};

// Delete a Product_Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.productId;

  Product_Category.destroy({
    where: { productId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product_Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product_Category with id=${id}. Maybe Product_Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product_Category with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Product_Category.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Product_Categorys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Product_Categorys."
      });
    });
};

