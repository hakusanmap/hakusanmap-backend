'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '投稿の固有のID'
      },
      name: {
        allowNull: true,
        type: Sequelize.TEXT,
        default: null,
        comment: '投稿された物の名前'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '投稿したユーザのID'
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['animal', 'plant', 'disaster'],
        comment: '投稿の種類(動物,植物,災害)'
      },
      img_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '投稿された画像のID'
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '投稿された場所のID'
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
    await queryInterface.dropTable('posts');
  }
};