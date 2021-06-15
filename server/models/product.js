'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: models.Cart, foreignKey: 'UserId' })
    }
  };
  Product.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'name is required!'
        }
      }
    },
    image_url: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'image_url is required!'
        },
        isUrl: {
          msg: 'image_url must be url format!'
        }
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'price is required!'
        },
        isNumeric: {
          msg: 'price must be number format'
        },
        min: {
          args: 1,
          msg: 'price must be bigger than 0'
        }
      }
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'stock is required!'
        },
        isNumeric: {
          msg: 'stock must be number!'
        },
        min: {
          args: 1,
          msg: 'stock must be bigger than 0'
        }
      }
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};