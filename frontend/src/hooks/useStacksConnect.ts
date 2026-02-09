/**
 * Custom hook for @stacks/connect integration
 * Handles wallet connection and authentication
 * 
 * @module hooks/useStacksConnect
 * @description Provides wallet connection functionality using @stacks/connect
 * 
 * @example
 * import { useStacksConnect } from '@/hooks/useStacksConnect';
 * 
 * function MyComponent() {
 *   const { connectWallet, isAuthenticated, userData } = useStacksConnect();
 *   
 *   if (isAuthenticated) {
 *     return <p>Connected: {userData.profile.stxAddress.mainnet}</p>;
 *   }
 *   
 *   return <button onClick={connectWallet}>Connect Wallet</button>;
 * }
 */

import { useConnect } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';
import { useState, useCallback } from 'react';

export function useStacksConnect() {
  const { doOpenAuth, doAuth, isAuthenticated, userData } = useConnect();
  const [network] = useState(new StacksMainnet());

  const connectWallet = useCallback(() => {
    doOpenAuth({
      network,
      appDetails: {
        name: 'QuestStack',
        icon: '/logo.png',
      },
      onFinish: (data) => {
        console.log('Wallet connected:', data);
      },
      onCancel: () => {
        console.log('Connection cancelled');
      },
    });
  }, [doOpenAuth, network]);

  const authenticate = useCallback(() => {
    doAuth({
      network,
      appDetails: {
        name: 'QuestStack',
        icon: '/logo.png',
      },
      onFinish: (data) => {
        console.log('Authenticated:', data);
      },
      onCancel: () => {
        console.log('Authentication cancelled');
      },
    });
  }, [doAuth, network]);

  return {
    connectWallet,
    authenticate,
    isAuthenticated,
    userData,
    network,
  };
}

