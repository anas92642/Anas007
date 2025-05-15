import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";

// Responsive geometric background with conditional rendering
const GeometricBackground = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check screen size on component mount
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="techGrid"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#915EFF"
                strokeWidth="0.7"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGrid)" />
        </svg>
      </motion.div>

      {/* Dynamic abstract shapes - conditionally render fewer on small screens */}
      <motion.div
        className={`absolute ${
          isSmallScreen ? "top-5 right-5 w-40 h-40" : "top-10 right-20 w-96 h-96"
        } rounded-full`}
        style={{
          background:
            "radial-gradient(circle, rgba(145, 94, 255, 0.15) 0%, rgba(145, 94, 255, 0) 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute ${
          isSmallScreen
            ? "-bottom-10 -left-10 w-[15rem] h-[15rem]"
            : "-bottom-20 -left-20 w-[30rem] h-[30rem]"
        } rounded-full blur-3xl`}
        style={{
          background:
            "radial-gradient(circle, rgba(110, 68, 255, 0.1) 0%, rgba(110, 68, 255, 0) 60%)",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.15, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />

      {/* Floating particles - render fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isSmallScreen ? 8 : 20)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 rounded-full bg-purple-400"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [null, `-${Math.random() * 200 + 100}px`],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              ease: "linear",
              repeat: Infinity,
              delay: Math.random() * 20,
            }}
          />
        ))}
      </div>

      {/* Conditional light rays for larger screens */}
      {!isSmallScreen && (
        <>
          <motion.div
            className="absolute top-1/3 left-0 w-[120%] h-0.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
            animate={{
              opacity: [0, 0.5, 0],
              rotateZ: [0, 1, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-2/3 right-0 w-[100%] h-0.5 bg-gradient-to-l from-transparent via-indigo-500/20 to-transparent"
            animate={{
              opacity: [0, 0.4, 0],
              rotateZ: [0, -0.5, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  );
};

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Header animations
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  // Tech ball grid animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const techItemVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 30,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <div
      className="relative py-10 md:py-16 min-h-[80vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
      ref={ref}
    >
      {/* Enhanced Decorative background */}
      <GeometricBackground />

      {/* Cosmic accent decorations - hide on mobile */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-10 w-28 h-28 opacity-20">
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(186, 104, 200, 0.4) 0%, rgba(186, 104, 200, 0) 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="absolute bottom-1/4 right-10 w-20 h-20 opacity-20">
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(138, 85, 255, 0.4) 0%, rgba(138, 85, 255, 0) 70%)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </>
      )}

      {/* Header Content */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 text-center px-4 md:px-0"
      >
        <motion.div className="mb-2" variants={childVariants}>
          <motion.span
            className={`${styles.sectionSubText} relative inline-block`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="relative z-10">My Technical Arsenal</span>

            {/* Decorative element */}
            <motion.span
              className="absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#915EFF] to-transparent w-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />

            {/* Subtle glow */}
            <motion.span
              className="absolute inset-0 bg-[#915EFF]/5 rounded-lg blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </motion.span>
        </motion.div>

        <div className="relative overflow-visible">
          <motion.h2
            className={`${styles.sectionHeadText} inline-block relative`}
            variants={childVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-[#915EFF] via-[#BD78FF] to-[#F8ACFF] bg-clip-text text-transparent pb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Technologies & Tools
            </motion.span>
          </motion.h2>

          {/* Orbit decoration - hide on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute -right-16 -top-16 opacity-70 pointer-events-none hidden md:block"
              initial={{ scale: 0, rotateZ: 0, opacity: 0 }}
              animate={{
                scale: 1,
                rotateZ: 360,
                opacity: 0.7,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  duration: 0.8,
                  delay: 0.6,
                },
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#915EFF"
                  d="M40.8,-68.7C54.3,-62.8,67.7,-54.3,76.4,-42.1C85.2,-29.9,89.1,-14.9,86.8,-1.3C84.5,12.3,75.9,24.6,67.1,35.9C58.3,47.1,49.3,57.4,38.1,64.4C26.9,71.5,13.4,75.3,-0.2,75.6C-13.8,75.9,-27.5,72.6,-39.9,66.1C-52.2,59.6,-63.1,49.9,-69.3,37.7C-75.5,25.5,-77.1,10.9,-76.7,-3.6C-76.3,-18.1,-74.1,-32.7,-66.9,-44.6C-59.8,-56.5,-47.8,-65.7,-34.8,-71.8C-21.8,-77.9,-8.7,-80.9,3.4,-86.6C15.5,-92.3,31,-91.5,40.8,-83.1C50.6,-74.6,54.6,-58.3,40.8,-68.7Z"
                  transform="translate(100 100) scale(0.5)"
                />
              </svg>

              {/* Small rotating dots around orbit */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-purple-400 top-1/4 left-0"
                animate={{
                  rotate: [0, 360],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 2, repeat: Infinity, repeatType: "mirror" },
                }}
              />

              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-indigo-300 bottom-1/4 right-1/4"
                animate={{
                  rotate: [0, -360],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror" },
                }}
              />
            </motion.div>
          )}

          {/* Left decoration - hide on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute -left-12 bottom-0 opacity-60 pointer-events-none hidden md:block"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.9 }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#6E44FF"
                  d="M47.7,-73.2C62.1,-66.3,74.5,-54.6,79.1,-40.5C83.7,-26.5,80.5,-10.1,76.5,4.6C72.6,19.3,67.9,32.3,59.8,43.9C51.7,55.4,40,65.4,26.9,69.7C13.8,74,0.3,72.5,-14.3,70.5C-28.9,68.5,-44.5,66,-55.3,57.2C-66.1,48.4,-72,33.4,-76.5,17.8C-81,2.3,-84.1,-13.9,-79.1,-27.1C-74,-40.2,-60.8,-50.4,-46.8,-57.3C-32.8,-64.2,-17.7,-67.8,-1.3,-65.8C15,-63.9,33.3,-56.6,47.7,-47.4C62.1,-38.3,74.5,-27.3,74.5,-16.2L74.4,-16.1C74.4,-5,62.1,6.2,47.7,-73.2Z"
                  transform="translate(100 100) scale(0.3)"
                />
              </svg>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Beautiful divider */}
      <motion.div
        className="w-60 md:w-80 h-0.5 my-8 md:my-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
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
            repeatDelay: 1,
          }}
        />
      </motion.div>

      {/* Technologies grid with responsive spacing */}
      <motion.div
        className="flex flex-row flex-wrap justify-center gap-5 md:gap-12 max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {technologies.map((technology, index) => (
          <motion.div
            className="w-20 h-20 md:w-28 md:h-28 relative group"
            key={technology.name}
            variants={techItemVariants}
            custom={index}
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.4, type: "spring", stiffness: 300 },
            }}
            onMouseEnter={() => !isMobile && setHoveredTech(technology.name)}
            onMouseLeave={() => !isMobile && setHoveredTech(null)}
            // Add touch events for mobile
            onTouchStart={() => isMobile && setHoveredTech(technology.name)}
            onTouchEnd={() => isMobile && setTimeout(() => setHoveredTech(null), 1500)}
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#915EFF]/30 to-[#BD78FF]/20 opacity-0 group-hover:opacity-100 blur-xl -z-10"
              initial={{ scale: 0.8 }}
              animate={{
                scale: hoveredTech === technology.name ? [0.8, 1.2, 0.9] : 0.8,
                opacity: hoveredTech === technology.name ? [0.5, 0.8, 0.5] : 0,
              }}
              transition={{
                duration: 2,
                repeat: hoveredTech === technology.name ? Infinity : 0,
                repeatType: "reverse",
              }}
            />

            {/* Orbital ring animation - conditionally render based on device */}
            {(!isMobile || hoveredTech === technology.name) && (
              <motion.div
                className="absolute inset-0 rounded-full border border-purple-500/30 opacity-0 group-hover:opacity-100"
                animate={{
                  rotateZ: [0, 360],
                  scale: hoveredTech === technology.name ? [0.7, 1.1, 0.7] : 0.7,
                }}
                transition={{
                  rotateZ: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                }}
              />
            )}

            {/* Tech icon */}
            <motion.div
              className="relative z-10 w-full h-full cursor-pointer"
              initial={{ rotate: 0 }}
              animate={
                hoveredTech === technology.name
                  ? {
                      rotate: [0, -5, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
              transition={{ duration: 1.5 }}
            >
              <BallCanvas icon={technology.icon} />
            </motion.div>

            {/* Tech name with dramatic reveal - adjust positioning for mobile */}
            <motion.div
              className="absolute -bottom-8 md:-bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 md:py-1.5 rounded-full backdrop-blur-md bg-[#1d1836]/80 border border-[#915EFF]/30 text-white text-xs md:text-sm font-medium whitespace-nowrap z-20 overflow-hidden"
              initial={{ opacity: 0, y: 5, width: "10px" }}
              animate={
                hoveredTech === technology.name
                  ? {
                      opacity: 1,
                      y: 0,
                      width: "auto",
                      transition: { duration: 0.3 },
                    }
                  : {
                      opacity: 0,
                      y: 5,
                      width: "10px",
                      transition: { duration: 0.2 },
                    }
              }
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={
                  hoveredTech === technology.name ? { opacity: 1 } : { opacity: 0 }
                }
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {technology.name}
              </motion.span>
            </motion.div>

            {/* Sparkle effects - fewer on mobile */}
            {hoveredTech === technology.name &&
              [...Array(isMobile ? 1 : 3)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full z-10"
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() * 60 - 30)}%`,
                    y: `${50 + (Math.random() * 60 - 30)}%`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.6 + Math.random() * 0.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                  }}
                />
              ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Cosmic connections - hide on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <svg width="100%" height="100%" className="absolute top-0 left-0">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(145, 94, 255, 0)" />
                <stop offset="50%" stopColor="rgba(145, 94, 255, 0.5)" />
                <stop offset="100%" stopColor="rgba(145, 94, 255, 0)" />
              </linearGradient>
            </defs>

            {/* Cosmic connection lines */}
            {[...Array(8)].map((_, index) => {
              const startX = Math.random() * 100;
              const startY = Math.random() * 100;
              const endX = Math.random() * 100;
              const endY = Math.random() * 100;

              return (
                <motion.path
                  key={`line-${index}`}
                  d={`M ${startX} ${startY} Q ${
                    (startX + endX) / 2 + (Math.random() * 20 - 10)
                  } ${Math.random() * 100}, ${endX} ${endY}`}
                  stroke="url(#lineGradient)"
                  strokeWidth="0.3"
                  fill="transparent"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 5 + Math.random() * 7,
                    delay: index * 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: Math.random() * 5,
                  }}
                />
              );
            })}
          </svg>
        </motion.div>
      )}

      {/* Bottom flourish - simplified on mobile */}
      <motion.div
        className={`w-full max-w-[90%] md:max-w-3xl mx-auto h-[1px] mt-10 md:mt-20 relative overflow-hidden`}
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(145, 94, 255, 0.2), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#915EFF] to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            repeatDelay: 2,
          }}
        />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
