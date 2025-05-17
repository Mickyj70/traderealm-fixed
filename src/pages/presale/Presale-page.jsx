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
  Star,
  Award,
  Check,
  Clock,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import "./presale.css";

const PresalePage = () => {
  const [presaleStage, setPresaleStage] = useState("live"); // 'registration' or 'live'
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [telegramUsername, setTelegramUsername] = useState(""); // New state for Telegram username
  const [walletAddress, setWalletAddress] = useState(""); // New state for wallet address
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [presaleAmount, setPresaleAmount] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentRank, setCurrentRank] = useState("Bronze Tier");
  const [agreedToTerms, setAgreedToTerms] = useState(false); // New state for terms agreement
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

  // Countdown timer logic
  const getCountdownTime = () => {
    const presaleDate = new Date("2025-05-17T12:00:00");
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(getCountdownTime());
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Handle registration submission
  // Handle registration submission
  const handleRegistration = (e) => {
    e.preventDefault();
    if (
      registrationEmail &&
      telegramUsername &&
      walletAddress &&
      agreedToTerms
    ) {
      // In a real app, this would send data to a backend
      console.log("Registration data:", {
        email: registrationEmail,
        telegram: telegramUsername,
        wallet: walletAddress,
        pledgeAmount: pledgeAmount || "0",
      });

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
    <div className="relative w-full h-full overflow-y-auto">
      {/* Animated presale background */}
      {/* <div className="shooting-stars"></div> */}

      {/* Presale content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-full px-4 py-12">
        <div className="mb-6 pixel-container animate-float">
          <div className="mb-2 text-6xl">👑</div>
          <h1 className="mb-2 text-3xl font-bold text-center text-yellow-400 md:text-4xl">
            TradeRealm Presale
          </h1>
          <div className="max-w-md mb-4 text-center text-blue-300">
            Join the founding barons and secure your place in the realm's
            history
          </div>

          {/* Demo toggle switch to show both presale states */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setPresaleStage("registration");
                setIsRegistered(false); // Reset registration state when switching
              }}
              className={`px-4 py-2 rounded-l-md transition-colors duration-200 ${
                presaleStage === "registration"
                  ? "bg-purple-700 text-white"
                  : "bg-indigo-800 text-blue-300 hover:bg-purple-600"
              }`}
            >
              Registration Phase
            </button>
            <button
              onClick={() => setPresaleStage("live")}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                presaleStage === "live"
                  ? "bg-green-700 text-white"
                  : "bg-indigo-800 text-blue-300 hover:bg-green-600"
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
        <div className="w-full max-w-xl p-6 mb-8 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-lg animate-pulse-slow">
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
                <span className="mt-1 text-xs text-blue-300">HOURS</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full py-3 text-2xl font-bold text-center text-white border-2 border-indigo-800 rounded-md bg-indigo-950">
                  {countdown.minutes}
                </div>
                <span className="mt-1 text-xs text-blue-300">MINUTES</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full py-3 text-2xl font-bold text-center text-white border-2 border-indigo-800 rounded-md bg-indigo-950">
                  {countdown.seconds}
                </div>
                <span className="mt-1 text-xs text-blue-300">SECONDS</span>
              </div>
            </div>
          )}

          {presaleStage === "live" && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Presale Progress:</span>
                <span className="text-sm text-green-400">67% Complete</span>
              </div>
              <div className="h-4 overflow-hidden bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-full ">
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

          <div className="p-4 mb-6 bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
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
                        : "Diamond Tier"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {presaleStage === "registration" && !isRegistered && (
            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={registrationEmail}
                  onChange={(e) => setRegistrationEmail(e.target.value)}
                  className="w-full p-3 border-2 border-indigo-700 rounded-md bg-indigo-950"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* New field: Telegram Username */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Telegram Username
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-gray-300 bg-indigo-800 border-2 border-r-0 border-indigo-700 rounded-l-md">
                    @
                  </span>
                  <input
                    type="text"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                    className="flex-1 p-3 border-2 border-indigo-700 rounded-r-md bg-indigo-950"
                    placeholder="your_username"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-blue-300">
                  For community updates and support
                </p>
              </div>

              {/* New field: Wallet Address */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Wallet Address (ETH)
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full p-3 font-mono text-sm border-2 border-indigo-700 rounded-md bg-indigo-950"
                  placeholder="0x..."
                  required
                />
                <p className="mt-1 text-xs text-blue-300">
                  Your ETH wallet for receiving tokens
                </p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Planned Contribution (ETH)
                </label>
                <input
                  type="text"
                  value={pledgeAmount}
                  onChange={(e) => {
                    // Only allow numbers and decimals
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    setPledgeAmount(value);
                  }}
                  className="w-full p-3 border-2 border-indigo-700 rounded-md bg-indigo-950"
                  placeholder="0.0"
                />
              </div>

              <div className="p-3 text-sm border-2 border-indigo-700 rounded-md bg-indigo-950">
                <div className="flex items-center mb-2">
                  <Star size={16} className="mr-2 text-yellow-400" />
                  <span className="font-semibold">Estimated Allocation</span>
                </div>
                <div className="flex justify-between">
                  <span>$BARON Tokens:</span>
                  <span className="font-mono text-green-400">
                    {pledgeAmount
                      ? `${Math.round(
                          parseFloat(pledgeAmount) * 20 * 1000
                        ).toLocaleString()}`
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Supporter Tier:</span>
                  <span
                    className={
                      !pledgeAmount || parseFloat(pledgeAmount) < 1
                        ? "text-gray-400"
                        : parseFloat(pledgeAmount) < 2
                        ? "text-blue-400"
                        : parseFloat(pledgeAmount) < 5
                        ? "text-yellow-400"
                        : "text-purple-400"
                    }
                  >
                    {!pledgeAmount || parseFloat(pledgeAmount) < 1
                      ? "Bronze"
                      : parseFloat(pledgeAmount) < 2
                      ? "Silver"
                      : parseFloat(pledgeAmount) < 5
                      ? "Gold"
                      : "Diamond"}
                  </span>
                </div>
              </div>

              {/* Terms and conditions checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 border-2 border-indigo-700 rounded bg-indigo-950"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-blue-300">
                    I agree to the{" "}
                    <a href="#" className="text-yellow-400 hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and understand the risks involved in cryptocurrency
                    investments
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-lg font-bold text-black transition-all rounded-md bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500"
                disabled={!agreedToTerms}
              >
                Register for Presale
              </button>
            </form>
          )}

          {presaleStage === "live" && (
            <form onSubmit={handlePresaleContribution} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Contribution Amount (ETH)
                </label>
                <input
                  type="text"
                  value={presaleAmount}
                  onChange={(e) => {
                    // Only allow numbers and decimals
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    setPresaleAmount(value);
                  }}
                  className="w-full p-3 border-2 bg-gradient-to-b from-[#1B0036] to-[#1A1135]  border-[#6b46c1]"
                  placeholder="0.0"
                />
              </div>

              <div className="p-3 text-sm border-2 bg-gradient-to-b from-[#1B0036] to-[#1A1135]  border-[#6b46c1]">
                <div className="flex items-center mb-2">
                  <Star size={16} className="mr-2 text-yellow-400" />
                  <span className="font-semibold">Purchase Summary</span>
                </div>
                <div className="flex justify-between">
                  <span>$BARON Tokens:</span>
                  <span className="font-mono text-green-400">
                    {presaleAmount
                      ? `${Math.round(
                          parseFloat(presaleAmount) * 20 * 1000
                        ).toLocaleString()}`
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price per Token:</span>
                  <span className="font-mono">$0.05</span>
                </div>
                <div className="flex justify-between">
                  <span>Supporter Tier:</span>
                  <span
                    className={
                      !presaleAmount || parseFloat(presaleAmount) < 1
                        ? "text-gray-400"
                        : parseFloat(presaleAmount) < 2
                        ? "text-blue-400"
                        : parseFloat(presaleAmount) < 5
                        ? "text-yellow-400"
                        : "text-purple-400"
                    }
                  >
                    {!presaleAmount || parseFloat(presaleAmount) < 1
                      ? "Bronze"
                      : parseFloat(presaleAmount) < 2
                      ? "Silver"
                      : parseFloat(presaleAmount) < 5
                      ? "Gold"
                      : "Diamond"}
                  </span>
                </div>
              </div>

              <div className="p-3 text-sm bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
                <div className="flex items-center mb-2">
                  <Clock size={16} className="mr-2 text-yellow-400" />
                  <span className="font-semibold">Vesting Schedule</span>
                </div>
                <div className="flex justify-between">
                  <span>At Launch (40%):</span>
                  <span className="font-mono">
                    {presaleAmount
                      ? `${Math.round(
                          parseFloat(presaleAmount) * 20 * 1000 * 0.4
                        ).toLocaleString()}`
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>30-Day Linear Vesting (60%):</span>
                  <span className="font-mono">
                    {presaleAmount
                      ? `${Math.round(
                          parseFloat(presaleAmount) * 20 * 1000 * 0.6
                        ).toLocaleString()}`
                      : "0"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-lg font-bold text-black transition-all rounded-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500"
                disabled={!presaleAmount || parseFloat(presaleAmount) < 0.1}
              >
                {!presaleAmount || parseFloat(presaleAmount) < 0.1
                  ? "Enter Valid Amount (Min 0.1 ETH)"
                  : "Purchase $BARON Tokens"}
              </button>
            </form>
          )}
        </div>

        {/* Tier Benefits */}
        <div className="w-full max-w-xl mb-8">
          <h2 className="mb-4 text-xl font-bold text-center text-yellow-400">
            Presale Tier Benefits
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-4 border-2 border-purple-700 rounded-md bg-indigo-950">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-purple-400">Diamond Tier</div>
                <div className="px-2 py-1 text-xs bg-purple-900 rounded-md">
                  5+ ETH
                </div>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>20% bonus APY for 90 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>Exclusive access to White House route</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>Founder's Pass eligibility</span>
                </li>
              </ul>
            </div>

            <div className="p-4 border-2 border-yellow-700 rounded-md bg-indigo-950">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-yellow-400">Gold Tier</div>
                <div className="px-2 py-1 text-xs bg-yellow-900 rounded-md">
                  2-5 ETH
                </div>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>15% bonus APY for 60 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>Early access to new routes (7 days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>Gold supporter badge</span>
                </li>
              </ul>
            </div>

            <div className="p-4 border-2 border-blue-700 rounded-md bg-indigo-950">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-blue-400">Silver Tier</div>
                <div className="px-2 py-1 text-xs bg-blue-900 rounded-md">
                  1-2 ETH
                </div>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>10% bonus APY for 30 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>Silver supporter badge</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>Enhanced voting power (1.5x)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 border-2 border-gray-700 rounded-md bg-indigo-950">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-gray-400">Bronze Tier</div>
                <div className="px-2 py-1 text-xs bg-gray-800 rounded-md">
                  0.1-1 ETH
                </div>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>5% bonus APY for 14 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>Special profile badge</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5 text-green-400"
                  />
                  <span>Early supporter recognition</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Contributors */}
        {presaleStage === "live" && (
          <div className="w-full max-w-xl mb-8">
            <h2 className="mb-4 text-xl font-bold text-center text-yellow-400">
              Recent Contributors
            </h2>
            <div className="overflow-hidden bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
              <div className="p-3 font-semibold bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1]">
                <div className="grid grid-cols-4">
                  <div>Address</div>
                  <div>Amount</div>
                  <div>Time</div>
                  <div>Tier</div>
                </div>
              </div>
              <div className="divide-y divide-indigo-800">
                {recentContributors.map((contributor, index) => (
                  <div
                    key={index}
                    className="p-3 text-sm bg-indigo-950 hover:bg-indigo-900"
                  >
                    <div className="grid grid-cols-4">
                      <div className="font-mono">{contributor.address}</div>
                      <div>{contributor.amount}</div>
                      <div>{contributor.time}</div>
                      <div
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Important Information */}
        <div className="w-full max-w-xl mb-8">
          <h2 className="mb-4 text-xl font-bold text-center text-yellow-400">
            Important Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-4 text-center bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
              <AlertCircle size={24} className="mx-auto mb-2 text-red-400" />
              <h3 className="mb-1 font-semibold">Security Notice</h3>
              <p className="text-xs">
                Only purchase through our official website. Verify all contract
                addresses.
              </p>
            </div>
            <div className="p-4 text-center bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
              <HelpCircle size={24} className="mx-auto mb-2 text-blue-400" />
              <h3 className="mb-1 font-semibold">Support</h3>
              <p className="text-xs">
                Join our Telegram or Discord for assistance with your purchase.
              </p>
            </div>
            <div className="p-4 text-center bg-gradient-to-b from-[#1B0036] to-[#1A1135] border border-[#6b46c1] rounded-md">
              <ExternalLink size={24} className="mx-auto mb-2 text-green-400" />
              <h3 className="mb-1 font-semibold">Resources</h3>
              <p className="text-xs">
                Read our whitepaper and documentation for more details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresalePage;
