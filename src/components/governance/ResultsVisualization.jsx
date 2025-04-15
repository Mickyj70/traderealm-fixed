import React from 'react';
import { motion } from 'framer-motion';

const ResultsVisualization = ({ results }) => {
  const totalVotes = Object.values(results).reduce((sum, value) => sum + value, 0);
  const percentages = Object.entries(results).map(([option, value]) => ({
    option,
    value,
    percentage: (value / totalVotes) * 100
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getOptionColor = (option) => {
    switch (option) {
      case 'yes':
        return 'bg-turquoise';
      case 'no':
        return 'bg-lavender';
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
        Voting Results
      </h3>

      {/* Results Bar */}
      <div className="h-4 rounded-full bg-deepViolet/50 overflow-hidden mb-6">
        {percentages.map(({ option, percentage }) => (
          <motion.div
            key={option}
            className={`h-full ${getOptionColor(option)}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Results Breakdown */}
      <div className="space-y-4">
        {percentages.map(({ option, value, percentage }) => (
          <motion.div
            key={option}
            className="flex items-center justify-between p-3 rounded-lg bg-deepViolet/30"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${getOptionColor(option)} mr-2`} />
              <span className="text-lavender capitalize">{option}</span>
            </div>
            <div className="text-right">
              <div className="text-turquoise">
                {value.toLocaleString()} votes
              </div>
              <div className="text-sm text-lavender/60">
                {percentage.toFixed(1)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total Votes */}
      <motion.div
        className="mt-6 p-4 rounded-lg bg-turquoise/10 border border-turquoise/20"
        variants={itemVariants}
      >
        <div className="text-sm text-lavender/60">Total Votes</div>
        <div className="text-2xl font-bold text-turquoise">
          {totalVotes.toLocaleString()}
        </div>
      </motion.div>

      {/* Quorum Status */}
      <motion.div
        className="mt-4 p-4 rounded-lg bg-deepViolet/30"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between">
          <span className="text-lavender">Quorum Status</span>
          <span className="text-turquoise">Achieved</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-deepViolet/50 overflow-hidden">
          <motion.div
            className="h-full bg-turquoise"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsVisualization; 