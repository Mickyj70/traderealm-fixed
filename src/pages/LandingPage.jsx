import React, { useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useWallet } from "../contexts/WalletContext";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import HeroSection from "../components/landing/HeroSection";
import MetricsDisplay from "../components/landing/MetricsDisplay";
import HowItWorks from "../components/landing/HowItWorks";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
// import FeaturesShowcase from "../components/landing/FeaturesShowcase";
// import RoadmapTimeline from "../components/landing/RoadmapTimeline";

const LandingPage = () => {
  const { wallet, connectWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    tvl: 0,
    treasury: 0,
    backingPrice: 0,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  // Mock data for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics({
        tvl: 15000000,
        treasury: 5000000,
        backingPrice: 1.25,
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-deepViolet"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Floating Connect Button */}
      <motion.div className="fixed z-50 top-4 right-4" style={{ opacity, y }}>
        {!wallet ? (
          <Button
            onClick={connectWallet}
            className="bg-turquoise text-deepViolet hover:bg-turquoise/80"
          >
            Connect Wallet
          </Button>
        ) : (
          <div className="px-4 py-2 border rounded-lg bg-lavender/10 border-lavender/20 text-lavender">
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </div>
        )}
      </motion.div>

      {/* Hero Section */}
      <HeroSection />

      {/* Metrics Display */}
      <MetricsDisplay metrics={metrics} />

      {/* How It Works */}
      <HowItWorks />

      {/* Features Showcase */}
      {/* <FeaturesShowcase /> */}

      {/* Roadmap Timeline */}
      {/* <RoadmapTimeline /> */}

      {/* Footer */}
      <footer className="py-8 border-t border-lavender/20">
        <div className="container px-4 mx-auto text-center">
          <p className="text-lavender/60">
            © 2024 TradeRealm. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
