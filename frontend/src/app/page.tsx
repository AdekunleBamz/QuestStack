'use client';

import { Connect } from '@stacks/connect';
import { WalletConnect } from '@/components/WalletConnect';
import { QuestCard } from '@/components/QuestCard';

export default function Home() {
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
      <div className="app-wrapper">
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo-section">
                <h1 className="logo">QuestStack 🎯</h1>
              </div>
              <nav className="nav">
                <WalletConnect />
              </nav>
            </div>
          </div>
        </header>
        
        <main className="main-content">
          <div className="container">
            <section className="hero">
              <h2 className="hero-title">Decentralized Quest & Reward Platform</h2>
              <p className="hero-subtitle">Complete quests, earn rewards, and stake tokens on Stacks</p>
            </section>
            
            <section className="quests-section">
              <h3 className="section-title">Available Quests</h3>
              <div className="quests-container">
                {/* Quest cards will be rendered here */}
              </div>
            </section>
          </div>
        </main>
      </div>
    </Connect>
  );
}

