"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donations extends Model {
    static associate(models) {
      Donations.belongsTo(models.User, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Donations.init(
    {
      userId: { type: DataTypes.INTEGER, 
                allowNull: true },
      userName:{ type: DataTypes.STRING, 
                 allowNull: false },
      userLastName:{ type: DataTypes.STRING, 
                 allowNull: false },
      userPhone:{ type: DataTypes.STRING, 
                 allowNull: false },
      userEmail:{ type: DataTypes.STRING, 
                 allowNull: false },
      amount: { type: DataTypes.INTEGER, 
                allowNull: false },
      payForm:{ type: DataTypes.STRING, 
                allowNull: false },
      message: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Donations",
      paranoid: true,
    }
  );
  return Donations;
};