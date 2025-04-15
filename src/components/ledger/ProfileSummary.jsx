import React from 'react';
import { motion } from 'framer-motion';

const ProfileSummary = ({ profile }) => {
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
      {/* Avatar and Name */}
      <div className="flex items-center space-x-4 mb-6">
        <motion.div
          className="w-16 h-16 rounded-full bg-turquoise/20 border-2 border-turquoise overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-turquoise">{profile.name}</h2>
          <p className="text-lavender/60">{profile.rank}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          className="p-3 rounded-lg bg-deepViolet/30"
          variants={itemVariants}
        >
          <div className="text-sm text-lavender/60">Power</div>
          <div className="text-lg font-medium text-turquoise">
            {profile.power.toLocaleString()}
          </div>
        </motion.div>
        <motion.div
          className="p-3 rounded-lg bg-deepViolet/30"
          variants={itemVariants}
        >
          <div className="text-sm text-lavender/60">Routes</div>
          <div className="text-lg font-medium text-turquoise">
            {profile.routes}
          </div>
        </motion.div>
        <motion.div
          className="p-3 rounded-lg bg-deepViolet/30"
          variants={itemVariants}
        >
          <div className="text-sm text-lavender/60">Wars</div>
          <div className="text-lg font-medium text-turquoise">
            {profile.wars}
          </div>
        </motion.div>
        <motion.div
          className="p-3 rounded-lg bg-deepViolet/30"
          variants={itemVariants}
        >
          <div className="text-sm text-lavender/60">Victories</div>
          <div className="text-lg font-medium text-turquoise">
            {profile.victories}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <motion.button
          className="w-full p-3 rounded-lg bg-turquoise/10 border border-turquoise/20 text-turquoise hover:bg-turquoise/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Empire
        </motion.button>
        <motion.button
          className="w-full p-3 rounded-lg bg-lavender/10 border border-lavender/20 text-lavender hover:bg-lavender/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Manage Routes
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-lavender/60">Empire Progress</span>
          <span className="text-sm text-turquoise">65%</span>
        </div>
        <div className="h-2 rounded-full bg-deepViolet/50 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-turquoise"
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSummary; 