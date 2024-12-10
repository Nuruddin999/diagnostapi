'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Smetamealcost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Smetamealcost.belongsTo(models.Smeta, {
                foreignKey: 'smetaId',
                onDelete: 'CASCADE'
            })
        }
    }

    Smetamealcost.init({
        placeName: DataTypes.STRING,
        city: DataTypes.STRING,
        daysQty: DataTypes.STRING,
        peopleQty: DataTypes.STRING,
        costPerDay: DataTypes.STRING,
        totalCost: DataTypes.STRING,
        infoSrc: DataTypes.STRING,
        currency: DataTypes.STRING,
        smetaId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Smetamealcost',
    });
    return Smetamealcost;
};