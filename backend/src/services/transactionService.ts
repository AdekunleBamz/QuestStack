/**
 * Transaction Service using @stacks/transactions
 * Backend service for transaction validation and monitoring
 * Enhanced with retry logic and error handling
 */

import {
  broadcastTransaction,
  getTransactionStatus,
  StacksMainnet,
  TransactionStatus,
} from '@stacks/transactions';

const network = new StacksMainnet();

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // 3 seconds
const CONFIRMATION_TIMEOUT = 120000; // 2 minutes

interface BroadcastResult {
  txId: string;
  success: boolean;
  error?: string;
}

/**
 * Broadcast a transaction to the network with retry
 */
export async function broadcastTx(
  signedTx: Buffer,
  retries: number = MAX_RETRIES
): Promise<BroadcastResult> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await broadcastTransaction(signedTx, network);
      return {
        txId: result.txid(),
        success: true,
      };
    } catch (error: any) {
      if (i < retries - 1) {
        console.log(`Retrying broadcast in ${RETRY_DELAY}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        return {
          txId: '',
          success: false,
          error: error.message,
        };
      }
    }
  }
  return { txId: '', success: false, error: 'Unknown error' };
}

/**
 * Monitor transaction status
 */
export async function monitorTransaction(
  txId: string,
  timeoutMs: number = CONFIRMATION_TIMEOUT
): Promise<TransactionStatus | null> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeoutMs) {
    try {
      const status = await getTransactionStatus(txId, network);
      
      if (status.is_unanchored === false && status.tx_status === 'success') {
        return status;
      }
      
      if (
        status.tx_status === 'abort_by_response' ||
        status.tx_status === 'abort_by_post_condition'
      ) {
        console.error(`Transaction failed: ${status.tx_status}`);
        return status;
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error: any) {
      console.error(`Error monitoring transaction: ${error.message}`);
    }
  }
  
  console.error('Transaction confirmation timeout');
  return null;
}

/**
 * Wait for transaction confirmation with full details
 */
export async function waitForConfirmation(
  txId: string,
  maxAttempts: number = 30,
  delayMs: number = 2000
): Promise<{
  success: boolean;
  status: TransactionStatus | null;
  error?: string;
}> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const status = await getTransactionStatus(txId, network);
      
      if (status.is_unanchored === false && status.tx_status === 'success') {
        return { success: true, status };
      }
      
      if (status.tx_status === 'abort_by_response' || status.tx_status === 'abort_by_post_condition') {
        return { success: false, status, error: status.tx_status };
      }
      
      await new Promise(resolve => setTimeout(resolve, delayMs));
    } catch (error: any) {
      return { success: false, status: null, error: error.message };
    }
  }
  
  return { success: false, status: null, error: 'Confirmation timeout' };
}

/**
 * Get transaction fee estimate
 */
export async function getFeeEstimate(): Promise<number> {
  // In a real implementation, this would call the Stacks API
  // to get current gas price estimates
  return 2000; // Default fee in microSTX
}

/**
 * Validate transaction before broadcasting
 */
export function validateTransaction(signedTx: Buffer): {
  valid: boolean;
  error?: string;
} {
  if (!signedTx || signedTx.length === 0) {
    return { valid: false, error: 'Empty transaction' };
  }
  
  // Check minimum transaction size
  if (signedTx.length < 100) {
    return { valid: false, error: 'Transaction too small' };
  }
  
  return { valid: true };
}
