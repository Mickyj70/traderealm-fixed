import React from "react";
import { motion } from "framer-motion";
import Card from "../common/Card";
import { useWallet } from "../../contextsWalletContext";

const PowerPosition = () => {
  const { balance } = useWallet();

  // Mock data - in production, this would come from the blockchain
  const powerData = {
    userPower: 42069,
    totalPower: 1000000,
    rank: 42,
    percentile: 99.5,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${(powerData.userPower / powerData.totalPower) * 100}%`,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <Card>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-bold text-turquoise mb-4">
          Power Position
        </h2>

        <div className="space-y-6">
          {/* Power Progress Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-lavender">Your Power</span>
              <span className="text-white font-medium">
                {powerData.userPower.toLocaleString()} xBARON
              </span>
            </div>
            <div className="h-2 bg-deepViolet rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-turquoise"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="text-right mt-1">
              <span className="text-xs text-lavender">
                {((powerData.userPower / powerData.totalPower) * 100).toFixed(
                  2
                )}
                % of total power
              </span>
            </div>
          </div>

          {/* Rank and Percentile */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-deepViolet/50 p-4 rounded-lg">
              <div className="text-lavender text-sm">Rank</div>
              <div className="text-2xl font-bold text-turquoise">
                #{powerData.rank}
              </div>
            </div>
            <div className="bg-deepViolet/50 p-4 rounded-lg">
              <div className="text-lavender text-sm">Percentile</div>
              <div className="text-2xl font-bold text-turquoise">
                {powerData.percentile}%
              </div>
            </div>
          </div>

          {/* Locked Balance */}
          <div className="bg-deepViolet/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lavender">Locked Balance</span>
              <span className="text-white font-medium">
                {balance.locked} BARON
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lavender">Power Multiplier</span>
              <span className="text-success font-medium">
                ×{balance.xBarronPower}
              </span>
            </div>
          </div>

          {/* Power Benefits */}
          <div className="space-y-2">
            <h3 className="text-lavender font-medium">Power Benefits</h3>
            <ul className="space-y-2 text-sm text-lavender">
              <li className="flex items-center">
                <span className="text-turquoise mr-2">✓</span>
                Increased rebase rewards
              </li>
              <li className="flex items-center">
                <span className="text-turquoise mr-2">✓</span>
                Higher voting power
              </li>
              <li className="flex items-center">
                <span className="text-turquoise mr-2">✓</span>
                Access to exclusive features
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default PowerPosition;
