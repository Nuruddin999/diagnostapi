'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smetaplans', 'medicine', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('Smetaplans', 'qty', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('Smetaplans', 'totalPrice', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Smetaplans', 'medicine', ),
            queryInterface.removeColumn('Smetaplans', 'qty'),
            queryInterface.removeColumn('Smetaplans', 'totalPrice'),
        ]);
    }
};