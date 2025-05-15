import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useTransform, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// SVG patterns for artistic elements
const PatternBackground = () => (
  <div className="absolute inset-0 opacity-5 z-0 overflow-hidden">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circlePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#915EFF" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circlePattern)" />
    </svg>
  </div>
);

const ExperienceCard = ({ experience, index, position = 'left' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  // Generate unique gradient IDs for each card
  const gradientId = `cardGradient-${index}`;
  const highlightId = `highlightGradient-${index}`;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: position === 'left' ? -40 : 40,
      y: 20,
      rotateY: position === 'left' ? 8 : -8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className={`relative ${position === 'right' ? 'md:pl-4' : 'md:pr-4'}`}
      style={{
        perspective: "1000px"
      }}
    >
      {/* Custom SVG Filter for neon glow effect */}
      <svg width="0" height="0" className="absolute">
        <filter id={`neonGlow-${index}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#915EFF" floodOpacity="0.7" />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(41, 20, 93, 0.9)" />
          <stop offset="100%" stopColor="rgba(29, 24, 54, 0.95)" />
        </linearGradient>
        
        <linearGradient id={highlightId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#915EFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7A49D8" stopOpacity="0.3" />
        </linearGradient>
      </svg>

      <div 
        className={`group rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1d1836]/80 border border-[#915EFF]/20 p-6 hover:border-[#915EFF]/40 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_10px_40px_-15px_rgba(145,94,255,0.3)]`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered 
            ? "0 10px 30px -15px rgba(145, 94, 255, 0.4), 0 0 15px rgba(145, 94, 255, 0.06) inset" 
            : "0 8px 30px -15px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Animated background elements */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#915EFF]/20 to-[#7A49D8]/20 blur-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <path d="M0 0L80 0L80 80C36 80 0 44 0 0Z" fill="url(#cornerGradient)"/>
            <defs>
              <linearGradient id="cornerGradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#915EFF"/>
                <stop offset="1" stopColor="#7A49D8" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="relative overflow-hidden z-10">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#915EFF] opacity-5 rounded-full blur-[60px] -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#6E44FF] opacity-5 rounded-full blur-[40px] -ml-10 -mb-5" />
          
          <motion.h3 
            className="text-white text-[22px] sm:text-[26px] font-bold flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative hover:text-[#915EFF] transition-colors duration-300">
              {experience.title}
              <motion.div 
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#915EFF] to-transparent" 
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.h3>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="text-gray-200 text-[16px] font-medium flex items-center gap-2 flex-wrap">
              <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                {experience.company_name}
              </span>
              
              {experience.type && (
                <span className={`text-xs px-3 py-1 rounded-full ${
                  experience.type === "work" 
                    ? "bg-emerald-900/30 text-emerald-300 border border-emerald-700/30" 
                    : "bg-blue-900/30 text-blue-300 border border-blue-700/30"
                }`}>
                  {experience.type === "work" ? "WORK" : "EDUCATION"}
                </span>
              )}
            </div>
          </motion.div>

          {experience.location && (
            <motion.div 
              className="text-gray-400 text-[14px] mt-2 flex items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <svg className="h-4 w-4 mr-1 text-[#915EFF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {experience.location}
            </motion.div>
          )}
          
          {/* Job Responsibilities */}
          <motion.div 
            className="mt-4 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div 
              className="w-full h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(145, 94, 255, 0.3), transparent)"
              }}
              animate={{
                opacity: isHovered ? 1 : 0.7,
                background: isHovered 
                  ? "linear-gradient(90deg, transparent, rgba(145, 94, 255, 0.5), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(145, 94, 255, 0.3), transparent)"
              }}
              transition={{ duration: 0.4 }}
            />
            
            <ul className="mt-3 space-y-2 list-none ml-1">
              {experience.points.slice(0, 2).map((point, idx) => (
                <motion.li
                  key={`experience-point-${idx}`}
                  className="text-gray-300 text-[14px] pl-1 tracking-wide flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
                >
                  <span className="inline-block mr-3 mt-1 text-[#915EFF]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
            
            {experience.skills && (
              <motion.div 
                className="mt-4 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                {experience.skills.slice(0, 3).map((skill, idx) => (
                  <motion.span 
                    key={idx} 
                    className="px-2.5 py-0.5 text-xs rounded-full text-white transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#915EFF]/10 hover:translate-y-[-2px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.05, duration: 0.3 }}
                    style={{ 
                      background: `linear-gradient(135deg, rgba(42, 33, 69, 0.9), rgba(53, 42, 82, 0.8))`,
                      borderLeft: "1px solid rgba(145, 94, 255, 0.3)",
                      borderTop: "1px solid rgba(145, 94, 255, 0.2)"
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
                {experience.skills.length > 3 && (
                  <motion.span 
                    className="px-2 py-0.5 text-xs rounded-full text-gray-300 bg-gray-800/50 hover:bg-gray-800/80 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.75 }}
                  >
                    +{experience.skills.length - 3}
                  </motion.span>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineDot = ({ isAnimating = false }) => (
  <div className="relative">
    <div className="absolute -inset-1 rounded-full opacity-30 bg-[#915EFF] blur-sm" />
    <div className="relative z-10 w-5 h-5 bg-[#915EFF] rounded-full shadow-lg shadow-purple-500/30">
      {isAnimating && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-[#915EFF]"
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}
    </div>
  </div>
);

const Experience = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ["start end", "end start"] 
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <div ref={sectionRef} className="relative py-10">
      {/* Artistic background elements */}
      <PatternBackground />
      
      <motion.div 
        className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full"
        style={{ 
          background: "radial-gradient(circle, rgba(145,94,255,0.1) 0%, rgba(145,94,255,0) 70%)",
          y,
          opacity
        }}
      />

      <motion.div 
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full"
        style={{ 
          background: "radial-gradient(circle, rgba(110,68,255,0.1) 0%, rgba(110,68,255,0) 70%)",
          y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          opacity
        }}
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="relative z-10"
      >
        <motion.p 
          className={`${styles.sectionSubText} text-center`}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
        >
          My Professional Journey
        </motion.p>
        
        <motion.h2 
          className={`${styles.sectionHeadText} text-center mb-16 relative inline-block`}
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.7, delay: 0.1 }
            }
          }}
        >
          <span className="relative z-10 bg-gradient-to-r from-[#915EFF] via-[#A87CFF] to-[#BA84FF] bg-clip-text text-transparent">
            Work Experience & Education
          </span>
          
          {/* Decorative underline */}
          <motion.div 
            className="absolute -bottom-2 left-0 h-1 w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ 
              background: "linear-gradient(90deg, transparent, rgba(145, 94, 255, 0.8), transparent)",
              transformOrigin: "left"
            }}
          />
          
          {/* Decorative sparkling elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 opacity-70">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#915EFF" d="M40.8,-68.7C54.3,-62.8,67.7,-54.3,76.4,-42.1C85.2,-29.9,89.1,-14.9,86.8,-1.3C84.5,12.3,75.9,24.6,67.1,35.9C58.3,47.1,49.3,57.4,38.1,64.4C26.9,71.5,13.4,75.3,-0.2,75.6C-13.8,75.9,-27.5,72.6,-39.9,66.1C-52.2,59.6,-63.1,49.9,-69.3,37.7C-75.5,25.5,-77.1,10.9,-76.7,-3.6C-76.3,-18.1,-74.1,-32.7,-66.9,-44.6C-59.8,-56.5,-47.8,-65.7,-34.8,-71.8C-21.8,-77.9,-8.7,-80.9,3.4,-86.6C15.5,-92.3,31,-91.5,40.8,-83.1C50.6,-74.6,54.6,-58.3,40.8,-68.7Z" transform="translate(100 100) scale(0.4)" />
            </svg>
          </div>
          
          <div className="absolute -bottom-8 -left-4 w-8 h-8 opacity-70">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#6E44FF" d="M47.7,-73.2C62.1,-66.3,74.5,-54.6,79.1,-40.5C83.7,-26.5,80.5,-10.1,76.5,4.6C72.6,19.3,67.9,32.3,59.8,43.9C51.7,55.4,40,65.4,26.9,69.7C13.8,74,0.3,72.5,-14.3,70.5C-28.9,68.5,-44.5,66,-55.3,57.2C-66.1,48.4,-72,33.4,-76.5,17.8C-81,2.3,-84.1,-13.9,-79.1,-27.1C-74,-40.2,-60.8,-50.4,-46.8,-57.3C-32.8,-64.2,-17.7,-67.8,-1.3,-65.8C15,-63.9,33.3,-56.6,47.7,-47.4C62.1,-38.3,74.5,-27.3,74.5,-16.2L74.4,-16.1C74.4,-5,62.1,6.2,47.7,-73.2Z" transform="translate(100 100) scale(0.3)" />
            </svg>
          </div>
        </motion.h2>
        
        <div className="relative mt-20">
          {/* Center timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 hidden md:block">
            <div className="w-0.5 h-full bg-gradient-to-b from-[#915EFF] via-[#915EFF]/30 to-transparent" />
            
            {/* Animated particle moving down the line */}
            <motion.div 
              className="absolute w-2 h-2 bg-[#915EFF] rounded-full left-1/2 transform -translate-x-1/2 z-20 shadow-[0_0_8px_2px_rgba(145,94,255,0.6)]"
              initial={{ top: "0%" }}
              animate={{ 
                top: ["0%", "98%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 8, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </div>
          
          <div className="space-y-24">
            {experiences.map((experience, index) => (
              <div key={`experience-${index}`} className="relative">
                {/* Center dot with animation */}
                <div className="absolute left-1/2 top-16 transform -translate-x-1/2 z-10 hidden md:block">
                  <TimelineDot isAnimating={index === 0} />
                </div>
                
                {/* Date badge for mobile (centered) - with enhanced animations */}
                <div className="md:hidden flex justify-center mb-4">
                  <motion.div 
                    className="relative group overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Pulsing background effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, rgba(145, 94, 255, 0.4), rgba(145, 94, 255, 0.1))"
                      }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.6, 0.8, 0.6]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                    
                    {/* Primary background */}
                    <div className="absolute inset-0 rounded-full opacity-90"
                      style={{
                        background: "linear-gradient(135deg, rgba(42, 28, 84, 0.9), rgba(75, 53, 128, 0.8))",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.15)"
                      }}
                    />
                    
                    {/* Shine effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40"
                      style={{ 
                        background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
                        backgroundSize: "200% 200%"
                      }}
                      animate={{ 
                        backgroundPosition: ["0% 0%", "100% 100%"]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                    
                    {/* Date text */}
                    <div className="relative z-10 px-4 py-2 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          rotateY: [0, 3, 0, -3, 0],
                          rotateZ: [0, 0.5, 0, -0.5, 0]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut"
                        }}
                      >
                        <span className="font-semibold text-sm tracking-wide whitespace-nowrap">
                          <span className="bg-gradient-to-r from-[#FFFFFF] via-[#E0CDFF] to-[#FFFFFF] bg-clip-text text-transparent">
                            {experience.date}
                          </span>
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Subtle sparkling effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`sparkle-mobile-${i}`}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          initial={{ 
                            x: Math.random() * 100 + "%", 
                            y: Math.random() * 100 + "%", 
                            opacity: 0,
                            scale: 0
                          }}
                          animate={{ 
                            opacity: [0, 1, 0], 
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.8,
                            repeatDelay: Math.random() * 3
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <div className={`flex flex-col md:flex-row items-center md:items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Card content */}
                  <div className="w-full md:w-[50%] px-4">
                    <ExperienceCard
                      experience={experience}
                      index={index}
                      position={index % 2 === 0 ? 'left' : 'right'}
                    />
                  </div>
                  
                  {/* Date badge for desktop - with enhanced animations */}
                  <div className="hidden md:block w-[50%] px-4 relative">
                    <motion.div 
                      className={`absolute top-16 ${index % 2 === 0 ? 'right-4' : 'left-4'}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20, y: -5 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                      whileHover={{ 
                        scale: 1.08,
                        y: -2,
                        transition: { duration: 0.3, type: "spring", stiffness: 300 }
                      }}
                    >
                      <div className="relative group overflow-hidden cursor-pointer">
                        {/* Pulsing background effect */}
                        <motion.div 
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "linear-gradient(135deg, rgba(145, 94, 255, 0.4), rgba(145, 94, 255, 0.1))"
                          }}
                          animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.6, 0.8, 0.6]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            repeatType: "mirror"
                          }}
                        />
                        
                        {/* Primary background */}
                        <div className="absolute inset-0 rounded-full opacity-90"
                          style={{
                            background: "linear-gradient(135deg, rgba(42, 28, 84, 0.9), rgba(75, 53, 128, 0.8))",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.15)"
                          }}
                        />
                        
                        {/* Shine effect */}
                        <motion.div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40"
                          style={{ 
                            background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
                            backgroundSize: "200% 200%"
                          }}
                          animate={{ 
                            backgroundPosition: ["0% 0%", "100% 100%"]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror"
                          }}
                        />
                        
                        {/* Date text */}
                        <div className="relative z-10 px-4 py-2 flex items-center justify-center">
                          <motion.div
                            animate={{ 
                              rotateY: [0, 5, 0, -5, 0],
                              rotateZ: [0, 1, 0, -1, 0]
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                              repeatType: "mirror",
                              ease: "easeInOut"
                            }}
                          >
                            <span className="font-semibold text-sm tracking-wide whitespace-nowrap">
                              <span className="bg-gradient-to-r from-[#FFFFFF] via-[#E0CDFF] to-[#FFFFFF] bg-clip-text text-transparent">
                                {experience.date}
                              </span>
                            </span>
                          </motion.div>
                          
                          {/* Small decorative icon */}
                          <motion.div 
                            className="absolute -right-1 -top-1 w-5 h-5 flex items-center justify-center"
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                                fill="url(#starGradient)" stroke="#915EFF" strokeWidth="0.5"/>
                              <defs>
                                <linearGradient id="starGradient" x1="2" y1="2" x2="22" y2="21.02" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#FFFFFF" />
                                  <stop offset="1" stopColor="#915EFF" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </motion.div>
                        </div>
                        
                        {/* Connecting line to center timeline with animated particle */}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                          index % 2 === 0 ? 'left-0 translate-x-[-8px]' : 'right-0 translate-x-[8px]'
                        } h-[2px] w-12 bg-gradient-to-${index % 2 === 0 ? 'l' : 'r'} from-[#915EFF]/70 to-transparent`} />
                        
                        <motion.div 
                          className="absolute top-1/2 transform -translate-y-1/2 rounded-full w-2 h-2 bg-white shadow-[0_0_5px_2px_rgba(145,94,255,0.5)]"
                          initial={{ 
                            x: index % 2 === 0 ? 0 : 0
                          }}
                          animate={{ 
                            x: index % 2 === 0 ? [-10, 4] : [10, -4],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            times: [0, 0.5, 1]
                          }}
                        />
                        
                        {/* Subtle sparkling effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-full">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={`sparkle-${i}`}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              initial={{ 
                                x: Math.random() * 100 + "%", 
                                y: Math.random() * 100 + "%", 
                                opacity: 0,
                                scale: 0
                              }}
                              animate={{ 
                                opacity: [0, 1, 0], 
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.8,
                                repeatDelay: Math.random() * 3
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center relative px-7 py-3 overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button background with animated gradient */}
            <motion.span 
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(45deg, #915EFF, #7A49D8, #6E44FF, #915EFF)",
                backgroundSize: "400% 400%",
                boxShadow: "0 6px 20px rgba(145, 94, 255, 0.3)"
              }}
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"]
              }}
              transition={{ 
                duration: 3, 
                ease: "linear", 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            
            {/* Button content with icon */}
            <span className="relative z-10 flex items-center text-white font-medium">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10V16M12 16L9 13M12 16L15 13M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Full Resume
              
              {/* Circular shine animation */}
              <motion.span 
                className="absolute inset-0 rounded-full bg-white opacity-20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
