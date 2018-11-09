require("dotenv-safe").config();
import "@babel/polyfill";
import mongoose from 'mongoose'
// project files
import app from './app';
import connectDB from './config/connectDB';

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`);
    setTimeout(connectDB, 5000);
    // process.exit(-1)
})

connectDB()
    .catch((err) => {
        console.log('===>  Error connecting to definition database');
        console.log(`Reason: ${err}`);
        throw err;
    })
    .then(() => {
        console.log('===>  Succeeded in connecting to mongodb');
        app.listen(app.get('port'));
    });
