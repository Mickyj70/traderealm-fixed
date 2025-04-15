import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useWallet } from "../../contexts/WalletContext";
import Card from "../common/Card";
import Button from "../common/Button";

const HoldingsCard = () => {
  const { balance } = useWallet();

  const holdings = [
    {
      name: "BARON",
      amount: balance.baron,
      value: "0.00", // This would come from price feed
      icon: "👑",
    },
    {
      name: "Staked BARON",
      amount: balance.staked,
      value: "0.00",
      icon: "🔒",
    },
    {
      name: "Locked BARON",
      amount: balance.locked,
      value: "0.00",
      icon: "⚡",
    },
    {
      name: "Rewards",
      amount: balance.rewards,
      value: "0.00",
      icon: "💰",
    },
  ];

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <Card variant="premium">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="mb-4 text-xl font-bold text-turquoise">Your Holdings</h2>

        <div className="space-y-4">
          {holdings.map((holding) => (
            <motion.div
              key={holding.name}
              className="flex items-center justify-between p-3 rounded-lg bg-richBlack/50"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{holding.icon}</span>
                <div>
                  <h3 className="font-medium text-white">{holding.name}</h3>
                  <p className="text-sm text-lavender">${holding.value} USD</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{holding.amount}</p>
                <p className="text-xs text-lavender">Balance</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <Button variant="primary" size="sm" fullWidth>
            Claim Rewards
          </Button>
          <Button variant="secondary" size="sm" fullWidth>
            View All Holdings
          </Button>
        </div>
      </motion.div>
    </Card>
  );
};

export default HoldingsCard;
