import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const QuickActions = () => {
  const actions = [
    {
      title: "Stake BARON",
      description: "Earn rewards by staking your BARON tokens",
      icon: "🔒",
      path: "/stake",
    },
    {
      title: "Lock BARON",
      description: "Lock BARON to increase your xBARON power",
      icon: "⚡",
      path: "/lock",
    },
    {
      title: "Trade Routes",
      description: "Manage your trade routes and tariffs",
      icon: "🛣️",
      path: "/trade",
    },
    {
      title: "War Room",
      description: "Deploy resources and defend territories",
      icon: "⚔️",
      path: "/war",
    },
  ];

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <motion.div
      className="bg-richBlack rounded-xl p-6 border border-turquoise/20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl font-bold text-turquoise mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <motion.div
            key={action.title}
            className="bg-deepViolet rounded-lg p-4 border border-lavender/20"
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 8px 15px rgba(26, 17, 53, 0.3)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-lavender">{action.description}</p>
              </div>
              <span className="text-2xl">{action.icon}</span>
            </div>
            <div className="mt-4">
              <Link to={action.path}>
                <Button variant="secondary" size="sm" fullWidth>
                  Go to {action.title}
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
