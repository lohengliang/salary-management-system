'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: DataTypes.STRING,
    user_login: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_salary: DataTypes.DECIMAL
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};