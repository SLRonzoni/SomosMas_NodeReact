'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizations', [
        {
        name:"Apoyo escolar 'Los Profes'",
        image: "http://dummyimage.com/228x100.png/cc0000/ffffff",
        address: "696 Merchant Plaza",
        phone:"1265986",
        email:"losprofes@yahoo.com.ar",
        facebookUrl:"losprofesFace",
        instagramUrl:"losprofesIg",
        linkedinUrl:"losprofesLk",
        welcomeText:"sdfsfssafsafas",
        aboutUsText:"sfdsfsfsafsdfsafsa",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Rotary Club Olivos",
        image: "http://dummyimage.com/173x100.png/dddddd/000000",
        address: "9386 Grim Crossing",
        phone:"42365986",
        email:"rotary@yahoo.com.ar",
        facebookUrl:"rotaryFace",
        instagramUrl:"rotaryIg",
        linkedinUrl:"rotaryLk",
        welcomeText:"sdfsfssafsafas",
        aboutUsText:"sfdsfsfsafsdfsafsa",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Arte Cuentos",
        image: "http://dummyimage.com/167x100.png/dddddd/000000",
        address: "28 Steensland Road",
        phone:"8365986",
        email:"artecuentos@yahoo.com.ar",
        facebookUrl:"artecuentosFace",
        instagramUrl:"artecuentosIg",
        linkedinUrl:"artecuentosLk",
        welcomeText:"sdfsfssafsafas",
        aboutUsText:"sfdsfsfsafsdfsafsa",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Micros 'Lolo'",
        image: "http://dummyimage.com/231x100.png/5fa2dd/ffffff",
        address: "851 Melrose Point",
        phone:"23655986",
        email:"lolo@yahoo.com.ar",
        facebookUrl:"loloFace",
        instagramUrl:"loloIg",
        linkedinUrl:"loloLk",
        welcomeText:"sdfsfssafsafas",
        aboutUsText:"sfdsfsfsafsdfsafsa",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Vivero Floreciendo",
        image: "http://dummyimage.com/180x100.png/ff4444/ffffff",
        address: "80 Milwaukee Drive",
        phone:"12365986",
        email:"floreciendo@yahoo.com.ar",
        facebookUrl:"floreciendoFace",
        instagramUrl:"floreciendoIg",
        linkedinUrl:"floreciendoLk",
        welcomeText:"sdfsfssafsafas",
        aboutUsText:"sfdsfsfsafsdfsafsa",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Museo de Ciencias Naturales",
        image: "http://dummyimage.com/208x100.png/dddddd/000000",
        address: "926 Blue Bill Park Junction",
        phone:"12365986",
        email:"museo@gmail.com",
        facebookUrl:"museoFace",
        instagramUrl:"museoIg",
        linkedinUrl:"museoLk",
        welcomeText:"sdfsfssafsafas",
        aboutUsText:"sfdsfsfsafsdfsafsa",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Supermercado 'Tilín'",
        image: "http://dummyimage.com/117x100.png/5fa2dd/ffffff",
        address: "1480 Eggendart Park",
        phone:"12365986",
        email:"tilin@gmail.com",
        facebookUrl:"tilinFace",
        instagramUrl:"tilinIg",
        linkedinUrl:"tilinLk",
        welcomeText:"sdfsfssafsafas",
        aboutUsText:"sfdsfsfsafsdfsafsa",
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Dr. Sigmund Froid",
        image: "http://dummyimage.com/167x100.png/ff4444/ffffff",
        address: "413 Duke Hill",
        phone:"2365986",
        email:"froid@yahoo.com.ar",
        facebookUrl:"froidFace",
        instagramUrl:"froidIg",
        linkedinUrl:"froidLk",
        welcomeText:"sdfsfssafsafas",
        aboutUsText:"sfdsfsfsafsdfsafsa",
        createdAt: new Date,
        updatedAt: new Date
        }        
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};
