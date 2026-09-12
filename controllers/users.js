const mongodb = require('../data/datebase');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const users = await mongodb.getDatabase().collection('users').find({}).toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Unable to retrieve users' });
    }
};

const getSingle  = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

module.exports = {
    getAll,
    getSingle
}; 