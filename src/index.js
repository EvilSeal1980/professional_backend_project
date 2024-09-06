// require('dotenv').config({path: '/.env'});

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectDB();

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
