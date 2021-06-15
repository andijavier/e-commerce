'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {foreignKey: 'UserId'})
      Cart.belongsTo(models.Product, {foreignKey: 'ProductId'})
    }
  };
  Cart.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'quantity must be bigger than 0'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate: (cartItem) => {
        if (!cartItem.status) {
          cartItem.status = 'Unpaid'
        }
      }
    }
  });
  return Cart;
};