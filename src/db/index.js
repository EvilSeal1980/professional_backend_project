import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config({
  path: './.env'
})

import { ConnectionString } from "mongodb-connection-string-url";

const connectDB = async () => {
  try {
    // mongoose gives a return object in response
    // that we are storing in connectionInstance
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDB;
