/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useWallet } from "../contexts/WalletContext";

const GrandAssembly = () => {
  const { wallet, isConnected } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [proposals, setProposals] = useState([]);

  // Mock proposals data
  useEffect(() => {
    const timer = setTimeout(() => {
      setProposals([
        {
          id: 1,
          title: "Reduce Trade Fees",
          description: "Proposal to reduce trade fees by 10% for all users.",
          votesFor: 120,
          votesAgainst: 45,
          status: "Active",
        },
        {
          id: 2,
          title: "Add New Commodity: Gems",
          description: "Proposal to introduce Gems as a tradable commodity.",
          votesFor: 98,
          votesAgainst: 22,
          status: "Active",
        },
        {
          id: 3,
          title: "Increase Treasury Allocation",
          description:
            "Proposal to allocate 5% more to the community treasury.",
          votesFor: 150,
          votesAgainst: 30,
          status: "Closed",
        },
      ]);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
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
            Please connect your wallet to participate in the Grand Assembly.
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
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-turquoise">
          Grand Assembly
        </h1>
        <p className="text-lavender">
          Participate in governance by voting on proposals that shape the future
          of TradeRealm.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {proposals.map((proposal) => (
          <Card key={proposal.id}>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold text-turquoise">
                {proposal.title}
              </h3>
              <p className="mb-4 text-lavender/80">{proposal.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lavender/70">
                  For:{" "}
                  <span className="font-bold text-turquoise">
                    {proposal.votesFor}
                  </span>
                </span>
                <span className="text-lavender/70">
                  Against:{" "}
                  <span className="font-bold text-red-400">
                    {proposal.votesAgainst}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    proposal.status === "Active"
                      ? "bg-turquoise/20 text-turquoise"
                      : "bg-lavender/10 text-lavender"
                  }`}
                >
                  {proposal.status}
                </span>
                {proposal.status === "Active" && (
                  <div className="flex space-x-2">
                    <Button
                      className="px-3 py-1 text-sm bg-turquoise text-deepViolet hover:bg-turquoise/80"
                      onClick={() => alert("Voted For")}
                    >
                      Vote For
                    </Button>
                    <Button
                      className="px-3 py-1 text-sm text-white bg-red-500/80 hover:bg-red-500"
                      onClick={() => alert("Voted Against")}
                    >
                      Vote Against
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default GrandAssembly;
