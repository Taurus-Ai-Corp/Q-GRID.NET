# Q-GRID TRANSFORMATION MASTER PROMPT

## Purpose
This comprehensive prompt is designed to transform the Q-GRID repository from its current state into a fully operational product ready for pilot and scaling. Execute each phase sequentially, validating completion before proceeding.

---

## SYSTEM CONTEXT

You are transforming Q-GRID (AssetGrid QUANTUM_RUPEE) - a quantum-resistant CBDC platform with 24 AI agents - into a production-ready application. The platform combines:

- **Local Q-GRID**: React 19 + Express + TypeScript + Hedera SDK (CBDC, KYC, Fraud, PQC)
- **GitHub Q-GRID.IN**: Python DeFi automation (yield optimization, arbitrage, multi-chain)

**Target**: Hybrid merge with $21M+ annual revenue potential

**Critical Files**:
- `/Users/user/Documents/HEDERA/Q-GRID` (main codebase)
- `/Users/user/Documents/HEDERA/.claude` (MCP servers, commands, skills)
- `/Users/user/Documents/HEDERA/CLAUDE.md` (system memory)
- `/Users/user/Documents/HEDERA/CONTEXT_RECALL.md` (project status)

---

## PHASE 1: FOUNDATION (Weeks 1-3)

### Task 1.1: Create Production Landing Page

```
INSTRUCTION:
Create a world-class landing page at client/src/pages/landing-new.tsx with the following sections:

1. HERO SECTION
   - Headline: "The Future of Quantum-Safe Digital Currency"
   - Subheadline: "Secure, Private, Unstoppable"
   - Primary CTA: "Start Free Trial" → /auth/register
   - Secondary CTA: "Watch Demo" → Modal with video
   - Background: Animated quantum particle effect (use Framer Motion)
   - Stat badges: "24 AI Agents", "100K+ TPS", "99.9% Uptime"

2. FEATURE GRID (6 features with icons)
   - Quantum-Resistant Security (Shield icon)
   - 5-Factor Biometric Auth (Fingerprint icon)
   - Offline CBDC Payments (Signal icon)
   - DeFi Integration (TrendingUp icon)
   - Cross-Chain Bridge (Link icon)
   - Tokenized Identity (User icon)

   Each feature card should have:
   - Lucide icon
   - Title
   - 2-line description
   - "Learn more" link

3. HOW IT WORKS (3 steps)
   - Step 1: Create Account (icon: UserPlus)
   - Step 2: Verify Identity (icon: ShieldCheck)
   - Step 3: Start Trading (icon: ArrowRightLeft)

4. SOCIAL PROOF
   - "Trusted by X users across Y countries"
   - Partner logo carousel (placeholders)
   - Testimonial slider (3 testimonials)

5. PRICING TIERS (3 columns)
   FREE:
   - Basic wallet
   - 100 transactions/month
   - Email support
   - Price: $0/month

   PRO:
   - DeFi features
   - Unlimited transactions
   - Priority support
   - API access
   - Price: $49/month

   ENTERPRISE:
   - Custom solutions
   - Dedicated agent pool
   - SLA guarantee
   - On-premise option
   - Price: Contact us

6. NEWSLETTER SIGNUP
   - Email input with validation
   - "Get quantum-safe crypto insights weekly"
   - Privacy policy checkbox
   - Submit button

7. FAQ SECTION
   - Accordion with 8 common questions
   - Topics: Security, Pricing, Compliance, Integration

8. FOOTER
   - Logo + tagline
   - Navigation links (Product, Resources, Company, Legal)
   - Social media icons (Twitter, LinkedIn, Discord, GitHub)
   - Copyright notice

TECHNICAL REQUIREMENTS:
- Use Shadcn/UI components
- Mobile-first responsive design
- Dark/light theme support
- Tailwind CSS 4 styling
- Framer Motion for animations
- SEO meta tags
- Performance: Core Web Vitals pass
```

### Task 1.2: Implement Lead Capture Backend

