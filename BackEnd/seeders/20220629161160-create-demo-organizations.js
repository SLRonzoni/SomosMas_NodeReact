'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizations', [
        {
        name:"Apoyo escolar 'Los Profes'",
        image: "https://pixabay.com/get/ge95fdd1d5eca1407baaabc62f24198ca7543d87a11aaa7b09afe6223b30e940602d9cf95a5dfa9a15bdfe30b4c7a3d07ab05f8c68734977eecb323e321c8d2983a8115a6194ae18c249e0c854a58efca_1920.jpg",
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
        image: "https://pixabay.com/get/gfd7a2ce34b932b37030d8ca7f34e58f874485f8a82f12013c0588707b62699b66430b630d5595caf04ae946d858675d716a97017808572bab835c8970f35b6cfe9ece7974e759a5228bb981335b183a7_1920.jpg",
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
        image: "https://pixabay.com/get/g2184cf5763c999cb21d4fb1ac3fb60ea3ea6b7ea142a292ca88219d3885b96c54c10d213dd3fc317bb093aaba9f1ff8559e2bbdd2ed2d51cf36fed313ceae1aa116bd29db25c503c13ebb4fec3a60e8a_1920.jpg",
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
        image: "https://pixabay.com/get/g9be364925c51454c5c93b8c0cc155935117ed5542d5a0cd17a93a03851b2434cd3a2ac4cf8b771bdd244eb3ccd7e162e9f3fa53172df0c91ede65cb8cb26bfad20509331eb4f57df4800bc593cf60dde_1920.jpg",
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
        image: "https://pixabay.com/get/gc88ae190659059de15c807d632047b4f0e4a654c288481d531c70ae6bdc4e26cf81c135eae2cce76e1fea82d659a95070b969b5545084bbd228f14d3f0c9200c4231a2276c87e7e95affea4282ae2a4c_1920.jpg",
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
        image: "https://pixabay.com/get/g51d7a4e2bd8fcc4cfd1c9984d51bdc8aaf91541df4fcdef9836c60f2f29af9546283cfcb5acd5e3ef772612704d1ec9cf0e43a60beb32b75fb4c7cdc1b93f87c406a1aab7a36fa5032b627b928f17b8f_1920.jpg",
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
        image: "https://pixabay.com/get/g9afb778c7ac4c7308635211717425a57bfc6db9e12c15472b61a39c723b82495b0e4d0b6909cf8367c9a632097c92ebe55727f7a81d14dfc6174dd2e15f8b5fee5512b383f5367bd2a8453a6f7990124_1920.jpg",
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
        image: "https://pixabay.com/get/gbc07897620468d4d932c50ba0761647fdb6cc9eb9577fc0f20bb673ff5c08ff2a5bf8bfbf9a0e09d17c6295f5b6137d9068934b301b643d13c70436a442211feae6dd47527e41d18f03e4e97b542d9f7_1920.jpg",
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
