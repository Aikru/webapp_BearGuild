const User = require('../../db/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async ({ mail, password }) => {
  try {
    const user = await User.findOne({
      where: {
        email: mail,
      },
    });

    if (!user) {
      throw new Error('Email / Mot de passe incorrect');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Email / Mot de passe incorrect');
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET);

    return {
      accessToken,
      userId: user.id,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
};
