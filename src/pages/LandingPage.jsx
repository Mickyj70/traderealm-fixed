/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../assets/Hero Main.svg";

import icon1 from "../assets/icons1.svg";
import icon2 from "../assets/icons2.svg";
import icon3 from "../assets/icons3.svg";
import icon4 from "../assets/icons4.svg";
import icon5 from "../assets/icons5.svg";
import icon6 from "../assets/icons6.svg";
import icon7 from "../assets/icons7.svg";
import icon8 from "../assets/icons8.svg";
import icon9 from "../assets/icons9.svg";
import tradeRoutes from "../assets/Trade Routes.svg";
import backgroundbottom from "../assets/down bg.svg";
import bottomlogotilted from "../assets/logo-tilted.svg";

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
      repeatType: "reverse", // Reverse the animation on repeat,
    },
  },
};

const LandingPage = () => {
  return (
    <motion.div
      className="w-full h-full overflow-x-hidden "
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div className="h-full bg-gradient-to-b from-[#1B0036] to-[#1A1135] text-white">
        {/* Hero Section */}
        <div className="container relative px-4 pt-20 text-center">
          {/* Logo and Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <img
              src={Logo}
              alt="RealMFI"
              className="mx-auto mb-8 w-[300px] md:w-[400px] lg:w-[600px]"
            />

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4 text-xl">
                <motion.span
                  className="font-bold text-[#FF2D55] cartoon-outline  pr-2"
                  animate={{
                    textShadow: "0 0 8px rgba(255, 45, 85, 0.8)",
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  TRADE
                </motion.span>{" "}
                •{" "}
                <motion.span
                  className="font-bold text-[#8000FF] cartoon-outline  pr-2"
                  animate={{
                    textShadow: "0 0 8px rgba(128, 0, 255, 0.8)",
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  BATTLE
                </motion.span>{" "}
                •{" "}
                <motion.span
                  className="font-bold text-[#00FFFF] cartoon-outline  pr-2"
                  animate={{
                    textShadow: "0 0 8px rgba(0, 255, 255, 0.8)",
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  PROFIT
                </motion.span>
              </div>
              <p className="text-lg text-[#ffff]">Strategy meets DeFi</p>
              <span
                className={`${cartoonTypewriter} cartoon-outline text-2xl text-[#FF0080]`}
              >
                RULE THE FINANCIAL REALM
              </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center mb-10 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
          >
            <a
              href="#"
              className="px-8 py-2 font-bold bg-[#FF3366] hover:bg-[#FF3366]/90 text-black border-4 border-black rounded-lg transform hover:-translate-y-1 transition-transform duration-200 shadow-[0_6px_0_0_rgba(0,0,0,1)] hover:shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 text-center mx-4 sm:mx-0"
            >
              ENTER APP
            </a>
            <a
              href="https://realm-finance.gitbook.io/realm-finance"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-2 font-bold bg-[#6B46C1] hover:bg-[#6B46C1]/90 text-black border-4 border-black rounded-lg transform hover:-translate-y-1 transition-transform duration-200 shadow-[0_6px_0_0_rgba(0,0,0,1)] hover:shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 text-center mx-4 sm:mx-0"
            >
              DOCUMENTATION
            </a>

            <a
              href="https://t.me/+6rVr6rsgtxQ5MzE0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-2 font-bold bg-[#66FFB4] hover:bg-[#66FFB4]/90 text-black border-4 border-black rounded-lg transform hover:-translate-y-1 transition-transform duration-200 shadow-[0_6px_0_0_rgba(0,0,0,1)] hover:shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 text-center mx-4 sm:mx-0"
            >
              TELEGRAM
            </a>
          </motion.div>
        </div>
      </motion.div>
      {/* Section with curved top */}
      <motion.div className="relative min-h-screen bg-gradient-to-b from-[#150429] to-[#1A1135] left-0 right-0 rounded-t-[10%] text-white">
        <div className="container relative px-4 pt-10 pb-2 mb-10 text-center ">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-1 text-center"
          >
            <motion.h2
              className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle} text-[#00FFFF]`}
              animate="hover"
              variants={glitchTextVariants}
            >
              BECOME A TRADE BARON
            </motion.h2>

            {/* Feature Grid */}
            <motion.section
              className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-3"
              variants={sectionVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Stake and Earn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl bg-[#1A0B2E] border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon1} alt="Stake" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    STAKE AND EARN
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Watch your tokens multiply with juicy auto compounding
                    rewards.
                  </p>
                </div>
              </motion.div>

              {/* Bond for Discounts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-xl bg-[#1A0B2E] border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon2} alt="Bond" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    BOND FOR DISCOUNTS
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Trade assets for discounted tokens and power up your
                    treasury.
                  </p>
                </div>
              </motion.div>

              {/* Control the Routes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 rounded-xl bg-[#1A0B2E] border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon3} alt="Routes" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    CONTROL THE ROUTES
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Claim trade routes and collect sweet tariff revenue.
                  </p>
                </div>
              </motion.div>
            </motion.section>
          </motion.div>
        </div>

        {/* Strategy = Profit Section */}
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-1 text-center"
          >
            <motion.h2
              className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle} text-[#00FFFF]`}
              animate="hover"
              variants={glitchTextVariants}
            >
              STRATEGY = PROFIT
            </motion.h2>

            <motion.section
              className="flex justify-center w-full mx-auto mb-5"
              variants={sectionVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl bg-[#1A0B2E] max-w-[720px] w-full border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon4} alt="Stake" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    TRADE WARS
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Battle other barons for control of the most valuable routes.{" "}
                    <br />
                    <span className="text-[#8000FF]">
                      {" "}
                      Weekly Contests with massive rewards
                    </span>
                  </p>
                </div>
              </motion.div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex justify-center max-w-[720px] mx-auto mb-5 gap-x-3 "
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl bg-[#1A0B2E]  w-full border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon5} alt="Routes" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    TARIFF TACTICS
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Too high? Traffic dies. Too low? Profit suffers. Find the
                    sweet spot and rake in the revenue.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl bg-[#1A0B2E]  w-full border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon6} alt="Routes" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    FORM ALLIANCES
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Team up with friends to control exclusive routes. More
                    allies = More profits!
                  </p>
                </div>
              </motion.div>
            </motion.section>
          </motion.div>
        </div>

        {/* Strategy = Profit Section */}
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-1 text-center"
          >
            <motion.h2
              className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle} text-[#00FFFF]`}
              animate="hover"
              variants={glitchTextVariants}
            >
              BUILT TO LAST
            </motion.h2>

            <motion.section
              variants={sectionVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex justify-center w-full mx-auto mb-5"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl bg-[#1A0B2E] max-w-[720px] w-full border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon7} alt="Stake" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    REAL VALUE BACKING
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Every token backed by real assets. No empty promises here.
                  </p>
                </div>
              </motion.div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex justify-center max-w-[720px] mx-auto mb-5 gap-x-3 "
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl bg-[#1A0B2E]  w-full border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon8} alt="Routes" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    MULTIPLE MONEY STREAMS
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Not just another one-trick DeFi pony.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl bg-[#1A0B2E]  w-full border-2 border-[#8159aa] relative group overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 240, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B2E] via-[#00FFF0]/5 to-[#1A0B2E] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A1B3D] flex items-center justify-center">
                    <img src={icon9} alt="Routes" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#fff] mb-3">
                    STRATEGY {">"} CAPITAL
                  </h3>
                  <p className="text-sm text-center text-gray-300">
                    Smart players can outperform big wallets. Brain beats bank!
                  </p>
                </div>
              </motion.div>
            </motion.section>
          </motion.div>
        </div>

        {/* trade routes */}
        <div className="container px-4 mx-auto mt-10 ">
          <div className="flex justify-center">
            <p className="px-8 py-2 text-3xl font-bold bg-[#FFB800] hover:bg-[#FFB800]/90 text-black border-4 border-black rounded-lg transform hover:-translate-y-1 transition-transform duration-200 shadow-[0_6px_0_0_rgba(0,0,0,1)] hover:shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1">
              TRADE ROUTES
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <img src={tradeRoutes} alt="tr" />
          </div>
        </div>

        <div className="container px-4 mx-auto mt-10 ">
          <div className="flex flex-col items-center justify-center gap-x-4">
            <motion.h2
              className={`text-2xl md:text-3xl text-center mb-8 ${cartoonTitle} text-[#00FFFF]`}
              animate="hover"
              variants={glitchTextVariants}
            >
              {" "}
              JOIN THE REALM
            </motion.h2>
            <p className="text-base text-white">WHERE TRADERS BECOME LEGENDS</p>
          </div>
        </div>

        {/* Add the background image at the bottom */}
        <div className="relative mt-10">
          <img
            src={backgroundbottom}
            alt="Background"
            className="object-cover w-full h-auto"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 0,
              opacity: 0.7, // Adjust opacity as needed
            }}
          />
          <div className="relative z-10 h-40">
            {/* Add the tilted logo to the bottom right corner */}
            <img
              src={bottomlogotilted}
              alt="Trade Realm Logo"
              className="absolute bottom-0 right-0 w-96 md:w-96 lg:w-[600px]"
              style={{
                zIndex: 10,
                marginRight: "0px",
                marginBottom: "0px",
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
