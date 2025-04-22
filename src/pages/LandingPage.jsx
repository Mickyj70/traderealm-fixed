/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import AnimatedTradeMap from "../components/landing/AnimatedTradeMapHero";

const cartoonBg = `cartoon-bg`;
const cartoonCard = `cartoon-card cartoon-shadow`;
const cartoonTitle = `cartoon-title cartoon-outline cartoon-bounce`;
const cartoonSubtitle = `cartoon-subtitle`;
const cartoonBtn = `cartoon-btn cartoon-bounce`;
const cartoonTypewriter = `cartoon-typewriter`;

// Page and section entrance/scroll-in animations
const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
  },
};
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 1, ease: [0.23, 1, 0.32, 1] },
  }),
};

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className={`flex flex-col min-h-screen ${cartoonBg}`}
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* HERO */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-center min-h-[56vh] py-20 px-2 text-center md:text-left gap-12 md:gap-24 relative"
        variants={sectionVariants}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Text Block */}
        <div className="flex-1 max-w-xl md:max-w-2xl lg:max-w-3xl">
          <h1
            className={`text-6xl md:text-7xl mb-6 tracking-tight ${cartoonTitle}`}
          >
            REALM FINANCE
          </h1>
          <div
            className={`mb-8 text-xl md:text-3xl ${cartoonSubtitle} space-y-2`}
          >
            <div>
              <span className="font-bold text-[#ff6b9d] cartoon-outline cartoon-bounce">
                TRADE
              </span>{" "}
              •{" "}
              <span className="font-bold text-[#d6adff] cartoon-outline cartoon-bounce">
                BATTLE
              </span>{" "}
              •{" "}
              <span className="font-bold text-[#4fffb0] cartoon-outline cartoon-bounce">
                PROFIT
              </span>
            </div>
            <div>
              <span className="cartoon-outline">STRATEGY MEETS DEFI</span>
            </div>
            <div>
              <span className={`cartoon-typewriter cartoon-outline`}>
                RULE THE FINANCIAL REALM
              </span>
            </div>
          </div>
          <div className="">
            <Button
              className={`mr-4 ${cartoonBtn} bg-[#ff6b9d] border-[#4fffb0] text-[#1a1135]`}
              onClick={() => {
                window.location.href = "/council";
              }}
            >
              START YOUR EMPIRE
            </Button>

            <Button
              className={`${cartoonBtn} bg-[#d6adff] border-[#4fffb0] text-[#1a1135]`}
              onClick={() =>
                window.open(
                  "https://realm-finance.gitbook.io/realm-finance",
                  "_blank"
                )
              }
            >
              Learn More
            </Button>
          </div>
        </div>
        {/* Animation Block */}
        <div className="items-center justify-center flex-1 hidden w-full max-w-xl md:flex md:max-w-2xl lg:max-w-3xl">
          <AnimatedTradeMap />
        </div>
      </motion.section>

      {/* BECOME A TRADE BARON */}
      <motion.section
        className="container px-4 pb-12 mx-auto"
        variants={sectionVariants}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle}`}>
          BECOME A TRADE BARON
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🦙</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                STAKE & EARN
              </div>
              <div className="text-[#1a1135]">
                Watch your tokens multiply with juicy auto-compounding rewards.
              </div>
            </div>
          </Card>
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">💰</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                BOND FOR DISCOUNTS
              </div>
              <div className="text-[#1a1135]">
                Trade assets for discounted tokens and power up your treasury.
              </div>
            </div>
          </Card>
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🚩</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                CONTROL THE ROUTES
              </div>
              <div className="text-[#1a1135]">
                Claim trade routes and collect sweet, sweet tariff revenue.
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* STRATEGY = PROFIT */}
      <motion.section
        className="container px-4 py-12 mx-auto"
        variants={sectionVariants}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle}`}>
          STRATEGY = PROFIT
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">⚔️</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                EPIC TRADE WARS
              </div>
              <div className="text-[#1a1135]">
                Battle other barons for control of the most valuable routes.
                <br />
                <span className="font-bold text-[#ff6b9d] cartoon-outline cartoon-bounce">
                  Weekly contests with massive rewards!
                </span>
              </div>
            </div>
          </Card>
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">📊</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                TARIFF TACTICS
              </div>
              <div className="text-[#1a1135]">
                Too high? Traffic dies. Too low? Profits suffer.
                <br />
                Find the sweet spot and rake in the revenue.
              </div>
            </div>
          </Card>
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🤝</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                FORM ALLIANCES
              </div>
              <div className="text-[#1a1135]">
                Team up with friends to control exclusive routes.
                <br />
                More allies = more profits!
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* BUILT TO LAST */}
      <motion.section
        className="container px-4 py-12 mx-auto"
        variants={sectionVariants}
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle}`}>
          BUILT TO LAST
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🏛️</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                REAL VALUE BACKING
              </div>
              <div className="text-[#1a1135]">
                Every token backed by real assets.
                <br />
                No empty promises here!
              </div>
            </div>
          </Card>
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">💸</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                MULTIPLE MONEY STREAMS
              </div>
              <div className="text-[#1a1135]">
                Not just another one-trick DeFi pony.
              </div>
            </div>
          </Card>
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🧠</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline text-[#1a1135]`}
              >
                STRATEGY &gt; CAPITAL
              </div>
              <div className="text-[#1a1135]">
                Smart players can outperform big wallets.
                <br />
                Brain beats bank!
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* JOIN THE REALM */}
      <motion.section
        className="container px-4 py-16 mx-auto"
        variants={sectionVariants}
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className={`text-3xl md:text-4xl text-center mb-4 ${cartoonTitle}`}>
          JOIN THE REALM
        </h2>
        <p
          className={`text-lg text-center mb-8 max-w-full whitespace-normal break-words ${cartoonSubtitle} cartoon-typewriter cartoon-outline`}
        >
          WHERE TRADERS BECOME LEGENDS
        </p>{" "}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            className={`${cartoonBtn} bg-[#ff6b9d] border-[#4fffb0] text-[#1a1135]`}
            onClick={() =>
              window.open(
                "https://realm-finance.gitbook.io/realm-finance",
                "_blank"
              )
            }
          >
            Documentation
          </Button>
          <Button
            className={`${cartoonBtn} bg-[#d6adff] border-[#4fffb0] text-[#1a1135]`}
            onClick={() => window.open("https://twitter.com", "_blank")}
          >
            Twitter
          </Button>
          <Button
            className={`${cartoonBtn} bg-[#4fffb0] border-[#d6adff] text-[#1a1135]`}
            onClick={() => window.open("https://t.me", "_blank")}
          >
            Telegram
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#4fffb0]/40">
        <div className="container px-4 mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-[#d6adff] hover:text-[#ff6b9d] transition-colors cursor-pointer">
              Docs
            </span>
            <span className="text-[#d6adff] hover:text-[#ff6b9d] transition-colors cursor-pointer">
              How to Play
            </span>
            <span className="text-[#d6adff] hover:text-[#ff6b9d] transition-colors cursor-pointer">
              FAQ
            </span>
          </div>
          <p className={`text-[#4fffb0]/80 cartoon-subtitle cartoon-outline`}>
            © 2025 RealmFinance
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
