/**
 * Governance Page
 * Page for governance proposals
 * 
 * @page
 */

'use client';

import { GovernancePanel } from '@/components/GovernancePanel';
import { useGovernance } from '@/hooks/useGovernance';
import { useStacksConnect } from '@/hooks/useStacksConnect';

export default function GovernancePage() {
  const { isAuthenticated } = useStacksConnect();
  const { proposals, loadProposals } = useGovernance();

  return (
    <main className="governance-page">
      <h1>Governance</h1>
      
      {!isAuthenticated ? (
        <p>Connect your wallet to participate in governance</p>
      ) : (
        <GovernancePanel
          proposals={proposals}
          onCreateProposal={() => console.log('Create proposal')}
          onVote={(id, support) => console.log('Vote:', id, support)}
        />
      )}
    </main>
  );
}
