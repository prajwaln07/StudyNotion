import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import HighLightText from '../components/core/HomePage/HighLightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from "../components/common/Footer"
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

    <div className="flex flex-row gap-7 mt-8 justify-center ">
<CTAButton active={true} linkto={"/signup"}  >Learn More</CTAButton>
<CTAButton active={false} linkto={"/login"} >Book a Demo</CTAButton>
        </div>


<div className="shadow-blue-200 mx-11 my-6">

<video muted loop autoPlay  >
<source src={Banner} type="video/mp4"></source>
</video>

</div>

<div>
            <CodeBlocks
            position={"lg:flex-row" }
            heading={
                <div className="text-4xl font-semibold">
                    Unlock Your <HighLightText text={"coding potential"}></HighLightText>
                    with our online courses
                </div>
            }
            subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding"
            }
            ctabtn1={
                {
                    btnText:"try it yourself",
                    linkto:"/signup",
                    active:true,
                }
            }
            ctabtn2={
                {
                    btnText:"Learn more",
                    linkto:"/login",
                    active:false,
                }
            }
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={"text-yellow-25"}

            ></CodeBlocks>

<CodeBlocks
            position={"lg:flex-row-reverse" }
            heading={
                <div className="text-4xl font-semibold">
                    Unlock Your <HighLightText text={"coding potential"}></HighLightText>
                    with our online courses
                </div>
            }
            subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding"
            }
            ctabtn1={
                {
                    btnText:"try it yourself",
                    linkto:"/signup",
                    active:true,
                }
            }
            ctabtn2={
                {
                    btnText:"Learn more",
                    linkto:"/login",
                    active:false,
                }
            }
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={"text-yellow-25"}
            
            ></CodeBlocks>
             

</div>

        </div>

     

 
        <Footer />
    </div>
  )
}

export default Home