```
INSTRUCTION:
Add lead capture functionality to server/routes.ts:

1. CREATE TABLE (shared/schema.ts):
   - leads table with all fields from analysis document

2. ADD ENDPOINTS:
   POST /api/leads/submit
   - Validate email (zod schema)
   - Check for duplicates
   - Store in database
   - Send welcome email (placeholder)
   - Return success response

   GET /api/leads/stats (admin only)
   - Total leads
   - Leads by source
   - Leads by date
   - Conversion rates

   GET /api/leads/export (admin only)
   - CSV export of all leads

   POST /api/leads/newsletter
   - Subscribe to newsletter
   - Integrate with Mailchimp/SendGrid (env config)

3. ADD VALIDATION SCHEMA:
   const leadSchema = z.object({
     email: z.string().email(),
     name: z.string().optional(),
     company: z.string().optional(),
     phone: z.string().optional(),
     interestArea: z.enum(['cbdc', 'defi', 'kyc', 'enterprise', 'other']),
     utmSource: z.string().optional(),
     utmCampaign: z.string().optional()
   });
```

### Task 1.3: Implement Full Authentication System

```
INSTRUCTION:
Create comprehensive authentication at server/auth/:

1. CREATE AUTH MODULE STRUCTURE:
   server/auth/
   ├── index.ts           # Main auth router
   ├── local.ts           # Email/password
   ├── google.ts          # Google OAuth
   ├── github.ts          # GitHub OAuth
   ├── web3.ts            # MetaMask/WalletConnect
   ├── siwe.ts            # Sign-In with Ethereum
   ├── session.ts         # JWT management
   ├── rbac.ts            # Role-based access
   └── middleware.ts      # Auth middleware

2. LOCAL AUTHENTICATION (local.ts):
   - Registration with email verification
   - Password hashing (bcrypt, 12 rounds)
   - Login with rate limiting (5 attempts/15 min)
   - Password reset flow (token-based)
   - Email verification (JWT token, 24h expiry)

3. OAUTH PROVIDERS:
   Google OAuth:
   - Scopes: openid, email, profile
   - Auto-create user on first login
   - Link to existing account by email

   GitHub OAuth:
   - Scopes: read:user, user:email
   - Fetch primary email
   - Auto-create user on first login

4. WEB3 AUTHENTICATION (web3.ts):
   - WalletConnect v2 integration
   - MetaMask connection
   - Message signing for verification
   - Nonce-based replay protection

5. SIWE (siwe.ts):
   - EIP-4361 compliant
   - Domain verification
   - Expiration handling
   - Statement: "Sign in to Q-GRID"

6. SESSION MANAGEMENT (session.ts):
   - Access token: 15 min expiry
   - Refresh token: 7 day expiry
   - Token rotation on refresh
   - Device tracking
   - Concurrent session limit (5)

7. RBAC (rbac.ts):
   Roles:
   - user: Basic access
   - pro: DeFi features
   - enterprise: Full access
   - admin: System management

   Permissions matrix for each endpoint

8. MIDDLEWARE (middleware.ts):
   - Token validation
   - Role checking
   - Rate limiting per user
   - Request logging
```

### Task 1.4: Create Auth UI Components

```
INSTRUCTION:
Create authentication UI at client/src/pages/auth/:

1. LOGIN PAGE (login.tsx):
   - Email/password form
   - "Remember me" checkbox
   - "Forgot password" link
   - OAuth buttons (Google, GitHub)
   - Web3 wallet button
   - "Sign up" link
   - Form validation (react-hook-form + zod)

2. REGISTER PAGE (register.tsx):
   - Email, password, confirm password
   - Password strength indicator
   - Terms & privacy checkbox
   - reCAPTCHA v3
   - OAuth alternatives
   - Web3 wallet option

3. VERIFY EMAIL PAGE (verify.tsx):
   - Token validation
   - Success/error states
   - Resend verification button
   - Redirect to dashboard

4. FORGOT PASSWORD PAGE (forgot.tsx):
   - Email input
   - Success message
   - Link to login

5. RESET PASSWORD PAGE (reset.tsx):
   - New password input
   - Confirm password
   - Password requirements
   - Success redirect

6. WEB3 CONNECT MODAL (web3-modal.tsx):
   - WalletConnect QR
   - MetaMask button
   - Coinbase Wallet
   - Other wallet options
   - Network selector
   - Connection status
```

