/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import AllianceCard from "../components/alliance/AllianceCard";
import RequirementChecker from "../components/alliance/RequirementChecker";
import ConnectionStatus from "../components/alliance/ConnectionStatus";
import AllianceRoute from "../components/alliance/AllianceRoute";
import { useMediaQuery } from "../hooks/useMediaQuery";

const EmbassyQuarter = () => {
  const { isConnected, address } = useWallet();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);
  const [alliances, setAlliances] = useState([]);
  const [selectedAlliance, setSelectedAlliance] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [error, setError] = useState(null);

  // Mock data initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock alliances data
      setAlliances([
        {
          id: 1,
          name: "Ethereum Alliance",
          description: "Leading alliance in Ethereum ecosystem",
          members: 150,
          routes: 25,
          requirements: {
            tokens: [
              { symbol: "ETH", amount: 1, contract: "0x..." },
              { symbol: "UNI", amount: 100, contract: "0x..." },
            ],
            nfts: [
              { name: "BAYC", contract: "0x..." },
              { name: "CryptoPunks", contract: "0x..." },
            ],
          },
          routes: [
            {
              id: 1,
              source: "Ethereum",
              destination: "Arbitrum",
              volume: 1000000,
            },
            {
              id: 2,
              source: "Ethereum",
              destination: "Optimism",
              volume: 800000,
            },
            {
              id: 3,
              source: "Ethereum",
              destination: "Polygon",
              volume: 600000,
            },
          ],
        },
        {
          id: 2,
          name: "Arbitrum Guild",
          description: "Dominant force in Arbitrum ecosystem",
          members: 120,
          routes: 20,
          requirements: {
            tokens: [
              { symbol: "ARB", amount: 1000, contract: "0x..." },
              { symbol: "GMX", amount: 50, contract: "0x..." },
            ],
            nfts: [{ name: "Arbitrum Odyssey", contract: "0x..." }],
          },
        },

        {
          id: 4,
          source: "Arbitrum",
          destination: "Ethereum",
          volume: 900000,
        },
        {
          id: 5,
          source: "Arbitrum",
          destination: "Optimism",
          volume: 700000,
        },
      ]);

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAllianceSelect = (alliance) => {
    setSelectedAlliance(alliance);
    setVerificationStatus(null);
    setError(null);
  };

  const handleVerification = async (status) => {
    setVerificationStatus(status);
    if (status.error) {
      setError(status.error);
    }
  };

  const handleJoinAlliance = async () => {
    if (!selectedAlliance || !verificationStatus?.verified) {
      setError("Please verify requirements before joining");
      return;
    }

    try {
      // TODO: Implement actual join logic
      console.log("Joining alliance:", selectedAlliance.name);
    } catch (err) {
      setError(err.message);
    }
  };

  // Animation variants
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
          <h2 className="mb-4 text-2xl font-bold text-lavender">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400">
            Please connect your wallet to access the Embassy Quarter
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
          Embassy Quarter
        </h1>
        <p className="text-lavender">
          Join Alliances and Access Exclusive Trade Routes
        </p>
      </div>

      {/* Connection Status */}
      <div className="mb-6">
        <ConnectionStatus
          address={address}
          selectedAlliance={selectedAlliance}
          verificationStatus={verificationStatus}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Alliance Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {alliances.map((alliance) => (
              <AllianceCard
                key={alliance.id}
                alliance={alliance}
                isSelected={selectedAlliance?.id === alliance.id}
                onSelect={handleAllianceSelect}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Details and Controls */}
        <div className="space-y-6">
          {selectedAlliance ? (
            <>
              {/* Requirement Checker */}
              <Card>
                <RequirementChecker
                  requirements={selectedAlliance.requirements}
                  onVerification={handleVerification}
                />
              </Card>

              {/* Alliance Route */}
              <Card>
                <AllianceRoute
                  routes={selectedAlliance.routes}
                  isVerified={verificationStatus?.verified}
                />
              </Card>

              {/* Join Button */}
              <Button
                variant="primary"
                fullWidth
                onClick={handleJoinAlliance}
                disabled={!verificationStatus?.verified}
              >
                Join {selectedAlliance.name}
              </Button>
            </>
          ) : (
            <Card>
              <div className="p-6 text-center">
                <h3 className="mb-2 text-lg font-medium text-lavender">
                  Select an Alliance
                </h3>
                <p className="text-gray-400">
                  Choose an alliance to view its requirements and routes
                </p>
              </div>
            </Card>
          )}
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

export default EmbassyQuarter;
