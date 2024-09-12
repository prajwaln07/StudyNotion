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

const amount=courseToBeEnrolledIn.price;
const currency="INR";
const options ={
    amount : amount*100,
    currency : currency,
    receipt:Math.random(Data.now()).toString(),
    notes:{
        courseId:courseID,
        userId
    }
};

try{
const paymentResponse=await instance.orders.create(options);
// console.log(paymentResponse);
return res.json({
 success:true,
 courseName:courseToBeEnrolledIn.courseName,
 courseDescription:courseToBeEnrolledIn.courseDescription,
 data: paymentResponse,

})
}
catch(err){
console.log(err);
return res.json({
    success:false,
    messsage:`could not initiate order ${err} `,
})
}

};

exports.verifySignature =async(req,res)=>{
    const webhookServer ="12345";  
    const signature=req.headers['x-razorpay-signature'];

    const shasum= crypto.createHmac('sha256',webhookServer);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest('hex');

    if(signature == digest){
    console.log("payment is Authorised");
    
    const {courseId,userId}=req.body.payload.entity.notes;
    try{
        const enrolledCourse=await Course.findByIdAndUpdate(
            {courseId},
            {
                $push:{
                    studentsEnrolled:userId,
                }
            },
            {new:true},
        );

        const updatedUser=await User.findByIdAndUpdate(
            {userId},
            {
                $push:{
                    courses:courseId,
                }
            },
            {new:true},
        );

if(!enrolledCourse || !updatedUser ){
return res.status(500).json({
    success:false,
    message:`problem with payment verification`,
})
}

const mailResponse= await mailSender(updatedUser.email,"Congratulation, you are onboarded on studyNotion Course",courseEnrollmentEmail);

return res.status(200).json({
    success:true,
    message:"signature verified and course added",
})

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:`got error while payment verification ${err}`,
        })
    }
    }

else{
    return res.status(400).json({
        success:false,
        message:`Invalid signature `,
    })
}

};



