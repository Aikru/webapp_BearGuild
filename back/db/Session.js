const Sequelize = require('sequelize');
const { sequelize } = require('./connection');
const { DataTypes } = require('sequelize'); // Import the built-in data types
const Users = require('./Users');
const JDRTable = require('./JDRTable');

class Sessions extends Sequelize.Model {}
Sessions.init(
  {
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },

    commit: {
      type: DataTypes.TEXT,
      defaultValue: 'RAS',
    },

    is_jdr: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_jds: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_jds: {
      type: DataTypes.INTEGER,
    },
  },

  {
    sequelize,
    modelName: 'sessions',
  },
);

Sessions.belongsToMany(Users, {
  as: 'presents',
  through: 'users_sessions',
  foreignKey: 'session_id',
  otherKey: 'user_id',
  timestamps: false,
});

Users.belongsToMany(Sessions, {
  as: 'presents',
  through: 'users_sessions',
  foreignKey: 'user_id',
  otherKey: 'session_id',
  timestamps: false,
});

Sessions.belongsTo(JDRTable, {
  as: 'table',
  foreignKey: 'jdrtable_id',
});

JDRTable.hasMany(Sessions, {
  as: 'sessions',
});

module.exports = Sessions;
