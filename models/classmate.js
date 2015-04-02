"use strict";
module.exports = function(sequelize, DataTypes) {
  var Classmate = sequelize.define("Classmate", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Classmate;
};