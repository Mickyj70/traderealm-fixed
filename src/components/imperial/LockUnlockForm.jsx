/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../../contexts/WalletContext";
import Card from "../common/Card";
import Button from "../common/Button";
import TokenInput from "../common/TokenInput";
import LoadingSpinner from "../common/LoadingSpinner";

const LockUnlockForm = () => {
  const { balance } = useWallet();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [action, setAction] = useState("lock"); // 'lock' or 'unlock'
  const [selectedDuration, setSelectedDuration] = useState(21);

  const durations = [
    { days: 21, multiplier: 1.5, penalty: 0.5 },
    { days: 42, multiplier: 2.0, penalty: 0.4 },
    { days: 63, multiplier: 2.5, penalty: 0.3 },
    { days: 84, multiplier: 3.0, penalty: 0.2 },
  ];

  const handleLock = async (e) => {
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

      // Mock lock transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form
      setAmount("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate amount
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      if (parseFloat(amount) > parseFloat(balance.locked)) {
        throw new Error("Insufficient locked BARON balance");
      }

      // Mock unlock transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form
      setAmount("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePenalty = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return 0;
    const duration = durations.find((d) => d.days === selectedDuration);
    return parseFloat(amount) * duration.penalty;
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <Card>
      <motion.div variants={formVariants} initial="hidden" animate="visible">
        <div className="flex mb-4 space-x-4">
          <button
            className={`flex-1 p-2 rounded-lg transition-colors ${
              action === "lock"
                ? "bg-turquoise/10 text-turquoise"
                : "bg-deepViolet/50 text-lavender hover:text-turquoise"
            }`}
            onClick={() => setAction("lock")}
          >
            Lock BARON
          </button>
          <button
            className={`flex-1 p-2 rounded-lg transition-colors ${
              action === "unlock"
                ? "bg-turquoise/10 text-turquoise"
                : "bg-deepViolet/50 text-lavender hover:text-turquoise"
            }`}
            onClick={() => setAction("unlock")}
          >
            Unlock BARON
          </button>
        </div>

        <form onSubmit={action === "lock" ? handleLock : handleUnlock}>
          <div className="space-y-4">
            <TokenInput
              label={`Amount to ${action === "lock" ? "Lock" : "Unlock"}`}
              token="BARON"
              value={amount}
              onChange={setAmount}
              max={action === "lock" ? balance.baron : balance.locked}
              balance={action === "lock" ? balance.baron : balance.locked}
            />

            {action === "unlock" && (
              <div className="p-4 rounded-lg bg-deepViolet/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lavender">Early Unlock Penalty</span>
                  <span className="font-medium text-warning">
                    {calculatePenalty()} BARON
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lavender">You Will Receive</span>
                  <span className="font-medium text-success">
                    {parseFloat(amount) - calculatePenalty()} BARON
                  </span>
                </div>
              </div>
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
                variant={action === "lock" ? "primary" : "secondary"}
                fullWidth
                disabled={isLoading || !amount}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">
                      {action === "lock" ? "Locking" : "Unlocking"}
                    </span>
                    <LoadingSpinner size="small" />
                  </div>
                ) : (
                  `${action === "lock" ? "Lock" : "Unlock"} BARON`
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </Card>
  );
};

export default LockUnlockForm;
