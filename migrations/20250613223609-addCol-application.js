'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Applications', 'passToCoordinatorTime', {
                type: Sequelize.DATE,
                allowNull: true,
            }),
        ]);
    },

    async down (queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Applications', 'passToCoordinatorTime'),
        ]);
    }
};
