'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smeta', 'isReadyForCoordinator', {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true,
            }),
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Smeta', 'isReadyForCoordinator')
        ]);
    }
};
