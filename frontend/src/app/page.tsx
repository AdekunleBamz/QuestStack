'use client';

/**
 * QuestStack Home Page
 * Main landing page for the decentralized Quest & Reward Platform
 */

import { Connect } from '@stacks/connect';
import { WalletConnect } from '@/components/WalletConnect';
import { QuestCard } from '@/components/QuestCard';
import { useStacksConnect } from '@/hooks/useStacksConnect';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Quest {
  id: number;
  title: string;
  description: string;
  rewardAmount: number;
  status: 'active' | 'completed' | 'cancelled';
}

export default function Home() {
  const { isAuthenticated, userData } = useStacksConnect();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: 'QuestStack',
          icon: '/logo.png',
        },
        redirectTo: '/',
        onFinish: () => {
          console.log('User finished authentication');
        },
      }}
    >
      <main className="queststack-main">
        <header className="queststack-header">
          <div className="header-content">
            <h1 className="logo">QuestStack 🎯</h1>
            <nav className="header-nav">
              <Link href="/quests">Quests</Link>
              <Link href="/staking">Staking</Link>
              <Link href="/governance">Governance</Link>
            </nav>
            <WalletConnect />
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-content">
            <h2>Decentralized Quest & Reward Platform on Stacks</h2>
            <p>Create quests, earn rewards, stake tokens, and participate in governance</p>
            {isAuthenticated ? (
              <div className="user-stats">
                <p>Welcome back! 🎉</p>
              </div>
            ) : (
              <p className="cta-text">Connect your wallet to get started</p>
            )}
          </div>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <h3>🎮 Quests</h3>
            <p>Create and complete on-chain quests to earn rewards</p>
          </div>
          <div className="feature-card">
            <h3>🪙 Rewards</h3>
            <p>Earn tokens for completing quests and staking</p>
          </div>
          <div className="feature-card">
            <h3>💰 Staking</h3>
            <p>Stake tokens to unlock premium quests</p>
          </div>
          <div className="feature-card">
            <h3>🗳️ Governance</h3>
            <p>Vote on platform proposals and parameters</p>
          </div>
        </section>

        <section className="quests-section">
          <h2>Featured Quests</h2>
          <div className="quests-container">
            {loading ? (
              <p>Loading quests...</p>
            ) : quests.length > 0 ? (
              quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  questId={quest.id}
                  title={quest.title}
                  description={quest.description}
                  rewardAmount={quest.rewardAmount}
                  status={quest.status}
                />
              ))
            ) : (
              <div className="no-quests">
                <p>No active quests at the moment</p>
                <p>Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        <footer className="queststack-footer">
          <p>Built with Clarity 4 • Hiro Chainhooks • Stacks</p>
        </footer>
      </main>
    </Connect>
  );
}
