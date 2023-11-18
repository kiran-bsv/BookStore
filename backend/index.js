import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookmodels.js';
import bookRouter from './routes/booksRoute.js';
import cors from 'cors';


const app = express();
app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(cors()); // to allow cross-origin requests - middleware

app.get("/", (req, res)=> {
    console.log(req);
    return res.status(350).send('welcome to mern stack');
});   // getting resource from  server

app.use("/books", bookRouter);

mongoose
    .connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
          });
    })
    .catch((err) => console.log(err.message));
