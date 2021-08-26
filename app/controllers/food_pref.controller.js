const db = require("../models");
const Food_pref = db.food_pref;
const Op = db.Sequelize.Op;

// Every operation will effect the MySQL server Database coz we have created the models using 
//database connection object and these models have been imported in this file i.e "Food_pref" variable

// Create and Save a new Food_pref
exports.create = (req, res) => {
  // Validate request
  if (!req.body.food_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Food_pref
  const food_pref = {
    food_name: req.body.food_name
   
  };

  // Food_pref is the imported db.food_prefs which is cotaining the MySQL server table/model.
  // Save Food_pref in the database
  Food_pref.create(food_pref)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Food_pref."
      });
    });
};

// Retrieve all Food_prefs from the database.
exports.findAll = (req, res) => {
  const food_name = req.query.food_name;
  var condition = food_name ? { food_name: { [Op.like]: `%${food_name}%` } } : null;

  Food_pref.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving food_prefs."
      });
    });
};

// Find a single Food_pref with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Food_pref.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Food_pref with id=" + id
      });
    });
};

// Update a Food_pref by the id in the request
exports.update = (req, res) => {

  if (!req.params.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const id = req.params.id;

  Food_pref.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Food_pref was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Food_pref with id=${id}. Maybe Food_pref was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Food_pref with id=" + id
      });
    });
};

// Delete a Food_pref with the specified id in the request
exports.delete = (req, res) => {

  if (!req.params.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const id = req.params.id;

  Food_pref.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Food_pref was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Food_pref with id=${id}. Maybe Food_pref was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Food_pref with id=" + id
      });
    });
};

// Delete all Food_prefs from the database.
exports.deleteAll = (req, res) => {
  Food_pref.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Food_prefs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all food_prefs."
      });
    });
};


