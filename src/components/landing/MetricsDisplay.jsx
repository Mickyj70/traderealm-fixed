import React from 'react';
import { motion } from 'framer-motion';

const MetricsDisplay = ({ metrics }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const formatMetric = (value, prefix = '$', decimals = 2) => {
    if (value >= 1000000) {
      return `${prefix}${(value / 1000000).toFixed(decimals)}M`;
    }
    if (value >= 1000) {
      return `${prefix}${(value / 1000).toFixed(decimals)}K`;
    }
    return `${prefix}${value.toFixed(decimals)}`;
  };

  return (
    <section className="py-20 bg-deepViolet/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* TVL Metric */}
          <motion.div
            className="p-8 rounded-xl border border-lavender/20 bg-deepViolet/50"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-turquoise">Total Value Locked</h3>
              <div className="w-10 h-10 rounded-full bg-turquoise/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-turquoise"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <motion.div
              className="text-3xl font-bold text-turquoise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {formatMetric(metrics.tvl)}
            </motion.div>
            <div className="mt-2 h-1 rounded-full bg-deepViolet overflow-hidden">
              <motion.div
                className="h-full bg-turquoise"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Treasury Metric */}
          <motion.div
            className="p-8 rounded-xl border border-lavender/20 bg-deepViolet/50"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-lavender">Treasury Value</h3>
              <div className="w-10 h-10 rounded-full bg-lavender/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-lavender"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
            </div>
            <motion.div
              className="text-3xl font-bold text-lavender"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {formatMetric(metrics.treasury)}
            </motion.div>
            <div className="mt-2 h-1 rounded-full bg-deepViolet overflow-hidden">
              <motion.div
                className="h-full bg-lavender"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Backing Price Metric */}
          <motion.div
            className="p-8 rounded-xl border border-lavender/20 bg-deepViolet/50"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-purple-400">Backing Price</h3>
              <div className="w-10 h-10 rounded-full bg-purple-400/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <motion.div
              className="text-3xl font-bold text-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {formatMetric(metrics.backingPrice, '$', 3)}
            </motion.div>
            <div className="mt-2 h-1 rounded-full bg-deepViolet overflow-hidden">
              <motion.div
                className="h-full bg-purple-400"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsDisplay; 