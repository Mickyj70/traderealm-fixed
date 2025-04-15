import React from 'react';
import { motion } from 'framer-motion';

const VotingPowerCard = ({ votingPower }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'staking':
        return 'bg-turquoise';
      case 'holdings':
        return 'bg-lavender';
      case 'delegation':
        return 'bg-purple-500';
      default:
        return 'bg-deepViolet';
    }
  };

  return (
    <motion.div
      className="p-6 rounded-xl border border-lavender/20 bg-deepViolet/50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-turquoise mb-4">
        Voting Power
      </h3>

      {/* Total Voting Power */}
      <motion.div
        className="mb-6 p-4 rounded-lg bg-turquoise/10 border border-turquoise/20"
        variants={itemVariants}
      >
        <div className="text-sm text-lavender/60">Total Voting Power</div>
        <div className="text-2xl font-bold text-turquoise">
          {votingPower.total.toLocaleString()}
        </div>
      </motion.div>

      {/* Power Sources */}
      <div className="space-y-3">
        {Object.entries(votingPower.sources).map(([source, amount]) => (
          <motion.div
            key={source}
            className="flex items-center justify-between p-3 rounded-lg bg-deepViolet/30"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${getSourceColor(source)} mr-2`} />
              <span className="text-lavender capitalize">{source}</span>
            </div>
            <div className="text-right">
              <div className="text-turquoise">
                {amount.toLocaleString()}
              </div>
              <div className="text-sm text-lavender/60">
                {((amount / votingPower.total) * 100).toFixed(1)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Power Distribution Chart */}
      <div className="mt-6">
        <div className="h-2 rounded-full bg-deepViolet/50 overflow-hidden">
          {Object.entries(votingPower.sources).map(([source, amount]) => (
            <motion.div
              key={source}
              className={`h-full ${getSourceColor(source)}`}
              initial={{ width: 0 }}
              animate={{ 
                width: `${(amount / votingPower.total) * 100}%` 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 space-y-2">
        <motion.button
          className="w-full p-3 rounded-lg bg-turquoise/10 border border-turquoise/20 text-turquoise hover:bg-turquoise/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Delegate Power
        </motion.button>
        <motion.button
          className="w-full p-3 rounded-lg bg-lavender/10 border border-lavender/20 text-lavender hover:bg-lavender/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Delegators
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VotingPowerCard; 