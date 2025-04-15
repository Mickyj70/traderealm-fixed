/* eslint-disable no-unused-vars */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import MetricsPanel from "../components/dashboard/MetricsPanel";
import QuickActions from "../components/dashboard/QuickActions";
import HoldingsCard from "../components/dashboard/HoldingsCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import LoadingSpinner from "../components/common/LoadingSpinner";

const BaronsCouncil = () => {
  // Use the correct properties from your WalletContext
  const { wallet, isConnecting, connectWallet, balance } = useWallet();

  // Determine if connected based on wallet existence
  const isConnected = !!wallet;

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

  // Show loading state while connecting
  if (isConnecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
        <p className="ml-2 text-lavender">Connecting wallet...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-lavender">
            Connect Your Wallet
          </h2>
          <p className="mb-4 text-gray-400">
            Please connect your wallet to access the Baron's Council
          </p>
          <button
            onClick={connectWallet}
            className="px-4 py-2 text-black transition rounded bg-turquoise hover:bg-opacity-80"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="container px-4 py-8 mx-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-turquoise">
          Baron's Council
        </h1>
        <p className="text-lavender">Welcome to your trading command center</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          <MetricsPanel />
          <QuickActions />
          <RecentActivity />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <HoldingsCard />
          {/* Additional cards can be added here */}
        </div>
      </div>
    </motion.div>
  );
};

export default BaronsCouncil;
