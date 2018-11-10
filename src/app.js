import express from 'express';
import 'express-async-errors'
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
// project files
import routesApp from './routes';
import {decodeJwt} from './middlewares/decodeJwt';
import { ENV } from './config/app.config';

mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT || 4000;

app.set('port', port);
app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors('*'));
app.use(decodeJwt);
app.use('/api', routesApp);
app.get('/*', (req, res) => {
    res.send('api works fine')
})
console.log('--------------------------');
console.log('===> 😊  Starting Server . . .');
console.log(`===>  Environment:  ${ENV}`);
console.log(`===>  Listening on port:   ${port}`);
console.log('--------------------------');

export default app;
