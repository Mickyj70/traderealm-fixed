/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../../contexts/WalletContext";
import { useNotification } from "../../contexts/NotificationContext";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import Logo from "../../assets/updated-logo.svg"; // Adjust the path to your logo image
import Navbar from "./Navbar";

// const cartoonTitle = `cartoon-title cartoon-outline cartoon-bounce`;

const Layout = ({ children }) => {
  const location = useLocation();
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const { showNotification } = useNotification();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/council", label: "Baron's Council", icon: "👑" },
    { path: "/map", label: "Global Trade Map", icon: "🗺️" },
    { path: "/merchant", label: "Merchant's Office", icon: "🏢" },
    { path: "/licensing", label: "Import Licensing", icon: "📜" },
    { path: "/ledger", label: "Baron's Ledger", icon: "📊" },
    { path: "/assembly", label: "Grand Assembly", icon: "🏛️" },
  ];

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      showNotification("Wallet connected successfully", "success");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showNotification("Failed to connect wallet", "error");
    }
  };

  const handleWalletDisconnect = () => {
    disconnectWallet();
    showNotification("Wallet disconnected", "info");
  };

  // Sidebar animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  // Determine if sidebar should be visible
  const isSidebarVisible = isLargeScreen || isNavOpen;

  // Pages that should NOT show sidebar or header
  const hideNavAndHeaderRoutes = [
    "/simple-war",
    "/popups",
    "/presale",
    "/presale/tradewars",
    "/presale/alliances",
    "/presale/licenses",
    "/presale/tradewars/warroom",
    "/referral",
    "/dapp",
    "/support",
  ];
  const shouldHideNavAndHeader = hideNavAndHeaderRoutes.includes(
    location.pathname
  );

  return (
    <div className="min-h-screen overflow-x-hidden text-white bg-deepViolet">
      {/* Mobile Navigation Toggle - Only show on small screens and not on excluded pages or landing page */}
      {!isLargeScreen &&
        location.pathname !== "/" &&
        !shouldHideNavAndHeader && (
          <button
            className="fixed z-50 p-2 rounded-lg top-4 left-4 bg-turquoise/10 hover:bg-turquoise/20"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

      {/* Navigation Sidebar */}
      {location.pathname !== "/" && !shouldHideNavAndHeader && (
        <motion.nav
          className="fixed top-0 left-0 z-40 w-64 h-full overflow-y-auto border-r bg-deepViolet/95 border-lavender/20"
          initial={isLargeScreen ? "open" : "closed"}
          animate={isSidebarVisible ? "open" : "closed"}
          variants={sidebarVariants}
        >
          <div className="p-6">
            <Link to="/" className="flex items-center mb-8 space-x-2">
              <span className="text-2xl">
                <img src={Logo} alt="image" height={50} width={50} />
              </span>
              <span className="text-2xl font-bangers">RealMfi </span>
            </Link>

            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-turquoise/20 text-turquoise"
                      : "hover:bg-lavender/10"
                  }`}
                  onClick={() => !isLargeScreen && setIsNavOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.nav>
      )}

      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {!isLargeScreen &&
        isNavOpen &&
        location.pathname !== "/" &&
        !shouldHideNavAndHeader && (
          <div
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setIsNavOpen(false)}
          />
        )}

      {/* Main Content */}
      <div
        className={`${
          isLargeScreen && location.pathname !== "/" && !shouldHideNavAndHeader
            ? "lg:pl-64"
            : ""
        } transition-all duration-300 w-full`}
      >
        {/* Header */}
        {!shouldHideNavAndHeader && <Navbar />}

        {/* Page Content */}
        <main className="w-full py-2 mx-auto">
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
