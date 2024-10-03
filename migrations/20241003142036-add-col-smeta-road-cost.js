'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smetaroadcosts', 'smetaId', {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'Smeta',
                    key: 'id',
                }
            }),
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Smetaroadcosts', 'smetaId' ),
        ]);
    }
};
