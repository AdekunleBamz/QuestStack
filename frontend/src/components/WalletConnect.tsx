/**
 * Wallet Connection Component using @stacks/connect
 */

import { useStacksConnect } from '@/hooks/useStacksConnect';

export function WalletConnect() {
  const { connectWallet, isAuthenticated, userData } = useStacksConnect();

  if (isAuthenticated && userData) {
    return (
      <div className="wallet-connected">
        <p>Connected: {userData.profile.stxAddress.mainnet}</p>
      </div>
    );
  }

  return (
    <button onClick={connectWallet} className="connect-wallet-btn">
      Connect Wallet
    </button>
  );
}

