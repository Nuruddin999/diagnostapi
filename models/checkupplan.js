'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckupPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CheckupPlan.belongsTo(models.Application, {
        foreignKey: 'applicationId',
        onDelete: 'CASCADE'
      })
    }
  }
  CheckupPlan.init({
    kind: DataTypes.TEXT,
    place: DataTypes.TEXT,
    target: DataTypes.TEXT,
    supplier:  DataTypes.TEXT,
    address: DataTypes.TEXT,
    phone:DataTypes.TEXT,
    price: DataTypes.TEXT,
      medicine: DataTypes.STRING,
      qty: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CheckupPlan',
  });
  return CheckupPlan;
};
