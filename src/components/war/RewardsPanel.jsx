import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const RewardsPanel = ({ rewards, onClaim }) => {
  // Mock rewards data if none provided
  const mockRewards = {
    total: 5000,
    breakdown: [
      { type: 'territory_control', amount: 2000, description: 'Territory Control Rewards' },
      { type: 'battle_victories', amount: 1500, description: 'Battle Victory Bonuses' },
      { type: 'alliance_share', amount: 1000, description: 'Alliance Share' },
      { type: 'special_achievements', amount: 500, description: 'Special Achievements' }
    ],
    claimable: true,
    nextWarStart: Date.now() + 86400000 // 24 hours from now
  };

  const currentRewards = rewards || mockRewards;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-lavender">
        War Rewards
      </h3>

      {/* Total Rewards */}
      <motion.div
        className="bg-deepViolet/50 p-4 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <div className="text-sm text-lavender">Total Rewards</div>
          <div className="text-3xl font-bold text-turquoise">
            {currentRewards.total.toLocaleString()} BARON
          </div>
        </div>
      </motion.div>

      {/* Rewards Breakdown */}
      <div className="space-y-2">
        {currentRewards.breakdown.map((reward, index) => (
          <motion.div
            key={reward.type}
            className="bg-deepViolet/50 p-3 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center">
              <div className="text-lavender">
                {reward.description}
              </div>
              <div className="text-turquoise font-medium">
                {reward.amount.toLocaleString()} BARON
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Claim Button */}
      <Button
        variant="primary"
        fullWidth
        onClick={onClaim}
        disabled={!currentRewards.claimable}
      >
        {currentRewards.claimable ? 'Claim Rewards' : 'Already Claimed'}
      </Button>

      {/* Next War Info */}
      <motion.div
        className="bg-deepViolet/50 p-4 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-center">
          <div className="text-sm text-lavender">Next War Starts</div>
          <div className="text-lg font-bold text-turquoise">
            {formatTime(currentRewards.nextWarStart)}
          </div>
        </div>
      </motion.div>

      {/* Rewards Info */}
      <div className="text-sm text-lavender/70 space-y-2">
        <h4 className="font-medium text-turquoise">Rewards Information</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Rewards are distributed based on territory control and battle performance</li>
          <li>Alliance members share rewards based on their contribution</li>
          <li>Special achievements provide bonus rewards</li>
          <li>Unclaimed rewards are automatically distributed after 24 hours</li>
        </ul>
      </div>
    </div>
  );
};

export default RewardsPanel; 