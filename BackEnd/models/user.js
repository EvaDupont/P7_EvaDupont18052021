"use strict"; /*mode strict JS peut eliminer des erreurs silencieuses JS, permet une exécution plus rapide si prb lecture par le navigateur */

const { Model } = require("sequelize"); /*sequence Sequelize pour le model User*/
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
      models.User.hasMany(models.Like);
    }
  }
  User.init(
    {
      pseudo: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      photo: { type: DataTypes.STRING, allowNull: true },
      bio: DataTypes.STRING(500),
      admin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
