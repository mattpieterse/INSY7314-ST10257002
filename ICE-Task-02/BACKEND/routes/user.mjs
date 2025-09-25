import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ExpressBrute from 'express-brute';

const router = express.Router();

var store = new ExpressBrute.MemoryStore(); 
var bruteforce = new ExpressBrute(store);

// Sign Up
router.post('/signup',  async (req, res) => {
    const password = bcrypt.hash(req.body.password, 10);
    let newDocument = {
        name: req.body.name,
        password: (await password).toString(),
    };

    let collection = db.collection('users');
    let result = await collection.insertOne(newDocument);
    console.log(password);
    res.status(201).send(result);
});

// Login
router.post('/login', bruteforce.prevent, async (req, res) => {
    const { name, password } = req.body;

    console.log(name, password);

    try {
        let collection = db.collection('users');
        let user = await collection.findOne({ name: name });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Authentication failed' });
        }
        else {
            const token = jwt.sign({ username:req.body.name, password:req.body.password }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' });
            res.status(200).json({ userId: user._id, token: token });
            console.log("TOKEN (JWT):", token);
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;