import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
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

  const mascotVariants = {
    initial: { scale: 0.8, rotate: -5 },
    animate: {
      scale: 1,
      rotate: 5,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-deepViolet to-purple-900/50" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-turquoise/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants}>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-turquoise">
              Build Your Trade Empire
            </h1>
            <p className="mb-8 text-xl text-lavender/80">
              Control trade routes, collect tariffs, and expand your influence
              in the decentralized economy. The power to shape the future of
              trade is in your hands.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/app">
                <motion.button
                  className="w-full px-8 py-4 font-bold transition-colors rounded-lg sm:w-auto bg-turquoise text-deepViolet hover:bg-turquoise/80"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enter the Realm
                </motion.button>
              </Link>
              <Link to="https://realm-finance.gitbook.io/realm-finance">
                <motion.button
                  className="w-full px-8 py-4 transition-colors border rounded-lg sm:w-auto border-turquoise/50 text-turquoise hover:bg-turquoise/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Mascot Animation */}
          <motion.div
            className="relative"
            variants={mascotVariants}
            initial="initial"
            animate="animate"
          >
            <div className="relative w-full aspect-square">
              {/* Mascot Base */}
              <motion.div
                className="absolute inset-0 bg-[url('/mascot.svg')] bg-contain bg-center bg-no-repeat"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating Elements */}
              <motion.div
                className="absolute w-8 h-8 rounded-full top-1/4 left-1/4 bg-turquoise/20"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute w-6 h-6 rounded-full bottom-1/4 right-1/4 bg-lavender/20"
                animate={{
                  y: [0, -15, 0],
                  x: [0, -8, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Particle Effects */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-turquoise/30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute -translate-x-1/2 bottom-8 left-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-col items-center text-lavender/60">
          <span className="mb-2 text-sm">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
