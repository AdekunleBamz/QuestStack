/**
 * TokenBalance Component
 * Display user token balance
 * 
 * @component
 */

interface TokenBalanceProps {
  balance: number;
  symbol?: string;
}

export function TokenBalance({ balance, symbol = 'QST' }: TokenBalanceProps) {
  const formatted = (balance / 1000000).toFixed(2);
  
  return (
    <div className="token-balance">
      <span className="balance">{formatted}</span>
      <span className="symbol">{symbol}</span>
    </div>
  );
}
