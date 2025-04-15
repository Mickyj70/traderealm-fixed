// Contract addresses (replace with actual addresses)
export const CONTRACTS = {
  BARON: '0x...',  // BARON token address
  STAKING: '0x...',  // Staking contract
  XBARRON: '0x...',  // xBARRON contract
  TREASURY: '0x...',  // Treasury
  TRADE_ROUTES: '0x...',  // Trade routes registry
  WAR_ROOM: '0x...',  // War room contract
  BONDING: '0x...',  // Bonding contract
};

// ERC20 ABI (minimal)
export const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function allowance(address,address) view returns (uint256)',
  'function approve(address,uint256) returns (bool)',
  'function decimals() view returns (uint8)',
];

// BARON Token ABI
export const BARON_ABI = [
  ...ERC20_ABI,
  'function totalSupply() view returns (uint256)',
  'function transfer(address,uint256) returns (bool)',
  'function transferFrom(address,address,uint256) returns (bool)',
];

// Staking Contract ABI
export const STAKING_ABI = [
  'function stake(uint256) returns (bool)',
  'function unstake(uint256) returns (bool)',
  'function balanceOf(address) view returns (uint256)',
  'function earned(address) view returns (uint256)',
  'function rebase() returns (bool)',
  'function getStakingInfo() view returns (uint256,uint256,uint256)',
];

// xBARRON Contract ABI
export const XBARRON_ABI = [
  'function lock(uint256,uint256) returns (bool)',
  'function unlock(uint256) returns (bool)',
  'function lockedAmount(address) view returns (uint256)',
  'function userPower(address) view returns (uint256)',
  'function totalPower() view returns (uint256)',
  'function getLockInfo(address) view returns (uint256,uint256,uint256)',
];

// Trade Routes Contract ABI
export const TRADE_ROUTES_ABI = [
  'function getRouteCount() view returns (uint256)',
  'function getRouteIdByIndex(uint256) view returns (uint256)',
  'function getRouteDetails(uint256) view returns (string,string,uint256,uint256,uint256,uint256,uint256,uint256,uint256)',
  'function getControllerCount(uint256) view returns (uint256)',
  'function getControllerByIndex(uint256,uint256) view returns (address,uint256,uint256,uint256,uint256)',
  'function deployStake(uint256,uint256) returns (bool)',
  'function withdrawStake(uint256,uint256) returns (bool)',
  'function proposeTariff(uint256,uint256) returns (bool)',
];

// War Room Contract ABI
export const WAR_ROOM_ABI = [
  'function getWarStatus() view returns (uint8,uint256,uint256)',
  'function getTerritoryCount() view returns (uint256)',
  'function getTerritoryDetails(uint256) view returns (string,address,uint256,uint256,uint256)',
  'function deployResources(uint256,uint256) returns (bool)',
  'function attack(uint256,uint256) returns (bool)',
  'function defend(uint256,uint256) returns (bool)',
  'function formAlliance(address) returns (bool)',
  'function claimRewards() returns (bool)',
];

// Bonding Contract ABI
export const BONDING_ABI = [
  'function getLicenseCount() view returns (uint256)',
  'function getLicenseDetails(uint256) view returns (string,string,uint256,uint256,uint256)',
  'function deposit(uint256,uint256,address) returns (bool)',
  'function claim(uint256) returns (bool)',
  'function pendingRewards(uint256,address) view returns (uint256)',
]; 