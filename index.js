const express=require('express');
require('dotenv').config();
const app=express();
const {connectWithDB}=require('./config/database')

const PORT=  3001;
connectWithDB();

 


app.listen(PORT,()=>{
    console.log("app is running at PORT -> " , PORT);
})




























