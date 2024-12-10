'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Smetacost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Smetacost.belongsTo(models.Smeta, {
            foreignKey: 'smetaId',
            onDelete: 'CASCADE'
        })
    }
  }
  Smetacost.init({
    name: DataTypes.STRING,
    reason: DataTypes.STRING,
    sum: DataTypes.STRING,
      currency: DataTypes.STRING,
      smetaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Smetacost',
  });
  return Smetacost;
};