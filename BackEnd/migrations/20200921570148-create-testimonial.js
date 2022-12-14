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
                type: Sequelize.STRING,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                      tableName: "Users",
                    },
                    key: "id",
                  },
                allowNull: false,
            },
            deletedAt: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    down: async(queryInterface, Sequelize) =>{
        await queryInterface.dropTable('Testimonials');
    }
}