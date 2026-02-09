/**
 * QuestStack - Root Layout
 * Main application layout with metadata configuration
 * 
 * @layout
 * @description Provides root layout with metadata for SEO
 */

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuestStack - Decentralized Quest Platform',
  description: 'Create, complete, and earn rewards from on-chain quests',
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

