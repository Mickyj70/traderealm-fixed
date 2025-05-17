/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronUp,
  ChevronDown,
  CreditCard,
  Coins,
  ArrowRight,
  DollarSign,
  RefreshCw,
  Clock,
  Sparkles,
  Anchor,
  Ship,
  Package,
  Compass,
  Map,
  Globe,
  Wind,
} from "lucide-react";

// Available bonds data with fun icons
const availableBonds = [
  {
    id: "eth",
    name: "USDC License",
    icon: "⟠",
    discount: 9.2,
    marketPrice: 14.32,
    bondPrice: 13.0,
    vestingTerm: "5 days",
    totalPurchased: "125,420 $BARON",
    capacity: "250,000 $BARON",
    capacityUsed: 50.17,
    color: "#71C5FF",
    bgColor: "from-blue-900 to-indigo-900",
    routeFrom: "Silicon Valley",
    routeTo: "Blockchain Isle",
  },
  {
    id: "dai",
    name: "USDC License",
    icon: "◈",
    discount: 7.5,
    marketPrice: 14.32,
    bondPrice: 13.25,
    vestingTerm: "5 days",
    totalPurchased: "98,750 $BARON",
    capacity: "200,000 $BARON",
    capacityUsed: 49.38,
    color: "#FBD87F",
    bgColor: "from-yellow-900 to-indigo-900",
    routeFrom: "Stable Harbor",
    routeTo: "Baron City",
  },
  {
    id: "baron-eth-lp",
    name: "BARON-$S LP",
    icon: "⥮",
    discount: 12.4,
    marketPrice: 14.32,
    bondPrice: 12.54,
    vestingTerm: "5 days",
    totalPurchased: "78,240 $BARON",
    capacity: "150,000 $BARON",
    capacityUsed: 52.16,
    isLp: true,
    color: "#A89CF4",
    bgColor: "from-purple-900 to-indigo-900",
    routeFrom: "Liquidity Lagoon",
    routeTo: "Ethereum Empire",
  },
  {
    id: "baron-dai-lp",
    name: "BARON-$S LP",
    icon: "⥮",
    discount: 11.2,
    marketPrice: 14.32,
    bondPrice: 12.72,
    vestingTerm: "5 days",
    totalPurchased: "62,125 $BARON",
    capacity: "150,000 $BARON",
    capacityUsed: 41.42,
    isLp: true,
    color: "#FF9B9B",
    bgColor: "from-red-900 to-indigo-900",
    routeFrom: "Dual Docks",
    routeTo: "Profit Peninsula",
  },
];

