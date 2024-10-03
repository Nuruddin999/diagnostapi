'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Smetatransportcosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transportKind: {
        type: Sequelize.STRING
      },
      fromTo: {
        type: Sequelize.STRING
      },
      tripsQty: {
        type: Sequelize.STRING
      },
      peopleQty: {
        type: Sequelize.STRING
      },
      costPerTrip: {
        type: Sequelize.STRING
      },
      totalCost: {
        type: Sequelize.STRING
      },
      infoSrc: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Smetatransportcosts');
  }
};