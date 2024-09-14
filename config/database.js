  const mongoose =require('mongoose');
  require('dotenv').config();


exports.connectWithDB=()=>{
    mongoose.connect(process.env.MONGODB_URL).then( ()=>{
      console.log("DB connected successfully ");
    }).catch((err)=>{
      console.log("not able to connected to DB ",err)
    })
}