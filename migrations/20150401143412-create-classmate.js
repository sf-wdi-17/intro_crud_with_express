"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Classmates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
      },
      phone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Classmates").done(done);
  }
};