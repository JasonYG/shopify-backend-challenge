require('dotenv').config();

import routerApi from "./api/routes/index";
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const port = 8080;

// 5mb limit for image uploads
app.use(bodyParser.json({limit: '5mb'}));
app.use("/api", routerApi);
app.use(express.static(path.join(__dirname, 'build')))
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    // Throw error if MONGO_URI env variable doesn't exist
    throw Error('MONGO_URI missing from env variables');
  }
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port ${port}!`)
})