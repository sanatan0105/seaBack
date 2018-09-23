'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog_tag = sequelize.define('blog_tag', {
   
    bid: DataTypes.INTEGER,
    tid: DataTypes.INTEGER


  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  blog_tag.associate = function(models) {
    // associations can be defined here
    blog_tag.belongsTo(models.tag,{foreignKey: 'tid'});
    blog_tag.belongsTo(models.blog,{foreignKey: 'bid'});
  };
  return blog_tag;
};