'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
   
    tag: DataTypes.TEXT

  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  tag.associate = function(models) {
    // associations can be defined here
  };
  return tag;
};