'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizations', [
        {
        name:"Apoyo escolar 'Los Profes'",
        image: "https://st4.depositphotos.com/12985790/20725/i/600/depositphotos_207256220-free-stock-photo-schoolchildren-holding-open-books-looking.jpg",
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
        image: "https://st.depositphotos.com/2105931/2541/v/600/depositphotos_25418053-free-stock-illustration-mechanical-part-gear.jpg",
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
        image: "https://st.depositphotos.com/1015530/2299/i/600/depositphotos_22990130-stock-photo-portrait-of-a-cute-girl.jpg",
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
        image: "https://st2.depositphotos.com/1257064/11021/v/600/depositphotos_110215772-stock-illustration-comfortable-city-bus.jpg",
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
        image: "https://st4.depositphotos.com/13194036/27430/i/600/depositphotos_274301670-stock-photo-cropped-view-gardener-gloves-pruning.jpgmuseo
        ",
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
        image: "https://st4.depositphotos.com/4829791/21556/i/600/depositphotos_215569332-stock-photo-t-rex-skeleton-at-googleplex.jpg",
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
        image: "https://st2.depositphotos.com/13193658/44217/i/600/depositphotos_442179252-stock-photo-shopping-trolley-shelves-groceries-supermarket.jpg",
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
        image: "https://st.depositphotos.com/13108546/51586/i/600/depositphotos_515863918-stock-photo-at-the-specialists-appointment-psychology.jpg",
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
