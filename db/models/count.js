'use strict';
module.exports = (sequelize, DataTypes) => {
  const count = sequelize.define('count', {
   
    bid: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    updated_at: DataTypes.NOW
    
  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  count.associate = function(models) {
    // associations can be defined here
    count.belongsTo(models.blog, {foreignKey: 'bid'}); 
  };
  return count;
};