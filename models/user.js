'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Token, {
        foreignKey: 'userId',
      })
      User.hasMany(models.Rights, {
        foreignKey: 'userId',
        onDelete:'cascade'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    speciality: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    isDeletedPlace: DataTypes.BOOLEAN,
    department:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};