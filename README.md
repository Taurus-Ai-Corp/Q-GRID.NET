<div align="center">

[![npm](https://img.shields.io/npm/v/@taurus-ai/q-grid?style=flat-square&logo=npm&color=CB3837)](https://www.npmjs.com/org/taurus-ai)
[![License](https://img.shields.io/badge/License-FSL%201.1-blue?style=flat-square)](LICENSE)
[![NIST PQC](https://img.shields.io/badge/NIST-FIPS%20203%20%7C%20204-00629B?style=flat-square)](https://csrc.nist.gov/projects/post-quantum-cryptography)
[![Hedera](https://img.shields.io/badge/Hedera-Hashgraph-8259EF?style=flat-square&logo=hedera)](https://hedera.com)
[![SWIFT 2027](https://img.shields.io/badge/SWIFT-2027%20Ready-003B6F?style=flat-square)](https://www.swift.com)
[![EU AI Act](https://img.shields.io/badge/EU%20AI%20Act-Compliant-003399?style=flat-square)](https://artificialintelligenceact.eu)

# Q-GRID.NET

**Enterprise Quantum-as-a-Service (QaaS) Orchestration Platform**

24 ML-agents for quantum-resistant blockchain infrastructure.
NIST FIPS 203/204 compliant. Enterprise AI orchestration on Hedera Hashgraph.

[Platform](https://q-grid.net) | [Corporate](https://taurusai.io) | [Contact](mailto:admin@taurusai.io)

</div>

---

## Overview

Q-GRID is the core orchestration engine powering TAURUS AI's Quantum-as-a-Service platform. It coordinates 24 specialized ML-agents across quantum-safe cryptography, regulatory compliance, financial services, and blockchain settlement -- delivering post-quantum security to enterprise infrastructure before the cryptographic migration deadlines.

Built for organizations preparing for SWIFT's 2027 quantum-readiness mandate and the EU AI Act enforcement date of August 2026.

---

## Architecture

```
                           Q-GRID QaaS PLATFORM
  =========================================================================

  +------------------------------- q-grid.net ----------------------------+
  |                                                                        |
  |  +--------------+  +--------------+  +--------------+  +------------+ |
  |  | Q-GRID       |  | Q-GRID       |  | Q-GRID       |  | Q-GRID     | |
  |  | Comply       |  | Lend         |  | Flow         |  | Create     | |
  |  | (GRIDERA)    |  | (LendGrid)   |  | (BizFlow)    |  | (NeoVibe)  | |
  |  +--------------+  +--------------+  +--------------+  +------------+ |
  |  +--------------+  +--------------+  +--------------+  +------------+ |
  |  | Q-GRID       |  | Q-GRID       |  | Q-GRID       |  | Q-GRID     | |
  |  | Assets       |  | Verify       |  | Pay          |  | Research   | |
  |  | (OrionGrid)  |  | (PropertyVet)|  | (GRID-PAY)   |  | (Dexter)   | |
  |  +--------------+  +--------------+  +--------------+  +------------+ |
  +========================================================================+
                                    |
  +========================================================================+
  |              ORCHESTRATION LAYER  (24 ML-Agents)                       |
  |  Agent Scheduler | Task Router | State Manager | Event Bus (SSE)      |
  +========================================================================+
                                    |
  +========================================================================+
  |              QUANTUM CRYPTOGRAPHY LAYER                                |
  |  ML-DSA-65 (FIPS 204) | ML-KEM-768 (FIPS 203) | X.509 PQC Certs     |
  +========================================================================+
                                    |
  +========================================================================+
  |              SETTLEMENT LAYER  (Hedera Hashgraph)                      |
  |  HTS (Tokens) | HCS (Consensus) | HSCS (Contracts) | 0.00017 kWh/tx  |
  +========================================================================+
```

---

## Platform Modules

| Module | Product | Description | Pricing | Status |
|--------|---------|-------------|---------|--------|
| **Q-GRID Comply** | GRIDERA | Quantum compliance + EU AI Act automation | $500 - $2,000/mo | GA |
| **Q-GRID Lend** | LendGrid | AI credit scoring + MSME lending (70% faster, 35% lower defaults) | Custom | GA |
| **Q-GRID Flow** | BizFlow | Agentic workflow orchestration | TBD | Q2 2026 |
| **Q-GRID Create** | NeoVibe | AI marketing automation + content generation | TBD | Q3 2026 |
| **Q-GRID Assets** | OrionGrid | Real-world asset tokenization on Hedera | TBD | Q3 2026 |
| **Q-GRID Verify** | PropertyVet | AI background verification + due diligence | TBD | Q3 2026 |
| **Q-GRID Pay** | GRID-PAY | Quantum-safe payments + CBDC infrastructure | TBD | Beta |
| **Q-GRID Intel** | -- | Regulatory intelligence engine | Free | Open Source |
| **Q-GRID Research** | Dexter | Autonomous financial research CLI | Free | Open Source |

---

## Technical Specifications

### Quantum Cryptography

| Standard | Algorithm | Key Size | Signature Size | Security Level |
|----------|-----------|----------|---------------|----------------|
| FIPS 204 | ML-DSA-65 | 1,952 bytes | 3,293 bytes | Level 3 (AES-192) |
| FIPS 203 | ML-KEM-768 | 1,184 bytes | 1,088 bytes | Level 3 (AES-192) |

### Performance Benchmarks

| Operation | Classical (Ed25519) | Quantum (ML-DSA-65) | Overhead |
|-----------|-------------------|-------------------|----------|
| Key generation | 0.02ms | 0.15ms | 7.5x |
| Sign (1KB) | 0.04ms | 0.31ms | 7.7x |
| Verify | 0.05ms | 0.18ms | 3.6x |
| End-to-end payment | 3.3s | 3.9s | **1.18x** |

### Infrastructure

| Component | Specification |
|-----------|--------------|
| Ledger | Hedera Hashgraph: 10,000+ TPS, 3-5s finality, 0.00017 kWh/tx |
| Agents | 24 ML-agents (compliance, lending, research, settlement) |
| Runtime | Node.js 20+ (platform), Bun (Dexter CLI) |
| AI | Claude (Anthropic), multi-model via LangChain |
| Frontend | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| Backend | Fastify, SSE, Prisma ORM |
| Billing | Stripe subscriptions |

---

## Quick Start

```bash
git clone https://github.com/Taurus-Ai-Corp/Q-GRID.NET.git
cd Q-GRID.NET
npm install
cp .env.example .env.local
npm run dev
```

---

## Compliance

| Framework | Deadline | Status |
|-----------|----------|--------|
| **SWIFT CSP 2027** | 2027 | Ready |
| **EU AI Act** | August 2026 | Compliant |
| **NIST PQC** | Active | FIPS 203/204 |
| **SOC 2 Type II** | -- | In Progress |

---

## Intellectual Property

3 published defensive publications establishing prior art:

- [Zero-Knowledge KYC](https://github.com/Taurus-Ai-Corp/quantum-rupee-zk-kyc) -- Privacy-preserving identity verification
- [Offline CBDC](https://github.com/Taurus-Ai-Corp/quantum-rupee-offline-cbdc) -- Hardware-secured offline payments
- [Fraud Detection](https://github.com/Taurus-Ai-Corp/quantum-rupee-fraud-detection) -- Multi-model ensemble prevention

---

## Security

Report vulnerabilities to [security@taurusai.io](mailto:security@taurusai.io). Do not open public issues for security vulnerabilities.

---

## License

[Functional Source License (FSL 1.1)](LICENSE). Enterprise licensing available at [sales@taurusai.io](mailto:sales@taurusai.io).

---

<div align="center">

**TAURUS AI Corp**

Ontario, Canada | Dubai, UAE (FZCO) | Wyoming, USA (LLC)

[q-grid.net](https://q-grid.net) | [taurusai.io](https://taurusai.io) | [admin@taurusai.io](mailto:admin@taurusai.io)

[![Sponsor](https://img.shields.io/badge/Sponsor-TAURUS%20AI-EA4AAA?style=for-the-badge&logo=github-sponsors)](https://github.com/sponsors/Taurus-Ai-Corp)

</div>
