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
            // define association here
            Smeta.hasMany(models.AdditionalCosts, {
                foreignKey: 'smetaId',
                onDelete: 'cascade'
            })
            Smeta.hasMany(models.SmetaCheckupPlan, {
                foreignKey: 'smetaId',
                onDelete: 'cascade'
            })
        }
    }

    Smeta.init({
        patientPromoter: DataTypes.STRING,
        creationDate: DataTypes.STRING,
        mostProblDiagnosis: DataTypes.TEXT,
        patientName: DataTypes.STRING,
        patientBirthDate: DataTypes.STRING,
        execDate: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Smeta',
    });
    return Smeta;
};