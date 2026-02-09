/**
 * Wallet Connection Component using @stacks/connect
 * Enhanced with better error handling and UI feedback
 */

import { useStacksConnect } from '@/hooks/useStacksConnect';
import { useState, useEffect } from 'react';

type WalletState = 'idle' | 'connecting' | 'connected' | 'error';

export function WalletConnect() {
  const { connectWallet, isAuthenticated, userData, disconnectWallet } = useStacksConnect();
  const [walletState, setWalletState] = useState<WalletState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConnect = async () => {
    setWalletState('connecting');
    setErrorMessage(null);
    try {
      await connectWallet();
      setWalletState('connected');
    } catch (error: any) {
      setWalletState('error');
      setErrorMessage(error.message || 'Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    disconnectWallet?.();
    setWalletState('idle');
    setErrorMessage(null);
  };

  useEffect(() => {
    if (isAuthenticated && userData) {
      setWalletState('connected');
    } else {
      setWalletState('idle');
    }
  }, [isAuthenticated, userData]);

  if (walletState === 'connected' && userData) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <span className="wallet-label">Connected:</span>
          <span className="wallet-address">
            {userData.profile.stxAddress.mainnet.slice(0, 8)}...{userData.profile.stxAddress.mainnet.slice(-4)}
          </span>
        </div>
        <button onClick={handleDisconnect} className="disconnect-wallet-btn">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-connect-container">
      <button 
        onClick={handleConnect} 
        className="connect-wallet-btn"
        disabled={walletState === 'connecting'}
      >
        {walletState === 'connecting' ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {errorMessage && (
        <div className="wallet-error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
