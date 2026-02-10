/**
 * Utility Functions
 * Helper functions for the QuestStack dApp
 * 
 * @module utils/formatters
 */

/**
 * Format a STX address for display (truncate)
 */
export function formatAddress(address: string, chars = 6): string {
  if (!address || address.length <= chars * 2) {
    return address;
  }
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Format token amount with decimals
 */
export function formatAmount(amount: number, decimals = 6): string {
  return (amount / Math.pow(10, decimals)).toLocaleString();
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString();
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const time = timestamp * 1000;
  const diff = now - time;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}

/**
 * Validate STX address
 */
export function isValidStacksAddress(address: string): boolean {
  const pattern = /^SP[0-9]{2}[A-Z0-9]{38}$/;
  return pattern.test(address);
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
