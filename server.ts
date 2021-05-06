import routerApi from "./api/routes/index";
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

// 5mb limit for image uploads
app.use(bodyParser.json({limit: '5mb'}));
app.use("/api", routerApi);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})