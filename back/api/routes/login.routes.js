const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { login } = require('../controllers/login.controller');

// get all
router.post('/', [body('mail').isEmail(), body('password').isString()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await login(req.body);
    return res.send(user);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

module.exports = router;
