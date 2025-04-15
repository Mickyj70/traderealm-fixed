/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import WarStatusBar from "../components/war/WarStatusBar";
import StrategicMap from "../components/war/StrategicMap";
import AllianceFormation from "../components/war/AllianceFormation";
import BattleControls from "../components/war/BattleControls";
import RewardsPanel from "../components/war/RewardsPanel";
import BattleLog from "../components/war/BattleLog";
import { useMediaQuery } from "../hooks/useMediaQuery";

const WarRoom = () => {
  const { isConnected } = useWallet();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);
  const [warPhase, setWarPhase] = useState("preparation"); // preparation, battle, resolution
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [territories, setTerritories] = useState([]);
  const [alliances, setAlliances] = useState([]);
  const [battleLog, setBattleLog] = useState([]);
  const [rewards, setRewards] = useState(null);

  // Mock data initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock territories data
      setTerritories([
        {
          id: 1,
          name: "Ethereum Mainnet",
          owner: "Alliance A",
          power: 1000,
          coordinates: { x: 100, y: 100 },
        },
        {
          id: 2,
          name: "Arbitrum",
          owner: "Alliance B",
          power: 800,
          coordinates: { x: 200, y: 150 },
        },
        {
          id: 3,
          name: "Optimism",
          owner: "Alliance C",
          power: 600,
          coordinates: { x: 300, y: 200 },
        },
        // Add more territories...
      ]);

      // Mock alliances data
      setAlliances([
        { id: 1, name: "Alliance A", members: 5, power: 1000, territories: 3 },
        { id: 2, name: "Alliance B", members: 4, power: 800, territories: 2 },
        { id: 3, name: "Alliance C", members: 3, power: 600, territories: 1 },
      ]);

      // Mock battle log
      setBattleLog([
        {
          id: 1,
          type: "attack",
          alliance: "Alliance A",
          target: "Ethereum Mainnet",
          result: "success",
          timestamp: Date.now() - 3600000,
        },
        {
          id: 2,
          type: "defense",
          alliance: "Alliance B",
          target: "Arbitrum",
          result: "success",
          timestamp: Date.now() - 1800000,
        },
        // Add more log entries...
      ]);

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          // Phase transition logic
          if (warPhase === "preparation") {
            setWarPhase("battle");
            return 7200; // 2 hours for battle phase
          } else if (warPhase === "battle") {
            setWarPhase("resolution");
            return 3600; // 1 hour for resolution phase
          } else {
            setWarPhase("preparation");
            return 3600; // 1 hour for preparation phase
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [warPhase]);

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
          <h2 className="text-2xl font-bold text-lavender mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400">
            Please connect your wallet to access the War Room
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
      className="container mx-auto px-4 py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-turquoise mb-2">War Room</h1>
        <p className="text-lavender">Strategic Control Center for Trade Wars</p>
      </div>

      {/* War Status Bar */}
      <WarStatusBar
        phase={warPhase}
        timeRemaining={timeRemaining}
        territories={territories}
        alliances={alliances}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left Column - Strategic Map */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <StrategicMap
              territories={territories}
              alliances={alliances}
              phase={warPhase}
            />
          </Card>
        </div>

        {/* Right Column - Phase-specific Controls */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {warPhase === "preparation" && (
              <motion.div
                key="preparation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <AllianceFormation
                    alliances={alliances}
                    onAllianceCreate={() => {}}
                    onAllianceJoin={() => {}}
                  />
                </Card>
              </motion.div>
            )}

            {warPhase === "battle" && (
              <motion.div
                key="battle"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <BattleControls
                    territories={territories}
                    onAttack={() => {}}
                    onDefend={() => {}}
                  />
                </Card>
              </motion.div>
            )}

            {warPhase === "resolution" && (
              <motion.div
                key="resolution"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <RewardsPanel rewards={rewards} onClaim={() => {}} />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Battle Log */}
          <Card>
            <BattleLog logs={battleLog} onFilterChange={() => {}} />
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default WarRoom;
