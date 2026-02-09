/**
 * Transaction Button Component using @stacks/transactions
 * Reusable component for executing transactions with enhanced UX
 */

import { useConnect } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';
import { useState, useCallback } from 'react';

interface TransactionButtonProps {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs?: (uintCV | stringAsciiCV | standardPrincipalCV | listCV | someCV | noneCV)[];
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
  loadingText?: string;
}

interface TransactionState {
  status: 'idle' | 'loading' | 'success' | 'error';
  txId?: string;
  errorMessage?: string;
}

export function TransactionButton({
  contractAddress,
  contractName,
  functionName,
  functionArgs = [],
  label,
  variant = 'primary',
  size = 'medium',
  onSuccess,
  onError,
  disabled = false,
  loadingText = 'Processing...',
}: TransactionButtonProps) {
  const { doContractCall } = useConnect();
  const [txState, setTxState] = useState<TransactionState>({ status: 'idle' });
  const network = new StacksMainnet();

  const handleClick = useCallback(async () => {
    setTxState({ status: 'loading', errorMessage: undefined });
    
    try {
      await doContractCall({
        network,
        contractAddress,
        contractName,
        functionName,
        functionArgs,
        onFinish: (data) => {
          setTxState({ status: 'success', txId: data.txId });
          if (onSuccess) onSuccess(data);
        },
        onCancel: () => {
          setTxState({ status: 'error', errorMessage: 'Transaction was cancelled' });
        },
      });
    } catch (error: any) {
      setTxState({ status: 'error', errorMessage: error.message || 'Transaction failed' });
      if (onError) onError(error);
    }
  }, [doContractCall, network, contractAddress, contractName, functionName, functionArgs, onSuccess, onError]);

  const getButtonClass = () => {
    const baseClass = 'transaction-btn';
    return `${baseClass} ${baseClass}--${variant} ${baseClass}--${size}`;
  };

  return (
    <div className="transaction-button-container">
      <button
        onClick={handleClick}
        disabled={disabled || txState.status === 'loading'}
        className={getButtonClass()}
      >
        {txState.status === 'loading' ? loadingText : label}
      </button>
      
      {txState.status === 'success' && (
        <div className="transaction-success" role="alert">
          ✅ Transaction successful! 
          {txState.txId && (
            <a 
              href={`https://explorer.hiro.so/txid/${txState.txId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on explorer
            </a>
          )}
        </div>
      )}
      
      {txState.status === 'error' && (
        <div className="transaction-error" role="alert">
          ❌ {txState.errorMessage}
        </div>
      )}
    </div>
  );
}
