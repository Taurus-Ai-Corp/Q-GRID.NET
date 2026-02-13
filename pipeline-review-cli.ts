// Pipeline Review CLI Tool
// Usage: npx tsx Q-Arq.Q-grid.ca/pipeline-review-cli.ts

interface Deal {
  name: string;
  amount: number;
  stage: string;
  closeDate: string;
  lastActivity: string;
  contact: string;
  owner?: string;
}

const PIPELINE_DATA: Deal[] = [
  { name: "Acme Corp PQC Pilot", amount: 50000, stage: "Negotiation", closeDate: "2026-02-28", lastActivity: "2026-02-10", contact: "Alice Johnson" },
  { name: "TechStart Token Launch", amount: 15000, stage: "Discovery", closeDate: "2026-03-15", lastActivity: "2026-01-20", contact: "Bob Smith" },
  { name: "Global Bank Migration", amount: 250000, stage: "Proposal", closeDate: "2026-04-30", lastActivity: "2026-02-11", contact: "Charlie Davis" },
  { name: "Local Gov CBDC", amount: 100000, stage: "Stalled", closeDate: "2025-12-31", lastActivity: "2025-11-15", contact: "Dave Miller" },
  { name: "DeFi Protocol Audit", amount: 25000, stage: "Closed Won", closeDate: "2026-01-15", lastActivity: "2026-01-15", contact: "Eve Wilson" },
  { name: "Retail Chain Loyalty", amount: 75000, stage: "Demo", closeDate: "2026-03-01", lastActivity: "2026-02-05", contact: "Frank Thomas" },
  { name: "Logistics Tracking", amount: 40000, stage: "Discovery", closeDate: "2026-05-15", lastActivity: "2026-02-12", contact: "Grace Lee" }
];

function analyzePipeline(deals: Deal[]) {
  const today = new Date("2026-02-12");
  const totalValue = deals.reduce((sum, d) => sum + d.amount, 0);
  
  // Health Metrics
  const staleDeals = deals.filter(d => {
    const daysSinceActivity = (today.getTime() - new Date(d.lastActivity).getTime()) / (1000 * 3600 * 24);
    return daysSinceActivity > 14 && d.stage !== "Closed Won" && d.stage !== "Closed Lost";
  });
  
  const overdueDeals = deals.filter(d => {
    return new Date(d.closeDate) < today && d.stage !== "Closed Won" && d.stage !== "Closed Lost";
  });

  // Prioritization
  const activeDeals = deals.filter(d => d.stage !== "Closed Won" && d.stage !== "Closed Lost" && d.stage !== "Stalled");
  const prioritized = activeDeals.sort((a, b) => {
    // Score based on Amount (weight 0.4) and Proximity to Close (weight 0.6)
    const scoreA = (a.amount / 10000) * 0.4 + (1 / (new Date(a.closeDate).getTime() - today.getTime())) * 10000000000 * 0.6;
    const scoreB = (b.amount / 10000) * 0.4 + (1 / (new Date(b.closeDate).getTime() - today.getTime())) * 10000000000 * 0.6;
    return scoreB - scoreA;
  });

  // Report Generation
  console.log(`# Pipeline Review: ${today.toISOString().split('T')[0]}`);
  console.log(`**Data Source:** Simulated CRM`);
  console.log(`**Deals Analyzed:** ${deals.length}`);
  console.log(`**Total Pipeline Value:** $${totalValue.toLocaleString()}`);
  console.log(`---`);
  
  console.log(`## Pipeline Health Score`);
  console.log(`| Metric | Count | Status |`);
  console.log(`|--------|-------|--------|`);
  console.log(`| Stale (>14 days silent) | ${staleDeals.length} | ${staleDeals.length > 2 ? "⚠️ Critical" : "✅ Good"} |`);
  console.log(`| Overdue Close Dates | ${overdueDeals.length} | ${overdueDeals.length > 0 ? "⚠️ Action Needed" : "✅ Good"} |`);
  
  console.log(`\n## Priority Actions This Week`);
  prioritized.slice(0, 3).forEach((deal, idx) => {
    console.log(`### ${idx + 1}. ${deal.name} ($${deal.amount.toLocaleString()})`);
    console.log(`**Stage:** ${deal.stage} | **Close:** ${deal.closeDate}`);
    console.log(`**Why:** High value / Imminent close.`);
    console.log(`**Action:** Contact ${deal.contact} to confirm next steps.`);
  });

  console.log(`\n## Risk Flags`);
  if (staleDeals.length > 0) {
    console.log(`### Stale Deals (Re-engage or Remove)`);
    staleDeals.forEach(d => console.log(`- ${d.name}: Last active ${d.lastActivity} (${d.contact})`));
  }
  
  if (overdueDeals.length > 0) {
    console.log(`### Past Close Date (Update immediately)`);
    overdueDeals.forEach(d => console.log(`- ${d.name}: Closed ${d.closeDate} (Stage: ${d.stage})`));
  }
}

analyzePipeline(PIPELINE_DATA);