---

## PHASE 2: DEFI INTEGRATION (Weeks 4-6)

### Task 2.1: Port Python DeFi Agents to TypeScript

```
INSTRUCTION:
Create DeFi agent system at server/agents/defi/:

1. MAIN DEFI AGENT (defi-agent.ts):
   class DeFiAgent extends BaseAgent {
     name = 'DeFi Automation Agent';
     capabilities = [
       'yield-optimization',
       'arbitrage-detection',
       'liquidity-provision',
       'gas-optimization',
       'portfolio-rebalancing'
     ];

     async execute(input, context): Promise<AgentResult> {
       // Route to appropriate subagent
     }
   }

2. YIELD OPTIMIZER SUBAGENT (yield-optimizer.ts):
   - Scan protocols for best APY
   - Compare risk-adjusted returns
   - Auto-compound rewards
   - Rebalance positions
   - Track impermanent loss

3. ARBITRAGE SCANNER SUBAGENT (arbitrage-scanner.ts):
   - Multi-DEX price monitoring
   - Profit calculation (net of gas)
   - Flash loan capability
   - Execution optimization
   - Slippage protection

4. LIQUIDITY MANAGER SUBAGENT (liquidity-manager.ts):
   - Pool position tracking
   - Fee collection
   - Range optimization (Uniswap V3)
   - Impermanent loss alerts
   - Auto-compound fees

5. PROTOCOL INTEGRATIONS (protocols/):
   - uniswap.ts (V3 SDK)
   - aave.ts (V3 SDK)
   - compound.ts (SDK)
   - curve.ts (SDK)

   Each integration:
   - Contract ABI loading
   - Method wrappers
   - Event listeners
   - Error handling
```

### Task 2.2: Multi-Chain Configuration

```
INSTRUCTION:
Create chain configuration at server/config/chains.ts:

export const SUPPORTED_CHAINS = {
  hedera: {
    chainId: 295,
    name: 'Hedera Mainnet',
    rpcUrl: process.env.HEDERA_RPC_URL,
    explorer: 'https://hashscan.io',
    nativeCurrency: { symbol: 'HBAR', decimals: 8 }
  },
  ethereum: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: process.env.ETH_RPC_URL,
    explorer: 'https://etherscan.io',
    nativeCurrency: { symbol: 'ETH', decimals: 18 }
  },
  polygon: {
    chainId: 137,
    name: 'Polygon Mainnet',
    rpcUrl: process.env.POLYGON_RPC_URL,
    explorer: 'https://polygonscan.com',
    nativeCurrency: { symbol: 'MATIC', decimals: 18 }
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    rpcUrl: process.env.ARBITRUM_RPC_URL,
    explorer: 'https://arbiscan.io',
    nativeCurrency: { symbol: 'ETH', decimals: 18 }
  },
  optimism: {
    chainId: 10,
    name: 'Optimism',
    rpcUrl: process.env.OPTIMISM_RPC_URL,
    explorer: 'https://optimistic.etherscan.io',
    nativeCurrency: { symbol: 'ETH', decimals: 18 }
  }
};

export const DEFI_PROTOCOLS = {
  uniswap: {
    v3Router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    v3Factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    chains: [1, 137, 42161, 10]
  },
  aave: {
    v3Pool: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
    chains: [1, 137, 42161, 10]
  },
  compound: {
    v3Comet: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
    chains: [1, 137]
  }
};
```

### Task 2.3: DeFi API Endpoints

