'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
   
    user_id:    DataTypes.INTEGER,
    blog:       DataTypes.TEXT,
    category_id:   DataTypes.INTEGER,
    create_at:  DataTypes.NOW,
    updated_at: DataTypes.NOW

  }, 
  {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    underscored: false,
    freezeTableName: true

  });
  blog.associate = function(models) {
    // associations can be defined here
    blog.belongsTo(models.user,{foreignKey: 'user_id'});
    blog.belongsTo(models.category,{foreignKey: 'category_id'});
    blog.hasMany(models.visit, {foreignKey: 'bid'});
    blog.hasMany(models.like, {foreignKey: 'bid'});
    blog.hasMany(models.blog_tag, {foreignKey: 'bid'});
    blog.hasOne(models.count, {foreignKey:'bid'})
  };
  return blog;
};