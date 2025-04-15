import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../../contexts/WalletContext';

const RequirementChecker = ({ requirements, onVerificationComplete }) => {
  const { wallet } = useWallet();
  const [verificationStatus, setVerificationStatus] = useState({
    tokens: {},
    nfts: {},
    isComplete: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (requirements) {
      verifyRequirements();
    }
  }, [requirements, wallet]);

  const verifyRequirements = async () => {
    if (!wallet) {
      setError('Wallet not connected');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Mock token verification
      const tokenStatus = {};
      for (const token of requirements.tokens) {
        // In a real implementation, this would check the wallet's token balance
        const hasToken = Math.random() > 0.5; // Mock verification
        tokenStatus[token.symbol] = hasToken;
      }

      // Mock NFT verification
      const nftStatus = {};
      for (const nft of requirements.nfts) {
        // In a real implementation, this would check the wallet's NFT ownership
        const hasNFT = Math.random() > 0.5; // Mock verification
        nftStatus[nft.name] = hasNFT;
      }

      const isComplete = Object.values(tokenStatus).every(Boolean) && 
                        Object.values(nftStatus).every(Boolean);

      setVerificationStatus({
        tokens: tokenStatus,
        nfts: nftStatus,
        isComplete
      });

      onVerificationComplete(isComplete);
    } catch (err) {
      setError('Failed to verify requirements');
      console.error('Verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="p-6 rounded-xl border border-lavender/20 bg-deepViolet/50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-turquoise mb-4">
        Requirements Verification
      </h3>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-turquoise border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Token Requirements */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-lavender/60 mb-3">
              Token Requirements
            </h4>
            <div className="space-y-2">
              {requirements.tokens.map((token, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-deepViolet/30"
                  variants={itemVariants}
                >
                  <span className="text-lavender">
                    {token.amount} {token.symbol}
                  </span>
                  <motion.div
                    className={`w-5 h-5 rounded-full ${
                      verificationStatus.tokens[token.symbol]
                        ? 'bg-turquoise'
                        : 'bg-red-500'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* NFT Requirements */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-lavender/60 mb-3">
              NFT Requirements
            </h4>
            <div className="space-y-2">
              {requirements.nfts.map((nft, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-deepViolet/30"
                  variants={itemVariants}
                >
                  <span className="text-lavender">{nft.name}</span>
                  <motion.div
                    className={`w-5 h-5 rounded-full ${
                      verificationStatus.nfts[nft.name]
                        ? 'bg-turquoise'
                        : 'bg-red-500'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Status Message */}
          <AnimatePresence>
            {verificationStatus.isComplete && (
              <motion.div
                className="p-3 rounded-lg bg-turquoise/10 text-turquoise text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                All requirements met!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="p-3 rounded-lg bg-red-500/10 text-red-500 text-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

export default RequirementChecker; 