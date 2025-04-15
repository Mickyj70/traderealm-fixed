import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({
  title,
  value,
  change,
  icon,
  className = ''
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    })
  };

  const valueVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <motion.div
      className={`
        bg-richBlack rounded-lg p-4
        border border-turquoise/20
        ${className}
      `}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
          <motion.div
            className="text-2xl font-bold text-white"
            variants={valueVariants}
            initial="initial"
            animate="animate"
            key={value} // Force re-animation when value changes
          >
            {value}
          </motion.div>
        </div>
        
        {icon && (
          <div className="text-turquoise">
            {icon}
          </div>
        )}
      </div>

      {change && (
        <motion.div
          className={`
            mt-2 text-sm font-medium
            ${change.isPositive ? 'text-success' : 'text-error'}
          `}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {change.isPositive ? '↑' : '↓'} {change.value}%
        </motion.div>
      )}
    </motion.div>
  );
};

export default MetricCard; 