'use strict';
module.exports = (sequelize, DataTypes) => {
  const app_visit = sequelize.define('app_visit', {
    token: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    visited_at: DataTypes.NOW
  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  app_visit.associate = function(models) {
    // associations can be defined here
    
  };
  return app_visit;
};