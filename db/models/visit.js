'use strict';
module.exports = (sequelize, DataTypes) => {
  const visit = sequelize.define('visit', {
   
    bid: DataTypes.INTEGER,
    uid: DataTypes.INTEGER,
    visited_at: DataTypes.NOW

  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  visit.associate = function(models) {
    // associations can be defined here
  };
  return visit;
};