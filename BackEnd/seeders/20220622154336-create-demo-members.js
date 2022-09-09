'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [{
        name: 'Maria Irola',
        image:'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/40.jpg',
        description: 'Presidente. María estudió economía y se especializó en economía para el desarrollo. Comenzó como voluntaria en la fundación y fue quien promovió el crecimiento y la organización de la institución acompañando la transformación',
        facebookUrl: 'MariaIrola',
        instagramUrl:'MariaIrola',
        linkedinUrl:'MariaIrola',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Marita Gomez',
        image:'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/51.jpg',
        description: 'Fundadora. Marita estució la carrera de nutrición y se especializó en nutrición infantil. Toda la vida fue voluntaria en distintos espacios en el barrio hasta que decidió abrir un comedor propio. Comenzó trabajando con 5 familias.',
        facebookUrl: 'MaritaGomez',
        instagramUrl:'MaritaGomez',
        linkedinUrl:'MaritaGomez',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Miriam Rodriguez',
        image:'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/72.jpg',
        description: 'Terapista Ocupacional',
        facebookUrl: 'MiriamRidriguez',
        instagramUrl:'MiriamRidriguez',
        linkedinUrl:'MiriamRidriguez',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Cecilia Mendez',
        image:'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/84.jpg',
        description: 'Psicopedagoga',
        facebookUrl: 'CeciliaMendez',
        instagramUrl:'CeciliaMendez',
        linkedinUrl:'CeciliaMendez',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Mario Fuentes',
        image:'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/650.jpg',
        description: 'Psicólogo',
        facebookUrl: 'MarioFuentes',
        instagramUrl:'MarioFuentes',
        linkedinUrl:'MarioFuentes',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Rodrigo Fuente',
        image:'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/930.jpg',
        description: 'Contador',
        facebookUrl: 'RodrigoFuentes',
        instagramUrl:'RodrigoFuentes',
        linkedinUrl:'RodrigoFuentes',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'María García',
        image:'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/51.jpg',
        description: 'Profesora de artes dramáticas',
        facebookUrl: 'MariaGarcia',
        instagramUrl:'MariaGarcia',
        linkedinUrl:'MariaGarcia',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Marco Fernandez',
        image:'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/559.jpg',
        description: 'Profesor de educación física',
        facebookUrl: 'MarcoFernandez',
        instagramUrl:'MarcoFernandez',
        linkedinUrl:'MarcoFernandez',
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ]
  , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Members', null, {});
     
  }
};
