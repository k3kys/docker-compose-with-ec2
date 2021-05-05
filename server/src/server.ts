import mongoose from "mongoose"
import dotenv from "dotenv"
import { resolve } from "path"
dotenv.config({ path: resolve(__dirname, "../.env") });

import { app } from "./app"

const start = async () => {
    try {
      await mongoose.connect("mongodb://mongo-rs0-1,mongo-rs0-2,mongo-rs0-3/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('Connected to MongoDb');
    } catch (err) {
      console.error(err);
    }
  
    app.listen(5000, () => {
      console.log('Listening on port 5000!!!!!!!!');
    });
  };
  
  start();