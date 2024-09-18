const Course = require("../models/Course")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")
const CourseProgress = require("../models/CourseProgress")
const { uploadImageToCloudinary } = require("../utils/imageUploader")



exports.createCourse=async(req,res)=>{
    try{
        const userId = req.user.id

        let {
          courseName,
          courseDescription,
          whatYouWillLearn,
          price,
          tag: _tag,
          category,
          status,
          instructions: _instructions,
        } = req.body;
        
        let thumbnail ;
        if(req.files.thumbnailImage)
        thumbnail= req.files.thumbnailImage
      else
      thumbnail="";
  
    
console.log(courseName,"  ",courseDescription,"  ",whatYouWillLearn,"   ",price,"   ",_tag,"   ",category,"   ",_instructions);

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !_tag.length ||
            !category ||
            !instructions.length
          ) {
            return res.status(400).json({
              success: false,
              message: "All Fields are Mandatory....",
            })
          }

          const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
          })

          if (!instructorDetails) {
            return res.status(404).json({
              success: false,
              message: "Instructor Details Not Found",
            })
          }

          const categoryDetails = await Category.findById(category)
          if (!categoryDetails) {
            return res.status(404).json({
              success: false,
              message: "Category Details Not Found",
            })
          }

          const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )

          const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            _tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            _instructions,
          })
      
let updatedUSer=await User.findByIdAndUpdate(
    {_id:instructorDetails._id},
{
    $push:{
        courses:newCourse._id,
    }
},
{new:true}
);

await Category.findByIdAndUpdate(
    {_id:categoryDetails._id},
    {
        $push:{
            courses:newCourse._id,
        }
    },
    {new:true}
);
res.status(200).json({
    success: true,
    data: newCourse,
    message: "Course Created Successfully",
  })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message,
          })
    }

}
exports.getAllCourses = async (req, res) => {
    try {
      const allCourses = await Course.find(
        // { status: "Published" },
        {
          courseName: true,
          price: true,
          thumbnail: true,
          instructor: true,
          ratingAndReviews: true,
          studentsEnrolled: true,
        }
      )
        .populate("instructor")
        .exec()
  
      return res.status(200).json({
        success: true,
        data: allCourses,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Course Data`,
        error: error.message,
      })
    }
}
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    // let totalDurationInSeconds = 0
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //     totalDurationInSeconds += timeDurationInSeconds
    //   })
    // })

    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        // totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}