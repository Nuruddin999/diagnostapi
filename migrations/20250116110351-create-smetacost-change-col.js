'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Smetaplans', 'address', {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
            queryInterface.changeColumn('Smetaplans', 'supplier', {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
            queryInterface.changeColumn('Smetaplans', 'kind', {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
        ])
    }
};
