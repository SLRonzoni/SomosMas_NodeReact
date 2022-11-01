'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Testimonial extends Model {
        static associate(models) {  
            Testimonial.belongsTo(models.User, {
                as: "users",
                foreignKey: {
                  name: "userId",
                },
              });  
        }
    }
    Testimonial.init({
        name:{ 
               type: DataTypes.STRING, 
               allowNull: false 
             },
        image: DataTypes.STRING,
        content: { 
                type: DataTypes.STRING, 
                allowNull: false
                },
        userId:{ 
                type: DataTypes.INTEGER, 
                allowNull: false
                }       
    },{
        sequelize,
        modelName: 'Testimonial',
        paranoid: true
    });
    return Testimonial;
}