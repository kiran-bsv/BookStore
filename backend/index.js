import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookmodels.js';

const app = express();
app.use(express.json()); // to parse the incoming requests with JSON payloads

app.get("/", (req, res)=> {
    console.log(req);
    return res.status(350).send('welcome to mern stack');
});   // getting resource from  server

app.post("/books", async(req, res) => {
    try{
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const newBook= new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        });

        const book= await Book.create(newBook);

        return res.status(201).send({book});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
});


mongoose
    .connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
          });
    })
    .catch((err) => console.log(err.message));
