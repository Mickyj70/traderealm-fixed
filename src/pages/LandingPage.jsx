/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const retroBg = `bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]`;
const retroCard = `border-2 border-turquoise/60 bg-[#232946]/80 shadow-[0_0_24px_#00f0ff44] rounded-xl`;
const retroText = `font-mono tracking-wider`;

const linkClass =
  "inline-block px-6 py-2 m-2 text-lg font-bold rounded-lg shadow bg-turquoise text-deepViolet hover:bg-turquoise/80 transition";
const sectionClass =
  "max-w-3xl mx-auto my-12 p-6 md:p-12 bg-[#232946]/80 border-2 border-turquoise/40 rounded-2xl shadow-[0_0_32px_#00f0ff33]";
const h2Class =
  "text-3xl md:text-4xl font-extrabold text-turquoise mb-4 mt-8 text-center drop-shadow";
const h3Class =
  "text-xl md:text-2xl font-bold text-turquoise mt-6 mb-2";
const pClass = `text-lavender/90 text-lg md:text-xl mb-4 ${retroText}`;
const divider =
  "my-10 border-t-2 border-turquoise/30 w-2/3 mx-auto opacity-60";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${retroBg} pb-8`}>
      {/* HERO */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center">
        <h1 className={`text-5xl md:text-7xl font-extrabold text-turquoise drop-shadow-lg mb-4 ${retroText}`}>REALM FINANCE</h1>
        <div className={`mb-6 text-xl md:text-2xl text-turquoise/80 ${retroText}`}>TRADE • BATTLE • PROFIT</div>
        <div className={`mb-2 text-lg md:text-xl text-lavender/80 ${retroText}`}>STRATEGY MEETS DEFI</div>
        <div className={`mb-8 text-lg md:text-xl text-lavender/70 ${retroText}`}>RULE THE FINANCIAL REALM</div>
        <div className="flex justify-center w-full my-8">
          <div className="w-full max-w-2xl aspect-[2/1] bg-[#232946]/60 rounded-2xl border-2 border-turquoise/40 shadow-[0_0_32px_#00f0ff55] flex items-center justify-center">
            <span className="font-mono text-2xl text-turquoise/60 md:text-4xl">[Global map with glowing trade routes]</span>
          </div>
        </div>
        <a href="#" className={linkClass}>
          START YOUR EMPIRE
        </a>
      </section>

      <div className={divider} />

      {/* BECOME A TRADE BARON */}
      <section className={sectionClass}>
        <h2 className={h2Class}>BECOME A TRADE BARON</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className={h3Class}>🪙 STAKE & EARN</h3>
            <p className={pClass}>Watch your tokens multiply with juicy auto-compounding rewards.</p>
          </div>
          <div>
            <h3 className={h3Class}>💰 BOND FOR DISCOUNTS</h3>
            <p className={pClass}>Trade assets for discounted tokens and power up your treasury.</p>
          </div>
          <div>
            <h3 className={h3Class}>🚩 CONTROL THE ROUTES</h3>
            <p className={pClass}>Claim trade routes and collect sweet, sweet tariff revenue.</p>
          </div>
        </div>
      </section>

      <div className={divider} />

      {/* STRATEGY = PROFIT */}
      <section className={sectionClass}>
        <h2 className={h2Class}>STRATEGY = PROFIT</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className={h3Class}>⚔️ EPIC TRADE WARS</h3>
            <p className={pClass}>Battle other barons for control of the most valuable routes.<br />Weekly contests with massive rewards!</p>
          </div>
          <div>
            <h3 className={h3Class}>📊 TARIFF TACTICS</h3>
            <p className={pClass}>Too high? Traffic dies. Too low? Profits suffer.<br />Find the sweet spot and rake in the revenue.</p>
          </div>
          <div>
            <h3 className={h3Class}>🤝 FORM ALLIANCES</h3>
            <p className={pClass}>Team up with friends to control exclusive routes.<br />More allies = more profits!</p>
          </div>
        </div>
      </section>

      <div className={divider} />

      {/* BUILT TO LAST */}
      <section className={sectionClass}>
        <h2 className={h2Class}>BUILT TO LAST</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className={h3Class}>🏛️ REAL VALUE BACKING</h3>
            <p className={pClass}>Every token backed by real assets.<br />No empty promises here!</p>
          </div>
          <div>
            <h3 className={h3Class}>💸 MULTIPLE MONEY STREAMS</h3>
            <p className={pClass}>Not just another one-trick DeFi pony.</p>
          </div>
          <div>
            <h3 className={h3Class}>🧠 STRATEGY &gt; CAPITAL</h3>
            <p className={pClass}>Smart players can outperform big wallets.<br />Brain beats bank!</p>
          </div>
        </div>
      </section>

      <div className={divider} />

      {/* JOIN THE REALM */}
      <section className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h2 className={h2Class}>JOIN THE REALM</h2>
        <div className={`mb-4 text-xl md:text-2xl text-turquoise/80 ${retroText}`}>WHERE TRADERS BECOME LEGENDS</div>
        <div className="flex flex-wrap justify-center gap-4 my-4">
          <a href="#" className={linkClass}>Discord</a>
          <a href="#" className={linkClass}>Twitter</a>
          <a href="#" className={linkClass}>Telegram</a>
        </div>
      </section>

      <div className={divider} />

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center py-8 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <a href="#" className="text-turquoise/80 hover:underline font-bold text-lg">Docs</a>
          <span className="text-lavender/40">•</span>
          <a href="#" className="text-turquoise/80 hover:underline font-bold text-lg">How to Play</a>
          <span className="text-lavender/40">•</span>
          <a href="#" className="text-turquoise/80 hover:underline font-bold text-lg">FAQ</a>
        </div>
        <p className={`text-lavender/60 ${retroText}`}>© 2025 RealmFinance</p>
      </footer>
    </div>
  );
};

export default LandingPage;
