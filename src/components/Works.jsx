import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion, useAnimation } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// Starry background component
const StarryBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars with different sizes and opacities */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1 + "px",
            height: Math.random() * 2 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            opacity: [null, 0.1, 0.8, 0.1],
            scale: [null, 1.2, 1, 1.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Nebula-like gradients */}
      <div
        className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] rounded-full opacity-[0.03] blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(145, 94, 255, 0.4) 0%, rgba(145, 94, 255, 0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-[40rem] h-[40rem] rounded-full opacity-[0.02] blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(120, 80, 255, 0.3) 0%, rgba(94, 234, 212, 0) 70%)",
        }}
      />

      {/* Animated cosmic dust */}
      <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-[0.04]">
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="url(#smallGrid)" />
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// Custom hook for mouse position
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_site_link,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Card animation controls
  const cardControls = useAnimation();
  const imageControls = useAnimation();
  const contentControls = useAnimation();
  
  useEffect(() => {
    // Run entrance animation once
    cardControls.start({
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20, 
        delay: index * 0.15 
      }
    });
  }, [cardControls, index]);
  
  useEffect(() => {
    // Update animations when hover state changes
    if (isHovered) {
      imageControls.start({ 
        scale: 1.12,
        filter: "brightness(1.1)",
        transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
      });
      contentControls.start({ 
        y: -5,
        transition: { duration: 0.4, ease: "easeOut" }
      });
    } else {
      imageControls.start({ 
        scale: 1,
        filter: "brightness(1)",
        transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] }
      });
      contentControls.start({ 
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
      });
    }
  }, [isHovered, imageControls, contentControls]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation values based on mouse position (max 12 degrees)
    const rotateY = (x / (rect.width / 2)) * 12; 
    const rotateX = -((y / (rect.height / 2)) * 12);
    
    // Set the relative mouse position for spotlight effect
    setMousePosition({ x, y });
    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={cardControls}
      whileHover={{ z: 20 }}
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        tiltReverse={false}
        glareEnable={true}
        glareMaxOpacity={0.25}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="20px"
        tiltAngleXManual={rotation.x}
        tiltAngleYManual={rotation.y}
        scale={1.05}
        transitionSpeed={1500}
        perspective={1000}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full shadow-card transition-all duration-500 group border border-slate-800/80 hover:border-[#915EFF]/70 cursor-pointer relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setRotation({ x: 0, y: 0 });
        }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(92, 50, 205, 0.35), 0 0 25px rgba(145, 94, 255, 0.15) inset"
            : "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
          transition: "box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Magic Sparkles - appears only on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 5 }}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.3)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  delay: Math.random() * 1,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3
                }}
              />
            ))}
          </div>
        )}
        
        {/* Background particle effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          {isHovered && [...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#915EFF]"
              initial={{ 
                x: mousePosition.x || 0, 
                y: mousePosition.y || 0,
                opacity: 0.8,
                scale: 0.2,
              }}
              animate={{ 
                x: mousePosition.x + (Math.random() * 120 - 60),
                y: mousePosition.y + (Math.random() * 120 - 60),
                opacity: 0,
                scale: 0,
              }}
              transition={{ 
                duration: Math.random() * 1.2 + 0.7, 
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Advanced glow effect with gradient and depth */}
        <motion.div 
          className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:blur-md bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-blue-500/20 -z-10"
          animate={isHovered ? { 
            opacity: 1,
            rotateZ: [0, 2, 0, -2, 0],
            scale: [0.98, 1.01, 0.98],
            transition: { duration: 5, repeat: Infinity }
          } : { opacity: 0 }}
          style={{ transform: "translateZ(-40px)" }}
        />
        
        {/* Dynamic spotlight based on mouse position */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute w-[250px] h-[250px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(145, 94, 255, 0.18) 0%, transparent 70%)",
                left: mousePosition.x + "px",
                top: mousePosition.y + "px",
                transform: "translate(-50%, -50%) translateZ(10px)",
              }}
            />
          </motion.div>
        )}
        
        {/* Multi-layered shine effect with staggered animations */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 overflow-hidden rounded-2xl" 
            style={{ zIndex: 1 }}
          >
            <motion.div
              className="absolute w-40 h-[300%] bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-[35deg]"
              animate={{ 
                left: ['-100%', '200%'],
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute w-20 h-[300%] bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-[35deg]"
              animate={{ 
                left: ['-100%', '200%'],
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.2,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
        
        {/* Project image container with 3D effect */}
        <div 
          className="relative w-full h-[230px] overflow-hidden rounded-xl" 
          style={{ transform: "translateZ(60px)" }}
        >
          {/* Image overlay gradient - dynamic opacity based on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"
            animate={{ opacity: isHovered ? 0.4 : 0.7 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Project image with hover zoom and better quality */}
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
            style={{ 
              objectFit: "cover",
              imageRendering: "high-quality",
            }}
            animate={imageControls}
            initial={{ scale: 1 }}
          />

          {/* Floating project number badge */}
          <motion.div 
            className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#915EFF]/30"
            style={{ transform: "translateZ(80px)" }}
            animate={isHovered ? {
              y: [0, -2, 0],
              boxShadow: "0 0 12px rgba(145, 94, 255, 0.4)",
              borderColor: "rgba(145, 94, 255, 0.6)",
            } : {
              boxShadow: "0 0 0 rgba(145, 94, 255, 0)",
              borderColor: "rgba(145, 94, 255, 0.3)",
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            <span className="text-[#915EFF] font-bold text-sm">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          </motion.div>

          {/* Project links - improved with staggered animations */}
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover z-20">
            {source_code_link && (
              <motion.div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer mr-2 backdrop-blur-sm border border-white/10"
                style={{ transform: "translateZ(80px)" }}
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(145, 94, 255, 0.5)",
                  borderColor: "#915EFF",
                }}
                animate={isHovered ? { 
                  y: [0, -5],
                  transition: { duration: 0.3, delay: 0.1 }
                } : { 
                  y: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </motion.div>
            )}
            {live_site_link && (
              <motion.div
                onClick={() => window.open(live_site_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer backdrop-blur-sm border border-white/10"
                style={{ transform: "translateZ(80px)" }}
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: "0 0 20px rgba(145, 94, 255, 0.5)",
                  borderColor: "#915EFF",
                }}
                animate={isHovered ? { 
                  y: [0, -5],
                  transition: { duration: 0.3, delay: 0.2 }
                } : { 
                  y: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-1/2 h-1/2 object-contain" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </motion.div>
            )}
          </div>
        </div>

        {/* Project title and description with 3D effect and hover animation */}
        <motion.div 
          className="mt-5 relative z-10"
          style={{ transform: "translateZ(50px)" }}
          animate={contentControls}
          initial={{ y: 0 }}
        >
          <motion.h3 
            className="text-white font-bold text-[24px] leading-tight"
            animate={isHovered ? { 
              color: "#915EFF",
              textShadow: "0 0 8px rgba(145, 94, 255, 0.3)",
            } : { 
              color: "#ffffff",
              textShadow: "none",
            }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>
          <motion.p 
            className="mt-2 text-secondary text-[14px] leading-relaxed min-h-[80px] backdrop-blur-[1px] rounded-md"
            animate={isHovered ? { opacity: 0.95 } : { opacity: 0.8 }}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Project tags with staggered animation */}
        <motion.div 
          className="mt-4 flex flex-wrap gap-2 relative z-10"
          style={{ transform: "translateZ(40px)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {tags.map((tag, tagIndex) => (
            <motion.span
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color} bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#915EFF]/10`}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(145, 94, 255, 0.2)",
                border: "1px solid rgba(145, 94, 255, 0.4)",
                y: -2,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
              }}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={isHovered ? { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { delay: 0.1 + (tagIndex * 0.05) }
              } : { 
                opacity: 1, 
                scale: 1, 
                y: 0 
              }}
            >
              #{tag.name}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Cosmic flare effect - only visible on hover */}
        {isHovered && (
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 opacity-30 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.3, 
              scale: 1,
              rotate: [0, 15],
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            style={{ zIndex: 1 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#915EFF" d="M38.5,-66.2C50.5,-58.9,61.2,-49.8,68.1,-38.1C75,-26.4,78.1,-12.2,79.3,3C80.5,18.2,79.8,35.4,71.5,47.5C63.3,59.5,47.3,66.4,31.9,73.2C16.4,79.9,1.4,86.5,-12.4,84.6C-26.3,82.7,-39.1,72.4,-50.8,61.6C-62.5,50.8,-73.2,39.4,-76.1,26.2C-79,12.9,-74.2,-2.3,-69.4,-16.5C-64.7,-30.7,-60,-44,-50.3,-52.2C-40.6,-60.4,-25.9,-63.4,-11.6,-68.8C2.8,-74.1,17.2,-82,28.9,-78.6C40.7,-75.3,49.8,-60.8,49.9,-46.3C50.1,-31.8,41.3,-17.2,42.3,-2.8L47.3,16.5L52.3,35.7" transform="translate(100 100)" />
            </svg>
          </motion.div>
        )}
        
        {/* Inner card edge highlight for 3D effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none border border-white/5"
          style={{ transform: "translateZ(70px)" }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        />
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const mousePosition = useMousePosition();
  const [showCursor, setShowCursor] = useState(false);
  
  useEffect(() => {
    // Wait a bit to ensure mouse has moved before showing custom cursor
    const timer = setTimeout(() => {
      setShowCursor(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden py-10">
      {/* Cosmic/Starry background */}
      <StarryBackground />
      
      {/* Custom cursor spotlight */}
      {showCursor && (
        <motion.div
          className="fixed w-96 h-96 rounded-full pointer-events-none z-0 opacity-20 hidden md:block"
          style={{
            background: "radial-gradient(circle, rgba(145, 94, 255, 0.4) 0%, rgba(0, 0, 0, 0) 70%)",
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      
      {/* Section header */}
      <motion.div 
        className="relative z-10"
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
      >
        <motion.p 
          className={`${styles.sectionSubText} inline-block relative`}
        >
          <span>My creative portfolio</span>
          <motion.span 
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#915EFF] to-transparent w-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.p>
        
        <motion.h2 
          className={`${styles.sectionHeadText} relative inline-block`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className="bg-gradient-to-r from-[#915EFF] via-[#BD78FF] to-[#F8ACFF] bg-clip-text text-transparent">
            Projects
          </span>
          
          {/* Decorative element */}
          <motion.div
            className="absolute -right-10 -top-5 w-16 h-16 opacity-60"
            initial={{ scale: 0, rotateZ: 0 }}
            animate={{ scale: 1, rotateZ: 15 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#915EFF" d="M44.5,-76.3C59.6,-69.1,74.7,-60.1,83.3,-46.4C91.9,-32.7,94,-14.3,91.2,2.8C88.3,19.9,80.5,35.6,69.8,48.5C59.1,61.3,45.4,71.3,30.6,75.5C15.8,79.7,-0.2,78.2,-15.2,73.7C-30.2,69.3,-44.2,62,-56.3,51C-68.4,40,-78.6,25.3,-80.9,9.2C-83.2,-6.9,-77.7,-24.5,-68.4,-38.7C-59.1,-52.9,-46,-63.7,-32.1,-71.3C-18.3,-78.9,-3.7,-83.3,9.3,-82.6C22.4,-81.9,29.5,-83.5,44.5,-76.3Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
        </motion.h2>
      </motion.div>

      {/* Description text */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] relative z-10 backdrop-blur-sm p-5 rounded-lg bg-black/10 border border-[#915EFF]/5"
          initial="hidden"
          whileInView="show"
        >
          <span className="text-[#BD78FF] font-medium">Transforming ideas into digital reality.</span> Following projects showcase my expertise in modern web development, 
          particularly in the restaurant industry. I've built payment systems, 
          reservation platforms, and admin interfaces that have significantly 
          improved business operations. My work demonstrates my ability to develop 
          full-stack solutions using React, Node.js, TypeScript, and other technologies.
          
          <motion.span
            className="block mt-4 italic text-slate-400 text-[15px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Click on the icons to view live sites and source code repositories.
          </motion.span>
        </motion.p>
      </div>

      {/* Animated separator */}
      <motion.div
        className="w-60 h-0.5 my-10 mx-auto relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#915EFF] to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            repeatDelay: 1
          }}
        />
      </motion.div>

      {/* Projects grid */}
      <motion.div 
        className="mt-10 flex flex-wrap justify-center gap-8 relative z-10"
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        initial="hidden"
        whileInView="show"
      >
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </motion.div>
      
      {/* Bottom decoration */}
      <motion.div
        className="w-full h-0.5 max-w-5xl mx-auto mt-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(to right, transparent, rgba(145, 94, 255, 0.3), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#915EFF] to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            repeatDelay: 2
          }}
        />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");
