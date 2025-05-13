/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Users,
  Crown,
  Shield,
  Sword,
  Star,
  CheckCircle,
  X,
  Award,
  Zap,
  TrendingUp,
  Map,
  Compass,
  Sparkles,
  Lock,
  Globe,
  FileText,
  AlertTriangle,
  ArrowRight,
  Gift,
  MessageCircle,
  Settings,
  ChevronRight,
  ChevronDown,
  Flag,
  Target,
  PieChart,
  ArrowUp,
  Clock,
  Trophy,
} from "lucide-react";

const AlliancesPage = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedAlliance, setSelectedAlliance] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [allianceStats, setAllianceStats] = useState({
    activeMissions: 3,
    unclaimedRewards: 487,
    lastRankingChange: "+2",
  });
  const [allianceRankings, setAllianceRankings] = useState([
    { name: "Dragon Dynasty", rank: 1, size: 381, territory: 5, change: 0 },
    { name: "Stellar Syndicate", rank: 2, size: 294, territory: 4, change: 1 },
    { name: "Eastern Federation", rank: 3, size: 142, territory: 3, change: 2 },
    {
      name: "Northern Coalition",
      rank: 4,
      size: 187,
      territory: 2,
      change: -2,
    },
    { name: "Western Union", rank: 5, size: 124, territory: 2, change: -1 },
  ]);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [activeMission, setActiveMission] = useState(null);
  const [allianceChatMessages, setAllianceChatMessages] = useState([
    {
      sender: "TradeKing",
      message:
        "Just secured a 45% stake in Silk Road! Eastern Federation pushing to take the lead.",
      time: "14:32",
    },
    {
      sender: "CryptoEmpress",
      message:
        "Great work! I'm focusing on defending our position in Golden Strait.",
      time: "14:45",
    },
    {
      sender: "BaronBitcoin",
      message: "Trade War in 3 days. What's our strategy?",
      time: "15:20",
    },
    {
      sender: "System",
      message:
        "Alliance mission 'Secure Maritime Routes' completed! +500 $BARON to alliance treasury.",
      time: "16:05",
      system: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [allianceVote, setAllianceVote] = useState({
    totalVotes: 124,
    defensive: 72,
    offensive: 38,
    diplomatic: 14,
    yourVote: "defensive",
  });
  const [timeUntilWarCouncil, setTimeUntilWarCouncil] = useState(
    42 * 60 * 60 + 18 * 60
  ); // 42 hours and 18 minutes in seconds
  const [showWarCouncilBadge, setShowWarCouncilBadge] = useState(true);

  // Format time countdown
  const formatCountdown = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    return `${days > 0 ? days + "d " : ""}${hours}h ${minutes}m`;
  };

  // Update war council countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilWarCouncil((prev) => {
        if (prev <= 0) return 7 * 24 * 60 * 60; // Reset to 7 days
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle message sending
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender: "You",
      message: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setAllianceChatMessages([...allianceChatMessages, newMsg]);
    setNewMessage("");
  };

  // Handle join alliance
  const handleJoinAlliance = () => {
    if (!selectedAlliance) return;

    setJoinLoading(true);

    // Simulate API call
    setTimeout(() => {
      setJoinLoading(false);
      setJoinSuccess(true);

      // Reset after showing success
      setTimeout(() => {
        setJoinSuccess(false);
        setShowJoinModal(false);
        // If joining Eastern Federation, switch to "Your Alliance" tab
        if (selectedAlliance.id === "eastern-federation") {
          setActiveTab("your-alliance");
        }
      }, 2000);
    }, 1500);
  };

  // Mission data
  const allianceMissions = [
    {
      id: "secure-routes",
      title: "Secure Maritime Routes",
      description:
        "Deploy forces to secure key maritime trade routes in the Eastern sector.",
      reward: "500 $BARON",
      difficulty: "Medium",
      timeRemaining: "1d 4h",
      progress: 75,
      participants: 28,
      status: "active",
      type: "trade",
      icon: <Globe className="text-blue-400" />,
    },
    {
      id: "alliance-recruitment",
      title: "Alliance Recruitment Drive",
      description:
        "Recruit new members to strengthen our alliance before the next Trade War.",
      reward: "350 $BARON + Rank XP",
      difficulty: "Easy",
      timeRemaining: "2d 12h",
      progress: 60,
      participants: 47,
      status: "active",
      type: "diplomatic",
      icon: <Users className="text-green-400" />,
    },
    {
      id: "resource-raid",
      title: "Resource Raid Operation",
      description:
        "Launch a coordinated raid on Northern Coalition resources during their vulnerable period.",
      reward: "850 $BARON + Territory Control",
      difficulty: "Hard",
      timeRemaining: "6h 30m",
      progress: 40,
      participants: 18,
      status: "active",
      type: "war",
      icon: <Sword className="text-red-400" />,
    },
    {
      id: "intelligence-gathering",
      title: "Intelligence Gathering",
      description:
        "Collect information on enemy trade strategies and defensive positioning.",
      reward: "300 $BARON + Strategic Intelligence",
      difficulty: "Medium",
      timeRemaining: "1d 18h",
      progress: 25,
      participants: 12,
      status: "active",
      type: "intelligence",
      icon: <FileText className="text-purple-400" />,
    },
  ];

  // Alliance data
  const alliances = [
    {
      id: "shadow-network",
      name: "Shadow Network",
      type: "Luxury Goods Alliance",
      description:
        "A secretive network of luxury goods traders with exclusive access to high-margin routes",
      logo: "🕸️",
      members: 78,
      ranking: 8,
      territories: 1,
      totalStaked: "352,487",
      accessRequirement: "Hold 1,000+ $SHADOW tokens",
      specialty: "Hidden transactions with 3x returns",
      color: "#2D2D2D",
      routeAccess: "Shadow Routes",
      specialPower: "Market Invisibility",
      bonuses: [
        "20% higher transaction volume",
        "Hidden transaction bonuses",
        "Special war mechanics",
        "Luxury goods trade rights",
      ],
    },
    {
      id: "x33-fleet",
      name: "X33 Trade Fleet",
      type: "Naval Network",
      description:
        "The dominant force in maritime trade routes with superior naval technology",
      logo: "⚓",
      members: 104,
      ranking: 6,
      territories: 2,
      totalStaked: "495,628",
      accessRequirement: "Hold any X33 tokens",
      specialty: "Naval trade dominance",
      color: "#0277BD",
      routeAccess: "Oceanic Routes",
      specialPower: "Sea Dominance",
      bonuses: [
        "10% faster rebasing",
        "Multi-node connections",
        "Defensive war bonuses",
        "Exclusive naval technology",
      ],
    },
    {
      id: "derp-guild",
      name: "DERP Guild",
      type: "Exploration Alliance",
      description:
        "An adventurous guild focused on discovering new trade routes and exotic resources",
      logo: "🧭",
      members: 63,
      ranking: 12,
      territories: 1,
      totalStaked: "289,752",
      accessRequirement: "Hold at least one DERP NFT",
      specialty: "Route discovery and exotic goods",
      color: "#8E24AA",
      routeAccess: "Unexplored Territories",
      specialPower: "Discovery Chance",
      bonuses: [
        "Random 3x yield multipliers",
        "Special diplomacy options",
        "Surprise rewards",
        "First access to new routes",
      ],
    },
    {
      id: "eastern-federation",
      name: "Eastern Federation",
      type: "Trading Consortium",
      description:
        "A powerful trading alliance that controls key routes in the Eastern territories",
      logo: "🏯",
      members: 142,
      ranking: 3,
      territories: 3,
      totalStaked: "648,500",
      accessRequirement: "Open Membership",
      specialty: "Balanced trade and warfare",
      color: "#D32F2F",
      routeAccess: "Eastern Trade Routes",
      specialPower: "Diplomatic Influence",
      bonuses: [
        "+5% Staking Rewards",
        "-10% Import License Costs",
        "+15% Trade War Rewards",
        "Access to Eastern Trade Routes",
      ],
    },
  ];

  // Get user's alliance
  const userAlliance = alliances.find((a) => a.id === "eastern-federation");

  // Render alliance card
  const renderAllianceCard = (alliance, isCurrentMember = false) => (
    <div
      key={alliance.id}
      className={`bg-indigo-900 border-4 rounded-md p-4 hover:border-indigo-500 transition-all ${
        isCurrentMember ? "border-yellow-600" : "border-indigo-700"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{alliance.name}</h3>
            {isCurrentMember && (
              <span className="bg-yellow-600 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                MEMBER
              </span>
            )}
          </div>
          <div className="mt-1 text-xs opacity-70">{alliance.type}</div>
        </div>
        <div
          className="p-2 text-3xl rounded-md"
          style={{
            backgroundColor: `${alliance.color}30`,
            border: `2px solid ${alliance.color}80`,
          }}
        >
          {alliance.logo}
        </div>
      </div>

      <div className="mb-4 text-sm opacity-80">{alliance.description}</div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
        <div className="p-2 text-center bg-indigo-800 rounded-md">
          <div className="text-xs opacity-70">Members</div>
          <div className="font-bold">{alliance.members}</div>
        </div>
        <div className="p-2 text-center bg-indigo-800 rounded-md">
          <div className="text-xs opacity-70">Ranking</div>
          <div className="font-bold">#{alliance.ranking}</div>
        </div>
        <div className="p-2 text-center bg-indigo-800 rounded-md">
          <div className="text-xs opacity-70">Territory</div>
          <div className="font-bold">{alliance.territories}</div>
        </div>
      </div>

      <div className="mb-4 space-y-2 text-sm">
        <div>
          <span className="opacity-70">Requirement:</span>
          <div className="flex items-center p-2 mt-1 text-xs bg-indigo-800 rounded-md">
            {alliance.accessRequirement === "Open Membership" ? (
              <>
                <CheckCircle size={14} className="mr-1 text-green-400" />
                <span>Open Membership</span>
              </>
            ) : (
              <>
                <Lock size={14} className="mr-1 text-yellow-400" />
                <span>{alliance.accessRequirement}</span>
              </>
            )}
          </div>
        </div>

        <div>
          <span className="opacity-70">Specialty:</span>
          <div className="p-2 mt-1 text-xs bg-indigo-800 rounded-md">
            {alliance.specialty}
          </div>
        </div>
      </div>

      {isCurrentMember ? (
        <button
          className="flex items-center justify-center w-full gap-2 py-2 font-semibold transition-all bg-indigo-700 rounded-md hover:bg-indigo-600"
          onClick={() => setActiveTab("your-alliance")}
        >
          <Crown size={16} className="text-yellow-400" />
          <span>View Alliance</span>
        </button>
      ) : (
        <button
          className="flex items-center justify-center w-full gap-2 py-2 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
          onClick={() => {
            setSelectedAlliance(alliance);
            setShowJoinModal(true);
          }}
        >
          <Users size={16} />
          <span>Join Alliance</span>
        </button>
      )}
    </div>
  );

  // Handle chat message enter key
  const handleMessageKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen text-white bg-indigo-950">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <div className="stars"></div>
        <div className="pixel-grid"></div>
        <div className="alliance-network"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 bg-indigo-900 border-b-4 border-indigo-700">
        <h1 className="flex items-center text-xl font-bold tracking-wider text-yellow-400 md:text-2xl">
          <Users className="mr-2" size={24} />
          Trade Alliances
        </h1>

        {activeTab === "your-alliance" && (
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center px-3 py-1 bg-indigo-800 rounded-md">
              <Clock size={16} className="mr-1 text-yellow-400" />
              <span className="text-sm">
                War Council:{" "}
                <span className="text-yellow-400">
                  {formatCountdown(timeUntilWarCouncil)}
                </span>
              </span>
            </div>
            <div className="flex items-center px-3 py-1 text-sm bg-indigo-800 rounded-md">
              <Sparkles className="mr-1 text-green-400" size={16} />
              <span className="mr-1">Alliance Rank:</span>
              <span className="font-bold text-green-400">#3</span>
              <span className="flex items-center ml-1 font-bold text-green-400">
                <ArrowUp size={14} /> 2
              </span>
            </div> */}
          </div>
        )}
      </header>

      {/* Tabs */}
      <div className="relative z-10 px-4 bg-indigo-900 border-b border-indigo-700">
        <div className="flex mx-auto space-x-1 max-w-7xl">
          <button
            className={`py-3 px-4 font-semibold border-b-2 transition-all ${
              activeTab === "discover"
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent hover:border-indigo-500"
            }`}
            onClick={() => setActiveTab("discover")}
          >
            Discover Alliances
          </button>
          {userAlliance && (
            <button
              className={`py-3 px-4 font-semibold border-b-2 transition-all flex items-center relative ${
                activeTab === "your-alliance"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent hover:border-indigo-500"
              }`}
              onClick={() => {
                setActiveTab("your-alliance");
                setShowWarCouncilBadge(false);
              }}
            >
              Your Alliance
              {showWarCouncilBadge && (
                <div className="absolute w-3 h-3 bg-red-500 rounded-full -top-1 -right-1 animate-ping"></div>
              )}
            </button>
          )}
          <button
            className={`py-3 px-4 font-semibold border-b-2 transition-all ${
              activeTab === "rankings"
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent hover:border-indigo-500"
            }`}
            onClick={() => setActiveTab("rankings")}
          >
            Alliance Rankings
          </button>
        </div>
      </div>

      <main className="relative z-10 p-4 mx-auto md:p-6 max-w-7xl">
        {/* Discover Alliances Tab */}
        {activeTab === "discover" && (
          <div className="space-y-6">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold">
                Join a Powerful Trade Alliance
              </h2>
              <p className="max-w-2xl mx-auto text-sm opacity-70">
                Form strategic partnerships with other traders to access
                exclusive routes, boost your yields, and dominate in Trade Wars
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {alliances.map((alliance) =>
                renderAllianceCard(
                  alliance,
                  alliance.id === "eastern-federation"
                )
              )}
            </div>

            <div className="p-6 mt-8 bg-indigo-900 border-4 border-indigo-700 rounded-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-800 rounded-full">
                  <Crown size={24} className="text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Form Your Own Alliance</h3>
              </div>

              <p className="mb-4 text-sm">
                Ready to lead? Create your own alliance and recruit barons to
                join your trade empire.
              </p>

              <div className="p-4 mb-4 bg-indigo-800 rounded-md">
                <h4 className="mb-2 font-semibold">Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-semibold">
                        Founder's Pass Required
                      </div>
                      <div className="text-xs opacity-70">
                        Must hold the exclusive Founder's Pass NFT
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-semibold">25,000 $BARON Tokens</div>
                      <div className="text-xs opacity-70">
                        Required initial alliance treasury deposit
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-semibold">
                        Control at Least 2 Trade Routes
                      </div>
                      <div className="text-xs opacity-70">
                        Must demonstrate trade dominance
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <button className="flex items-center justify-center w-full gap-2 py-3 font-semibold transition-all bg-indigo-700 rounded-md hover:bg-indigo-600">
                <Flag size={18} />
                <span>Found New Alliance</span>
              </button>
            </div>
          </div>
        )}

        {/* Your Alliance Tab */}
        {activeTab === "your-alliance" && userAlliance && (
          <div className="space-y-6">
            {/* Alliance Header */}
            <div className="relative p-4 overflow-hidden bg-indigo-900 border-4 border-yellow-600 rounded-md sm:p-6">
              {/* Background decoration */}
              <div
                className="absolute w-40 h-40 rounded-full -top-10 -right-10 opacity-10"
                style={{ backgroundColor: userAlliance.color }}
              ></div>

              <div className="relative z-10 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div
                    className="self-start p-3 text-4xl rounded-lg sm:text-5xl"
                    style={{
                      backgroundColor: `${userAlliance.color}30`,
                      border: `3px solid ${userAlliance.color}`,
                    }}
                  >
                    {userAlliance.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400 sm:text-2xl">
                      {userAlliance.name}
                    </h3>
                    <div className="mt-1 text-sm opacity-70">
                      {userAlliance.type}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <div className="flex items-center px-2 py-1 text-xs bg-indigo-800 rounded">
                        <Users size={12} className="mr-1" />
                        {userAlliance.members} Members
                      </div>
                      <div className="flex items-center px-2 py-1 text-xs bg-indigo-800 rounded">
                        <Trophy size={12} className="mr-1 text-yellow-400" />
                        Rank #{userAlliance.ranking}
                      </div>
                      <div className="flex items-center px-2 py-1 text-xs bg-indigo-800 rounded">
                        <Map size={12} className="mr-1 text-green-400" />
                        {userAlliance.territories} Territories
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap w-full gap-2 sm:gap-3 md:w-auto">
                  <button
                    className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-semibold transition-all bg-red-700 rounded-md md:flex-none sm:px-4 sm:text-base hover:bg-red-600"
                    onClick={() => setShowStrategyModal(true)}
                  >
                    <Sword size={16} />
                    <span>War Council</span>
                    {showWarCouncilBadge && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                  <button
                    className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-semibold transition-all bg-green-700 rounded-md md:flex-none sm:px-4 sm:text-base hover:bg-green-600"
                    onClick={() => {
                      setActiveMission(allianceMissions[2]);
                      setShowMissionModal(true);
                    }}
                  >
                    <Target size={16} />
                    <span>Join Mission</span>
                  </button>
                  <button className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-semibold transition-all bg-indigo-700 rounded-md md:flex-none sm:px-4 sm:text-base hover:bg-indigo-600">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Alliance Dashboard */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Alliance Bonuses */}
              <div className="p-4 bg-indigo-900 border-4 border-indigo-700 rounded-md">
                <h4 className="flex items-center gap-2 mb-3 font-semibold">
                  <Award size={18} className="text-yellow-400" />
                  Alliance Bonuses
                </h4>
                <ul className="space-y-2 text-sm">
                  {userAlliance.bonuses.map((bonus, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle
                        size={16}
                        className="flex-shrink-0 text-green-400"
                      />
                      <span>{bonus}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 mt-4 border-t border-indigo-700">
                  <div className="mb-1 text-xs opacity-70">Special Power</div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 font-semibold text-yellow-400 bg-indigo-800 rounded">
                      {userAlliance.specialPower}
                    </div>
                    <button className="flex items-center text-xs text-indigo-400 hover:text-indigo-300">
                      Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Missions */}
              <div className="p-4 bg-indigo-900 border-4 border-indigo-700 rounded-md">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="flex items-center gap-2 font-semibold">
                    <Target size={18} className="text-red-400" />
                    Active Missions
                  </h4>
                  <div className="text-xs bg-indigo-800 px-2 py-0.5 rounded-full">
                    {allianceStats.activeMissions} Missions
                  </div>
                </div>
                <ul className="space-y-2">
                  {allianceMissions.slice(0, 3).map((mission, index) => (
                    <li
                      key={index}
                      className="p-2 text-sm transition-all bg-indigo-800 rounded-md cursor-pointer hover:bg-indigo-700"
                      onClick={() => {
                        setActiveMission(mission);
                        setShowMissionModal(true);
                      }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-1 font-semibold">
                          {mission.icon}
                          <span>{mission.title}</span>
                        </div>
                        <div className="text-xs bg-indigo-900 px-1.5 py-0.5 rounded-full flex items-center">
                          <Clock size={10} className="mr-0.5" />
                          {mission.timeRemaining}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="opacity-70">
                          {mission.participants} Participants
                        </span>
                        <span className="text-yellow-400">
                          +{mission.reward.split(" ")[0]} $BARON
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 bg-indigo-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            mission.progress > 66
                              ? "bg-green-500"
                              : mission.progress > 33
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${mission.progress}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full mt-3 bg-indigo-700 hover:bg-indigo-600 py-1.5 rounded-md text-sm font-semibold transition-all"
                  onClick={() => {
                    // Show all missions
                  }}
                >
                  View All Missions
                </button>
              </div>

              {/* Alliance Resources */}
              <div className="p-4 bg-indigo-900 border-4 border-indigo-700 rounded-md">
                <h4 className="flex items-center gap-2 mb-3 font-semibold">
                  <PieChart size={18} className="text-blue-400" />
                  Alliance Resources
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Alliance Treasury:</span>
                      <span className="font-mono">52,487 $BARON</span>
                    </div>
                    <div className="h-2 overflow-hidden bg-indigo-800 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-0.5">
                      <span className="opacity-70">Weekly Growth</span>
                      <span className="text-green-400">+12.4%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Member Stake:</span>
                      <span className="font-mono">
                        {userAlliance.totalStaked} $BARON
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden bg-indigo-800 rounded-full">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-0.5">
                      <span className="opacity-70">Weekly Growth</span>
                      <span className="text-green-400">+8.7%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Battle Strength:</span>
                      <span className="font-mono">78,295 Power</span>
                    </div>
                    <div className="h-2 overflow-hidden bg-indigo-800 rounded-full">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-0.5">
                      <span className="opacity-70">Vs. Nearest Rival</span>
                      <span className="text-red-400">-12.3%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    className="flex items-center justify-center gap-1 py-2 text-sm font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                    onClick={() => {
                      // Contribute resources
                    }}
                  >
                    <Gift size={14} />
                    <span>Contribute</span>
                  </button>
                  <button className="flex items-center justify-center gap-1 py-2 text-sm font-semibold transition-all bg-indigo-700 rounded-md hover:bg-indigo-600">
                    <Zap size={14} />
                    <span>Claim Rewards</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Alliance Communication and Territory */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Alliance Chat */}
              <div className="flex flex-col p-4 bg-indigo-900 border-4 border-indigo-700 rounded-md h-96">
                <h4 className="flex items-center gap-2 mb-3 font-semibold">
                  <MessageCircle size={18} className="text-blue-400" />
                  Alliance Communication
                </h4>

                <div className="flex-1 pr-2 mb-3 space-y-2 overflow-y-auto alliance-chat">
                  {allianceChatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`${
                        msg.system
                          ? "bg-indigo-800 text-xs p-2 rounded-md opacity-75 text-center"
                          : "flex gap-2"
                      }`}
                    >
                      {!msg.system && (
                        <>
                          <div className="text-sm font-bold whitespace-nowrap">
                            {msg.sender}:
                          </div>
                          <div className="text-sm break-words">
                            {msg.message}
                          </div>
                          <div className="text-xs opacity-50 whitespace-nowrap">
                            {msg.time}
                          </div>
                        </>
                      )}
                      {msg.system && (
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles size={12} className="text-yellow-400" />
                          {msg.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleMessageKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 p-2 text-sm bg-indigo-800 border border-indigo-700 rounded-l-md"
                  />
                  <button
                    className="px-3 py-2 transition-all bg-indigo-700 hover:bg-indigo-600 rounded-r-md"
                    onClick={handleSendMessage}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Controlled Territory */}
              <div className="p-4 bg-indigo-900 border-4 border-indigo-700 rounded-md h-96">
                <h4 className="flex items-center gap-2 mb-3 font-semibold">
                  <Map size={18} className="text-green-400" />
                  Controlled Territory
                </h4>

                <div className="relative h-full">
                  {/* Map data visualization would go here - placeholder for now */}
                  <div className="absolute overflow-hidden bg-indigo-800 rounded-lg inset-4">
                    <div className="w-full h-full territory-map">
                      {/* Zone markers */}
                      <div className="absolute left-[35%] top-[40%] p-3 bg-blue-500 bg-opacity-20 border-2 border-blue-500 rounded-full flex items-center justify-center">
                        <div className="absolute w-16 h-16 border-4 border-blue-500 rounded-full opacity-20 animate-ping"></div>
                        <Map size={20} className="text-blue-400" />
                      </div>
                      <div className="absolute left-[65%] top-[30%] p-3 bg-green-500 bg-opacity-20 border-2 border-green-500 rounded-full flex items-center justify-center">
                        <div className="absolute w-16 h-16 border-4 border-green-500 rounded-full opacity-20 animate-ping"></div>
                        <Map size={20} className="text-green-400" />
                      </div>
                      <div className="absolute left-[25%] top-[65%] p-3 bg-yellow-500 bg-opacity-20 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                        <div className="absolute w-16 h-16 border-4 border-yellow-500 rounded-full opacity-20 animate-ping"></div>
                        <Map size={20} className="text-yellow-400" />
                      </div>

                      {/* Lines connecting zones */}
                      <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                        <line
                          x1="35%"
                          y1="40%"
                          x2="65%"
                          y2="30%"
                          stroke="#4299E1"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="territory-line"
                        />
                        <line
                          x1="35%"
                          y1="40%"
                          x2="25%"
                          y2="65%"
                          stroke="#4299E1"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="territory-line"
                        />
                        <line
                          x1="65%"
                          y1="30%"
                          x2="25%"
                          y2="65%"
                          stroke="#4299E1"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="territory-line"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alliance Rankings Tab */}
        {activeTab === "rankings" && (
          <div className="space-y-6">
            <div className="p-6 bg-indigo-900 border-4 border-indigo-700 rounded-md">
              <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
                <Trophy size={24} className="text-yellow-400" />
                Global Alliance Rankings
              </h3>

              <div className="px-1 -mx-4 overflow-x-auto sm:mx-0 sm:px-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead className="border-b border-indigo-700">
                      <tr className="text-left">
                        <th className="pb-3">Rank</th>
                        <th className="pb-3">Alliance</th>
                        <th className="pb-3 text-right">Members</th>
                        <th className="pb-3 text-right">Territories</th>
                        <th className="pb-3 text-right">Weekly Change</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-800">
                      {allianceRankings.map((alliance, index) => (
                        <tr
                          key={index}
                          className={`${
                            alliance.name === "Eastern Federation"
                              ? "bg-indigo-800 bg-opacity-50"
                              : ""
                          }`}
                        >
                          <td className="py-4 font-bold">{alliance.rank}</td>
                          <td className="py-4">
                            <div
                              className={`font-semibold ${
                                alliance.name === "Eastern Federation"
                                  ? "text-yellow-400"
                                  : ""
                              }`}
                            >
                              {alliance.name}
                            </div>
                          </td>
                          <td className="py-4 text-right">{alliance.size}</td>
                          <td className="py-4 text-right">
                            {alliance.territory}
                          </td>
                          <td className="py-4 text-right">
                            {alliance.change > 0 && (
                              <span className="text-green-400">
                                +{alliance.change}
                              </span>
                            )}
                            {alliance.change < 0 && (
                              <span className="text-red-400">
                                {alliance.change}
                              </span>
                            )}
                            {alliance.change === 0 && (
                              <span className="opacity-50">—</span>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            {alliance.name === "Eastern Federation" ? (
                              <button
                                className="px-3 py-1 text-sm transition-all bg-indigo-700 rounded-md hover:bg-indigo-600"
                                onClick={() => setActiveTab("your-alliance")}
                              >
                                View
                              </button>
                            ) : (
                              <button className="px-3 py-1 text-sm transition-all bg-indigo-700 rounded-md hover:bg-indigo-600">
                                Details
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 mt-6 bg-indigo-800 rounded-md">
                <h4 className="mb-3 font-semibold">Alliance Ranking Rewards</h4>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                  <div className="p-3 bg-indigo-900 border-l-4 border-yellow-400 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy size={16} className="text-yellow-400" />
                      <span className="font-semibold">Top Alliance (#1)</span>
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>30% APY boost for all members</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>Exclusive top-tier trade routes</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>20,000 $BARON weekly bonus</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-indigo-900 border-l-4 border-gray-400 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={16} className="text-gray-400" />
                      <span className="font-semibold">Silver Tier (#2-3)</span>
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>15% APY boost for all members</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>Premium trade route access</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>10,000 $BARON weekly bonus</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-indigo-900 border-l-4 border-yellow-700 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={16} className="text-yellow-700" />
                      <span className="font-semibold">Bronze Tier (#4-10)</span>
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>5% APY boost for all members</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>Special trade route access</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-400" />
                        <span>5,000 $BARON weekly bonus</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-indigo-900 border-4 border-indigo-700 rounded-md">
              <h3 className="mb-4 text-xl font-bold">
                Recent Alliance Conflicts
              </h3>

              <div className="space-y-4">
                <div className="p-3 bg-indigo-800 rounded-md sm:p-4">
                  <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
                    <div className="flex items-center gap-3">
                      <Sword size={20} className="flex-shrink-0 text-red-400" />
                      <div>
                        <div className="text-sm font-semibold sm:text-base">
                          Merchant Haven Conflict
                        </div>
                        <div className="text-xs opacity-70">2 days ago</div>
                      </div>
                    </div>
                    <div className="bg-green-900 text-green-400 text-xs px-2 py-0.5 rounded-full font-semibold self-start">
                      Victory
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-2 text-sm sm:flex-row sm:gap-0">
                    <div className="flex items-center gap-2">
                      <span className="opacity-70">Eastern Federation</span>
                      <span className="text-green-400">vs.</span>
                      <span className="opacity-70">Northern Coalition</span>
                    </div>
                    <span className="text-yellow-400">
                      +425 $BARON War Spoils
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-indigo-800 rounded-md sm:p-4">
                  <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
                    <div className="flex items-center gap-3">
                      <Sword size={20} className="flex-shrink-0 text-red-400" />
                      <div>
                        <div className="text-sm font-semibold sm:text-base">
                          Golden Strait Dispute
                        </div>
                        <div className="text-xs opacity-70">5 days ago</div>
                      </div>
                    </div>
                    <div className="bg-red-900 text-red-400 text-xs px-2 py-0.5 rounded-full font-semibold self-start">
                      Defeat
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-2 text-sm sm:flex-row sm:gap-0">
                    <div className="flex items-center gap-2">
                      <span className="opacity-70">Eastern Federation</span>
                      <span className="text-green-400">vs.</span>
                      <span className="opacity-70">Dragon Dynasty</span>
                    </div>
                    <span className="text-red-400">Territory Lost</span>
                  </div>
                </div>

                <div className="p-3 bg-indigo-800 rounded-md sm:p-4">
                  <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
                    <div className="flex items-center gap-3">
                      <Shield
                        size={20}
                        className="flex-shrink-0 text-blue-400"
                      />
                      <div>
                        <div className="text-sm font-semibold sm:text-base">
                          Non-Aggression Pact
                        </div>
                        <div className="text-xs opacity-70">1 week ago</div>
                      </div>
                    </div>
                    <div className="bg-blue-900 text-blue-400 text-xs px-2 py-0.5 rounded-full font-semibold self-start">
                      Diplomacy
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-2 text-sm sm:flex-row sm:gap-0">
                    <div className="flex items-center gap-2">
                      <span className="opacity-70">Eastern Federation</span>
                      <span className="text-green-400">with</span>
                      <span className="opacity-70">X33 Trade Fleet</span>
                    </div>
                    <span className="text-blue-400">Mutual Defense</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Join Alliance Modal */}
      {showJoinModal && selectedAlliance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div
            className="w-full max-w-md p-6 bg-indigo-900 border-4 border-indigo-700 rounded-md animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {joinSuccess ? (
              <div className="py-6 text-center">
                <div className="mb-4 text-6xl">🎉</div>
                <h3 className="mb-2 text-xl font-bold text-green-400">
                  Alliance Joined!
                </h3>
                <p className="text-sm">
                  You are now a member of the {selectedAlliance.name}!
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-yellow-400">
                    Join {selectedAlliance.name}
                  </h3>
                  <button
                    onClick={() => setShowJoinModal(false)}
                    className="p-1 rounded-md hover:bg-indigo-800"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 text-4xl rounded-md"
                    style={{
                      backgroundColor: `${selectedAlliance.color}30`,
                      border: `2px solid ${selectedAlliance.color}`,
                    }}
                  >
                    {selectedAlliance.logo}
                  </div>
                  <div>
                    <div className="text-sm opacity-70">
                      {selectedAlliance.type}
                    </div>
                    <div className="flex gap-2 mt-1">
                      <div className="text-xs bg-indigo-800 px-2 py-0.5 rounded-full">
                        {selectedAlliance.members} Members
                      </div>
                      <div className="text-xs bg-indigo-800 px-2 py-0.5 rounded-full">
                        Rank #{selectedAlliance.ranking}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 space-y-4">
                  <div className="p-3 bg-indigo-800 rounded-md">
                    <h4 className="mb-2 font-semibold">
                      Membership Requirements
                    </h4>
                    {selectedAlliance.accessRequirement ===
                    "Open Membership" ? (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-green-400" />
                        <span>Open to all Trade Barons</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle size={16} className="text-yellow-400" />
                        <span>{selectedAlliance.accessRequirement}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-indigo-800 rounded-md">
                    <h4 className="mb-2 font-semibold">Alliance Benefits</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedAlliance.bonuses.map((bonus, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Star size={14} className="text-yellow-400" />
                          <span>{bonus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="flex items-center justify-center w-full gap-2 py-3 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                  onClick={handleJoinAlliance}
                  disabled={joinLoading}
                >
                  {joinLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      <Users size={18} />
                      <span>Confirm Membership</span>
                    </>
                  )}
                </button>

                {selectedAlliance.accessRequirement !== "Open Membership" && (
                  <div className="mt-3 text-xs text-center text-yellow-400">
                    <AlertTriangle size={12} className="inline mr-1" />
                    You must meet the token requirements to join this alliance
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Mission Modal */}
      {showMissionModal && activeMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div
            className="w-full max-w-lg p-6 bg-indigo-900 border-4 border-indigo-700 rounded-md animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-400">
                {activeMission.icon}
                {activeMission.title}
              </h3>
              <button
                onClick={() => setShowMissionModal(false)}
                className="p-1 rounded-md hover:bg-indigo-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-indigo-800 rounded-md">
                <div className="mb-3 text-sm">{activeMission.description}</div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-yellow-400" />
                    <span>Time Remaining: {activeMission.timeRemaining}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{activeMission.participants} Participants</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between mb-1 text-xs">
                    <span>Mission Progress</span>
                    <span>{activeMission.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                    <div
                      className={`h-full rounded-full ${
                        activeMission.progress > 66
                          ? "bg-green-500"
                          : activeMission.progress > 33
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${activeMission.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-800 rounded-md">
                <h4 className="flex items-center gap-2 mb-2 font-semibold">
                  <Award size={18} className="text-yellow-400" />
                  Mission Rewards
                </h4>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex-1 px-3 py-2 text-center bg-yellow-900 border border-yellow-700 rounded-md bg-opacity-30">
                    <div className="mb-1 text-xl font-bold text-yellow-400">
                      {activeMission.reward.split(" ")[0]}
                    </div>
                    <div className="text-xs">$BARON Tokens</div>
                  </div>
                  <div className="text-3xl">+</div>
                  <div className="flex-1 px-3 py-2 text-center bg-indigo-800 border border-indigo-700 rounded-md">
                    <div className="mb-1 text-xl font-bold text-blue-400">
                      {activeMission.type === "war"
                        ? "Territory"
                        : activeMission.type === "diplomatic"
                        ? "Rank XP"
                        : activeMission.type === "intelligence"
                        ? "Intel"
                        : "Bonus"}
                    </div>
                    <div className="text-xs">
                      {activeMission.type === "war" ? "Control" : "Bonus"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-800 rounded-md">
                <h4 className="mb-2 font-semibold">Mission Requirements</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span
                      className={
                        activeMission.difficulty === "Easy"
                          ? "text-green-400"
                          : activeMission.difficulty === "Medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }
                    >
                      {activeMission.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minimum Stake:</span>
                    <span>1,000 $BARON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alliance Rank:</span>
                    <span className="text-green-400">Qualified (#3)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  className="py-3 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                  onClick={() => setShowMissionModal(false)}
                >
                  Join Mission
                </button>
                <button
                  className="py-3 font-semibold transition-all bg-indigo-700 rounded-md hover:bg-indigo-600"
                  onClick={() => setShowMissionModal(false)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* War Strategy Modal */}
      {showStrategyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div
            className="w-full max-w-lg p-6 bg-indigo-900 border-4 border-red-900 rounded-md animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-400">
                <Sword size={20} className="text-red-400" />
                War Council Strategy
              </h3>
              <button
                onClick={() => {
                  setShowStrategyModal(false);
                  setShowWarCouncilBadge(false);
                }}
                className="p-1 rounded-md hover:bg-indigo-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-red-900 border border-red-800 rounded-md bg-opacity-30">
                <Trophy size={24} className="text-yellow-400" />
                <div>
                  <div className="font-semibold">Next Trade War</div>
                  <div className="text-sm">
                    Begins in:{" "}
                    <span className="font-bold text-red-400">
                      {formatCountdown(timeUntilWarCouncil)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-800 rounded-md">
                <h4 className="mb-3 font-semibold">Current Alliance Vote</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-blue-400" />
                        <span>Defensive Strategy</span>
                      </div>
                      <span>
                        {Math.round(
                          (allianceVote.defensive / allianceVote.totalVotes) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.round(
                            (allianceVote.defensive / allianceVote.totalVotes) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Sword size={16} className="text-red-400" />
                        <span>Offensive Strategy</span>
                      </div>
                      <span>
                        {Math.round(
                          (allianceVote.offensive / allianceVote.totalVotes) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{
                          width: `${Math.round(
                            (allianceVote.offensive / allianceVote.totalVotes) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-green-400" />
                        <span>Diplomatic Strategy</span>
                      </div>
                      <span>
                        {Math.round(
                          (allianceVote.diplomatic / allianceVote.totalVotes) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${Math.round(
                            (allianceVote.diplomatic /
                              allianceVote.totalVotes) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm opacity-70">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>
                    Your vote:{" "}
                    <span className="text-blue-400">Defensive Strategy</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`p-3 rounded-md flex flex-col items-center ${
                    allianceVote.yourVote === "defensive"
                      ? "bg-blue-700 border-2 border-blue-500"
                      : "bg-indigo-800 hover:bg-indigo-700"
                  }`}
                  onClick={() =>
                    setAllianceVote({ ...allianceVote, yourVote: "defensive" })
                  }
                >
                  <Shield size={24} className="mb-2 text-blue-400" />
                  <span className="text-sm">Defensive</span>
                </button>
                <button
                  className={`p-3 rounded-md flex flex-col items-center ${
                    allianceVote.yourVote === "offensive"
                      ? "bg-red-700 border-2 border-red-500"
                      : "bg-indigo-800 hover:bg-indigo-700"
                  }`}
                  onClick={() =>
                    setAllianceVote({ ...allianceVote, yourVote: "offensive" })
                  }
                >
                  <Sword size={24} className="mb-2 text-red-400" />
                  <span className="text-sm">Offensive</span>
                </button>
                <button
                  className={`p-3 rounded-md flex flex-col items-center ${
                    allianceVote.yourVote === "diplomatic"
                      ? "bg-green-700 border-2 border-green-500"
                      : "bg-indigo-800 hover:bg-indigo-700"
                  }`}
                  onClick={() =>
                    setAllianceVote({ ...allianceVote, yourVote: "diplomatic" })
                  }
                >
                  <Users size={24} className="mb-2 text-green-400" />
                  <span className="text-sm">Diplomatic</span>
                </button>
              </div>

              <div className="p-4 bg-indigo-800 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={18} className="text-yellow-400" />
                  <h4 className="font-semibold">War Target Analysis</h4>
                </div>

                <table className="w-full text-sm">
                  <thead className="text-xs border-b border-indigo-700 opacity-70">
                    <tr>
                      <th className="pb-2 text-left">Alliance</th>
                      <th className="pb-2 text-right">Strength</th>
                      <th className="pb-2 text-right">Territories</th>
                      <th className="pb-2 text-right">Risk/Reward</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-700">
                    <tr>
                      <td className="py-2">Dragon Dynasty</td>
                      <td className="text-right text-red-400">Superior</td>
                      <td className="text-right">5</td>
                      <td className="text-right text-red-400">High/High</td>
                    </tr>
                    <tr>
                      <td className="py-2">Stellar Syndicate</td>
                      <td className="text-right text-yellow-400">Comparable</td>
                      <td className="text-right">4</td>
                      <td className="text-right text-yellow-400">
                        Medium/High
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Northern Coalition</td>
                      <td className="text-right text-green-400">Weaker</td>
                      <td className="text-right">2</td>
                      <td className="text-right text-green-400">Low/Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <button
                  className="flex items-center justify-center w-full gap-2 py-3 font-semibold transition-all bg-red-700 rounded-md hover:bg-red-600"
                  onClick={() => setShowStrategyModal(false)}
                >
                  <Sword size={18} />
                  <span>Cast War Vote</span>
                </button>
                <div className="mt-2 text-xs text-center opacity-70">
                  Final alliance strategy will be determined by majority vote
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

        @keyframes dash {
          to {
            stroke-dashoffset: 20;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
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
            radial-gradient(2px 2px at 300px 590px, white, rgba(0, 0, 0, 0));
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

        .alliance-network {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          background-image: linear-gradient(
              30deg,
              transparent 40%,
              rgba(79, 70, 229, 0.5) 40%,
              rgba(79, 70, 229, 0.5) 60%,
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 20%,
              rgba(124, 58, 237, 0.8) 0%,
              transparent 20%
            ),
            radial-gradient(
              circle at 30% 60%,
              rgba(37, 99, 235, 0.8) 0%,
              transparent 20%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(220, 38, 38, 0.8) 0%,
              transparent 20%
            );
        }

        .territory-map {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232563eb' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .territory-line {
          animation: dash 20s linear infinite;
        }

        .alliance-chat::-webkit-scrollbar {
          width: 8px;
        }

        .alliance-chat::-webkit-scrollbar-track {
          background: rgba(49, 46, 129, 0.5);
          border-radius: 4px;
        }

        .alliance-chat::-webkit-scrollbar-thumb {
          background-color: rgba(99, 102, 241, 0.5);
          border-radius: 4px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loading-spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid white;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default AlliancesPage;
