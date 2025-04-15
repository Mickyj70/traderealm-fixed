/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const FeaturesShowcase = () => {
  const features = [
    {
      title: "Control Trade Routes",
      description:
        "Use your BARON tokens to establish and control trade routes, collecting tariffs and expanding your influence.",
      icon: (
        <svg
          className="w-8 h-8 text-turquoise"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Participate in Governance",
      description:
        "Vote on proposals and shape the future of the TradeRealm ecosystem using your governance power.",
      icon: (
        <svg
          className="w-8 h-8 text-turquoise"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      title: "Earn Rewards",
      description:
        "Stake your BARON tokens to earn rewards and increase your influence in the TradeRealm.",
      icon: (
        <svg
          className="w-8 h-8 text-turquoise"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Expand Your Empire",
      description:
        "Collaborate with alliances, conquer territories, and dominate the decentralized trade economy.",
      icon: (
        <svg
          className="w-8 h-8 text-turquoise"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h11M9 21V3m0 18l-6-6m6 6l6-6"
          />
        </svg>
      ),
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
    <section className="py-20 bg-deepViolet/50">
      <div className="container px-4 mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold text-turquoise">
            Key Features
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-lavender/80">
            Discover the powerful features of TradeRealm and take control of
            your trading empire.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 border rounded-xl border-lavender/20 bg-deepViolet/50"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-turquoise">
                {feature.title}
              </h3>
              <p className="text-lavender/80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
