import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Card from "../common/Card";

const RecentActivity = () => {
  // Mock data - in production, this would come from the blockchain
  const activities = [
    {
      type: "stake",
      amount: "100 BARON",
      timestamp: "2 hours ago",
      status: "completed",
      icon: "🔒",
    },
    {
      type: "trade",
      amount: "50 BARON",
      timestamp: "4 hours ago",
      status: "completed",
      icon: "🔄",
    },
    {
      type: "lock",
      amount: "200 BARON",
      timestamp: "1 day ago",
      status: "completed",
      icon: "⚡",
    },
    {
      type: "reward",
      amount: "5 BARON",
      timestamp: "2 days ago",
      status: "completed",
      icon: "💰",
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

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "pending":
        return "text-warning";
      case "failed":
        return "text-error";
      default:
        return "text-lavender";
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
          <h2 className="text-xl font-bold text-turquoise">Recent Activity</h2>
          <button className="text-sm transition-colors text-lavender hover:text-turquoise">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-deepViolet/50"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{activity.icon}</span>
                <div>
                  <h3 className="font-medium text-white capitalize">
                    {activity.type}
                  </h3>
                  <p className="text-sm text-lavender">{activity.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{activity.amount}</p>
                <p className={`text-xs ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Card>
  );
};

export default RecentActivity;
