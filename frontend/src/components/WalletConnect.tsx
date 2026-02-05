/**
 * Wallet Connection Component using @stacks/connect
 */

import { useStacksConnect } from '@/hooks/useStacksConnect';

export function WalletConnect() {
  const { connectWallet, isAuthenticated, userData } = useStacksConnect();

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isAuthenticated && userData) {
    return (
      <div className="wallet-connected">
        <div className="wallet-status">
          <span className="status-dot"></span>
          <span className="wallet-address">
            {truncateAddress(userData.profile.stxAddress.mainnet)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <button onClick={connectWallet} className="connect-wallet-btn">
      <span className="wallet-icon">🔗</span>
      Connect Wallet
    </button>
  );
}

