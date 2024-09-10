  const mongoose =require('mongoose');
  require('dotenv').config();


exports.connectWithDB=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then( ()=>{
      console.log("DB connected");
    }).catch((err)=>{
      console.log("not able to connected to DB ",err)
    })
}