import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import MetricCard from '../common/MetricCard';

const TradeMetrics = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mock data - in production, this would come from the blockchain
  const metrics = [
    {
      title: 'Current APY',
      value: '42,069%',
      change: { value: '+0.5%', isPositive: true }
    },
    {
      title: 'Rebase Rate',
      value: '2.5%',
      change: { value: '+0.1%', isPositive: true }
    },
    {
      title: 'Next Rebase',
      value: `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`,
      change: null
    },
    {
      title: 'Total Value Staked',
      value: '$42,069,420',
      change: { value: '+5.2%', isPositive: true }
    }
  ];

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextRebase = new Date();
      nextRebase.setHours(nextRebase.getHours() + 8); // Mock next rebase in 8 hours
      
      const difference = nextRebase - now;
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Card>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-bold text-turquoise mb-4">
          Trading Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              custom={index}
            />
          ))}
        </div>
      </motion.div>
    </Card>
  );
};

export default TradeMetrics; 