```
INSTRUCTION:
Add DeFi endpoints to server/routes.ts:

// Protocol Information
GET /api/defi/protocols
- List all supported protocols
- Current APY for each
- TVL data
- Risk ratings

GET /api/defi/pools
- Available liquidity pools
- Fee tiers
- Volume (24h)
- APY (current + historical)

GET /api/defi/pools/:poolId
- Pool details
- Current positions
- Fee earnings
- IL calculations

// User Operations
POST /api/defi/stake
Body: { protocol, token, amount, lockPeriod }
- Validate balance
- Execute stake transaction
- Record position
- Return receipt

POST /api/defi/unstake
Body: { positionId, amount }
- Check lock period
- Calculate rewards
- Execute unstake
- Update position

GET /api/defi/staking/:userId
- All staking positions
- Current values
- Rewards earned
- APY performance

POST /api/defi/claim-rewards
Body: { positionId }
- Check available rewards
- Execute claim
- Update totals

// Liquidity
POST /api/defi/liquidity/add
Body: { protocol, token0, token1, amount0, amount1, feeT ier }
- Approve tokens
- Add liquidity
- Record LP position

POST /api/defi/liquidity/remove
Body: { positionId, percentage }
- Calculate withdrawal
- Remove liquidity
- Collect fees
- Update position

// Analytics
GET /api/defi/apy-history
- Historical APY by protocol
- 7d, 30d, 90d averages

GET /api/defi/yield-opportunities
- Sorted by risk-adjusted APY
- Entry requirements
- Projected earnings
```

### Task 2.4: DeFi Dashboard UI

```
INSTRUCTION:
Create DeFi UI at client/src/pages/defi/:

1. OVERVIEW (overview.tsx):
   - Portfolio total value
   - 24h change ($ and %)
   - Asset allocation pie chart
   - Protocol distribution
   - Recent transactions

2. STAKING (staking.tsx):
   - Active positions table
   - Stake new position form
   - Protocol selector
   - Amount input with MAX button
   - APY display
   - Lock period options
   - Rewards calculator

3. POOLS (pools.tsx):
   - Available pools list
   - Filter by chain, protocol
   - Sort by APY, TVL, volume
   - Pool cards with:
     - Token pair icons
     - APY
     - TVL
     - 24h volume
     - Your position
   - Add liquidity modal

4. YIELD (yield.tsx):
   - Yield opportunities table
   - Risk rating badges
   - One-click deposit
   - Auto-compound toggle
   - Earnings projections

5. HISTORY (history.tsx):
   - Transaction history
   - Filter by type, date, chain
   - Export to CSV
   - Transaction details modal
```

---

## PHASE 3: ANALYTICS & INSIGHTS (Weeks 7-9)

### Task 3.1: Analytics Backend

```
INSTRUCTION:
Create analytics service at server/services/analytics.ts:

class AnalyticsService {
  // User Metrics
  async getDailyActiveUsers(date?: Date): Promise<number>
  async getMonthlyActiveUsers(month?: Date): Promise<number>
  async getUserGrowthRate(period: 'day'|'week'|'month'): Promise<number>
  async getUserRetention(cohort: Date): Promise<RetentionData>

  // Transaction Metrics
  async getTransactionVolume(period: string): Promise<VolumeData>
  async getTransactionCount(period: string): Promise<number>
  async getAverageTransactionSize(): Promise<number>

  // Revenue Metrics
  async getTotalRevenue(period: string): Promise<number>
  async getRevenueBySource(): Promise<RevenueBreakdown>
  async getARPU(): Promise<number>

  // Funnel Metrics
  async getConversionFunnel(): Promise<FunnelData>
  async getLeadToUserRate(): Promise<number>
  async getTrialToProRate(): Promise<number>

  // Feature Metrics
  async getFeatureAdoption(): Promise<FeatureUsage[]>
  async getAgentUsage(): Promise<AgentStats[]>
}

// Add materialized views for performance:
CREATE MATERIALIZED VIEW daily_metrics AS
SELECT
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as dau,
  COUNT(*) as transactions,
  SUM(amount) as volume
FROM analytics_events
GROUP BY DATE(created_at);
```

