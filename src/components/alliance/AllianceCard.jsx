import React from 'react';
import { motion } from 'framer-motion';

const AllianceCard = ({ alliance, isSelected, onSelect }) => {
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
      onClick={() => onSelect(alliance)}
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
        {/* Alliance Name */}
        <h3 className="text-xl font-bold text-turquoise mb-2">
          {alliance.name}
        </h3>

        {/* Description */}
        <p className="text-lavender/80 mb-4">
          {alliance.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-lavender/60">Members</div>
            <div className="text-lg font-medium text-turquoise">
              {alliance.members.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-lavender/60">Routes</div>
            <div className="text-lg font-medium text-turquoise">
              {alliance.routes.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Requirements Preview */}
        <div className="space-y-2">
          <div className="text-sm text-lavender/60">Requirements</div>
          <div className="flex flex-wrap gap-2">
            {alliance.requirements.tokens.map((token, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-deepViolet/30 rounded-lg text-sm text-lavender"
              >
                {token.amount} {token.symbol}
              </div>
            ))}
            {alliance.requirements.nfts.map((nft, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-deepViolet/30 rounded-lg text-sm text-lavender"
              >
                {nft.name}
              </div>
            ))}
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

export default AllianceCard; 