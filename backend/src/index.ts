/**
 * QuestStack Backend - Webhook Handler for Chainhooks
 * Handles all 9 chainhook events from MAINNET
 */

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Middleware to verify webhook secret (if configured)
const verifyWebhook = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const expectedSecret = process.env.WEBHOOK_SECRET;
  
  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Webhook handlers for all 9 chainhooks

// 1. Quest Created
app.post('/webhooks/quest-created', verifyWebhook, (req, res) => {
  console.log('📝 Quest Created:', JSON.stringify(req.body, null, 2));
  // Process quest creation event
  // Update database, send notifications, etc.
  res.status(200).json({ received: true });
});

// 2. Quest Completed
app.post('/webhooks/quest-completed', verifyWebhook, (req, res) => {
  console.log('✅ Quest Completed:', JSON.stringify(req.body, null, 2));
  // Process quest completion
  res.status(200).json({ received: true });
});

// 3. Reward Claimed
app.post('/webhooks/reward-claimed', verifyWebhook, (req, res) => {
  console.log('💰 Reward Claimed:', JSON.stringify(req.body, null, 2));
  // Process reward claim
  res.status(200).json({ received: true });
});

// 4. Token Mint
app.post('/webhooks/token-mint', verifyWebhook, (req, res) => {
  console.log('🪙 Token Minted:', JSON.stringify(req.body, null, 2));
  // Process token mint
  res.status(200).json({ received: true });
});

// 5. Token Transfer
app.post('/webhooks/token-transfer', verifyWebhook, (req, res) => {
  console.log('💸 Token Transfer:', JSON.stringify(req.body, null, 2));
  // Process token transfer
  res.status(200).json({ received: true });
});

// 6. Stake Deposited
app.post('/webhooks/stake-deposited', verifyWebhook, (req, res) => {
  console.log('🔒 Stake Deposited:', JSON.stringify(req.body, null, 2));
  // Process stake deposit
  res.status(200).json({ received: true });
});

// 7. Stake Withdrawn
app.post('/webhooks/stake-withdrawn', verifyWebhook, (req, res) => {
  console.log('🔓 Stake Withdrawn:', JSON.stringify(req.body, null, 2));
  // Process stake withdrawal
  res.status(200).json({ received: true });
});

// 8. Proposal Created
app.post('/webhooks/proposal-created', verifyWebhook, (req, res) => {
  console.log('🗳️ Proposal Created:', JSON.stringify(req.body, null, 2));
  // Process proposal creation
  res.status(200).json({ received: true });
});

// 9. Vote Cast
app.post('/webhooks/vote-cast', verifyWebhook, (req, res) => {
  console.log('✋ Vote Cast:', JSON.stringify(req.body, null, 2));
  // Process vote
  res.status(200).json({ received: true });
});

// Webhook metrics tracking
const webhookMetrics: Record<string, { count: number; lastReceived: string }> = {
  'quest-created': { count: 0, lastReceived: '' },
  'quest-completed': { count: 0, lastReceived: '' },
  'reward-claimed': { count: 0, lastReceived: '' },
  'token-mint': { count: 0, lastReceived: '' },
  'token-transfer': { count: 0, lastReceived: '' },
  'stake-deposited': { count: 0, lastReceived: '' },
  'stake-withdrawn': { count: 0, lastReceived: '' },
  'proposal-created': { count: 0, lastReceived: '' },
  'vote-cast': { count: 0, lastReceived: '' },
};

app.get('/metrics/webhooks', (req, res) => {
  res.json(webhookMetrics);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'queststack-backend' });
});

app.listen(PORT, () => {
  console.log(`🚀 QuestStack Backend running on port ${PORT}`);
  console.log(`📡 Ready to receive chainhook webhooks from MAINNET`);
});

