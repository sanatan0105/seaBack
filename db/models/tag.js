'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
   
    tag: DataTypes.TEXT

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