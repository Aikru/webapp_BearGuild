const Sequelize = require('sequelize');
const { sequelize } = require('./connection');
const { DataTypes } = require('sequelize');
const Users = require('./Users');

class JDRTable extends Sequelize.Model {}
JDRTable.init(
  {
    jdr_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dm: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    first_seance: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },

    last_seance: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },

    time_between_seances: {
      type: DataTypes.INTEGER,
      defaultValue: Sequelize.NOW,
    },
  },

  {
    sequelize,
    modelName: 'jdrtable',
  },
);

JDRTable.belongsToMany(Users, {
  as: 'players',
  through: 'users_jdrtables',
  foreignKey: 'jdrtable_id',
  otherKey: 'user_id',
  timestamps: false,
});

Users.belongsToMany(JDRTable, {
  as: 'players',
  through: 'users_jdrtables',
  otherKey: 'jdrtable_id',
  foreignKey: 'user_id',
  timestamps: false,
});

module.exports = JDRTable;
