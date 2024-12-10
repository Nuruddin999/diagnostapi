'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Smetaplan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Smetaplan.belongsTo(models.Smeta, {
            foreignKey: 'smetaId',
            onDelete: 'CASCADE'
        })
    }
  }
  Smetaplan.init({
    kind: DataTypes.STRING,
    supplier: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    price: DataTypes.STRING,
    smetaId: DataTypes.INTEGER,
      qty: DataTypes.STRING,
      currency: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Smetaplan',
  });
  return Smetaplan;
};