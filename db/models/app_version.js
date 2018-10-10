'use strict';
module.exports = (sequelize, DataTypes) => {
  const app_version = sequelize.define('app_version', {
   
    version: DataTypes.TEXT,

  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  app_version.associate = function(models) {
    // associations can be defined here
    
  };
  return app_version;
};