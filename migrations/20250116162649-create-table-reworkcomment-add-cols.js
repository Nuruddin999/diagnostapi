'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('ReworkComments', 'createdAt', {
                allowNull: true,
                type: Sequelize.DATE
            }),
            queryInterface.addColumn('ReworkComments', 'updatedAt', {
                allowNull: true,
                type: Sequelize.DATE
            }), queryInterface.addColumn('ReworkCommentFiles', 'createdAt', {
                allowNull: true,
                type: Sequelize.DATE
            }),
            queryInterface.addColumn('ReworkCommentFiles', 'updatedAt', {
                allowNull: true,
                type: Sequelize.DATE
            })])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
