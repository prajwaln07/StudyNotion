const user=require('../models/User');
const Otp=require('../models/OTP');
const OTPGenerator=require('otp-generator');
const OTP = require('../models/OTP');
const  bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken");
const Profile=require('../models/Profile');
const mailSender=require('../utils/mailSender');
const {passwordUpdated}=require('./../mail/templates/passwordUpdate');


//sendOTP
exports.sendOTP=async (req,res)=>{
  
    try{
const {email} =req.body;

let alreadyUser=await user.findOne({email});

if(alreadyUser){
    return res.status(401).json({
        success:false,
        message:"user alredy exists",
    })
}

let otp=OTPGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
})

let result=await Otp.findOne({otp:otp});
while(result){
    otp=OTPGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
    result=await Otp.findOne({otp:otp});
}

const otpPayload={email,otp};
// console.log("otpPayload ->>>>>>>>>");
const otpBody=await OTP.create(otpPayload);


res.status(200).json({
    success:true,
    message:"otp send Successfully",
    otp
})

    }
    catch(err){

console.log("got error while sending OTP ",err);

    }
    
}

exports.signup = async (req, res) => {
    try {

        const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
      } = req.body

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !otp
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        })
      }
  
      const existingUser = await user.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists. Please sign in to continue.",
        })
      }
  
      // Find the most recent OTP for the email
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      if (response.length === 0) {
        // OTP not found for the email
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        })
      }
       else if (otp !== response[0].otp) {
        // Invalid OTP
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        })    
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      let approved = ""
      approved === "Instructor" ? (approved = false) : (approved = true)
  
      // Create the Additional Profile For User
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      })

      const newuser = await user.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword,
        accountType: accountType,
        approved: approved,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}`,
      })
  
      return res.status(200).json({
        success: true,
        newuser,
        message: "User registered successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again.",
      })
    }
  }


//login
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  
      const User = await user.findOne({ email }).populate("additionalDetails")
  
      if (!User) {
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
 
      const payLoad={
        email: User.email,
         id: User._id, 
         role: User.accountType
      }
      if (await bcrypt.compare(password, User.password)) {
        const token = jwt.sign(
          payLoad,
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        User.token = token
        User.password = undefined

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }

        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          User,
          message: `User Login Success`,
        })
      }
       else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } 
    catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }

//change Password 
exports.changePassword = async (req, res) => {
    try {
      const userDetails = await user.findById(req.user.id)
  // console.log("->->->",req.user);
      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
  
      // Validate old password
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await user.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Send notification email
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
  }
