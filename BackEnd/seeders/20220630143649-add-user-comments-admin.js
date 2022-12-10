'use strict';

const  bcrypt = require('bcrypt');
require('dotenv').config();

const passwordUserCommentsAdmin = "1234";
const pass = bcrypt.hashSync(passwordUserCommentsAdmin, parseInt(process.env.SALT)); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'User comments',
      lastName: 'UserComments',
      email: 'commentsadmin@somosmas.com',      
      password: pass,
      roleId: 3,
      photo: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/40.jpg',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
