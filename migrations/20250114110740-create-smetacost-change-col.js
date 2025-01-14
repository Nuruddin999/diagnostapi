'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Smetacosts', 'reason', {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
            queryInterface.changeColumn('Smetacosts', 'name', {
                type: Sequelize.TEXT,
                allowNull: true,
            })
        ])
    }
};
