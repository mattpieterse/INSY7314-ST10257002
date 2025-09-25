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

export default router;