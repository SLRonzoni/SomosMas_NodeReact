'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('News', [
        {
        name:"News UNO",
        content: "demo accusamus beatae ad facilis cum similique qui sunt",
        image: "https://via.placeholder.com/600/92c952",
        categoryId:10,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"News DOS",
        content: "demo repreheeserunnderit est dt velit ipsam",
        image: "https://via.placeholder.com/600/771796",
        categoryId:1,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"News TRES",
        content: "demo officia por iure quia isto qui ipsa ut modi",
        image: "https://via.placeholder.com/600/24f355",
        categoryId:2,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"News CUATRO",
        content: "demo culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        image: "https://via.placeholder.com/600/d32776",
        categoryId:4,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"News CINCO",
        content: "demo natus nisi omnis corporis facere molestiae rerum in",
        image: "https://via.placeholder.com/600/f66b97",
        categoryId:6,
        createdAt: new Date,
        updatedAt: new Date
        },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('News', null, {});
  }
};
