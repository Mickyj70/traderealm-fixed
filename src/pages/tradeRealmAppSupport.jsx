/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  X,
  Menu,
  FileText,
  Castle,
  Coins,
  Map,
  Trophy,
  Users,
  Globe,
  CreditCard,
  ChevronUp,
  ChevronDown,
  Star,
  Award,
  CheckCircle,
  Sparkles,
  Gift,
} from "lucide-react";

// Main App Component
const TradeRealmAppSupport = () => {
  const [activeRoute, setActiveRoute] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [animateMap, setAnimateMap] = useState(true);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [controlAmount, setControlAmount] = useState("");
  const [tariffRate, setTariffRate] = useState(5);
  const [activeView, setActiveView] = useState("routes");
  const [selectedTier, setSelectedTier] = useState(null);

  // Routes data from the documentation
  const routes = [
    {
      id: "silk-road",
      name: "The Silk Road",
      type: "High-risk, high-reward commodity route",
      regions: "Eastern Asia to Mediterranean",
      features: [
        'Random "Caravan Discovery" events that can boost yields by 20-100%',
      ],
      minStake: "5,000 $BARON",
      color: "#E6A817",
      position: { x: 30, y: 30 },
      pixelIcon: "🏯",
      currentTariff: "6.5%",
      controlledBy: "You (45%)",
    },
    {
      id: "wall-street",
      name: "Wall Street",
      type: "Financial services route",
      regions: "North American markets",
      features: ['"Bull Market" bonus during uptrends'],
      minStake: "7,500 $BARON",
      color: "#2E7D32",
      position: { x: 20, y: 40 },
      pixelIcon: "🏙️",
      currentTariff: "8.2%",
      controlledBy: "BaronSatoshi (62%)",
    },
    {
      id: "city-of-london",
      name: "The City of London",
      type: "Premium financial route",
      regions: "European markets to global exchanges",
      features: ['"Gentlemen\'s Agreement" for special alliances'],
      minStake: "8,000 $BARON",
      color: "#1565C0",
      position: { x: 50, y: 20 },
      pixelIcon: "🏛️",
      currentTariff: "7.8%",
      controlledBy: "Multiple Barons",
    },
    {
      id: "lujiazui",
      name: "Lujiazui",
      type: "Emerging market financial route",
      regions: "Asian manufacturing to global markets",
      features: ['"Growth Market" with increasing volume'],
      minStake: "6,000 $BARON",
      color: "#D32F2F",
      position: { x: 75, y: 30 },
      pixelIcon: "🌃",
      currentTariff: "5.4%",
      controlledBy: "TradeKing (51%)",
    },
    {
      id: "white-house",
      name: "The White House",
      type: "Ultra-premium political/economic route",
      regions: "Global",
      features: ['"Executive Privilege" for more frequent tariff adjustments'],
      minStake: "15,000 $BARON",
      color: "#7B1FA2",
      position: { x: 40, y: 50 },
      pixelIcon: "🏛️",
      premium: true,
      currentTariff: "12.3%",
      controlledBy: "Founder's Pass Only",
    },
  ];

  // Toggle route details
  const handleRouteClick = (route) => {
    setActiveRoute(activeRoute?.id === route.id ? null : route);
  };

  // Handle control amount input
  const handleControlAmountChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setControlAmount(value);
  };

  // Handle tariff rate change
  const handleTariffIncrease = () => {
    if (tariffRate < 20) {
      setTariffRate(tariffRate + 0.5);
    }
  };

  const handleTariffDecrease = () => {
    if (tariffRate > 1) {
      setTariffRate(tariffRate - 0.5);
    }
  };

  // Close all modals when clicking overlay
  const closeAllModals = () => {
    setShowControlModal(false);
    setShowTariffModal(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-white bg-black">
      {/* Header */}
      <header className="z-40 flex items-center justify-between p-4 bg-indigo-900 border-b-4 border-indigo-700">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 transition-all rounded-md hover:bg-indigo-800"
          >
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold tracking-wider text-yellow-400 md:text-2xl">
            TradeRealm
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden px-4 py-2 font-semibold text-black bg-yellow-600 rounded-md md:flex">
            <Coins className="mr-2" size={18} />
            <span>10,250 $BARON</span>
          </div>
          <button className="px-4 py-2 font-semibold transition-all bg-purple-700 rounded-md hover:bg-purple-600">
            Connect Wallet
          </button>
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        {/* Overlay when sidebar is visible on mobile */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`bg-indigo-950 border-r-4 border-indigo-800 w-64 flex-shrink-0 transition-all ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 absolute md:relative h-full z-30`}
        >
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 transition-all rounded-md hover:bg-indigo-800"
                >
                  <Castle size={20} />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    activeView === "routes"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  } transition-all`}
                  onClick={() => setActiveView("routes")}
                >
                  <Map size={20} />
                  <span>Trade Routes</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 transition-all rounded-md hover:bg-indigo-800"
                >
                  <Coins size={20} />
                  <span>Stake $BARON</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 transition-all rounded-md hover:bg-indigo-800"
                >
                  <CreditCard size={20} />
                  <span>Import Licenses</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 transition-all rounded-md hover:bg-indigo-800"
                >
                  <Trophy size={20} />
                  <span>Trade Wars</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 transition-all rounded-md hover:bg-indigo-800"
                >
                  <Users size={20} />
                  <span>Alliances</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    activeView === "supporters"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  } transition-all`}
                  onClick={() => setActiveView("supporters")}
                >
                  <span className="relative">
                    <span className="absolute flex w-3 h-3 -top-1 -right-1">
                      <span className="absolute inline-flex w-full h-full bg-yellow-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="relative inline-flex w-3 h-3 bg-yellow-500 rounded-full"></span>
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 1v4M4.93 6.5l2.83 2.83M1 12h4M4.93 17.5l2.83-2.83M12 23v-4M19.07 17.5l-2.83-2.83M23 12h-4M19.07 6.5l-2.83 2.83" />
                    </svg>
                  </span>
                  <span>Early Supporters</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 transition-all rounded-md hover:bg-indigo-800"
                >
                  <FileText size={20} />
                  <span>Docs</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Stats in sidebar */}
          <div className="p-4 mx-4 mt-4 bg-indigo-900 rounded-md">
            <h3 className="mb-2 font-semibold text-yellow-400">Your Empire</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Staked $BARON:</span>
                <span className="font-mono">8,750</span>
              </div>
              <div className="flex justify-between">
                <span>Routes Controlled:</span>
                <span className="font-mono">2</span>
              </div>
              <div className="flex justify-between">
                <span>Daily Yield:</span>
                <span className="font-mono text-green-400">+324 $BARON</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-hidden">
          {activeView === "routes" && (
            /* 3D Pixel Map */
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-900 to-indigo-950">
              {/* Animated pixel grid */}
              <div
                className={`pixel-grid ${animateMap ? "animate-pulse" : ""}`}
              ></div>

              {/* Route paths - animated lines connecting the routes */}
              <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                {routes.map((route, i) =>
                  routes
                    .slice(i + 1)
                    .map((target, j) => (
                      <line
                        key={`${route.id}-${target.id}`}
                        x1={`${route.position.x}%`}
                        y1={`${route.position.y}%`}
                        x2={`${target.position.x}%`}
                        y2={`${target.position.y}%`}
                        stroke={`${route.color}50`}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="route-path"
                      />
                    ))
                )}
              </svg>

              {/* Route Nodes */}
              {routes.map((route) => (
                <div
                  key={route.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20
                             ${
                               activeRoute?.id === route.id
                                 ? "scale-125"
                                 : "hover:scale-110"
                             }`}
                  style={{
                    left: `${route.position.x}%`,
                    top: `${route.position.y}%`,
                  }}
                  onClick={() => handleRouteClick(route)}
                >
                  {/* Node */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center bg-indigo-900 border-2 border-indigo-600 rounded-md shadow-lg ${
                      route.premium ? "bg-purple-900 border-purple-600" : ""
                    }`}
                  >
                    <span className="text-2xl">{route.pixelIcon}</span>
                    <div className="absolute w-1 h-1 transform -translate-x-1/2 bg-blue-500 rounded-full -bottom-1 left-1/2 animate-pulse"></div>
                  </div>

                  {/* Node Label */}
                  <div className="absolute px-2 py-1 mt-2 text-xs font-semibold transform -translate-x-1/2 border border-indigo-700 rounded top-full left-1/2 bg-indigo-950 whitespace-nowrap">
                    {route.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeView === "supporters" && (
            <div className="absolute inset-0 w-full h-full overflow-auto bg-gradient-to-b from-purple-900 to-indigo-950">
              <div className="max-w-5xl px-4 py-8 mx-auto">
                {/* Header with sparkling effects */}
                <div className="relative mb-8 text-center">
                  <h2 className="mb-2 text-3xl font-bold text-yellow-400">
                    Early Supporter Program
                  </h2>
                  <p className="text-lg text-blue-200">
                    Join the founding community of Trade Barons!
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute text-yellow-500 -top-4 left-1/4 animate-pulse">
                    ✨
                  </div>
                  <div
                    className="absolute top-0 text-yellow-500 right-1/4 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  >
                    ✨
                  </div>
                  <div
                    className="absolute text-yellow-500 top-8 left-1/3 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  >
                    ✨
                  </div>
                  <div
                    className="absolute text-yellow-500 -bottom-4 right-1/3 animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  >
                    ✨
                  </div>
                </div>

                {/* Intro section */}
                <div className="p-6 mb-8 bg-indigo-900 border-2 border-indigo-700 rounded-lg bg-opacity-70">
                  <div className="flex items-start">
                    <Gift
                      className="flex-shrink-0 mr-4 text-yellow-400"
                      size={36}
                    />
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-yellow-400">
                        Shape the Future of Realm Finance!
                      </h3>
                      <p className="mb-4 text-blue-200">
                        Early explorers don't just get better rewards - they
                        help shape the world! From naming trade routes to
                        suggesting future features, our founding Barons are
                        writing the first chapters of this story together.
                      </p>
                      <div className="flex justify-center mt-6">
                        <button className="px-6 py-3 font-bold text-black transition-transform transform rounded-md bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105 hover:shadow-glow">
                          Join the Testnet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tier Selection */}
                <h3 className="mb-4 text-xl font-bold text-center text-yellow-400">
                  Tiered Benefits System
                </h3>
                <p className="mb-6 text-center text-blue-200">
                  Your rewards scale with your early participation - choose your
                  adventure level!
                </p>

                <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
                  {/* Diamond Tier */}
                  <div
                    className={`relative bg-indigo-900 bg-opacity-70 rounded-lg border-2 ${
                      selectedTier === "diamond"
                        ? "border-yellow-400 shadow-glow"
                        : "border-indigo-700"
                    } p-4 cursor-pointer transition-all hover:shadow-lg`}
                    onClick={() => setSelectedTier("diamond")}
                  >
                    <div className="absolute -top-3 -right-3">
                      <div className="p-1 bg-indigo-800 rounded-full">
                        <Sparkles size={20} className="text-blue-200" />
                      </div>
                    </div>
                    <div className="mb-3 text-center">
                      <div className="inline-block p-2 bg-blue-900 rounded-full">
                        <span className="text-3xl">💎</span>
                      </div>
                      <h4 className="mt-2 text-lg font-bold text-blue-200">
                        Diamond Tier
                      </h4>
                    </div>
                    <div className="text-sm text-blue-300">
                      <p className="mb-1 font-semibold">Qualification:</p>
                      <p className="mb-2">
                        Large presale participants + active testnet users (top
                        5%)
                      </p>
                      <p className="mb-1 font-semibold">Key Benefits:</p>
                      <ul className="list-disc list-inside">
                        <li>20% bonus APY (90 days)</li>
                        <li>15% reduced stake requirements</li>
                        <li>Private strategy sessions</li>
                      </ul>
                    </div>
                  </div>

                  {/* Gold Tier */}
                  <div
                    className={`relative bg-indigo-900 bg-opacity-70 rounded-lg border-2 ${
                      selectedTier === "gold"
                        ? "border-yellow-400 shadow-glow"
                        : "border-indigo-700"
                    } p-4 cursor-pointer transition-all hover:shadow-lg`}
                    onClick={() => setSelectedTier("gold")}
                  >
                    <div className="mb-3 text-center">
                      <div className="inline-block p-2 bg-blue-900 rounded-full">
                        <span className="text-3xl">🏆</span>
                      </div>
                      <h4 className="mt-2 text-lg font-bold text-blue-200">
                        Gold Tier
                      </h4>
                    </div>
                    <div className="text-sm text-blue-300">
                      <p className="mb-1 font-semibold">Qualification:</p>
                      <p className="mb-2">
                        Medium presale participants + regular testnet users
                        (next 15%)
                      </p>
                      <p className="mb-1 font-semibold">Key Benefits:</p>
                      <ul className="list-disc list-inside">
                        <li>15% bonus APY (60 days)</li>
                        <li>10% reduced stake requirements</li>
                        <li>Early feature access (7 days)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Silver Tier */}
                  <div
                    className={`relative bg-indigo-900 bg-opacity-70 rounded-lg border-2 ${
                      selectedTier === "silver"
                        ? "border-yellow-400 shadow-glow"
                        : "border-indigo-700"
                    } p-4 cursor-pointer transition-all hover:shadow-lg`}
                    onClick={() => setSelectedTier("silver")}
                  >
                    <div className="mb-3 text-center">
                      <div className="inline-block p-2 bg-blue-900 rounded-full">
                        <span className="text-3xl">🥈</span>
                      </div>
                      <h4 className="mt-2 text-lg font-bold text-blue-200">
                        Silver Tier
                      </h4>
                    </div>
                    <div className="text-sm text-blue-300">
                      <p className="mb-1 font-semibold">Qualification:</p>
                      <p className="mb-2">
                        Small presale participants or active testnet users (next
                        30%)
                      </p>
                      <p className="mb-1 font-semibold">Key Benefits:</p>
                      <ul className="list-disc list-inside">
                        <li>10% bonus APY (30 days)</li>
                        <li>5% reduced stake requirements</li>
                        <li>Early feature notifications</li>
                      </ul>
                    </div>
                  </div>

                  {/* Bronze Tier */}
                  <div
                    className={`relative bg-indigo-900 bg-opacity-70 rounded-lg border-2 ${
                      selectedTier === "bronze"
                        ? "border-yellow-400 shadow-glow"
                        : "border-indigo-700"
                    } p-4 cursor-pointer transition-all hover:shadow-lg`}
                    onClick={() => setSelectedTier("bronze")}
                  >
                    <div className="mb-3 text-center">
                      <div className="inline-block p-2 bg-blue-900 rounded-full">
                        <span className="text-3xl">🥉</span>
                      </div>
                      <h4 className="mt-2 text-lg font-bold text-blue-200">
                        Bronze Tier
                      </h4>
                    </div>
                    <div className="text-sm text-blue-300">
                      <p className="mb-1 font-semibold">Qualification:</p>
                      <p className="mb-2">
                        Any presale participant or testnet user (remaining 50%)
                      </p>
                      <p className="mb-1 font-semibold">Key Benefits:</p>
                      <ul className="list-disc list-inside">
                        <li>5% bonus APY (14 days)</li>
                        <li>Special profile badge</li>
                        <li>Early supporter recognition</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Selected Tier Details */}
                {selectedTier && (
                  <div className="p-6 mb-8 bg-indigo-800 border-2 border-indigo-600 rounded-lg animate-fadeIn">
                    <h3 className="mb-4 text-xl font-bold text-yellow-400">
                      {selectedTier === "diamond" && "Diamond Tier Details"}
                      {selectedTier === "gold" && "Gold Tier Details"}
                      {selectedTier === "silver" && "Silver Tier Details"}
                      {selectedTier === "bronze" && "Bronze Tier Details"}
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="p-4 bg-indigo-900 rounded-md">
                        <div className="flex items-center mb-3">
                          <Trophy className="mr-2 text-yellow-400" size={20} />
                          <h4 className="font-bold text-blue-200">
                            Staking Rewards
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm text-blue-300">
                          {selectedTier === "diamond" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  20% bonus on initial staking APY for 90 days
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>Priority rebase processing</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Bonus yield multiplier during Trade Wars
                                </span>
                              </li>
                            </>
                          )}
                          {selectedTier === "gold" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  15% bonus on initial staking APY for 60 days
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Enhanced rebase rates during peak hours
                                </span>
                              </li>
                            </>
                          )}
                          {selectedTier === "silver" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  10% bonus on initial staking APY for 30 days
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>Special weekend boost events</span>
                              </li>
                            </>
                          )}
                          {selectedTier === "bronze" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  5% bonus on initial staking APY for 14 days
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>One-time bonus reward event</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

                      <div className="p-4 bg-indigo-900 rounded-md">
                        <div className="flex items-center mb-3">
                          <Map className="mr-2 text-yellow-400" size={20} />
                          <h4 className="font-bold text-blue-200">
                            Trade Route Benefits
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm text-blue-300">
                          {selectedTier === "diamond" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  15% reduction on minimum stake requirements
                                  for all routes
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  First access to new trade routes (14-day
                                  exclusivity)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Ability to name one seasonal trade route
                                </span>
                              </li>
                            </>
                          )}
                          {selectedTier === "gold" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  10% reduction on minimum stake requirements
                                  for standard routes
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Early access to new trade routes (7 days)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>Random route discovery bonuses</span>
                              </li>
                            </>
                          )}
                          {selectedTier === "silver" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  5% reduction on minimum stake requirements for
                                  standard routes
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Special route events with bonus yields
                                </span>
                              </li>
                            </>
                          )}
                          {selectedTier === "bronze" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Access to special "Newcomer's Route" for first
                                  30 days
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>One-time route control boost</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

                      <div className="p-4 bg-indigo-900 rounded-md">
                        <div className="flex items-center mb-3">
                          <Users className="mr-2 text-yellow-400" size={20} />
                          <h4 className="font-bold text-blue-200">
                            Community & Governance
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm text-blue-300">
                          {selectedTier === "diamond" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Exclusive access to private Telegram strategy
                                  sessions
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Monthly roundtable discussions with core team
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>Diamond supporter badge and NFT</span>
                              </li>
                            </>
                          )}
                          {selectedTier === "gold" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>Enhanced in-app analytics features</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Quarterly strategy sessions with the team
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>Gold supporter badge</span>
                              </li>
                            </>
                          )}
                          {selectedTier === "silver" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Early notification of upcoming features and
                                  events
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>Silver supporter badge</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Enhanced voting power (1.5x) for first 3
                                  months
                                </span>
                              </li>
                            </>
                          )}
                          {selectedTier === "bronze" && (
                            <>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Special profile badge in app and Telegram
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Access to early supporter community channels
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle
                                  className="flex-shrink-0 mt-1 mr-2 text-green-400"
                                  size={16}
                                />
                                <span>
                                  Voting power boost on first proposal
                                </span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button className="px-6 py-3 font-bold text-black transition-transform transform rounded-md bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105 hover:shadow-glow">
                        {selectedTier === "diamond" && "Apply for Diamond Tier"}
                        {selectedTier === "gold" && "Reserve Gold Tier Spot"}
                        {selectedTier === "silver" && "Join Silver Tier"}
                        {selectedTier === "bronze" && "Secure Bronze Tier"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Point System */}
                <div className="p-6 mb-8 bg-indigo-900 border-2 border-indigo-700 rounded-lg bg-opacity-70">
                  <h3 className="mb-4 text-xl font-bold text-yellow-400">
                    Point System: Earn Your Way Up!
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="p-4 bg-indigo-800 rounded-md">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-blue-900 rounded-full">
                          🎯
                        </div>
                        <h4 className="font-bold text-blue-200">
                          Activity Points
                        </h4>
                      </div>
                      <ul className="space-y-2 text-sm text-blue-300">
                        <li>• Daily login streaks (5pts/day)</li>
                        <li>• Testnet transactions (10pts each)</li>
                        <li>• Completing challenges (25pts each)</li>
                        <li>• Trading volume (1pt per 100 $BARON)</li>
                        <li>• Route management (15pts/day)</li>
                      </ul>
                      <div className="h-3 mt-4 overflow-hidden bg-indigo-900 rounded-full">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-right text-blue-300">
                        65/100 points
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-800 rounded-md">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-blue-900 rounded-full">
                          🧠
                        </div>
                        <h4 className="font-bold text-blue-200">
                          Quality Points
                        </h4>
                      </div>
                      <ul className="space-y-2 text-sm text-blue-300">
                        <li>• Bug reports (50pts each)</li>
                        <li>• Feature suggestions (25pts if implemented)</li>
                        <li>• Documentation help (30pts per section)</li>
                        <li>• Interface feedback (15pts per item)</li>
                        <li>• Strategy sharing (20pts per strategy)</li>
                      </ul>
                      <div className="h-3 mt-4 overflow-hidden bg-indigo-900 rounded-full">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-right text-blue-300">
                        40/100 points
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-800 rounded-md">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-blue-900 rounded-full">
                          👥
                        </div>
                        <h4 className="font-bold text-blue-200">
                          Community Points
                        </h4>
                      </div>
                      <ul className="space-y-2 text-sm text-blue-300">
                        <li>• Referrals (50pts per active user)</li>
                        <li>• Helping others (15pts per instance)</li>
                        <li>• Creating content (75pts per piece)</li>
                        <li>• Community events (30pts per event)</li>
                        <li>• Social media engagement (5pts per action)</li>
                      </ul>
                      <div className="h-3 mt-4 overflow-hidden bg-indigo-900 rounded-full">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-right text-blue-300">
                        25/100 points
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="mb-4 text-blue-200">
                      Your current tier projection based on points:{" "}
                      <span className="font-bold text-yellow-400">
                        Silver Tier
                      </span>
                    </p>
                    <div className="h-4 max-w-lg mx-auto overflow-hidden bg-indigo-800 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-yellow-500 to-yellow-300"
                        style={{ width: "43%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between max-w-lg mx-auto mt-1 text-xs text-blue-300">
                      <span>Bronze</span>
                      <span>Silver</span>
                      <span>Gold</span>
                      <span>Diamond</span>
                    </div>
                  </div>
                </div>

                {/* Governance Access */}
                <div className="p-6 mb-8 bg-indigo-900 border-2 border-indigo-700 rounded-lg bg-opacity-70">
                  <h3 className="mb-4 text-xl font-bold text-yellow-400">
                    Community Governance Access
                  </h3>
                  <p className="mb-4 text-blue-200">
                    Early supporters get a louder voice in shaping the Realm's
                    future!
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="p-4 bg-indigo-800 rounded-md">
                      <div className="flex items-center mb-3">
                        <Trophy className="mr-2 text-yellow-400" size={20} />
                        <h4 className="font-bold text-blue-200">
                          Proposal Rights
                        </h4>
                      </div>
                      <p className="text-sm text-blue-300">
                        Lower thresholds for submitting governance proposals -
                        your ideas matter! Early supporters can submit proposals
                        with as little as 500 $BARON compared to the standard
                        2,500.
                      </p>
                    </div>

                    <div className="p-4 bg-indigo-800 rounded-md">
                      <div className="flex items-center mb-3">
                        <Award className="mr-2 text-yellow-400" size={20} />
                        <h4 className="font-bold text-blue-200">
                          Voting Power
                        </h4>
                      </div>
                      <p className="text-sm text-blue-300">
                        Weighted voting multiplier during the first 6 months -
                        your vote counts more! Diamond tier supporters get 2.5x
                        voting power, with Gold (2x), Silver (1.5x) and Bronze
                        (1.25x) tiers following.
                      </p>
                    </div>

                    <div className="p-4 bg-indigo-800 rounded-md">
                      <div className="flex items-center mb-3">
                        <Users className="mr-2 text-yellow-400" size={20} />
                        <h4 className="font-bold text-blue-200">
                          Direct Access
                        </h4>
                      </div>
                      <p className="text-sm text-blue-300">
                        Monthly roundtable discussions with the core team - talk
                        to the architects! Diamond and Gold tier supporters get
                        invited to exclusive strategy sessions where key
                        protocol decisions are discussed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <h3 className="mb-4 text-xl font-bold text-yellow-400">
                    Ready to Shape the Future?
                  </h3>
                  <p className="mb-6 text-blue-200">
                    Join our testnet today and secure your place in Realm
                    Finance history!
                  </p>
                  <button className="px-8 py-4 font-bold text-white transition-transform transform rounded-md shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:shadow-glow">
                    Register for Testnet
                  </button>
                  <div className="mt-4 text-sm text-blue-300">
                    Limited spots available. Testnet starts in:{" "}
                    <span className="font-mono text-yellow-400">
                      2d 14h 35m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Route Detail Panel */}
          {activeRoute && (
            <div className="absolute z-30 p-4 bg-indigo-900 border-4 border-indigo-700 rounded-md shadow-lg bottom-4 right-4 w-72">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-yellow-400">
                  {activeRoute.name}
                </h3>
                <button
                  onClick={() => setActiveRoute(null)}
                  className="p-1 rounded-md hover:bg-indigo-800"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="block font-semibold">Type:</span>
                  <span className="text-blue-300">{activeRoute.type}</span>
                </div>
                <div>
                  <span className="block font-semibold">Regions:</span>
                  <span className="text-blue-300">{activeRoute.regions}</span>
                </div>
                <div>
                  <span className="block font-semibold">Features:</span>
                  <ul className="text-blue-300 list-disc list-inside">
                    {activeRoute.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-semibold">Min. Stake:</span>
                  <span className="ml-2 text-yellow-400">
                    {activeRoute.minStake}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Current Tariff:</span>
                  <span className="ml-2 text-green-400">
                    {activeRoute.currentTariff}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Controlled By:</span>
                  <span className="ml-2 text-blue-300">
                    {activeRoute.controlledBy}
                  </span>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    className="w-full py-2 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                    onClick={() => setShowControlModal(true)}
                  >
                    Control Route
                  </button>
                  <button
                    className="w-full py-2 font-semibold transition-all bg-blue-700 rounded-md hover:bg-blue-600"
                    onClick={() => setShowTariffModal(true)}
                  >
                    Set Tariffs
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === "routes" && (
            <>
              {/* Map Controls */}
              <div className="absolute z-20 flex gap-2 top-4 right-4">
                <button
                  className="p-2 bg-indigo-800 rounded-md hover:bg-indigo-700"
                  onClick={() => setAnimateMap(!animateMap)}
                >
                  <Globe size={20} />
                </button>
              </div>

              {/* Legend */}
              <div className="absolute z-20 p-3 bg-indigo-900 border-2 border-indigo-700 rounded-md bottom-4 left-4">
                <h4 className="mb-2 text-sm font-semibold">Routes Legend</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span>Financial Routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <span>Commodity Routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <span>Premium Routes</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Modal Overlay */}
          {(showControlModal || showTariffModal) && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
              onClick={closeAllModals}
            >
              {/* Control Route Modal */}
              {showControlModal && (
                <div
                  className="w-full max-w-md p-6 mx-4 bg-indigo-900 border-4 border-indigo-700 rounded-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-yellow-400">
                      Control {activeRoute?.name}
                    </h3>
                    <button
                      onClick={() => setShowControlModal(false)}
                      className="p-1 rounded-md hover:bg-indigo-800"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Current Control:</span>
                        <span className="text-sm">
                          {activeRoute?.controlledBy}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">
                        $BARON to Deploy
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={controlAmount}
                          onChange={handleControlAmountChange}
                          className="flex-1 p-2 font-mono border-2 border-indigo-700 bg-indigo-950 rounded-l-md"
                          placeholder="0"
                        />
                        <button
                          className="px-3 py-2 font-semibold bg-indigo-700 rounded-r-md"
                          onClick={() => setControlAmount("5000")}
                        >
                          MAX
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-800 rounded-md">
                      <div className="mb-2 text-sm">Deployment Summary</div>
                      <div className="flex justify-between text-sm">
                        <span>Required Min. Stake:</span>
                        <span>{activeRoute?.minStake}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Your Available $BARON:</span>
                        <span>10,250</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Est. Control After Deployment:</span>
                        <span className="text-green-400">
                          {controlAmount
                            ? `${Math.min(
                                Math.round(
                                  (parseInt(controlAmount) /
                                    (parseInt(controlAmount) + 5000)) *
                                    100
                                ),
                                100
                              )}%`
                            : "0%"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Est. Daily Revenue:</span>
                        <span className="text-green-400">
                          {controlAmount
                            ? `+${Math.round(
                                parseInt(controlAmount) * 0.01
                              )} $BARON`
                            : "+0 $BARON"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        className="w-full py-3 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                        disabled={
                          !controlAmount ||
                          parseInt(controlAmount) <
                            parseInt(
                              activeRoute?.minStake.replace(/[^0-9]/g, "")
                            )
                        }
                        onClick={() => {
                          // Handle route control logic here
                          setShowControlModal(false);
                        }}
                      >
                        {!controlAmount ||
                        parseInt(controlAmount) <
                          parseInt(activeRoute?.minStake.replace(/[^0-9]/g, ""))
                          ? `Min ${activeRoute?.minStake} Required`
                          : "Deploy $BARON to Route"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Set Tariffs Modal */}
              {showTariffModal && (
                <div
                  className="w-full max-w-md p-6 mx-4 bg-indigo-900 border-4 border-indigo-700 rounded-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-yellow-400">
                      Set Tariffs for {activeRoute?.name}
                    </h3>
                    <button
                      onClick={() => setShowTariffModal(false)}
                      className="p-1 rounded-md hover:bg-indigo-800"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Current Tariff:</span>
                        <span className="text-sm text-green-400">
                          {activeRoute?.currentTariff}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">
                        New Tariff Rate
                      </label>
                      <div className="flex items-center">
                        <button
                          className="p-2 bg-indigo-700 hover:bg-indigo-600 rounded-l-md"
                          onClick={handleTariffDecrease}
                        >
                          <ChevronDown size={20} />
                        </button>
                        <div className="flex-1 py-2 text-xl font-bold text-center text-green-400 bg-indigo-950">
                          {tariffRate.toFixed(1)}%
                        </div>
                        <button
                          className="p-2 bg-indigo-700 hover:bg-indigo-600 rounded-r-md"
                          onClick={handleTariffIncrease}
                        >
                          <ChevronUp size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-800 rounded-md">
                      <div className="mb-2 text-sm">Tariff Impact Analysis</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Transaction Volume:</span>
                          <span
                            className={
                              tariffRate > 7 ? "text-red-400" : "text-green-400"
                            }
                          >
                            {tariffRate > 12
                              ? "Very Low"
                              : tariffRate > 9
                              ? "Low"
                              : tariffRate > 7
                              ? "Medium"
                              : tariffRate > 5
                              ? "High"
                              : "Very High"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Revenue per Transaction:</span>
                          <span
                            className={
                              tariffRate < 5 ? "text-red-400" : "text-green-400"
                            }
                          >
                            {tariffRate > 12
                              ? "Very High"
                              : tariffRate > 9
                              ? "High"
                              : tariffRate > 7
                              ? "Medium"
                              : tariffRate > 5
                              ? "Low"
                              : "Very Low"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Route Efficiency:</span>
                          <span
                            className={
                              tariffRate >= 4 && tariffRate <= 10
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {tariffRate > 15
                              ? "Poor"
                              : tariffRate > 10
                              ? "Suboptimal"
                              : tariffRate >= 4 && tariffRate <= 10
                              ? "Optimal"
                              : "Suboptimal"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        className="w-full py-3 font-semibold transition-all bg-blue-700 rounded-md hover:bg-blue-600"
                        onClick={() => {
                          // Handle tariff setting logic here
                          setShowTariffModal(false);
                        }}
                      >
                        Propose New Tariff Rate
                      </button>
                      <div className="mt-2 text-xs text-center opacity-70">
                        Your control level gives you{" "}
                        {activeRoute?.id === "silk-road" ? "45%" : "0%"} voting
                        power on tariff rates
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Global Stats Bar */}
      <footer className="z-40 flex items-center justify-between p-2 bg-indigo-900 border-t-4 border-indigo-700">
        <div className="flex items-center gap-4">
          <div className="text-xs md:text-sm">
            <span className="mr-1 opacity-70">Treasury:</span>
            <span className="font-mono">$2,450,831</span>
          </div>
          <div className="text-xs md:text-sm">
            <span className="mr-1 opacity-70">Backing:</span>
            <span className="font-mono">$1.15/BARON</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <Trophy size={16} className="text-yellow-400" />
            <span>
              Trade War:{" "}
              <span className="font-bold text-red-400">3d 17h 22m</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Add some basic styles for the map elements */}
      <style jsx>{`
        .pixel-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 40px 40px;
          background-image: linear-gradient(
              to right,
              rgba(30, 64, 175, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(30, 64, 175, 0.1) 1px,
              transparent 1px
            );
        }

        .route-path {
          strokedasharray: 5;
          animation: dash 20s linear infinite;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: 20;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .shadow-glow {
          box-shadow: 0 0 15px rgba(236, 201, 75, 0.5);
        }
      `}</style>
    </div>
  );
};

export default TradeRealmAppSupport;
