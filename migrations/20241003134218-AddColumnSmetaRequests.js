module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn('Smeta', 'fundRequest', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('Smeta', 'patientPhone', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('Smeta', 'status', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn('Smeta', 'customer', {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            })
        ]);
    },

    async down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('Smeta', 'patientRequest', ),
            queryInterface.removeColumn('Smeta', 'fundRequest'),
            queryInterface.removeColumn('Smeta', 'patientPhone'),
            queryInterface.removeColumn('Smeta', 'status'),
            queryInterface.removeColumn('Smeta', 'customer')
        ]);
    }
};