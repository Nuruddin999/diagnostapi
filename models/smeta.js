'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Smeta extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Smeta.hasMany(models.Smetaplan, {
                foreignKey: 'smetaId',
                onDelete: 'cascade'
            })
            Smeta.hasMany(models.Smetacost, {
                foreignKey: 'smetaId',
                onDelete: 'cascade'
            })
            Smeta.hasMany(models.Smetaroadcost, {
                foreignKey: 'smetaId',
                onDelete: 'cascade'
            })
            Smeta.hasMany(models.Smetaroaccomodation, {
                foreignKey: 'smetaId',
                onDelete: 'cascade'
            })
            Smeta.hasMany(models.Smetatransportcost, {
                foreignKey: 'smetaId',
                onDelete: 'cascade'
            })
            Smeta.hasMany(models.Smetamealcost, {
                foreignKey: 'smetaId',
                onDelete: 'cascade'
            })
        }
    }

    Smeta.init({
        patientName: DataTypes.STRING,
        patientBirthDate: DataTypes.STRING,
        diagnosis: DataTypes.STRING,
        applId: DataTypes.STRING,
        patientPromoter: DataTypes.STRING,
        isReadyForCoordinator: DataTypes.BOOLEAN,
        patientRequest:DataTypes.STRING,
        fundRequest:DataTypes.STRING,
        patientPhone:DataTypes.STRING,
        status:DataTypes.STRING,
        customer:DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Smeta',
    });
    return Smeta;
};