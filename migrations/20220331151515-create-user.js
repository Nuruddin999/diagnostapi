'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      speciality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientRequest: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fundName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fundRequest: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      manager: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creationDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      execDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mostProblDiagnosis: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      secondaryDiagnosis: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      complaint: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      anamnesis: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      diagnosticData: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      patientName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patientBirthDate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};