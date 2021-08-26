module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define("category", {
    cat_name: {
      type: Sequelize.STRING
    }
    
  });

  return category;
};
