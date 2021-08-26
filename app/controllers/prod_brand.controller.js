const { product } = require("../models");
const db = require("../models");
const Product_Brand = db.product_brand;
const Brand = db.brand; 
const Product = db.product; 
const Op = db.Sequelize.Op;

// Find the 'ids' of the given product name and brand name and, store it to the prod_brand and print it

exports.insertbynames = (req, res) => {
  const prod_name = req.body.product_name; 
  const brand_name = req.body.brand_name;
  var c = hello();
  async function hello () {
  const product = await Product.findOne({ where: { product_name : prod_name },  attributes: ['id']});
  const brand = await Brand.findOne({ where: { brand_name : brand_name },  attributes: ['id']});
  const prodc_brand = {
    brandId: brand.id,
    productId: product.id
  };
  Product_Brand.create(prodc_brand)
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
  //getid = product.id;
  };
  
  //console.log(c); 

  
}


// Every operation will effect the MySQL server Database coz we have created the models using 
//database connection object and these models have been imported in this file i.e "Tutorial" variable
// Product_Brand is the imported db.brands which is cotaining the MySQL server table/model.
// Save Product_Brand in the database



// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brandId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product_Brand
  const prodc_brand = {
    brandId: req.body.brandId,
    productId: req.body.productId
  };

  // Product_Brand is the imported db.brands which is cotaining the MySQL server table/model.
  // Save Product_Brand in the database
  Product_Brand.create(prodc_brand)
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

// Retrieve all Product_Brands from the database.
exports.findAll = (req, res) => {
  const brand_name = req.query.productId;
  var condition = brand_name ? { productId: { [Op.like]: `%${productId}%` } } : null;

  Product_Brand.findAll({ where: condition })
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

// Find a single Product_Brand with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product_Brand.findByPk(productId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product_Brand with id=" + id
      });
    });
};

// Update a Product_Brand by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product_Brand.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product_Brand was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product_Brand with id=${id}. Maybe Product_Brand was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product_Brand with id=" + id
      });
    });
};

// Delete a Product_Brand with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.productId;

  Product_Brand.destroy({
    where: { productId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product_Brand was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product_Brand with id=${id}. Maybe Product_Brand was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product_Brand with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Product_Brand.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Product_Brands were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Product_Brands."
      });
    });
};

