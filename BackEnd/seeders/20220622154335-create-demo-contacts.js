'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contacts', [{
      name: 'John Connor',
      phone: '375501966',
      email: 'jhon@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sandra Bermudez',
      phone: '18650155',
      email: 'sandra@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contacts', null, {});
     
  }
};
