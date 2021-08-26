const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// We are calling the Model tutorial.js to create tutorial model at the same time we are passing the 
// connection object which will be used to define the model
// and instance of the model created in the MySQL server will be stored in given variable
// now this variable will directly represent the MySQL server model means any operation on this variable will directly
// effect the table in the MySQL table stored in the respected database

db.brand = require("./brand.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.food_pref = require("./food_pref.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.product_brand = require("./prod_brand.model.js")(sequelize, Sequelize);
db.product_category = require("./prod_category.model.js")(sequelize, Sequelize);


//One to Many association for food_pref and product
db.food_pref.hasMany(db.product);
db.product.belongsTo(db.food_pref);

// many to many association for product_brand

db.brand.belongsToMany(db.product, { through: db.product_brand });
db.product.belongsToMany(db.brand, { through: db.product_brand });

// many to many association for product_category

db.category.belongsToMany(db.product, { through: db.product_category });
db.product.belongsToMany(db.category, { through: db.product_category });



module.exports = db;
