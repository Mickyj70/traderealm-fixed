/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useWallet } from "../../contextsWalletContext";
import Button from "../common/Button";
import Logo from "../../assets/updated-logo.svg"; // Adjust the path to your logo image

const cartoonBg = `cartoon-bg`;
const cartoonCard = `cartoon-card cartoon-shadow`;
const cartoonTitle = `cartoon-title cartoon-outline cartoon-bounce`;
const cartoonSubtitle = `cartoon-subtitle`;
const cartoonBtn = `cartoon-btn cartoon-bounce`;
const cartoonTypewriter = `cartoon-typewriter`;

const Navbar = () => {
  const { account, isConnected, connectWallet, disconnectWallet } = useWallet();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Barons Council" },
    { path: "/trade", label: "Trade Administration" },
    { path: "/imperial", label: "Imperial Chamber" },
    { path: "/map", label: "Global Trade Map" },
    { path: "/merchants", label: "Merchants Office" },
    { path: "/war", label: "War Room" },
    { path: "/embassy", label: "Embassy Quarter" },
  ];

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b bg-richBlack/95 backdrop-blur-sm border-royalBlue/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              className="text-2xl font-bold text-turquoise"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">
                <img src={Logo} alt="image" height={50} width={50} />
              </span>
              <span className="text-2xl font-bangers">RealMfi </span>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="items-center hidden space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-turquoise"
                    : "text-lavender hover:text-turquoise"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center">
            {isConnected ? (
              <div className="flex items-center space-x-8">
                <div className="text-sm text-lavender">
                  {formatAddress(account)}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={disconnectWallet}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm" onClick={connectWallet}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
