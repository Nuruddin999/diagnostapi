'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Smeta', 'totalAllSum', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Smeta', 'totalAllSum', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    }
};