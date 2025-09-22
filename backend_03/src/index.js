// require('dotenv').config({path: './.env'});
import dotenv from 'dotenv';
dotenv.config({ 
  path: './.env'
 });

import connectDB from './db/index.js';



connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000,() => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
  })
})
.catch((err) => {
  console.log("MONGODB connection error", err);
});






/*
import express from 'express';
const app = express();

( async () => {
  try{
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log('Error:', err);
      throw error;
    });

    app.listen(process.env.PORT,() =>{
      console.log(`Server is running on port ${process.env.PORT}`);
    })
    // console.log('Database connected successfully');
  } catch(error){
    console.log('Error:', error);
    throw error;
  }
})()
  */