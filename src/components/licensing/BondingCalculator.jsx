import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TokenInput from '../common/TokenInput';

const BondingCalculator = ({ license, inputAmount, onAmountChange }) => {
  const [outputAmount, setOutputAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    if (inputAmount && !isNaN(inputAmount)) {
      const amount = parseFloat(inputAmount);
      const discount = amount * license.discount;
      const output = amount + discount;
      
      setDiscountAmount(discount);
      setOutputAmount(output);
    } else {
      setOutputAmount(0);
      setDiscountAmount(0);
    }
  }, [inputAmount, license.discount]);

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
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-turquoise mb-4">
        Bonding Calculator
      </h3>

      {/* Input Section */}
      <motion.div variants={itemVariants} className="mb-6">
        <TokenInput
          value={inputAmount}
          onChange={onAmountChange}
          max={1000000}
          label="Input Amount"
          token="BARON"
        />
      </motion.div>

      {/* Output Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-deepViolet/30">
          <span className="text-lavender">Input Amount</span>
          <span className="text-turquoise">
            {parseFloat(inputAmount || 0).toLocaleString()} BARON
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-deepViolet/30">
          <span className="text-lavender">Discount ({license.discount * 100}%)</span>
          <span className="text-turquoise">
            +{discountAmount.toLocaleString()} BARON
          </span>
        </div>

        <motion.div
          className="flex items-center justify-between p-4 rounded-lg bg-turquoise/10 border border-turquoise/20"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <span className="text-lavender font-medium">Total Output</span>
          <span className="text-turquoise font-bold">
            {outputAmount.toLocaleString()} BARON
          </span>
        </motion.div>
      </motion.div>

      {/* ROI Preview */}
      <motion.div
        variants={itemVariants}
        className="mt-6 p-3 rounded-lg bg-deepViolet/30"
      >
        <div className="flex items-center justify-between">
          <span className="text-lavender">Projected ROI</span>
          <span className="text-turquoise">
            {(license.roi * 100).toFixed(0)}%
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-deepViolet/50 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-turquoise"
            initial={{ width: 0 }}
            animate={{ width: `${license.roi * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BondingCalculator; 