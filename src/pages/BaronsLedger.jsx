/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProfileSummary from "../components/ledger/ProfileSummary";
import HoldingsChart from "../components/ledger/HoldingsChart";
// import RouteHistory from '../components/ledger/RouteHistory';
// import WarHistory from '../components/ledger/WarHistory';
// import TransactionHistory from '../components/ledger/TransactionHistory';
// import SettingsPanel from '../components/ledger/SettingsPanel';

const BaronsLedger = () => {
  const { wallet, balance } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("holdings");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  // Mock profile data
  useEffect(() => {
    const timer = setTimeout(() => {
      setProfileData({
        name: "Baron von Trade",
        avatar: "/images/avatars/baron.png",
        rank: "Grand Baron",
        power: 15000,
        routes: 12,
        wars: 5,
        victories: 4,
        holdings: {
          BARON: 50000,
          USDC: 25000,
          ETH: 5,
        },
        // routeHistory: [
        //   {
        //     id: 1,
        //     route: 'Trade Route Alpha',
        //     status: 'Active',
        //     control: 0.35,
        //     revenue: 1200,
        //     date: '2024-03-15'
        //   },
        //   // ... more routes
        // ],
        // warHistory: [
        //   {
        //     id: 1,
        //     opponent: 'House of Merchants',
        //     result: 'Victory',
        //     stake: 5000,
        //     date: '2024-03-10'
        //   },
        //   // ... more wars
        // ],
        transactions: [
          {
            id: 1,
            type: "Bond",
            amount: 1000,
            token: "BARON",
            status: "Completed",
            date: "2024-03-15",
          },
          // ... more transactions
        ],
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "holdings", label: "Holdings" },
    { id: "routes", label: "Route Control" },
    { id: "wars", label: "War History" },
    { id: "transactions", label: "Transactions" },
    { id: "settings", label: "Settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "holdings":
        return <HoldingsChart holdings={profileData?.holdings} />;
      case "routes":
        return <RouteHistory routes={profileData?.routeHistory} />;
      case "wars":
        return <WarHistory wars={profileData?.warHistory} />;
      // case 'transactions':
      //   return <TransactionHistory transactions={profileData?.transactions} />;
      // case 'settings':
      //   return <SettingsPanel />;
      default:
        return null;
    }
  };

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

  if (!wallet) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-lavender">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400">
            Please connect your wallet to access the Baron's Ledger
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
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
          Baron's Ledger
        </h1>
        <p className="text-lavender">
          Manage your trading empire and track your progress
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column - Profile Summary */}
        <div className="lg:col-span-1">
          <ProfileSummary profile={profileData} />
        </div>

        {/* Right Column - Tabbed Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex mb-6 space-x-4 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "secondary"}
                onClick={() => setActiveTab(tab.id)}
                className="whitespace-nowrap"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="p-4 mt-4 text-red-500 border rounded-lg bg-red-500/10 border-red-500/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BaronsLedger;
