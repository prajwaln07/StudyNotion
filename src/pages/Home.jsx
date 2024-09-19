import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import HighLightText from '../components/core/HomePage/HighLightText'
import CTAButton from '../components/core/HomePage/Button'
const Home = () => {
  return (
    <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between " >

        {/* section 1 */}
        <div>
            <Link  to={"/signup"}>
<div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit gap-rounded-full">
    <div className="flex flex-row items-center gap-rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 gap-2 "> 
        <p>Become an Instructor</p>
       <FaArrowRightLong></FaArrowRightLong>
    </div>
</div>

            </Link>

            <div className="text-center tect-4xl font-semibold mt-6">
                Empower Your Future with 
                <HighLightText text={"Coding Skills"}></HighLightText>
            </div>

            <div className= "mt-4  mx-auto w-[80%] text-center text-lg font-bold text-richblack-300">
            lorem lorem lor lorem emlorem lorem lorem lorem lor lorem emlorem lorem lorem lorem lor lorem emlorem loremlorem lorem lor lorem emlorem lorem lorem lorem lor lorem emlorem lorem lorem lorem lor lorem emlorem lorem
    </div>

        </div>

        <div className="flex flex-row gap-7 mt-8 ">
<CTAButton active={true} linkto={"/signup"}  >Learn More</CTAButton>
<CTAButton active={false} linkto={"/login"} >Book a Demo</CTAButton>
        </div>
        
    </div>
  )
}

export default Home