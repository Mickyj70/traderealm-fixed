import React, { useState, useEffect } from "react";
import {
  X,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Zap,
  Award,
  Star,
  Clock,
  ChevronRight,
  Package,
  ShieldCheck,
  Layers,
  BarChart4,
  Gift,
  Sparkles,
} from "lucide-react";

const ImportLicensesPage = () => {
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [treasuryValue, setTreasuryValue] = useState(2450831);
  const [hoveredLicense, setHoveredLicense] = useState(null);
  const [animateTreasury, setAnimateTreasury] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600 * 5); // 5 hours in seconds
  const [discountTiers, setDiscountTiers] = useState([
    { threshold: 1000, reached: false, bonus: "5% extra $BARON" },
    { threshold: 5000, reached: false, bonus: "Limited Edition Badge" },
    { threshold: 10000, reached: false, bonus: "10% APY boost" },
  ]);

  // Calculate time remaining for bond refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 3600 * 8; // Reset to 8 hours
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time in HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle purchase amount change
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setPurchaseAmount(value);

    // Update discount tiers based on input
    const numValue = parseFloat(value) || 0;
    setDiscountTiers((prev) =>
      prev.map((tier) => ({
        ...tier,
        reached: numValue >= tier.threshold,
      }))
    );
  };

  // Handle purchase submission
  const handlePurchase = () => {
    setShowSuccessAnimation(true);
    setAnimateTreasury(true);

    // Add purchase amount to treasury (for demo purposes)
    const purchaseValue = parseFloat(purchaseAmount) || 0;
    setTreasuryValue((prev) => prev + purchaseValue);

    // Reset animation states after a delay
    setTimeout(() => {
      setShowSuccessAnimation(false);
      setShowPurchaseModal(false);
      setPurchaseAmount("");
      setAnimateTreasury(false);
    }, 3000);
  };

  // Available import licenses
  const licenses = [
    {
      id: "eth-license",
      name: "$S License",
      icon: "🔷",
      discount: 8.5,
      marketPrice: 1.24,
      bondPrice: 1.13,
      vesting: 5,
      iconColor: "#1E90FF",
      description:
        "The classic $S-based license, granting you permission to import $BARON at a significant discount.",
      rarity: "Common",
      bonus: "5% chance of receiving a 2x multiplier on your bond",
    },
    // {
    //   id: "dai-license",
    //   name: "DAI License",
    //   icon: "🔶",
    //   discount: 7.2,
    //   marketPrice: 1.24,
    //   bondPrice: 1.15,
    //   vesting: 5,
    //   iconColor: "#F4B731",
    //   description:
    //     "A stable license backed by DAI, offering consistent discounts with less volatility.",
    //   rarity: "Common",
    //   bonus: "Reduced slippage on large orders",
    // },
    {
      id: "lp-license",
      name: "BARON-$S LP License",
      icon: "💠",
      discount: 12.4,
      marketPrice: 1.24,
      bondPrice: 1.09,
      vesting: 5,
      iconColor: "#9C27B0",
      description:
        "The premium liquidity provider license, offering the deepest discounts for those who support protocol liquidity.",
      rarity: "Rare",
      bonus: "Earn an additional 2% of your bond amount as an LP reward",
    },
    {
      id: "usdc-license",
      name: "USDC License",
      icon: "🔘",
      discount: 6.8,
      marketPrice: 1.24,
      bondPrice: 1.16,
      vesting: 5,
      iconColor: "#2775CA",
      description:
        "A reliable stablecoin license for cautious traders seeking predictable returns.",
      rarity: "Common",
      bonus: "Instant claim of 5% of your bond",
    },
    {
      id: "special-license",
      name: "Merchant Explorer License",
      icon: "🌟",
      discount: 15.2,
      marketPrice: 1.24,
      bondPrice: 1.05,
      vesting: 7,
      iconColor: "#FFD700",
      description:
        "A rare license discovered by the Trade Explorers Guild, with the highest discount but longer vesting.",
      rarity: "Epic",
      bonus: "10% chance to discover a hidden trade route",
      limited: true,
      remaining: 24,
    },
  ];

  // Active bonds/licenses
  const activeBonds = [
    {
      id: 1,
      type: "$S License",
      icon: "🔷",
      amount: 320,
      vestedPercent: 65,
      claimable: 208,
      startDate: "2025-04-23",
      endDate: "2025-04-28",
    },
    {
      id: 2,
      type: "BARON-$S LP",
      icon: "💠",
      amount: 750,
      vestedPercent: 32,
      claimable: 240,
      startDate: "2025-04-24",
      endDate: "2025-04-29",
    },
  ];

  // Calculate bond return based on amount and discount
  const calculateReturn = (amount, discount) => {
    if (!amount) return 0;
    const parsedAmount = parseFloat(amount);
    return Math.round(parsedAmount * (1 + discount / 100));
  };

  return (
    <div className="min-h-screen w-full text-white bg-gradient-to-b from-[#1B0036] to-[#1A1135]">
      {/* Header */}
      <header className="flex items-center justify-between p-2 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-b-2 border-[#6b46c1]">
        <h1 className="flex items-center text-xl font-bold tracking-wider text-yellow-400 md:text-2xl">
          <CreditCard className="mr-2" size={24} />
          Import Licenses
        </h1>
        <div
          className={`bg-gradient-to-b from-[#1B0036] to-[#1A1135] px-4 py-2 rounded-md border-2 ${
            animateTreasury
              ? "border-green-500 animate-pulse"
              : "border-indigo-700"
          }`}
        >
          <span className="mr-1 opacity-70">Treasury:</span>
          <span className="font-mono text-green-400">
            ${treasuryValue.toLocaleString()}
          </span>
        </div>
      </header>

      <main className="w-full p-1 md:p-4">
        {/* Licenses Collection */}
        <div className="relative p-4 mb-6 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6b46c1] rounded-md">
          <div className="absolute top-0 right-0 z-10 flex items-center px-3 py-1 text-sm font-bold text-black bg-yellow-600 border-b-4 border-l-4 border-yellow-800 rounded-bl-md">
            <Clock size={14} className="mr-1" />
            Next Refresh: {formatTime(timeRemaining)}
          </div>

          <div className="relative mb-8 text-center">
            <h2 className="mb-1 text-2xl font-bold">
              Trade (Bond) Assets for $BARON
            </h2>
            <p className="text-sm opacity-70">
              Acquire $BARON tokens at a discount by contributing to the
              treasury
            </p>
            <div className="absolute hidden -right-2 -top-2 lg:block">
              <div className="animate-pulse">
                <Sparkles size={20} className="text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {licenses.map((license) => (
              <div
                key={license.id}
                className="p-4 transition-all duration-300 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6b46c1] hover:border-indigo-500 hover:-translate-y-1 hover:shadow-glow"
                style={{
                  boxShadow:
                    hoveredLicense === license.id
                      ? `0 0 15px ${license.iconColor}50`
                      : "none",
                }}
                onMouseEnter={() => setHoveredLicense(license.id)}
                onMouseLeave={() => setHoveredLicense(null)}
              >
                {/* License Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div
                      className="flex items-center justify-center w-12 h-12 mr-3 text-2xl border-2 rounded-md"
                      style={{
                        backgroundColor: `${license.iconColor}20`,
                        borderColor: license.iconColor,
                        boxShadow: `0 0 10px ${license.iconColor}40`,
                      }}
                    >
                      {license.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{license.name}</h3>
                      <div className="flex items-center text-xs">
                        <div
                          className="px-2 py-0.5 rounded-full text-xs mr-2 flex items-center"
                          style={{
                            backgroundColor:
                              license.rarity === "Epic"
                                ? "#9b59b650"
                                : license.rarity === "Rare"
                                ? "#2980b950"
                                : "#7f8c8d50",
                          }}
                        >
                          {license.rarity === "Epic" && (
                            <Star size={10} className="mr-1 text-purple-300" />
                          )}
                          {license.rarity}
                        </div>
                        <div className="flex items-center text-green-400">
                          <TrendingUp size={12} className="mr-1" />-
                          {license.discount}% Discount
                        </div>
                      </div>
                    </div>
                  </div>

                  {license.limited && (
                    <div className="flex items-center px-2 py-1 text-xs bg-red-900 rounded-full bg-opacity-80">
                      <AlertTriangle size={10} className="mr-1" />
                      <span>{license.remaining} left</span>
                    </div>
                  )}
                </div>

                {/* License Details */}
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">Market Price:</span>
                    <span>${license.marketPrice.toFixed(2)} per $BARON</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Bond Price:</span>
                    <span className="text-green-400">
                      ${license.bondPrice.toFixed(2)} per $BARON
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Vesting Period:</span>
                    <span>{license.vesting} days linear</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Special Bonus:</span>
                    <button
                      className="flex items-center text-yellow-400 hover:underline"
                      onClick={() => {
                        // Show bonus details
                      }}
                    >
                      View <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* License Description */}
                <div className="h-10 mb-4 overflow-hidden text-xs opacity-70">
                  {license.description}
                </div>

                {/* Purchase Button */}
                <button
                  className={`w-full py-3 rounded-md font-semibold transition-all flex items-center justify-center gap-2 
                    ${
                      license.id === "lp-license"
                        ? "bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white"
                        : license.id === "special-license"
                        ? "bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 text-white"
                        : "bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6b46c1] hover:bg-indigo-600 text-white"
                    }`}
                  onClick={() => {
                    setSelectedLicense(license);
                    setShowPurchaseModal(true);
                  }}
                >
                  {license.id === "lp-license" && <Award size={18} />}
                  {license.id === "lp-license"
                    ? "Best Value ✓"
                    : license.id === "special-license"
                    ? "Limited Offer!"
                    : "Purchase License"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Licenses */}
        <div className="p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6b46c1] rounded-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center text-xl font-bold text-yellow-400">
              <Package size={20} className="mr-2" />
              Your Active Licenses
            </h3>
            <button className="flex items-center px-2 py-1 text-sm transition-bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6b46c1] rounded-md hover:bg-indigo-600">
              <Zap size={14} className="mr-1" />
              Claim All
            </button>
          </div>

          {activeBonds.length > 0 ? (
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {activeBonds.map((bond) => (
                  <div
                    key={bond.id}
                    className="p-2 transition-all bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6b46c1] rounded-md hover:border-indigo-500"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div
                          className="flex items-center justify-center w-10 h-10 mr-3 text-xl border border-indigo-600 rounded-md"
                          style={{
                            backgroundColor: `rgba(99, 102, 241, 0.2)`,
                            boxShadow: `0 0 10px rgba(99, 102, 241, 0.3)`,
                          }}
                        >
                          {bond.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{bond.type}</h4>
                          <div className="text-xs opacity-70">
                            Purchased on {bond.startDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-sm">
                        <span className="font-mono text-lg">
                          {bond.amount} $BARON
                        </span>
                        <span className="text-xs">Total Value</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Vesting Progress:</span>
                          <span>{bond.vestedPercent}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                            style={{ width: `${bond.vestedPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="opacity-70">Claimable Now:</span>
                        <span className="text-green-400">
                          {bond.claimable} $BARON
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="opacity-70">Fully Vested:</span>
                        <span>{bond.endDate}</span>
                      </div>

                      <button className="flex items-center justify-center w-full gap-2 py-2 text-sm font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600">
                        <Gift size={16} />
                        Claim {bond.claimable} $BARON
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="mb-3 opacity-50">
                <Package size={40} className="mx-auto" />
              </div>
              <p className="mb-2">You don't have any active licenses yet</p>
              <p className="text-sm opacity-70">
                Purchase a license to receive discounted $BARON tokens
              </p>
            </div>
          )}
        </div>

        {/* License Exchange History */}
        <div className="p-6 mt-6 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6b46c1] rounded-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-yellow-400">
              License Exchange Activity
            </h3>
            <div className="flex items-center px-3 py-1 text-xs bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-2 border-[#6b46c1] rounded-md">
              <ShieldCheck size={14} className="mr-1 text-green-400" />
              Protocol Health: Excellent
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            <div className="flex items-center p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-b-2 border-[#6b46c1] rounded-md">
              <div className="p-2 mr-3 bg-blue-900 rounded-md">
                <Layers size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm opacity-70">24h Volume</div>
                <div className="text-lg font-bold">$125,842</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-b-2 border-[#6b46c1] rounded-md">
              <div className="p-2 mr-3 bg-green-900 rounded-md">
                <BarChart4 size={20} className="text-green-400" />
              </div>
              <div>
                <div className="text-sm opacity-70">Avg. Discount</div>
                <div className="text-lg font-bold">8.4%</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border-b-2 border-[#6b46c1] rounded-md">
              <div className="p-2 mr-3 bg-purple-900 rounded-md">
                <Award size={20} className="text-purple-400" />
              </div>
              <div>
                <div className="text-sm opacity-70">Top License</div>
                <div className="text-lg font-bold">BARON-$S LP</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-center opacity-70">
            Join the ranks of 3,241 Trade Barons who have acquired licenses in
            the past 24 hours
          </div>
        </div>
      </main>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedLicense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div
            className="relative w-full max-w-md p-6 overflow-hidden bg-indigo-900 border-4 border-indigo-700 rounded-md animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {showSuccessAnimation && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-indigo-900 bg-opacity-90 animate-fadeIn">
                <div className="text-center">
                  <div className="mb-3 text-6xl">🎉</div>
                  <h3 className="mb-2 text-xl font-bold text-green-400">
                    License Acquired!
                  </h3>
                  <p className="text-sm">
                    Your $BARON will be vested over {selectedLicense.vesting}{" "}
                    days
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-yellow-400">
                Purchase {selectedLicense.name}
              </h3>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="p-1 rounded-md hover:bg-indigo-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center p-3 mb-4 bg-indigo-800 rounded-md">
              <div
                className="flex items-center justify-center w-12 h-12 mr-3 text-2xl border-2 rounded-md"
                style={{
                  backgroundColor: `${selectedLicense.iconColor}20`,
                  borderColor: selectedLicense.iconColor,
                  boxShadow: `0 0 10px ${selectedLicense.iconColor}40`,
                }}
              >
                {selectedLicense.icon}
              </div>
              <div>
                <div className="font-semibold">{selectedLicense.name}</div>
                <div className="text-sm text-green-400">
                  -{selectedLicense.discount}% Discount
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">
                  Amount to Exchange (USD)
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={purchaseAmount}
                    onChange={handleAmountChange}
                    className="flex-1 p-3 font-mono text-lg border-2 border-indigo-700 bg-indigo-950 rounded-l-md"
                    placeholder="0.00"
                  />
                  <button
                    className="px-4 py-3 font-semibold bg-indigo-700 rounded-r-md"
                    onClick={() => setPurchaseAmount("1000")}
                  >
                    MAX
                  </button>
                </div>
              </div>

              <div className="p-4 bg-indigo-800 rounded-md">
                <div className="mb-3 text-sm font-semibold">
                  Exchange Summary
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Price:</span>
                    <span>${selectedLicense.marketPrice} per $BARON</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Your Price:</span>
                    <span className="text-green-400">
                      ${selectedLicense.bondPrice} per $BARON
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>You Pay:</span>
                    <span>${parseFloat(purchaseAmount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>You Receive:</span>
                    <span className="text-green-400">
                      {calculateReturn(
                        purchaseAmount,
                        selectedLicense.discount
                      )}{" "}
                      $BARON
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vesting Period:</span>
                    <span>{selectedLicense.vesting} days linear</span>
                  </div>
                </div>
              </div>

              {/* Bonus Tiers - visible only when amount entered */}
              {purchaseAmount && parseFloat(purchaseAmount) > 0 && (
                <div className="p-4 bg-indigo-800 rounded-md">
                  <div className="flex items-center mb-3 text-sm font-semibold">
                    <Sparkles size={16} className="mr-2 text-yellow-400" />
                    Bonus Rewards
                  </div>
                  <div className="space-y-2">
                    {discountTiers.map((tier, index) => (
                      <div
                        key={index}
                        className={`flex justify-between text-sm items-center p-2 rounded ${
                          tier.reached
                            ? "bg-green-900 bg-opacity-30"
                            : "bg-indigo-900 bg-opacity-30"
                        }`}
                      >
                        <span className="flex items-center">
                          {tier.reached ? (
                            <div className="flex items-center justify-center w-4 h-4 mr-2 bg-green-500 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                          ) : (
                            <div className="w-4 h-4 mr-2 border border-gray-500 rounded-full"></div>
                          )}
                          ${tier.threshold.toLocaleString()}+
                        </span>
                        <span
                          className={
                            tier.reached ? "text-green-400" : "opacity-70"
                          }
                        >
                          {tier.bonus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  className="flex items-center justify-center w-full gap-2 py-3 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                  disabled={!purchaseAmount || parseFloat(purchaseAmount) <= 0}
                  onClick={handlePurchase}
                >
                  <CreditCard size={18} />
                  Confirm Exchange
                </button>
                <div className="mt-2 text-xs text-center opacity-70">
                  Note: Bonds vest linearly over {selectedLicense.vesting} days
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations & Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .shadow-glow {
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ImportLicensesPage;
