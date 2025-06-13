'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        UserSession.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        })
    }
  }
  UserSession.init({
    userId: DataTypes.INTEGER,
    connectedAt: DataTypes.DATE,
    disconnectedAt: DataTypes.DATE,
    durationSeconds: DataTypes.INTEGER,
    sessionDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserSession',
  });
  return UserSession;
};