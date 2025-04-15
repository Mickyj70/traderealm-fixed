import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';

const LockDurationSelector = () => {
  const [selectedDuration, setSelectedDuration] = useState(21);

  const durations = [
    { days: 21, multiplier: 1.5, penalty: 0.5 },
    { days: 42, multiplier: 2.0, penalty: 0.4 },
    { days: 63, multiplier: 2.5, penalty: 0.3 },
    { days: 84, multiplier: 3.0, penalty: 0.2 }
  ];

  // Animation variants
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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <Card>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-bold text-turquoise mb-4">
          Lock Duration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {durations.map((duration) => (
            <motion.button
              key={duration.days}
              className={`p-4 rounded-lg border transition-all ${
                selectedDuration === duration.days
                  ? 'bg-turquoise/10 border-turquoise text-turquoise'
                  : 'bg-deepViolet/50 border-lavender/20 text-lavender hover:border-turquoise/50'
              }`}
              onClick={() => setSelectedDuration(duration.days)}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">
                  {duration.days}
                </div>
                <div className="text-sm">days</div>
                <div className="mt-2 text-sm">
                  <span className="text-success">×{duration.multiplier}</span> multiplier
                </div>
                <div className="text-xs text-warning">
                  {duration.penalty * 100}% penalty
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-deepViolet/50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lavender">Selected Duration</span>
            <span className="text-white font-medium">
              {selectedDuration} days
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lavender">Power Multiplier</span>
            <span className="text-success font-medium">
              ×{durations.find(d => d.days === selectedDuration)?.multiplier}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lavender">Early Unlock Penalty</span>
            <span className="text-warning font-medium">
              {durations.find(d => d.days === selectedDuration)?.penalty * 100}%
            </span>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default LockDurationSelector; 