import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const retroBg = `bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]`;
const retroCard = `border-2 border-turquoise/60 bg-[#232946]/80 shadow-[0_0_24px_#00f0ff44] rounded-xl`;
const retroText = `font-mono tracking-wider`;

const AnimatedTradeMap = () => (
  <div className="flex justify-center my-12">
    <svg
      width="480"
      height="220"
      viewBox="0 0 480 220"
      className="w-full max-w-2xl"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
        </radialGradient>
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse
        cx="240"
        cy="110"
        rx="200"
        ry="90"
        fill="url(#glow)"
        opacity="0.15"
      />
      <ellipse
        cx="240"
        cy="110"
        rx="200"
        ry="90"
        fill="none"
        stroke="#2A1B3D"
        strokeWidth="2"
      />
      <motion.path
        d="M60,120 Q240,10 420,120"
        stroke="#00F0FF"
        strokeWidth="4"
        fill="none"
        filter="url(#glowFilter)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path
        d="M100,180 Q240,200 380,180"
        stroke="#A78BFA"
        strokeWidth="3"
        fill="none"
        filter="url(#glowFilter)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
      />
      <circle cx="60" cy="120" r="8" fill="#00F0FF" filter="url(#glowFilter)" />
      <circle
        cx="420"
        cy="120"
        r="8"
        fill="#00F0FF"
        filter="url(#glowFilter)"
      />
      <circle
        cx="100"
        cy="180"
        r="6"
        fill="#A78BFA"
        filter="url(#glowFilter)"
      />
      <circle
        cx="380"
        cy="180"
        r="6"
        fill="#A78BFA"
        filter="url(#glowFilter)"
      />
      <circle cx="240" cy="10" r="7" fill="#00F0FF" filter="url(#glowFilter)" />
      <circle
        cx="240"
        cy="200"
        r="7"
        fill="#A78BFA"
        filter="url(#glowFilter)"
      />
    </svg>
  </div>
);

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  }),
};

const ExampleHomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className={`flex flex-col min-h-screen ${retroBg}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* HERO */}
      <motion.section
        className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center relative"
        variants={sectionVariants}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h1
          className={`text-4xl md:text-6xl font-extrabold text-turquoise drop-shadow-lg mb-4 tracking-tight ${retroText}`}
        >
          REALM FINANCE
        </h1>
        <div
          className={`mb-6 text-lg md:text-2xl text-lavender/80 font-mono space-y-1 ${retroText}`}
        >
          <div>
            <span className="font-bold text-turquoise">TRADE</span> •{" "}
            <span className="font-bold text-turquoise">BATTLE</span> •{" "}
            <span className="font-bold text-turquoise">PROFIT</span>
          </div>
          <div>
            <span className="text-lavender/90">STRATEGY MEETS DEFI</span>
          </div>
          <div>
            <span className="text-lavender/90">RULE THE FINANCIAL REALM</span>
          </div>
        </div>
        <AnimatedTradeMap />
        <Button
          className="px-10 py-4 text-lg font-bold transition rounded-lg shadow-lg bg-turquoise text-deepViolet hover:bg-turquoise/80"
          onClick={undefined}
        >
          START YOUR EMPIRE
        </Button>
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
        <h2 className="text-2xl md:text-3xl font-bold text-turquoise text-center mb-8 ${retroText}">
          BECOME A TRADE BARON
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🪙</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                STAKE & EARN
              </div>
              <div className="text-lavender/80">
                Watch your tokens multiply with juicy auto-compounding rewards.
              </div>
            </div>
          </Card>
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">💰</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                BOND FOR DISCOUNTS
              </div>
              <div className="text-lavender/80">
                Trade assets for discounted tokens and power up your treasury.
              </div>
            </div>
          </Card>
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🚩</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                CONTROL THE ROUTES
              </div>
              <div className="text-lavender/80">
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
        <h2 className="text-2xl md:text-3xl font-bold text-turquoise text-center mb-8 ${retroText}">
          STRATEGY = PROFIT
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">⚔️</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                EPIC TRADE WARS
              </div>
              <div className="text-lavender/80">
                Battle other barons for control of the most valuable routes.
                <br />
                <span className="font-bold text-turquoise">
                  Weekly contests with massive rewards!
                </span>
              </div>
            </div>
          </Card>
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">📊</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                TARIFF TACTICS
              </div>
              <div className="text-lavender/80">
                Too high? Traffic dies. Too low? Profits suffer.
                <br />
                Find the sweet spot and rake in the revenue.
              </div>
            </div>
          </Card>
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🤝</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                FORM ALLIANCES
              </div>
              <div className="text-lavender/80">
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
        <h2 className="text-2xl md:text-3xl font-bold text-turquoise text-center mb-8 ${retroText}">
          BUILT TO LAST
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🏛️</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                REAL VALUE BACKING
              </div>
              <div className="text-lavender/80">
                Every token backed by real assets.
                <br />
                No empty promises here!
              </div>
            </div>
          </Card>
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">💸</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                MULTIPLE MONEY STREAMS
              </div>
              <div className="text-lavender/80">
                Not just another one-trick DeFi pony.
              </div>
            </div>
          </Card>
          <Card className={retroCard} onClick={undefined}>
            <div className="p-6 text-center">
              <div className="mb-2 text-3xl">🧠</div>
              <div className="text-xl font-semibold text-turquoise mb-1 ${retroText}">
                STRATEGY &gt; CAPITAL
              </div>
              <div className="text-lavender/80">
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
        <h2 className="text-3xl md:text-4xl font-bold text-turquoise text-center mb-4 ${retroText}">
          JOIN THE REALM
        </h2>
        <p className="text-xl text-lavender/80 text-center mb-8 ${retroText}">
          WHERE TRADERS BECOME LEGENDS
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            className="px-6 py-3 font-bold rounded-lg shadow bg-turquoise text-deepViolet hover:bg-turquoise/80"
            onClick={undefined}
          >
            Discord
          </Button>
          <Button
            className="px-6 py-3 font-bold rounded-lg shadow bg-turquoise text-deepViolet hover:bg-turquoise/80"
            onClick={undefined}
          >
            Twitter
          </Button>
          <Button
            className="px-6 py-3 font-bold rounded-lg shadow bg-turquoise text-deepViolet hover:bg-turquoise/80"
            onClick={undefined}
          >
            Telegram
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Button
            className="px-6 py-3 font-bold rounded-lg shadow bg-lavender/10 text-lavender hover:bg-lavender/20"
            onClick={undefined}
          >
            Docs
          </Button>
          <Button
            className="px-6 py-3 font-bold rounded-lg shadow bg-lavender/10 text-lavender hover:bg-lavender/20"
            onClick={undefined}
          >
            How to Play
          </Button>
          <Button
            className="px-6 py-3 font-bold rounded-lg shadow bg-lavender/10 text-lavender hover:bg-lavender/20"
            onClick={undefined}
          >
            FAQ
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 border-t border-lavender/20">
        <div className="container px-4 mx-auto text-center">
          <p className={`text-lavender/60 ${retroText}`}>© 2025 RealmFinance</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default ExampleHomePage;
