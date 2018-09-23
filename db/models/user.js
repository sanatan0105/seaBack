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
    user.hasMany(models.blog, {foreignKey: 'user_id'});
    user.hasMany(models.visit, {foreignKey: 'uid'});
    user.hasMany(models.like, {foreignKey: 'uid'});
  };
  return user;
};