const Sequelize = require('sequelize');
const { sequelize } = require('./connection');
const { DataTypes } = require('sequelize'); // Import the built-in data types

class Users extends Sequelize.Model {}
Users.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    DOB: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    have_reduction: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    have_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_jdr_player: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_jds_player: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_volunteer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_member_of_honor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_super_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'AAA',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    sequelize,
    modelName: 'users',
  },
);

module.exports = Users;
