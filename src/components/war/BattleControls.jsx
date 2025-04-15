import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import TokenInput from '../common/TokenInput';

const BattleControls = ({ territories, onAttack, onDefend }) => {
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [actionType, setActionType] = useState('attack'); // 'attack' or 'defend'
  const [stakeAmount, setStakeAmount] = useState('');
  const [error, setError] = useState('');

  const handleAction = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedTerritory) {
      setError('Please select a territory');
      return;
    }

    if (!stakeAmount || isNaN(stakeAmount) || parseFloat(stakeAmount) <= 0) {
      setError('Please enter a valid stake amount');
      return;
    }

    if (actionType === 'attack') {
      onAttack({
        territoryId: selectedTerritory.id,
        stake: parseFloat(stakeAmount)
      });
    } else {
      onDefend({
        territoryId: selectedTerritory.id,
        stake: parseFloat(stakeAmount)
      });
    }

    setSelectedTerritory(null);
    setStakeAmount('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-lavender">
        Battle Controls
      </h3>

      {/* Action Type Selector */}
      <div className="flex space-x-2">
        <Button
          variant={actionType === 'attack' ? 'primary' : 'secondary'}
          onClick={() => setActionType('attack')}
          fullWidth
        >
          Attack
        </Button>
        <Button
          variant={actionType === 'defend' ? 'primary' : 'secondary'}
          onClick={() => setActionType('defend')}
          fullWidth
        >
          Defend
        </Button>
      </div>

      {/* Territory Selection */}
      <div>
        <label className="block text-sm text-lavender mb-1">
          Select Territory
        </label>
        <select
          value={selectedTerritory?.id || ''}
          onChange={(e) => {
            const territory = territories.find(t => t.id === parseInt(e.target.value));
            setSelectedTerritory(territory);
          }}
          className="w-full bg-deepViolet/50 border border-lavender/20 rounded-lg px-3 py-2 text-lavender focus:outline-none focus:border-turquoise"
        >
          <option value="">Select a territory</option>
          {territories.map((territory) => (
            <option key={territory.id} value={territory.id}>
              {territory.name} ({territory.owner})
            </option>
          ))}
        </select>
      </div>

      {/* Stake Input */}
      <TokenInput
        label={`${actionType === 'attack' ? 'Attack' : 'Defense'} Power`}
        token="BARON"
        value={stakeAmount}
        onChange={setStakeAmount}
        max={1000000}
      />

      {/* Action Button */}
      <Button
        variant="primary"
        fullWidth
        onClick={handleAction}
        disabled={!selectedTerritory || !stakeAmount}
      >
        {actionType === 'attack' ? 'Launch Attack' : 'Deploy Defense'}
      </Button>

      {/* Selected Territory Info */}
      {selectedTerritory && (
        <motion.div
          className="bg-deepViolet/50 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-lavender">
              {selectedTerritory.name}
            </div>
            <div className="text-turquoise">
              {selectedTerritory.power.toLocaleString()} Power
            </div>
          </div>
          <div className="text-sm text-lavender/70">
            Owner: {selectedTerritory.owner}
          </div>
          <div className="text-sm text-lavender/70">
            Current Defense: {(selectedTerritory.power * 0.8).toLocaleString()} Power
          </div>
        </motion.div>
      )}

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

      {/* Battle Tips */}
      <div className="text-sm text-lavender/70 space-y-2">
        <h4 className="font-medium text-turquoise">Battle Tips</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Attack power is reduced by 20% when targeting defended territories</li>
          <li>Defense power is increased by 30% when defending owned territories</li>
          <li>Successful attacks capture 50% of the territory's power</li>
          <li>Failed attacks result in a 25% power loss</li>
        </ul>
      </div>
    </div>
  );
};

export default BattleControls; 