import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import TokenInput from '../common/TokenInput';

const AllianceFormation = ({ alliances, onAllianceCreate, onAllianceJoin }) => {
  const [allianceName, setAllianceName] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedAlliance, setSelectedAlliance] = useState(null);
  const [error, setError] = useState('');

  const handleCreateAlliance = (e) => {
    e.preventDefault();
    setError('');

    if (!allianceName.trim()) {
      setError('Please enter an alliance name');
      return;
    }

    if (!stakeAmount || isNaN(stakeAmount) || parseFloat(stakeAmount) <= 0) {
      setError('Please enter a valid stake amount');
      return;
    }

    onAllianceCreate({
      name: allianceName,
      stake: parseFloat(stakeAmount)
    });

    setAllianceName('');
    setStakeAmount('');
  };

  const handleJoinAlliance = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedAlliance) {
      setError('Please select an alliance to join');
      return;
    }

    if (!stakeAmount || isNaN(stakeAmount) || parseFloat(stakeAmount) <= 0) {
      setError('Please enter a valid stake amount');
      return;
    }

    onAllianceJoin({
      allianceId: selectedAlliance.id,
      stake: parseFloat(stakeAmount)
    });

    setSelectedAlliance(null);
    setStakeAmount('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-lavender">
        Alliance Formation
      </h3>

      {/* Create Alliance Form */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-turquoise">
          Create New Alliance
        </h4>
        <form onSubmit={handleCreateAlliance} className="space-y-4">
          <div>
            <label className="block text-sm text-lavender mb-1">
              Alliance Name
            </label>
            <input
              type="text"
              value={allianceName}
              onChange={(e) => setAllianceName(e.target.value)}
              className="w-full bg-deepViolet/50 border border-lavender/20 rounded-lg px-3 py-2 text-lavender focus:outline-none focus:border-turquoise"
              placeholder="Enter alliance name"
            />
          </div>
          <TokenInput
            label="Initial Stake"
            token="BARON"
            value={stakeAmount}
            onChange={setStakeAmount}
            max={1000000}
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!allianceName || !stakeAmount}
          >
            Create Alliance
          </Button>
        </form>
      </div>

      {/* Join Alliance Form */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-turquoise">
          Join Existing Alliance
        </h4>
        <form onSubmit={handleJoinAlliance} className="space-y-4">
          <div>
            <label className="block text-sm text-lavender mb-1">
              Select Alliance
            </label>
            <select
              value={selectedAlliance?.id || ''}
              onChange={(e) => {
                const alliance = alliances.find(a => a.id === parseInt(e.target.value));
                setSelectedAlliance(alliance);
              }}
              className="w-full bg-deepViolet/50 border border-lavender/20 rounded-lg px-3 py-2 text-lavender focus:outline-none focus:border-turquoise"
            >
              <option value="">Select an alliance</option>
              {alliances.map((alliance) => (
                <option key={alliance.id} value={alliance.id}>
                  {alliance.name} ({alliance.members} members)
                </option>
              ))}
            </select>
          </div>
          <TokenInput
            label="Stake Amount"
            token="BARON"
            value={stakeAmount}
            onChange={setStakeAmount}
            max={1000000}
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!selectedAlliance || !stakeAmount}
          >
            Join Alliance
          </Button>
        </form>
      </div>

      {/* Alliance List */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-turquoise">
          Active Alliances
        </h4>
        <div className="space-y-2">
          {alliances.map((alliance) => (
            <motion.div
              key={alliance.id}
              className="bg-deepViolet/50 p-3 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-lavender">
                    {alliance.name}
                  </div>
                  <div className="text-sm text-lavender/70">
                    {alliance.members} members • {alliance.territories} territories
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-turquoise">
                    {alliance.power.toLocaleString()} Power
                  </div>
                  <div className="text-sm text-lavender/70">
                    {((alliance.power / alliances.reduce((sum, a) => sum + a.power, 0)) * 100).toFixed(1)}% Control
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="text-error text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default AllianceFormation; 