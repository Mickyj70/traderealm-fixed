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
  Check,
} from "lucide-react";

// Main App Component
const TradeRealmApp = () => {
  const [activeRoute, setActiveRoute] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [animateMap, setAnimateMap] = useState(true);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [controlAmount, setControlAmount] = useState("");
  const [tariffRate, setTariffRate] = useState(5);
  const [activeTab, setActiveTab] = useState("routes");
  const [presaleStage, setPresaleStage] = useState("registration"); // 'registration' or 'live'
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [presaleAmount, setPresaleAmount] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentRank, setCurrentRank] = useState("Bronze Tier");
  const [recentContributors, setRecentContributors] = useState([
    {
      address: "0x7a2...3d4f",
      amount: "5.2 ETH",
      time: "2 mins ago",
      tier: "Diamond",
    },
    {
      address: "0x3f1...9e8c",
      amount: "1.8 ETH",
      time: "5 mins ago",
      tier: "Gold",
    },
    {
      address: "0xbc4...1a7d",
      amount: "3.5 ETH",
      time: "12 mins ago",
      tier: "Gold",
    },
  ]);

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

  // Countdown timer logic
  const getCountdownTime = () => {
    const presaleDate = new Date("2025-05-15T12:00:00");
    const now = new Date();
    const difference = presaleDate - now;

    if (difference <= 0) {
      // If presale time has arrived, auto-switch to live mode
      if (presaleStage === "registration") {
        setPresaleStage("live");
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = useState(getCountdownTime());

  // Update countdown every second
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(getCountdownTime());
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Handle registration submission
  const handleRegistration = (e) => {
    e.preventDefault();
    if (registrationEmail) {
      // In a real app, this would send data to a backend
      setIsRegistered(true);
      // Brief confetti celebration
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // Handle presale contribution
  const handlePresaleContribution = (e) => {
    e.preventDefault();
    // In a real app, this would trigger wallet connection and transaction
    setShowConfetti(true);

    // Add the current user to recent contributors
    const newContributor = {
      address: "0xYou...r123",
      amount: `${presaleAmount} ETH`,
      time: "just now",
      tier: getTierFromAmount(parseFloat(presaleAmount)),
    };

    setRecentContributors([newContributor, ...recentContributors.slice(0, 2)]);

    // Update rank based on contribution
    setCurrentRank(getTierFromAmount(parseFloat(presaleAmount)));

    setTimeout(() => setShowConfetti(false), 5000);
    setPresaleAmount("");
  };

  // Helper function to determine tier based on contribution amount
  const getTierFromAmount = (amount) => {
    if (!amount || isNaN(amount)) return "Bronze Tier";
    if (amount >= 5) return "Diamond Tier";
    if (amount >= 2) return "Gold Tier";
    if (amount >= 1) return "Silver Tier";
    return "Bronze Tier";
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-white bg-black font-pixel">
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
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`flex w-full items-center gap-3 p-3 rounded-md hover:bg-indigo-800 transition-all ${
                    activeTab === "dashboard" ? "bg-indigo-700" : ""
                  }`}
                >
                  <Castle size={20} />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("routes")}
                  className={`flex w-full items-center gap-3 p-3 rounded-md hover:bg-indigo-800 transition-all ${
                    activeTab === "routes" ? "bg-indigo-700" : ""
                  }`}
                >
                  <Map size={20} />
                  <span>Trade Routes</span>
                </button>
              </li>
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
                  onClick={() => setActiveTab("stake")}
                  className={`flex w-full items-center gap-3 p-3 rounded-md hover:bg-indigo-800 transition-all ${
                    activeTab === "stake" ? "bg-indigo-700" : ""
                  }`}
                >
                  <Coins size={20} />
                  <span>Stake $BARON</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("licenses")}
                  className={`flex w-full items-center gap-3 p-3 rounded-md hover:bg-indigo-800 transition-all ${
                    activeTab === "licenses" ? "bg-indigo-700" : ""
                  }`}
                >
                  <CreditCard size={20} />
                  <span>Import Licenses</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("wars")}
                  className={`flex w-full items-center gap-3 p-3 rounded-md hover:bg-indigo-800 transition-all ${
                    activeTab === "wars" ? "bg-indigo-700" : ""
                  }`}
                >
                  <Trophy size={20} />
                  <span>Trade Wars</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("alliances")}
                  className={`flex w-full items-center gap-3 p-3 rounded-md hover:bg-indigo-800 transition-all ${
                    activeTab === "alliances" ? "bg-indigo-700" : ""
                  }`}
                >
                  <Users size={20} />
                  <span>Alliances</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("docs")}
                  className={`flex w-full items-center gap-3 p-3 rounded-md hover:bg-indigo-800 transition-all ${
                    activeTab === "docs" ? "bg-indigo-700" : ""
                  }`}
                >
                  <FileText size={20} />
                  <span>Docs</span>
                </button>
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
          {/* Background for all pages */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-900 to-indigo-950">
            {/* Animated stars background */}
            <div className="stars"></div>

            {/* Animated pixel grid */}
            <div
              className={`pixel-grid ${animateMap ? "animate-pulse" : ""}`}
            ></div>
          </div>

          {/* Trade Routes Page */}
          {activeTab === "routes" && (
            <div className="relative w-full h-full">
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
                      <span className="text-blue-300">
                        {activeRoute.regions}
                      </span>
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
            </div>
          )}

          {/* Presale Page */}
          {activeTab === "presale" && (
            <div className="relative w-full h-full overflow-y-auto">
              {/* Animated presale background */}
              <div className="shooting-stars"></div>

              {/* Presale content */}
              <div className="relative z-20 flex flex-col items-center justify-center min-h-full px-4 py-12">
                <div className="mb-6 pixel-container animate-float">
                  <div className="mb-2 text-6xl">👑</div>
                  <h1 className="mb-2 text-3xl font-bold text-center text-yellow-400 md:text-4xl">
                    TradeRealm Presale
                  </h1>
                  <div className="max-w-md mb-4 text-center text-blue-300">
                    Join the founding barons and secure your place in the
                    realm's history
                  </div>

                  {/* Demo toggle switch to show both presale states */}
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setPresaleStage("registration")}
                      className={`px-4 py-2 rounded-l-md ${
                        presaleStage === "registration"
                          ? "bg-purple-700 text-white"
                          : "bg-indigo-800 text-blue-300"
                      }`}
                    >
                      Registration Phase
                    </button>
                    <button
                      onClick={() => setPresaleStage("live")}
                      className={`px-4 py-2 rounded-r-md ${
                        presaleStage === "live"
                          ? "bg-green-700 text-white"
                          : "bg-indigo-800 text-blue-300"
                      }`}
                    >
                      Live Presale
                    </button>
                  </div>
                </div>

                {/* Confetti effect when registered or contributed */}
                {showConfetti && (
                  <div className="confetti-container">
                    {[...Array(50)].map((_, i) => (
                      <div
                        key={i}
                        className="confetti"
                        style={{
                          left: `${Math.random() * 100}%`,
                          width: `${Math.random() * 10 + 5}px`,
                          height: `${Math.random() * 10 + 5}px`,
                          background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${Math.random() * 3 + 3}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                {/* Presale Countdown Box */}
                <div className="w-full max-w-xl p-6 mb-8 bg-indigo-900 border-4 border-indigo-700 rounded-lg animate-pulse-slow">
                  <h2 className="mb-4 text-xl font-bold text-center text-yellow-400">
                    {presaleStage === "registration"
                      ? "Presale Opens In:"
                      : "Presale Live Now!"}
                  </h2>

                  {presaleStage === "registration" && (
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      <div className="flex flex-col items-center">
                        <div className="w-full py-3 text-2xl font-bold text-center text-white border-2 border-indigo-800 rounded-md bg-indigo-950">
                          {countdown.days}
                        </div>
                        <span className="mt-1 text-xs text-blue-300">DAYS</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full py-3 text-2xl font-bold text-center text-white border-2 border-indigo-800 rounded-md bg-indigo-950">
                          {countdown.hours}
                        </div>
                        <span className="mt-1 text-xs text-blue-300">
                          HOURS
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full py-3 text-2xl font-bold text-center text-white border-2 border-indigo-800 rounded-md bg-indigo-950">
                          {countdown.minutes}
                        </div>
                        <span className="mt-1 text-xs text-blue-300">
                          MINUTES
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full py-3 text-2xl font-bold text-center text-white border-2 border-indigo-800 rounded-md bg-indigo-950">
                          {countdown.seconds}
                        </div>
                        <span className="mt-1 text-xs text-blue-300">
                          SECONDS
                        </span>
                      </div>
                    </div>
                  )}

                  {presaleStage === "live" && (
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Presale Progress:</span>
                        <span className="text-sm text-green-400">
                          67% Complete
                        </span>
                      </div>
                      <div className="h-4 overflow-hidden border-2 border-indigo-800 rounded-full bg-indigo-950">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "67%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-blue-300">
                        <span>0 ETH</span>
                        <span>Target: 450 ETH</span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 mb-6 bg-indigo-800 rounded-md">
                    <h3 className="mb-2 font-semibold text-green-400">
                      Presale Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Presale Price:</span>
                        <span className="font-mono">$0.05 per $BARON</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min. Contribution:</span>
                        <span className="font-mono">0.1 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max. Contribution:</span>
                        <span className="font-mono">10 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Initial Market Cap:</span>
                        <span className="font-mono">$900,000</span>
                      </div>
                    </div>
                  </div>

                  {presaleStage === "registration" && isRegistered && (
                    <div className="space-y-4 text-center">
                      <div className="mb-4 text-xl text-green-400 glow-text">
                        ✓ Registration Complete!
                      </div>
                      <div className="inline-block p-4 mb-4 pixel-container">
                        <div className="mb-2 text-2xl">🎉</div>
                        <p className="mb-2 text-blue-300">
                          You're now on the exclusive presale list!
                        </p>
                        <p className="text-yellow-400">
                          {pledgeAmount
                            ? `Your pledge: ${pledgeAmount} ETH (${Math.round(
                                parseFloat(pledgeAmount) * 20 * 1000
                              )} $BARON)`
                            : "Complete your pledge to secure your allocation!"}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 mb-4 md:grid-cols-3">
                        <div className="flex flex-col items-center p-3 border-2 border-indigo-700 rounded-md bg-indigo-950">
                          <div className="mb-1 text-2xl">📧</div>
                          <div className="text-xs text-center text-blue-300">
                            Confirmation Email Sent
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 border-2 border-indigo-700 rounded-md bg-indigo-950">
                          <div className="mb-1 text-2xl">⏰</div>
                          <div className="text-xs text-center text-blue-300">
                            Testnet Access Granted
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 border-2 border-indigo-700 rounded-md bg-indigo-950">
                          <div className="mb-1 text-2xl">🔔</div>
                          <div className="text-xs text-center text-blue-300">
                            Priority Access Confirmed
                          </div>
                        </div>
                      </div>

                      <div className="relative inline-block early-supporter-badge">
                        <div
                          className={`px-6 py-3 rounded-md relative z-10 ${
                            !pledgeAmount || parseFloat(pledgeAmount) < 1
                              ? "bg-gray-700 border-2 border-gray-600"
                              : parseFloat(pledgeAmount) < 2
                              ? "bg-blue-700 border-2 border-blue-600"
                              : parseFloat(pledgeAmount) < 5
                              ? "bg-yellow-700 border-2 border-yellow-600"
                              : "bg-purple-900 border-2 border-purple-600 animate-bounce-slow"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Award
                              size={18}
                              className={
                                !pledgeAmount || parseFloat(pledgeAmount) < 1
                                  ? "text-gray-300"
                                  : parseFloat(pledgeAmount) < 2
                                  ? "text-blue-300"
                                  : parseFloat(pledgeAmount) < 5
                                  ? "text-yellow-300"
                                  : "text-purple-300"
                              }
                            />
                            <span
                              className={
                                !pledgeAmount || parseFloat(pledgeAmount) < 1
                                  ? "text-gray-300"
                                  : parseFloat(pledgeAmount) < 2
                                  ? "text-blue-300"
                                  : parseFloat(pledgeAmount) < 5
                                  ? "text-yellow-300"
                                  : "text-purple-300"
                              }
                            >
                              {!pledgeAmount || parseFloat(pledgeAmount) < 1
                                ? "Bronze Tier"
                                : parseFloat(pledgeAmount) < 2
                                ? "Silver Tier"
                                : parseFloat(pledgeAmount) < 5
                                ? "Gold Tier"
                                : "Diamond Tier"}{" "}
                              Early Supporter
                            </span>
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 ${
                            !pledgeAmount || parseFloat(pledgeAmount) < 1
                              ? "bg-gray-500"
                              : parseFloat(pledgeAmount) < 2
                              ? "bg-blue-500"
                              : parseFloat(pledgeAmount) < 5
                              ? "bg-yellow-500"
                              : "bg-purple-500"
                          } opacity-20 animate-pulse-glow rounded-md`}
                        ></div>
                      </div>
                    </div>
                  )}

                  {presaleStage === "live" && (
                    <div className="space-y-6">
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Presale Progress:</span>
                          <span className="text-sm text-green-400">
                            67% Complete
                          </span>
                        </div>
                        <div className="relative h-6 overflow-hidden border-2 border-indigo-800 rounded-full bg-indigo-950">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400 progress-pulse"
                            style={{ width: "67%" }}
                          ></div>

                          {/* Milestone markers */}
                          <div className="absolute flex flex-col items-center mt-1 transform -translate-x-1/2 top-full left-1/4">
                            <div className="w-1 h-3 bg-yellow-500"></div>
                            <div className="mt-1 text-xs text-yellow-500">
                              25%
                            </div>
                          </div>
                          <div className="absolute flex flex-col items-center mt-1 transform -translate-x-1/2 top-full left-1/2">
                            <div className="w-1 h-3 bg-yellow-500"></div>
                            <div className="mt-1 text-xs text-yellow-500">
                              50%
                            </div>
                          </div>
                          <div className="absolute flex flex-col items-center mt-1 transform -translate-x-1/2 top-full left-3/4">
                            <div className="w-1 h-3 bg-yellow-500"></div>
                            <div className="mt-1 text-xs text-yellow-500">
                              75%
                            </div>
                          </div>
                          <div className="absolute right-0 flex flex-col items-center mt-1 top-full">
                            <div className="w-1 h-3 bg-yellow-500"></div>
                            <div className="mt-1 text-xs text-yellow-500">
                              100%
                            </div>
                          </div>

                          {/* Rocket ship indicator */}
                          <div
                            className="absolute top-0 left-0"
                            style={{ left: "calc(67% - 14px)", top: "-14px" }}
                          >
                            <div className="animate-pulse-soft">🚀</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-6 text-xs text-blue-300">
                          <span>0 ETH</span>
                          <span>Target: 450 ETH</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                        <div className="p-4 text-center bg-indigo-800 border-2 border-indigo-700 rounded-md">
                          <div className="mb-2 text-2xl">⚡</div>
                          <div className="mb-1 text-lg font-bold text-yellow-400">
                            301.5 ETH
                          </div>
                          <div className="text-xs text-blue-300">
                            Total Raised
                          </div>
                        </div>
                        <div className="p-4 text-center bg-indigo-800 border-2 border-indigo-700 rounded-md">
                          <div className="mb-2 text-2xl">👑</div>
                          <div className="mb-1 text-lg font-bold text-yellow-400">
                            487
                          </div>
                          <div className="text-xs text-blue-300">
                            Contributors
                          </div>
                        </div>
                        <div className="p-4 text-center bg-indigo-800 border-2 border-indigo-700 rounded-md">
                          <div className="mb-2 text-2xl">⏳</div>
                          <div className="mb-1 text-lg font-bold text-yellow-400">
                            36:52:19
                          </div>
                          <div className="text-xs text-blue-300">
                            Time Remaining
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="p-4 bg-indigo-800 border-2 border-indigo-700 rounded-md">
                            <h3 className="flex items-center mb-2 font-semibold text-purple-300">
                              <span className="mr-2">🏅</span> Early Supporter
                              Tier
                            </h3>
                            <div className="relative mb-3 h-28">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                  className={`text-3xl pixel-text glow-text text-center ${
                                    currentRank === "Bronze Tier"
                                      ? "text-gray-400"
                                      : currentRank === "Silver Tier"
                                      ? "text-blue-400"
                                      : currentRank === "Gold Tier"
                                      ? "text-yellow-400"
                                      : "text-purple-400"
                                  }`}
                                >
                                  {currentRank}
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-indigo-800 to-transparent"></div>
                            </div>
                            <div className="flex justify-between mb-3">
                              <div className="text-center">
                                <div className="text-xs text-blue-300">
                                  Next Tier
                                </div>
                                <div className="text-sm font-semibold text-yellow-400">
                                  Gold Tier
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-blue-300">
                                  Required
                                </div>
                                <div className="text-sm font-semibold text-yellow-400">
                                  2.0 ETH
                                </div>
                              </div>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                              <div
                                className="h-full bg-gradient-to-r from-blue-600 to-purple-400"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                          </div>

                          <div className="p-4 bg-indigo-800 border-2 border-indigo-700 rounded-md">
                            <h3 className="flex items-center mb-3 font-semibold text-green-400">
                              <span className="mr-2">📈</span> Recent
                              Contributions
                            </h3>
                            <div className="space-y-3 overflow-y-auto max-h-36 fancy-scrollbar">
                              {recentContributors.map((contributor, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between pb-2 border-b border-indigo-700"
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs
                                      ${
                                        contributor.tier === "Diamond"
                                          ? "bg-purple-700"
                                          : contributor.tier === "Gold"
                                          ? "bg-yellow-700"
                                          : contributor.tier === "Silver"
                                          ? "bg-blue-700"
                                          : "bg-gray-700"
                                      }`}
                                    >
                                      {i + 1}
                                    </div>
                                    <div className="font-mono text-xs text-blue-300">
                                      {contributor.address}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-semibold text-yellow-400">
                                      {contributor.amount}
                                    </div>
                                    <div className="flex items-center text-xs">
                                      <span
                                        className={
                                          contributor.tier === "Diamond"
                                            ? "text-purple-400"
                                            : contributor.tier === "Gold"
                                            ? "text-yellow-400"
                                            : contributor.tier === "Silver"
                                            ? "text-blue-400"
                                            : "text-gray-400"
                                        }
                                      >
                                        {contributor.tier}
                                      </span>
                                      <span className="ml-1 text-blue-300">
                                        • {contributor.time}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <form
                            onSubmit={handlePresaleContribution}
                            className="h-full p-4 space-y-4 bg-indigo-800 border-2 border-indigo-700 rounded-md"
                          >
                            <h3 className="flex items-center mb-3 font-semibold text-yellow-400">
                              <span className="mr-2">💰</span> Join The Presale
                            </h3>

                            <div>
                              <label className="block mb-2 text-sm">
                                Contribution Amount (ETH)
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={presaleAmount}
                                  onChange={(e) =>
                                    setPresaleAmount(
                                      e.target.value.replace(/[^0-9.]/g, "")
                                    )
                                  }
                                  placeholder="0.0"
                                  className="w-full p-3 pl-10 font-mono text-white border-2 border-indigo-700 rounded-md bg-indigo-950"
                                  required
                                />
                                <div className="absolute text-lg transform -translate-y-1/2 left-3 top-1/2">
                                  Ξ
                                </div>
                              </div>
                              <div className="flex justify-between mt-2 text-xs">
                                <span className="text-blue-300">
                                  Min: 0.1 ETH
                                </span>
                                <span className="text-blue-300">
                                  Max: 10 ETH
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                className="py-2 text-sm bg-indigo-700 rounded-md"
                                onClick={() => setPresaleAmount("1")}
                              >
                                1 ETH
                              </button>
                              <button
                                type="button"
                                className="py-2 text-sm bg-indigo-700 rounded-md"
                                onClick={() => setPresaleAmount("2")}
                              >
                                2 ETH
                              </button>
                              <button
                                type="button"
                                className="py-2 text-sm bg-indigo-700 rounded-md"
                                onClick={() => setPresaleAmount("5")}
                              >
                                5 ETH
                              </button>
                              <button
                                type="button"
                                className="py-2 text-sm bg-indigo-700 rounded-md"
                                onClick={() => setPresaleAmount("10")}
                              >
                                10 ETH
                              </button>
                            </div>

                            <div className="p-4 rounded-md bg-indigo-950">
                              <div className="flex justify-between mb-2">
                                <span>You will receive:</span>
                                <span className="font-mono text-yellow-400">
                                  {presaleAmount
                                    ? `${Math.round(
                                        parseFloat(presaleAmount || 0) *
                                          20 *
                                          1000
                                      )} $BARON`
                                    : "0 $BARON"}
                                </span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span>Price per token:</span>
                                <span className="font-mono text-green-400">
                                  $0.05
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Support Tier:</span>
                                <span
                                  className={
                                    !presaleAmount ||
                                    parseFloat(presaleAmount) < 1
                                      ? "text-gray-400 font-mono"
                                      : parseFloat(presaleAmount) < 2
                                      ? "text-blue-400 font-mono"
                                      : parseFloat(presaleAmount) < 5
                                      ? "text-yellow-400 font-mono"
                                      : "text-purple-400 font-mono"
                                  }
                                >
                                  {!presaleAmount ||
                                  parseFloat(presaleAmount) < 1
                                    ? "Bronze Tier"
                                    : parseFloat(presaleAmount) < 2
                                    ? "Silver Tier"
                                    : parseFloat(presaleAmount) < 5
                                    ? "Gold Tier"
                                    : "Diamond Tier"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <div className="text-2xl animate-pulse-soft">
                                🔥
                              </div>
                              <div className="text-yellow-400">
                                Join testnet to upgrade your tier benefits!
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="relative w-full py-4 overflow-hidden font-bold tracking-wider text-black transition-all bg-yellow-600 rounded-md hover:bg-yellow-500 presale-button-special"
                              disabled={
                                !presaleAmount ||
                                parseFloat(presaleAmount) < 0.1 ||
                                parseFloat(presaleAmount) > 10
                              }
                            >
                              <span className="relative z-10">
                                PURCHASE $BARON TOKENS
                              </span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Early Supporter Program Promo */}
                <div className="w-full max-w-xl">
                  <div className="relative p-6 overflow-hidden bg-indigo-900 border-4 border-indigo-700 rounded-lg">
                    <div className="absolute w-24 h-24 bg-blue-500 rounded-full -right-6 -top-6 opacity-30 blur-lg animate-pulse"></div>

                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="mr-3 text-4xl">🏆</div>
                        <h3 className="text-xl font-bold text-blue-300">
                          Early Supporter Program
                        </h3>
                      </div>

                      <p className="mb-4 text-blue-200">
                        Join our Early Supporter Program by participating in the
                        presale and testnet. Unlock powerful benefits based on
                        your tier:
                      </p>

                      <div className="grid grid-cols-1 gap-3 mb-4 md:grid-cols-2">
                        <div className="p-3 bg-purple-900 bg-opacity-50 rounded-md">
                          <div className="flex items-center mb-2">
                            <Star className="mr-2 text-purple-300" size={16} />
                            <h4 className="font-semibold text-purple-300">
                              Diamond Tier
                            </h4>
                          </div>
                          <ul className="space-y-1 text-xs text-blue-200">
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>20% bonus APY for 90 days</span>
                            </li>
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>15% reduced stake requirements</span>
                            </li>
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>Exclusive strategy sessions</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-3 bg-yellow-900 bg-opacity-50 rounded-md">
                          <div className="flex items-center mb-2">
                            <Star className="mr-2 text-yellow-300" size={16} />
                            <h4 className="font-semibold text-yellow-300">
                              Gold Tier
                            </h4>
                          </div>
                          <ul className="space-y-1 text-xs text-blue-200">
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>15% bonus APY for 60 days</span>
                            </li>
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>10% reduced stake requirements</span>
                            </li>
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>Early access to new features</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-3 bg-blue-900 bg-opacity-50 rounded-md">
                          <div className="flex items-center mb-2">
                            <Star className="mr-2 text-blue-300" size={16} />
                            <h4 className="font-semibold text-blue-300">
                              Silver Tier
                            </h4>
                          </div>
                          <ul className="space-y-1 text-xs text-blue-200">
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>10% bonus APY for 30 days</span>
                            </li>
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>5% reduced stake requirements</span>
                            </li>
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>Early notifications of events</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-3 bg-gray-800 bg-opacity-50 rounded-md">
                          <div className="flex items-center mb-2">
                            <Star className="mr-2 text-gray-400" size={16} />
                            <h4 className="font-semibold text-gray-400">
                              Bronze Tier
                            </h4>
                          </div>
                          <ul className="space-y-1 text-xs text-blue-200">
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>5% bonus APY for 14 days</span>
                            </li>
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>Special profile badge</span>
                            </li>
                            <li className="flex items-start">
                              <Check
                                size={12}
                                className="text-green-400 mr-1 mt-0.5"
                              />
                              <span>Early supporter recognition</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="mb-2 font-bold text-yellow-400">
                          EARN POINTS DURING TESTNET PHASE
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          <div className="px-3 py-1 text-xs bg-indigo-800 rounded-full">
                            Activity Points
                          </div>
                          <div className="px-3 py-1 text-xs bg-indigo-800 rounded-full">
                            Quality Points
                          </div>
                          <div className="px-3 py-1 text-xs bg-indigo-800 rounded-full">
                            Community Points
                          </div>
                        </div>
                        <button className="w-full py-3 font-bold tracking-wider text-white transition-all bg-blue-700 rounded-md hover:bg-blue-600">
                          LEARN MORE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Overlay - Outside of tab content so it works with any page */}
          {(showControlModal || showTariffModal) && (
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

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        .route-detail-panel {
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.7);
        }

        .popup-enter {
          animation: popup-enter 0.3s ease-out forwards;
        }

        /* Presale Page Styles */
        @keyframes float-slow {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }

        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(200px) translateY(200px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }

        .pixel-container {
          background-color: rgba(30, 58, 138, 0.8);
          border: 4px solid rgba(99, 102, 241, 0.8);
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.5);
          text-align: center;
        }

        .shooting-stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .shooting-stars::before,
        .shooting-stars::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7);
          animation: shooting-star 3s linear infinite;
          opacity: 0;
        }

        .shooting-stars::before {
          top: 10%;
          left: 20%;
          animation-delay: 1s;
        }

        .shooting-stars::after {
          top: 30%;
          left: 70%;
          animation-delay: 2s;
        }

        .presale-button::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            left: -50%;
          }
          100% {
            left: 150%;
          }
        }

        /* New presale animations */
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes pulse-soft {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
        }

        @keyframes pulse-glow {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.2;
          }
        }

        @keyframes progress-pulse {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .pixel-text {
          font-family: "Press Start 2P", system-ui, sans-serif;
          letter-spacing: 2px;
        }

        .glow-text {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        }

        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          top: -20px;
          border-radius: 0;
          animation: confetti-fall linear forwards;
        }

        .progress-pulse {
          background-size: 200% 200%;
          background-image: linear-gradient(
            90deg,
            rgba(74, 222, 128, 1) 0%,
            rgba(4, 120, 87, 1) 25%,
            rgba(74, 222, 128, 1) 50%,
            rgba(4, 120, 87, 1) 75%,
            rgba(74, 222, 128, 1) 100%
          );
          animation: progress-pulse 3s linear infinite;
        }

        .presale-button-special::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(45deg);
          animation: shine 2s infinite;
        }

        .fancy-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .fancy-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 58, 138, 0.3);
          border-radius: 4px;
        }

        .fancy-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 4px;
        }

        .fancy-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8);
        }
      `}</style>
    </div>
  );
};

export default TradeRealmApp;
