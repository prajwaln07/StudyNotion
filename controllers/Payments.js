const {instance} =require('../config/razorpay');
const Course=require('../models/Course');
const User=require('../models/User');
const mongoose=require('mongoose');
const mailSender=require('../utils/mailSender');
const courseEnrollmentEmail=require('../mail/templates/courseEnrollmentEmail');

exports.capturePayment=async (req,res)=>{
const {courseID}=req.body;
const userId=req.user.id;
if(!courseID){
return res.json({
    success:false,
    message:"Please Provide valid Course ID",
})
}
let courseToBeEnrolledIn;
try{
    courseToBeEnrolledIn=await Course.findById(courseID);
    if(!courseToBeEnrolledIn){
        return res.json({
            success:false,
            message:"course  is not valid",
        })
    }

    const uid=new mongoose.Types.ObjectId(userId);
 
if(courseToBeEnrolledIn.studentsEnrolled.includes(uid)){
    return res.json({
        success:false,
        message:"student is already enrolled",
    })
}



}catch(err){
console.log("got error while feching the course inside payment creation ",err);
return res.status(500).json({
    success:false,
    message:err,
})
}

};



