'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Apoyo escolar para el nivel primario',
      content: 'El espacio de apoyo es el corazón del área educativa.',
      image: 'https://pixabay.com/get/g17c3fd37330ef732282466347cef80a79f9549976f9ada1102f2af2ea2477ba9f323652a61c1fb4a15765d41546936d05ce748835f00687c3639cc4425533f5532bbf08fdb02abe8ad4fbb8bc972f00c_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Apoyo Escolar Nivel Secundario',
      content: 'Del mismo modo que en primaria, este taller es el corazón del área secundaria.',
      image: 'https://pixabay.com/get/g5e01cdd4b2ce38e6d58603fc0d3dbf7bd9adddcddcb7a87101db641e37edb94702686b4506fd9a2341cf1675365eb2d510b203a9607d5934823d099fadb7c4c601c3310f7c4753a50ce8c4fccd744932_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Tutorías',
      content: 'Es un programa destinado a jóvenes a partir del tercer año de secundaria, cuyo objetivo es garantizar su permanencia en la escuela y construir un proyecto de vida que da sentido al colegio.',
      image: 'https://pixabay.com/get/gadf4c6e6212dbe88b63f7b015f8aab45db3bae2c3b168f18a59da33cbb05cbb2bab2092bb6305dd52fc3d38218deff1eef4eefe614ff883a772643a0c58f856e663605b1fb3e0dd8c54801fba45956d4_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Jardinería',
      content: 'Conocer la tierra y sus frutos. ',
      image: 'https://pixabay.com/get/g6a1561d3ac7ec2ab7572b058257e14ffd7bffb0f6f2371114851e5ecb8bfb90cddfd82fc8a92b109110977f4e1fa62ac9dbf8b4ecf00575bc280fd880df2d9313c1eaaff950f151f41a8526de99cb583_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Deportes',
      content: 'Proyecto para fomentar el trabajo en equipo y la educación física. Football, Volley y Basquet entre otras',
      image: 'https://pixabay.com/get/g7b8169d91b7a2af32c5cff451b9382ddced6f01a6168c741fc72ffc5348851e9ef0bc5670152f2524cf27d8815e4cf36da6a5019af05d87770f505afbb872e0c87ab34137b300bf4f9b5dbafbb254096_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Música, dibujo, pintura y escultura',
      content: 'Aprender diversas actividades artísticas, que liberen la creatividad',
      image: 'https://pixabay.com/get/ge1c5e35a6c83151afb369f2cfa65ab34c995429c13402f015854890c0ac63d5b809c90ba123dae7184c9faa2c66239751d4b86cd534b25df87855d25f27d27b892f432d18a525bcc6a3b0cb1d3375f17_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Huerta y nutrición',
      content: 'Mejorar la calidad de la alimentacion aprendiendo a cultivar nuestros propios alimentos',
      image: 'https://pixabay.com/get/gf651ec2729c85db231e9492d807cba6eda2736326cc7605815b94d81f436628177e1093602f9d424509986b0b1e8728c901fb5ca1c671abcfce8b0a6b8a3e34542d2cdcd2436e417e292b94566ffce30_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Trabajo Social',
      content: 'Destinado a las familias y la resolución de conflictos',
      image: 'https://pixabay.com/get/gaa5a6fd6dddcbc57b10f9e8bc844b3bc0c5cfabc51e9543faa02262861981a061185b817f5534213b95e71074baaf559dbd528968c6c5b49d69931d35aa02e68a00e2511c4444462b663108a93019fab_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Salud',
      content: 'Salita de primeros auxilios y consultorios externos para el barrio',
      image: 'https://pixabay.com/get/g9856fdbd2d054b665d37c40deb35fb25bf35d43bf005da2e7ec3cdd48b65af1f59ef1553f7147fd7722d778defa5831505ff445fa51c17e91dd0879f14c079d5d6a720955cf6bda2d360745fa04bda35_1920.jpg',
      createdAt: new Date,
      updatedAt: new Date
    }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
