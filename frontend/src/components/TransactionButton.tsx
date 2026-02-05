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
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

export function TransactionButton({
  contractAddress,
  contractName,
  functionName,
  functionArgs,
  label,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
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

  const variantClasses = {
    primary: 'tx-btn-primary',
    secondary: 'tx-btn-secondary',
    success: 'tx-btn-success',
  };

  const sizeClasses = {
    small: 'tx-btn-small',
    medium: 'tx-btn-medium',
    large: 'tx-btn-large',
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`transaction-btn ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'tx-btn-full' : ''}`}
    >
      {loading ? (
        <span className="tx-btn-loading">
          <span className="tx-btn-spinner"></span>
          Processing...
        </span>
      ) : (
        label
      )}
    </button>
  );
}

