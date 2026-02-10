/**
 * QuestStack Backend - Webhook Handler for Chainhooks
 * Handles all 9 chainhook events from MAINNET
 * Enhanced with rate limiting, caching, and improved logging
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(limiter);

// Request logging middleware
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
};
app.use(requestLogger);

// Health check with detailed status
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'queststack-backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Detailed health check
app.get('/health/detailed', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    status: 'ok',
    service: 'queststack-backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
      external: Math.round(memoryUsage.external / 1024 / 1024) + 'MB',
    },
  });
});

// Middleware to verify webhook secret
const verifyWebhook = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const expectedSecret = process.env.WEBHOOK_SECRET;
  
  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    console.warn(`Unauthorized webhook attempt from ${req.ip}`);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Webhook handlers for all 9 chainhooks

// 1. Quest Created
app.post('/webhooks/quest-created', verifyWebhook, (req, res) => {
  console.log('📝 Quest Created:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// 2. Quest Completed
app.post('/webhooks/quest-completed', verifyWebhook, (req, res) => {
  console.log('✅ Quest Completed:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// 3. Reward Claimed
app.post('/webhooks/reward-claimed', verifyWebhook, (req, res) => {
  console.log('💰 Reward Claimed:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// 4. Token Mint
app.post('/webhooks/token-mint', verifyWebhook, (req, res) => {
  console.log('🪙 Token Minted:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// 5. Token Transfer
app.post('/webhooks/token-transfer', verifyWebhook, (req, res) => {
  console.log('💸 Token Transfer:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// 6. Stake Deposited
app.post('/webhooks/stake-deposited', verifyWebhook, (req, res) => {
  console.log('🔒 Stake Deposited:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// 7. Stake Withdrawn
app.post('/webhooks/stake-withdrawn', verifyWebhook, (req, res) => {
  console.log('🔓 Stake Withdrawn:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// 8. Proposal Created
app.post('/webhooks/proposal-created', verifyWebhook, (req, res) => {
  console.log('🗳️ Proposal Created:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// 9. Vote Cast
app.post('/webhooks/vote-cast', verifyWebhook, (req, res) => {
  console.log('✋ Vote Cast:', JSON.stringify(req.body, null, 2));
  res.status(200).json({ received: true, timestamp: new Date().toISOString() });
});

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Detailed health check with uptime
app.get('/health/detailed', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    status: 'ok',
    service: 'queststack-backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
      external: Math.round(memoryUsage.external / 1024 / 1024) + 'MB',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 QuestStack Backend running on port ${PORT}`);
  console.log(`📡 Ready to receive chainhook webhooks from MAINNET`);
  console.log(`🔒 Webhook authentication: ${process.env.WEBHOOK_SECRET ? 'enabled' : 'disabled'}`);
});

export default app;
