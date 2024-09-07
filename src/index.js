// require('dotenv').config({path: '/.env'});

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

//DB is a async menthod
// Therefore it returns a 
//promise after completion
// so we include .then and .catch
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        //callback
        console.log(`Server listening on ${process.env.PORT || 8000}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!!", err)
})



// function connectDB() {}

// connectDB();

//PROFESSIONAL_WAY_TO_CONNECT_MONGODB

// IIFEs (Immediately Invoked Function Expressions) in JavaScript.

// What are IIFEs?

// An IIFE is a JavaScript function that runs
// as soon as it is defined. It's a way to create
// a function and execute it immediately, without
// having to assign it to a variable or call it explicitly later.

// (function() {
//     // Code to be executed immediately
//   })();
//;-for cleaning purpose if ';' not in prev line
// ;(() => {})()

/*
import express from 'express';
const app = express();

( async () => {
    try {
        await mongoose.connect(`${[process.env.MONGODB_URI]}/${DB_NAME}`);
        app.on('error', (error) => {
            console.log("ERROR: ", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.log("ERROR: ", error);
    }
})()
*/

// Second Approach - Professional
