import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BattleLog = ({ logs, onFilterChange }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'attack', 'defense', 'success', 'failure'
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'hour', 'day', 'week'

  const filteredLogs = logs.filter(log => {
    if (filter !== 'all' && log.type !== filter) return false;
    if (timeFilter !== 'all') {
      const now = Date.now();
      const logTime = log.timestamp;
      const diff = now - logTime;
      
      switch (timeFilter) {
        case 'hour':
          return diff <= 3600000;
        case 'day':
          return diff <= 86400000;
        case 'week':
          return diff <= 604800000;
        default:
          return true;
      }
    }
    return true;
  });

  const getActionColor = (type) => {
    switch (type) {
      case 'attack':
        return 'text-red-500';
      case 'defense':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getResultColor = (result) => {
    return result === 'success' ? 'text-green-500' : 'text-red-500';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-lavender">
        Battle Log
      </h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {/* Action Type Filter */}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            onFilterChange({ type: e.target.value, time: timeFilter });
          }}
          className="bg-deepViolet/50 border border-lavender/20 rounded-lg px-3 py-1 text-lavender focus:outline-none focus:border-turquoise"
        >
          <option value="all">All Actions</option>
          <option value="attack">Attacks</option>
          <option value="defense">Defenses</option>
        </select>

        {/* Time Filter */}
        <select
          value={timeFilter}
          onChange={(e) => {
            setTimeFilter(e.target.value);
            onFilterChange({ type: filter, time: e.target.value });
          }}
          className="bg-deepViolet/50 border border-lavender/20 rounded-lg px-3 py-1 text-lavender focus:outline-none focus:border-turquoise"
        >
          <option value="all">All Time</option>
          <option value="hour">Last Hour</option>
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
        </select>
      </div>

      {/* Log Entries */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        <AnimatePresence>
          {filteredLogs.map((log) => (
            <motion.div
              key={log.id}
              className="bg-deepViolet/50 p-3 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${getActionColor(log.type)}`}>
                      {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                    </span>
                    <span className="text-lavender">on</span>
                    <span className="font-medium text-turquoise">
                      {log.target}
                    </span>
                  </div>
                  <div className="text-sm text-lavender/70">
                    by {log.alliance}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${getResultColor(log.result)}`}>
                    {log.result.charAt(0).toUpperCase() + log.result.slice(1)}
                  </div>
                  <div className="text-sm text-lavender/70">
                    {formatTime(log.timestamp)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-deepViolet/50 p-3 rounded-lg">
          <div className="text-sm text-lavender">Total Actions</div>
          <div className="text-xl font-bold text-turquoise">
            {filteredLogs.length}
          </div>
        </div>
        <div className="bg-deepViolet/50 p-3 rounded-lg">
          <div className="text-sm text-lavender">Success Rate</div>
          <div className="text-xl font-bold text-turquoise">
            {((filteredLogs.filter(log => log.result === 'success').length / filteredLogs.length) * 100 || 0).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleLog; 