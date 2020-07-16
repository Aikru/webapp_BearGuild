const express = require('express');
const router = express.Router();
const { param, validationResult, query } = require('express-validator');
const {
  getAllSessions,
  createSession,
  getSession,
  updateSession,
  deleteSession,
} = require('../controllers/sessions.controller');

// Get All
router.get(
  '/',
  [
    query('start_date').isString().optional(),
    query('end_date').isString().optional(),
    query('date').isString().optional(),
  ],
  async (req, res) => {
    try {
      const sessions = await getAllSessions({ ...req.query });
      return res.send(sessions);
    } catch (error) {
      return res.status(422).json({ errors: [error.message] });
    }
  },
);

// Create
router.post('/', async (req, res) => {
  try {
    const session = await createSession(req.body);
    return res.send(session);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Get one
router.get('/:id', [param('id').isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const session = await getSession(req.params.id);
    if (!session) {
      res.status(404);
    }
    return res.send(session);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Edit one
router.put('/:id', [param('id').isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const session = await updateSession(req.params.id, req.body);
    if (!session) {
      res.status(404);
    }

    return res.send(session);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// Delete one
router.delete('/:id', [param('id').isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const session = await deleteSession(req.params.id);
    if (!session) {
      res.status(404);
    }
    return res.send('La session a bien été supprimée');
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

module.exports = router;
