import express from 'express';
import dotenv from 'dotenv'
import Promise from 'bluebird'
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose';
import auth from './routes/auth';
import users from './routes/users'
import books from './routes/books'


dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL)

app.use('/api/auth',auth);
app.use('/api/users',users);
app.use('/api/books',books);

// app.post('/api/auth', (req,res) => {
//     res.status(400).json({errors: {global: "Invalid Credentials"}})
// }) 
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));
})

app.listen(8080, () => console.log('running on localhost: 8080'));