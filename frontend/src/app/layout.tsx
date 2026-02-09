/**
 * QuestStack Root Layout
 * Global layout with metadata and styling
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuestStack - Decentralized Quest & Reward Platform',
  description: 'A decentralized Quest & Reward Platform built on Stacks blockchain using Clarity 4 smart contracts',
  keywords: ['stacks', 'blockchain', 'clarity', 'quests', 'rewards', 'defi'],
  authors: [{ name: 'QuestStack' }],
  openGraph: {
    title: 'QuestStack - Decentralized Quest & Reward Platform',
    description: 'Build and complete quests on the Stacks blockchain',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
