module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      product_name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10,2)
      },
      rating: {
        type: Sequelize.DECIMAL(2,1)
        
      }
      
      
    });
  
    return Product;
  };
  