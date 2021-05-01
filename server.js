'use strict'

import express from 'express';
import routes from './app/routes/note.routes.js'
import { url } from './config/database.config.js';
import mongoose from 'mongoose';

const PORT = 8881;//specify port

//create express app
const app = express();

mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log('connected to db successfully!');
}).catch(err => {
    console.log('failed db connection. Err: ', err);
    process.exit();
})

// parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse requests of content-type application/json
app.use(express.json());

routes(app)

//define a route
app.get('/', (req, res) => {
    res.json({'message': 'Welcome to NotesApp!'});
});

//listen for requests
app.listen(PORT, () => {
    console.log('listening on port ', PORT)
})

