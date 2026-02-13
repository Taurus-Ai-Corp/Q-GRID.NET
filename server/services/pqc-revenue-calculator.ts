/**
 * PQC Revenue Calculator
 * 
 * Standalone tool for generating revenue estimates for PQC migration services.
 * Based on the logic from Q-Arq.Q-grid.ca/server/services/pqc-crypto.ts
 */

export interface RevenueCalculatorInput {
  organizationName: string;
  totalKeys: number;
  urgency: 'standard' | 'accelerated' | 'emergency';
  complianceFrameworks: string[];
  managedServices: boolean;
  training: boolean;
  systemCount?: number;
}

export interface RevenueReport {
  organization: string;
  totalRevenuePotential: {
    min: number;
    max: number;
    formatted: string;
  };
  serviceBreakdown: {
    assessment: number; // Avg
    planning: number;
    implementation: number;
    testing: number;
    training: number;
    compliance: number;
  };
  recurringRevenue: {
    monthly: number; // Avg
    annual: number;
  };
  timelineMonths: number;
  roiAnalysis: string;
}

export class PQCRevenueCalculator {
  
  calculate(input: RevenueCalculatorInput): RevenueReport {
    const { totalKeys, urgency, complianceFrameworks, managedServices, training, organizationName } = input;
    const systemCount = input.systemCount || Math.ceil(totalKeys / 20); // Estimate if not provided

    // 1. Base Constants (USD)
    const rates = {
      assessmentPerKey: 50,
      planningPerKey: 100,
      implementationPerKey: 500,
      testingPerKey: 150,
      trainingPerSystem: 3500, // Avg of 2000-5000
      managedServicePerKey: 17.5, // Avg of 10-25
      managedServicePerSystem: 1000, // Avg of 500-1500
    };

    const multipliers = {
      standard: 1.0,
      accelerated: 1.5,
      emergency: 2.5,
    };

    const complianceFees: Record<string, number> = {
      'NIST': 15000,
      'FIPS': 25000,
      'ISO27001': 20000,
      'PCI-DSS': 30000,
      'HIPAA': 35000,
      'SOC2': 20000,
    };

    // 2. Calculations
    const multiplier = multipliers[urgency];
    
    // Assume 80% of keys need migration (standard vulnerability rate)
    const vulnerableKeys = Math.round(totalKeys * 0.8);

    // One-time Services
    const assessment = Math.round(totalKeys * rates.assessmentPerKey * multiplier);
    const planning = Math.round(vulnerableKeys * rates.planningPerKey * multiplier);
    const implementation = Math.round(vulnerableKeys * rates.implementationPerKey * multiplier);
    const testing = Math.round(vulnerableKeys * rates.testingPerKey * multiplier);
    const trainingCost = training ? (systemCount * rates.trainingPerSystem) : 0;
    
    const complianceTotal = complianceFrameworks.reduce((sum, fw) => sum + (complianceFees[fw] || 10000), 0);

    // Recurring Services
    const monthlyManaged = managedServices 
      ? Math.round((totalKeys * rates.managedServicePerKey) + (systemCount * rates.managedServicePerSystem))
      : 0;

    // Totals
    const totalOneTimeMin = (assessment + planning + implementation + testing + trainingCost + complianceTotal) * 0.8;
    const totalOneTimeMax = (assessment + planning + implementation + testing + trainingCost + complianceTotal) * 1.2;
    
    // Timeline
    const baseMonths = Math.ceil(vulnerableKeys / 100) + 6;
    const timelineMonths = Math.max(3, Math.round(baseMonths / multiplier));

    // ROI Text
    const roiText = `Estimated Project Value: $${(totalOneTimeMin/1000).toFixed(1)}k - $${(totalOneTimeMax/1000).toFixed(1)}k. Recurring: $${(monthlyManaged/1000).toFixed(1)}k/mo.`;

    return {
      organization: organizationName,
      totalRevenuePotential: {
        min: Math.round(totalOneTimeMin),
        max: Math.round(totalOneTimeMax),
        formatted: `$${Math.round(totalOneTimeMin).toLocaleString()} - $${Math.round(totalOneTimeMax).toLocaleString()}`
      },
      serviceBreakdown: {
        assessment,
        planning,
        implementation,
        testing,
        training: trainingCost,
        compliance: complianceTotal
      },
      recurringRevenue: {
        monthly: monthlyManaged,
        annual: monthlyManaged * 12
      },
      timelineMonths,
      roiAnalysis: roiText
    };
  }
}

// Simple CLI execution if run directly
import { fileURLToPath } from 'url';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const calculator = new PQCRevenueCalculator();
  
  console.log("=== PQC REVENUE CALCULATOR (LEAD GEN TOOL) ===");
  console.log("Scenario: Acme FinTech Bank (5,000 Keys, High Compliance)");
  
  // Example Scenario: Mid-sized Enterprise Bank
  const report = calculator.calculate({
    organizationName: "Acme FinTech Bank",
    totalKeys: 5000,
    urgency: "standard",
    complianceFrameworks: ["NIST", "PCI-DSS", "ISO27001", "SOC2"],
    managedServices: true,
    training: true,
    systemCount: 50
  });

  console.log(JSON.stringify(report, null, 2));
}
