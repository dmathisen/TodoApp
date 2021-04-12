const { getDatabase } = require('../database/mongo');

const getAllTodos = async () => {
    const db = await getDatabase();
    const todoCollection = await db.collection('todoItem');
    return todoCollection.find({}).toArray();
}

module.exports = {
    getAllTodos
}