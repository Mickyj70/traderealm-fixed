/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const MerchantOffice = () => {
  const { wallet, balance } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [merchantData, setMerchantData] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setMerchantData({
        inventory: [
          { id: 1, name: "Silk", price: 100, stock: 50 },
          { id: 2, name: "Spices", price: 200, stock: 30 },
          { id: 3, name: "Gold", price: 500, stock: 10 },
        ],
        revenue: 15000,
        expenses: 5000,
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
          Manage your inventory, track revenue, and optimize trade routes.
        </p>
      </div>

      {/* Merchant Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue and Expenses */}
        <Card>
          <div className="p-4">
            <h3 className="mb-2 text-xl font-bold text-turquoise">Overview</h3>
            <p className="text-lavender">
              Revenue:{" "}
              <span className="font-bold text-turquoise">
                ${merchantData.revenue.toLocaleString()}
              </span>
            </p>
            <p className="text-lavender">
              Expenses:{" "}
              <span className="font-bold text-red-500">
                ${merchantData.expenses.toLocaleString()}
              </span>
            </p>
          </div>
        </Card>

        {/* Inventory */}
        <Card>
          <div className="p-4">
            <h3 className="mb-2 text-xl font-bold text-turquoise">Inventory</h3>
            <ul className="space-y-2">
              {merchantData.inventory.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-deepViolet/30"
                >
                  <span className="text-lavender">{item.name}</span>
                  <span className="text-turquoise">
                    ${item.price} ({item.stock} in stock)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <div className="p-4">
            <h3 className="mb-2 text-xl font-bold text-turquoise">Actions</h3>
            <Button
              className="w-full bg-turquoise text-deepViolet hover:bg-turquoise/80"
              onClick={() => alert("Optimize Trade Routes")}
            >
              Optimize Trade Routes
            </Button>
            <Button
              className="w-full mt-4 bg-lavender/10 text-lavender hover:bg-lavender/20"
              onClick={() => alert("Restock Inventory")}
            >
              Restock Inventory
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default MerchantOffice;
