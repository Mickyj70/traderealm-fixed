import React from 'react';
import { motion } from 'framer-motion';

const WarStatusBar = ({ phase, timeRemaining, territories, alliances }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'preparation':
        return 'bg-blue-500';
      case 'battle':
        return 'bg-red-500';
      case 'resolution':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPhaseName = (phase) => {
    switch (phase) {
      case 'preparation':
        return 'Preparation Phase';
      case 'battle':
        return 'Battle Phase';
      case 'resolution':
        return 'Resolution Phase';
      default:
        return 'Unknown Phase';
    }
  };

  const totalTerritories = territories.length;
  const totalAlliances = alliances.length;
  const totalPower = territories.reduce((sum, t) => sum + t.power, 0);

  return (
    <motion.div
      className="bg-deepViolet/50 p-4 rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Phase Indicator */}
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getPhaseColor(phase)}`} />
          <div>
            <div className="text-sm text-lavender">Current Phase</div>
            <div className="text-lg font-bold text-turquoise">
              {getPhaseName(phase)}
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div>
          <div className="text-sm text-lavender">Time Remaining</div>
          <div className="text-lg font-bold text-turquoise">
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Territories Stats */}
        <div>
          <div className="text-sm text-lavender">Active Territories</div>
          <div className="text-lg font-bold text-turquoise">
            {totalTerritories}
          </div>
        </div>

        {/* Alliances Stats */}
        <div>
          <div className="text-sm text-lavender">Active Alliances</div>
          <div className="text-lg font-bold text-turquoise">
            {totalAlliances}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-2 bg-deepViolet rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${getPhaseColor(phase)}`}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{
              duration: timeRemaining,
              ease: 'linear'
            }}
          />
        </div>
      </div>

      {/* Phase Description */}
      <div className="mt-4 text-sm text-lavender">
        {phase === 'preparation' && (
          <p>Form alliances and prepare your forces for the upcoming battle.</p>
        )}
        {phase === 'battle' && (
          <p>Engage in strategic battles to capture and defend territories.</p>
        )}
        {phase === 'resolution' && (
          <p>Claim your rewards and prepare for the next war cycle.</p>
        )}
      </div>
    </motion.div>
  );
};

export default WarStatusBar; 