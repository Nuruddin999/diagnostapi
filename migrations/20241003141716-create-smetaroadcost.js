'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Smetaroadcosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicle: {
        type: Sequelize.STRING
      },
      directionTo: {
        type: Sequelize.STRING
      },
      directionFrom: {
        type: Sequelize.STRING
      },
      departureDate: {
        type: Sequelize.STRING
      },
      ticketQty: {
        type: Sequelize.STRING
      },
      cost: {
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
    await queryInterface.dropTable('Smetaroadcosts');
  }
};