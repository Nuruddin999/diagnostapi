'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Applications', 'duration', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
        ]);
    },

    async down (queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Applications', 'duration'),
        ]);
    }
};

