const express = require('express');
const { getAllTodos } = require('../dataAccess/todoDA');

const router = express.Router();

router.get('/', async (req, res, next) => {
    console.log(JSON.stringify(req?.session?.grant));

    try {
        const todos = await getAllTodos();
        return res.send(todos);
    } catch(err) {
        next(err);
    }
});

router.post('/', (req, res) => {
    return res.send('POST HTTP method on user resource');
});

router.put('/:todoId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.todoId} resource`);
});

router.delete('/:todoId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.todoId} resource`);
});

module.exports = router;