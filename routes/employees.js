const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { all, one, add, del, edit } = require('../controllers/employees');

// /api/employees
router.get('/', auth, all);

router.post('/', auth, add);

// /api/employees/:id
router.get('/:id', auth, one)

router.delete('/:id', auth, del)

router.put('/:id', auth, edit)

module.exports = router;