### Task 3.2: Analytics Dashboard UI

```
INSTRUCTION:
Create admin dashboard at client/src/pages/admin/dashboard.tsx:

LAYOUT:
- Sidebar navigation (collapsible)
- Header with search, notifications, profile
- Main content area with grid

KPI CARDS (top row):
1. Total Users (with trend arrow)
2. Active Users (DAU/MAU ratio)
3. Total Revenue (with period selector)
4. Conversion Rate (leads → users)

CHARTS (middle):
1. User Growth (line chart, 30d)
2. Revenue (bar chart, 12m)
3. Transaction Volume (area chart)
4. Feature Adoption (horizontal bar)

TABLES (bottom):
1. Recent Signups
2. Top Agents by Usage
3. Active Sessions
4. Error Log

FILTERS:
- Date range picker
- Comparison mode (vs previous period)
- Export button
```

---

## PHASE 4: ENTERPRISE FEATURES (Weeks 10-12)

### Task 4.1: AI Trust System

```
INSTRUCTION:
Integrate deepfake detection at server/services/trust/:

1. DETECTOR SERVICE (deepfake-detector.ts):
   - Model loading (ONNX runtime)
   - Image preprocessing
   - Multi-model ensemble
   - Confidence scoring
   - Result caching

2. BIOLOGICAL SIGNALS (biological-signals.ts):
   - Eye blink detection (OpenCV)
   - Pulse extraction (rPPG algorithm)
   - Micro-expression analysis

3. RISK SCORER (risk-scorer.ts):
   - Aggregate detection results
   - Weight by model confidence
   - Apply threshold rules
   - Generate risk report

4. API ENDPOINTS:
   POST /api/trust/verify-identity
   - Upload face image/video
   - Run detection pipeline
   - Return trust score + details

   POST /api/trust/verify-document
   - Document authenticity check
   - Tamper detection
   - Consistency validation
```

### Task 4.2: Cross-Chain Bridge

```
INSTRUCTION:
Implement bridge service at server/services/bridge/:

1. BRIDGE SERVICE (bridge.ts):
   - Supported routes matrix
   - Fee estimation
   - Transaction monitoring
   - Confirmation tracking

2. PROTOCOLS:
   - layerzero.ts (Omnichain)
   - wormhole.ts (Cross-chain messaging)
   - polygon.ts (Native bridge)

3. API ENDPOINTS:
   GET /api/bridge/supported-chains
   GET /api/bridge/estimate
   POST /api/bridge/initiate
   GET /api/bridge/status/:txId

4. UI (client/src/pages/bridge.tsx):
   - Source chain selector
   - Destination chain selector
   - Token selector
   - Amount input
   - Fee display
   - Transaction progress
```

### Task 4.3: NFT & Tokenization

```
INSTRUCTION:
Create NFT system at server/services/nft/:

1. NFT SERVICE (nft-service.ts):
   - Metadata handling (IPFS)
   - Minting transactions
   - Transfer logic
   - Royalty distribution

2. MARKETPLACE:
   - Listing creation
   - Offer management
   - Auction support
   - Settlement

3. API ENDPOINTS:
   GET /api/nft/gallery/:userId
   POST /api/nft/mint
   GET /api/nft/marketplace
   POST /api/nft/list
   POST /api/nft/buy
   POST /api/nft/offer

4. UI (client/src/pages/nft/):
   - gallery.tsx (user collection)
   - marketplace.tsx (browse/buy)
   - mint.tsx (create NFT)
   - details.tsx (NFT view)
```

---

## PHASE 5: PRODUCTION READINESS (Weeks 13-16)

### Task 5.1: Testing Suite

```
INSTRUCTION:
Implement comprehensive testing:

1. UNIT TESTS (*.test.ts):
   - All agent methods
   - All service functions
   - All utility functions
   - Target: 80%+ coverage

2. INTEGRATION TESTS:
   - API endpoint testing
   - Database operations
   - External service mocking

3. E2E TESTS (e2e/):
   - User registration flow
   - Auth flows (all providers)
   - DeFi operations
   - Bridge transactions
   - Use Playwright

4. LOAD TESTS (load/):
   - k6 scripts
   - 1000 concurrent users
   - Response time <200ms (p95)
```

