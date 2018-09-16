'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
   
    name: DataTypes.TEXT,
    password: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    created_at: DataTypes.NOW

  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};