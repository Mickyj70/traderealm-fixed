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

const ExampleHomePage = () => {
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
        className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] py-20 px-4 text-center md:text-left gap-12 md:gap-24 relative"
        variants={sectionVariants}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Text Block */}
        <div className="flex-1 max-w-xl md:max-w-2xl lg:max-w-3xl">
          <h1
            className={`text-7xl md:text-7xl mb-6 tracking-tight ${cartoonTitle}`}
          >
            REALM FINANCE
          </h1>
          <div
            className={`mb-8 text-2xl md:text-3xl ${cartoonSubtitle} space-y-2`}
          >
            <div>
              <span className="font-bold text-[#ffaa33] cartoon-outline cartoon-bounce">
                TRADE
              </span>{" "}
              •{" "}
              <span className="font-bold text-[#ffaa33] cartoon-outline cartoon-bounce">
                BATTLE
              </span>{" "}
              •{" "}
              <span className="font-bold text-[#ffaa33] cartoon-outline cartoon-bounce">
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
          <Button className={cartoonBtn} onClick={undefined}>
            START YOUR EMPIRE
          </Button>
        </div>
        {/* Animation Block */}
        <div className="flex items-center justify-center flex-1 w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
          <AnimatedTradeMap />
        </div>
      </motion.section>

      {/* BECOME A TRADE BARON */}
      <motion.section
        className="container px-4 py-12 mx-auto"
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
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
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
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
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
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
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
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
              >
                EPIC TRADE WARS
              </div>
              <div className="text-[#1a1135]">
                Battle other barons for control of the most valuable routes.
                <br />
                <span className="font-bold text-[#ffaa33] cartoon-outline cartoon-bounce">
                  Weekly contests with massive rewards!
                </span>
              </div>
            </div>
          </Card>
          <Card className={cartoonCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">📊</div>
              <div
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
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
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
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
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
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
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
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
                className={`text-xl font-semibold mb-1 ${cartoonSubtitle} cartoon-outline`}
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
          className={`text-xl text-center mb-8 ${cartoonSubtitle} cartoon-typewriter cartoon-outline`}
        >
          WHERE TRADERS BECOME LEGENDS
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button className={cartoonBtn} onClick={undefined}>
            Discord
          </Button>
          <Button className={cartoonBtn} onClick={undefined}>
            Twitter
          </Button>
          <Button className={cartoonBtn} onClick={undefined}>
            Telegram
          </Button>
        </div>
        {/* <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Button
            className={cartoonBtn + " bg-[#ffe7a0] text-[#1a1135]"}
            onClick={undefined}
          >
            Docs
          </Button>
          <Button
            className={cartoonBtn + " bg-[#ffe7a0] text-[#1a1135]"}
            onClick={undefined}
          >
            How to Play
          </Button>
          <Button
            className={cartoonBtn + " bg-[#ffe7a0] text-[#1a1135]"}
            onClick={undefined}
          >
            FAQ
          </Button>
        </div> */}
      </motion.section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#ffd84f]/40">
        <div className="container px-4 mx-auto text-center">
          <div className="mb-4 gap-4 flex justify-center items-center">
            <span className="">Docs</span>
            <span className=""> How to Play</span>
            <span className="">FAQ</span>
          </div>
          <p className={`text-[#ffaa33]/80 cartoon-subtitle cartoon-outline`}>
            © 2025 RealmFinance
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default ExampleHomePage;
