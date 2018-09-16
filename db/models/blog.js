'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
   
    user_id:    DataTypes.INTEGER,
    blog:       DataTypes.TEXT,
    category:   DataTypes.INTEGER,
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
  };
  return blog;
};