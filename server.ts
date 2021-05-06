require('dotenv').config();

import routerApi from "./api/routes/index";
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = 8080;

// 5mb limit for image uploads
app.use(bodyParser.json({limit: '5mb'}));
app.use("/api", routerApi);

if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    // Throw error if MONGO_URI env variable doesn't exist
    throw Error('MONGO_URI missing from env variables');
  }

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})