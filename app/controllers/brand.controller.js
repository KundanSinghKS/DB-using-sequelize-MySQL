const db = require("../models");
const Brand = db.brand;
const Op = db.Sequelize.Op;

// Every operation will effect the MySQL server Database coz we have created the models using 
//database connection object and these models have been imported in this file i.e "Tutorial" variable

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brand_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Brand
  const brand = {
    brand_name: req.body.brand_name
  };

  // Brand is the imported db.brands which is cotaining the MySQL server table/model.
  // Save Brand in the database
  Brand.create(brand)
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

// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
  const brand_name = req.query.brand_name;
  var condition = brand_name ? { brand_name: { [Op.like]: `%${brand_name}%` } } : null;

  Brand.findAll({ where: condition })
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

// Find a single Brand with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Brand.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Brand with id=" + id
      });
    });
};

// Update a Brand by the id in the request
exports.update = (req, res) => {

  if (!req.params.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  const id = req.params.id;

  Brand.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Brand was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Brand with id=" + id
      });
    });
};

// Delete a Brand with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Brand.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Brand was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Brand with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Brand.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Brands were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Brands."
      });
    });
};

