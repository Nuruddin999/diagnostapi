'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('CheckupPlans', 'medicine', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('CheckupPlans', 'qty', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('CheckupPlans', 'totalPrice', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('CheckupPlans', 'medicine', ),
            queryInterface.removeColumn('CheckupPlans', 'qty'),
            queryInterface.removeColumn('CheckupPlans', 'totalPrice'),
        ]);
    }
};