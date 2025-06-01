import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// -----------------------------
// HERO COMPONENT
// -----------------------------

const Hero = () => {
    return (
      <section className="relative w-full min-h-screen mx-auto flex items-center">
        <div className={`max-w-7xl mx-auto ${styles.paddingX} flex flex-col gap-6`}>
          <div className='flex flex-row items-start gap-5'>
            <div className='flex flex-col justify-center items-center mt-5'>
              <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
              <div className='w-1 sm:h-80 h-40 violet-gradient' />
            </div>
  
            <div>
              <h1 className={`${styles.heroHeadText} text-white`}>
                Hi, I'm <span className='text-[#915EFF]'>Adrian</span>
              </h1>
              <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                I develop 3D visuals, user <br className='sm:block hidden' />
                interfaces and web applications
              </p>
          <br />
          <p className='text-secondary text-[17px] max-w-3xl leading-[30px]'>
            I'm a skilled software developer with experience in TypeScript and JavaScript, 
            and expertise in frameworks like React, Node.js, and Three.js. I'm a quick learner 
            and collaborate closely with clients to create efficient, scalable, and user-friendly 
            solutions that solve real-world problems. Let's work together to bring your ideas to life!
          </p>
        </div>
            </div>
          </div>
      </section>
    );
  };
  

// -----------------------------
// SERVICE CARD COMPONENT
// -----------------------------

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />
        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

// -----------------------------
// HOME COMPONENT (ABOUT SECTION + SERVICES)
// -----------------------------

const Home = () => {
  return (
    <>
      <Hero />
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Home, "home");
