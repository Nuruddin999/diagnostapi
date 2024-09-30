'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smeta', 'patientPromoter', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('Smeta', 'diagnosis', {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            }),
            queryInterface.addColumn('Smeta', 'applId', {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            })
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Smeta', 'patientPromoter', ),
            queryInterface.removeColumn('Smeta', 'diagnosis'),
            queryInterface.removeColumn('Smeta', 'applId')
        ]);
    }
};
