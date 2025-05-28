'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('ReworkComments', 'applicationId', {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'Applications',
                    key: 'id',
                }
            })])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('ReworkComments', 'applicationId');
    }
};
