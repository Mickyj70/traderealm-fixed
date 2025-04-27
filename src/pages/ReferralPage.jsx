/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  X,
  Copy,
  Mail,
  UserPlus,
  Send,
  DollarSign,
  Rocket,
  Target,
  Heart,
  Download,
  CheckCircle,
  Star,
  Award,
  Trophy,
  Users,
  Globe,
  Gift,
  Share2,
} from "lucide-react";

const TradeRealmReferralPage = () => {
  const [referralCode, setReferralCode] = useState("BARON-XK742-9T");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copyMessageStates, setCopyMessageStates] = useState({
    twitter: false,
    discord: false,
    email: false,
  });

  // Handle copy referral code
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Handle send invite
  const handleSendInvite = () => {
    if (inviteEmail && inviteEmail.includes("@")) {
      setIsInviteSent(true);
      setShowConfetti(true);
      setTimeout(() => {
        setIsInviteSent(false);
        setInviteEmail("");
      }, 3000);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // Handle email input
  const handleEmailChange = (e) => {
    setInviteEmail(e.target.value);
  };

  // Handle copy message
  const handleCopyMessage = (type) => {
    let text = "";
    if (type === "twitter") {
      text = `🚀 I just discovered #TradeRealm - the DeFi protocol that turns yield farming into an epic strategy game! Earn 10,000%+ APY and build your trade empire. Join using my referral code: ${referralCode} for 5% bonus $BARON tokens! #DeFi #GameFi`;
    } else if (type === "discord") {
      text = `Hey everyone! 👋 I've been exploring this new DeFi protocol called TradeRealm that combines OlympusDAO mechanics with strategic gameplay. You stake tokens, control trade routes, set tariffs, and participate in weekly Trade Wars for massive rewards! 💰\n\nIf you want to check it out, use my referral code for a 5% bonus on your first stake: ${referralCode}\n\nWebsite: https://realmfinance.io`;
    } else if (type === "email") {
      text = `Subject: Discovered an Exciting New DeFi Opportunity - Thought of You!\n\nHi there,\n\nI hope this finds you well! I recently discovered a fascinating new DeFi protocol called TradeRealm that I thought might interest you.\n\nWhat makes it unique is how it transforms traditional yield farming into strategic gameplay. You can:\n\n• Stake $BARON tokens for auto-compounding rewards (initially 10,000%+ APY!)\n• Control trade routes to earn tariff revenue\n• Participate in weekly Trade Wars for massive rewards\n• Form alliances with other players\n\nIf you decide to check it out, please use my referral code: ${referralCode}\n\nThis will give you a 5% bonus on your first stake, and I'll earn a small commission too!\n\nWebsite: https://realmfinance.io\n\nLet me know if you join - perhaps we could form a trade alliance!\n\nBest regards,`;
    }

    navigator.clipboard.writeText(text);
    setCopyMessageStates({
      ...copyMessageStates,
      [type]: true,
    });

    setTimeout(() => {
      setCopyMessageStates({
        ...copyMessageStates,
        [type]: false,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-green-900 to-indigo-950">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                backgroundColor: [
                  "#ffbe0b",
                  "#fb5607",
                  "#ff006e",
                  "#8338ec",
                  "#3a86ff",
                ][Math.floor(Math.random() * 5)],
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="p-4 bg-indigo-900 border-b-4 border-indigo-700 shadow-lg">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-800 rounded-full">
                <Share2 className="text-green-400" size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-wider text-green-400 md:text-3xl">
                TradeRealm Referral Program
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden px-4 py-2 font-semibold bg-green-700 rounded-md md:flex">
                <span>10,250 $BARON</span>
              </div>
              <button className="px-4 py-2 font-semibold transition-all bg-purple-700 rounded-md hover:bg-purple-600">
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl px-4 py-8 mx-auto">
        {/* Header with dynamic design */}
        <div className="relative mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-green-400">
            <span className="inline-block mr-2 animate-bounce">🚀</span>
            Build Your Trade Empire Together
            <span className="inline-block ml-2 animate-bounce">🚀</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-blue-200">
            Invite friends, earn rewards, and rise together through the ranks of
            the most innovative DeFi game in the realm!
          </p>

          {/* Decorative elements */}
          <div className="absolute text-green-500 -top-4 left-1/4 animate-pulse">
            ✨
          </div>
          <div
            className="absolute top-0 text-green-500 right-1/4 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            ✨
          </div>
          <div
            className="absolute text-green-500 top-8 left-1/3 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            ✨
          </div>
          <div
            className="absolute text-green-500 -bottom-4 right-1/3 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          >
            ✨
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
          <div className="p-6 text-center transition-transform transform bg-indigo-900 border-2 border-green-700 rounded-lg shadow-xl bg-opacity-90 hover:scale-105">
            <UserPlus className="mx-auto mb-4 text-green-400" size={48} />
            <h3 className="mb-2 text-2xl font-bold text-white">
              Friends Invited
            </h3>
            <p className="mb-2 text-4xl font-bold text-green-400">12</p>
            <div className="flex items-center justify-center text-sm text-blue-300">
              <span className="inline-flex items-center px-2 py-1 bg-green-900 rounded-full">
                <span className="mr-1">+3</span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              </span>
              <span className="ml-2">this week</span>
            </div>
          </div>

          <div className="p-6 text-center transition-transform transform bg-indigo-900 border-2 border-green-700 rounded-lg shadow-xl bg-opacity-90 hover:scale-105">
            <DollarSign className="mx-auto mb-4 text-green-400" size={48} />
            <h3 className="mb-2 text-2xl font-bold text-white">
              Total Rewards
            </h3>
            <p className="mb-2 text-4xl font-bold text-green-400">
              4,250 $BARON
            </p>
            <div className="flex items-center justify-center text-sm text-blue-300">
              <span className="inline-flex items-center px-2 py-1 bg-green-900 rounded-full">
                <span className="mr-1">+850</span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              </span>
              <span className="ml-2">this week</span>
            </div>
          </div>

          <div className="p-6 text-center transition-transform transform bg-indigo-900 border-2 border-green-700 rounded-lg shadow-xl bg-opacity-90 hover:scale-105">
            <Target className="mx-auto mb-4 text-green-400" size={48} />
            <h3 className="mb-2 text-2xl font-bold text-white">
              Referral Rank
            </h3>
            <p className="mb-2 text-4xl font-bold text-green-400">#28</p>
            <div className="flex items-center justify-center text-sm text-blue-300">
              <span className="inline-flex items-center px-2 py-1 bg-green-900 rounded-full">
                <span className="mr-1">Top 5%</span>
                <Trophy size={12} className="text-yellow-400" />
              </span>
            </div>
          </div>
        </div>

        {/* Referral Tools */}
        <div className="p-8 mb-12 bg-indigo-900 border-2 border-green-700 shadow-xl bg-opacity-90 rounded-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 mr-4 bg-green-900 rounded-full">
              <Share2 className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-green-400">
              Your Referral Tools
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <label className="block mb-3 text-lg font-medium text-blue-200">
                Your Unique Referral Code
              </label>
              <div className="flex mb-2">
                <div className="flex-grow p-4 font-mono text-lg text-green-400 border-2 border-r-0 border-green-700 bg-indigo-950 rounded-l-md">
                  {referralCode}
                </div>
                <button
                  className={`px-5 py-2 ${
                    isCopied
                      ? "bg-green-600"
                      : "bg-green-700 hover:bg-green-600"
                  } rounded-r-md transition-colors flex items-center`}
                  onClick={handleCopyReferral}
                >
                  {isCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                  <span className="ml-2 font-semibold">
                    {isCopied ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>
              <p className="mb-6 text-sm text-blue-300">
                Share this code with friends for a 10% bonus on their first
                stake
              </p>

              <div className="p-4 bg-indigo-800 rounded-lg bg-opacity-70">
                <h4 className="mb-3 font-bold text-blue-200">Referral Link</h4>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value="https://app.realmfinance.io/ref/BARON-XK742-9T"
                    readOnly
                    className="flex-grow p-3 text-blue-300 border-2 border-r-0 border-green-700 bg-indigo-950 rounded-l-md"
                  />
                  <button
                    className="flex items-center px-4 py-2 transition-colors bg-green-700 hover:bg-green-600 rounded-r-md"
                    onClick={handleCopyReferral}
                  >
                    <Copy size={18} />
                  </button>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex items-center justify-center flex-1 p-2 bg-blue-600 rounded-md hover:bg-blue-500">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span>Twitter</span>
                  </button>
                  <button className="flex items-center justify-center flex-1 p-2 bg-purple-700 rounded-md hover:bg-purple-600">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3864-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                    <span>Discord</span>
                  </button>
                  <button className="flex items-center justify-center flex-1 p-2 bg-green-700 rounded-md hover:bg-green-600">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-3 text-lg font-medium text-blue-200">
                Send Direct Invite
              </label>
              <div className="p-6 bg-indigo-800 rounded-lg bg-opacity-70">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-blue-200">
                    Friend's Email
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={handleEmailChange}
                      placeholder="friend@example.com"
                      className="flex-grow p-3 text-white border-2 border-r-0 border-green-700 bg-indigo-950 rounded-l-md"
                    />
                    <button
                      className={`px-4 py-2 ${
                        isInviteSent
                          ? "bg-green-600"
                          : "bg-green-700 hover:bg-green-600"
                      } rounded-r-md transition-colors flex items-center`}
                      onClick={handleSendInvite}
                      disabled={!inviteEmail || !inviteEmail.includes("@")}
                    >
                      {isInviteSent ? (
                        <CheckCircle size={18} />
                      ) : (
                        <Send size={18} />
                      )}
                      <span className="ml-2 font-semibold">
                        {isInviteSent ? "Sent!" : "Send"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-blue-200">
                    Personalized Message (Optional)
                  </label>
                  <textarea
                    className="w-full h-24 p-3 text-white border-2 border-green-700 rounded-md bg-indigo-950"
                    placeholder="Add a personal note to your invite..."
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 mb-1 text-sm text-blue-300">
                  <Gift size={16} className="text-green-400" />
                  <span>
                    Your friend will receive a 5% bonus on their first stake
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <DollarSign size={16} className="text-green-400" />
                  <span>
                    You'll earn 10% of their first stake and 5% for 30 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Tiers Section */}
        <div className="p-8 mb-12 bg-indigo-900 border-2 border-green-700 shadow-xl bg-opacity-90 rounded-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 mr-4 bg-green-900 rounded-full">
              <Trophy className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-green-400">
              Referral Rewards
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
            <div className="p-6 text-center transition-transform transform bg-indigo-800 rounded-lg shadow-md hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-4xl bg-green-900 rounded-full">
                👑
              </div>
              <h4 className="mb-3 text-xl font-bold text-blue-200">For You</h4>
              <div className="flex items-center justify-center mb-3">
                <span className="text-4xl font-bold text-green-400">10%</span>
                <span className="ml-2 text-lg text-blue-300">
                  of first stake
                </span>
              </div>
              <p className="mb-3 text-blue-300">
                Earn 10% of your friend's first stake amount immediately in
                $BARON tokens
              </p>
              <div className="p-3 bg-indigo-900 rounded-lg">
                <p className="font-bold text-green-400">
                  + 5% of their earnings for 30 days
                </p>
              </div>
            </div>

            <div className="p-6 text-center transition-transform transform bg-indigo-800 rounded-lg shadow-md hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-4xl bg-green-900 rounded-full">
                🎁
              </div>
              <h4 className="mb-3 text-xl font-bold text-blue-200">
                For Your Friend
              </h4>
              <div className="flex items-center justify-center mb-3">
                <span className="text-4xl font-bold text-green-400">5%</span>
                <span className="ml-2 text-lg text-blue-300">bonus tokens</span>
              </div>
              <p className="mb-3 text-blue-300">
                Your friend receives a 5% bonus on their first stake in $BARON
                tokens
              </p>
              <div className="p-3 bg-indigo-900 rounded-lg">
                <p className="font-bold text-green-400">
                  Bronze tier status automatically
                </p>
              </div>
            </div>

            <div className="p-6 text-center transition-transform transform bg-indigo-800 rounded-lg shadow-md hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-4xl bg-green-900 rounded-full">
                🚀
              </div>
              <h4 className="mb-3 text-xl font-bold text-blue-200">
                Milestones
              </h4>
              <ul className="mb-3 space-y-3 text-left text-blue-300">
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">•</span>
                  <span>
                    <span className="font-bold">10 referrals:</span> Exclusive
                    Referral NFT
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">•</span>
                  <span>
                    <span className="font-bold">25 referrals:</span> Special
                    route access
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">•</span>
                  <span>
                    <span className="font-bold">50 referrals:</span> Protocol
                    revenue share
                  </span>
                </li>
              </ul>
              <div className="p-3 bg-indigo-900 rounded-lg">
                <p className="font-bold text-green-400">
                  Compounding benefits!
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-indigo-800 rounded-lg shadow-md">
            <h4 className="mb-4 text-xl font-bold text-green-400">
              Trade Baron Referral Levels
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-indigo-700">
                    <th className="px-4 py-3 text-left text-green-400">
                      Level
                    </th>
                    <th className="px-4 py-3 text-left text-green-400">
                      Requirements
                    </th>
                    <th className="px-4 py-3 text-left text-green-400">
                      Bonus Rate
                    </th>
                    <th className="px-4 py-3 text-left text-green-400">
                      Special Rewards
                    </th>
                  </tr>
                </thead>
                <tbody className="text-blue-300">
                  <tr className="transition-colors border-b border-indigo-700 hover:bg-indigo-700">
                    <td className="flex items-center px-4 py-4">
                      <span className="flex items-center justify-center w-6 h-6 mr-2 text-xs bg-yellow-800 rounded-full">
                        B
                      </span>
                      Bronze
                    </td>
                    <td className="px-4 py-4">1-9 referrals</td>
                    <td className="px-4 py-4 font-mono">10%</td>
                    <td className="px-4 py-4">Referral Badge</td>
                  </tr>
                  <tr className="transition-colors border-b border-indigo-700 hover:bg-indigo-700">
                    <td className="flex items-center px-4 py-4">
                      <span className="flex items-center justify-center w-6 h-6 mr-2 text-xs bg-gray-500 rounded-full">
                        S
                      </span>
                      Silver
                    </td>
                    <td className="px-4 py-4">10-24 referrals</td>
                    <td className="px-4 py-4 font-mono">15%</td>
                    <td className="px-4 py-4">Exclusive NFT + Custom Title</td>
                  </tr>
                  <tr className="transition-colors border-b border-indigo-700 hover:bg-indigo-700">
                    <td className="flex items-center px-4 py-4">
                      <span className="flex items-center justify-center w-6 h-6 mr-2 text-xs bg-yellow-600 rounded-full">
                        G
                      </span>
                      Gold
                    </td>
                    <td className="px-4 py-4">25-49 referrals</td>
                    <td className="px-4 py-4 font-mono">20%</td>
                    <td className="px-4 py-4">
                      Special Route Access + Higher APY
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-indigo-700">
                    <td className="flex items-center px-4 py-4">
                      <span className="flex items-center justify-center w-6 h-6 mr-2 text-xs bg-blue-500 rounded-full">
                        D
                      </span>
                      Diamond
                    </td>
                    <td className="px-4 py-4">50+ referrals</td>
                    <td className="px-4 py-4 font-mono">25%</td>
                    <td className="px-4 py-4">
                      Revenue Share + Governance Power
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 mt-6 bg-green-900 border border-green-700 rounded-lg bg-opacity-30">
              <div className="flex items-start">
                <Trophy
                  className="flex-shrink-0 mt-1 mr-3 text-yellow-400"
                  size={18}
                />
                <p className="text-sm text-blue-200">
                  <span className="font-bold text-green-400">
                    Your current level:
                  </span>{" "}
                  Silver Tier (12 referrals) - You need 13 more referrals to
                  reach Gold Tier!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="p-8 mb-12 bg-indigo-900 border-2 border-green-700 shadow-xl bg-opacity-90 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-3 mr-4 bg-green-900 rounded-full">
                <Award className="text-green-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-green-400">
                Referral Leaderboard
              </h3>
            </div>
            <span className="px-3 py-1 text-sm text-blue-300 bg-indigo-800 rounded-full">
              Updated: 2 hours ago
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-800 border-b-2 border-indigo-700">
                  <th className="px-4 py-4 text-left text-green-400">Rank</th>
                  <th className="px-4 py-4 text-left text-green-400">Baron</th>
                  <th className="px-4 py-4 text-left text-green-400">
                    Referrals
                  </th>
                  <th className="px-4 py-4 text-left text-green-400">
                    Rewards Earned
                  </th>
                  <th className="px-4 py-4 text-left text-green-400">Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-indigo-800 bg-opacity-50 border-b border-indigo-700">
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-black bg-yellow-500 rounded-full">
                      1
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-blue-200">
                    CryptoKing
                  </td>
                  <td className="px-4 py-4 text-blue-200">142</td>
                  <td className="px-4 py-4 font-mono text-blue-200">
                    32,450 $BARON
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-200 bg-blue-900 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                      Diamond
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-indigo-700">
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-black bg-gray-400 rounded-full">
                      2
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-blue-200">
                    TradeQueen
                  </td>
                  <td className="px-4 py-4 text-blue-200">98</td>
                  <td className="px-4 py-4 font-mono text-blue-200">
                    24,120 $BARON
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-200 bg-blue-900 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                      Diamond
                    </span>
                  </td>
                </tr>
                <tr className="bg-indigo-800 bg-opacity-50 border-b border-indigo-700">
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-yellow-800 rounded-full">
                      3
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-blue-200">
                    DeFiWhale
                  </td>
                  <td className="px-4 py-4 text-blue-200">87</td>
                  <td className="px-4 py-4 font-mono text-blue-200">
                    19,870 $BARON
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-200 bg-blue-900 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                      Diamond
                    </span>
                  </td>
                </tr>

                {/* More leaderboard entries */}
                <tr className="border-b border-indigo-700">
                  <td className="px-4 py-4 font-semibold text-center">4</td>
                  <td className="px-4 py-4 font-semibold text-blue-200">
                    BaronLord
                  </td>
                  <td className="px-4 py-4 text-blue-200">76</td>
                  <td className="px-4 py-4 font-mono text-blue-200">
                    16,340 $BARON
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-200 bg-blue-900 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                      Diamond
                    </span>
                  </td>
                </tr>

                <tr className="bg-indigo-800 bg-opacity-50 border-b border-indigo-700">
                  <td className="px-4 py-4 font-semibold text-center">5</td>
                  <td className="px-4 py-4 font-semibold text-blue-200">
                    CryptoVoyager
                  </td>
                  <td className="px-4 py-4 text-blue-200">62</td>
                  <td className="px-4 py-4 font-mono text-blue-200">
                    13,580 $BARON
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-200 bg-blue-900 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                      Diamond
                    </span>
                  </td>
                </tr>

                {/* Empty rows to indicate skipped entries */}
                <tr className="border-b border-indigo-700">
                  <td
                    colSpan="5"
                    className="px-4 py-2 text-sm text-center text-blue-300"
                  >
                    <span>• • •</span>
                  </td>
                </tr>

                {/* Highlighted user row */}
                <tr className="bg-green-900 border-b border-indigo-700 bg-opacity-40">
                  <td className="px-4 py-4 font-bold text-center">28</td>
                  <td className="px-4 py-4 font-bold text-green-400">
                    <span className="flex items-center">
                      YOU <Star className="ml-1" size={14} />
                    </span>
                  </td>
                  <td className="px-4 py-4 text-blue-200">12</td>
                  <td className="px-4 py-4 font-mono text-blue-200">
                    4,250 $BARON
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-200 bg-indigo-800 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-gray-400 rounded-full"></span>
                      Silver
                    </span>
                  </td>
                </tr>

                <tr className="border-b border-indigo-700">
                  <td className="px-4 py-4 font-semibold text-center">29</td>
                  <td className="px-4 py-4 font-semibold text-blue-200">
                    TradeMaster
                  </td>
                  <td className="px-4 py-4 text-blue-200">11</td>
                  <td className="px-4 py-4 font-mono text-blue-200">
                    3,980 $BARON
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-200 bg-indigo-800 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-gray-400 rounded-full"></span>
                      Silver
                    </span>
                  </td>
                </tr>

                <tr className="bg-indigo-800 bg-opacity-50 border-b border-indigo-700">
                  <td className="px-4 py-4 font-semibold text-center">30</td>
                  <td className="px-4 py-4 font-semibold text-blue-200">
                    RouteRunner
                  </td>
                  <td className="px-4 py-4 text-blue-200">10</td>
                  <td className="px-4 py-4 font-mono text-blue-200">
                    3,750 $BARON
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-200 bg-indigo-800 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-gray-400 rounded-full"></span>
                      Silver
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            <button className="px-6 py-3 text-blue-200 transition-colors bg-indigo-800 rounded-md shadow-md hover:bg-indigo-700">
              View Full Leaderboard
            </button>
          </div>
        </div>

        {/* Marketing Materials */}
        <div className="p-8 mb-12 bg-indigo-900 border-2 border-green-700 shadow-xl bg-opacity-90 rounded-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 mr-4 bg-green-900 rounded-full">
              <Globe className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-green-400">
              Marketing Materials
            </h3>
          </div>
          <p className="mb-6 text-lg text-blue-200">
            Share these eye-catching assets to promote your referral link!
          </p>

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            <div className="p-4 bg-indigo-800 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-3 rounded-md aspect-w-16 aspect-h-9 bg-gradient-to-br from-green-500 to-blue-600">
                <div className="p-4 text-center">
                  <span className="text-5xl">🚀</span>
                  <h4 className="mt-2 text-xl font-bold text-white">
                    Join TradeRealm
                  </h4>
                  <p className="mt-1 text-sm text-white">
                    Use code: {referralCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="flex items-center justify-center flex-1 py-2 text-sm text-white bg-green-700 hover:bg-green-600 rounded-l-md">
                  <Download size={14} className="mr-1" /> Download Banner
                </button>
                <button className="px-3 py-2 text-white bg-indigo-700 hover:bg-indigo-600 rounded-r-md">
                  <Copy size={14} />
                </button>
              </div>
            </div>

            <div className="p-4 bg-indigo-800 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-3 rounded-md aspect-w-1 aspect-h-1 bg-gradient-to-br from-purple-500 to-blue-600">
                <div className="p-4 text-center">
                  <span className="text-5xl">💰</span>
                  <h4 className="mt-2 text-xl font-bold text-white">
                    10,000%+ APY
                  </h4>
                  <p className="mt-1 text-sm text-white">Ref: {referralCode}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="flex items-center justify-center flex-1 py-2 text-sm text-white bg-green-700 hover:bg-green-600 rounded-l-md">
                  <Download size={14} className="mr-1" /> Download Square
                </button>
                <button className="px-3 py-2 text-white bg-indigo-700 hover:bg-indigo-600 rounded-r-md">
                  <Copy size={14} />
                </button>
              </div>
            </div>

            <div className="p-4 bg-indigo-800 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-3 rounded-md aspect-w-9 aspect-h-16 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="p-4 text-center">
                  <span className="text-5xl">🏆</span>
                  <h4 className="mt-2 text-xl font-bold text-white">
                    Trade Wars
                  </h4>
                  <p className="mt-1 text-sm text-white">
                    Code: {referralCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="flex items-center justify-center flex-1 py-2 text-sm text-white bg-green-700 hover:bg-green-600 rounded-l-md">
                  <Download size={14} className="mr-1" /> Download Story
                </button>
                <button className="px-3 py-2 text-white bg-indigo-700 hover:bg-indigo-600 rounded-r-md">
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-indigo-800 rounded-lg shadow-md">
            <h4 className="mb-4 text-xl font-bold text-blue-200">
              Customized Assets
            </h4>
            <p className="mb-4 text-blue-300">
              Need something special? Generate customized marketing materials
              with your branding and referral code.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-4 bg-indigo-900 rounded-md">
                <h5 className="mb-2 font-bold text-blue-200">Banner Size</h5>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2 text-sm text-blue-200 transition-colors bg-indigo-700 rounded-md hover:bg-indigo-600">
                    Twitter
                  </button>
                  <button className="p-2 text-sm text-blue-200 transition-colors bg-indigo-700 rounded-md hover:bg-indigo-600">
                    Discord
                  </button>
                  <button className="p-2 text-sm text-blue-200 transition-colors bg-indigo-700 rounded-md hover:bg-indigo-600">
                    Custom
                  </button>
                </div>
              </div>

              <div className="p-4 bg-indigo-900 rounded-md">
                <h5 className="mb-2 font-bold text-blue-200">Color Scheme</h5>
                <div className="grid grid-cols-4 gap-2">
                  <button className="h-8 transition-opacity rounded-md bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-80"></button>
                  <button className="h-8 transition-opacity rounded-md bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-80"></button>
                  <button className="h-8 transition-opacity rounded-md bg-gradient-to-r from-yellow-500 to-red-600 hover:opacity-80"></button>
                  <button className="h-8 transition-opacity rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-80"></button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="flex items-center px-4 py-2 text-white transition-colors bg-green-700 rounded-md hover:bg-green-600">
                <Rocket size={16} className="mr-2" />
                Generate Custom Assets
              </button>
            </div>
          </div>
        </div>

        {/* Ready-made Messages */}
        <div className="p-8 mb-12 bg-indigo-900 border-2 border-green-700 shadow-xl bg-opacity-90 rounded-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 mr-4 bg-green-900 rounded-full">
              <Mail className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-green-400">
              Ready-made Messages
            </h3>
          </div>
          <p className="mb-6 text-lg text-blue-200">
            Copy these messages to share with your friends and community
          </p>

          <div className="space-y-6">
            <div className="p-6 bg-indigo-800 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <svg
                  className="w-6 h-6 mr-2 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <h4 className="text-lg font-bold text-blue-200">Twitter/X</h4>
              </div>
              <div className="p-4 mb-3 text-sm text-blue-200 border border-indigo-700 rounded-md bg-indigo-950">
                🚀 I just discovered #TradeRealm - the DeFi protocol that turns
                yield farming into an epic strategy game! Earn 10,000%+ APY and
                build your trade empire. Join using my referral code:{" "}
                {referralCode} for 5% bonus $BARON tokens! #DeFi #GameFi
              </div>
              <button
                className={`${
                  copyMessageStates.twitter
                    ? "bg-green-600"
                    : "bg-green-700 hover:bg-green-600"
                } text-white py-2 px-4 rounded-md text-sm flex items-center transition-colors`}
                onClick={() => handleCopyMessage("twitter")}
              >
                {copyMessageStates.twitter ? (
                  <CheckCircle size={16} className="mr-1" />
                ) : (
                  <Copy size={16} className="mr-1" />
                )}
                {copyMessageStates.twitter ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>

            <div className="p-6 bg-indigo-800 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <svg
                  className="w-6 h-6 mr-2 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3864-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
                <h4 className="text-lg font-bold text-blue-200">
                  Discord/Telegram
                </h4>
              </div>
              <div className="p-4 mb-3 text-sm text-blue-200 border border-indigo-700 rounded-md bg-indigo-950">
                Hey everyone! 👋 I've been exploring this new DeFi protocol
                called TradeRealm that combines OlympusDAO mechanics with
                strategic gameplay. You stake tokens, control trade routes, set
                tariffs, and participate in weekly Trade Wars for massive
                rewards! 💰 If you want to check it out, use my referral code
                for a 5% bonus on your first stake: {referralCode}
                Website: https://realmfinance.io
              </div>
              <button
                className={`${
                  copyMessageStates.discord
                    ? "bg-green-600"
                    : "bg-green-700 hover:bg-green-600"
                } text-white py-2 px-4 rounded-md text-sm flex items-center transition-colors`}
                onClick={() => handleCopyMessage("discord")}
              >
                {copyMessageStates.discord ? (
                  <CheckCircle size={16} className="mr-1" />
                ) : (
                  <Copy size={16} className="mr-1" />
                )}
                {copyMessageStates.discord ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>

            <div className="p-6 bg-indigo-800 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <Mail className="w-6 h-6 mr-2 text-green-400" />
                <h4 className="text-lg font-bold text-blue-200">
                  Email Template
                </h4>
              </div>
              <div className="p-4 mb-3 overflow-y-auto text-sm text-blue-200 border border-indigo-700 rounded-md bg-indigo-950 max-h-60">
                Subject: Discovered an Exciting New DeFi Opportunity - Thought
                of You! Hi there, I hope this finds you well! I recently
                discovered a fascinating new DeFi protocol called TradeRealm
                that I thought might interest you. What makes it unique is how
                it transforms traditional yield farming into strategic gameplay.
                You can: • Stake $BARON tokens for auto-compounding rewards
                (initially 10,000%+ APY!) • Control trade routes to earn tariff
                revenue • Participate in weekly Trade Wars for massive rewards •
                Form alliances with other players If you decide to check it out,
                please use my referral code: {referralCode}
                This will give you a 5% bonus on your first stake, and I'll earn
                a small commission too! Website: https://realmfinance.io Let me
                know if you join - perhaps we could form a trade alliance! Best
                regards,
              </div>
              <button
                className={`${
                  copyMessageStates.email
                    ? "bg-green-600"
                    : "bg-green-700 hover:bg-green-600"
                } text-white py-2 px-4 rounded-md text-sm flex items-center transition-colors`}
                onClick={() => handleCopyMessage("email")}
              >
                {copyMessageStates.email ? (
                  <CheckCircle size={16} className="mr-1" />
                ) : (
                  <Copy size={16} className="mr-1" />
                )}
                {copyMessageStates.email ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="p-8 mb-12 bg-indigo-900 border-2 border-green-700 shadow-xl bg-opacity-90 rounded-xl">
          <div className="flex items-start gap-6">
            <div className="hidden p-4 bg-green-900 rounded-full md:flex">
              <Rocket className="text-green-400" size={48} />
            </div>
            <div>
              <h3 className="flex items-center mb-4 text-2xl font-bold text-green-400">
                <Rocket className="inline mr-2 md:hidden" size={24} />
                Coming Soon: Enhanced Referral Tools
              </h3>
              <p className="mb-6 text-blue-200">
                We're constantly improving our referral program. Here's what's
                on the horizon:
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-5 bg-indigo-800 rounded-lg shadow-md">
                  <h4 className="flex items-center mb-3 text-lg font-bold text-green-400">
                    <Globe size={18} className="mr-2" />
                    Custom Landing Pages
                  </h4>
                  <p className="mb-3 text-blue-300">
                    Create personalized referral landing pages with your
                    branding, trade statistics, and route preferences.
                  </p>
                  <div className="inline-block px-2 py-1 text-xs text-blue-300 bg-indigo-900 rounded-md">
                    Coming Q2 2025
                  </div>
                </div>

                <div className="p-5 bg-indigo-800 rounded-lg shadow-md">
                  <h4 className="flex items-center mb-3 text-lg font-bold text-green-400">
                    <Target size={18} className="mr-2" />
                    Advanced Analytics
                  </h4>
                  <p className="mb-3 text-blue-300">
                    Detailed conversion tracking, referral journey
                    visualization, and performance insights to optimize your
                    strategy.
                  </p>
                  <div className="inline-block px-2 py-1 text-xs text-blue-300 bg-indigo-900 rounded-md">
                    Coming Q3 2025
                  </div>
                </div>

                <div className="p-5 bg-indigo-800 rounded-lg shadow-md">
                  <h4 className="flex items-center mb-3 text-lg font-bold text-green-400">
                    <Users size={18} className="mr-2" />
                    Multi-level Referrals
                  </h4>
                  <p className="mb-3 text-blue-300">
                    Earn rewards not just from your direct referrals but from
                    their referrals too - build your network empire!
                  </p>
                  <div className="inline-block px-2 py-1 text-xs text-blue-300 bg-indigo-900 rounded-md">
                    Coming Q4 2025
                  </div>
                </div>

                <div className="p-5 bg-indigo-800 rounded-lg shadow-md">
                  <h4 className="flex items-center mb-3 text-lg font-bold text-green-400">
                    <Award size={18} className="mr-2" />
                    Referral NFTs
                  </h4>
                  <p className="mb-3 text-blue-300">
                    Special NFTs that grant unique trade route powers and
                    privileges based on your referral performance.
                  </p>
                  <div className="inline-block px-2 py-1 text-xs text-blue-300 bg-indigo-900 rounded-md">
                    Coming Q2 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-lg opacity-50 bg-gradient-to-r from-green-500 to-blue-500 blur"></div>
            <button className="relative px-10 py-5 text-xl font-bold text-white transition-transform transform rounded-lg shadow-lg bg-gradient-to-r from-green-600 to-blue-600 hover:scale-105">
              <span className="flex items-center justify-center">
                <Heart className="mr-3" size={24} />
                Share Your Referral Link Now
              </span>
            </button>
          </div>
          <p className="mt-4 text-lg text-blue-200">
            Every referral helps build the TradeRealm community and rewards you
            handsomely!
          </p>
          <p className="mt-2 font-bold text-green-400">
            Next milestone: 13 more referrals needed for Gold Tier
          </p>
        </div>
      </main>

      <footer className="py-6 bg-indigo-900 border-t-2 border-indigo-700">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-blue-200">
                &copy; 2025 TradeRealm Finance • All rights reserved
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-green-400"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-green-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-green-400"
              >
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Styling for animations and special effects */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            top: -10px;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            top: 100%;
            transform: translateX(calc(100px - 200px * var(--random, 0.5)))
              rotate(720deg);
          }
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
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti-fall 5s linear forwards;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .shadow-glow {
          box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
        }
      `}</style>
    </div>
  );
};

export default TradeRealmReferralPage;
