import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Card from "../common/Card";
// import Slider from '../common/Slider';

const RouteFilters = ({
  filters,
  // onFilterChange,
  routeType,
  onRouteTypeChange,
}) => {
  const routeTypes = [
    { id: "all", label: "All Routes" },
    { id: "direct", label: "Direct" },
    { id: "indirect", label: "Indirect" },
  ];

  // const handleSliderChange = (key, value) => {
  //   onFilterChange({
  //     ...filters,
  //     [key]: value
  //   });
  // };

  return (
    <Card>
      <div className="space-y-6">
        {/* Route Type Selector */}
        <div>
          <h3 className="mb-3 text-lg font-medium text-lavender">Route Type</h3>
          <div className="flex space-x-2">
            {routeTypes.map((type) => (
              <motion.button
                key={type.id}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${
                  routeType === type.id
                    ? "bg-turquoise/10 text-turquoise"
                    : "bg-deepViolet/50 text-lavender hover:text-turquoise"
                }`}
                onClick={() => onRouteTypeChange(type.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {type.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Volume Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-lavender">
              Minimum Volume
            </h3>
            <span className="text-turquoise">
              {filters.minVolume.toLocaleString()} BARON
            </span>
          </div>
          {/* <Slider
            min={0}
            max={1000000}
            step={10000}
            value={filters.minVolume}
            onChange={(value) => handleSliderChange('minVolume', value)}
          /> */}
        </div>

        {/* Risk Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-lavender">Maximum Risk</h3>
            <span className="text-turquoise">{filters.maxRisk}%</span>
          </div>
          {/* <Slider
            min={0}
            max={100}
            step={1}
            value={filters.maxRisk}
            onChange={(value) => handleSliderChange('maxRisk', value)}
          /> */}
        </div>

        {/* Efficiency Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-lavender">
              Minimum Efficiency
            </h3>
            <span className="text-turquoise">{filters.minEfficiency}%</span>
          </div>
          {/* <Slider
            min={0}
            max={100}
            step={1}
            value={filters.minEfficiency}
            onChange={(value) => handleSliderChange('minEfficiency', value)}
          /> */}
        </div>
      </div>
    </Card>
  );
};

export default RouteFilters;