// Import Licenses (Bonding) Page Component
const TradeRealmImportLicensesPage = () => {
  const [selectedBond, setSelectedBond] = useState(null);
  const [bondAmount, setBondAmount] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [vestingCountdown, setVestingCountdown] = useState({
    days: 3,
    hours: 7,
    minutes: 42,
  });
  // Remove unused states
  // const [shipPosition, setShipPosition] = useState(25);
  // const [waves, setWaves] = useState([]);
  // const [showCelebration, setShowCelebration] = useState(false);

  // Add per-card ship positions
  const [shipPositions, setShipPositions] = useState(
    Array(availableBonds.length).fill(0)
  );
  const shipIntervals = useRef([]);

  // Animate ships for each card
  useEffect(() => {
    // Clear any previous intervals
    shipIntervals.current.forEach((interval) => clearInterval(interval));
    shipIntervals.current = [];
    // Start a new interval for each card
    setShipPositions(Array(availableBonds.length).fill(0));
    availableBonds.forEach((_, idx) => {
      shipIntervals.current[idx] = setInterval(() => {
        setShipPositions((prev) => {
          const updated = [...prev];
          updated[idx] = updated[idx] >= 90 ? 0 : updated[idx] + 1;
          return updated;
        });
      }, 40 + idx * 20); // Slightly different speed for each
    });
    return () => {
      shipIntervals.current.forEach((interval) => clearInterval(interval));
    };
    // eslint-disable-next-line
  }, []);

  // Active bonds data
  const activeBonds = [
    {
      id: "eth-bond-1",
      type: "$S",
      icon: "⟠",
      totalValue: 750,
      claimed: 300,
      percentVested: 40,
      remainingTime: "3d 7h",
      endsAt: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000
      ),
      color: "#71C5FF",
    },
  ];

  // Handle bond amount input
  const handleBondAmountChange = (e) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setBondAmount(value);
  };

  // Set max amount for bonding (placeholder)
  const setMaxBondAmount = () => {
    if (selectedBond?.id === "eth") {
      setBondAmount("2.5");
    } else if (selectedBond?.id === "dai") {
      setBondAmount("500");
    } else {
      setBondAmount("1.2");
    }
  };

  // Purchase bond with celebration effect
  const purchaseBond = () => {
    // setShowCelebration(true);

    setTimeout(() => {
      // setShowCelebration(false);
      // Close modal and reset amount
      setShowPurchaseModal(false);
      setBondAmount("");
      setSelectedBond(null);
    }, 3000);
  };

  // Calculate received tokens
  const calculateReceivedTokens = () => {
    if (!selectedBond || !bondAmount || isNaN(parseFloat(bondAmount))) return 0;

    const amountInUsd =
      parseFloat(bondAmount) * (selectedBond.id === "eth" ? 3000 : 1);
    return Math.round(amountInUsd / selectedBond.bondPrice);
  };

  // Format vesting time
  const formatVestingTime = (date) => {
    const now = new Date();
    const diff = date - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  // Get trader title based on bond amount
  const getTraderTitle = () => {
    if (!bondAmount || parseFloat(bondAmount) <= 0) return "Novice Trader";

    const amount = parseFloat(bondAmount);
    if (amount >= 10) return "Master Merchant";
    if (amount >= 5) return "Seasoned Smuggler";
    if (amount >= 2) return "Adept Importer";
    if (amount >= 1) return "Trade Apprentice";
    return "Novice Trader";
  };

  // Add styles for the page
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
@keyframes pulse {
0% { transform: scale(0.95); opacity: 0.7; }
70% { transform: scale(1.1); opacity: 1; }
100% { transform: scale(0.95); opacity: 0.7; }
}

@keyframes float {
0% { transform: translateY(0px); }
50% { transform: translateY(-10px); }
100% { transform: translateY(0px); }
}

@keyframes shipFloat {
0% { transform: translateY(0px) rotate(2deg); }
50% { transform: translateY(-15px) rotate(-2deg); }
100% { transform: translateY(0px) rotate(2deg); }
}

@keyframes bob {
0% { transform: rotate(-3deg); }
50% { transform: rotate(3deg); }
100% { transform: rotate(-3deg); }
}

@keyframes wave {
0% { transform: translateX(-30px) scale(1); }
50% { transform: translateX(10px) scale(0.8); }
100% { transform: translateX(-30px) scale(1); }
}

@keyframes glow {
0% { box-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.8); }
100% { box-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
}

@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}

@keyframes sparkle {
0%, 100% { opacity: 0; transform: scale(0.5); }
50% { opacity: 1; transform: scale(1.2); }
}

