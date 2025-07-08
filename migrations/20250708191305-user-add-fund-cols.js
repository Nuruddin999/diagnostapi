'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Users', 'fundDirectorName', {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
            queryInterface.addColumn('Users', 'fundAddress', {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
        ]);
    },

    async down (queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
