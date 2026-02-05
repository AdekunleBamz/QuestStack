import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuestStack - Decentralized Quest Platform on Stacks',
  description: 'Create, complete, and earn rewards from on-chain quests. Built on Stacks blockchain with smart contracts.',
  keywords: ['quests', 'blockchain', 'stacks', 'rewards', 'web3', 'defi', 'dao', 'staking'],
  authors: [{ name: 'QuestStack Team' }],
  openGraph: {
    title: 'QuestStack - Decentralized Quest Platform',
    description: 'Create, complete, and earn rewards from on-chain quests',
    type: 'website',
    siteName: 'QuestStack',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuestStack - Decentralized Quest Platform',
    description: 'Create, complete, and earn rewards from on-chain quests',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

