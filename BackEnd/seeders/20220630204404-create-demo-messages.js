'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Messages', [{
      name: 'John',
      email: 'jhon@example.com',
      message:'primer mensaje de Jhon',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Andy',
      email: 'andy@example.com',
      message:'hola, quisiera info de la ong. Muchas gracias',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
        name: 'John',
        email: 'jhon@example.com',
        message:'segundo mensaje de Jhon',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
  ]
  , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages', null, {});
     
  }
};
