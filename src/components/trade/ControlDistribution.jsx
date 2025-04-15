import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const ControlDistribution = ({ controllers }) => {
  const svgRef = useRef(null);
  const pieRefs = useRef({});

  useEffect(() => {
    // Initialize GSAP animations for pie chart segments
    controllers.forEach((controller, index) => {
      const segment = pieRefs.current[controller.address];
      if (segment) {
        gsap.fromTo(
          segment,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
          }
        );
      }
    });
  }, [controllers]);

  const calculatePieSegments = () => {
    let cumulativeAngle = 0;
    return controllers.map(controller => {
      const angle = controller.share * 360;
      const startAngle = cumulativeAngle;
      cumulativeAngle += angle;

      // Convert angles to radians
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (startAngle + angle - 90) * Math.PI / 180;

      // Calculate coordinates for the arc
      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);

      // Determine if the arc is large (greater than 180 degrees)
      const largeArcFlag = angle > 180 ? 1 : 0;

      return {
        ...controller,
        path: `M50,50 L${x1},${y1} A40,40 0 ${largeArcFlag},1 ${x2},${y2} Z`,
        startAngle,
        angle
      };
    });
  };

  const segments = calculatePieSegments();

  const getControllerColor = (index) => {
    const colors = ['#00F0FF', '#4CAF50', '#FF9800', '#9C27B0', '#E91E63'];
    return colors[index % colors.length];
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        className="w-full h-48"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Pie Chart Segments */}
        {segments.map((segment, index) => (
          <motion.path
            key={segment.address}
            ref={el => pieRefs.current[segment.address] = el}
            d={segment.path}
            fill={getControllerColor(index)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'back.out(1.7)'
            }}
          />
        ))}

        {/* Center Circle */}
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="#2A1B3D"
        />

        {/* Total Control Percentage */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#E0D3FF"
          fontSize="12"
          fontWeight="bold"
        >
          {controllers.reduce((sum, c) => sum + c.share * 100, 0).toFixed(1)}%
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {controllers.map((controller, index) => (
          <motion.div
            key={controller.address}
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getControllerColor(index) }}
            />
            <span className="text-sm text-lavender">
              {controller.address}
            </span>
            <span className="text-sm text-turquoise ml-auto">
              {(controller.share * 100).toFixed(1)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ControlDistribution; 