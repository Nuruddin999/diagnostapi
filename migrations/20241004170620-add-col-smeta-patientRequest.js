'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smeta', 'patientRequest', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
        ]);
    },

    async down(queryInterface) {

    }
};
