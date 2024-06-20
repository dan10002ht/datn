import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import route from './src/routes';
import bodyParser from 'body-parser';
import cron from 'node-cron';
import {createOrUpdateAnalytics} from './src/repositories/analyticRepository';

const PORT = 4000;

const app = express();

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

route(app);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

cron.schedule('0 0 * * *', async () => {
  console.log('running a task every midnight');
  await createOrUpdateAnalytics();
});
