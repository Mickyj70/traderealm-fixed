/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import TokenInput from "../components/common/TokenInput";
import LoadingSpinner from "../components/common/LoadingSpinner";
import LicenseCard from "../components/licensing/LicenseCard";
import BondingCalculator from "../components/licensing/BondingCalculator";
import VestingSchedule from "../components/licensing/VestingSchedule";
import TreasuryAllocation from "../components/licensing/TreasuryAllocation";

const ImportLicensingOffice = () => {
  const { wallet, balance, approveToken, getTokenAllowance } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [licenses, setLicenses] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isBonding, setIsBonding] = useState(false);
  const [error, setError] = useState(null);
  const [allowance, setAllowance] = useState(0);

  // Mock license data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLicenses([
        {
          id: 1,
          name: "Standard License",
          description: "Basic trading permissions with moderate fees",
          price: 1000,
          discount: 0.1,
          roi: 0.15,
          vestingPeriod: 5,
          treasuryAllocation: 0.3,
        },
        {
          id: 2,
          name: "Premium License",
          description: "Enhanced trading permissions with reduced fees",
          price: 5000,
          discount: 0.2,
          roi: 0.25,
          vestingPeriod: 7,
          treasuryAllocation: 0.4,
        },
        {
          id: 3,
          name: "Elite License",
          description: "Full trading permissions with minimal fees",
          price: 10000,
          discount: 0.3,
          roi: 0.35,
          vestingPeriod: 10,
          treasuryAllocation: 0.5,
        },
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Check token allowance
  useEffect(() => {
    if (wallet && selectedLicense) {
      checkAllowance();
    }
  }, [wallet, selectedLicense]);

  const checkAllowance = async () => {
    try {
      const currentAllowance = await getTokenAllowance();
      setAllowance(currentAllowance);
    } catch (err) {
      console.error("Error checking allowance:", err);
    }
  };

  const handleLicenseSelect = (license) => {
    setSelectedLicense(license);
    setInputAmount("");
    setError(null);
  };

  const handleAmountChange = (value) => {
    setInputAmount(value);
    setError(null);
  };

  const handleApprove = async () => {
    if (!selectedLicense || !inputAmount) {
      setError("Please select a license and enter an amount");
      return;
    }

    setIsApproving(true);
    setError(null);

    try {
      await approveToken(inputAmount);
      await checkAllowance();
    } catch (err) {
      setError("Failed to approve token spending");
      console.error("Approval error:", err);
    } finally {
      setIsApproving(false);
    }
  };

  const handleBond = async () => {
    if (!selectedLicense || !inputAmount) {
      setError("Please select a license and enter an amount");
      return;
    }

    if (parseFloat(inputAmount) > allowance) {
      setError("Insufficient token allowance");
      return;
    }

    setIsBonding(true);
    setError(null);

    try {
      // TODO: Implement actual bonding logic
      console.log(
        "Bonding",
        inputAmount,
        "tokens for license",
        selectedLicense.name
      );
    } catch (err) {
      setError("Failed to bond tokens");
      console.error("Bonding error:", err);
    } finally {
      setIsBonding(false);
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
          <h2 className="text-2xl font-bold text-lavender mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400">
            Please connect your wallet to access the Import Licensing Office
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
        <h1 className="text-3xl font-bold text-turquoise mb-2">
          Import Licensing Office
        </h1>
        <p className="text-lavender">
          Acquire trading licenses through token bonding
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - License Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {licenses.map((license) => (
              <LicenseCard
                key={license.id}
                license={license}
                isSelected={selectedLicense?.id === license.id}
                onSelect={handleLicenseSelect}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Bonding Interface */}
        <div className="space-y-6">
          {selectedLicense ? (
            <>
              {/* Bonding Calculator */}
              <Card>
                <BondingCalculator
                  license={selectedLicense}
                  inputAmount={inputAmount}
                  onAmountChange={handleAmountChange}
                />
              </Card>

              {/* Vesting Schedule */}
              <Card>
                <VestingSchedule
                  license={selectedLicense}
                  inputAmount={inputAmount}
                />
              </Card>

              {/* Treasury Allocation */}
              <Card>
                <TreasuryAllocation
                  license={selectedLicense}
                  inputAmount={inputAmount}
                />
              </Card>

              {/* Action Buttons */}
              <div className="space-y-4">
                {parseFloat(inputAmount) > allowance ? (
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleApprove}
                    disabled={isApproving}
                  >
                    {isApproving ? "Approving..." : "Approve Tokens"}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleBond}
                    disabled={isBonding}
                  >
                    {isBonding ? "Bonding..." : "Bond Tokens"}
                  </Button>
                )}
              </div>
            </>
          ) : (
            <Card>
              <div className="text-center p-6">
                <h3 className="text-lg font-medium text-lavender mb-2">
                  Select a License
                </h3>
                <p className="text-gray-400">
                  Choose a license to view bonding details and requirements
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"
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

export default ImportLicensingOffice;
