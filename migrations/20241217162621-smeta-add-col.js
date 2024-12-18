'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smeta', 'coordinatorName', {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue:""
            }),
            queryInterface.addColumn('Smeta', 'coordinatorURLSignPath', {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue:""
            }),
            queryInterface.addColumn('Smeta', 'coordinatorSignFile', {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue:""
            })
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Smeta', 'coordinatorName', ),
            queryInterface.removeColumn('Smeta', 'coordinatorURLSignPath'),
            queryInterface.removeColumn('Smeta', 'coordinatorSignFile')
        ]);
    }
};