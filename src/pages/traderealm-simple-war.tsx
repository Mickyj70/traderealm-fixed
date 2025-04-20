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
  Shield,
  Sword,
} from "lucide-react";
import "../layouts/traderealm-simple-war.css"; // Custom CSS for the component
import { Link } from "react-router-dom";

// Main App Component
const TradeRealmAppSimpleWar = () => {
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [animateMap, setAnimateMap] = useState(true);
  const [tradeWarActive, setTradeWarActive] = useState(false);

  // Routes data
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
      owned: false,
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
      owned: false,
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
      owned: false,
    },
  ];

  // Toggle route details
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
    owned: boolean;
    premium?: boolean;
  }

  const handleRouteClick = (route: Route): void => {
    setActiveRoute(activeRoute?.id === route.id ? null : route);
  };

  // Toggle Trade War mode
  const toggleTradeWar = () => {
    setTradeWarActive(!tradeWarActive);
    setActiveRoute(null);
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
          <Link to="/">
            <h1 className="text-xl font-bold tracking-wider text-yellow-400 cursor-pointer md:text-2xl">
              <a href="/">TradeRealm</a>
            </h1>
          </Link>
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

          {tradeWarActive && (
            <div className="p-4 mx-4 mt-4 bg-red-900 border-2 border-red-700 rounded-md">
              <h3 className="mb-2 font-semibold text-yellow-400">
                War Resources
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Attack Power:</span>
                  <span className="font-mono">4,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Defense Power:</span>
                  <span className="font-mono">6,250</span>
                </div>
                <div className="flex justify-between">
                  <span>Special Abilities:</span>
                  <span className="font-mono">2</span>
                </div>
              </div>
            </div>
          )}
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
                  className={`route-node 
                                ${route.premium ? "premium-route" : ""} 
                                ${
                                  tradeWarActive && route.owned
                                    ? "owned-route"
                                    : ""
                                } 
                                ${
                                  tradeWarActive && !route.owned
                                    ? "enemy-route"
                                    : ""
                                }`}
                >
                  <span className="text-2xl">{route.pixelIcon}</span>
                  <div className="absolute w-1 h-1 transform -translate-x-1/2 bg-blue-500 rounded-full -bottom-2 left-1/2 pulse-animation"></div>
                </div>

                {/* Node Label */}
                <div className="absolute px-2 py-1 mt-2 text-xs font-semibold transform -translate-x-1/2 border border-indigo-700 rounded top-full left-1/2 bg-indigo-950 whitespace-nowrap">
                  {route.name}
                  {tradeWarActive && (
                    <span
                      className={`ml-2 ${
                        route.owned ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {route.owned ? "(Yours)" : "(Enemy)"}
                    </span>
                  )}
                </div>

                {/* War Icons (only visible in Trade War mode) */}
                {tradeWarActive && (
                  <div className="absolute transform -translate-x-1/2 -top-8 left-1/2">
                    {route.owned ? (
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-700 rounded-full">
                        <Shield size={14} className="text-white" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-6 h-6 bg-red-700 rounded-full">
                        <Sword size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                )}
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
                {!tradeWarActive ? (
                  // Normal Mode Info
                  <>
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

                    {/* Controls */}
                    <div className="flex flex-col gap-2 pt-2">
                      <button className="w-full py-2 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600">
                        Control Route
                      </button>
                      <button className="w-full py-2 font-semibold transition-all bg-blue-700 rounded-md hover:bg-blue-600">
                        Set Tariffs
                      </button>
                    </div>
                  </>
                ) : (
                  // Trade War Mode Info
                  <>
                    <div
                      className={`p-2 rounded-md ${
                        activeRoute.owned ? "bg-blue-800" : "bg-red-800"
                      }`}
                    >
                      <span className="block font-semibold">
                        {activeRoute.owned
                          ? "Your Territory"
                          : "Enemy Territory"}
                      </span>
                    </div>

                    <div>
                      <span className="font-semibold">Strategic Value:</span>
                      <div className="flex mt-1">
                        <div className="w-full h-2 bg-indigo-700 rounded-full">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{
                              width:
                                activeRoute.id === "white-house"
                                  ? "90%"
                                  : activeRoute.id === "wall-street"
                                  ? "75%"
                                  : activeRoute.id === "city-of-london"
                                  ? "70%"
                                  : "65%",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* War Controls */}
                    <div className="flex flex-col gap-2 pt-2">
                      {activeRoute.owned ? (
                        <button className="flex items-center justify-center w-full gap-2 py-2 font-semibold transition-all bg-blue-700 rounded-md hover:bg-blue-600">
                          <Shield size={16} />
                          <span>Fortify Defense</span>
                        </button>
                      ) : (
                        <button className="flex items-center justify-center w-full gap-2 py-2 font-semibold transition-all bg-red-700 rounded-md hover:bg-red-600">
                          <Sword size={16} />
                          <span>Launch Attack</span>
                        </button>
                      )}
                    </div>
                  </>
                )}
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

          {/* Trade War Toggle */}
          <div className="absolute z-20 top-4 left-4">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all
                        ${
                          tradeWarActive
                            ? "bg-red-700 hover:bg-red-600"
                            : "bg-indigo-800 hover:bg-indigo-700"
                        }`}
              onClick={toggleTradeWar}
            >
              {tradeWarActive ? (
                <>
                  <Trophy size={18} />
                  <span>Exit Trade War</span>
                </>
              ) : (
                <>
                  <Trophy size={18} />
                  <span>Enter Trade War</span>
                </>
              )}
            </button>
          </div>

          {/* Legend */}
          <div className="absolute z-20 p-3 bg-indigo-900 border-2 border-indigo-700 rounded-md bottom-4 left-4">
            <h4 className="mb-2 text-sm font-semibold">
              {tradeWarActive ? "War Legend" : "Routes Legend"}
            </h4>
            <div className="space-y-1 text-xs">
              {!tradeWarActive ? (
                // Normal Mode Legend
                <>
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
                </>
              ) : (
                // War Mode Legend
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>Your Territory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>Enemy Territory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={12} className="text-blue-400" />
                    <span>Defensive Position</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sword size={12} className="text-red-400" />
                    <span>Attack Target</span>
                  </div>
                </>
              )}
            </div>
          </div>
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

export default TradeRealmAppSimpleWar;
