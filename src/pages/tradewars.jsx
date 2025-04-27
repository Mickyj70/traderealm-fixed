/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Sword,
  Shield,
  Trophy,
  Clock,
  Skull,
  Zap,
  Target,
  ArrowRight,
  Flag,
  Users,
  AlertTriangle,
  Award,
  ChevronRight,
  Flame,
  Crosshair,
  ArrowUp,
  Sparkles,
  Map,
} from "lucide-react";

const TradeWarComponent = () => {
  const [activeTab, setActiveTab] = useState("active-wars");
  const [selectedWar, setSelectedWar] = useState(null);
  const [attackPower, setAttackPower] = useState(50);
  const [showBattleAnimation, setShowBattleAnimation] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [deployedDefense, setDeployedDefense] = useState(null);
  const [attackTarget, setAttackTarget] = useState(null);
  const [hoveredTerritory, setHoveredTerritory] = useState(null);
  const [battleLogs, setBattleLogs] = useState([]);
  const [allianceBonus, setAllianceBonus] = useState(15);
  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 17,
    minutes: 22,
    seconds: 15,
  });

  // User data
  const userData = {
    baronBalance: 10250,
    stakedBaron: 8750,
    warPoints: 1250,
    warRank: 14,
    attackStrength: 6500,
    defenseStrength: 5000,
    alliance: "Shadow Network",
    troopTypes: [
      {
        id: "infantry",
        name: "Trade Guards",
        count: 250,
        power: 15,
        icon: "👥",
      },
      {
        id: "cavalry",
        name: "Swift Couriers",
        count: 150,
        power: 25,
        icon: "🏇",
      },
      {
        id: "siege",
        name: "Market Disruptors",
        count: 50,
        power: 40,
        icon: "🔨",
      },
      {
        id: "special",
        name: "Shadow Agents",
        count: 20,
        power: 75,
        icon: "🥷",
      },
    ],
  };

  // Active trade wars data
  const tradeWars = [
    {
      id: "silk-road-war",
      routeId: "silk-road",
      name: "Silk Road Siege",
      description:
        "The lucrative Eastern trade route is under attack! Protect your caravans or join the siege.",
      attacker: "TradeKing",
      attackerIcon: "👑",
      defender: "You",
      defenderIcon: "🛡️",
      attackStrength: 6500,
      defenseStrength: 5000,
      timeRemaining: "2d 8h",
      rewards: "2,500 $BARON + Control Bonus",
      status: "active",
      territory: "Eastern Markets",
      background: "linear-gradient(to bottom, #8B5A2B, #4A2511)",
      iconBg: "#D4AF37",
      casualties: { attackers: 280, defenders: 320 },
      warProgress: 65, // percentage
      strategicPoints: [
        {
          id: "caravan-post",
          name: "Caravan Outpost",
          holder: "defender",
          bonus: "+15% defense",
        },
        {
          id: "mountain-pass",
          name: "Mountain Pass",
          holder: "attacker",
          bonus: "+20% attack",
        },
        {
          id: "oasis",
          name: "Desert Oasis",
          holder: null,
          bonus: "+10% resource production",
        },
      ],
    },
    {
      id: "wall-street-war",
      routeId: "wall-street",
      name: "Wall Street Takeover",
      description:
        "Corporate raiders are attempting to seize control of the financial markets!",
      attacker: "CryptoBaroness",
      attackerIcon: "👸",
      defender: "BaronSatoshi",
      defenderIcon: "🤴",
      attackStrength: 12000,
      defenseStrength: 16500,
      timeRemaining: "1d 12h",
      rewards: "3,800 $BARON + Control Bonus",
      status: "active",
      territory: "Financial District",
      background: "linear-gradient(to bottom, #1B5E20, #052e03)",
      iconBg: "#4CAF50",
      casualties: { attackers: 520, defenders: 490 },
      warProgress: 42, // percentage
      strategicPoints: [
        {
          id: "trading-floor",
          name: "Trading Floor",
          holder: "defender",
          bonus: "+25% defense",
        },
        {
          id: "broker-network",
          name: "Broker Network",
          holder: "defender",
          bonus: "+15% resources",
        },
        {
          id: "data-center",
          name: "Data Center",
          holder: null,
          bonus: "+20% intelligence",
        },
      ],
    },
    {
      id: "shadow-network-war",
      routeId: "shadow-network",
      name: "Shadow Network Infiltration",
      description:
        "A coalition of rival alliances is attempting to break into the secretive shadow markets.",
      attacker: "Alliance Coalition",
      attackerIcon: "🌐",
      defender: "Shadow Network",
      defenderIcon: "🕸️",
      attackStrength: 25000,
      defenseStrength: 28000,
      timeRemaining: "3d 5h",
      rewards: "5,500 $BARON + Alliance Bonus",
      status: "active",
      territory: "Underground Markets",
      background: "linear-gradient(to bottom, #424242, #121212)",
      iconBg: "#9E9E9E",
      casualties: { attackers: 1450, defenders: 980 },
      warProgress: 35, // percentage
      strategicPoints: [
        {
          id: "hidden-vault",
          name: "Hidden Vault",
          holder: "defender",
          bonus: "+30% defense",
        },
        {
          id: "informant-network",
          name: "Informant Network",
          holder: "attacker",
          bonus: "+25% intelligence",
        },
        {
          id: "smuggler-docks",
          name: "Smuggler Docks",
          holder: null,
          bonus: "+20% supply speed",
        },
      ],
    },
  ];

  // Leaderboard data
  const warLeaderboard = [
    {
      rank: 1,
      name: "TradeEmperor",
      points: 8750,
      routes: 5,
      badge: "👑",
      winStreak: 12,
      trophy: "🏆",
    },
    {
      rank: 2,
      name: "CryptoBaroness",
      points: 7250,
      routes: 4,
      badge: "⚔️",
      winStreak: 8,
      trophy: "🥇",
    },
    {
      rank: 3,
      name: "BaronSatoshi",
      points: 6500,
      routes: 3,
      badge: "🛡️",
      winStreak: 5,
      trophy: "🥈",
    },
    {
      rank: 4,
      name: "SilkRoadKing",
      points: 5750,
      routes: 3,
      badge: "🏆",
      winStreak: 3,
      trophy: "🥉",
    },
    {
      rank: 5,
      name: "TradeKing",
      points: 4900,
      routes: 2,
      badge: "🏅",
      winStreak: 4,
      trophy: "",
    },
    {
      rank: 6,
      name: "CryptoConqueror",
      points: 3850,
      routes: 3,
      badge: "",
      winStreak: 1,
      trophy: "",
    },
    {
      rank: 7,
      name: "MarketMogul",
      points: 3400,
      routes: 2,
      badge: "",
      winStreak: 0,
      trophy: "",
    },
    {
      rank: 8,
      name: "BaronBull",
      points: 2950,
      routes: 2,
      badge: "",
      winStreak: 2,
      trophy: "",
    },
    {
      rank: 9,
      name: "TradeTitan",
      points: 2600,
      routes: 1,
      badge: "",
      winStreak: 1,
      trophy: "",
    },
    {
      rank: 10,
      name: "RouteRuler",
      points: 2300,
      routes: 1,
      badge: "",
      winStreak: 3,
      trophy: "",
    },
    {
      rank: 14,
      name: "You",
      points: 1250,
      routes: 2,
      badge: "🌟",
      winStreak: 2,
      trophy: "",
    },
  ];

  // Available territories to attack
  const territories = [
    {
      id: "eastern-silk-road",
      name: "Eastern Silk Road",
      type: "High-value commodity route",
      controller: "TradeKing",
      controlPct: 68,
      strength: 8500,
      rewards: 1200,
      position: { x: 70, y: 30 },
      icon: "🏯",
      color: "#E6A817",
    },
    {
      id: "northern-timber",
      name: "Northern Timber Route",
      type: "Resource supply route",
      controller: "BaronBull",
      controlPct: 51,
      strength: 5800,
      rewards: 850,
      position: { x: 25, y: 20 },
      icon: "🌲",
      color: "#2E7D32",
    },
    {
      id: "southern-spice",
      name: "Southern Spice Markets",
      type: "Luxury goods route",
      controller: "MarketMogul",
      controlPct: 42,
      strength: 4200,
      rewards: 950,
      position: { x: 40, y: 75 },
      icon: "🌶️",
      color: "#C62828",
    },
    {
      id: "western-gold",
      name: "Western Gold Rush",
      type: "Mining route",
      controller: "GoldBaron",
      controlPct: 55,
      strength: 7600,
      rewards: 1400,
      position: { x: 15, y: 50 },
      icon: "⛏️",
      color: "#F9A825",
    },
    {
      id: "central-nexus",
      name: "Central Trade Nexus",
      type: "High-traffic hub route",
      controller: "NexusNetwork",
      controlPct: 75,
      strength: 12500,
      rewards: 2200,
      position: { x: 50, y: 50 },
      icon: "🏙️",
      color: "#1565C0",
    },
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Display battle log entries
  useEffect(() => {
    if (selectedWar) {
      // Generate random battle logs for the selected war
      const generateBattleLogs = () => {
        const logs = [
          {
            time: "2h ago",
            type: "attack",
            message: `${selectedWar.attacker} launched a surprise attack on the ${selectedWar.name} supply lines!`,
            icon: <Flame size={16} color="#FF5252" />,
          },
          {
            time: "5h ago",
            type: "defense",
            message: `${selectedWar.defender} reinforced defenses at the ${selectedWar.strategicPoints[0].name}.`,
            icon: <Shield size={16} color="#64B5F6" />,
          },
          {
            time: "12h ago",
            type: "strategic",
            message: `${selectedWar.attacker} captured the ${selectedWar.strategicPoints[1].name} strategic point.`,
            icon: <Flag size={16} color="#FFB300" />,
          },
          {
            time: "18h ago",
            type: "attack",
            message: `${selectedWar.defender} launched a counter-offensive with heavy casualties on both sides.`,
            icon: <Zap size={16} color="#FF5252" />,
          },
          {
            time: "1d ago",
            type: "alliance",
            message: `${userData.alliance} sent reinforcements to support the ${
              selectedWar.defender === "You" ? "defense" : "attack"
            }.`,
            icon: <Users size={16} color="#4CAF50" />,
          },
        ];
        setBattleLogs(logs);
      };

      generateBattleLogs();
    }
  }, [selectedWar]);

  // Handle attack power slider
  const handleAttackPowerChange = (e) => {
    setAttackPower(parseInt(e.target.value));
  };

  // Handle war selection
  const handleWarSelect = (war) => {
    setSelectedWar(selectedWar?.id === war.id ? null : war);
  };

  // Handle defense deployment
  const handleDefenseDeployment = (war) => {
    setDeployedDefense(deployedDefense?.id === war.id ? null : war);

    // Show battle animation
    setShowBattleAnimation(true);
    setTimeout(() => {
      setShowBattleAnimation(false);
    }, 3000);
  };

  // Handle territory attack target selection
  const handleAttackTargetSelect = (territory) => {
    setAttackTarget(attackTarget?.id === territory.id ? null : territory);
  };

  // Launch attack function
  const launchAttack = () => {
    if (!attackTarget) return;

    // Show battle animation
    setShowBattleAnimation(true);
    setTimeout(() => {
      setShowBattleAnimation(false);
      // Show victory modal after battle animation
      setShowVictoryModal(true);
    }, 3000);
  };

  // Format time remaining
  const formatTimeRemaining = (timeStr) => {
    return timeStr.replace("d", " days ").replace("h", " hours");
  };

  return (
    <div className="flex flex-col h-screen text-white bg-gradient-to-b from-indigo-900 via-indigo-950 to-indigo-900">
      {/* Epic War Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
        <div className="h-48 bg-[url('/api/placeholder/800/200')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-800/70 to-indigo-900/70"></div>
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
          <div className="relative z-20 flex flex-col items-center justify-center h-full">
            <div className="flex items-center mb-2">
              <Sword size={28} className="mr-2 text-red-500 animate-pulse" />
              <h1 className="text-4xl font-bold tracking-wider text-white">
                TRADE WARS
              </h1>
              <Sword
                size={28}
                className="ml-2 text-red-500 transform rotate-180 animate-pulse"
              />
            </div>
            <p className="text-lg tracking-wide text-gray-200">
              Epic Battles for Route Domination
            </p>

            {/* War Countdown Timer */}
            <div className="absolute flex items-center px-3 py-2 border rounded-md bottom-4 right-4 bg-black/50 backdrop-blur-sm border-red-500/50">
              <Clock size={16} className="mr-2 text-red-400" />
              <div>
                <div className="text-xs text-gray-300">Next War Phase:</div>
                <div className="font-bold text-red-400">
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
                  {countdown.seconds}s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-2 space-x-1 border-b border-indigo-800 bg-indigo-950">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold flex items-center ${
            activeTab === "active-wars"
              ? "bg-red-900 text-white"
              : "bg-indigo-900 text-gray-300 hover:bg-indigo-800"
          }`}
          onClick={() => setActiveTab("active-wars")}
        >
          <Flame size={16} className="mr-2" />
          Active Battles
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold flex items-center ${
            activeTab === "war-map"
              ? "bg-red-900 text-white"
              : "bg-indigo-900 text-gray-300 hover:bg-indigo-800"
          }`}
          onClick={() => setActiveTab("war-map")}
        >
          <Map size={16} className="mr-2" />
          War Map
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold flex items-center ${
            activeTab === "leaderboard"
              ? "bg-red-900 text-white"
              : "bg-indigo-900 text-gray-300 hover:bg-indigo-800"
          }`}
          onClick={() => setActiveTab("leaderboard")}
        >
          <Trophy size={16} className="mr-2" />
          Leaderboard
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold flex items-center ${
            activeTab === "war-room"
              ? "bg-red-900 text-white"
              : "bg-indigo-900 text-gray-300 hover:bg-indigo-800"
          }`}
          onClick={() => setActiveTab("war-room")}
        >
          <Crosshair size={16} className="mr-2" />
          War Room
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Active Wars Tab */}
        {activeTab === "active-wars" && (
          <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
            {/* Active Wars List */}
            <div className="space-y-4 lg:col-span-2">
              <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
                <div className="flex items-center justify-between p-4 border-b border-indigo-800">
                  <h2 className="flex items-center text-xl font-bold text-red-400">
                    <Flame size={18} className="mr-2" />
                    Active Conflicts
                  </h2>
                  <div className="px-3 py-1 text-xs font-medium bg-indigo-800 rounded-full">
                    {tradeWars.length} ongoing wars
                  </div>
                </div>

                <div className="divide-y divide-indigo-800/50">
                  {tradeWars.map((war) => (
                    <div
                      key={war.id}
                      className={`p-4 hover:bg-indigo-800/30 transition-colors cursor-pointer ${
                        selectedWar?.id === war.id
                          ? "bg-indigo-800/50 border-l-4 border-red-500"
                          : ""
                      }`}
                      onClick={() => handleWarSelect(war)}
                    >
                      <div className="flex items-start">
                        {/* War Icon */}
                        <div
                          className="flex items-center justify-center w-12 h-12 mr-4 text-2xl rounded-md"
                          style={{ background: war.background }}
                        >
                          {war.id === "silk-road-war"
                            ? "🏯"
                            : war.id === "wall-street-war"
                            ? "🏙️"
                            : "🕸️"}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-red-300">
                              {war.name}
                            </h3>
                            <div className="flex items-center px-2 py-1 text-xs rounded-md bg-indigo-950">
                              <Clock size={12} className="mr-1" />
                              <span>{war.timeRemaining}</span>
                            </div>
                          </div>

                          <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                            {war.description}
                          </p>

                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="flex flex-col">
                              <div className="text-xs text-gray-400">
                                Attacker
                              </div>
                              <div className="flex items-center font-semibold text-red-400">
                                <span className="mr-1">{war.attackerIcon}</span>
                                {war.attacker}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-xs text-gray-400">
                                Defender
                              </div>
                              <div
                                className={`font-semibold flex items-center ${
                                  war.defender === "You"
                                    ? "text-green-400"
                                    : "text-blue-400"
                                }`}
                              >
                                <span className="mr-1">{war.defenderIcon}</span>
                                {war.defender}
                              </div>
                            </div>
                          </div>

                          {/* Battle Progress */}
                          <div className="mt-3">
                            <div className="flex justify-between mb-1 text-xs">
                              <div className="flex items-center text-red-400">
                                <Sword size={12} className="mr-1" />
                                {war.attackStrength.toLocaleString()}
                              </div>
                              <div className="text-gray-400">
                                Battle Progress
                              </div>
                              <div className="flex items-center text-blue-400">
                                <Shield size={12} className="mr-1" />
                                {war.defenseStrength.toLocaleString()}
                              </div>
                            </div>
                            <div className="h-2 overflow-hidden bg-gray-800 rounded-full">
                              <div
                                className="h-full bg-gradient-to-r from-red-600 to-red-400"
                                style={{ width: `${war.warProgress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* War Actions */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-xs text-yellow-300">
                              <span>Rewards: {war.rewards}</span>
                            </div>

                            {war.defender === "You" && (
                              <button
                                className={`px-3 py-1 rounded text-xs font-bold ${
                                  deployedDefense?.id === war.id
                                    ? "bg-blue-700 cursor-default"
                                    : "bg-blue-600 hover:bg-blue-500"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDefenseDeployment(war);
                                }}
                              >
                                {deployedDefense?.id === war.id
                                  ? "Defense Active"
                                  : "Reinforce Defenses"}
                              </button>
                            )}

                            {war.attacker !== "You" &&
                              war.defender !== "You" && (
                                <button
                                  className="px-3 py-1 text-xs font-bold bg-purple-600 rounded hover:bg-purple-500"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Join War
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* War Details */}
            <div className="space-y-4">
              {selectedWar ? (
                <>
                  {/* Battle Details Card */}
                  <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
                    <div
                      className="relative h-24"
                      style={{ background: selectedWar.background }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                      <div className="absolute flex items-center bottom-4 left-4">
                        <div className="flex items-center justify-center w-16 h-16 text-3xl rounded-full bg-gray-900/60 backdrop-blur-sm">
                          {selectedWar.id === "silk-road-war"
                            ? "🏯"
                            : selectedWar.id === "wall-street-war"
                            ? "🏙️"
                            : "🕸️"}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-xl font-bold text-white drop-shadow-md">
                            {selectedWar.name}
                          </h3>
                          <div className="flex items-center">
                            <div className="text-xs bg-gray-900/60 backdrop-blur-sm px-2 py-0.5 rounded">
                              {selectedWar.territory}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="mb-4 text-sm text-gray-300">
                        {selectedWar.description}
                      </p>

                      <div className="p-3 mb-4 rounded-md bg-indigo-800/50">
                        <div className="mb-2 text-sm font-semibold">
                          Battle Statistics
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Duration:</span>
                              <span>
                                {formatTimeRemaining(selectedWar.timeRemaining)}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">
                                Attacker Casualties:
                              </span>
                              <span className="text-red-400">
                                {selectedWar.casualties.attackers}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">
                                Defender Casualties:
                              </span>
                              <span className="text-blue-400">
                                {selectedWar.casualties.defenders}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">
                                Attack Power:
                              </span>
                              <span className="text-red-400">
                                {selectedWar.attackStrength.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">
                                Defense Power:
                              </span>
                              <span className="text-blue-400">
                                {selectedWar.defenseStrength.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">
                                Rewards Pool:
                              </span>
                              <span className="text-yellow-400">
                                {selectedWar.rewards}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Strategic Points */}
                      <div className="mb-4">
                        <div className="mb-2 text-sm font-semibold">
                          Strategic Control Points
                        </div>
                        <div className="space-y-2">
                          {selectedWar.strategicPoints.map((point) => (
                            <div
                              key={point.id}
                              className={`flex items-center justify-between p-2 rounded-md ${
                                point.holder === "attacker"
                                  ? "bg-red-900/30 border border-red-700/30"
                                  : point.holder === "defender"
                                  ? "bg-blue-900/30 border border-blue-700/30"
                                  : "bg-gray-800/30 border border-gray-700/30"
                              }`}
                            >
                              <div className="flex items-center">
                                <Flag
                                  size={14}
                                  className={`mr-2 ${
                                    point.holder === "attacker"
                                      ? "text-red-400"
                                      : point.holder === "defender"
                                      ? "text-blue-400"
                                      : "text-gray-400"
                                  }`}
                                />
                                <span className="text-xs">{point.name}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="mr-2 text-xs font-semibold">
                                  {point.bonus}
                                </span>
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    point.holder === "attacker"
                                      ? "bg-red-500"
                                      : point.holder === "defender"
                                      ? "bg-blue-500"
                                      : "bg-gray-500"
                                  }`}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reinforcement Actions */}
                      {selectedWar.defender === "You" && (
                        <div className="p-3 mb-4 border border-blue-800 rounded-md bg-blue-900/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-blue-400">
                              Defensive Strategy
                            </div>
                            <div className="text-xs bg-blue-800 rounded-full px-2 py-0.5">
                              {deployedDefense?.id === selectedWar.id
                                ? "Active"
                                : "Inactive"}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between text-xs">
                              <span>Your Defense Strength:</span>
                              <span className="font-semibold">
                                {userData.defenseStrength.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Alliance Bonus:</span>
                              <span className="font-semibold text-green-400">
                                +{allianceBonus}%
                              </span>
                            </div>
                            <button
                              className={`w-full py-2 rounded text-sm font-bold ${
                                deployedDefense?.id === selectedWar.id
                                  ? "bg-blue-700 cursor-default"
                                  : "bg-blue-600 hover:bg-blue-500"
                              }`}
                              onClick={() =>
                                handleDefenseDeployment(selectedWar)
                              }
                            >
                              {deployedDefense?.id === selectedWar.id
                                ? "Defense Active"
                                : "Deploy Reinforcements"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Battle Logs */}
                      <div>
                        <div className="mb-2 text-sm font-semibold">
                          Battle Logs
                        </div>
                        <div className="h-40 overflow-y-auto border border-indigo-800 rounded-md bg-indigo-950">
                          <div className="divide-y divide-indigo-800">
                            {battleLogs.map((log, index) => (
                              <div
                                key={index}
                                className={`p-2 border-l-2 ${
                                  log.type === "attack"
                                    ? "border-red-500"
                                    : log.type === "defense"
                                    ? "border-blue-500"
                                    : log.type === "alliance"
                                    ? "border-green-500"
                                    : "border-yellow-500"
                                }`}
                              >
                                <div className="flex items-start">
                                  <div className="mt-0.5 mr-2">{log.icon}</div>
                                  <div className="flex-1">
                                    <div className="text-xs">{log.message}</div>
                                    <div className="mt-1 text-xs text-gray-500">
                                      {log.time}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
                  <Sword size={40} className="mb-4 text-gray-500" />
                  <h3 className="mb-2 text-xl font-bold text-gray-300">
                    No War Selected
                  </h3>
                  <p className="mb-4 text-sm text-gray-400">
                    Select an active conflict from the list to view battle
                    details and deploy strategies.
                  </p>
                  <div className="flex space-x-2">
                    <div className="flex items-center px-3 py-1 text-xs font-semibold text-red-300 border border-red-800 rounded-md bg-red-900/50">
                      <Sword size={12} className="mr-1" />
                      Attack
                    </div>
                    <div className="flex items-center px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-800 rounded-md bg-blue-900/50">
                      <Shield size={12} className="mr-1" />
                      Defend
                    </div>
                    <div className="flex items-center px-3 py-1 text-xs font-semibold text-yellow-300 border border-yellow-800 rounded-md bg-yellow-900/50">
                      <Flag size={12} className="mr-1" />
                      Claim
                    </div>
                  </div>
                </div>
              )}

              {/* Your War Stats */}
              <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
                <div className="p-3 border-b border-indigo-800">
                  <h3 className="font-bold text-gray-100">Your War Stats</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-3 rounded-md bg-indigo-800/50">
                      <div className="mb-1 text-xs text-gray-400">WAR RANK</div>
                      <div className="flex items-center text-2xl font-bold text-yellow-400">
                        #{userData.warRank}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">Top 5%</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 rounded-md bg-indigo-800/50">
                      <div className="mb-1 text-xs text-gray-400">
                        WAR POINTS
                      </div>
                      <div className="text-2xl font-bold text-yellow-400">
                        {userData.warPoints}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        <span className="text-green-400">+250</span> this week
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold">
                        Attack Strength
                      </div>
                      <div className="text-xs font-semibold text-red-400">
                        {userData.attackStrength}
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                      <div
                        className="h-full bg-gradient-to-r from-red-700 to-red-500"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold">
                        Defense Strength
                      </div>
                      <div className="text-xs font-semibold text-blue-400">
                        {userData.defenseStrength}
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                      <div
                        className="h-full bg-gradient-to-r from-blue-700 to-blue-500"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <button className="px-4 py-2 text-xs font-bold transition-all rounded-md bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400">
                      View War History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* War Map Tab */}
        {activeTab === "war-map" && (
          <div className="max-w-6xl mx-auto">
            <div className="p-4 overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center text-xl font-bold text-yellow-400">
                  <Map size={20} className="mr-2" />
                  Strategic War Map
                </h2>
                <div className="flex space-x-2">
                  <div className="flex items-center px-3 py-1 text-xs font-semibold text-red-300 border border-red-800 rounded-md bg-red-900/50">
                    <Flame size={12} className="mr-1" />
                    Active Battle
                  </div>
                  <div className="flex items-center px-3 py-1 text-xs font-semibold text-green-300 border border-green-800 rounded-md bg-green-900/50">
                    <Flag size={12} className="mr-1" />
                    Your Territory
                  </div>
                  <div className="flex items-center px-3 py-1 text-xs font-semibold text-yellow-300 border border-yellow-800 rounded-md bg-yellow-900/50">
                    <Target size={12} className="mr-1" />
                    Vulnerable
                  </div>
                </div>
              </div>

              {/* War Map */}
              <div className="relative overflow-hidden border border-indigo-700 rounded-md h-96 bg-indigo-950">
                {/* Map Background */}
                <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] opacity-20"></div>
                <div className="absolute inset-0 bg-indigo-950/30"></div>

                {/* Grid Lines */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundSize: "40px 40px",
                    backgroundImage: `
                    linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                  `,
                  }}
                ></div>

                {/* Territory Connections */}
                <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                  {territories.map((source, i) =>
                    territories.slice(i + 1).map((target, j) => {
                      // Only connect some territories to create a network
                      if (Math.random() > 0.6) return null;

                      return (
                        <line
                          key={`${source.id}-${target.id}`}
                          x1={`${source.position.x}%`}
                          y1={`${source.position.y}%`}
                          x2={`${target.position.x}%`}
                          y2={`${target.position.y}%`}
                          stroke={`${source.color}60`}
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="route-path"
                        />
                      );
                    })
                  )}
                </svg>

                {/* Territories */}
                {territories.map((territory) => {
                  // Check if territory is currently in an active war
                  const isActiveWar = tradeWars.some(
                    (war) =>
                      war.routeId === territory.id ||
                      (territory.id === "eastern-silk-road" &&
                        war.routeId === "silk-road")
                  );

                  // If it's yours
                  const isYourTerritory = territory.id === "eastern-silk-road";

                  return (
                    <div
                      key={territory.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20
                                ${
                                  attackTarget?.id === territory.id
                                    ? "scale-125"
                                    : "hover:scale-110"
                                }`}
                      style={{
                        left: `${territory.position.x}%`,
                        top: `${territory.position.y}%`,
                      }}
                      onClick={() => handleAttackTargetSelect(territory)}
                      onMouseEnter={() => setHoveredTerritory(territory)}
                      onMouseLeave={() => setHoveredTerritory(null)}
                    >
                      {/* Territory Node */}
                      <div
                        className={`
                          w-12 h-12 flex items-center justify-center rounded-md border-2
                          ${isActiveWar ? "territory-pulse border-red-500" : ""}
                          ${
                            isYourTerritory
                              ? "border-green-500"
                              : "border-indigo-600"
                          }
                          ${
                            attackTarget?.id === territory.id
                              ? "ring-2 ring-yellow-400"
                              : ""
                          }
                        `}
                        style={{
                          backgroundColor: territory.color + "90",
                          boxShadow: isActiveWar
                            ? "0 0 15px rgba(239, 68, 68, 0.7)"
                            : isYourTerritory
                            ? "0 0 15px rgba(34, 197, 94, 0.7)"
                            : "0 0 10px rgba(79, 70, 229, 0.5)",
                        }}
                      >
                        <span className="text-2xl">{territory.icon}</span>
                      </div>

                      {/* Territory Label */}
                      <div className="absolute px-2 py-1 mt-2 text-xs font-semibold transform -translate-x-1/2 border border-indigo-700 rounded top-full left-1/2 bg-indigo-950 whitespace-nowrap">
                        {territory.name}
                      </div>

                      {/* Controller Badge */}
                      <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs transform bg-indigo-800 border border-indigo-600 rounded-full translate-x-1/3 -translate-y-1/3">
                        {territory.controller === "You" ? "👤" : "👑"}
                      </div>

                      {/* War Indicator */}
                      {isActiveWar && (
                        <div className="absolute flex items-center justify-center w-4 h-4 text-xs transform -translate-x-1/2 bg-red-600 border border-red-400 rounded-full -bottom-1 left-1/2">
                          <Sword size={10} />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Hover Info Card */}
                {hoveredTerritory && (
                  <div
                    className="absolute z-50 w-64 p-3 border border-indigo-700 rounded-md shadow-lg bg-indigo-900/90 backdrop-blur-sm"
                    style={{
                      left: `${Math.min(
                        Math.max(hoveredTerritory.position.x, 30),
                        70
                      )}%`,
                      top: `${Math.min(
                        Math.max(
                          hoveredTerritory.position.y +
                            (hoveredTerritory.position.y > 50 ? -30 : 15),
                          20
                        ),
                        80
                      )}%`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white">
                          {hoveredTerritory.name}
                        </h4>
                        <div className="text-xs text-gray-300">
                          {hoveredTerritory.type}
                        </div>
                      </div>
                      <div className="text-2xl">{hoveredTerritory.icon}</div>
                    </div>

                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Controller:</span>
                        <span className="font-semibold">
                          {hoveredTerritory.controller}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Control Level:</span>
                        <span className="font-semibold">
                          {hoveredTerritory.controlPct}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Defense Strength:</span>
                        <span className="font-semibold text-blue-400">
                          {hoveredTerritory.strength.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          Potential Rewards:
                        </span>
                        <span className="font-semibold text-yellow-400">
                          {hoveredTerritory.rewards} $BARON
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center mt-2">
                      <button
                        className={`px-4 py-1 rounded text-xs font-bold ${
                          attackTarget?.id === hoveredTerritory.id
                            ? "bg-red-700"
                            : "bg-red-600 hover:bg-red-500"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAttackTargetSelect(hoveredTerritory);
                        }}
                      >
                        {attackTarget?.id === hoveredTerritory.id
                          ? "Target Selected"
                          : "Target for Attack"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Attack Panel */}
              {attackTarget && (
                <div className="p-4 mt-4 border border-red-800 rounded-md bg-red-900/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="flex items-center font-bold text-red-400">
                      <Crosshair size={16} className="mr-2" />
                      Attack Plan: {attackTarget.name}
                    </h3>
                    <button
                      className="text-gray-400 hover:text-gray-200"
                      onClick={() => setAttackTarget(null)}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <div className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">
                            Attack Power Allocation
                          </span>
                          <span className="text-sm font-semibold">
                            {attackPower}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={attackPower}
                          onChange={handleAttackPowerChange}
                          className="w-full h-2 bg-red-900 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-md bg-indigo-900/70">
                          <div className="mb-1 text-xs text-gray-400">
                            Your Attack Force
                          </div>
                          <div className="flex items-center font-bold text-red-400">
                            <Sword size={14} className="mr-1" />
                            {Math.round(
                              userData.attackStrength * (attackPower / 100)
                            ).toLocaleString()}
                          </div>
                        </div>
                        <div className="p-3 rounded-md bg-indigo-900/70">
                          <div className="mb-1 text-xs text-gray-400">
                            Target Defense
                          </div>
                          <div className="flex items-center font-bold text-blue-400">
                            <Shield size={14} className="mr-1" />
                            {attackTarget.strength.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Victory Chance</span>
                          <span
                            className={`text-sm font-semibold ${
                              Math.round(
                                userData.attackStrength * (attackPower / 100)
                              ) > attackTarget.strength
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {Math.round(
                              userData.attackStrength * (attackPower / 100)
                            ) > attackTarget.strength
                              ? "Favorable"
                              : "Challenging"}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                          <div
                            className={`h-full rounded-full ${
                              Math.round(
                                userData.attackStrength * (attackPower / 100)
                              ) > attackTarget.strength
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                Math.round(
                                  (Math.round(
                                    userData.attackStrength *
                                      (attackPower / 100)
                                  ) /
                                    attackTarget.strength) *
                                    100
                                ),
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <button
                        className="flex items-center justify-center w-full py-2 font-semibold transition-all bg-red-700 rounded-md hover:bg-red-600"
                        onClick={launchAttack}
                      >
                        <Sword size={16} className="mr-2" />
                        Launch Attack on {attackTarget.name}
                      </button>
                    </div>

                    <div className="p-3 rounded-md bg-indigo-900/70">
                      <div className="mb-2 text-sm font-semibold">
                        Attack Forces
                      </div>

                      <div className="space-y-2 overflow-y-auto max-h-40">
                        {userData.troopTypes.map((troop) => (
                          <div
                            key={troop.id}
                            className="flex items-center justify-between p-2 rounded-md bg-indigo-800/60"
                          >
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-6 h-6 mr-2">
                                {troop.icon}
                              </div>
                              <div>
                                <div className="text-xs font-semibold">
                                  {troop.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {troop.count} units
                                </div>
                              </div>
                            </div>
                            <div className="text-xs">
                              <span className="font-semibold text-red-400">
                                +{troop.power * troop.count}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 mt-3 border border-red-800 rounded-md bg-red-900/30">
                        <div className="text-xs text-center">
                          <AlertTriangle
                            size={12}
                            className="inline-block mr-1 text-yellow-400"
                          />
                          <span>Estimated casualties: </span>
                          <span className="font-semibold">
                            {Math.round(attackPower * 3)}%
                          </span>{" "}
                          of forces
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
              <div className="flex items-center justify-between p-4 border-b border-indigo-800">
                <h2 className="flex items-center text-xl font-bold text-yellow-400">
                  <Trophy size={20} className="mr-2" />
                  War Barons Leaderboard
                </h2>
                <div className="px-3 py-1 text-xs font-medium bg-indigo-800 rounded-full">
                  Season 1 • Week 3
                </div>
              </div>

              {/* Top 3 Podium */}
              <div className="flex items-end justify-center p-6 bg-gradient-to-b from-indigo-800/30 to-transparent">
                {/* 2nd Place */}
                <div className="flex flex-col items-center mx-4">
                  <div className="flex items-center justify-center w-16 h-16 mb-2 overflow-hidden bg-gray-800 border-2 border-gray-500 rounded-full">
                    <span className="text-3xl">👸</span>
                  </div>
                  <div className="px-3 py-1 border border-gray-700 rounded-md bg-gray-800/80 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-xs text-gray-400">2nd Place</div>
                      <div className="font-bold">CryptoBaroness</div>
                      <div className="text-xs text-yellow-400">
                        {warLeaderboard[1].points} pts
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-12 h-24 mt-2 bg-gray-700 rounded-t-md">
                    <div className="text-2xl">🥈</div>
                  </div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center mx-4 -mb-4">
                  <div className="relative">
                    <div className="absolute transform -translate-x-1/2 -top-3 left-1/2 animate-bounce">
                      <Trophy size={20} className="text-yellow-400" />
                    </div>
                    <div className="flex items-center justify-center w-20 h-20 mb-2 overflow-hidden bg-yellow-900 border-4 border-yellow-600 rounded-full">
                      <span className="text-4xl">👑</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 border border-yellow-700 rounded-md bg-yellow-900/60 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-xs text-yellow-400">1st Place</div>
                      <div className="text-lg font-bold text-white">
                        TradeEmperor
                      </div>
                      <div className="text-sm font-semibold text-yellow-400">
                        {warLeaderboard[0].points} pts
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-16 h-32 mt-2 bg-yellow-700 rounded-t-md">
                    <div className="text-3xl">🏆</div>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center mx-4">
                  <div className="flex items-center justify-center w-16 h-16 mb-2 overflow-hidden border-2 rounded-full bg-amber-900/60 border-amber-700">
                    <span className="text-3xl">🤴</span>
                  </div>
                  <div className="px-3 py-1 border rounded-md bg-amber-900/30 backdrop-blur-sm border-amber-800">
                    <div className="text-center">
                      <div className="text-xs text-gray-400">3rd Place</div>
                      <div className="font-bold">BaronSatoshi</div>
                      <div className="text-xs text-yellow-400">
                        {warLeaderboard[2].points} pts
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-12 h-16 mt-2 bg-amber-800 rounded-t-md">
                    <div className="text-2xl">🥉</div>
                  </div>
                </div>
              </div>

              {/* Leaderboard Table */}
              <div className="p-4">
                <div className="overflow-hidden rounded-md bg-indigo-950">
                  <div className="grid grid-cols-12 p-3 text-xs font-semibold text-gray-400 border-b border-indigo-800">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-5">Baron</div>
                    <div className="col-span-2 text-center">Points</div>
                    <div className="col-span-2 text-center">Routes</div>
                    <div className="col-span-2 text-center">Win Streak</div>
                  </div>

                  <div className="divide-y divide-indigo-900">
                    {warLeaderboard.slice(3).map((baron) => (
                      <div
                        key={baron.rank}
                        className={`grid grid-cols-12 text-sm p-3 ${
                          baron.name === "You"
                            ? "bg-green-900/30"
                            : "hover:bg-indigo-900/30"
                        }`}
                      >
                        <div className="col-span-1 font-bold text-center">
                          {baron.rank}
                        </div>
                        <div className="flex items-center col-span-5 font-semibold">
                          {baron.badge && (
                            <span className="mr-2">{baron.badge}</span>
                          )}
                          <span
                            className={
                              baron.name === "You" ? "text-green-400" : ""
                            }
                          >
                            {baron.name}
                          </span>
                        </div>
                        <div className="col-span-2 font-mono text-center">
                          {baron.points.toLocaleString()}
                        </div>
                        <div className="col-span-2 text-center">
                          {baron.routes}
                        </div>
                        <div className="col-span-2 text-center">
                          <span
                            className={
                              baron.winStreak > 0 ? "text-green-400" : ""
                            }
                          >
                            {baron.winStreak}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rewards Section */}
                <div className="mt-6">
                  <h3 className="flex items-center mb-3 font-bold text-yellow-400">
                    <Award size={16} className="mr-2" />
                    Season Rewards
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="p-3 border border-yellow-800 rounded-md bg-yellow-900/30">
                      <div className="mb-2 text-center">
                        <div className="text-3xl">🏆</div>
                        <div className="font-bold text-yellow-400">Top 3</div>
                      </div>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-yellow-400"
                          />
                          Exclusive "War Baron" NFT
                        </li>
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-yellow-400"
                          />
                          10,000+ $BARON rewards
                        </li>
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-yellow-400"
                          />
                          Permanent control bonus (+15%)
                        </li>
                      </ul>
                    </div>

                    <div className="p-3 border border-indigo-800 rounded-md bg-indigo-900/30">
                      <div className="mb-2 text-center">
                        <div className="text-3xl">🏅</div>
                        <div className="font-bold text-blue-400">Top 10</div>
                      </div>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-blue-400"
                          />
                          "Trade General" title
                        </li>
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-blue-400"
                          />
                          5,000+ $BARON rewards
                        </li>
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-blue-400"
                          />
                          Route control discount (-20%)
                        </li>
                      </ul>
                    </div>

                    <div className="p-3 border border-indigo-800 rounded-md bg-indigo-900/30">
                      <div className="mb-2 text-center">
                        <div className="text-3xl">⭐</div>
                        <div className="font-bold text-indigo-400">Top 50</div>
                      </div>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-indigo-400"
                          />
                          "Trade Captain" title
                        </li>
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-indigo-400"
                          />
                          1,000+ $BARON rewards
                        </li>
                        <li className="flex items-center">
                          <ChevronRight
                            size={12}
                            className="mr-1 text-indigo-400"
                          />
                          Special banner for profile
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* War Room Tab */}
        {activeTab === "war-room" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Your Forces */}
              <div className="lg:col-span-2">
                <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between p-4 border-b border-indigo-800">
                    <h3 className="flex items-center font-bold text-blue-400">
                      <Sword size={18} className="mr-2" />
                      Your War Forces
                    </h3>
                    <div className="px-3 py-1 text-xs bg-indigo-800 rounded-full">
                      {userData.troopTypes.reduce((acc, t) => acc + t.count, 0)}{" "}
                      Units Available
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                      {userData.troopTypes.map((troop) => (
                        <div
                          key={troop.id}
                          className="p-3 border border-indigo-700 rounded-md bg-indigo-800/50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-indigo-900 rounded-md">
                                {troop.icon}
                              </div>
                              <div>
                                <div className="font-bold">{troop.name}</div>
                                <div className="text-xs text-gray-400">
                                  {troop.count} units
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-400">Power</div>
                              <div className="font-semibold text-red-400">
                                {troop.power}/unit
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                            <div className="p-1 text-center bg-indigo-900 rounded">
                              <div className="text-gray-400">Total Power</div>
                              <div className="font-semibold">
                                {troop.power * troop.count}
                              </div>
                            </div>
                            <div className="p-1 text-center bg-indigo-900 rounded">
                              <div className="text-gray-400">Type</div>
                              <div className="font-semibold capitalize">
                                {troop.id}
                              </div>
                            </div>
                            <div className="p-1 text-center bg-indigo-900 rounded">
                              <div className="text-gray-400">Status</div>
                              <div className="font-semibold text-green-400">
                                Ready
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="p-3 rounded-md bg-indigo-800/50">
                        <div className="mb-2 text-sm font-semibold">
                          War Strategy
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Attack Preference:
                            </span>
                            <span>Balanced</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Alliance Support:
                            </span>
                            <span className="text-green-400">
                              Active (+15%)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Reinforcement Speed:
                            </span>
                            <span>4 hours</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-md bg-indigo-800/50">
                        <div className="mb-2 text-sm font-semibold">
                          Economy
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">War Chest:</span>
                            <span className="text-yellow-400">
                              {userData.baronBalance.toLocaleString()} $BARON
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Daily Production:
                            </span>
                            <span className="text-green-400">
                              +{userData.stakedBaron * 0.037} $BARON
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Combat Efficiency:
                            </span>
                            <span>87%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <button className="flex items-center px-4 py-2 text-sm font-semibold bg-blue-700 rounded-md hover:bg-blue-600">
                        <Shield size={16} className="mr-2" />
                        Train Defenders
                      </button>
                      <button className="flex items-center px-4 py-2 text-sm font-semibold bg-red-700 rounded-md hover:bg-red-600">
                        <Sword size={16} className="mr-2" />
                        Train Attackers
                      </button>
                      <button className="flex items-center px-4 py-2 text-sm font-semibold bg-purple-700 rounded-md hover:bg-purple-600">
                        <Sparkles size={16} className="mr-2" />
                        Special Units
                      </button>
                    </div>
                  </div>
                </div>

                {/* War Achievements */}
                <div className="mt-6 overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
                  <div className="p-4 border-b border-indigo-800">
                    <h3 className="flex items-center font-bold text-yellow-400">
                      <Award size={18} className="mr-2" />
                      War Achievements
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
                    <div className="flex flex-col items-center justify-center p-3 text-center rounded-md bg-indigo-800/50">
                      <div className="mb-1 text-2xl">🛡️</div>
                      <div className="text-sm font-semibold">
                        Stalwart Defender
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Successfully defended 5 routes
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 text-center rounded-md bg-indigo-800/50">
                      <div className="mb-1 text-2xl">⚔️</div>
                      <div className="text-sm font-semibold">
                        Battlefield Tactician
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Won 3 battles in a single day
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 text-center rounded-md opacity-50 bg-indigo-800/50">
                      <div className="mb-1 text-2xl">🏰</div>
                      <div className="text-sm font-semibold">Trade Emperor</div>
                      <div className="mt-1 text-xs text-gray-400">
                        Control 10+ routes simultaneously
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 text-center rounded-md opacity-50 bg-indigo-800/50">
                      <div className="mb-1 text-2xl">💰</div>
                      <div className="text-sm font-semibold">War Profiteer</div>
                      <div className="mt-1 text-xs text-gray-400">
                        Earn 10,000+ $BARON from wars
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* War Intelligence */}
              <div>
                <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
                  <div className="p-4 border-b border-indigo-800">
                    <h3 className="flex items-center font-bold text-indigo-400">
                      <Zap size={18} className="mr-2" />
                      War Intelligence
                    </h3>
                  </div>

                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="p-3 border border-indigo-700 rounded-md bg-indigo-800/50">
                        <div className="mb-2 text-sm font-semibold">
                          Upcoming Wars
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded bg-indigo-900/50">
                            <div className="flex items-center">
                              <Clock
                                size={14}
                                className="mr-2 text-yellow-400"
                              />
                              <span className="text-xs">Major Trade War</span>
                            </div>
                            <div className="text-xs">3d 17h 22m</div>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-indigo-900/50">
                            <div className="flex items-center">
                              <AlertTriangle
                                size={14}
                                className="mr-2 text-red-400"
                              />
                              <span className="text-xs">Alliance War</span>
                            </div>
                            <div className="text-xs">5d 8h 15m</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border border-indigo-700 rounded-md bg-indigo-800/50">
                        <div className="mb-2 text-sm font-semibold">
                          Strategic Intelligence
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2 border rounded bg-red-900/20 border-red-900/30">
                            <div className="mb-1 font-semibold text-red-400">
                              Vulnerable Route Alert
                            </div>
                            <p className="text-gray-300">
                              Eastern Silk Road defenses weakened after recent
                              attacks (-15% strength).
                            </p>
                          </div>
                          <div className="p-2 border rounded bg-yellow-900/20 border-yellow-900/30">
                            <div className="mb-1 font-semibold text-yellow-400">
                              Opportunity Detected
                            </div>
                            <p className="text-gray-300">
                              Southern Spice Markets control below 50%. Prime
                              acquisition target.
                            </p>
                          </div>
                          <div className="p-2 border rounded bg-blue-900/20 border-blue-900/30">
                            <div className="mb-1 font-semibold text-blue-400">
                              Alliance Intel
                            </div>
                            <p className="text-gray-300">
                              Shadow Network planning coordinated defense of key
                              territories.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border border-indigo-700 rounded-md bg-indigo-800/50">
                        <div className="mb-2 text-sm font-semibold">
                          War Room Actions
                        </div>
                        <div className="space-y-2">
                          <button className="flex items-center justify-center w-full p-2 text-xs font-semibold bg-indigo-700 rounded-md hover:bg-indigo-600">
                            <Users size={14} className="mr-2" />
                            Call for Alliance Support
                          </button>
                          <button className="flex items-center justify-center w-full p-2 text-xs font-semibold bg-indigo-700 rounded-md hover:bg-indigo-600">
                            <Crosshair size={14} className="mr-2" />
                            Plan Coordinated Attack
                          </button>
                          <button className="flex items-center justify-center w-full p-2 text-xs font-semibold bg-indigo-700 rounded-md hover:bg-indigo-600">
                            <Flag size={14} className="mr-2" />
                            Scout New Territories
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Battle Animation Overlay */}
      {showBattleAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black opacity-80"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="battle-animation">
                <div className="battle-text">BATTLE IN PROGRESS</div>
                <div className="battle-swords">⚔️</div>
                <div className="battle-explosion">💥</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Victory Modal */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={() => setShowVictoryModal(false)}
          ></div>

          <div className="relative max-w-md p-6 mx-auto bg-indigo-900 border-4 border-yellow-600 rounded-lg victory-modal">
            <div className="absolute transform -translate-x-1/2 -top-6 left-1/2">
              <Trophy size={40} className="text-yellow-400" />
            </div>

            <div className="mt-6 mb-4 text-center">
              <h3 className="mb-2 text-2xl font-bold text-yellow-400">
                Victory!
              </h3>
              <p className="text-gray-300">
                Your forces have successfully captured {attackTarget?.name}!
              </p>
            </div>

            <div className="p-4 mb-4 rounded-md bg-indigo-800/70">
              <div className="mb-3 font-semibold text-center">
                Battle Rewards
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="mb-1 text-xs text-gray-400">
                    Territory Control
                  </div>
                  <div className="font-bold text-white">+48%</div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">
                    $BARON Reward
                  </div>
                  <div className="font-bold text-yellow-400">
                    +{attackTarget?.rewards}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">War Points</div>
                  <div className="font-bold text-blue-400">+350</div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">Casualties</div>
                  <div className="font-bold text-red-400">-125 units</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                className="px-6 py-2 font-bold transition-all bg-yellow-600 rounded-md hover:bg-yellow-500"
                onClick={() => setShowVictoryModal(false)}
              >
                Claim Territory
              </button>
            </div>
          </div>
        </div>
      )}

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

        @keyframes territory-pulse {
          0% {
            box-shadow: 0 0 5px rgba(239, 68, 68, 0.7);
          }
          50% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.9);
          }
          100% {
            box-shadow: 0 0 5px rgba(239, 68, 68, 0.7);
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

        @keyframes battle-text {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          20% {
            opacity: 1;
            transform: scale(1.2);
          }
          80% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }

        @keyframes battle-swords {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-20deg);
          }
          10% {
            opacity: 1;
            transform: scale(1.5) rotate(0deg);
          }
          90% {
            opacity: 1;
            transform: scale(1.5) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) rotate(20deg);
          }
        }

        @keyframes battle-explosion {
          0% {
            opacity: 0;
            transform: scale(0.2);
          }
          60% {
            opacity: 0;
            transform: scale(0.2);
          }
          70% {
            opacity: 1;
            transform: scale(2);
          }
          100% {
            opacity: 0;
            transform: scale(3);
          }
        }

        @keyframes victory-entrance {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .battle-animation {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .battle-text {
          position: absolute;
          font-size: 24px;
          font-weight: bold;
          color: #ef4444;
          text-align: center;
          animation: battle-text 3s ease-in-out forwards;
        }

        .battle-swords {
          position: absolute;
          font-size: 80px;
          animation: battle-swords 3s ease-in-out forwards;
        }

        .battle-explosion {
          position: absolute;
          font-size: 100px;
          animation: battle-explosion 3s ease-in-out forwards;
        }

        .territory-pulse {
          animation: territory-pulse 2s infinite;
        }

        .route-path {
          animation: dash 20s linear infinite;
        }

        .victory-modal {
          animation: victory-entrance 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TradeWarComponent;
