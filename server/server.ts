import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import mongoose from 'mongoose';
import keys from './config/keys';
import { logger } from './utils/logger';
import routes from './routes';

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

// logging
app.use(expressPinoLogger({ logger }));

// DB Config
const db = keys.mongoURI as string;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

app.use('/api/users', routes.UserRoute);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
