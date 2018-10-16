'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
   
    name: DataTypes.TEXT,
    password: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    created_at: DataTypes.NOW,
    username: DataTypes.TEXT,

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
    user.hasMany(models.like, {foreignKey: 'uid'});
    user.hasMany(models.fl, {foreignKey: 'who'});
    user.hasMany(models.fl, {foreignKey: 'whom'});
  };
  return user;
};