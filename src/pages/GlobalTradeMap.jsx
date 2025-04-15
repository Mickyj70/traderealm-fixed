/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import RouteMap from "../components/trade/RouteMap";
import RouteFilters from "../components/trade/RouteFilters";
import RouteDetails from "../components/trade/RouteDetails";
// import { useMediaQuery } from '../hooks/useMediaQuery';

const GlobalTradeMap = () => {
  const { wallet, isConnecting, connectWallet, balance } = useWallet();

  // Determine if connected based on wallet existence
  const isConnected = !!wallet;

  // const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeType, setRouteType] = useState("all");
  const [filters, setFilters] = useState({
    minVolume: 0,
    maxRisk: 100,
    minEfficiency: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  // Mock route data - in production, this would come from the blockchain
  const mockRoutes = [
    {
      id: 1,
      type: "direct",
      source: "Ethereum",
      destination: "Arbitrum",
      volume: 1000000,
      risk: 20,
      efficiency: 85,
      path: "M100,100 C200,200 300,150 400,100",
    },
    {
      id: 2,
      type: "indirect",
      source: "Polygon",
      destination: "Optimism",
      volume: 500000,
      risk: 40,
      efficiency: 70,
      path: "M150,150 C250,250 350,200 450,150",
    },
    // Add more mock routes as needed
  ];

  useEffect(() => {
    // Simulate loading routes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRouteTypeChange = (type) => {
    setRouteType(type);
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
          <p className="text-gray-400">
            Please connect your wallet to access the Global Trade Map
          </p>
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
          Global Trade Map
        </h1>
        <p className="text-lavender">
          Visualize and analyze cross-chain trade routes
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column - Map */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] relative overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="large" />
              </div>
            ) : (
              <RouteMap
                ref={mapRef}
                routes={mockRoutes}
                selectedRoute={selectedRoute}
                onRouteSelect={handleRouteSelect}
                routeType={routeType}
                filters={filters}
              />
            )}
          </Card>
        </div>

        {/* Right Column - Filters and Details */}
        <div className="space-y-6">
          <RouteFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            routeType={routeType}
            onRouteTypeChange={handleRouteTypeChange}
          />

          <AnimatePresence>
            {selectedRoute && (
              <RouteDetails
                route={selectedRoute}
                onClose={() => setSelectedRoute(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalTradeMap;
