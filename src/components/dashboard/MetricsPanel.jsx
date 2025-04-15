import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useWallet } from "../../contexts/WalletContext";
import MetricCard from "../common/MetricCard";

const MetricsPanel = () => {
  const { balance = 0 } = useWallet();

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

  // const formattedBalance = typeof balance === 'number' ? balance.toFixed(2) : '0.00';

  const metrics = [
    {
      title: "Total Holdings",
      value: `${parseFloat(balance.baron) + parseFloat(balance.staked)} BARON`,
      change: { value: "+2.5%", isPositive: true },
    },
    {
      title: "Staked Balance",
      value: `${balance.staked} BARON`,
      change: { value: "+1.8%", isPositive: true },
    },
    {
      title: "Locked Balance",
      value: `${balance.locked} BARON`,
      change: { value: "+0.5%", isPositive: true },
    },
    {
      title: "xBARON Power",
      value: `${balance.xBarronPower}`,
      change: { value: "+3.2%", isPositive: true },
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          custom={index}
        />
      ))}
    </motion.div>
  );
};

export default MetricsPanel;
