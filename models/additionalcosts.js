'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AdditionalCosts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            AdditionalCosts.belongsTo(models.Smeta, {
                foreignKey: 'smetaId',
                onDelete: 'CASCADE'
            })
        }
    }
    AdditionalCosts.init({
        name: DataTypes.TEXT,
        reason:  DataTypes.TEXT,
        total: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'AdditionalCosts',
    });
    return AdditionalCosts;
};
