"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("AbroadInfos", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            reason: { type: Sequelize.TEXT, allowNull: true },
            date: { type: Sequelize.DATEONLY, allowNull: true },
            destination: { type: Sequelize.TEXT, allowNull: true },
            nameHospital: { type: Sequelize.TEXT, allowNull: true },
            addressHospital: { type: Sequelize.TEXT, allowNull: true },
            phoneHospital: { type: Sequelize.STRING(255), allowNull: true },
            requiredServicesType: { type: Sequelize.TEXT, allowNull: true },
            requiredMedicines: { type: Sequelize.TEXT, allowNull: true },
            vehicle: { type: Sequelize.TEXT, allowNull: true },
            apartment: { type: Sequelize.TEXT, allowNull: true },
            food: { type: Sequelize.TEXT, allowNull: true },
            transportCosts: { type: Sequelize.TEXT, allowNull: true, defaultValue: 0 },
            peopleQty: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 1 },
            daysQty: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 1 },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("AbroadInfos");
    },
};
