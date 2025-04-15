/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../../contexts/WalletContext";
import Card from "../common/Card";
import Button from "../common/Button";
import TokenInput from "../common/TokenInput";

const UnstakingForm = () => {
  const { balance } = useWallet();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Mock cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleUnstake = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate amount
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      if (parseFloat(amount) > parseFloat(balance.staked)) {
        throw new Error("Insufficient staked BARON balance");
      }

      // Mock unstaking transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Set cooldown period (mock 1 hour)
      setCooldown(3600);

      // Reset form
      setAmount("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCooldown = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <Card>
      <motion.form
        onSubmit={handleUnstake}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="mb-4 text-xl font-bold text-turquoise">Unstake BARON</h2>

        <div className="space-y-4">
          <TokenInput
            label="Amount to Unstake"
            token="BARON"
            value={amount}
            onChange={setAmount}
            max={balance.staked}
            balance={balance.staked}
          />

          {cooldown > 0 && (
            <motion.div
              className="p-3 rounded-lg bg-deepViolet/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-sm text-warning">
                Cooldown period active: {formatCooldown(cooldown)}
              </p>
            </motion.div>
          )}

          {error && (
            <motion.p
              className="text-sm text-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              variant="secondary"
              fullWidth
              disabled={isLoading || !amount || cooldown > 0}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">Unstaking</span>
                  <LoadingSpinner size="small" />
                </div>
              ) : (
                "Unstake BARON"
              )}
            </Button>
          </div>
        </div>
      </motion.form>
    </Card>
  );
};

export default UnstakingForm;
