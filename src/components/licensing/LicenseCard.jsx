import React from 'react';
import { motion } from 'framer-motion';

const LicenseCard = ({ license, isSelected, onSelect }) => {
  const cardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const selectedVariants = {
    initial: { scale: 1 },
    animate: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${
        isSelected ? 'z-10' : ''
      }`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={() => onSelect(license)}
    >
      {/* Card Background */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${
          isSelected ? 'bg-turquoise/20' : 'bg-deepViolet/50'
        }`}
        variants={selectedVariants}
        initial="initial"
        animate={isSelected ? "animate" : "initial"}
      />

      {/* Card Content */}
      <div className="relative p-6 rounded-xl border border-lavender/20">
        {/* License Name */}
        <h3 className="text-xl font-bold text-turquoise mb-2">
          {license.name}
        </h3>

        {/* Description */}
        <p className="text-lavender/80 mb-4">
          {license.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <div className="text-sm text-lavender/60">Price</div>
          <div className="text-lg font-medium text-turquoise">
            {license.price.toLocaleString()} BARON
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lavender/60">Discount</span>
            <span className="text-turquoise">
              {(license.discount * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lavender/60">ROI</span>
            <span className="text-turquoise">
              {(license.roi * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lavender/60">Vesting Period</span>
            <span className="text-turquoise">
              {license.vestingPeriod} days
            </span>
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            className="absolute top-2 right-2 w-3 h-3 rounded-full bg-turquoise"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default LicenseCard; 