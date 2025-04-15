/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import StakingForm from "../components/trade/StakingForm";
import UnstakingForm from "../components/trade/UnstakingForm";
import TradeMetrics from "../components/trade/TradeMetrics";
import RewardCalculator from "../components/trade/RewardCalculator";
import RebaseHistory from "../components/trade/RebaseHistory";
import LoadingSpinner from "../components/common/LoadingSpinner";

const TradeAdministration = () => {
  const { isConnected } = useWallet();

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-lavender mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400">
            Please connect your wallet to access the Trade Administration Bureau
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-turquoise mb-2">
          Trade Administration Bureau
        </h1>
        <p className="text-lavender">Manage your BARON staking and rewards</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <TradeMetrics />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StakingForm />
            <UnstakingForm />
          </div>
          <RebaseHistory />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RewardCalculator />
        </div>
      </div>
    </motion.div>
  );
};

export default TradeAdministration;
