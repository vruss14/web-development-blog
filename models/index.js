const User = require('./User');
const Blogpost = require('./Blogpost');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, BlogPost };