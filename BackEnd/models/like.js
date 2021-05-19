'use strict';/*mode strict JS peut eliminer des erreurs silencieuses JS, permet une exécution plus rapide si prb lecture par le navigateur */
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {

    static associate(models) {
    
      models.Like.belongsTo(models.User, 
        { foreignKey: {
          allowNull: false
         
        }, onDelete:'CASCADE',
      }),
        models.Like.belongsTo(models.Post, 
          { foreignKey: {
            allowNull: false,
               
          }, onDelete:'CASCADE',
        })
    }
  };
  Like.init({
  
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};