'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SmetaCheckupPlan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SmetaCheckupPlan.belongsTo(models.Smeta, {
                foreignKey: 'smetaId',
                onDelete: 'CASCADE'
            })
        }
    }
    SmetaCheckupPlan.init({
        kind: DataTypes.TEXT,
        supplier:  DataTypes.TEXT,
        address: DataTypes.TEXT,
        phone:DataTypes.TEXT,
        price: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'SmetaCheckupPlan',
    });
    return SmetaCheckupPlan;
};
