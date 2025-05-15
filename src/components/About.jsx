import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion, useAnimation } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt 
    className='xs:w-[250px] w-full'
    options={{
      max: 45,
      scale: 1.1,
      speed: 450,
      glare: true,
      "max-glare": 0.5,
    }}
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      whileHover={{ 
        y: -15, 
        boxShadow: "0 25px 50px -12px rgba(145, 94, 255, 0.25)",
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }
      }}
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col relative overflow-hidden group'
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-700'
          style={{ transform: "translateZ(40px)" }}
        />

        <h3 className='text-white text-[20px] font-bold text-center' style={{ transform: "translateZ(30px)" }}>
          {title}
        </h3>
        
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </div>
    </motion.div>
  </Tilt>
);

const TypewriterText = ({ texts }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const text = texts[textIndex];
    
    const type = () => {
      setDisplayText(text.substring(0, index));
      
      if (!isDeleting && index === text.length) {
        // Delay before starting to delete
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      } else {
        const timeout = setTimeout(() => {
          setIndex(index + (isDeleting ? -1 : 1));
        }, isDeleting ? 50 : 100);
        
        return () => clearTimeout(timeout);
      }
    };
    
    type();
  }, [index, isDeleting, textIndex, texts]);
  
  return (
    <span className="text-[#915EFF] font-semibold inline-block min-h-[1.5em]">
      {displayText}<span className="animate-pulse">|</span>
    </span>
  );
};

const SkillBubble = ({ skill, delay, index, windowWidth }) => {
  // Fully responsive sizes based on screen width
  const getResponsiveValues = () => {
    if (windowWidth < 480) {
      // Extra small screens (phones)
      return {
        baseSize: 50,
        radius: 100,
        dragConstraints: 80
      };
    } else if (windowWidth < 640) {
      // Small screens
      return {
        baseSize: 60,
        radius: 110,
        dragConstraints: 100
      };
    } else if (windowWidth < 768) {
      // Medium screens
      return {
        baseSize: 70,
        radius: 130,
        dragConstraints: 120
      };
    } else if (windowWidth < 1024) {
      // Large screens
      return {
        baseSize: 85,
        radius: 160,
        dragConstraints: 140
      };
    } else {
      // Extra large screens
      return {
        baseSize: 100,
        radius: 180,
        dragConstraints: 150
      };
    }
  };

  const { baseSize, radius, dragConstraints } = getResponsiveValues();
  
  // Vary sizes slightly for visual interest
  const sizeVariation = (index % 5) * 5;
  const size = baseSize + sizeVariation;
  
  // Distribute bubbles evenly around the circle
  const angle = index * (360 / 14);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: Math.cos(angle * Math.PI / 180) * radius,
        y: Math.sin(angle * Math.PI / 180) * radius,
      }}
      transition={{ 
        duration: 1,
        delay: index * 0.1,
        type: "spring",
        stiffness: 50
      }}
      className="absolute flex items-center justify-center"
      style={{
        width: size, 
        height: size,
        borderRadius: '50%',
        backgroundColor: 'rgba(25, 25, 35, 0.8)',
        border: '1px solid rgba(145, 94, 255, 0.3)',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 0 15px rgba(145, 94, 255, 0.2)',
        zIndex: 5
      }}
      whileHover={{
        scale: 1.2,
        zIndex: 20,
        boxShadow: '0 0 30px rgba(145, 94, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(145, 94, 255, 0.6)',
      }}
      drag
      dragConstraints={{
        top: -dragConstraints,
        left: -dragConstraints,
        right: dragConstraints,
        bottom: dragConstraints,
      }}
      dragElastic={0.1}
    >
      <p className="text-white font-medium text-center pointer-events-none text-xs sm:text-sm md:text-base" 
         style={{ fontSize: windowWidth < 480 ? '0.7rem' : 'inherit' }}>
        {skill}
      </p>
    </motion.div>
  );
};

