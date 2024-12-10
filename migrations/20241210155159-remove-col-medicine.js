'use strict';

module.exports = {
    up: async (queryInterface) => {
        // Remove the column
        await queryInterface.removeColumn('Smetaplans', 'medicine');
    },

    down: async (queryInterface, Sequelize) => {
        // Add the column back (if rollback is needed)
        await queryInterface.addColumn('Smetaplans', 'medicine', {
            type: Sequelize.STRING, // Use the appropriate type
            allowNull: true,        // Use the correct constraints
        });
    },
};
