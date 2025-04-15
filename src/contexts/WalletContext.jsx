import React, { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(0);

  // Mock wallet connection for demonstration
  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Simulate wallet connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock wallet address
      const mockWallet = "0x1234...5678";
      setWallet(mockWallet);
      localStorage.setItem("wallet", mockWallet);

      setBalance(1000);
    } catch (err) {
      setError("Failed to connect wallet");
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setBalance(0);
    localStorage.removeItem("wallet");
  };

  // Check for existing wallet connection on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet");
    if (savedWallet) {
      setWallet(savedWallet);
      setBalance;
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        balance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
