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
} from "lucide-react";
import "../layouts/traderealm-popups.css";

// Main App Component
const TradeRealmAppPopups = () => {
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [animateMap, setAnimateMap] = useState(true);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [controlAmount, setControlAmount] = useState("");
  const [tariffRate, setTariffRate] = useState(5);

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
      owned: true,
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

  interface RoutePosition {
    x: number;
    y: number;
  }

  interface Route {
    id: string;
    name: string;
    type: string;
    regions: string;
    features: string[];
    minStake: string;
    color: string;
    position: RoutePosition;
    pixelIcon: string;
    owned?: boolean;
    premium?: boolean;
    controlledBy: string;
    currentTariff: string;
  }

  // Toggle route details
  const handleRouteClick = (route: Route): void => {
    setActiveRoute(activeRoute?.id === route.id ? null : route);
  };

  // Handle control amount input
  const handleControlAmountChange = (e: any) => {
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
                  className="flex items-center gap-3 p-3 transition-all bg-indigo-700 rounded-md"
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
          {/* 3D Pixel Map */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-900 to-indigo-950">
            {/* Animated stars background */}
            <div className="stars"></div>

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
          </div>

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

          {/* Modal Overlay */}
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
    </div>
  );
};

export default TradeRealmAppPopups;
