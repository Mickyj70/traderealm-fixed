import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../common/Card";
import TokenInput from "../common/TokenInput";
import { useWallet } from "../../contextsWalletContext";

const RewardCalculator = () => {
  const { balance } = useWallet();
  const [amount, setAmount] = useState("");
  const [timeframe, setTimeframe] = useState("30"); // days
  const [projection, setProjection] = useState(null);

  // Mock APY data
  const currentAPY = 42069; // 42,069%

  useEffect(() => {
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      calculateProjection();
    } else {
      setProjection(null);
    }
  }, [amount, timeframe]);

  const calculateProjection = () => {
    const principal = parseFloat(amount);
    const days = parseInt(timeframe);
    const dailyRate = Math.pow(1 + currentAPY / 100, 1 / 365) - 1;

    const projectedValue = principal * Math.pow(1 + dailyRate, days);
    const rewards = projectedValue - principal;

    setProjection({
      principal,
      rewards,
      total: projectedValue,
      dailyRate: dailyRate * 100,
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
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
          Reward Calculator
        </h2>

        <div className="space-y-4">
          <TokenInput
            label="Staked Amount"
            token="BARON"
            value={amount}
            onChange={setAmount}
            max={balance.baron}
            balance={balance.baron}
          />

          <div>
            <label className="block text-sm font-medium text-lavender mb-2">
              Timeframe (days)
            </label>
            <select
              className="w-full bg-richBlack border border-lavender/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-turquoise"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>

          {projection && (
            <motion.div
              className="bg-deepViolet/50 p-4 rounded-lg space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between">
                <span className="text-lavender">Principal</span>
                <span className="text-white">
                  {projection.principal.toFixed(2)} BARON
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lavender">Rewards</span>
                <span className="text-success">
                  {projection.rewards.toFixed(2)} BARON
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lavender">Total Value</span>
                <span className="text-turquoise">
                  {projection.total.toFixed(2)} BARON
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lavender">Daily Rate</span>
                <span className="text-white">
                  {projection.dailyRate.toFixed(4)}%
                </span>
              </div>
            </motion.div>
          )}

          <div className="pt-4">
            <p className="text-sm text-lavender">
              Current APY:{" "}
              <span className="text-turquoise">
                {currentAPY.toLocaleString()}%
              </span>
            </p>
            <p className="text-xs text-lavender mt-1">
              * Projections are estimates and may vary based on market
              conditions
            </p>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default RewardCalculator;
