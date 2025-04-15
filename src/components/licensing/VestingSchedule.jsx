import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VestingSchedule = ({ license, inputAmount }) => {
  const [vestingData, setVestingData] = useState([]);

  useEffect(() => {
    if (inputAmount && !isNaN(inputAmount)) {
      const amount = parseFloat(inputAmount);
      const totalOutput = amount * (1 + license.discount);
      const dailyVest = totalOutput / license.vestingPeriod;
      const projectedROI = license.roi;

      const data = Array.from({ length: license.vestingPeriod }, (_, i) => {
        const day = i + 1;
        const vestedAmount = dailyVest * day;
        const projectedValue = vestedAmount * (1 + projectedROI);
        return {
          day,
          vestedAmount,
          projectedValue
        };
      });

      setVestingData(data);
    } else {
      setVestingData([]);
    }
  }, [inputAmount, license.discount, license.vestingPeriod, license.roi]);

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
        Vesting Schedule
      </h3>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-lavender/20" />

        {/* Timeline Items */}
        <div className="space-y-4">
          {vestingData.map((data, index) => (
            <motion.div
              key={data.day}
              className="relative pl-8"
              variants={itemVariants}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 w-2 h-2 rounded-full bg-turquoise" />

              {/* Content */}
              <div className="p-3 rounded-lg bg-deepViolet/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lavender">Day {data.day}</span>
                  <span className="text-turquoise">
                    {data.vestedAmount.toLocaleString()} BARON
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 rounded-full bg-deepViolet/50 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-turquoise/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.day / license.vestingPeriod) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                {/* Projected Value */}
                <div className="mt-2 text-sm text-lavender/60">
                  Projected Value: {data.projectedValue.toLocaleString()} BARON
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      {vestingData.length > 0 && (
        <motion.div
          className="mt-6 p-4 rounded-lg bg-turquoise/10 border border-turquoise/20"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-lavender/60">Total Vesting Period</div>
              <div className="text-lg font-medium text-turquoise">
                {license.vestingPeriod} days
              </div>
            </div>
            <div>
              <div className="text-sm text-lavender/60">Final Projected Value</div>
              <div className="text-lg font-medium text-turquoise">
                {vestingData[vestingData.length - 1].projectedValue.toLocaleString()} BARON
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VestingSchedule; 