import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACTS } from '../constants/contracts';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState({
    baron: '0',
    staked: '0',
    locked: '0',
    xBarronPower: '0',
    rewards: '0'
  });
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);

  // Initialize provider
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            handleConnect(accounts[0]);
          }
        })
        .catch(console.error);

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      handleConnect(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('No Ethereum provider found. Install MetaMask or another wallet.');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      handleConnect(accounts[0]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleConnect = async (account) => {
    setAccount(account);
    setIsConnected(true);
    await updateBalances(account);
  };

  const handleDisconnect = () => {
    setAccount(null);
    setIsConnected(false);
    setBalance({
      baron: '0',
      staked: '0',
      locked: '0',
      xBarronPower: '0',
      rewards: '0'
    });
  };

  const updateBalances = async (account) => {
    if (!provider || !account) return;

    try {
      const baronContract = new ethers.Contract(
        CONTRACTS.BARON,
        CONTRACTS.BARON_ABI,
        provider
      );

      const stakingContract = new ethers.Contract(
        CONTRACTS.STAKING,
        CONTRACTS.STAKING_ABI,
        provider
      );

      const xBarronContract = new ethers.Contract(
        CONTRACTS.XBARRON,
        CONTRACTS.XBARRON_ABI,
        provider
      );

      const [wallet, staked, locked, xBarronPower, rewards] = await Promise.all([
        baronContract.balanceOf(account),
        stakingContract.balanceOf(account),
        xBarronContract.lockedAmount(account),
        xBarronContract.userPower(account),
        stakingContract.earned(account)
      ]);

      setBalance({
        baron: ethers.utils.formatUnits(wallet, 9),
        staked: ethers.utils.formatUnits(staked, 9),
        locked: ethers.utils.formatUnits(locked, 9),
        xBarronPower: ethers.utils.formatUnits(xBarronPower, 9),
        rewards: ethers.utils.formatUnits(rewards, 9)
      });
    } catch (error) {
      console.error('Error updating balances:', error);
      setError(error.message);
    }
  };

  const value = {
    account,
    isConnected,
    balance,
    provider,
    error,
    connectWallet,
    disconnectWallet: handleDisconnect,
    updateBalances
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext; 