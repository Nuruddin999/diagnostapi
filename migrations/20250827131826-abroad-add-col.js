'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('AbroadInfos', 'applId', {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'Applications',
                    key: 'id',
                }
            }),
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('AbroadInfos', 'applId' ),
        ]);
    }
};
