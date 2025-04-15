/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const RoadmapTimeline = () => {
  const roadmapSteps = [
    {
      title: "Phase 1: Foundation",
      description: "Establish core infrastructure and deploy smart contracts.",
      date: "Q1 2024",
    },
    {
      title: "Phase 2: Expansion",
      description: "Introduce trade routes and governance mechanisms.",
      date: "Q2 2024",
    },
    {
      title: "Phase 3: War Room",
      description: "Enable strategic battles and territory control.",
      date: "Q3 2024",
    },
    {
      title: "Phase 4: Global Trade",
      description: "Launch cross-chain trade and advanced analytics.",
      date: "Q4 2024",
    },
    {
      title: "Phase 5: Community Growth",
      description: "Expand user base and incentivize community participation.",
      date: "Q1 2025",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-turquoise">
          Roadmap Timeline
        </h2>
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Timeline Line */}
          <div className="absolute w-1 h-full transform -translate-x-1/2 left-1/2 bg-lavender/20"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                variants={itemVariants}
              >
                {/* Connector Line */}
                <div className="absolute w-1 h-full transform -translate-x-1/2 left-1/2 bg-turquoise"></div>

                {/* Content */}
                <div
                  className={`bg-deepViolet/50 p-6 rounded-lg shadow-lg w-full max-w-md ${
                    index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                  }`}
                >
                  <h3 className="mb-2 text-xl font-bold text-turquoise">
                    {step.title}
                  </h3>
                  <p className="text-lavender/70">{step.description}</p>
                  <p className="mt-2 text-sm text-lavender/50">{step.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapTimeline;
