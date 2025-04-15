/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const ControllerList = ({ controllers }) => {
  const sortedControllers = [...controllers].sort((a, b) => b.stake - a.stake);

  const getControllerColor = (index) => {
    const colors = ["#00F0FF", "#4CAF50", "#FF9800", "#9C27B0", "#E91E63"];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-4">
      {sortedControllers.map((controller, index) => (
        <motion.div
          key={controller.address}
          className="bg-deepViolet/50 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getControllerColor(index) }}
              />
              <span className="text-lavender font-medium">
                {controller.address}
              </span>
            </div>
            <span className="text-turquoise font-bold">
              {(controller.share * 100).toFixed(1)}%
            </span>
          </div>

          {/* Stake Bar */}
          <div className="h-2 bg-deepViolet rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: getControllerColor(index) }}
              initial={{ width: 0 }}
              animate={{ width: `${controller.share * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          </div>

          {/* Stake Amount */}
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-lavender">Stake</span>
            <span className="text-turquoise">
              {controller.stake.toLocaleString()} BARON
            </span>
          </div>

          {/* Control Power */}
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-lavender">Control Power</span>
            <span className="text-turquoise">
              {Math.pow(controller.share, 2).toFixed(2)}x
            </span>
          </div>

          {/* Voting Power */}
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-lavender">Voting Power</span>
            <span className="text-turquoise">
              {Math.sqrt(controller.share).toFixed(2)}x
            </span>
          </div>
        </motion.div>
      ))}

      {/* Total Control Metrics */}
      <motion.div
        className="bg-deepViolet/50 p-4 rounded-lg mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-lavender font-medium mb-4">
          Total Control Metrics
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-lavender">Total Stake</div>
            <div className="text-xl font-bold text-turquoise">
              {controllers
                .reduce((sum, c) => sum + c.stake, 0)
                .toLocaleString()}{" "}
              BARON
            </div>
          </div>
          <div>
            <div className="text-sm text-lavender">Total Control</div>
            <div className="text-xl font-bold text-turquoise">
              {controllers
                .reduce((sum, c) => sum + c.share * 100, 0)
                .toFixed(1)}
              %
            </div>
          </div>
          <div>
            <div className="text-sm text-lavender">Gini Coefficient</div>
            <div className="text-xl font-bold text-turquoise">
              {calculateGiniCoefficient(controllers).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm text-lavender">Control Concentration</div>
            <div className="text-xl font-bold text-turquoise">
              {calculateConcentration(controllers).toFixed(2)}x
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Helper function to calculate Gini coefficient
const calculateGiniCoefficient = (controllers) => {
  const n = controllers.length;
  if (n === 0) return 0;

  const shares = controllers.map((c) => c.share).sort((a, b) => a - b);
  const sum = shares.reduce((acc, val) => acc + val, 0);
  const mean = sum / n;

  let gini = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      gini += Math.abs(shares[i] - shares[j]);
    }
  }

  return gini / (2 * n * n * mean);
};

// Helper function to calculate control concentration
const calculateConcentration = (controllers) => {
  const totalStake = controllers.reduce((sum, c) => sum + c.stake, 0);
  const largestStake = Math.max(...controllers.map((c) => c.stake));
  return largestStake / (totalStake / controllers.length);
};

export default ControllerList;
