'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Smetaroadcost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Smetaroadcost.belongsTo(models.Smeta, {
            foreignKey: 'smetaId',
            onDelete: 'CASCADE'
        })
    }
  }
  Smetaroadcost.init({
    vehicle: DataTypes.STRING,
    directionTo: DataTypes.STRING,
    directionFrom: DataTypes.STRING,
    departureDate: DataTypes.STRING,
    ticketQty: DataTypes.STRING,
    cost: DataTypes.STRING,
    totalCost: DataTypes.STRING,
    infoSrc: DataTypes.STRING,
      smetaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Smetaroadcost',
  });
  return Smetaroadcost;
};