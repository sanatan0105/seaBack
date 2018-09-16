'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
   
    who: DataTypes.INTEGER,
    whom: DataTypes.INTEGER,
    followed_at: DataTypes.NOW

  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};