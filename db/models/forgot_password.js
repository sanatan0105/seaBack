'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const forgot_password = sequelize.define('forgot_password', {
    phone: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
    status:DataTypes.INTEGER,
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  forgot_password.associate = function(models) {
    // associations can be defined here
  };
  return forgot_password;
};