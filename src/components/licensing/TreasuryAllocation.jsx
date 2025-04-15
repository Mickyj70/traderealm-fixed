import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TreasuryAllocation = ({ license, inputAmount }) => {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    if (inputAmount && !isNaN(inputAmount)) {
      const amount = parseFloat(inputAmount);
      const totalOutput = amount * (1 + license.discount);
      
      // Calculate allocations based on license type
      const data = [
        {
          name: 'Treasury',
          percentage: license.treasuryAllocation,
          color: 'bg-turquoise'
        },
        {
          name: 'Liquidity',
          percentage: 0.3,
          color: 'bg-lavender'
        },
        {
          name: 'Staking Rewards',
          percentage: 0.2,
          color: 'bg-purple-500'
        },
        {
          name: 'Development',
          percentage: 1 - license.treasuryAllocation - 0.5,
          color: 'bg-deepViolet'
        }
      ];

      setAllocations(data);
    } else {
      setAllocations([]);
    }
  }, [inputAmount, license.treasuryAllocation]);

  const calculatePieSegment = (percentage, startAngle) => {
    const angle = percentage * 360;
    const endAngle = startAngle + angle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

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

  return (
    <motion.div
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-turquoise mb-4">
        Treasury Allocation
      </h3>

      {/* Pie Chart */}
      <div className="relative w-full aspect-square max-w-xs mx-auto mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {allocations.map((allocation, index) => {
            const startAngle = allocations
              .slice(0, index)
              .reduce((sum, a) => sum + a.percentage * 360, 0);
            
            return (
              <motion.path
                key={allocation.name}
                d={calculatePieSegment(allocation.percentage, startAngle)}
                className={allocation.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Allocation Details */}
      <div className="space-y-3">
        {allocations.map((allocation, index) => (
          <motion.div
            key={allocation.name}
            className="flex items-center justify-between p-3 rounded-lg bg-deepViolet/30"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${allocation.color} mr-2`} />
              <span className="text-lavender">{allocation.name}</span>
            </div>
            <span className="text-turquoise">
              {(allocation.percentage * 100).toFixed(1)}%
            </span>
          </motion.div>
        ))}
      </div>

      {/* Total Allocation */}
      {allocations.length > 0 && (
        <motion.div
          className="mt-6 p-4 rounded-lg bg-turquoise/10 border border-turquoise/20"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-lavender/60">Total Allocation</div>
              <div className="text-lg font-medium text-turquoise">
                {allocations.reduce((sum, a) => sum + a.percentage * 100, 0).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-lavender/60">Treasury Share</div>
              <div className="text-lg font-medium text-turquoise">
                {(license.treasuryAllocation * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TreasuryAllocation; 