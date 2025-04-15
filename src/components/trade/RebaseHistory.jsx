import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';

const RebaseHistory = () => {
  // Mock rebase history data
  const rebaseHistory = [
    {
      date: '2024-03-20',
      rate: '2.5%',
      amount: '100 BARON',
      value: '$420.69'
    },
    {
      date: '2024-03-19',
      rate: '2.4%',
      amount: '98 BARON',
      value: '$413.42'
    },
    {
      date: '2024-03-18',
      rate: '2.3%',
      amount: '96 BARON',
      value: '$406.15'
    },
    {
      date: '2024-03-17',
      rate: '2.2%',
      amount: '94 BARON',
      value: '$398.88'
    },
    {
      date: '2024-03-16',
      rate: '2.1%',
      amount: '92 BARON',
      value: '$391.61'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-turquoise">
            Rebase History
          </h2>
          <button className="text-sm text-lavender hover:text-turquoise transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {rebaseHistory.map((rebase, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 bg-deepViolet/50 rounded-lg"
              variants={itemVariants}
            >
              <div>
                <h3 className="text-white font-medium">{rebase.date}</h3>
                <p className="text-sm text-lavender">
                  Rate: <span className="text-success">{rebase.rate}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{rebase.amount}</p>
                <p className="text-sm text-lavender">{rebase.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-lavender">
            Showing last 5 rebase events
          </p>
        </div>
      </motion.div>
    </Card>
  );
};

export default RebaseHistory; 