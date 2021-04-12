const express = require('express');
const router = express.Router();
const todo = require('./todo');

router.use('/api/todos', todo)

module.exports = router;