'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
   
    uid: DataTypes.INTEGER,
    bid: DataTypes.INTEGER,
    liked_at: DataTypes.NOW

  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  like.associate = function(models) {
    // associations can be defined here
    like.belongsTo(models.user,{foreignKey: 'uid'});
    like.belongsTo(models.blog,{foreignKey: 'bid'});
  };
  return like;
};