import React, { useState, useEffect, useRef } from "react";
import {
  Sword,
  Shield,
  Crosshair,
  Flag,
  Users,
  AlertTriangle,
  Award,
  Zap,
  Target,
  ChevronRight,
  Clock,
  Flame,
  Map,
  BarChart3,
  Briefcase,
  Eye,
  RefreshCw,
  Send,
  PieChart,
  BookOpen,
  MessageSquare,
  CheckCircle,
  XCircle,
  Activity,
  Trophy,
  ChevronUp,
  ChevronDown,
  Info,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";

const WarRoomComponent = () => {
  // State management for UI
  const [activeTab, setActiveTab] = useState("command");
  const [selectedWar, setSelectedWar] = useState(null);
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [selectedTroop, setSelectedTroop] = useState(null);
  const [selectedStrategy, setSelectedStrategy] = useState("balanced");

  // Modal states
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [showTacticalMap, setShowTacticalMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Functional states
  const [trainingAmount, setTrainingAmount] = useState(10);
  const [battleStep, setBattleStep] = useState(0);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const [confirmAction, setConfirmAction] = useState(null);

  // Refs
  const battleCanvasRef = useRef(null);
  const animationFrame = useRef(null);

  // User data
  const userData = {
    name: "Trade Baron",
    baronBalance: 10250,
    stakedBaron: 8750,
    warPoints: 1250,
    warRank: 14,
    attackStrength: 6500,
    defenseStrength: 5000,
    alliance: "Shadow Network",
    resources: {
      gold: 12500,
      supplies: 8750,
      intelligence: 950,
    },
    troopTypes: [
      {
        id: "infantry",
        name: "Trade Guards",
        count: 250,
        power: 15,
        icon: "👥",
        trainCost: 35,
        upkeep: 2,
        special: false,
      },
      {
        id: "cavalry",
        name: "Swift Couriers",
        count: 150,
        power: 25,
        icon: "🏇",
        trainCost: 60,
        upkeep: 4,
        special: false,
      },
      {
        id: "siege",
        name: "Market Disruptors",
        count: 50,
        power: 40,
        icon: "🔨",
        trainCost: 85,
        upkeep: 6,
        special: false,
      },
      {
        id: "special",
        name: "Shadow Agents",
        count: 20,
        power: 75,
        icon: "🥷",
        trainCost: 150,
        upkeep: 12,
        special: true,
      },
    ],
  };

  // Active wars data
  const activeWars = [
    {
      id: "silk-road-war",
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
      progress: 65,
      territory: "Eastern Silk Road",
      background: "linear-gradient(to bottom, #8B5A2B, #4A2511)",
    },
    {
      id: "wall-street-war",
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
      progress: 42,
      territory: "Wall Street",
      background: "linear-gradient(to bottom, #1B5E20, #052e03)",
    },
    {
      id: "shadow-network-war",
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
      progress: 35,
      territory: "Shadow Markets",
      background: "linear-gradient(to bottom, #424242, #121212)",
    },
  ];

  // War territories
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
      threatLevel: "high",
    },
    {
      id: "northern-timber",
      name: "Northern Timber Route",
      type: "Resource supply route",
      controller: "You",
      controlPct: 51,
      strength: 5800,
      rewards: 850,
      position: { x: 25, y: 20 },
      icon: "🌲",
      color: "#2E7D32",
      threatLevel: "medium",
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
      threatLevel: "low",
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
      threatLevel: "medium",
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
      threatLevel: "high",
    },
  ];

  // Strategy options
  const strategies = [
    {
      id: "aggressive",
      name: "Aggressive",
      icon: <Sword size={18} className="text-red-500" />,
      attackBonus: "+25%",
      defenseBonus: "-10%",
      resourceCost: "High",
      description:
        "Focus on overwhelming attack power at the expense of defense. High risk, high reward strategy.",
      bestAgainst: "Defensive opponents",
    },
    {
      id: "balanced",
      name: "Balanced",
      icon: <Activity size={18} className="text-blue-500" />,
      attackBonus: "+10%",
      defenseBonus: "+10%",
      resourceCost: "Medium",
      description:
        "Balanced approach that provides modest bonuses to both attack and defense capabilities.",
      bestAgainst: "Most opponents",
    },
    {
      id: "defensive",
      name: "Defensive",
      icon: <Shield size={18} className="text-green-500" />,
      attackBonus: "-5%",
      defenseBonus: "+30%",
      resourceCost: "Medium",
      description:
        "Focus on fortifying positions and defending current territories before counterattacking.",
      bestAgainst: "Aggressive opponents",
    },
    {
      id: "guerrilla",
      name: "Guerrilla",
      icon: <Zap size={18} className="text-yellow-500" />,
      attackBonus: "+15%",
      defenseBonus: "+5%",
      resourceCost: "Low",
      description:
        "Quick strikes at weak points followed by rapid withdrawal. Reduces casualties and resource costs.",
      bestAgainst: "Larger forces",
    },
  ];

  // Intelligence reports
  const intelligenceReports = [
    {
      id: "intel-1",
      title: "Enemy Troop Movements",
      source: "Field Scout",
      urgency: "high",
      time: "2h ago",
      icon: <Eye size={16} className="text-red-400" />,
      summary: "TradeKing forces spotted moving towards Eastern Silk Road.",
      details:
        "Approximately 300 troops with siege equipment observed heading towards the Eastern Silk Road. Estimated arrival in 6 hours. Recommended increase in defensive positions and troop readiness.",
      verified: true,
      relatedTerritory: "Eastern Silk Road",
    },
    {
      id: "intel-2",
      title: "Economic Intelligence",
      source: "Market Informant",
      urgency: "medium",
      time: "8h ago",
      icon: <BarChart3 size={16} className="text-blue-400" />,
      summary: "Resource shortage affecting Northern Territory defenses.",
      details:
        "Northern territory defenders facing supply shortages due to recent trade route disruption. Defensive capability reduced by estimated 35%. Opportunity for swift assault with minimal resistance.",
      verified: true,
      relatedTerritory: "Northern Timber Route",
    },
    {
      id: "intel-3",
      title: "Alliance Movements",
      source: "Diplomatic Channel",
      urgency: "medium",
      time: "1d ago",
      icon: <Users size={16} className="text-green-400" />,
      summary: "Shadow Network and X33 planning coordinated action.",
      details:
        "Intelligence suggests Shadow Network and X33 Alliance planning coordinated defense strategy across multiple territories. Joint forces may provide significant defensive advantage in upcoming trade wars.",
      verified: false,
      relatedTerritory: "Multiple",
    },
  ];

  // For battle simulation canvas
  useEffect(() => {
    if (showBattleModal && battleCanvasRef.current) {
      const canvas = battleCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      // Simulation units
      const friendlyUnits = Array(25)
        .fill()
        .map(() => ({
          x: Math.random() * (width / 3),
          y: Math.random() * height,
          dx: Math.random() * 2,
          dy: (Math.random() - 0.5) * 2,
          type: Math.random() > 0.7 ? "cavalry" : "infantry",
          size: 4,
        }));

      const enemyUnits = Array(20)
        .fill()
        .map(() => ({
          x: width - Math.random() * (width / 3),
          y: Math.random() * height,
          dx: -Math.random() * 2,
          dy: (Math.random() - 0.5) * 2,
          type: "enemy",
          size: 4,
        }));

      const drawBattle = () => {
        ctx.clearRect(0, 0, width, height);

        // Draw terrain
        ctx.fillStyle = "rgba(30, 58, 138, 0.3)";
        ctx.fillRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = "rgba(30, 64, 175, 0.2)";
        ctx.beginPath();
        for (let i = 0; i < width; i += 20) {
          ctx.moveTo(i, 0);
          ctx.lineTo(i, height);
        }
        for (let i = 0; i < height; i += 20) {
          ctx.moveTo(0, i);
          ctx.lineTo(width, i);
        }
        ctx.stroke();

        // Battle line
        let battleLineX = width / 2;
        if (battleStep === 1) battleLineX = width / 2 - 20;
        if (battleStep === 2) battleLineX = width / 2 + 20;
        if (battleStep === 3) battleLineX = width / 2 - 40;

        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(battleLineX, 0);
        ctx.lineTo(battleLineX, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw friendly units
        friendlyUnits.forEach((unit) => {
          // Update position with battle step progression
          const targetX =
            battleStep === 0
              ? width / 3
              : battleStep === 1
              ? width / 2 - 50
              : width / 2 + 20;
          unit.dx = (targetX - unit.x) * 0.02 + (Math.random() - 0.5) * 0.5;
          unit.dy = (height / 2 - unit.y) * 0.01 + (Math.random() - 0.5) * 1;

          unit.x += unit.dx;
          unit.y += unit.dy;

          // Draw unit
          ctx.fillStyle = "rgba(59, 130, 246, 0.9)";
          ctx.beginPath();
          ctx.arc(unit.x, unit.y, unit.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw enemy units
        enemyUnits.forEach((unit, i) => {
          // Show casualties in later steps
          if (battleStep >= 2 && i % 3 === 0) return;
          if (battleStep >= 3 && i % 2 === 0) return;

          // Update position with battle step progression
          const targetX =
            battleStep === 0
              ? (2 * width) / 3
              : battleStep === 1
              ? width / 2 + 50
              : width / 2 - 20;
          unit.dx = (targetX - unit.x) * 0.02 + (Math.random() - 0.5) * 0.5;
          unit.dy = (height / 2 - unit.y) * 0.01 + (Math.random() - 0.5) * 1;

          unit.x += unit.dx;
          unit.y += unit.dy;

          // Draw unit
          ctx.fillStyle = "rgba(239, 68, 68, 0.9)";
          ctx.beginPath();
          ctx.arc(unit.x, unit.y, unit.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Combat effects when forces engage
        if (battleStep >= 1) {
          // Combat flashes
          for (let i = 0; i < 3; i++) {
            if (Math.random() > 0.7) {
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
              ctx.beginPath();
              ctx.arc(
                battleLineX + (Math.random() - 0.5) * 40,
                Math.random() * height,
                Math.random() * 5 + 2,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          }
        }

        animationFrame.current = requestAnimationFrame(drawBattle);
      };

      drawBattle();

      return () => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
      };
    }
  }, [showBattleModal, battleStep]);

  // Handle strategy selection
  const handleStrategySelect = (strategyId) => {
    setSelectedStrategy(strategyId);
    setShowStrategyModal(false);

    // Show confirmation notification
    showNotification(
      `War strategy updated to "${
        strategies.find((s) => s.id === strategyId).name
      }"`,
      "success"
    );
  };

  // Handle troop training
  const handleTroopTraining = () => {
    if (!selectedTroop) return;

    setShowTrainingModal(false);
    setShowConfirmModal(true);
    setConfirmAction({
      type: "train",
      troop: selectedTroop,
      amount: trainingAmount,
    });
  };

  // Handle confirmation action
  const handleConfirmAction = () => {
    setShowConfirmModal(false);

    if (confirmAction.type === "train") {
      showNotification(
        `Training ${confirmAction.amount} ${confirmAction.troop.name}. Estimated completion in 3h 25m.`,
        "success"
      );
    } else if (confirmAction.type === "battle") {
      setShowBattleModal(true);
      setBattleStep(0);
    }
  };

  // Show notification
  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });

    // Auto hide after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "info" });
    }, 3000);
  };

  // Advance battle simulation
  const advanceBattleStep = () => {
    if (battleStep < 3) {
      setBattleStep((prevStep) => prevStep + 1);
    } else {
      setShowBattleModal(false);
      showNotification(
        "Battle simulation completed. Victory probability: 68%",
        "success"
      );
    }
  };

  // Reset battle simulation
  const resetBattleSimulation = () => {
    setBattleStep(0);
  };

  // Command Center tab content
  const renderCommandCenter = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Active Wars Section */}
      <div className="lg:col-span-2">
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 border-b border-indigo-800">
            <h3 className="flex items-center font-bold text-purple-400">
              <Sword size={18} className="mr-2" />
              Active Conflicts
            </h3>
            <div className="px-3 py-1 text-xs bg-indigo-800 rounded-full">
              {activeWars.length} ongoing wars
            </div>
          </div>

          <div className="divide-y divide-indigo-800/50">
            {activeWars.map((war) => (
              <div
                key={war.id}
                className={`p-3 sm:p-4 hover:bg-indigo-800/30 transition-colors cursor-pointer ${
                  selectedWar?.id === war.id
                    ? "bg-indigo-800/50 border-l-4 border-red-500"
                    : ""
                }`}
                onClick={() =>
                  setSelectedWar(selectedWar?.id === war.id ? null : war)
                }
              >
                <div className="flex flex-col sm:flex-row sm:items-start">
                  {/* War Icon */}
                  <div
                    className="flex items-center justify-center w-10 h-10 mb-3 text-xl rounded-md sm:w-12 sm:h-12 sm:mb-0 sm:mr-4 sm:text-2xl"
                    style={{ background: war.background }}
                  >
                    {war.territory === "Eastern Silk Road"
                      ? "🏯"
                      : war.territory === "Wall Street"
                      ? "🏙️"
                      : "🕸️"}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start sm:gap-0">
                      <h3 className="text-sm font-bold text-red-300 sm:text-base">
                        {war.name}
                      </h3>
                      <div className="flex items-center self-start px-2 py-1 text-xs rounded-md bg-indigo-950">
                        <Clock size={12} className="mr-1" />
                        <span>{war.timeRemaining}</span>
                      </div>
                    </div>

                    <p className="mt-1 text-xs text-gray-300 sm:text-sm line-clamp-2">
                      {war.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-2 sm:mt-3">
                      <div className="flex flex-col">
                        <div className="text-xs text-gray-400">Attacker</div>
                        <div className="flex items-center text-xs font-semibold text-red-400 sm:text-sm">
                          <span className="mr-1">{war.attackerIcon}</span>
                          {war.attacker}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xs text-gray-400">Defender</div>
                        <div
                          className={`font-semibold flex items-center text-xs sm:text-sm ${
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
                    <div className="mt-2 sm:mt-3">
                      <div className="flex justify-between mb-1 text-xs">
                        <div className="flex items-center text-red-400">
                          <Sword size={12} className="mr-1" />
                          {war.attackStrength.toLocaleString()}
                        </div>
                        <div className="text-gray-400">Battle Progress</div>
                        <div className="flex items-center text-blue-400">
                          <Shield size={12} className="mr-1" />
                          {war.defenseStrength.toLocaleString()}
                        </div>
                      </div>
                      <div className="h-1.5 sm:h-2 overflow-hidden bg-gray-800 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-red-400"
                          style={{ width: `${war.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* War Actions */}
                    <div className="flex flex-col items-start justify-between gap-2 mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-3">
                      <div className="order-2 text-xs text-yellow-300 sm:order-1">
                        <span>Rewards: {war.rewards}</span>
                      </div>

                      <div className="flex order-1 w-full gap-2 sm:w-auto sm:order-2">
                        {war.defender === "You" && (
                          <button
                            className="flex items-center px-3 py-1.5 text-xs font-bold bg-blue-700 rounded hover:bg-blue-600 flex-1 sm:flex-none justify-center sm:justify-start"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmAction({
                                type: "battle",
                                war: war,
                              });
                              setShowConfirmModal(true);
                            }}
                          >
                            <Shield size={12} className="mr-1" />
                            Reinforce Defenses
                          </button>
                        )}

                        {war.attacker !== "You" && war.defender !== "You" && (
                          <button
                            className="px-3 py-1.5 text-xs font-bold bg-purple-600 rounded hover:bg-purple-500 flex-1 sm:flex-none"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Join War
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* War Details if a war is selected */}
        {selectedWar && (
          <div className="p-4 mt-4 border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-yellow-400">
                {selectedWar.name} - Detailed Report
              </h3>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  selectedWar.progress > 60
                    ? "bg-red-900 text-red-400"
                    : selectedWar.progress > 40
                    ? "bg-yellow-900 text-yellow-400"
                    : "bg-blue-900 text-blue-400"
                }`}
              >
                {selectedWar.progress > 60
                  ? "Critical"
                  : selectedWar.progress > 40
                  ? "Concerning"
                  : "Favorable"}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div className="p-3 rounded-md bg-indigo-800/50">
                <div className="mb-2 text-sm font-semibold text-red-400">
                  Attacking Forces
                </div>
                <p className="mb-3 text-sm text-gray-300">
                  {selectedWar.attacker} forces are{" "}
                  {selectedWar.progress > 60
                    ? "gaining significant ground"
                    : selectedWar.progress > 40
                    ? "making steady progress"
                    : "struggling to advance"}{" "}
                  in their campaign.
                </p>
                <div className="text-xs text-gray-400">
                  Estimated attack strength:{" "}
                  {selectedWar.attackStrength.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-md bg-indigo-800/50">
                <div className="mb-2 text-sm font-semibold text-blue-400">
                  Defensive Position
                </div>
                <p className="mb-3 text-sm text-gray-300">
                  {selectedWar.defender} defenses are{" "}
                  {selectedWar.progress < 40
                    ? "holding strong"
                    : selectedWar.progress < 60
                    ? "under pressure"
                    : "close to breaking"}{" "}
                  against the assault.
                </p>
                <div className="text-xs text-gray-400">
                  Estimated defense strength:{" "}
                  {selectedWar.defenseStrength.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-3 mb-4 rounded-md bg-indigo-800/50">
              <div className="mb-2 text-sm font-semibold">
                Strategic Options
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="flex items-center justify-center px-3 py-2 text-xs font-bold bg-blue-700 rounded hover:bg-blue-600"
                  onClick={() => {
                    setConfirmAction({
                      type: "battle",
                      war: selectedWar,
                    });
                    setShowConfirmModal(true);
                  }}
                >
                  <Shield size={12} className="mr-1" />
                  Deploy Reinforcements
                </button>
                <button className="flex items-center justify-center px-3 py-2 text-xs font-bold bg-purple-700 rounded hover:bg-purple-600">
                  <Users size={12} className="mr-1" />
                  Request Alliance Support
                </button>
              </div>
            </div>

            <div className="text-xs text-center text-gray-400">
              War status updates every 2 hours based on battlefield conditions
              and troop movements.
            </div>
          </div>
        )}

        {/* Territories Section */}
        <div className="mt-6 overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 border-b border-indigo-800">
            <h3 className="flex items-center font-bold text-purple-400">
              <Map size={18} className="mr-2" />
              War Territories
            </h3>
            <button
              className="flex items-center px-3 py-1 text-xs font-bold bg-indigo-700 rounded hover:bg-indigo-600"
              onClick={() => setShowTacticalMap(true)}
            >
              <Map size={12} className="mr-1" />
              View Tactical Map
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {territories.map((territory) => (
                <div
                  key={territory.id}
                  className={`p-3 rounded-md border ${
                    territory.controller === "You"
                      ? "bg-green-900/30 border-green-800"
                      : "bg-indigo-800/50 border-indigo-700"
                  } ${
                    selectedTerritory?.id === territory.id
                      ? "ring-2 ring-yellow-400"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedTerritory(
                      selectedTerritory?.id === territory.id ? null : territory
                    )
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div
                        className="flex items-center justify-center w-8 h-8 mr-2 text-xl rounded-md"
                        style={{ backgroundColor: `${territory.color}80` }}
                      >
                        {territory.icon}
                      </div>
                      <h4 className="font-bold">{territory.name}</h4>
                    </div>
                    <div
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        territory.threatLevel === "high"
                          ? "bg-red-900 text-red-300"
                          : territory.threatLevel === "medium"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-green-900 text-green-300"
                      }`}
                    >
                      {territory.threatLevel} threat
                    </div>
                  </div>

                  <div className="flex justify-between mt-2 text-xs">
                    <div>
                      <span className="text-gray-400">Controlled by: </span>
                      <span
                        className={
                          territory.controller === "You"
                            ? "text-green-400"
                            : "text-white"
                        }
                      >
                        {territory.controller}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Control: </span>
                      <span>{territory.controlPct}%</span>
                    </div>
                  </div>

                  <div className="flex mt-3 space-x-2">
                    {territory.controller !== "You" && (
                      <button
                        className="flex items-center justify-center flex-1 px-2 py-1 text-xs font-bold bg-red-700 rounded hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmAction({
                            type: "battle",
                            territory: territory,
                          });
                          setShowConfirmModal(true);
                        }}
                      >
                        <Sword size={12} className="mr-1" />
                        Attack
                      </button>
                    )}

                    {territory.controller === "You" && (
                      <button className="flex items-center justify-center flex-1 px-2 py-1 text-xs font-bold bg-blue-700 rounded hover:bg-blue-600">
                        <Shield size={12} className="mr-1" />
                        Fortify
                      </button>
                    )}

                    <button className="flex items-center justify-center flex-1 px-2 py-1 text-xs font-bold bg-indigo-700 rounded hover:bg-indigo-600">
                      <Eye size={12} className="mr-1" />
                      Scout
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Command Center Sidebar */}
      <div className="space-y-6">
        {/* War Stats */}
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Your War Stats</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 text-center rounded-md bg-indigo-800/50">
                <div className="mb-1 text-xs text-gray-400">WAR RANK</div>
                <div className="text-2xl font-bold text-yellow-400">
                  #{userData.warRank}
                </div>
                <div className="mt-1 text-xs text-gray-400">Top 5%</div>
              </div>
              <div className="p-3 text-center rounded-md bg-indigo-800/50">
                <div className="mb-1 text-xs text-gray-400">WAR POINTS</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {userData.warPoints}
                </div>
                <div className="mt-1 text-xs text-green-400">
                  +250 this week
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold">Attack Strength</div>
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
                <div className="text-xs font-semibold">Defense Strength</div>
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
          </div>
        </div>

        {/* Troop Overview */}
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Troop Overview</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {userData.troopTypes.map((troop) => (
                <div
                  key={troop.id}
                  className={`bg-indigo-800/50 p-2 rounded-md border border-indigo-700 ${
                    troop.special
                      ? "bg-gradient-to-br from-indigo-800/50 to-purple-900/50"
                      : ""
                  } cursor-pointer hover:bg-indigo-800/70 transition-colors`}
                  onClick={() => {
                    setSelectedTroop(troop);
                    setTrainingAmount(10);
                    setShowTrainingModal(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 mr-2 text-xl bg-indigo-900 border border-indigo-700 rounded-md">
                        {troop.icon}
                      </div>
                      <div>
                        <div className="flex items-center text-sm font-semibold">
                          {troop.name}
                          {troop.special && (
                            <span className="ml-2 text-xs text-purple-300">
                              • Special
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {troop.count} units
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Power</div>
                      <div className="text-sm text-red-400">{troop.power}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button
                className="flex items-center px-4 py-2 mx-auto text-xs font-bold bg-indigo-700 rounded-md hover:bg-indigo-600"
                onClick={() => {
                  setSelectedTroop(userData.troopTypes[0]);
                  setTrainingAmount(10);
                  setShowTrainingModal(true);
                }}
              >
                <RefreshCw size={14} className="mr-2" />
                Train More Troops
              </button>
            </div>
          </div>
        </div>

        {/* Current Strategy */}
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Current Strategy</h3>
          </div>
          <div className="p-4">
            {strategies
              .filter((s) => s.id === selectedStrategy)
              .map((strategy) => (
                <div
                  key={strategy.id}
                  className="p-3 border border-indigo-700 rounded-md bg-indigo-800/50"
                >
                  <div className="flex items-center mb-2">
                    {strategy.icon}
                    <span className="ml-2 font-bold">
                      {strategy.name} Strategy
                    </span>
                  </div>

                  <p className="mb-3 text-sm text-gray-300">
                    {strategy.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 rounded bg-indigo-900/80">
                      <div className="text-gray-400">Attack Modifier</div>
                      <div className="font-semibold text-red-400">
                        {strategy.attackBonus}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-indigo-900/80">
                      <div className="text-gray-400">Defense Modifier</div>
                      <div className="font-semibold text-blue-400">
                        {strategy.defenseBonus}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            <div className="mt-4 text-center">
              <button
                className="flex items-center px-4 py-2 mx-auto text-xs font-bold bg-indigo-700 rounded-md hover:bg-indigo-600"
                onClick={() => setShowStrategyModal(true)}
              >
                <Zap size={14} className="mr-2" />
                Change Strategy
              </button>
            </div>
          </div>
        </div>

        {/* Alliance Support */}
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Alliance Support</h3>
          </div>
          <div className="p-4">
            <div className="p-3 border border-green-800 rounded-md bg-green-900/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center font-semibold text-green-400">
                  <Users size={16} className="mr-2" />
                  {userData.alliance}
                </div>
                <div className="text-xs bg-green-800 rounded-full px-2 py-0.5">
                  Active
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-xs">
                  <span>Combat Support:</span>
                  <span className="text-green-400">+15% Attack & Defense</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Resource Support:</span>
                  <span className="text-green-400">+10% Production</span>
                </div>
              </div>

              <div className="mt-3">
                <button className="flex items-center justify-center w-full px-3 py-2 text-xs font-bold bg-green-700 rounded hover:bg-green-600">
                  <Users size={12} className="mr-1" />
                  Request Additional Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Intelligence tab content
  const renderIntelligence = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 border-b border-indigo-800">
            <h3 className="flex items-center font-bold text-purple-400">
              <Eye size={18} className="mr-2" />
              Intelligence Reports
            </h3>
            <button className="flex items-center px-3 py-1 text-xs font-bold bg-indigo-700 rounded hover:bg-indigo-600">
              <RefreshCw size={12} className="mr-1" />
              Gather Intelligence
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {intelligenceReports.map((report) => (
                <div
                  key={report.id}
                  className={`bg-indigo-800/50 p-4 rounded-md border ${
                    report.urgency === "high"
                      ? "border-red-700"
                      : report.urgency === "medium"
                      ? "border-yellow-700"
                      : "border-indigo-700"
                  } cursor-pointer hover:bg-indigo-800/70 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">{report.icon}</div>
                      <div>
                        <h4 className="font-bold">{report.title}</h4>
                        <div className="mt-1 text-xs text-gray-400">
                          <span>Source: {report.source}</span>
                          <span className="mx-2">•</span>
                          <span>{report.time}</span>
                          {report.verified && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="flex items-center inline text-green-400">
                                <CheckCircle size={10} className="mr-1" />
                                Verified
                              </span>
                            </>
                          )}
                          {!report.verified && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="flex items-center inline text-yellow-400">
                                <AlertTriangle size={10} className="mr-1" />
                                Unverified
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        report.urgency === "high"
                          ? "bg-red-900 text-red-300"
                          : report.urgency === "medium"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-blue-900 text-blue-300"
                      }`}
                    >
                      {report.urgency} urgency
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-300">{report.summary}</p>

                  <div className="p-3 mt-3 rounded-md bg-indigo-900/50">
                    <div className="mb-1 text-xs font-semibold">
                      Detailed Intelligence
                    </div>
                    <p className="text-xs text-gray-300">{report.details}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-gray-400">
                      <span>Territory: {report.relatedTerritory}</span>
                    </div>
                    <button className="flex items-center px-3 py-1 text-xs font-bold bg-indigo-700 rounded hover:bg-indigo-600">
                      <Map size={12} className="mr-1" />
                      View on Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional intel section for threat assessment */}
        <div className="mt-6 overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-4 border-b border-indigo-800">
            <h3 className="flex items-center font-bold text-purple-400">
              <AlertTriangle size={18} className="mr-2" />
              Threat Assessment
            </h3>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-3 border border-red-800 rounded-md bg-red-900/20">
                <div className="flex items-center mb-2">
                  <AlertTriangle size={16} className="mr-2 text-red-400" />
                  <div className="font-semibold">High Priority Threats</div>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-indigo-900/40">
                    <div className="text-sm font-semibold">
                      TradeKing Forces
                    </div>
                    <div className="mt-1 text-xs text-gray-300">
                      Large military buildup near Eastern Silk Road. Estimated
                      attack within 24 hours.
                    </div>
                  </div>
                  <div className="p-2 rounded bg-indigo-900/40">
                    <div className="text-sm font-semibold">
                      NexusNetwork Expansion
                    </div>
                    <div className="mt-1 text-xs text-gray-300">
                      Aggressive territory acquisition threatens your supply
                      lines to Northern Timber Route.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border border-yellow-800 rounded-md bg-yellow-900/20">
                <div className="flex items-center mb-2">
                  <AlertTriangle size={16} className="mr-2 text-yellow-400" />
                  <div className="font-semibold">Medium Priority Threats</div>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-indigo-900/40">
                    <div className="text-sm font-semibold">
                      Southern Alliance Forming
                    </div>
                    <div className="mt-1 text-xs text-gray-300">
                      Multiple southern barons forming trade coalition that
                      could restrict market access.
                    </div>
                  </div>
                  <div className="p-2 rounded bg-indigo-900/40">
                    <div className="text-sm font-semibold">
                      Resource Shortages
                    </div>
                    <div className="mt-1 text-xs text-gray-300">
                      Critical supply shortages affecting Western territories
                      defense capabilities.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 mt-4 rounded-md bg-indigo-800/50">
              <div className="mb-2 font-semibold">Strategic Recommendation</div>
              <p className="text-sm text-gray-300">
                Focus defensive resources on Eastern Silk Road to counter
                imminent TradeKing attack. Establish diplomatic relations with
                Southern barons to prevent coalition formation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Intel Dashboard</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 text-center rounded-md bg-indigo-800/50">
                <div className="text-xl font-bold text-yellow-400">3</div>
                <div className="text-xs text-gray-300">Active Reports</div>
              </div>
              <div className="p-3 text-center rounded-md bg-indigo-800/50">
                <div className="text-xl font-bold text-blue-400">5</div>
                <div className="text-xs text-gray-300">Agents in Field</div>
              </div>
            </div>

            <div className="p-3 mb-4 rounded-md bg-indigo-800/50">
              <div className="mb-2 text-sm font-semibold">
                Intelligence Network
              </div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Network Strength:</span>
                <span className="text-yellow-400">Tier 2 (Enhanced)</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-indigo-950">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span>Next Tier:</span>
                <span className="text-gray-400">
                  500 more intelligence points
                </span>
              </div>
            </div>

            <div className="p-3 rounded-md bg-indigo-800/50">
              <div className="mb-2 text-sm font-semibold">Enemy Activity</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Eastern Front:</span>
                  <span className="text-red-400">High</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Northern Region:</span>
                  <span className="text-yellow-400">Medium</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Southern Markets:</span>
                  <span className="text-green-400">Low</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Central Nexus:</span>
                  <span className="text-red-400">High</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Western Frontier:</span>
                  <span className="text-yellow-400">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Active Missions</h3>
          </div>
          <div className="p-4">
            <div className="p-3 border border-blue-700 rounded-md bg-indigo-800/50">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 mt-1 mr-3 bg-blue-900 rounded-full">
                  <Eye size={16} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold">Scout Eastern Territories</h4>
                  <div className="mt-1 text-xs text-gray-400">
                    <span>reconnaissance mission</span>
                    <span className="mx-2">•</span>
                    <span>In progress</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1 text-xs">
                      <span>Progress:</span>
                      <span>75%</span>
                    </div>
                    <div className="h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-gray-400">Remaining: </span>
                    <span>1h 5m</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="flex items-center px-4 py-2 mx-auto text-xs font-bold bg-indigo-700 rounded hover:bg-indigo-600">
                <Flag size={14} className="mr-2" />
                Deploy New Mission
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Resource Intelligence</h3>
          </div>
          <div className="p-4">
            <div className="p-3 rounded-md bg-indigo-800/50">
              <div className="mb-2 text-sm font-semibold">Market Analysis</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Eastern Silk Prices:</span>
                  <span className="text-green-400">Rising (+15%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Northern Timber Value:</span>
                  <span className="text-red-400">Falling (-8%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Western Gold Demand:</span>
                  <span className="text-yellow-400">Stable</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Southern Spice Shortage:
                  </span>
                  <span className="text-green-400">Critical (Opportunity)</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-blue-300">
                Recommendation: Increase investment in Eastern Silk Road and
                Southern Spice Markets to capitalize on favorable conditions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Tactics tab content
  const renderTactics = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-4 border-b border-indigo-800">
            <h3 className="flex items-center font-bold text-purple-400">
              <BookOpen size={18} className="mr-2" />
              Battle Tactics
            </h3>
          </div>

          <div className="p-4">
            <h4 className="mb-3 font-semibold text-blue-400">
              Current Strategy:{" "}
              {strategies.find((s) => s.id === selectedStrategy)?.name}
            </h4>
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
              {strategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className={`bg-indigo-800/50 p-3 rounded-md border cursor-pointer transition-colors ${
                    selectedStrategy === strategy.id
                      ? "border-purple-600 bg-purple-900/20"
                      : "border-indigo-700 hover:bg-indigo-800/70"
                  }`}
                  onClick={() => handleStrategySelect(strategy.id)}
                >
                  <div className="flex items-center mb-2">
                    {strategy.icon}
                    <span className="ml-2 font-bold">{strategy.name}</span>
                  </div>

                  <p className="mb-3 text-xs text-gray-300">
                    {strategy.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded bg-indigo-900/70">
                      <div className="text-gray-400">Attack</div>
                      <div className="font-semibold text-red-400">
                        {strategy.attackBonus}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-indigo-900/70">
                      <div className="text-gray-400">Defense</div>
                      <div className="font-semibold text-blue-400">
                        {strategy.defenseBonus}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-indigo-900/70">
                      <div className="text-gray-400">Resources</div>
                      <div className="font-semibold">
                        {strategy.resourceCost}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs">
                    <span className="text-gray-400">Best against: </span>
                    <span>{strategy.bestAgainst}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 mb-6 border border-indigo-700 rounded-md bg-indigo-800/50">
              <h4 className="mb-3 font-semibold text-blue-400">
                Unit Tactical Deployment
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-3 border border-indigo-700 rounded-md bg-indigo-900/50">
                  <h5 className="flex items-center font-semibold">
                    <Shield size={16} className="mr-2 text-blue-400" />
                    Vanguard Formation
                  </h5>
                  <p className="mt-1 text-xs text-gray-300">
                    Strong defensive formation that prioritizes troop survival
                  </p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-red-400">Attack: -5%</span>
                    <span className="text-blue-400">Defense: +15%</span>
                    <span>Casualties: -20%</span>
                  </div>
                </div>

                <div className="p-3 border border-indigo-700 rounded-md bg-indigo-900/50">
                  <h5 className="flex items-center font-semibold">
                    <Zap size={16} className="mr-2 text-yellow-400" />
                    Flanking Maneuver
                  </h5>
                  <p className="mt-1 text-xs text-gray-300">
                    Advanced tactic that uses speed to overwhelm enemies
                  </p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-red-400">Attack: +20%</span>
                    <span className="text-blue-400">Defense: -10%</span>
                    <span>Casualties: +5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-indigo-700 rounded-md bg-indigo-800/50">
              <h4 className="mb-3 font-semibold text-blue-400">
                Battle Simulator
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-md bg-indigo-900/80">
                  <div className="mb-1 text-xs text-gray-400">Your Forces</div>
                  <div className="font-semibold text-blue-400">
                    {userData.attackStrength} combat power
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    Morale bonus: +15%
                  </div>
                </div>

                <div className="p-3 rounded-md bg-indigo-900/80">
                  <div className="mb-1 text-xs text-gray-400">Enemy Forces</div>
                  <div className="font-semibold text-red-400">
                    ~8,500 combat power
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    Eastern Front enemy estimate
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  className="px-4 py-2 text-xs font-bold bg-purple-700 rounded-md hover:bg-purple-600"
                  onClick={() => {
                    setShowBattleModal(true);
                    setBattleStep(0);
                  }}
                >
                  Run Simulation
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-4 border-b border-indigo-800">
            <h3 className="flex items-center font-bold text-purple-400">
              <BarChart3 size={18} className="mr-2" />
              Battle Analytics
            </h3>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
              <div className="p-3 rounded-md bg-indigo-800/50">
                <div className="mb-1 text-xs text-gray-400">Battles Fought</div>
                <div className="text-xl font-bold">15</div>
                <div className="flex justify-between mt-1 text-xs">
                  <span className="text-green-400">10 victories</span>
                  <span className="text-red-400">5 defeats</span>
                </div>
              </div>

              <div className="p-3 rounded-md bg-indigo-800/50">
                <div className="mb-1 text-xs text-gray-400">Win Rate</div>
                <div className="text-xl font-bold text-green-400">67%</div>
                <div className="mt-1 text-xs">
                  <span className="text-green-400">+12%</span> this week
                </div>
              </div>

              <div className="p-3 rounded-md bg-indigo-800/50">
                <div className="mb-1 text-xs text-gray-400">
                  Territory Control
                </div>
                <div className="text-xl font-bold">2/5</div>
                <div className="mt-1 text-xs">regions under your control</div>
              </div>
            </div>

            <div className="p-4 border border-indigo-700 rounded-md bg-indigo-800/50">
              <h4 className="mb-3 font-semibold text-blue-400">
                Recent Battles
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border border-green-800 rounded-md bg-green-900/30">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 text-lg bg-green-900 rounded-full">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold">Northern Timber Route</div>
                      <div className="text-xs text-gray-400">2 days ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Result</div>
                    <div className="text-sm text-green-400">Victory</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 border border-red-800 rounded-md bg-red-900/30">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 text-lg bg-red-900 rounded-full">
                      ✗
                    </div>
                    <div>
                      <div className="font-semibold">Eastern Silk Road</div>
                      <div className="text-xs text-gray-400">4 days ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Result</div>
                    <div className="text-sm text-red-400">Defeat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Battle Conditions</h3>
          </div>
          <div className="p-4">
            <div className="p-3 mb-4 rounded-md bg-indigo-800/50">
              <div className="mb-2 font-semibold">Eastern Front</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Terrain:</span>
                  <span>Mountain Pass</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Weather:</span>
                  <span className="text-blue-400">Clear</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time of Day:</span>
                  <span>Dawn</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Special Conditions:</span>
                  <span className="text-yellow-400">Trade Festival</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-400">
                +10% to cavalry units during dawn operations
              </div>
            </div>

            <div className="p-3 rounded-md bg-indigo-800/50">
              <div className="mb-2 font-semibold">Tactical Recommendations</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <ChevronRight
                    size={14}
                    className="flex-shrink-0 mr-1 text-purple-400"
                  />
                  <span>
                    Focus cavalry units on northern flanking maneuvers at dawn
                  </span>
                </div>
                <div className="flex items-center">
                  <ChevronRight
                    size={14}
                    className="flex-shrink-0 mr-1 text-purple-400"
                  />
                  <span>Target enemy supply lines with Shadow Agents</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight
                    size={14}
                    className="flex-shrink-0 mr-1 text-purple-400"
                  />
                  <span>
                    Use guerrilla tactics to avoid direct confrontation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Special Abilities</h3>
          </div>
          <div className="p-4 space-y-2">
            <div className="p-3 border border-indigo-700 rounded-md bg-indigo-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 text-lg bg-purple-900 rounded-full">
                    🥷
                  </div>
                  <div>
                    <div className="font-semibold">Shadow Network</div>
                    <div className="text-xs text-gray-400">
                      Alliance ability
                    </div>
                  </div>
                </div>
                <div className="bg-green-900 px-2 py-0.5 rounded-full text-xs text-green-400">
                  Ready
                </div>
              </div>
            </div>

            <div className="p-3 border border-indigo-700 rounded-md bg-indigo-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 text-lg bg-blue-900 rounded-full">
                    📦
                  </div>
                  <div>
                    <div className="font-semibold">Supply Surge</div>
                    <div className="text-xs text-gray-400">
                      Commander ability
                    </div>
                  </div>
                </div>
                <div className="bg-green-900 px-2 py-0.5 rounded-full text-xs text-green-400">
                  Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-indigo-800 rounded-md shadow-lg bg-indigo-900/50 backdrop-blur-sm">
          <div className="p-3 border-b border-indigo-800">
            <h3 className="font-bold text-purple-400">Unit Effectiveness</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-indigo-800/50">
                <div className="mb-2 font-semibold">
                  Trade Guards (Infantry)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-green-900/30">
                    <div className="mb-1 text-gray-400">Strong Against:</div>
                    <div className="flex items-center">
                      <ChevronUp size={10} className="mr-1 text-green-400" />
                      <span>Siege Units</span>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-red-900/30">
                    <div className="mb-1 text-gray-400">Weak Against:</div>
                    <div className="flex items-center">
                      <ChevronDown size={10} className="mr-1 text-red-400" />
                      <span>Cavalry Units</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-md bg-indigo-800/50">
                <div className="mb-2 font-semibold">
                  Shadow Agents (Special)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-green-900/30">
                    <div className="mb-1 text-gray-400">Strong Against:</div>
                    <div className="flex items-center">
                      <ChevronUp size={10} className="mr-1 text-green-400" />
                      <span>Cavalry Units</span>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-red-900/30">
                    <div className="mb-1 text-gray-400">Weak Against:</div>
                    <div className="flex items-center">
                      <ChevronDown size={10} className="mr-1 text-red-400" />
                      <span>Large Infantry Groups</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen text-white bg-gradient-to-b from-indigo-900 to-indigo-950">
      {/* War Room Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
        <div className="relative h-24 bg-indigo-900 bg-center bg-cover">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/70 to-purple-900/70"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/svg%3E')]"></div>
          <div className="relative z-20 flex flex-col items-start justify-between h-full px-4 py-3 sm:flex-row sm:items-center sm:px-6 sm:py-0">
            <div className="flex items-center">
              <Crosshair size={24} className="mr-2 text-purple-400 sm:mr-3" />
              <div>
                <h1 className="text-xl font-bold tracking-wider text-white sm:text-2xl">
                  WAR ROOM
                </h1>
                <p className="text-xs tracking-wide text-gray-300 sm:text-sm">
                  Strategic Command Center
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-2 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mt-0">
              <div className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md bg-indigo-950/50 backdrop-blur-sm border-indigo-800/50">
                <Users size={16} className="mr-2 text-green-400" />
                <span className="text-xs font-semibold sm:text-sm">
                  {userData.alliance}
                </span>
              </div>

              <div className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md bg-indigo-950/50 backdrop-blur-sm border-indigo-800/50">
                <Trophy size={16} className="mr-2 text-yellow-400" />
                <span className="text-xs font-semibold sm:text-sm">
                  Rank #{userData.warRank}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap p-2 space-x-0 border-b border-indigo-800 sm:space-x-1 bg-indigo-950">
        <button
          className={`px-3 sm:px-4 py-2 rounded-t-lg font-semibold flex items-center text-xs sm:text-sm w-full sm:w-auto mb-1 sm:mb-0 ${
            activeTab === "command"
              ? "bg-purple-900 text-white"
              : "bg-indigo-900 text-gray-300 hover:bg-indigo-800"
          }`}
          onClick={() => setActiveTab("command")}
        >
          <Crosshair size={14} className="mr-2" />
          Command Center
        </button>
        <button
          className={`px-3 sm:px-4 py-2 rounded-t-lg font-semibold flex items-center text-xs sm:text-sm w-full sm:w-auto mb-1 sm:mb-0 ${
            activeTab === "intelligence"
              ? "bg-purple-900 text-white"
              : "bg-indigo-900 text-gray-300 hover:bg-indigo-800"
          }`}
          onClick={() => setActiveTab("intelligence")}
        >
          <Eye size={14} className="mr-2" />
          Intelligence
        </button>
        <button
          className={`px-3 sm:px-4 py-2 rounded-t-lg font-semibold flex items-center text-xs sm:text-sm w-full sm:w-auto ${
            activeTab === "tactics"
              ? "bg-purple-900 text-white"
              : "bg-indigo-900 text-gray-300 hover:bg-indigo-800"
          }`}
          onClick={() => setActiveTab("tactics")}
        >
          <BookOpen size={14} className="mr-2" />
          Tactics
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-auto">
        {activeTab === "command" && renderCommandCenter()}
        {activeTab === "intelligence" && renderIntelligence()}
        {activeTab === "tactics" && renderTactics()}
      </div>

      {/* Modals */}
      {/* Troop Training Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-75"
            onClick={() => setShowTrainingModal(false)}
          ></div>

          <div className="relative w-full max-w-md p-4 mx-auto bg-indigo-900 border-4 border-indigo-700 rounded-lg sm:p-6">
            <button
              onClick={() => setShowTrainingModal(false)}
              className="absolute text-gray-400 top-2 right-2 sm:top-3 sm:right-3 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-4 sm:flex-row">
              <div className="flex items-center justify-center w-12 h-12 mb-2 text-2xl bg-indigo-800 border border-indigo-700 rounded-md sm:mb-0 sm:mr-4">
                {selectedTroop?.icon}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold sm:text-xl">
                  Train {selectedTroop?.name}
                </h3>
                <div className="text-xs text-gray-400 sm:text-sm">
                  Combat Power: {selectedTroop?.power} per unit
                </div>
              </div>
            </div>

            <div className="p-4 mb-4 rounded-md bg-indigo-800/50">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Currently Available:</span>
                <span className="font-semibold">
                  {selectedTroop?.count} units
                </span>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm">
                  Number of Units to Train
                </label>
                <div className="flex items-center">
                  <button
                    className="p-2 bg-indigo-700 hover:bg-indigo-600 rounded-l-md"
                    onClick={() =>
                      setTrainingAmount(Math.max(5, trainingAmount - 5))
                    }
                  >
                    <ChevronDown size={20} />
                  </button>
                  <div className="flex-1 py-2 text-xl font-bold text-center bg-indigo-950">
                    {trainingAmount}
                  </div>
                  <button
                    className="p-2 bg-indigo-700 hover:bg-indigo-600 rounded-r-md"
                    onClick={() => setTrainingAmount(trainingAmount + 5)}
                  >
                    <ChevronUp size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cost per Unit:</span>
                  <span>{selectedTroop?.trainCost} resources</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Cost:</span>
                  <span className="font-semibold">
                    {selectedTroop
                      ? selectedTroop.trainCost * trainingAmount
                      : 0}{" "}
                    resources
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Training Time:</span>
                  <span>3h 25m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Combat Power Gain:</span>
                  <span className="text-green-400">
                    +{selectedTroop ? selectedTroop.power * trainingAmount : 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 py-3 font-semibold transition-all bg-gray-700 rounded-md hover:bg-gray-600"
                onClick={() => setShowTrainingModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex items-center justify-center flex-1 py-3 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                onClick={handleTroopTraining}
              >
                <RefreshCw size={16} className="mr-2" />
                Start Training
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Strategy Modal */}
      {showStrategyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-75"
            onClick={() => setShowStrategyModal(false)}
          ></div>

          <div className="relative w-full max-w-2xl p-4 sm:p-6 mx-auto bg-indigo-900 border-4 border-indigo-700 rounded-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowStrategyModal(false)}
              className="absolute text-gray-400 top-2 right-2 sm:top-3 sm:right-3 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold sm:text-xl">
                Select War Strategy
              </h3>
              <p className="text-xs text-gray-400 sm:text-sm">
                Your strategy affects all combat operations and resource
                allocations
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              {strategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className={`p-4 rounded-md border cursor-pointer transition-colors ${
                    selectedStrategy === strategy.id
                      ? "bg-purple-900/50 border-purple-600"
                      : "bg-indigo-800/30 border-indigo-700 hover:bg-indigo-800/70"
                  }`}
                  onClick={() => setSelectedStrategy(strategy.id)}
                >
                  <div className="flex items-center mb-2">
                    {strategy.icon}
                    <span className="ml-2 font-bold">{strategy.name}</span>
                  </div>

                  <p className="mb-3 text-sm text-gray-300">
                    {strategy.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded bg-indigo-900/70">
                      <div className="text-gray-400">Attack</div>
                      <div className="font-semibold text-red-400">
                        {strategy.attackBonus}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-indigo-900/70">
                      <div className="text-gray-400">Defense</div>
                      <div className="font-semibold text-blue-400">
                        {strategy.defenseBonus}
                      </div>
                    </div>
                    <div className="p-2 rounded bg-indigo-900/70">
                      <div className="text-gray-400">Resources</div>
                      <div className="font-semibold">
                        {strategy.resourceCost}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs">
                    <span className="text-gray-400">Best against: </span>
                    <span>{strategy.bestAgainst}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 py-3 font-semibold transition-all bg-gray-700 rounded-md hover:bg-gray-600"
                onClick={() => setShowStrategyModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 font-semibold transition-all bg-purple-700 rounded-md hover:bg-purple-600"
                onClick={() => handleStrategySelect(selectedStrategy)}
              >
                Confirm Strategy Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Battle Simulation Modal */}
      {showBattleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-95"
            onClick={() => setShowBattleModal(false)}
          ></div>

          <div className="relative flex flex-col w-full max-w-4xl mx-auto bg-indigo-900 border-4 border-indigo-700 rounded-lg h-[90vh]">
            <div className="flex items-center justify-between p-2 border-b border-indigo-700 sm:p-4">
              <h3 className="flex items-center text-base font-bold text-purple-400 sm:text-xl">
                <Sword size={18} sm:size={22} className="mr-2" />
                Battle Simulation
              </h3>
              <button
                onClick={() => setShowBattleModal(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-2 overflow-hidden">
              <canvas
                ref={battleCanvasRef}
                width="800"
                height="400"
                className="w-full h-full"
              ></canvas>
            </div>

            <div className="p-3 border-t border-indigo-700 bg-indigo-950">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold">Battle Progress</div>
                  <div className="flex items-center mt-1">
                    <div className="w-24 h-2 overflow-hidden bg-indigo-900 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(battleStep / 3) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs">
                      {Math.round((battleStep / 3) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-400">Simulation Step: </span>
                  <span className="font-semibold">
                    {battleStep === 0
                      ? "Initial Deployment"
                      : battleStep === 1
                      ? "First Engagement"
                      : battleStep === 2
                      ? "Main Battle"
                      : "Battle Resolution"}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  className="px-4 py-2 text-xs font-bold bg-indigo-700 rounded-md hover:bg-indigo-600"
                  onClick={resetBattleSimulation}
                >
                  Reset Simulation
                </button>
                <button
                  className="flex-1 px-4 py-2 text-xs font-bold bg-blue-700 rounded-md hover:bg-blue-600"
                  onClick={advanceBattleStep}
                >
                  {battleStep < 3
                    ? "Advance Simulation"
                    : "Complete Simulation"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tactical Map Modal */}
      {showTacticalMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-90"
            onClick={() => setShowTacticalMap(false)}
          ></div>

          <div className="relative flex flex-col w-full max-w-4xl mx-auto bg-indigo-900 border-4 border-indigo-700 rounded-lg h-[90vh]">
            <div className="flex flex-col items-start justify-between gap-2 p-4 sm:flex-row sm:items-center sm:gap-0">
              <h3 className="flex items-center text-base font-bold text-purple-400 sm:text-xl">
                <Map size={18} sm:size={22} className="mr-2" />
                Tactical War Map
              </h3>
              <button
                onClick={() => setShowTacticalMap(false)}
                className="self-end p-1 text-gray-400 hover:text-white sm:self-auto"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden border border-indigo-800 rounded-md bg-indigo-950">
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

              <div className="absolute inset-0 p-4">
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/4 top-1/4">
                  <div className="flex flex-col items-center justify-center w-24 h-24 border-2 border-green-600 rounded-md bg-indigo-900/70">
                    <div className="text-2xl">🌲</div>
                    <div className="mt-1 text-xs font-semibold">
                      Northern Territory
                    </div>
                    <div className="text-xs text-green-400">Your Control</div>
                  </div>
                </div>

                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-3/4 top-1/4">
                  <div className="flex flex-col items-center justify-center w-24 h-24 border-2 border-red-600 rounded-md bg-indigo-900/70">
                    <div className="text-2xl">🏯</div>
                    <div className="mt-1 text-xs font-semibold">
                      Eastern Territory
                    </div>
                    <div className="text-xs text-red-400">Enemy Control</div>
                  </div>
                </div>

                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/4 top-3/4">
                  <div className="flex flex-col items-center justify-center w-24 h-24 border-2 border-yellow-600 rounded-md bg-indigo-900/70">
                    <div className="text-2xl">🌶️</div>
                    <div className="mt-1 text-xs font-semibold">
                      Southern Territory
                    </div>
                    <div className="text-xs text-yellow-400">Contested</div>
                  </div>
                </div>

                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-3/4 top-3/4">
                  <div className="flex flex-col items-center justify-center w-24 h-24 border-2 border-red-600 rounded-md bg-indigo-900/70">
                    <div className="text-2xl">🏛️</div>
                    <div className="mt-1 text-xs font-semibold">
                      Central Territory
                    </div>
                    <div className="text-xs text-red-400">Enemy Control</div>
                  </div>
                </div>

                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                  <div className="flex flex-col items-center justify-center w-16 h-16 border-2 border-yellow-600 rounded-full bg-indigo-900/70">
                    <div className="mt-1 text-xs font-semibold">
                      Central Nexus
                    </div>
                    <div className="text-xs text-yellow-400">
                      Strategic Point
                    </div>
                  </div>
                </div>

                <svg className="absolute inset-0 w-full h-full">
                  <line
                    x1="25%"
                    y1="25%"
                    x2="25%"
                    y2="75%"
                    stroke="#4ADE80"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="25%"
                    y1="25%"
                    x2="75%"
                    y2="25%"
                    stroke="#F87171"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="25%"
                    y1="75%"
                    x2="75%"
                    y2="75%"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="75%"
                    y1="25%"
                    x2="75%"
                    y2="75%"
                    stroke="#F87171"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="25%"
                    y1="25%"
                    x2="50%"
                    y2="50%"
                    stroke="#A78BFA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="75%"
                    y1="25%"
                    x2="50%"
                    y2="50%"
                    stroke="#A78BFA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="25%"
                    y1="75%"
                    x2="50%"
                    y2="50%"
                    stroke="#A78BFA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1="75%"
                    y1="75%"
                    x2="50%"
                    y2="50%"
                    stroke="#A78BFA"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>

                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/3 top-1/3">
                  <div className="flex items-center justify-center w-8 h-8 text-sm bg-blue-800 border border-blue-600 rounded-full pulse-animation">
                    {userData.troopTypes[0].icon}
                  </div>
                </div>

                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-2/3 top-2/3">
                  <div className="flex items-center justify-center w-8 h-8 text-sm bg-red-800 border border-red-600 rounded-full pulse-animation">
                    👑
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-3">
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 mr-1 bg-green-600 rounded-full"></div>
                  <span>Your Control</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 mr-1 bg-red-600 rounded-full"></div>
                  <span>Enemy Control</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 mr-1 bg-yellow-600 rounded-full"></div>
                  <span>Contested</span>
                </div>
              </div>

              <button
                className="px-4 py-2 text-xs font-bold bg-indigo-700 rounded-md hover:bg-indigo-600"
                onClick={() => setShowTacticalMap(false)}
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-75"
            onClick={() => setShowConfirmModal(false)}
          ></div>

          <div className="relative w-full max-w-md p-4 mx-auto bg-indigo-900 border-4 border-indigo-700 rounded-lg sm:p-6">
            <div className="mb-4 text-center">
              <div className="inline-block mb-3">
                {confirmAction?.type === "train" && (
                  <RefreshCw
                    size={32}
                    sm:size={40}
                    className="text-green-400"
                  />
                )}
                {confirmAction?.type === "battle" && (
                  <Sword size={32} sm:size={40} className="text-red-400" />
                )}
              </div>

              <h3 className="text-lg font-bold sm:text-xl">Confirm Action</h3>

              {confirmAction?.type === "train" && (
                <p className="mt-2 text-gray-300">
                  Train {confirmAction.amount} {confirmAction.troop.name} for{" "}
                  {confirmAction.troop.trainCost * confirmAction.amount}{" "}
                  resources?
                </p>
              )}

              {confirmAction?.type === "battle" && (
                <p className="mt-2 text-gray-300">
                  {confirmAction.war
                    ? `Deploy reinforcements to ${confirmAction.war.name}?`
                    : `Launch attack on ${confirmAction.territory.name}?`}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 py-3 font-semibold transition-all bg-gray-700 rounded-md hover:bg-gray-600"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 font-semibold transition-all bg-green-700 rounded-md hover:bg-green-600"
                onClick={handleConfirmAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-3 sm:px-4 py-2 sm:py-3 rounded-md shadow-lg flex items-center max-w-[90vw] sm:max-w-md ${
            notification.type === "success"
              ? "bg-green-900 border border-green-700"
              : notification.type === "error"
              ? "bg-red-900 border border-red-700"
              : "bg-blue-900 border border-blue-700"
          }`}
        >
          {notification.type === "success" && (
            <CheckCircle
              size={16}
              sm:size={18}
              className="flex-shrink-0 mr-2 text-green-400"
            />
          )}
          {notification.type === "error" && (
            <XCircle
              size={16}
              sm:size={18}
              className="flex-shrink-0 mr-2 text-red-400"
            />
          )}
          {notification.type === "info" && (
            <Info
              size={16}
              sm:size={18}
              className="flex-shrink-0 mr-2 text-blue-400"
            />
          )}

          <span className="text-xs sm:text-sm">{notification.message}</span>
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

        .pulse-animation {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default WarRoomComponent;
