const express=require('express');
require('dotenv').config();
const app=express();
const {connectWithDB}=require('./config/database')
const cookieParser=require('cookie-parser');
const cors=require('cors');
const {uploadImageToCloudinary} =require('./utils/imageUploader')
const fileUpload=require('express-fileupload');

const PORT=  3001;
connectWithDB(); 
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)




const userRoutes=require('./routes/User');

const profileRoutes=require('./routes/Profile');

const paymentRoutes=require('./routes/Payment');

const courseRoutes=require('./routes/Course');
  
const contactUSRoutes=require('./routes/Contact');
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/contact",contactUSRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"server is ruuning ....",
    })
})


app.listen(PORT,()=>{
    console.log("app is running at PORT >>>> " , PORT);
})




























