# QuestStack Backend

Express.js backend for QuestStack chainhooks

## Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Chainhooks**: @hirosystems/chainhooks-client

## Project Structure

```
src/
├── index.ts           # Main server
├── chainhooks/        # Chainhook registration
│   └── register.ts
└── services/         # Business logic
    ├── transactionService.ts
    ├── metrics.ts
    ├── eventHandler.ts
    ├── questService.ts
    ├── stakingService.ts
    └── governanceService.ts
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build
npm run build

# Start production
npm start
```

## Environment Variables

```env
PORT=3001
CHAINKOOKS_API_KEY=...
WEBHOOK_SECRET=...
WEBHOOK_BASE_URL=https://your-domain.com
```

## Webhook Endpoints

- POST /webhooks/quest-created
- POST /webhooks/quest-completed
- POST /webhooks/reward-claimed
- POST /webhooks/stake-deposited
- POST /webhooks/stake-withdrawn
- POST /webhooks/proposal-created
- POST /webhooks/vote-cast

## Health Check

GET /health
GET /metrics
