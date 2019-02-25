import express from 'express';
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose';
import auth from './routes/auth'


const app = express();
app.use(bodyParser.json())
mongoose.connect("mongodb://localhost/bookworm",{useMongoClient: true})

app.use('/api/auth',auth);

// app.post('/api/auth', (req,res) => {
//     res.status(400).json({errors: {global: "Invalid Credentials"}})
// }) 
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));
})

app.listen(8080, () => console.log('running on localhost: 8080'));