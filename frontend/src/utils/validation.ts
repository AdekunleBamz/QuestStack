/**
 * Validation Utilities
 * Form validation helpers
 * 
 * @module utils/validation
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateQuestTitle(title: string): ValidationResult {
  const errors: string[] = [];
  
  if (!title.trim()) {
    errors.push('Title is required');
  }
  if (title.length < 3) {
    errors.push('Title must be at least 3 characters');
  }
  if (title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  return { valid: errors.length === 0, errors };
}

export function validateQuestDescription(description: string): ValidationResult {
  const errors: string[] = [];
  
  if (!description.trim()) {
    errors.push('Description is required');
  }
  if (description.length < 10) {
    errors.push('Description must be at least 10 characters');
  }
  
  return { valid: errors.length === 0, errors };
}

export function validateRewardAmount(amount: number): ValidationResult {
  const errors: string[] = [];
  
  if (amount <= 0) {
    errors.push('Reward must be greater than 0');
  }
  if (amount > 1000000) {
    errors.push('Reward cannot exceed 1,000,000 QST');
  }
  
  return { valid: errors.length === 0, errors };
}

export function validateStakeAmount(amount: number, minStake: number): ValidationResult {
  const errors: string[] = [];
  
  if (amount < minStake) {
    errors.push(`Minimum stake is ${minStake / 1000000} QST`);
  }
  
  return { valid: errors.length === 0, errors };
}
