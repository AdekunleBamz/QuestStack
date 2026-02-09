/**
 * Wallet Connection Component using @stacks/connect
 */

import { useStacksConnect } from '@/hooks/useStacksConnect';
import type { UserData } from '@stacks/connect';

interface WalletConnectProps {
  onConnect?: (userData: UserData) => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const { connectWallet, isAuthenticated, userData } = useStacksConnect();

  if (isAuthenticated && userData) {
    return (
      <div className="wallet-connected">
        <span className="wallet-address">
          {userData.profile.stxAddress.mainnet.slice(0, 8)}...
          {userData.profile.stxAddress.mainnet.slice(-4)}
        </span>
      </div>
    );
  }

  return (
    <button 
      onClick={() => {
        connectWallet();
        if (userData && onConnect) {
          onConnect(userData);
        }
      }} 
      className="connect-wallet-btn"
    >
      Connect Wallet
    </button>
  );
}

