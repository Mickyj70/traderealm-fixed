import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Card from "../common/Card";
import Button from "../common/Button";

const RouteDetails = ({ route, onClose }) => {
  const getRiskColor = (risk) => {
    if (risk <= 25) return "text-success";
    if (risk <= 50) return "text-warning";
    return "text-error";
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 80) return "text-success";
    if (efficiency >= 60) return "text-warning";
    return "text-error";
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-turquoise">
                  {route.source} → {route.destination}
                </h3>
                <p className="text-lavender">
                  {route.type === "direct" ? "Direct Route" : "Indirect Route"}
                </p>
              </div>
              <Button variant="secondary" size="small" onClick={onClose}>
                Close
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-deepViolet/50">
                <div className="text-sm text-lavender">Volume (24h)</div>
                <div className="text-2xl font-bold text-turquoise">
                  {route.volume.toLocaleString()} BARON
                </div>
              </div>
              <div className="p-4 rounded-lg bg-deepViolet/50">
                <div className="text-sm text-lavender">Risk Level</div>
                <div
                  className={`text-2xl font-bold ${getRiskColor(route.risk)}`}
                >
                  {route.risk}%
                </div>
              </div>
              <div className="p-4 rounded-lg bg-deepViolet/50">
                <div className="text-sm text-lavender">Efficiency</div>
                <div
                  className={`text-2xl font-bold ${getEfficiencyColor(
                    route.efficiency
                  )}`}
                >
                  {route.efficiency}%
                </div>
              </div>
              <div className="p-4 rounded-lg bg-deepViolet/50">
                <div className="text-sm text-lavender">Route Type</div>
                <div className="text-2xl font-bold text-turquoise">
                  {route.type.charAt(0).toUpperCase() + route.type.slice(1)}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-lg bg-deepViolet/50">
              <h4 className="mb-2 font-medium text-lavender">
                Route Description
              </h4>
              <p className="text-sm text-lavender">
                This {route.type} route connects {route.source} and{" "}
                {route.destination} with a
                {route.efficiency >= 80
                  ? " high"
                  : route.efficiency >= 60
                  ? " moderate"
                  : " low"}
                efficiency rate. The risk level is
                {route.risk <= 25
                  ? " low"
                  : route.risk <= 50
                  ? " moderate"
                  : " high"}
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  // Handle route selection
                  console.log("Selected route:", route);
                }}
              >
                Select Route
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteDetails;
