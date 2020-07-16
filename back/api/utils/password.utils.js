const bcrypt = require('bcrypt');

const generateRandomPassword = () => {
  const password = crypto.randomBytes(20).toString('hex');
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const generateEncryptedPassword = password => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

module.exports = {
  generateRandomPassword,
  generateEncryptedPassword,
};
