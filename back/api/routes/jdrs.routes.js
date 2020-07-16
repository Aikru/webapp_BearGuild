const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const {
  getAllJDRs,
  createJDR,
  getJDR,
  updateJDR,
  deleteJDR,
} = require('../controllers/jdrs.controller');

// get all
router.get('/', async (req, res) => {
  try {
    const jdrtable = await getAllJDRs();
    return res.send(jdrtable);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// create
router.post('/', async (req, res) => {
  try {
    const table = await createJDR(req.body);
    return res.send(table);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// get one
router.get('/:id', [param('id').isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const jdrtable = await getJDR(req.params.id);
    if (!jdrtable) {
      return res.status(404);
    }
    return res.send(jdrtable);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// edit one
router.put('/:id', [param('id').isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const jdrtable = await updateJDR(req.params.id, req.body);
    if (!jdrtable) {
      return res.status(404);
    }
    return res.send(jdrtable);
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

// delete one
router.delete('/:id', [param('id').isInt()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const jdrtable = await deleteJDR(req.params.id);
    if (!jdrtable) {
      return res.status(404);
    }
    return res.send('La table de jdr a bien été supprimée');
  } catch (error) {
    return res.status(422).json({ errors: [error.message] });
  }
});

module.exports = router;
