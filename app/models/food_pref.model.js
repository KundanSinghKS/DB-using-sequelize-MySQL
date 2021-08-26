module.exports = (sequelize, Sequelize) => {
    const Food_pref = sequelize.define("food_pref", {
      food_name: {
        type: Sequelize.STRING
      }
      
    });
  
    return Food_pref;
  };
  