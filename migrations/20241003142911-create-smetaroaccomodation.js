'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Smetaroaccomodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serviceName: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      inData: {
        type: Sequelize.STRING
      },
      outData: {
        type: Sequelize.STRING
      },
      peopleQty: {
        type: Sequelize.STRING
      },
      costPerDay: {
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
    await queryInterface.dropTable('Smetaroaccomodations');
  }
};