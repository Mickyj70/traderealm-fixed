import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md", className = "" }) => {
  // Size variants
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  // Animation variants
  const spinnerVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const pixelVariants = {
    initial: { opacity: 0.3 },
    animate: (i) => ({
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`relative ${sizes[size]}`}
        variants={spinnerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Pixel dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-turquoise"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${
                i * 45
              }deg) translateY(-50%)`,
              transformOrigin: "0 0",
            }}
            custom={i}
            variants={pixelVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        {/* Center dot */}
        <div className="absolute w-1 h-1 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-turquoise" />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
