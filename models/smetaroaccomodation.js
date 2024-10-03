'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Smetaroaccomodation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Smetaroaccomodation.belongsTo(models.Smeta, {
                foreignKey: 'smetaId',
                onDelete: 'CASCADE'
            })
        }
    }

    Smetaroaccomodation.init({
        serviceName: DataTypes.STRING,
        city: DataTypes.STRING,
        inData: DataTypes.STRING,
        outData: DataTypes.STRING,
        peopleQty: DataTypes.STRING,
        costPerDay: DataTypes.STRING,
        totalCost: DataTypes.STRING,
        infoSrc: DataTypes.STRING,
        smetaId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Smetaroaccomodation',
    });
    return Smetaroaccomodation;
};