const jwt = require('jsonwebtoken');
const Users = require('../../db/Users');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('Veuillez vous connecter');
    }
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET);
    const id = decodedToken.userId;
    if (!id) {
      throw new Error('Token invalide');
    }

    const user = await Users.findOne({ where: { id } });
    if (!user) {
      throw new Error('Connexion invalide, veuillez vous reconnecter');
    }

    next();
  } catch (error) {
    res.status(401).json({
      errors: [error.message],
    });
  }
};

module.exports = authMiddleware;
