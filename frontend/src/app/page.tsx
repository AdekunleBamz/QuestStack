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
      <main>
        <h1>QuestStack 🎯</h1>
        <p>Decentralized Quest & Reward Platform on Stacks</p>
        <WalletConnect />
        <div className="quests-container">
          {/* Quest cards will be rendered here */}
        </div>
      </main>
    </Connect>
  );
}

