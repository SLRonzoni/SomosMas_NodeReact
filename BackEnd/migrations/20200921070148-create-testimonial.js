'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Testimonials',{
            id:{
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            content: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                allowNull: false,
                type: Sequelize.NUMBER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {                
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) =>{
        await queryInterface.dropTable('Testimonials');
    }
}