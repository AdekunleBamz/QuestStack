/**
 * Transaction Button Component using @stacks/transactions
 * Reusable component for executing transactions
 */

import { useConnect } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';
import { useState } from 'react';

interface TransactionButtonProps {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  label: string;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

export function TransactionButton({
  contractAddress,
  contractName,
  functionName,
  functionArgs,
  label,
  onSuccess,
  onError,
}: TransactionButtonProps) {
  const { doContractCall } = useConnect();
  const [loading, setLoading] = useState(false);
  const network = new StacksMainnet();

  const handleClick = async () => {
    setLoading(true);
    try {
      await doContractCall({
        network,
        contractAddress,
        contractName,
        functionName,
        functionArgs,
        onFinish: (data) => {
          setLoading(false);
          if (onSuccess) onSuccess(data);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (error: any) {
      setLoading(false);
      if (onError) onError(error);
    }
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={loading} 
      className={`transaction-btn ${loading ? 'transaction-loading' : ''}`}
    >
      {loading ? 'Processing...' : label}
    </button>
  );
}

