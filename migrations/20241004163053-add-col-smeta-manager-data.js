module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smeta', 'managerName', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('Smeta', 'managerSpeciality', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('Smeta', 'creationDate', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Smeta', 'managerName', ),
            queryInterface.removeColumn('Smeta', 'managerSpeciality'),
            queryInterface.removeColumn('Smeta', 'creationDate'),
        ]);
    }
};