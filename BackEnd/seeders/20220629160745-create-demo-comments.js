'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [{
      body: 'demo comentario uno',
      user_id: 10,
      news_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      body: 'demo comentario dos',
      user_id: 23,
      news_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
     
  }
};
