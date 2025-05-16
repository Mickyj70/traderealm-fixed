/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
  Shield,
  Sword,
  Crown,
  Target,
  Bell,
  Clock,
  BarChart,
  Star,
  Award,
  CheckCircle,
  Sparkles,
  Gift,
} from "lucide-react";
import PresalePage from "./presale/Presale-page";
import ImportLicensesPage from "../components/presale/licenses";
// import WarRoomComponent from "../components/presale/warroom";
import TradeWarComponent from "./tradewars";
import AlliancesPage from "../components/presale/alliances";

// Main App Component
const Dapp = () => {
  const [activeRoute, setActiveRoute] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [animateMap, setAnimateMap] = useState(true);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [showStakingModal, setShowStakingModal] = useState(false);
  const [showTradeWarModal, setShowTradeWarModal] = useState(false);
  const [showAllianceModal, setShowAllianceModal] = useState(false);
  const [controlAmount, setControlAmount] = useState("");
  const [tariffRate, setTariffRate] = useState(5);
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState("routes");
  const [selectedTier, setSelectedTier] = useState(null);
  const [tradeWarCountdown, setTradeWarCountdown] = useState(
    3 * 24 * 60 * 60 + 17 * 60 * 60 + 22 * 60
  );

  // Countdown timer for Trade War
  useEffect(() => {
    const timer = setInterval(() => {
      setTradeWarCountdown((prev) => {
        if (prev <= 0) return 7 * 24 * 60 * 60; // Reset to 7 days
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format countdown time
  const formatCountdown = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Handle stake amount input
  const handleStakeAmountChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setStakeAmount(value);
  };

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

  // Alliance routes data
  const allianceRoutes = [
    {
      id: "shadow-network",
      name: "Shadow Network",
      type: "Specialized luxury goods route",
      regions: "Global",
      features: [
        "20% higher base transaction volume",
        '"Shadow Market" mechanic during Trade Wars',
        "Hidden transactions with 3x returns during special events",
      ],
      minStake: "3,500 $BARON",
      accessRequirement: "1,000+ $SHADOW tokens",
      color: "#2D2D2D",
      position: { x: 65, y: 65 },
      pixelIcon: "🕸️",
      currentTariff: "9.2%",
      controlledBy: "Alliance Members",
    },

    {
      id: "derp-guild",
      name: "DERP Guild Expeditions",
      type: "Exotic/discovery route",
      regions: "Unexplored territories",
      features: [
        'Random "Discovery Events" with up to 3x yield multipliers',
        '"DERP Diplomacy" for special alliances',
        "Surprise rewards through idle-game mechanics",
      ],
      minStake: "3,000 $BARON",
      accessRequirement: "At least one DERP NFT",
      color: "#8E24AA",
      position: { x: 15, y: 70 },
      pixelIcon: "🧭",
      currentTariff: "5.8%",
      controlledBy: "Alliance Members",
    },
  ];

  // Trade war zones data
  const tradeWarZones = [
    {
      id: "disputed-peninsula",
      name: "Disputed Peninsula",
      type: "High-value contested zone",
      regions: "Southeastern trade junction",
      features: [
        "3x rewards during occupation",
        "Strategic position affecting 3 routes",
      ],
      currentControl: "Contested",
      position: { x: 60, y: 40 },
      pixelIcon: "⚔️",
      status: "active",
    },
    {
      id: "golden-strait",
      name: "Golden Strait",
      type: "Naval checkpoint",
      regions: "Maritime passage",
      features: ["Toll collection from passing routes", "Naval trade bonuses"],
      currentControl: "TradeKing Alliance",
      position: { x: 25, y: 55 },
      pixelIcon: "🌊",
      status: "active",
    },
    {
      id: "merchant-haven",
      name: "Merchant Haven",
      type: "Commerce hub",
      regions: "Central market nexus",
      features: ["Tax-free trading", "Market intelligence bonuses"],
      currentControl: "Your Alliance",
      position: { x: 45, y: 35 },
      pixelIcon: "🏪",
      status: "active",
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
    setShowStakingModal(false);
    setShowTradeWarModal(false);

    setShowAllianceModal(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-white bg-gradient-to-b from-[#1B0036] to-[#1A1135]">
      {/* Header */}
      <header className="z-40 flex items-center justify-between p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-b-2 border-[#6B46C1]">
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

      <div className="relative flex flex-1 ">
        {/* Overlay when sidebar is visible on mobile */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-r-2 border-[#6B46C1] w-64 flex-shrink-0 transition-all ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 absolute md:relative h-full z-30 overflow-auto`}
        >
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left transition-all ${
                    activeTab === "dashboard"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  }`}
                >
                  <Castle size={20} />
                  <span>Dashboard</span>
                </button>
              </li>

              {/* trade routes  */}
              <li>
                <button
                  onClick={() => setActiveTab("routes")}
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left transition-all ${
                    activeTab === "routes"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  }`}
                >
                  <Map size={20} />
                  <span>Trade Routes</span>
                </button>
              </li>

              {/* presale  */}
              <li>
                <button
                  onClick={() => setActiveTab("presale")}
                  className={`flex w-full items-center gap-3 p-3 rounded-md hover:bg-indigo-800 transition-all ${
                    activeTab === "presale" ? "bg-indigo-700" : ""
                  }`}
                >
                  <CreditCard size={20} />
                  <span className="relative">
                    Presale
                    <span className="absolute flex w-3 h-3 -top-1 -right-2">
                      <span className="absolute inline-flex w-full h-full bg-yellow-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="relative inline-flex w-3 h-3 bg-yellow-500 rounded-full"></span>
                    </span>
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    setActiveTab("stake");
                    setShowStakingModal(true);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left transition-all ${
                    activeTab === "stake"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  }`}
                >
                  <Coins size={20} />
                  <span>Stake $BARON</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("bonds")}
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left transition-all ${
                    activeTab === "bonds"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  }`}
                >
                  <CreditCard size={20} />
                  <span>Import Licenses</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("tradewars")}
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left transition-all ${
                    activeTab === "tradewars"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  }`}
                >
                  <Trophy size={20} />
                  <span>Trade Wars</span>
                  {tradeWarCountdown < 24 * 60 * 60 && (
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("alliances")}
                  className={`flex items-center gap-3 p-3 rounded-md w-full text-left transition-all ${
                    activeTab === "alliances"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  }`}
                >
                  <Users size={20} />
                  <span>Alliances</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("supporters")}
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    activeTab === "supporters"
                      ? "bg-indigo-700"
                      : "hover:bg-indigo-800"
                  } transition-all`}
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
                </button>
              </li>
            </ul>
          </nav>

          {/* Stats in sidebar */}
          <div className="p-4 mx-4 mt-1 bg-indigo-900 rounded-md">
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
          {/* Common Background for all tabs */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1B0036] to-[#1A1135]">
            {/* Animated stars background */}
            <div className="stars"></div>

            {/* Animated pixel grid */}
            <div
              className={`pixel-grid ${animateMap ? "animate-pulse" : ""}`}
            ></div>
          </div>

          {/* Trade Routes Tab */}
          {activeTab === "routes" && (
            <div className="absolute inset-0 w-full h-full">
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
                    className={`route-node ${
                      route.premium ? "premium-route" : ""
                    }`}
                  >
                    <span className="text-2xl">{route.pixelIcon}</span>
                    <div
                      className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-blue-500 rounded-full pulse-animation`}
                    ></div>
                  </div>

                  {/* Node Label */}
                  <div className="absolute px-2 py-1 mt-2 text-xs font-semibold transform -translate-x-1/2 border border-indigo-700 rounded top-full left-1/2 bg-indigo-950 whitespace-nowrap">
                    {route.name}
                  </div>
                </div>
              ))}

              {/* Alliance Routes */}
              {allianceRoutes.map((route) => (
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
                  onClick={() => {
                    setActiveRoute(activeRoute?.id === route.id ? null : route);
                    setShowAllianceModal(true);
                  }}
                >
                  {/* Node */}
                  <div className="route-node alliance-route">
                    <span className="text-2xl">{route.pixelIcon}</span>
                    <div
                      className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-purple-500 rounded-full pulse-animation`}
                    ></div>
                  </div>

                  {/* Node Label */}
                  <div className="absolute px-2 py-1 mt-2 text-xs font-semibold transform -translate-x-1/2 border border-purple-700 rounded top-full left-1/2 bg-indigo-950 whitespace-nowrap">
                    {route.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Trade Wars Tab */}
          {activeTab === "tradewars" && (
            <div className="absolute inset-0 w-full h-full">
              <TradeWarComponent />
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="absolute inset-0 w-full h-full p-6 overflow-auto">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Portfolio Value Card */}
                <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                  <h3 className="mb-4 text-lg font-bold text-yellow-400">
                    Your Portfolio
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Total $BARON:</span>
                      <span className="font-mono text-lg">10,250</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Staked $BARON:</span>
                      <span className="font-mono text-lg">8,750</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deployed to Routes:</span>
                      <span className="font-mono text-lg">5,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Portfolio Value:</span>
                      <span className="font-mono text-lg text-green-400">
                        $11,787.50
                      </span>
                    </div>
                    <div className="h-2 mt-2 overflow-hidden rounded-full bg-indigo-950">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <div className="text-xs text-center opacity-70">
                      85% of your $BARON is actively generating yield
                    </div>
                  </div>
                </div>

                {/* Yield Stats Card */}
                <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                  <h3 className="mb-4 text-lg font-bold text-yellow-400">
                    Yield Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Daily Staking Yield:</span>
                      <span className="font-mono text-green-400">
                        +175 $BARON
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Daily Route Revenue:</span>
                      <span className="font-mono text-green-400">
                        +149 $BARON
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Current APY:</span>
                      <span className="font-mono text-green-400">4,250%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Next Rebase:</span>
                      <span className="font-mono">00:42:18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Treasury Backing:</span>
                      <span className="font-mono">$1.15/BARON</span>
                    </div>
                  </div>
                </div>

                {/* Routes Summary */}
                <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                  <h3 className="mb-4 text-lg font-bold text-yellow-400">
                    Your Trade Routes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🏯</span>
                        <span>The Silk Road</span>
                      </div>
                      <span className="px-2 py-1 text-sm text-green-400 bg-green-900 rounded">
                        45% Control
                      </span>
                    </div>
                    <div className="h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Tariff: 6.5%</span>
                      <span className="text-green-400">+78 $BARON/day</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🏛️</span>
                        <span>The City of London</span>
                      </div>
                      <span className="px-2 py-1 text-sm text-green-400 bg-green-900 rounded">
                        22% Control
                      </span>
                    </div>
                    <div className="h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "22%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Tariff: 7.8%</span>
                      <span className="text-green-400">+71 $BARON/day</span>
                    </div>

                    <button
                      className="w-full py-2 mt-2 font-semibold transition-all bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1]"
                      onClick={() => setActiveTab("routes")}
                    >
                      Manage Routes
                    </button>
                  </div>
                </div>

                {/* Trade Wars Status */}
                <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-yellow-400">
                      Trade War Status
                    </h3>
                    <Trophy size={20} className="text-yellow-400" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Next Trade War:</span>
                      <span className="font-bold text-red-400">
                        {formatCountdown(tradeWarCountdown)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Your Alliance:</span>
                      <span className="text-blue-300">
                        Eastern Federation (Rank #3)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Territory Control:</span>
                      <span>1/3 Zones</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last War Rewards:</span>
                      <span className="text-yellow-400">+425 $BARON</span>
                    </div>

                    <div className="p-3 mt-2 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                      <div className="mb-1 text-sm text-yellow-400">
                        Current War Strategy
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Shield size={16} className="text-blue-400" />
                          <span>Defensive</span>
                        </span>
                        <button
                          className="px-2 py-1 text-xs transition-all bg-gradient-to-b from-[#1B0036] to-[#1A1135]"
                          onClick={() => setShowTradeWarModal(true)}
                        >
                          Change
                        </button>
                      </div>
                    </div>

                    <button
                      className="flex items-center justify-center w-full gap-2 py-2 mt-2 font-semibold transition-all bg-red-700 rounded-md hover:bg-red-600"
                      onClick={() => setActiveTab("tradewars")}
                    >
                      <Sword size={16} />
                      <span>Enter War Room</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Market Overview */}
              <div className="p-4 mt-6 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-yellow-400">
                    Market Overview
                  </h3>
                  <BarChart size={20} className="text-blue-400" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135]  rounded-md">
                    <div className="mb-1 text-sm opacity-70">$BARON Price</div>
                    <div className="text-xl font-bold text-green-400">
                      $1.24
                    </div>
                    <div className="text-xs text-green-400">+2.4% (24h)</div>
                  </div>

                  <div className="p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] rounded-md">
                    <div className="mb-1 text-sm opacity-70">Market Cap</div>
                    <div className="text-xl font-bold">$12.4M</div>
                    <div className="text-xs text-green-400">+1.2% (24h)</div>
                  </div>

                  <div className="p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] rounded-md">
                    <div className="mb-1 text-sm opacity-70">Treasury</div>
                    <div className="text-xl font-bold">$2.45M</div>
                    <div className="text-xs text-green-400">+0.8% (24h)</div>
                  </div>
                </div>

                <div className="p-3 mt-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm opacity-70">$BARON Price (7d)</div>
                    <div className="text-xs text-green-400">+8.2%</div>
                  </div>

                  {/* Simple chart representation */}
                  <div className="flex items-end h-16 gap-1">
                    {[65, 68, 62, 70, 75, 72, 78].map((value, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-green-500 rounded-t"
                        style={{ height: `${value}%` }}
                      ></div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-1 text-xs opacity-50">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* News & Announcements */}
              <div className="p-4 mt-6 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-yellow-400">
                    News & Announcements
                  </h3>
                  <Bell size={20} className="text-blue-400" />
                </div>

                <div className="space-y-4">
                  <div className="pb-3 border-b border-indigo-700">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">
                        Trade War Results: Eastern Federation Takes Victory
                      </h4>
                      <span className="text-xs opacity-70">2d ago</span>
                    </div>
                    <p className="mt-1 text-xs opacity-90">
                      The Eastern Federation secured a decisive victory in this
                      week's Trade War, capturing 2 strategic zones.
                    </p>
                  </div>

                  <div className="pb-3 border-b border-indigo-700">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">
                        New Alliance Route: Shadow Network Now Available
                      </h4>
                      <span className="text-xs opacity-70">4d ago</span>
                    </div>
                    <p className="mt-1 text-xs opacity-90">
                      $SHADOW token holders can now access the exclusive Shadow
                      Network luxury goods route.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">
                        Treasury Expansion: New Assets Added
                      </h4>
                      <span className="text-xs opacity-70">1w ago</span>
                    </div>
                    <p className="mt-1 text-xs opacity-90">
                      The TradeRealm treasury has expanded with new
                      yield-generating assets, increasing backing per $BARON.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Presale Tab */}
          {activeTab === "presale" && (
            <div className="absolute inset-0 w-full h-full p-6 overflow-auto bg-gradient-to-b from-purple-900 to-indigo-950">
              <PresalePage />
            </div>
          )}

          {/* Alliances Tab */}
          {activeTab === "alliances" && (
            <div className="absolute inset-0 w-full h-full p-6 overflow-auto">
              <AlliancesPage />
            </div>
          )}

          {/* Import Licenses (Bonding) Tab */}
          {activeTab === "bonds" && (
            <div className="absolute inset-0 w-full h-full p-6 overflow-auto">
              <ImportLicensesPage />
            </div>
          )}

          {/* Route Detail Panel */}
          {activeRoute && (
            <div className="absolute z-30 p-4 bg-indigo-900 border-4 border-indigo-700 rounded-md bottom-4 right-4 w-72 route-detail-panel">
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
                {activeRoute.accessRequirement && (
                  <div>
                    <span className="block font-semibold">
                      Access Requirement:
                    </span>
                    <span className="text-purple-300">
                      {activeRoute.accessRequirement}
                    </span>
                  </div>
                )}
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

          {/* support page */}
          {activeTab === "supporters" && (
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
                <div className="p-6 mb-8 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-lg bg-opacity-70">
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
                    className={`relative bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] bg-opacity-70 rounded-lg border-2 ${
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
                    className={`relative bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] bg-opacity-70 rounded-lg border-2 ${
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
                    className={`relative bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] bg-opacity-70 rounded-lg border-2 ${
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
                    className={`relative bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] bg-opacity-70 rounded-lg border-2 ${
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
                  <div className="p-6 mb-8 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-lg animate-fadeIn">
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

                      <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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

                      <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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
                <div className="p-6 mb-8 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-lg bg-opacity-70">
                  <h3 className="mb-4 text-xl font-bold text-yellow-400">
                    Point System: Earn Your Way Up!
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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

                    <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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

                    <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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
                <div className="p-6 mb-8 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-lg bg-opacity-70">
                  <h3 className="mb-4 text-xl font-bold text-yellow-400">
                    Community Governance Access
                  </h3>
                  <p className="mb-4 text-blue-200">
                    Early supporters get a louder voice in shaping the Realm's
                    future!
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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

                    <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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

                    <div className="p-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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

          {/* Map Controls */}
          <div className="absolute z-20 flex gap-2 top-4 right-4">
            <button
              className="p-2bg-gradient-to-b from-[#1B0036] to-[#1A1135] rounded-md "
              onClick={() => setAnimateMap(!animateMap)}
            >
              <Globe size={20} />
            </button>
          </div>

          {/* Legend */}
          <div className="absolute z-20 p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-1 border-[#6B46C1] rounded-md bottom-4 left-4">
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
              {activeTab === "tradewars" && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span>Contested Zones</span>
                </div>
              )}
              {(activeTab === "routes" || activeTab === "alliances") && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Alliance Routes</span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Overlay */}
          {(showControlModal ||
            showTariffModal ||
            showStakingModal ||
            showTradeWarModal ||
            showAllianceModal) && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
              onClick={closeAllModals}
            >
              {/* Control Route Modal */}
              {showControlModal && (
                <div
                  className="w-full max-w-md p-6 mx-4 bg-indigo-900 border-4 border-indigo-700 rounded-md popup-enter"
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
                              activeRoute?.minStake?.replace(/[^0-9]/g, "") ||
                                "0"
                            )
                        }
                        onClick={() => {
                          // Handle route control logic here
                          setShowControlModal(false);
                        }}
                      >
                        {!controlAmount ||
                        parseInt(controlAmount) <
                          parseInt(
                            activeRoute?.minStake?.replace(/[^0-9]/g, "") || "0"
                          )
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
                  className="w-full max-w-md p-6 mx-4 bg-indigo-900 border-4 border-indigo-700 rounded-md popup-enter"
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

              {/* Staking Modal */}
              {showStakingModal && (
                <div
                  className="w-full max-w-md p-6 mx-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md popup-enter"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-yellow-400">
                      Stake $BARON Tokens
                    </h3>
                    <button
                      onClick={() => setShowStakingModal(false)}
                      className="p-1 rounded-md hover:bg-indigo-800"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-4 mb-4 bg-gradient-to-b from-[#1B0036] to-[#1A1135] rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold">Current Staking Stats</h4>
                      <Coins size={18} className="text-yellow-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="mb-1 opacity-70">Current APY</div>
                        <div className="text-xl font-bold text-green-400">
                          4,250%
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 opacity-70">Your Staked</div>
                        <div className="text-xl font-bold">8,750 $BARON</div>
                      </div>
                      <div>
                        <div className="mb-1 opacity-70">Next Rebase</div>
                        <div className="text-green-400">00:42:18</div>
                      </div>
                      <div>
                        <div className="mb-1 opacity-70">Daily Yield</div>
                        <div className="text-green-400">+324 $BARON</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block mb-2 text-sm">
                          Amount to Stake
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={stakeAmount}
                            onChange={handleStakeAmountChange}
                            className="flex-1 p-2 font-mono border-2 border-[#6B46C1] bg-gradient-to-b from-[#1B0036] to-[#1A1135] rounded-l-md"
                            placeholder="0"
                          />
                          <button
                            className="px-3 py-2 font-semibold border-2 border-[#6b46c1] bg-gradient-to-b from-[#1B0036] to-[#1A1135] rounded-r-md"
                            onClick={() => setStakeAmount("1500")}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] rounded-md">
                      <div className="mb-2 text-sm">Staking Preview</div>
                      <div className="flex justify-between text-sm">
                        <span>Currently Unstaked:</span>
                        <span>1,500 $BARON</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Currently Staked:</span>
                        <span>8,750 $BARON</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>New Total Staked:</span>
                        <span className="text-green-400">
                          {stakeAmount
                            ? `${parseInt(stakeAmount) + 8750} $BARON`
                            : "8,750 $BARON"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Est. Daily Yield:</span>
                        <span className="text-green-400">
                          {stakeAmount
                            ? `+${Math.round(
                                (parseInt(stakeAmount) + 8750) * 0.037
                              )} $BARON`
                            : "+324 $BARON"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        className="flex-1 py-3 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                        disabled={!stakeAmount || parseInt(stakeAmount) === 0}
                        onClick={() => {
                          // Handle staking logic here
                          setShowStakingModal(false);
                        }}
                      >
                        Stake $BARON
                      </button>
                      <button
                        className="flex-1 py-3 font-semibold transition-all bg-red-700 rounded-md hover:bg-red-600"
                        onClick={() => {
                          // Show unstake interface
                          setShowStakingModal(false);
                        }}
                      >
                        Unstake
                      </button>
                    </div>

                    <div className="text-xs text-center opacity-70">
                      Note: Staked $BARON can be deployed to control trade
                      routes without unstaking
                    </div>
                  </div>
                </div>
              )}

              {/* Trade War Modal */}
              {showTradeWarModal && (
                <div
                  className="w-full max-w-md p-6 mx-4 bg-indigo-900 border-4 border-red-900 rounded-md popup-enter"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-yellow-400">
                      Trade War Strategy
                    </h3>
                    <button
                      onClick={() => setShowTradeWarModal(false)}
                      className="p-1 rounded-md hover:bg-indigo-800"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-900 rounded-md bg-opacity-40">
                      <Trophy size={24} className="text-yellow-400" />
                      <div>
                        <div className="font-semibold">Next Trade War</div>
                        <div className="text-sm">
                          Begins in:{" "}
                          <span className="font-bold text-red-400">
                            {formatCountdown(tradeWarCountdown)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">War Strategy</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="flex flex-col items-center p-3 transition-all bg-blue-800 rounded-md hover:bg-blue-700">
                          <Shield size={24} className="mb-2 text-blue-400" />
                          <span className="text-sm">Defensive</span>
                        </button>
                        <button className="flex flex-col items-center p-3 transition-all bg-red-800 rounded-md hover:bg-red-700">
                          <Sword size={24} className="mb-2 text-red-400" />
                          <span className="text-sm">Offensive</span>
                        </button>
                        <button className="flex flex-col items-center p-3 transition-all bg-green-800 rounded-md hover:bg-green-700">
                          <Users size={24} className="mb-2 text-green-400" />
                          <span className="text-sm">Diplomatic</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">Alliance Status</h4>
                      <div className="p-3 bg-indigo-800 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span>Eastern Federation</span>
                          <span className="px-2 py-1 text-xs bg-indigo-700 rounded">
                            Rank #3
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Force:</span>
                          <span>648,500 $BARON</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Territory Control:</span>
                          <span>1/3 Zones</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Bonus Multiplier:</span>
                          <span className="text-green-400">x1.5</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">Target Zone</h4>
                      <div className="p-3 bg-red-900 rounded-md bg-opacity-30">
                        <div className="flex justify-between mb-2">
                          <div className="font-semibold">
                            Disputed Peninsula
                          </div>
                          <div className="px-2 py-1 text-xs bg-red-800 rounded">
                            Contested
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Current Control:</span>
                          <span>None (Disputed)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Enemy Forces:</span>
                          <span>~350,000 $BARON</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Potential Rewards:</span>
                          <span className="text-yellow-400">
                            +500 $BARON per day
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        className="flex items-center justify-center w-full gap-2 py-3 font-semibold transition-all bg-red-700 rounded-md hover:bg-red-600"
                        onClick={() => {
                          setShowTradeWarModal(false);
                          setActiveTab("tradewars");
                        }}
                      >
                        <Target size={18} />
                        <span>Deploy War Forces</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Alliance Modal */}
              {showAllianceModal && (
                <div
                  className="w-full max-w-md p-6 mx-4 bg-indigo-900 border-4 border-purple-800 rounded-md popup-enter"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-yellow-400">
                      Alliance Route Details
                    </h3>
                    <button
                      onClick={() => setShowAllianceModal(false)}
                      className="p-1 rounded-md hover:bg-indigo-800"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="mb-4 text-center">
                    <div className="mb-2 text-4xl">
                      {activeRoute?.pixelIcon || "🔮"}
                    </div>
                    <h4 className="text-xl font-bold">
                      {activeRoute?.name || "Alliance Route"}
                    </h4>
                    <p className="mt-1 text-sm opacity-80">
                      {activeRoute?.type || "Special Alliance Route"}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-900 rounded-md bg-opacity-30">
                      <h4 className="mb-2 font-semibold text-purple-300">
                        Access Requirements
                      </h4>
                      <div className="flex items-center justify-between p-3 text-sm rounded-md bg-indigo-950">
                        <span>
                          {activeRoute?.accessRequirement ||
                            "Hold alliance tokens"}
                        </span>
                        <span className="px-2 py-1 text-xs bg-purple-800 rounded">
                          Required
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">Alliance Benefits</h4>
                      <div className="p-3 space-y-3 text-sm bg-indigo-800 rounded-md">
                        {activeRoute?.features?.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="text-purple-400 mt-0.5">✦</div>
                            <div>{feature}</div>
                          </div>
                        )) || (
                          <div className="text-center opacity-70">
                            No benefits available
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">Route Economics</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-indigo-800 rounded-md">
                          <div className="mb-1 opacity-70">Min. Stake</div>
                          <div className="text-lg font-bold text-yellow-400">
                            {activeRoute?.minStake || "5,000 $BARON"}
                          </div>
                        </div>
                        <div className="p-3 bg-indigo-800 rounded-md">
                          <div className="mb-1 opacity-70">Current Tariff</div>
                          <div className="text-lg font-bold text-green-400">
                            {activeRoute?.currentTariff || "7.5%"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        className="flex-1 py-3 font-semibold transition-all bg-purple-700 rounded-md hover:bg-purple-600"
                        onClick={() => {
                          setShowAllianceModal(false);
                        }}
                      >
                        Join Alliance
                      </button>
                      <button
                        className="flex-1 py-3 font-semibold transition-all bg-indigo-700 rounded-md hover:bg-indigo-600"
                        onClick={() => {
                          setShowControlModal(true);
                          setShowAllianceModal(false);
                        }}
                      >
                        Control Route
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Global Stats Bar */}
      <footer className="z-40 flex items-center justify-between p-2 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-t-2 border-[#6B46C1]">
        <div className="flex items-center gap-2">
          <div className="text-xs md:text-sm">
            <span className="mr-1 opacity-70">Treasury:</span>
            <span className="font-mono">$2,450</span>
          </div>
          <div className="text-xs md:text-sm">
            <span className="mr-1 opacity-70">Backing:</span>
            <span className="font-mono">$1.15/BARON</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Trophy size={13} className="text-yellow-400" />
            <span>
              Trade War:
              <span className="font-bold text-red-400">
                3D 17H
                {/* {formatCountdown(tradeWarCountdown)} */}
              </span>
            </span>
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.7;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }

        @keyframes dash {
          to {
            stroke-dashoffset: 20;
          }
        }

        @keyframes popup-enter {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes battle-pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
          }
        }

        .font-pixel {
          font-family: "Press Start 2P", system-ui, sans-serif;
        }

        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: radial-gradient(
              2px 2px at 20px 30px,
              white,
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(2px 2px at 40px 70px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 60px 110px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 80px 150px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 100px 190px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 120px 230px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 140px 270px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 160px 310px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 180px 350px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 200px 390px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 220px 430px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 240px 470px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 260px 510px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 280px 550px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 300px 590px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 320px 630px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 340px 670px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 360px 710px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 380px 750px, white, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 400px 790px, white, rgba(0, 0, 0, 0));
        }

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
          animation: dash 20s linear infinite;
        }

        .battle-line {
          animation: dash 10s linear infinite;
        }

        .route-node {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(30, 58, 138, 0.8);
          border: 2px solid rgba(99, 102, 241, 0.8);
          border-radius: 6px;
          box-shadow: 0 0 10px rgba(79, 70, 229, 0.5);
          animation: float 4s ease-in-out infinite;
        }

        .premium-route {
          background-color: rgba(124, 58, 237, 0.8);
          border: 2px solid rgba(167, 139, 250, 0.8);
          box-shadow: 0 0 15px rgba(167, 139, 250, 0.7);
        }

        .alliance-route {
          background-color: rgba(76, 29, 149, 0.8);
          border: 2px solid rgba(124, 58, 237, 0.8);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
        }

        .war-zone-node {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(127, 29, 29, 0.8);
          border: 2px solid rgba(220, 38, 38, 0.8);
          border-radius: 6px;
          box-shadow: 0 0 15px rgba(248, 113, 113, 0.6);
          animation: battle-pulse 2s ease-in-out infinite;
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        .route-detail-panel {
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.7);
        }

        .popup-enter {
          animation: popup-enter 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dapp;
