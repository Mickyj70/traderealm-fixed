import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', 'tertiary', 'special'
  size = 'md', // 'sm', 'md', 'lg'
  fullWidth = false,
  disabled = false,
  onClick,
  className = ''
}) => {
  // Button variants
  const variants = {
    primary: 'bg-turquoise text-deepViolet hover:bg-opacity-90 shadow-glow',
    secondary: 'bg-royalBlue text-white hover:bg-opacity-90',
    tertiary: 'bg-richBlack text-white hover:bg-opacity-90',
    special: 'bg-goldenYellow text-deepViolet hover:bg-opacity-90 shadow-glow-special'
  };

  // Size variants
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: '0px 0px 12px rgba(79, 255, 176, 0.6)',
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.button
      className={`
        rounded-lg font-medium transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled ? "hover" : ""}
      whileTap={!disabled ? "tap" : ""}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button; 