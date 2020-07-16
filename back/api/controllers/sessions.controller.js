const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Session = require('../../db/Session');
const Users = require('../../db/Users');
const JDRTable = require('../../db/JDRTable');
const { usersWantedAttributes } = require('./users.controller');
const { jdrWantedAttributes } = require('./jdrs.controller');

const sessionsWantedAttributes = ['id', 'date', 'commit', 'is_jdr', 'is_jds'];

const getAllSessions = ({ start_date, end_date, date }) => {
  try {
    let whereConditions = {};
    if (start_date && end_date) {
      whereConditions = {
        date: {
          [Op.between]: [start_date, end_date],
        },
      };
    }

    if (date) {
      whereConditions = {
        date,
      };
    }

    return Session.findAll({
      where: whereConditions,
      attributes: sessionsWantedAttributes,
      include: [
        {
          model: Users,
          attributes: usersWantedAttributes,
          as: 'presents',
        },
        {
          model: JDRTable,
          attributes: jdrWantedAttributes,
          as: 'table',
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

const createSession = async ({ date, commit, is_jdr, is_jds, presents, jdrtable_id }) => {
  try {
    const session = await Session.create({
      date,
      is_jds: is_jds ? 1 : 0,
      is_jdr: is_jdr ? 1 : 0,
      commit: commit || 'RAS',
      jdrtable_id,
    });

    const promises = presents.map(async present => {
      const user = await Users.findOne({ where: { id: present } });
      if (!user) return;

      session.addPresents(user);
    });

    await Promise.all(promises);

    return session;
  } catch (error) {
    throw error;
  }
};

const getSession = id => {
  try {
    return Session.findOne({
      where: { id },
      include: [
        {
          model: Users,
          attributes: usersWantedAttributes,
          as: 'presents',
        },
        {
          model: JDRTable,
          attributes: jdrWantedAttributes,
          as: 'table',
        },
      ],
      attributes: sessionsWantedAttributes,
    });
  } catch (error) {
    throw error;
  }
};

const updateSession = async (id, { date, commit, presents, jdrtable_id }) => {
  try {
    const session = await Session.findOne({ where: { id }, attributes: sessionsWantedAttributes });

    if (!session) return null;

    const promises = presents.map(async present => {
      const user = await Users.findOne({ where: { id: present } });
      if (!user) return;

      return user;
    });

    const users = await Promise.all(promises);
    const existingUsers = users.filter(user => !!user);

    session.setPresents(existingUsers);

    session.date = date;
    session.commit = commit;
    session.jdrtable_id = jdrtable_id;
    await session.save();

    return getSession(session.id);
  } catch (error) {
    throw error;
  }
};

const deleteSession = id => {
  try {
    return Session.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllSessions,
  createSession,
  getSession,
  updateSession,
  deleteSession,
  sessionsWantedAttributes,
};
