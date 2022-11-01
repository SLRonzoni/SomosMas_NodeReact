'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Donations', [
        {
       
        userName:"Donacion",
        userLastName:"UNO",
        userEmail:"uno@gmail.com",
        userPhone:"1356-2564",
        amount:100,
        payForm:"Stripe",
        message: "demo accusamus beatae ad facilis cum similique qui sunt",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        userId:14,
        userName:"Rosalinda",
        userLastName:"Bednar",
        userEmail:"Chelsie_Raynor56@hotmail.com",
        userPhone:"0",
        amount:500,
        payForm:"Stripe",
        message: "demo beatae ad facilis cum similique qui sunt",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        
        userName:"Juan",
        userLastName:"Perez",
        userEmail:"jp6@hotmail.com",
        userPhone:"0",
        amount:2500,
        payForm:"Mercado_Libre",
        message: "donacion realizada",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        userId:6,
        userName:"Mandy",
        userLastName:"Bernier",
        userEmail:"Princess_Reinger@gmail.com",
        userPhone:"4568-2456",
        amount:350,
        payForm:"Mercado_Libre",
        message: "donacion realizada por mercado libre",
        createdAt: new Date,
        updatedAt: new Date
        }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Donations', null, {});
  }
};
