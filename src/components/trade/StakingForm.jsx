/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../../contexts/WalletContext";
import Card from "../common/Card";
import Button from "../common/Button";
import TokenInput from "../common/TokenInput";

const StakingForm = () => {
  const { balance } = useWallet();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStake = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate amount
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      if (parseFloat(amount) > parseFloat(balance.baron)) {
        throw new Error("Insufficient BARON balance");
      }

      // Mock staking transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form
      setAmount("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
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
        onSubmit={handleStake}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="mb-4 text-xl font-bold text-turquoise">Stake BARON</h2>

        <div className="space-y-4">
          <TokenInput
            label="Amount to Stake"
            token="BARON"
            value={amount}
            onChange={setAmount}
            max={balance.baron}
            balance={balance.baron}
          />

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
              variant="primary"
              fullWidth
              disabled={isLoading || !amount}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">Staking</span>
                  <LoadingSpinner size="small" />
                </div>
              ) : (
                "Stake BARON"
              )}
            </Button>
          </div>
        </div>
      </motion.form>
    </Card>
  );
};

export default StakingForm;
