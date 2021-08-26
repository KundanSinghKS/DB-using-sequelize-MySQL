const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");


 // "model_name.sync()" can be used to sync only a specified model
 // "sequelize.sync()" can be used to sync all the models at once
 // as becouse we are importing all the models in "db" we are using db.sequelize.sync()
 db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

require("./app/routes/brand.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/food_pref.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/prod_brand.routes")(app);
require("./app/routes/prod_cat.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
