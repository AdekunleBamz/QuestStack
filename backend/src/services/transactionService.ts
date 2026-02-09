/**
 * Transaction Service using @stacks/transactions
 * Backend service for transaction validation and monitoring
 * 
 * @example
 * import { broadcastTx, waitForConfirmation } from '@/services/transactionService';
 * 
 * const result = await broadcastTx(signedTransaction);
 * const status = await waitForConfirmation(txId);
 */

import {
  broadcastTransaction,
  getTransactionStatus,
  StacksMainnet,
  TransactionStatus,
} from '@stacks/transactions';

const network = new StacksMainnet();

/**
 * Broadcast a transaction to the network
 */
export async function broadcastTx(signedTx: Buffer) {
  try {
    const result = await broadcastTransaction(signedTx, network);
    return result;
  } catch (error: any) {
    throw new Error(`Failed to broadcast transaction: ${error.message}`);
  }
}

/**
 * Monitor transaction status
 */
export async function monitorTransaction(txId: string): Promise<TransactionStatus> {
  try {
    const status = await getTransactionStatus(txId, network);
    return status;
  } catch (error: any) {
    throw new Error(`Failed to get transaction status: ${error.message}`);
  }
}

/**
 * Wait for transaction confirmation
 */
export async function waitForConfirmation(
  txId: string,
  maxAttempts: number = 30,
  delayMs: number = 2000
): Promise<TransactionStatus> {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await monitorTransaction(txId);
    
    if (status.is_unanchored === false && status.tx_status === 'success') {
      return status;
    }
    
    if (status.tx_status === 'abort_by_response' || status.tx_status === 'abort_by_post_condition') {
      throw new Error(`Transaction failed: ${status.tx_status}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  
  throw new Error('Transaction confirmation timeout');
}