@keyframes coinFall {
0% { transform: translateY(-500px) rotate(0deg); opacity: 0; }
10% { opacity: 1; }
100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

@keyframes confetti {
0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
10% { opacity: 1; }
100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

.font-pixel {
font-family: 'Press Start 2P', system-ui, sans-serif;
}

.pixelated-bg {
background-size: 20px 20px;
background-image:
linear-gradient(to right, rgba(30, 64, 175, 0.1) 1px, transparent 1px),
linear-gradient(to bottom, rgba(30, 64, 175, 0.1) 1px, transparent 1px);
}

.glow-effect {
animation: glow 3s infinite;
}

.float-animation {
animation: float 4s ease-in-out infinite;
}

.pulse-animation {
animation: pulse 2s infinite;
}

.ship-float {
animation: shipFloat 6s ease-in-out infinite;
}

.bob-animation {
animation: bob 3s ease-in-out infinite;
}

.wave-animation {
position: absolute;
background-color: rgba(56, 189, 248, 0.3);
border-radius: 50%;
z-index: 1;
animation: wave 7s ease-in-out infinite;
}

.spin-animation {
animation: spin 8s linear infinite;
}

.sparkle {
position: absolute;
width: 6px;
height: 6px;
background-color: #f9fafb;
border-radius: 50%;
}

.sparkle-1 {
top: 20%;
left: 10%;
animation: sparkle 2s infinite 0.3s;
}

.sparkle-2 {
top: 60%;
left: 15%;
animation: sparkle 2s infinite 0.7s;
}

.sparkle-3 {
top: 30%;
left: 85%;
animation: sparkle 2s infinite 1.1s;
}

.sparkle-4 {
top: 70%;
left: 80%;
animation: sparkle 2s infinite 1.5s;
}

.falling-coin {
position: absolute;
top: 0;
animation: coinFall 3s ease-in forwards;
}

.confetti {
position: absolute;
width: 10px;
height: 10px;
top: 0;
animation: confetti 4s ease-in forwards;
}

.map-bg {
background-image:
linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.95)),
url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231E40AF' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E"),
url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E40AF' fill-opacity='0.15'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.trade-road {
height: 4px;
background: repeating-linear-gradient(
90deg,
transparent,
transparent 8px,
#f59e0b 8px,
#f59e0b 16px
);
position: absolute;
z-index: 1;
}
`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden text-white bg-gradient-to-b from-[#1B0036] to-[#1A1135]">
      {/* Header with Import Licenses Title */}
      <div className="relative p-6 mb-6 overflow-hidden bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1]">
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
        <div className="sparkle sparkle-4"></div>

        <h1 className="text-2xl font-bold tracking-wider text-center text-yellow-400 md:text-3xl pulse-animation">
          <Ship className="inline-block mb-1 mr-2" size={28} />
          Import Licenses
          <Ship
            className="inline-block ml-2 mb-1 transform scale-x-[-1]"
            size={28}
          />
        </h1>
        <p className="mt-2 text-sm text-center text-blue-300">
          Acquire discounted $BARON tokens by establishing trade routes
        </p>

        {/* Main Content */}
        <div className="max-w-5xl px-4 pb-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - Available Bonds */}
            <div className="lg:col-span-2">
              <div className="relative p-5 mb-6 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md ">
                <h2 className="flex items-center mb-4 text-xl font-bold text-blue-400">
                  <Map className="mr-2 text-yellow-400" size={24} />
                  Trade Routes
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {availableBonds.map((bond, idx) => (
                    <div
                      key={bond.id}
                      className={`bg-gradient-to-br ${
                        bond.bgColor
                      } rounded-md p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/20 ${
                        selectedBond?.id === bond.id
                          ? "border-2 border-yellow-400 transform scale-105"
                          : "border border-indigo-700"
                      }`}
                      onClick={() => {
                        setSelectedBond(bond);
                        setShowPurchaseModal(true);
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div
                            className={`text-2xl mr-2 p-1 rounded-full bg-opacity-30`}
                            style={{ backgroundColor: bond.color }}
                          >
                            {bond.icon}
                          </div>
                          <h3 className="font-semibold">{bond.name}</h3>
                        </div>
                        <div className="px-2 py-1 text-xs text-green-300 bg-green-800 rounded-md pulse-animation">
                          -{bond.discount}% Discount
                        </div>
                      </div>

                      <div className="relative mb-4">
                        <div className="flex justify-between mb-1 text-xs">
                          <div className="px-2 py-1 bg-indigo-800 rounded-l-md">
                            {bond.routeFrom}
                          </div>
                          <div className="px-2 py-1 bg-indigo-800 rounded-r-md">
                            {bond.routeTo}
                          </div>
                        </div>
                        <div
                          className="w-full trade-road"
                          style={{ position: "relative" }}
                        >
                          {/* Animated ship for this card */}
                          <span
                            style={{
                              position: "absolute",
                              top: "-22px",
                              left: `calc(${shipPositions[idx]}% - 12px)`,
                              transition: "left 0.04s linear",
                              fontSize: "1.5rem",
                              zIndex: 2,
                              pointerEvents: "none",
                            }}
                          >
                            🚢
                          </span>
                        </div>
                        <div
                          className="absolute text-2xl"
                          style={{
                            top: "-10px",
                            left: "10%",
                            transform: "rotate(15deg)",
                          }}
                        >
                          {bond.isLp ? "⚓" : "📦"}
                        </div>
                        <div
                          className="absolute text-2xl"
                          style={{ top: "-5px", left: "80%" }}
                        >
                          🏙️
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Market Price:</span>
                          <span>${bond.marketPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bond Price:</span>
                          <span className="text-green-400">
                            ${bond.bondPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vesting Term:</span>
                          <span>{bond.vestingTerm}</span>
                        </div>

                        <div className="mt-2">
                          <div className="flex justify-between mb-1 text-xs">
                            <span>Capacity:</span>
                            <span>{bond.capacityUsed.toFixed(1)}% Used</span>
                          </div>
                          <div className="h-3 overflow-hidden border border-indigo-700 rounded-full bg-indigo-950">
                            <div
                              className="relative h-full overflow-hidden rounded-full"
                              style={{
                                width: `${bond.capacityUsed}%`,
                                backgroundColor: bond.color,
                              }}
                            >
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                style={{
                                  animation: "wave 2s ease-in-out infinite",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Bonds */}
              <div className="relative p-5 overflow-hidden bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                <div className="absolute top-0 right-0 p-4 text-4xl bob-animation">
                  🏛️
                </div>

                <h2 className="flex items-center mb-4 text-xl font-bold text-blue-400">
                  <Package className="mr-2 text-yellow-400" size={24} />
                  Your Active Shipments
                </h2>

                {activeBonds.length > 0 ? (
                  <div className="space-y-4">
                    {activeBonds.map((bond) => (
                      <div
                        key={bond.id}
                        className="relative p-4 overflow-hidden bg-gradient-to-b from-[#1B0036] to-[#1A1135]  rounded-md"
                      >
                        <div className="flex justify-between mb-3">
                          <div className="flex items-center">
                            <div
                              className="p-1 mr-2 text-2xl rounded-full bg-opacity-30"
                              style={{ backgroundColor: bond.color }}
                            >
                              {bond.icon}
                            </div>
                            <h3 className="font-semibold">
                              {bond.type} License
                            </h3>
                          </div>
                          <div className="flex items-center px-2 py-1 text-sm bg-indigo-700 rounded-md">
                            <Clock className="mr-1 text-yellow-400" size={14} />
                            <span>{bond.remainingTime} left</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Shipment Value:</span>
                            <span>{bond.totalValue} $BARON</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Claimed:</span>
                            <span>
                              {bond.claimed} / {bond.totalValue} $BARON
                            </span>
                          </div>

                          <div className="relative h-5 mt-2 overflow-hidden border border-indigo-700 rounded-full bg-indigo-950">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${bond.percentVested}%`,
                                backgroundColor: bond.color,
                              }}
                            >
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                style={{
                                  animation: "wave 3s ease-in-out infinite",
                                }}
                              ></div>
                            </div>

                            {/* Ship moving along the progress bar */}
                            <div
                              className="absolute text-lg transform -translate-y-1/2 top-1/2"
                              style={{ left: `${bond.percentVested - 5}%` }}
                            >
                              🚢
                            </div>
                          </div>

                          <div className="flex justify-between text-xs">
                            <span>{bond.percentVested}% Delivered</span>
                            <span>
                              {bond.claimed} / {bond.totalValue} $BARON Claimed
                            </span>
                          </div>

                          <button className="flex items-center justify-center w-full py-2 mt-3 font-semibold transition-all bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1]">
                            <Coins className="mr-2" size={16} />
                            Claim Delivered $BARON
                          </button>
                        </div>

                        {/* Decorated corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative p-4 overflow-hidden text-center bg-indigo-800 rounded-md">
                    <div className="absolute inset-0 pixelated-bg opacity-30"></div>
                    <p className="text-sm opacity-70">
                      You have no active Import Licenses.
                    </p>
                    <p className="mt-2 text-sm">
                      Purchase a license to acquire discounted $BARON tokens!
                    </p>
                    <div className="mt-4 text-3xl">📜➡️💰</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Bond Info */}
            <div className="col-span-1">
              <div className="relative p-5 mb-6 overflow-hidden bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md glow-effect">
                <div className="absolute top-0 right-0 p-3">
                  <div className="text-3xl spin-animation">💎</div>
                </div>

                <h2 className="mb-4 text-xl font-bold text-blue-400">
                  Trading Guide
                </h2>

                <div className="p-4 space-y-3 text-sm rounded-md pixelated-bg">
                  <p>
                    Import Licenses allow you to acquire $BARON tokens at a
                    discount by establishing trade routes with valuable assets.
                  </p>

                  <div className="py-2">
                    <h3 className="flex items-center mb-2 font-semibold text-yellow-400">
                      <Sparkles className="mr-1" size={16} />
                      Benefits:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <ArrowRight
                          className="flex-shrink-0 mt-1 mr-1 text-green-400"
                          size={14}
                        />
                        <span>Acquire $BARON below market price</span>
                      </div>
                      <div className="flex items-start">
                        <ArrowRight
                          className="flex-shrink-0 mt-1 mr-1 text-green-400"
                          size={14}
                        />
                        <span>Contribute to treasury growth</span>
                      </div>
                      <div className="flex items-start">
                        <ArrowRight
                          className="flex-shrink-0 mt-1 mr-1 text-green-400"
                          size={14}
                        />
                        <span>Create protocol-owned liquidity</span>
                      </div>
                      <div className="flex items-start">
                        <ArrowRight
                          className="flex-shrink-0 mt-1 mr-1 text-green-400"
                          size={14}
                        />
                        <span>Access special route bonuses</span>
                      </div>
                    </div>
                  </div>

                  <p>
                    When you purchase a license, your goods will be shipped over
                    5 days, allowing you to gradually claim your discounted
                    tokens as they arrive.
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 text-5xl opacity-20">
                  🗺️
                </div>
              </div>

              <div className="relative p-5 overflow-hidden bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md float-animation">
                <div className="absolute text-6xl transform -bottom-4 -right-4 opacity-30 rotate-12">
                  ⚓
                </div>

                <h2 className="flex items-center mb-4 text-xl font-bold text-blue-400">
                  <Globe className="mr-2 text-yellow-400" size={24} />
                  Empire Treasury
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md pulse-animation">
                    <span className="flex items-center">
                      <Coins className="mr-2 text-yellow-400" size={18} />
                      Treasury Balance:
                    </span>
                    <span className="font-mono">$2,450,831</span>
                  </div>

                  <div className="relative p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <Anchor className="mr-2 text-yellow-400" size={18} />
                        Backing Per $BARON:
                      </span>
                      <span className="font-mono text-green-400">$1.15</span>
                    </div>
                    <div className="absolute p-1 text-xs bg-green-600 border-2 border-indigo-900 rounded-full -right-2 -top-2 glow-effect">
                      +2.4%
                    </div>
                  </div>

                  <div className="relative p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pixelated-bg"></div>
                    <div className="relative z-10 flex justify-between text-sm">
                      <span className="flex items-center">
                        <Wind className="mr-2 text-yellow-400" size={18} />
                        Protocol-Owned Liquidity:
                      </span>
                      <span className="font-mono">$1,258,750</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="relative inline-block">
                    <div className="spin-animation">
                      <Coins className="text-yellow-400" size={48} />
                    </div>
                    <Sparkles
                      className="absolute top-0 right-0 text-green-400"
                      size={16}
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 mt-6 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                <h2 className="mb-2 text-lg font-bold text-blue-400">
                  Trading Rank
                </h2>
                <div className="flex items-center p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6B46C1] rounded-md">
                  <div className="mr-3 text-3xl">👑</div>
                  <div>
                    <div className="font-bold text-yellow-400">
                      {getTraderTitle()}
                    </div>
                    <div className="text-xs">
                      Purchase more licenses to rank up!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Compass */}
        <div
          className="fixed z-10 hidden cursor-pointer bottom-10 right-10 md:block"
          onClick={() => setShowPurchaseModal(true)}
        >
          <div className="relative p-4 bg-indigo-900 border-4 border-indigo-700 rounded-full float-animation glow-effect">
            <Compass className="text-yellow-400 spin-animation" size={36} />
            <div className="absolute p-1 text-xs bg-green-700 rounded-full -top-2 -right-2 pulse-animation">
              New!
            </div>
          </div>
        </div>

        {/* Purchase Modal */}
        {showPurchaseModal && selectedBond && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-80">
            <div
              className="relative w-full max-w-md p-6 overflow-hidden bg-indigo-900 border-4 border-indigo-700 rounded-md glow-effect"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pixelated-bg"></div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <h3 className="flex items-center text-lg font-bold text-yellow-400">
                  <Ship className="mr-2" size={20} />
                  Purchase {selectedBond.name}
                </h3>
                <button
                  onClick={() => {
                    setShowPurchaseModal(false);
                    setBondAmount("");
                  }}
                  className="p-1 rounded-md hover:bg-indigo-800"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between p-3 bg-indigo-800 rounded-md pulse-animation">
                  <span>Current Discount:</span>
                  <span className="text-lg text-green-400">
                    -{selectedBond.discount}%
                  </span>
                </div>

                <div className="relative p-4 rounded-md bg-gradient-to-r from-indigo-800 to-indigo-900">
                  <div className="absolute px-2 py-1 text-xs font-bold text-black transform -translate-x-1/2 bg-yellow-500 rounded-full -top-3 left-1/2">
                    Trade Route
                  </div>
                  <div className="flex justify-between mt-1 mb-3 text-xs">
                    <div className="px-2 py-1 bg-indigo-900 rounded-md">
                      {selectedBond.routeFrom}
                    </div>
                    <div className="px-2 py-1 bg-indigo-900 rounded-md">
                      {selectedBond.routeTo}
                    </div>
                  </div>
                  <div className="w-full trade-road"></div>
                  <div
                    className="absolute text-2xl"
                    style={{ top: "20px", left: "20%" }}
                  >
                    {selectedBond.icon}
                  </div>
                  <div
                    className="absolute text-2xl"
                    style={{ top: "20px", left: "80%" }}
                  >
                    💰
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Amount to Trade</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={bondAmount}
                      onChange={handleBondAmountChange}
                      className="flex-1 p-2 font-mono border-2 border-indigo-700 bg-indigo-950 rounded-l-md"
                      placeholder="0"
                    />
                    <div className="flex items-center px-3 py-2 bg-indigo-800">
                      <span>
                        {selectedBond.id === "eth"
                          ? "ETH"
                          : selectedBond.id === "dai"
                          ? "DAI"
                          : "LP"}
                      </span>
                    </div>
                    <button
                      className="px-3 py-2 font-semibold transition-all bg-indigo-700 hover:bg-indigo-600 rounded-r-md"
                      onClick={setMaxBondAmount}
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-indigo-800 rounded-md pixelated-bg">
                  <div className="mb-2 text-sm font-bold">
                    Shipment Manifest
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>You Send:</span>
                    <span>
                      {bondAmount || "0"}{" "}
                      {selectedBond.id === "eth"
                        ? "ETH"
                        : selectedBond.id === "dai"
                        ? "DAI"
                        : "LP"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>You Receive:</span>
                    <span className="text-green-400">
                      {calculateReceivedTokens().toLocaleString()} $BARON
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping Time:</span>
                    <span>{selectedBond.vestingTerm}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount:</span>
                    <span className="text-green-400">
                      -{selectedBond.discount}%
                    </span>
                  </div>
                </div>

                {bondAmount && (
                  <div className="p-3 bg-indigo-800 rounded-md">
                    <div className="mb-1 text-center text-yellow-400">
                      Trading Rank
                    </div>
                    <div className="font-bold text-center">
                      {getTraderTitle()}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    className="flex items-center justify-center w-full py-3 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                    disabled={!bondAmount || parseFloat(bondAmount) <= 0}
                    onClick={purchaseBond}
                  >
                    <Anchor className="mr-2" size={18} />
                    Set Sail with {bondAmount || "0"}{" "}
                    {selectedBond.id === "eth"
                      ? "ETH"
                      : selectedBond.id === "dai"
                      ? "DAI"
                      : "LP"}
                  </button>
                  <div className="mt-2 text-xs text-center opacity-70">
                    Goods will be shipped to you over {selectedBond.vestingTerm}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeRealmImportLicensesPage;
