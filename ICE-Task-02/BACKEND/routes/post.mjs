import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get all the records.
router.get('/', async (req, res) => {
    let collection = db.collection('posts');
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
});

// Create a new record.
router.post('/', async (req, res) => {
    let newDocument = {
        user: req.body.user,
        content: req.body.content,
        image: req.body.image,
    };

    let collection = db.collection('posts');
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result);
});

// Update a record by id.
router.patch('/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updateDocument = {
        $set: {
            user: req.body.user,
            content: req.body.content,
            image: req.body.image,
        },
    };

    let collection = db.collection('posts');
    let result = await collection.updateOne(query, updateDocument);
    res.status(200).send(result);
});

// Get a single record by id.
router.get('/:id', async (req, res) => {
    let collection = db.collection('posts');
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    
    if (!result) {
        return res.status(404).send({ message: 'Post not found' });
    } else {
        return res.status(200).send(result);
    }
});

// Delete a record by id.
router.delete('/:id', async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };

    let collection = db.collection('posts');
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
});

export default router;