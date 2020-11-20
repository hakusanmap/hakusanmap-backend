'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'ユーザ固有のID'
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
        comment: 'ユーザ固有のメールアドレス'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: 'ユーザの名前'
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
        comment: 'ユーザのパスワード'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '生成日'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '変更日'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};