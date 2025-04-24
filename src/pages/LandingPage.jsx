/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import AnimatedTradeMap from "../components/landing/AnimatedTradeMapHero";

// Spider-Verse inspired color scheme
const colors = {
  black: "#000000",
  darkGray: "#1C1C1C",
  red: "#FF2D55",
  purple: "#8000FF",
  teal: "#00FFFF",
  magenta: "#FF0080",
};

// Updated class constants with new color scheme
const cartoonBg = `cartoon-bg glitch-bg`;
const cartoonCard = `cartoon-card glitch-card`;
const cartoonTitle = `cartoon-title glitch-title`;
const cartoonSubtitle = `cartoon-subtitle`;
const cartoonBtn = `cartoon-btn glitch-btn`;
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

// Glitch animation variants
const glitchTextVariants = {
  hover: {
    textShadow: [
      "2px 2px 0 rgba(255, 45, 85, 0.7), -2px -2px 0 rgba(0, 207, 255, 0.7)",
      "2px -2px 0 rgba(255, 45, 85, 0.7), -2px 2px 0 rgba(0, 207, 255, 0.7)",
      "-2px 2px 0 rgba(255, 45, 85, 0.7), 2px -2px 0 rgba(0, 207, 255, 0.7)",
      "-2px -2px 0 rgba(255, 45, 85, 0.7), 2px 2px 0 rgba(0, 207, 255, 0.7)",
    ],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const ExampleHomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        className={`flex flex-col min-h-screen ${cartoonBg} bg-gradient-to-b from-[#000000] to-[#1C1C1C]`}
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* HERO */}
        <motion.section
          className="flex flex-col md:flex-row items-center justify-center min-h-[56vh] py-20 px-2 text-center md:text-left gap-12 md:gap-24 relative overflow-hidden"
          variants={sectionVariants}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Spider-web pattern overlay */}
          {/* <div className="absolute inset-0 opacity-10 pointer-events-none z-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0,50 L100,50 M50,0 L50,100 M0,0 L100,100 M100,0 L0,100\" stroke=\"%23FF2D55\" stroke-width=\"1\"/></svg>')] bg-[length:50px_50px]"></div> */}

          {/* Text Block */}
          <div className="z-10 flex-1 max-w-xl md:max-w-2xl lg:max-w-3xl">
            <motion.h1
              className={`text-6xl md:text-7xl mb-6 tracking-tight ${cartoonTitle} text-[${colors.teal}]`}
              whileHover="hover"
              variants={glitchTextVariants}
            >
              REALM FINANCE
            </motion.h1>
            <div
              className={`mb-8 text-xl md:text-3xl ${cartoonSubtitle} space-y-2`}
            >
              <div>
                <motion.span
                  className="font-bold text-[#FF2D55] cartoon-outline cartoon-bounce"
                  whileHover={{
                    textShadow: "0 0 8px rgba(255, 45, 85, 0.8)",
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  TRADE
                </motion.span>{" "}
                •{" "}
                <motion.span
                  className="font-bold text-[#8000FF] cartoon-outline cartoon-bounce"
                  whileHover={{
                    textShadow: "0 0 8px rgba(128, 0, 255, 0.8)",
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  BATTLE
                </motion.span>{" "}
                •{" "}
                <motion.span
                  className="font-bold text-[#00FFFF] cartoon-outline cartoon-bounce"
                  whileHover={{
                    textShadow: "0 0 8px rgba(0, 255, 255, 0.8)",
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  PROFIT
                </motion.span>
              </div>
              <div>
                <span className="text-white cartoon-outline">
                  STRATEGY MEETS DEFI
                </span>
              </div>
              <div>
                <span
                  className={`${cartoonTypewriter} cartoon-outline text-[#FF0080]`}
                >
                  RULE THE FINANCIAL REALM
                </span>
              </div>
            </div>
            <div className="">
              <Button
                className={`mr-4 ${cartoonBtn} bg-[#FF2D55] border-[#00FFFF] text-white hover:bg-[#FF0080] hover:border-[#8000FF] transition-all duration-300`}
                onClick={() => {
                  window.location.href = "/council";
                }}
              >
                START YOUR EMPIRE
              </Button>

              <Button
                className={`${cartoonBtn} bg-[#8000FF] border-[#00FFFF] text-white hover:bg-[#6E00FF] hover:border-[#FF2D55] transition-all duration-300`}
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
          <div className="z-10 items-center justify-center flex-1 hidden w-full max-w-xl md:flex md:max-w-2xl lg:max-w-3xl">
            <AnimatedTradeMap />
          </div>
        </motion.section>

        {/* BECOME A TRADE BARON */}
        <motion.section
          className="container relative px-4 pb-12 mx-auto"
          variants={sectionVariants}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Comic dot pattern overlay */}
          {/* <div className="absolute inset-0 opacity-5 pointer-events-none z-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"10\" cy=\"10\" r=\"2\" fill=\"%2300FFFF\"/></svg>')] bg-[length:20px_20px]"></div> */}

          <motion.h2
            className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle} text-[#00FFFF]`}
            whileHover="hover"
            variants={glitchTextVariants}
          >
            BECOME A TRADE BARON
          </motion.h2>
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card
              className={`${cartoonCard} border-[#FF2D55] bg-[#1C1C1C] hover:border-[#00FFFF] transition-all duration-300`}
              onClick={undefined}
            >
              <div className="p-6 text-center">
                <div className="mb-2 text-3xl">🦙</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#FF2D55]`}
                >
                  STAKE & EARN
                </div>
                <div className="text-white">
                  Watch your tokens multiply with juicy auto-compounding
                  rewards.
                </div>
              </div>
            </Card>
            <Card
              className={`${cartoonCard} border-[#8000FF] bg-[#1C1C1C] hover:border-[#00FFFF] transition-all duration-300`}
              onClick={undefined}
            >
              <div className="p-6 text-center">
                <div className="mb-2 text-3xl">💰</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#8000FF]`}
                >
                  BOND FOR DISCOUNTS
                </div>
                <div className="text-white">
                  Trade assets for discounted tokens and power up your treasury.
                </div>
              </div>
            </Card>
            <Card
              className={`${cartoonCard} border-[#00FFFF] bg-[#1C1C1C] hover:border-[#FF2D55] transition-all duration-300`}
              onClick={undefined}
            >
              <div className="p-6 text-center">
                <div className="mb-2 text-3xl">🚩</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#00FFFF]`}
                >
                  CONTROL THE ROUTES
                </div>
                <div className="text-white">
                  Claim trade routes and collect sweet, sweet tariff revenue.
                </div>
              </div>
            </Card>
          </div>
        </motion.section>

        {/* STRATEGY = PROFIT */}
        <motion.section
          className="container relative px-4 py-12 mx-auto"
          variants={sectionVariants}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Graffiti style overlay */}
          {/* <div className="absolute inset-0 opacity-5 pointer-events-none z-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10,10 Q30,5 50,30 T90,90\" stroke=\"%23FF0080\" stroke-width=\"2\" fill=\"none\"/></svg>')] bg-[length:100px_100px]"></div> */}

          <motion.h2
            className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle} text-[#FF2D55]`}
            whileHover="hover"
            variants={glitchTextVariants}
          >
            STRATEGY = PROFIT
          </motion.h2>
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card
              className={`${cartoonCard} border-[#00FFFF] bg-[#1C1C1C] hover:border-[#FF2D55] transition-all duration-300`}
              onClick={undefined}
            >
              <div className="p-6 text-center">
                <div className="mb-2 text-3xl">⚔️</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#00FFFF]`}
                >
                  EPIC TRADE WARS
                </div>
                <div className="text-white">
                  Battle other barons for control of the most valuable routes.
                  <br />
                  <span className="font-bold text-[#FF2D55]">
                    Weekly contests with massive rewards!
                  </span>
                </div>
              </div>
            </Card>
            <Card
              className={`${cartoonCard} border-[#FF2D55] bg-[#1C1C1C] hover:border-[#8000FF] transition-all duration-300`}
              onClick={undefined}
            >
              <div className="p-6 text-center">
                <div className="mb-2 text-3xl">📊</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#FF2D55]`}
                >
                  TARIFF TACTICS
                </div>
                <div className="text-white">
                  Too high? Traffic dies. Too low? Profits suffer.
                  <br />
                  Find the sweet spot and rake in the revenue.
                </div>
              </div>
            </Card>
            <Card
              className={`${cartoonCard} border-[#8000FF] bg-[#1C1C1C] hover:border-[#00FFFF] transition-all duration-300`}
              onClick={undefined}
            >
              <div className="p-6 text-center">
                <div className="mb-2 text-3xl">🤝</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#8000FF]`}
                >
                  FORM ALLIANCES
                </div>
                <div className="text-white">
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
          className="container relative px-4 py-12 mx-auto"
          variants={sectionVariants}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Electric circuit pattern overlay */}
          {/* <div className="absolute inset-0 opacity-5 pointer-events-none z-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0,25 L15,25 M20,25 L30,25 M35,25 L50,25 M25,0 L25,15 M25,20 L25,30 M25,35 L25,50\" stroke=\"%2300FFFF\" stroke-width=\"1\"/></svg>')] bg-[length:50px_50px]"></div> */}

          <motion.h2
            className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle} text-[#8000FF]`}
            whileHover="hover"
            variants={glitchTextVariants}
          >
            BUILT TO LAST
          </motion.h2>
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card
              className={`${cartoonCard} border-[#8000FF] bg-[#1C1C1C] hover:border-[#FF2D55] transition-all duration-300 relative overflow-hidden`}
              onClick={undefined}
            >
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2D55]/5 to-[#00FFFF]/5 opacity-30"></div>
              <div className="relative z-10 p-6 text-center">
                <div className="mb-2 text-3xl">🏛️</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#8000FF]`}
                >
                  REAL VALUE BACKING
                </div>
                <div className="text-white">
                  Every token backed by real assets.
                  <br />
                  No empty promises here!
                </div>
              </div>
            </Card>
            <Card
              className={`${cartoonCard} border-[#00FFFF] bg-[#1C1C1C] hover:border-[#8000FF] transition-all duration-300 relative overflow-hidden`}
              onClick={undefined}
            >
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8000FF]/5 to-[#FF2D55]/5 opacity-30"></div>
              <div className="relative z-10 p-6 text-center">
                <div className="mb-2 text-3xl">💸</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#00FFFF]`}
                >
                  MULTIPLE MONEY STREAMS
                </div>
                <div className="text-white">
                  Not just another one-trick DeFi pony.
                </div>
              </div>
            </Card>
            <Card
              className={`${cartoonCard} border-[#FF2D55] bg-[#1C1C1C] hover:border-[#00FFFF] transition-all duration-300 relative overflow-hidden`}
              onClick={undefined}
            >
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/5 to-[#8000FF]/5 opacity-30"></div>
              <div className="relative z-10 p-6 text-center">
                <div className="mb-2 text-3xl">🧠</div>
                <div
                  className={`text-xl font-semibold mb-1 ${cartoonSubtitle} text-[#FF2D55]`}
                >
                  STRATEGY {">"} CAPITAL
                </div>
                <div className="text-white">
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
          className="container relative px-4 py-16 mx-auto"
          variants={sectionVariants}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Multiverse portal effect */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#FF2D55] via-[#8000FF] to-[#00FFFF] opacity-10 animate-pulse"></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[#00FFFF] via-[#FF2D55] to-[#8000FF] opacity-10 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          <div className="flex content-center justify-center ">
            <motion.h2
              className={`text-3xl md:text-4xl text-center mb-4 ${cartoonTitle} text-[#FF0080] relative z-10`}
              whileHover="hover"
              variants={glitchTextVariants}
            >
              JOIN THE REALM
            </motion.h2>
          </div>
          <p
            className={`text-lg text-center mb-8 max-w-full px-4 whitespace-normal break-words ${cartoonSubtitle} cartoon-typewriter text-[#00FFFF] relative z-10`}
          >
            WHERE TRADERS BECOME LEGENDS
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-8">
            <Button
              className={`${cartoonBtn} bg-[#FF2D55] border-[#00FFFF] text-white hover:bg-[#FF0080] hover:border-[#8000FF] transition-all duration-300 relative overflow-hidden group`}
              onClick={() =>
                window.open(
                  "https://realm-finance.gitbook.io/realm-finance",
                  "_blank"
                )
              }
            >
              <span className="relative z-10">Documentation</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF2D55] to-[#FF0080] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button
              className={`${cartoonBtn} bg-[#8000FF] border-[#00FFFF] text-white hover:bg-[#6E00FF] hover:border-[#FF2D55] transition-all duration-300 relative overflow-hidden group`}
              onClick={() => window.open("https://twitter.com", "_blank")}
            >
              <span className="relative z-10">Twitter</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#8000FF] to-[#6E00FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button
              className={`${cartoonBtn} bg-[#00FFFF] border-[#FF2D55] text-[#000000] hover:bg-[#00CFFF] hover:border-[#8000FF] transition-all duration-300 relative overflow-hidden group`}
              onClick={() => window.open("https://t.me", "_blank")}
            >
              <span className="relative z-10">Telegram</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#00CFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-8 border-t border-[#8000FF]/40 relative">
          {/* Comic halftone pattern */}
          {/* <div className="absolute inset-0 opacity-5 pointer-events-none z-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23FF2D55\"/></svg>')] bg-[length:10px_10px]"></div> */}

          <div className="container relative z-10 px-4 mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-[#00FFFF] hover:text-[#FF2D55] transition-colors cursor-pointer">
                Docs
              </span>
              <span className="text-[#00FFFF] hover:text-[#FF2D55] transition-colors cursor-pointer">
                How to Play
              </span>
              <span className="text-[#00FFFF] hover:text-[#FF2D55] transition-colors cursor-pointer">
                FAQ
              </span>
            </div>
            <p className={`text-[#8000FF] ${cartoonSubtitle}`}>
              © 2025 RealmFinance
            </p>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default ExampleHomePage;
