'use strict';/*mode strict JS peut eliminer des erreurs silencieuses JS, permet une exécution plus rapide si prb lecture par le navigateur */
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
   
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }, onDelete:'CASCADE', 
      }),
        models.Post.hasMany(models.Comment )
      models.Post.hasMany(models.Like)

    }
  };
  Post.init({
    message: { type: DataTypes.TEXT, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },


  }, {
    sequelize,

    modelName: 'Post', 
  });
  return Post;
};