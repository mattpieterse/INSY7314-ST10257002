import express from 'express';

const PORT = 3000;
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('I am finally figuring this out, no more crying')
})

app.listen(PORT)