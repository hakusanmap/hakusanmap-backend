'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '場所の固有のID'
      },
      name: {
        allowNull: true,
        type: Sequelize.TEXT,
        default: null,
        comment: '画像の名前'
      },
      latitude: {
        type: Sequelize.FLOAT,
        default: 0,
        comment: '場所の緯度'
      },
      longitude: {
        type: Sequelize.FLOAT,
        default: 0,
        comment: '場所の経度'
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
    await queryInterface.dropTable('locations');
  }
};