const TimelineItem = ({ year, title, description, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative pl-8 pb-10"
  >
    <div className={`absolute top-0 left-0 w-4 h-4 rounded-full ${color} z-10`} />
    <div className="absolute top-0 left-2 h-full w-0.5 bg-gray-700" />
    <motion.div 
      className="absolute top-4 left-2 h-0 w-0.5 bg-gradient-to-b from-[#915EFF] to-violet-300"
      initial={{ height: 0 }}
      whileInView={{ height: 'calc(100% - 16px)' }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    
    <div className={`text-sm ${color} mb-1 font-mono tracking-wider`}>{year}</div>
    <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm sm:text-base">{description}</p>
  </motion.div>
);

const About = () => {
  const [activeTab, setActiveTab] = useState("bio");
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount
  
  const techStack = [
    "JavaScript", "TypeScript", "React", "Node.js", "Express.js", 
    "MongoDB", "PostgreSQL", "Tailwind CSS", "Next.js", "Git", 
    "Stripe", "Sequelize", "Supabase", "Framer Motion"
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-gradient`}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
        <div className="mt-2 space-x-2 inline-flex items-center flex-wrap">
          <motion.div 
            className="bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-sm rounded-md text-white shadow-md cursor-default relative overflow-hidden mt-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10">BSc Software Engineering</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 opacity-0"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 glass-panel rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10 animate-gradient-slow" />
        
        <div className="flex mb-6 border-b border-gray-700 relative z-10 overflow-x-auto scrollbar-hide">
          {["bio", "skills", "education"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-3 sm:px-6 text-sm sm:text-base md:text-lg relative flex-shrink-0 ${
                activeTab === tab ? "text-[#915EFF]" : "text-gray-400"
              } hover:text-[#915EFF] transition-colors duration-200`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              
              {activeTab === tab && (
                <motion.div 
                  layoutId="tabIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#915EFF]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
        
        <div className="min-h-[250px] sm:min-h-[300px] md:min-h-[350px] relative z-10">
          {activeTab === "bio" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              <p className='text-secondary text-[15px] sm:text-[17px] leading-[28px] sm:leading-[30px] first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-bold first-letter:text-[#915EFF] first-letter:mr-1 first-letter:float-left'>
                I am a <TypewriterText texts={["passionate Full Stack Developer", "creative problem solver", "continuous learner"]} /> with a focus on Frontend Development, 
                skilled in building responsive, user-friendly web applications using <span className="text-white font-medium">React</span>, 
                <span className="text-white font-medium"> TypeScript</span>, and the <span className="text-white font-medium">MERN stack</span>.
              </p>
              
              <p className='text-secondary text-[15px] sm:text-[17px] leading-[28px] sm:leading-[30px]'>
                With hands-on experience in real-world projects for restaurant businesses, I have a proven track record of delivering high-quality 
                digital solutions that improve operational efficiency and user engagement. 
                I'm eager to contribute to dynamic teams and continue growing as a software engineer.
              </p>
              
              <motion.div 
                className="py-2 px-4 border-l-4 border-[#915EFF] bg-tertiary/50 rounded-r-md italic text-gray-300 text-sm sm:text-base"
                animate={{ 
                  boxShadow: ["0px 0px 0px rgba(145, 94, 255, 0)", "0px 0px 15px rgba(145, 94, 255, 0.2)", "0px 0px 0px rgba(145, 94, 255, 0)"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                "Code is like humor. When you have to explain it, it's bad." — Cory House
              </motion.div>
            </motion.div>
          )}
          
          {activeTab === "skills" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[280px] xs:h-[300px] sm:h-[350px] md:h-[400px] relative flex justify-center items-center"
            >
              <div className="absolute w-full h-full flex justify-center items-center">
                <motion.div 
                  className="w-[60px] h-[60px] xs:w-[70px] xs:h-[70px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] rounded-full bg-[#915EFF]/30 backdrop-blur-sm border border-[#915EFF]/50 flex items-center justify-center text-white z-20"
                  animate={{ 
                    boxShadow: ["0 0 20px rgba(145, 94, 255, 0.3)", "0 0 40px rgba(145, 94, 255, 0.6)", "0 0 20px rgba(145, 94, 255, 0.3)"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-bold text-xs xs:text-sm sm:text-base">Skills</span>
                </motion.div>
                
                {techStack.map((skill, index) => (
                  <SkillBubble 
                    key={skill} 
                    skill={skill} 
                    delay={index * 0.1} 
                    index={index}
                    windowWidth={windowSize.width}
                  />
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === "education" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-2 pt-2 sm:pt-4 overflow-y-auto max-h-[350px] sm:max-h-[400px] pr-2 custom-scrollbar"
            >
              <TimelineItem 
                year="2019 - 2023"
                title="BSc Software Engineering"
                description="University of Example • Focus on full-stack development, software architecture, and agile methodologies."
                color="text-[#915EFF]"
                delay={0.1}
              />
              
              <TimelineItem 
                year="2018"
                title="Web Development Bootcamp"
                description="Code Academy • Intensive training in modern web technologies and best practices."
                color="text-green-500"
                delay={0.3}
              />
              
              <TimelineItem 
                year="2017"
                title="UI/UX Design Fundamentals"
                description="Design Institute • Learned principles of user-centered design and interactive prototyping."
                color="text-blue-400"
                delay={0.5}
              />
            </motion.div>
          )}
        </div>
      </motion.div>

    </>
  );
};

// Add global styles for the glass effect
const customStyles = `
.glass-panel {
  background: rgba(15, 15, 20, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.text-gradient {
  background: linear-gradient(90deg, #915EFF, #FC6767);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.animate-gradient-slow {
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(15, 15, 20, 0.6);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(145, 94, 255, 0.5);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(145, 94, 255, 0.8);
}
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = customStyles;
  document.head.appendChild(styleSheet);
}

export default SectionWrapper(About, "about");
