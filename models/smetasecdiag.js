'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Smetasecdiag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Smetasecdiag.belongsTo(models.Smeta, {
            foreignKey: 'smetaId',
            onDelete: 'CASCADE'
        })
    }
  }
  Smetasecdiag.init({
    name: DataTypes.STRING,
      smetaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Smetasecdiag',
  });
  return Smetasecdiag;
};