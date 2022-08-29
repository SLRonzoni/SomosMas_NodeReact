'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
        {
        name:"Category demo UNO",
        description: "demo accusamus beatae ad facilis cum similique qui sunt",
        image: "https://via.placeholder.com/600/92c952",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo DOS",
        description: "demo reprehenderit est deserunt velit ipsam",
        image: "https://via.placeholder.com/600/771796",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo TRES",
        description: "demo officia por iure quia iusto qui ipsa ut modi",
        image: "https://via.placeholder.com/600/24f355",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo CUATRO",
        description: "demo culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        image: "https://via.placeholder.com/600/d32776",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo CINCO",
        description: "demo natus nisi omnis corporis facere molestiae rerum in",
        image: "https://via.placeholder.com/600/f66b97",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo SEIS",
        description: "demo accusamus ea aliquid et amet sequi nemo",
        image: "https://via.placeholder.com/600/56a8c2",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo SIETE",
        description: "demo officia delectus consequatur vero aut veniam explicabo molestias",
        image: "https://via.placeholder.com/600/b0f7cc",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo OCHO",
        description: "demo aut por officiis laborum odit ea laudantium corporis",
        image: "https://via.placeholder.com/600/54176f",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo NUEVE",
        description: "demo qui eius qui autem sed",
        image: "https://via.placeholder.com/600/51aa97",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo DIEZ",
        description: "demo beatae et provident et ut vel",
        image: "https://via.placeholder.com/600/810b14",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo ONCE",
        description: "demo nihil at amet non hic quia qui",
        image: "https://via.placeholder.com/600/1ee8a4",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo DOCE",
        description: "demo mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
        image: "https://via.placeholder.com/600/66b7d2",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo TRECE",
        description: "demo repudiandae iusto deleniti rerum",
        image: "https://via.placeholder.com/600/197d29",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Category demo CATORCE",
        description: "demo est necessitatibus architecto ut laborum",
        image: "https://via.placeholder.com/600/61a65",
        createdAt: new Date,
        updatedAt: new Date        },
        {
        name:"Category demo QUINCE",
        description: "demo harum dicta similique quis dolore earum ex qui",
        image: "https://via.placeholder.com/600/f9cee5",
        createdAt: new Date,
        updatedAt: new Date
        }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
