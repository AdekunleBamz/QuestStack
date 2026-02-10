/**
 * Staking Page
 * Page for staking operations
 * 
 * @page
 */

'use client';

import { StakingPanel } from '@/components/StakingPanel';
import { useStaking } from '@/hooks/useStaking';
import { useStacksConnect } from '@/hooks/useStacksConnect';

export default function StakingPage() {
  const { isAuthenticated, userData } = useStacksConnect();
  const { stakeInfo, loadStakeInfo } = useStaking();

  return (
    <main className="staking-page">
      <h1>Staking</h1>
      
      {!isAuthenticated ? (
        <p>Connect your wallet to view staking</p>
      ) : (
        <>
          <StakingPanel
            stakedAmount={stakeInfo?.stakedAmount || 0}
            hasPremium={stakeInfo?.hasPremium || false}
            pendingRewards={stakeInfo?.pendingRewards || 0}
          />
        </>
      )}
    </main>
  );
}
