/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const RouteFlow = ({ route }) => {
  const svgRef = useRef(null);
  const flowRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP animation for flow
    const flow = flowRef.current;
    if (flow) {
      gsap.fromTo(
        flow,
        { x: 0 },
        {
          x: "100%",
          duration: 2,
          ease: "none",
          repeat: -1,
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="100%" height="100%" fill="#1A1025" />

        {/* Route Path */}
        <path
          d="M100,200 C300,200 500,200 700,200"
          fill="none"
          stroke="#2A1B3D"
          strokeWidth="4"
        />

        {/* Flow Animation */}
        <motion.g
          ref={flowRef}
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle cx="0" cy="200" r="8" fill="#00F0FF" filter="url(#glow)" />
          <circle
            cx="-20"
            cy="200"
            r="6"
            fill="#00F0FF"
            opacity="0.7"
            filter="url(#glow)"
          />
          <circle
            cx="-40"
            cy="200"
            r="4"
            fill="#00F0FF"
            opacity="0.4"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Source Node */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle
            cx="100"
            cy="200"
            r="20"
            fill="#2A1B3D"
            stroke="#00F0FF"
            strokeWidth="2"
          />
          <text
            x="100"
            y="200"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#00F0FF"
            fontSize="14"
            fontWeight="bold"
          >
            {route.source}
          </text>
        </motion.g>

        {/* Destination Node */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <circle
            cx="700"
            cy="200"
            r="20"
            fill="#2A1B3D"
            stroke="#00F0FF"
            strokeWidth="2"
          />
          <text
            x="700"
            y="200"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#00F0FF"
            fontSize="14"
            fontWeight="bold"
          >
            {route.destination}
          </text>
        </motion.g>

        {/* Metrics */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <text
            x="400"
            y="100"
            textAnchor="middle"
            fill="#E0D3FF"
            fontSize="12"
          >
            Volume: {route.volume.toLocaleString()} BARON
          </text>
          <text
            x="400"
            y="120"
            textAnchor="middle"
            fill="#E0D3FF"
            fontSize="12"
          >
            Risk: {route.risk}%
          </text>
          <text
            x="400"
            y="140"
            textAnchor="middle"
            fill="#E0D3FF"
            fontSize="12"
          >
            Efficiency: {route.efficiency}%
          </text>
        </motion.g>

        {/* Glow Filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default RouteFlow;
