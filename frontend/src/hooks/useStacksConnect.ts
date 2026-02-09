/**
 * Custom hook for @stacks/connect integration
 * Handles wallet connection, authentication, and network management
 * Enhanced with TypeScript types and error handling
 */

import { useConnect } from '@stacks/connect';
import { StacksMainnet, StacksTestnet, Network } from '@stacks/network';
import { useState, useCallback, useEffect } from 'react';

type NetworkType = 'mainnet' | 'testnet';

interface UserData {
  profile: {
    stxAddress: {
      mainnet: string;
      testnet: string;
    };
    apps?: Array<{
      origin: string;
      lastLoginAt: string;
    }>;
  };
  decryptedPrivateKey?: string;
}

interface UseStacksConnectReturn {
  connectWallet: () => Promise<void>;
  authenticate: () => Promise<void>;
  disconnectWallet: () => void;
  isAuthenticated: boolean;
  userData: UserData | null;
  network: Network;
  networkType: NetworkType;
  switchNetwork: (type: NetworkType) => void;
}

export function useStacksConnect(): UseStacksConnectReturn {
  const { doOpenAuth, doAuth, isSignedIn, userSession } = useConnect();
  const [networkType, setNetworkType] = useState<NetworkType>('mainnet');
  const [network, setNetwork] = useState<Network>(new StacksMainnet());

  // Update network when type changes
  useEffect(() => {
    setNetwork(networkType === 'mainnet' ? new StacksMainnet() : new StacksTestnet());
  }, [networkType]);

  const connectWallet = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      doOpenAuth({
        network,
        appDetails: {
          name: 'QuestStack',
          icon: '/logo.png',
        },
        onFinish: (data) => {
          console.log('Wallet connected successfully:', data);
          resolve();
        },
        onCancel: () => {
          console.log('Wallet connection cancelled');
          reject(new Error('User cancelled wallet connection'));
        },
      });
    });
  }, [doOpenAuth, network]);

  const authenticate = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      doAuth({
        network,
        appDetails: {
          name: 'QuestStack',
          icon: '/logo.png',
        },
        onFinish: (data) => {
          console.log('Authentication successful:', data);
          resolve();
        },
        onCancel: () => {
          console.log('Authentication cancelled');
          reject(new Error('User cancelled authentication'));
        },
      });
    });
  }, [doAuth, network]);

  const disconnectWallet = useCallback(() => {
    if (userSession) {
      userSession.signUserOut();
    }
  }, [userSession]);

  const switchNetwork = useCallback((type: NetworkType) => {
    setNetworkType(type);
  }, []);

  return {
    connectWallet,
    authenticate,
    disconnectWallet,
    isAuthenticated: isSignedIn(),
    userData: (userSession?.loadUserData() as UserData) || null,
    network,
    networkType,
    switchNetwork,
  };
}

// Helper hook to get Stacks network instance
export function useStacksNetwork() {
  const { network, networkType, switchNetwork } = useStacksConnect();
  return { network, networkType, switchNetwork };
}
