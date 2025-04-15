import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const StrategicMap = ({ territories, alliances, phase }) => {
  const svgRef = useRef(null);
  const territoryRefs = useRef({});

  useEffect(() => {
    // Initialize GSAP animations for territories
    territories.forEach((territory, index) => {
      const element = territoryRefs.current[territory.id];
      if (element) {
        gsap.fromTo(
          element,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
          }
        );
      }
    });
  }, [territories]);

  const getTerritoryColor = (owner) => {
    const alliance = alliances.find(a => a.name === owner);
    if (!alliance) return '#2A1B3D';
    
    const colors = ['#00F0FF', '#4CAF50', '#FF9800', '#9C27B0', '#E91E63'];
    return colors[alliance.id % colors.length];
  };

  const getTerritorySize = (power) => {
    return Math.max(30, Math.min(60, power / 20));
  };

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background Grid */}
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#2A1B3D"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Territory Connections */}
        {territories.map((territory, index) => {
          const nextTerritory = territories[(index + 1) % territories.length];
          return (
            <motion.line
              key={`connection-${territory.id}-${nextTerritory.id}`}
              x1={territory.coordinates.x}
              y1={territory.coordinates.y}
              x2={nextTerritory.coordinates.x}
              y2={nextTerritory.coordinates.y}
              stroke="#2A1B3D"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          );
        })}

        {/* Territories */}
        {territories.map((territory) => (
          <motion.g
            key={territory.id}
            ref={el => territoryRefs.current[territory.id] = el}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Territory Circle */}
            <circle
              cx={territory.coordinates.x}
              cy={territory.coordinates.y}
              r={getTerritorySize(territory.power)}
              fill={getTerritoryColor(territory.owner)}
              stroke="#00F0FF"
              strokeWidth="2"
            />

            {/* Territory Name */}
            <text
              x={territory.coordinates.x}
              y={territory.coordinates.y - getTerritorySize(territory.power) - 10}
              textAnchor="middle"
              fill="#E0D3FF"
              fontSize="12"
              fontWeight="bold"
            >
              {territory.name}
            </text>

            {/* Territory Power */}
            <text
              x={territory.coordinates.x}
              y={territory.coordinates.y + 5}
              textAnchor="middle"
              fill="#E0D3FF"
              fontSize="10"
            >
              {territory.power.toLocaleString()} Power
            </text>

            {/* Territory Owner */}
            <text
              x={territory.coordinates.x}
              y={territory.coordinates.y + 20}
              textAnchor="middle"
              fill="#E0D3FF"
              fontSize="10"
            >
              {territory.owner}
            </text>
          </motion.g>
        ))}

        {/* Phase-specific Overlays */}
        {phase === 'battle' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Battle Phase Indicators */}
            {territories.map((territory) => (
              <motion.circle
                key={`battle-${territory.id}`}
                cx={territory.coordinates.x}
                cy={territory.coordinates.y}
                r={getTerritorySize(territory.power) + 5}
                fill="none"
                stroke="#FF0000"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </motion.g>
        )}
      </svg>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button className="bg-deepViolet/50 text-lavender px-3 py-1 rounded-lg text-sm hover:bg-deepViolet">
          Zoom In
        </button>
        <button className="bg-deepViolet/50 text-lavender px-3 py-1 rounded-lg text-sm hover:bg-deepViolet">
          Zoom Out
        </button>
        <button className="bg-deepViolet/50 text-lavender px-3 py-1 rounded-lg text-sm hover:bg-deepViolet">
          Reset View
        </button>
      </div>
    </div>
  );
};

export default StrategicMap; 