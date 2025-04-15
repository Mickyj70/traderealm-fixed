/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";

const TokenInput = ({
  value,
  onChange,
  max,
  tokenSymbol,
  error,
  disabled = false,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleMaxClick = () => {
    if (max) {
      onChange(max);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(input)) {
      onChange(input);
    }
  };

  // Animation variants
  const inputVariants = {
    focused: {
      boxShadow: "0 0 0 2px rgba(79, 255, 176, 0.4)",
      transition: { duration: 0.2 },
    },
    unfocused: {
      boxShadow: "none",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <motion.div
        className={`
          relative flex items-center
          bg-richBlack rounded-lg
          border ${error ? "border-error" : "border-turquoise/20"}
          ${isFocused ? "border-turquoise" : ""}
          transition-colors duration-200
        `}
        variants={inputVariants}
        animate={isFocused ? "focused" : "unfocused"}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="0.0"
          className={`
            w-full bg-transparent px-4 py-3
            text-white text-lg
            focus:outline-none
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          disabled={disabled}
        />

        <div className="flex items-center space-x-2 pr-4">
          {max && (
            <button
              onClick={handleMaxClick}
              className={`
                px-2 py-1 text-xs rounded
                bg-turquoise/10 text-turquoise
                hover:bg-turquoise/20
                transition-colors duration-200
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={disabled}
            >
              MAX
            </button>
          )}

          <span className="text-turquoise font-medium">{tokenSymbol}</span>
        </div>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-error text-sm"
        >
          {error}
        </motion.p>
      )}

      {max && (
        <div className="flex justify-between text-sm text-gray-400">
          <span>Balance:</span>
          <span>
            {max} {tokenSymbol}
          </span>
        </div>
      )}
    </div>
  );
};

export default TokenInput;
