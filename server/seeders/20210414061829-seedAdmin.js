'use strict';
const { encryptPassword } = require('../helper/bcrypt')

const admin = {
  fullName: 'Admin',
  email: 'admin@mail.com',
  password: encryptPassword('123456'),
  role: 'admin',
  createdAt: new Date,
  updatedAt: new Date
}

const customer = {
  fullName: 'Customer One',
  email: 'customer@mail.com',
  password: encryptPassword('123456'),
  role: 'customer',
  createdAt: new Date,
  updatedAt: new Date
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [admin, customer], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
