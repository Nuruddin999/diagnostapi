'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Smetatransportcost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Smetatransportcost.belongsTo(models.Smeta, {
            foreignKey: 'smetaId',
            onDelete: 'CASCADE'
        })
    }
  }
  Smetatransportcost.init({
    transportKind: DataTypes.STRING,
    fromTo: DataTypes.STRING,
    tripsQty: DataTypes.STRING,
    peopleQty: DataTypes.STRING,
    costPerTrip: DataTypes.STRING,
    totalCost: DataTypes.STRING,
    infoSrc: DataTypes.STRING,
      smetaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Smetatransportcost',
  });
  return Smetatransportcost;
};