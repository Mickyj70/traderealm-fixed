/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useWallet } from "../contexts/WalletContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import TokenInput from "../components/common/TokenInput";
import LoadingSpinner from "../components/common/LoadingSpinner";
import RouteFlow from "../components/trade/RouteFlow";
import ControlDistribution from "../components/trade/ControlDistribution";
import TariffOptimizer from "../components/trade/TariffOptimizer";
import ControllerList from "../components/trade/ControllerList";
// import { useMediaQuery } from '../hooks/useMediaQuery';

const MerchantOffice = () => {
  const { routeId } = useParams();
  const { isConnected } = useWallet();
  // const isMobile = useMediaQuery('(max-width: 768px)');
  const [route, setRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stakeAmount, setStakeAmount] = useState("");
  const [tariff, setTariff] = useState(0.5);
  const [controllers, setControllers] = useState([]);
  const [error, setError] = useState("");

  // Mock route data - in production, this would come from the blockchain
  const mockRoute = {
    id: routeId,
    source: "Ethereum",
    destination: "Arbitrum",
    volume: 1000000,
    risk: 20,
    efficiency: 85,
    elasticity: -1.5, // Price elasticity of demand
    currentTariff: 0.5,
    maxTariff: 1.0,
    minTariff: 0.1,
    controllers: [
      { address: "0x123...abc", stake: 50000, share: 0.3 },
      { address: "0x456...def", stake: 30000, share: 0.2 },
      { address: "0x789...ghi", stake: 20000, share: 0.1 },
    ],
  };

  useEffect(() => {
    // Simulate loading route data
    const timer = setTimeout(() => {
      setRoute(mockRoute);
      setControllers(mockRoute.controllers);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [routeId]);

  const handleStake = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Validate stake amount
      if (!stakeAmount || isNaN(stakeAmount) || parseFloat(stakeAmount) <= 0) {
        throw new Error("Please enter a valid stake amount");
      }

      // Mock stake transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update controllers list
      const newStake = parseFloat(stakeAmount);
      const totalStake =
        controllers.reduce((sum, c) => sum + c.stake, 0) + newStake;
      const newController = {
        address: "0xYourAddress",
        stake: newStake,
        share: newStake / totalStake,
      };

      setControllers((prev) => {
        const updated = prev.map((c) => ({
          ...c,
          share: c.stake / totalStake,
        }));
        return [...updated, newController];
      });

      // Reset form
      setStakeAmount("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTariffChange = (newTariff) => {
    setTariff(newTariff);
    // In production, this would trigger a blockchain transaction
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
            Please connect your wallet to access the Merchant's Office
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
          Merchant's Office
        </h1>
        <p className="text-lavender">
          Control Panel for {route.source} → {route.destination} Route
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Route Flow */}
        <div className="lg:col-span-2">
          <Card className="h-[400px]">
            <RouteFlow route={route} />
          </Card>
        </div>

        {/* Right Column - Controls */}
        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 text-lg font-medium text-lavender">
              Control Distribution
            </h3>
            <ControlDistribution controllers={controllers} />
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-medium text-lavender">
              Stake Deployment
            </h3>
            <form onSubmit={handleStake} className="space-y-4">
              <TokenInput
                label="Amount to Stake"
                token="BARON"
                value={stakeAmount}
                onChange={setStakeAmount}
                max={1000000} // In production, this would be the user's balance
              />
              {error && <p className="text-sm text-error">{error}</p>}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={!stakeAmount}
              >
                Deploy Stake
              </Button>
            </form>
          </Card>
        </div>

        {/* Bottom Row - Tariff and Controllers */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="mb-4 text-lg font-medium text-lavender">
                Tariff Optimization
              </h3>
              <TariffOptimizer
                currentTariff={tariff}
                minTariff={route.minTariff}
                maxTariff={route.maxTariff}
                elasticity={route.elasticity}
                onTariffChange={handleTariffChange}
              />
            </Card>

            <Card>
              <h3 className="mb-4 text-lg font-medium text-lavender">
                Route Controllers
              </h3>
              <ControllerList controllers={controllers} />
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MerchantOffice;
