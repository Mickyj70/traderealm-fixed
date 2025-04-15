/* eslint-disable no-unexpected-multiline */
import React, { forwardRef, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
// import { useMediaQuery } from "../../hooks/useMediaQuery";

const RouteMap = forwardRef(
  ({ routes, selectedRoute, onRouteSelect, routeType, filters }, ref) => {
    // const isMobile = useMediaQuery("(max-width: 768px)");
    const svgRef = useRef(null);
    const routeRefs = useRef({});

    // Use the forwarded ref for the svg element
    useEffect(() => {
      if (ref) {
        ref.current = svgRef.current;
      }
    }, [ref]);

    // Filter routes based on type and filters
    const filteredRoutes = routes.filter((route) => {
      if (routeType !== "all" && route.type !== routeType) return false;
      if (route.volume < filters.minVolume) return false;
      if (route.risk > filters.maxRisk) return false;
      if (route.efficiency < filters.minEfficiency) return false;
      return true;
    });

    useEffect(() => {
      // Initialize GSAP animations for routes
      filteredRoutes.forEach((route) => {
        const path = routeRefs.current[route.id];
        if (path) {
          // Reset animation
          gsap.set(path, { strokeDasharray: "none" });

          // Animate path
          gsap.fromTo(
            path,
            { strokeDashoffset: 1000 },
            {
              strokeDashoffset: 0,
              duration: 2,
              ease: "power1.inOut",
              repeat: -1,
              yoyo: true,
            }
          );
        }
      });
    }, [filteredRoutes]);

    const getRouteColor = (route) => {
      if (route === selectedRoute) return "#00F0FF"; // turquoise
      if (route.type === "direct") return "#4CAF50"; // green
      if (route.type === "indirect") return "#FF9800"; // orange
      return "#9C27B0"; // purple
    };

    const getRouteWidth = (route) => {
      // Scale width based on volume
      const minWidth = 1;
      const maxWidth = 4;
      const volumeScale = Math.log10(route.volume) / 6; // Assuming max volume is 1M
      return minWidth + (maxWidth - minWidth) * volumeScale;
    };

    return (
      <div className="relative w-full h-full">
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background grid */}
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#2A1B3D"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Routes */}
          {filteredRoutes.map((route) => (
            <motion.g
              key={route.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => onRouteSelect(route)}
              className="cursor-pointer"
            >
              {/* Route path */}
              <motion.path
                ref={(el) => (routeRefs.current[route.id] = el)}
                d={route.path}
                fill="none"
                stroke={getRouteColor(route)}
                strokeWidth={getRouteWidth(route)}
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Source node */}
              <motion.circle
                cx={route.path.split(" ")[1].split(",")[0]}
                cy={route.path.split(" ")[1].split(",")[1]}
                r="6"
                fill="#2A1B3D"
                stroke={getRouteColor(route)}
                strokeWidth="2"
                whileHover={{ scale: 1.2 }}
              />

              {/* Destination node */}
              <motion.circle
                cx={
                  route.path
                    .split(" ")
                    [route.path.split(" ").length - 1].split(",")[0]
                }
                cy={
                  route.path
                    .split(" ")
                    [route.path.split(" ").length - 1].split(",")[1]
                }
                r="6"
                fill="#2A1B3D"
                stroke={getRouteColor(route)}
                strokeWidth="2"
                whileHover={{ scale: 1.2 }}
              />

              {/* Route labels */}
              {/* {!isMobile && (
                <>
                  <motion.text
                    x={route.path.split(" ")[1].split(",")[0]}
                    y={route.path.split(" ")[1].split(",")[1] - 10}
                    fill={getRouteColor(route)}
                    fontSize="12"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {route.source}
                  </motion.text>
                  <motion.text
                    x={
                      route.path
                        .split(" ")
                        [route.path.split(" ").length - 1].split(",")[0]
                    }
                    y={
                      route.path
                        .split(" ")
                        [route.path.split(" ").length - 1].split(",")[1] - 10
                    }
                    fill={getRouteColor(route)}
                    fontSize="12"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {route.destination}
                  </motion.text>
                </>
              )} */}
            </motion.g>
          ))}
        </svg>

        {/* Mobile view overlay */}
        {/* {isMobile && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-deepViolet/80">
            <div className="text-sm text-lavender">
              <p>Tap on routes to view details</p>
              <p>Swipe to pan the map</p>
            </div>
          </div>
        )} */}
      </div>
    );
  }
);

RouteMap.displayName = "RouteMap";

export default RouteMap;
