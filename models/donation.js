'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Donation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Donation.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            image: DataTypes.STRING,
            requeriedSum: DataTypes.INTEGER,
            currentSum: DataTypes.INTEGER,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Donation',
        }
    );

    return Donation;
};
