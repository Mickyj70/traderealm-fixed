import React, { useRef, useEffect, useState } from "react";
// import { motion } from 'framer-motion';
import { gsap } from "gsap";
// import Slider from '../common/Slider';

const TariffOptimizer = ({
  currentTariff,
  minTariff,
  maxTariff,
  elasticity,
}) => {
  const svgRef = useRef(null);
  const curveRef = useRef(null);
  const [optimalRange, setOptimalRange] = useState({ min: 0, max: 0 });
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    // Calculate optimal tariff range based on elasticity
    const calculateOptimalRange = () => {
      // Using a simplified version of the Lerner Index formula
      // Optimal price = MC / (1 + 1/|E|)
      // Where MC is marginal cost (assumed to be minTariff)
      // And E is price elasticity of demand
      const optimalTariff = minTariff / (1 + 1 / Math.abs(elasticity));
      const range = 0.1; // 10% range around optimal

      setOptimalRange({
        min: Math.max(minTariff, optimalTariff * (1 - range)),
        max: Math.min(maxTariff, optimalTariff * (1 + range)),
      });
    };

    calculateOptimalRange();
  }, [minTariff, maxTariff, elasticity]);

  useEffect(() => {
    // Calculate revenue based on current tariff
    // Using a simplified demand function: Q = a * P^elasticity
    // Where a is a constant and P is price (tariff)
    const calculateRevenue = () => {
      const baseVolume = 1000; // Arbitrary base volume
      const quantity = baseVolume * Math.pow(currentTariff, elasticity);
      const revenue = quantity * currentTariff;
      setRevenue(revenue);
    };

    calculateRevenue();
  }, [currentTariff, elasticity]);

  useEffect(() => {
    // Initialize GSAP animation for curve
    const curve = curveRef.current;
    if (curve) {
      gsap.fromTo(
        curve,
        { pathLength: 0 },
        {
          pathLength: 1,
          duration: 1,
          ease: "power1.inOut",
        }
      );
    }
  }, []);

  const generateCurvePoints = () => {
    const points = [];
    const steps = 50;
    const baseVolume = 1000;

    for (let i = 0; i <= steps; i++) {
      const tariff = minTariff + (maxTariff - minTariff) * (i / steps);
      const quantity = baseVolume * Math.pow(tariff, elasticity);
      const revenue = quantity * tariff;

      // Scale values to fit the SVG viewport
      const x = (i / steps) * 100;
      const y = 100 - (revenue / (baseVolume * maxTariff)) * 100;

      points.push(`${x},${y}`);
    }

    return `M${points.join(" L")}`;
  };

  const getTariffColor = (tariff) => {
    if (tariff >= optimalRange.min && tariff <= optimalRange.max) {
      return "#4CAF50"; // Green for optimal range
    }
    return tariff < optimalRange.min ? "#FF9800" : "#F44336"; // Orange for too low, Red for too high
  };

  return (
    <div className="space-y-6">
      {/* Revenue Curve */}
      <div className="relative h-48">
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid Lines */}
          <g stroke="#2A1B3D" strokeWidth="0.5">
            {[0, 20, 40, 60, 80, 100].map((y) => (
              <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} />
            ))}
            {[0, 20, 40, 60, 80, 100].map((x) => (
              <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="100" />
            ))}
          </g>

          {/* Revenue Curve */}
          <motion.path
            ref={curveRef}
            d={generateCurvePoints()}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "power1.inOut" }}
          />

          {/* Optimal Range Highlight */}
          <rect
            x={((optimalRange.min - minTariff) / (maxTariff - minTariff)) * 100}
            y="0"
            width={
              ((optimalRange.max - optimalRange.min) /
                (maxTariff - minTariff)) *
              100
            }
            height="100"
            fill="#4CAF50"
            opacity="0.1"
          />

          {/* Current Tariff Indicator */}
          <motion.circle
            cx={((currentTariff - minTariff) / (maxTariff - minTariff)) * 100}
            cy={100 - (revenue / (1000 * maxTariff)) * 100}
            r="4"
            fill={getTariffColor(currentTariff)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </div>

      {/* Tariff Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lavender">Current Tariff</span>
          <span className="font-medium text-turquoise">
            {currentTariff.toFixed(2)} BARON
          </span>
        </div>
        {/* <Slider
          min={minTariff}
          max={maxTariff}
          step={0.01}
          value={currentTariff}
          onChange={onTariffChange}
        /> */}
        <div className="flex justify-between text-sm">
          <span className="text-lavender">Min: {minTariff.toFixed(2)}</span>
          <span className="text-lavender">Max: {maxTariff.toFixed(2)}</span>
        </div>
      </div>

      {/* Revenue Display */}
      <div className="p-4 rounded-lg bg-deepViolet/50">
        <div className="text-sm text-lavender">Projected Revenue</div>
        <div className="text-2xl font-bold text-turquoise">
          {revenue.toLocaleString()} BARON
        </div>
      </div>

      {/* Optimal Range Info */}
      <div className="text-sm text-lavender">
        <p>
          Optimal Range: {optimalRange.min.toFixed(2)} -{" "}
          {optimalRange.max.toFixed(2)} BARON
        </p>
        <p>Elasticity: {elasticity.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TariffOptimizer;
