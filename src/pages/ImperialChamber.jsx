/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import LockDurationSelector from "../components/imperial/LockDurationSelector";
import PowerPosition from "../components/imperial/PowerPosition";
import LockUnlockForm from "../components/imperial/LockUnlockForm";
import PvPRebaseChart from "../components/imperial/PvPRebaseChart";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ImperialChamber = () => {
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
            Please connect your wallet to access the Imperial Chamber
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
          Imperial Chamber
        </h1>
        <p className="text-lavender">
          Lock BARON to increase your xBARON power and influence
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <LockDurationSelector />
          <LockUnlockForm />
          <PvPRebaseChart />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PowerPosition />
        </div>
      </div>
    </motion.div>
  );
};

export default ImperialChamber;
