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
        }
    }

    Smeta.init({
        patientName: DataTypes.STRING,
        patientBirthDate: DataTypes.STRING,
        diagnosis: DataTypes.STRING,
        applId: DataTypes.STRING,
        patientPromoter: DataTypes.STRING,
        isReadyForCoordinator: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Smeta',
    });
    return Smeta;
};