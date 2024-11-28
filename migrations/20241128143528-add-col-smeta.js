'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smeta', 'totalAllSum', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Smeta', 'totalAllSum' ),
        ]);
    }
};
