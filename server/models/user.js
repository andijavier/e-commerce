'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { through: models.Cart, foreignKey: 'ProductId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is Required!'
        },
        isEmail: {
          msg: 'must be email format!'
        },
        notNull: {
          msg: 'email is required!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is Required !'
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Full Name is Required !'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = encryptPassword(user.password)
        if (!user.role) {
          user.role = 'customer'
        }
      }
    }
  });
  return User;
};