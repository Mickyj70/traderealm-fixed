import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedTradeMap = () => {
  // Animation variants for different elements
  const coinVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    }),
    hover: {
      y: -10,
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const rotateVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="relative w-full h-[400px] cartoon-shadow">
      {/* Background map with trade routes */}
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate="visible"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Map background */}
          <motion.rect
            x="10"
            y="10"
            width="380"
            height="380"
            rx="20"
            fill="#ffe7a0"
            stroke="#ffaa33"
            strokeWidth="4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Trade routes as animated paths */}
          <motion.path
            d="M50,200 C100,100 300,300 350,200"
            stroke="#ffaa33"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="0 1"
            variants={pathVariants}
          />
          <motion.path
            d="M50,150 C150,50 250,350 350,150"
            stroke="#ffaa33"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="0 1"
            variants={pathVariants}
          />
          <motion.path
            d="M200,50 C100,150 300,250 200,350"
            stroke="#ffaa33"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="0 1"
            variants={pathVariants}
          />
        </svg>
      </motion.div>

      {/* Floating trade cities/nodes */}
      <motion.div
        className="absolute top-[50px] left-[100px] z-10 w-16 h-16 bg-[#ffcc44] rounded-full flex items-center justify-center cartoon-shadow"
        variants={floatVariants}
        initial="initial"
        animate="animate"
      >
        <span className="text-2xl">🏰</span>
      </motion.div>

      <motion.div
        className="absolute top-[250px] left-[70px] z-10 w-14 h-14 bg-[#ffcc44] rounded-full flex items-center justify-center cartoon-shadow"
        variants={floatVariants}
        initial="initial"
        animate="animate"
        custom={1}
      >
        <span className="text-2xl">🏙️</span>
      </motion.div>

      <motion.div
        className="absolute top-[100px] right-[80px] z-10 w-16 h-16 bg-[#ffcc44] rounded-full flex items-center justify-center cartoon-shadow"
        variants={floatVariants}
        initial="initial"
        animate="animate"
        custom={0.5}
      >
        <span className="text-2xl">🏯</span>
      </motion.div>

      <motion.div
        className="absolute bottom-[80px] right-[100px] z-10 w-14 h-14 bg-[#ffcc44] rounded-full flex items-center justify-center cartoon-shadow"
        variants={floatVariants}
        initial="initial"
        animate="animate"
        custom={1.5}
      >
        <span className="text-2xl">🏛️</span>
      </motion.div>

      {/* Animated coins */}
      <motion.div
        className="absolute top-[150px] left-[200px] z-20"
        variants={rotateVariants}
        initial="initial"
        animate="animate"
      >
        <div className="relative w-24 h-24">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-12 h-12 bg-[#ffdd55] rounded-full flex items-center justify-center cartoon-shadow"
              style={{
                transform: `rotate(${i * 72}deg) translateX(40px)`,
              }}
              variants={coinVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              custom={i}
            >
              <span className="text-xl">💰</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Animated character */}
      <motion.div
        className="absolute bottom-[30px] left-[40%] z-30 w-20 h-20 bg-[#ffaa33] rounded-full flex items-center justify-center cartoon-shadow"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        <span className="text-3xl">👑</span>
      </motion.div>
    </div>
  );
};

export default AnimatedTradeMap;
