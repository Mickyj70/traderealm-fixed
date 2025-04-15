/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  variant = "standard", // 'standard', 'premium', 'alliance', 'special'
  className = "",
  onClick,
}) => {
  // Card variants
  const variants = {
    standard: "bg-richBlack border border-turquoise/20",
    premium: "bg-deepViolet border border-lavender/20 shadow-glow-premium",
    alliance: "bg-royalBlue/10 border border-royalBlue/30",
    special:
      "bg-goldenYellow/10 border border-goldenYellow/30 shadow-glow-special",
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
    hover: {
      y: -5,
      boxShadow: "0 8px 15px rgba(26, 17, 53, 0.3)",
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      className={`
        rounded-xl p-6
        ${variants[variant]}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={onClick ? "hover" : ""}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
