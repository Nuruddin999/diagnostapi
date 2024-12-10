'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Smetaplans',
                'currency',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            ),
            queryInterface.addColumn(
                'Smetaroadcosts',
                'currency',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            ),
            queryInterface.addColumn(
                'Smetaroaccomodations',
                'currency',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            ),
            queryInterface.addColumn(
                'Smetamealcosts',
                'currency',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            ),
            queryInterface.addColumn(
                'Smetatransportcosts',
                'currency',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            ),
            queryInterface.addColumn(
                'Smetacosts',
                'currency',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            ),
        ]);
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeColumn('Smetaplans', 'currency'),
            queryInterface.removeColumn('Smetaroadcosts', 'currency'),
            queryInterface.removeColumn('Smetaroaccomodations', 'currency'),
            queryInterface.removeColumn('Smetamealcosts', 'currency'),
            queryInterface.removeColumn('Smetatransportcosts', 'currency'),
            queryInterface.removeColumn('Smetacosts', 'currency'),
        ]);
    }
};
