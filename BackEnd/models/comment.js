'use strict';/*mode strict JS peut eliminer des erreurs silencieuses JS, permet une exécution plus rapide si prb lecture par le navigateur */
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
  
    static associate(models) {
      
      models.Comment.belongsTo(models.User, 
        { foreignKey: {
          allowNull: false
         
        }, onDelete:'CASCADE',
      }),
        models.Comment.belongsTo(models.Post, 
          { foreignKey: {
            allowNull: false,
               
          }, onDelete:'CASCADE',
        })
    }
    
  };
  Comment.init({
    message: { type: DataTypes.TEXT, allowNull: false },
    pseudo: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};