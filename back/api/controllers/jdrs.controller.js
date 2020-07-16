const JDRTable = require('../../db/JDRTable');
const Users = require('../../db/Users');
const { usersWantedAttributes } = require('./users.controller');

const jdrWantedAttributes = [
  'id',
  'dm',
  'jdr_name',
  'first_seance',
  'last_seance',
  'time_between_seances',
];

const getAllJDRs = async () => {
  return JDRTable.findAll({
    attributes: jdrWantedAttributes,
    include: {
      model: Users,
      attributes: usersWantedAttributes,
      as: 'players',
    },
  });
};

const createJDR = async ({
  jdr_name,
  dm,
  first_seance,
  last_seance,
  time_between_seances,
  players,
}) => {
  try {
    const table = await JDRTable.create({
      jdr_name,
      dm,
      first_seance,
      last_seance,
      time_between_seances,
    });

    const promises = players.map(async player => {
      const user = await Users.findOne({ where: { id: player } });
      if (!user) return;

      table.addPlayers(user);
    });

    await Promise.all(promises);

    return table;
  } catch (error) {
    throw error;
  }
};

const getJDR = id => {
  try {
    return JDRTable.findOne({
      where: { id },
      include: {
        model: Users,
        attributes: usersWantedAttributes,
        as: 'players',
      },
      attributes: jdrWantedAttributes,
    });
  } catch (error) {
    throw error;
  }
};

const updateJDR = async (
  id,
  { jdr_name, dm, first_seance, last_seance, time_between_seances, players },
) => {
  try {
    const table = await JDRTable.findOne({ where: { id } });

    if (!table) return null;

    const promises = players.map(async player => {
      const user = await Users.findOne({ where: { id: player } });
      if (!user) return;

      return user;
    });

    const users = await Promise.all(promises);
    const existingUsers = users.filter(user => !!user);

    table.setPlayers(existingUsers);

    table.jdr_name = jdr_name;
    table.dm = dm;
    table.first_seance = first_seance;
    table.last_seance = last_seance;
    table.time_between_seances = time_between_seances;
    await table.save();

    return table;
  } catch (error) {
    throw error;
  }
};

const deleteJDR = id => {
  try {
    return JDRTable.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllJDRs,
  createJDR,
  getJDR,
  updateJDR,
  deleteJDR,
  jdrWantedAttributes,
};
