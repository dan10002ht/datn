import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import route from './src/routes';
import bodyParser from 'body-parser';

const PORT = 4000;

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

route(app);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