### Task 5.2: CI/CD Pipeline

```
INSTRUCTION:
Create GitHub Actions at .github/workflows/:

1. CI (ci.yml):
   - Trigger: push, PR
   - Jobs: lint, test, build
   - Coverage upload
   - Security scan

2. CD (cd.yml):
   - Trigger: merge to main
   - Build Docker images
   - Push to registry
   - Deploy to staging
   - Run smoke tests
   - Deploy to production (manual)

3. SECURITY (security.yml):
   - Weekly scan
   - Dependency audit
   - Secret scanning
   - Container scanning
```

### Task 5.3: Docker & Kubernetes

```
INSTRUCTION:
Create container configuration:

1. DOCKERFILE:
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:20-alpine AS production
   WORKDIR /app
   COPY --from=builder /app/dist ./dist
   COPY package*.json ./
   RUN npm ci --production
   EXPOSE 5000
   CMD ["node", "dist/server/index.js"]

2. DOCKER-COMPOSE (docker-compose.yml):
   - app service
   - postgres service
   - redis service
   - nginx reverse proxy

3. KUBERNETES (k8s/):
   - deployment.yaml
   - service.yaml
   - ingress.yaml
   - configmap.yaml
   - secrets.yaml
   - hpa.yaml (autoscaling)
```

### Task 5.4: Monitoring

```
INSTRUCTION:
Setup observability:

1. METRICS (Prometheus):
   - Request latency
   - Error rates
   - Active users
   - Transaction volume
   - Agent execution time

2. LOGGING (ELK):
   - Structured JSON logs
   - Log levels (debug, info, warn, error)
   - Request tracing
   - Error aggregation

3. ALERTING:
   - Error rate > 1%
   - Latency > 500ms
   - CPU > 80%
   - Memory > 90%
   - Failed transactions

4. DASHBOARDS (Grafana):
   - System overview
   - API performance
   - Business metrics
   - Agent analytics
```

---

## VALIDATION CHECKLIST

### Phase 1 Completion:
- [ ] Landing page live and responsive
- [ ] Lead capture working with email
- [ ] All auth providers functional
- [ ] 80%+ auth completion rate

### Phase 2 Completion:
- [ ] DeFi agents deployed
- [ ] Multi-chain wallet connection
- [ ] Staking functional on 2+ protocols
- [ ] DeFi dashboard operational

### Phase 3 Completion:
- [ ] Analytics tracking all events
- [ ] Admin dashboard live
- [ ] Real-time metrics updating
- [ ] Export functionality working

### Phase 4 Completion:
- [ ] Trust system operational
- [ ] Bridge supporting 3+ chains
- [ ] NFT minting functional
- [ ] Marketplace operational

### Phase 5 Completion:
- [ ] 80%+ test coverage
- [ ] CI/CD pipeline active
- [ ] Docker deployment working
- [ ] Monitoring dashboards live
- [ ] Security audit passed
- [ ] Documentation complete

---

## SUCCESS METRICS

| Metric | Target | Deadline |
|--------|--------|----------|
| Landing conversion | 5%+ | Week 3 |
| Auth completion | 80%+ | Week 4 |
| DeFi TVL | $100K+ | Week 8 |
| DAU | 500+ | Week 10 |
| Test coverage | 80%+ | Week 14 |
| Uptime | 99.9%+ | Week 16 |

---

## EXECUTION NOTES

1. **Sequential Execution**: Complete each phase before starting next
2. **Validation Required**: Run tests after each task
3. **Git Commits**: Commit after each sub-task
4. **Documentation**: Update docs with each feature
5. **Code Review**: All PRs require review

---

**Prompt Version**: 1.0
**Last Updated**: December 29, 2025
**Author**: TAURUS AI Corp
