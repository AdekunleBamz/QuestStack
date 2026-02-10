/**
 * Governance Service
 * Business logic for governance operations
 * 
 * @module services/governanceService
 */

export interface ProposalInfo {
  id: number;
  proposer: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected';
  createdAt: number;
}

export interface GovernanceResult {
  success: boolean;
  proposalId?: number;
  error?: string;
}

export class GovernanceService {
  private proposals: Map<number, ProposalInfo> = new Map();
  private counter = 0;

  async createProposal(proposer: string, title: string, description: string): Promise<GovernanceResult> {
    try {
      this.counter++;
      this.proposals.set(this.counter, {
        id: this.counter,
        proposer,
        title,
        description,
        votesFor: 0,
        votesAgainst: 0,
        status: 'active',
        createdAt: Date.now(),
      });
      return { success: true, proposalId: this.counter };
    } catch (error) {
      return { success: false, error: 'Failed to create proposal' };
    }
  }

  async vote(proposalId: number, support: boolean): Promise<GovernanceResult> {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      return { success: false, error: 'Proposal not found' };
    }
    
    if (support) {
      proposal.votesFor++;
    } else {
      proposal.votesAgainst++;
    }
    
    return { success: true };
  }

  async getProposal(proposalId: number): Promise<ProposalInfo | null> {
    return this.proposals.get(proposalId) || null;
  }

  async getAllProposals(): Promise<ProposalInfo[]> {
    return Array.from(this.proposals.values());
  }
}

export const governanceService = new GovernanceService();
