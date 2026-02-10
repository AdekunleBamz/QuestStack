/**
 * Header Component
 * Main navigation header
 * 
 * @component
 */

'use client';

interface HeaderProps {
  connected?: boolean;
  address?: string;
  onConnect?: () => void;
}

export function Header({ connected, address, onConnect }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="logo">
        <h1>QuestStack</h1>
      </div>
      
      <nav>
        <a href="/">Quests</a>
        <a href="/staking">Staking</a>
        <a href="/governance">Governance</a>
      </nav>
      
      <div className="wallet-section">
        {connected ? (
          <span className="address">{address}</span>
        ) : (
          <button onClick={onConnect}>Connect Wallet</button>
        )}
      </div>
    </header>
  );
}
