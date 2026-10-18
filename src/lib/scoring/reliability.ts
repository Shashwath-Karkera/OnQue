export interface CalculatedScore {
  score: number;                     // 0-100 (Reliability score, higher is better)
  riskPct: number;                   // 0-100% (Payment risk probability)
  riskBand: "Low Risk" | "Medium Risk" | "High Risk";
  onTimeRate: number;                // % of invoices paid on time
  avgDelayDays: number;              // Average days late when late
  recommendedDepositPct: number;     // 15%, 25%, or 50%
  recommendedTerms: string;
  breakdown: {
    lateRateRisk: number;            // 0 - 50%
    delaySeverityRisk: number;       // 0 - 30%
    currentOverdueRisk: number;      // 0 - 20%
  };
}

/**
 * Simple 3-Factor Payment Risk Engine
 * Total Risk % = Factor 1 (50%) + Factor 2 (30%) + Factor 3 (20%)
 * 
 * 1. Late Payment Rate (50%): Percentage of past invoices that were late * 50%
 * 2. Delay Severity (30%): 1 day late = 1% risk (capped at 30%)
 * 3. Currently Overdue (20%): 0 overdue = 0%, 1 overdue = 10%, 2+ overdue = 20%
 */
export function computeClientReliability(invoices: {
  status: string;
  delay_days: number;
  amount_cad: number;
}[]): CalculatedScore {
  // 1. Cold start / New Client with no invoices
  if (!invoices || invoices.length === 0) {
    return {
      score: 80,
      riskPct: 20,
      riskBand: "Low Risk",
      onTimeRate: 100.0,
      avgDelayDays: 0.0,
      recommendedDepositPct: 15,
      recommendedTerms: "Standard Net 15 Days (New client baseline)",
      breakdown: {
        lateRateRisk: 10,
        delaySeverityRisk: 0,
        currentOverdueRisk: 10,
      },
    };
  }

  // Factor 1: Late Payment Rate (50% weight)
  // An invoice is considered late if delay_days > 0 or status is overdue
  let lateCount = 0;
  let onTimePaidCount = 0;
  let totalDelayDays = 0;
  let overdueCount = 0;

  for (const inv of invoices) {
    const status = (inv.status || "").toLowerCase();
    const delay = inv.delay_days || 0;

    if (status === "overdue") {
      overdueCount++;
      lateCount++;
      totalDelayDays += Math.max(delay, 1);
    } else if (status === "paid") {
      if (delay > 0) {
        lateCount++;
        totalDelayDays += delay;
      } else {
        onTimePaidCount++;
      }
    }
  }

  const evaluatedCount = Math.max(1, lateCount + onTimePaidCount);
  const lateRate = lateCount / evaluatedCount;
  const factor1_lateRateRisk = Math.round(lateRate * 50); // max 50%

  // Factor 2: Delay Severity (30% weight)
  // 1 day average delay = 1% risk, max 30%
  const avgDelayDays = lateCount > 0 ? Number((totalDelayDays / lateCount).toFixed(1)) : 0.0;
  const factor2_delaySeverityRisk = Math.min(30, Math.round(avgDelayDays)); // max 30%

  // Factor 3: Currently Overdue (20% weight)
  // 0 bills overdue = 0%, 1 bill overdue = 10%, 2+ bills overdue = 20%
  const factor3_currentOverdueRisk = overdueCount === 0 ? 0 : overdueCount === 1 ? 10 : 20;

  // Composite Payment Risk % (0 - 100%)
  const riskPct = Math.min(100, Math.max(0, factor1_lateRateRisk + factor2_delaySeverityRisk + factor3_currentOverdueRisk));

  // Reliability Score (0 - 100) is the inverse of risk %
  const score = Math.max(5, Math.min(99, 100 - riskPct));
  const onTimeRate = Number(((onTimePaidCount / evaluatedCount) * 100).toFixed(1));

  // Categorization & Recommendations
  let riskBand: "Low Risk" | "Medium Risk" | "High Risk" = "Low Risk";
  let recommendedDepositPct = 15;
  let recommendedTerms = "Standard Net 15 Days (Prompt settlement history)";

  if (riskPct > 50) {
    riskBand = "High Risk";
    recommendedDepositPct = 50;
    recommendedTerms = "Require 50% upfront deposit before work starts (High delay/overdue risk)";
  } else if (riskPct > 25) {
    riskBand = "Medium Risk";
    recommendedDepositPct = 25;
    recommendedTerms = "Net 14 Days with 25% Deposit (Moderate delay history)";
  }

  return {
    score,
    riskPct,
    riskBand,
    onTimeRate,
    avgDelayDays,
    recommendedDepositPct,
    recommendedTerms,
    breakdown: {
      lateRateRisk: factor1_lateRateRisk,
      delaySeverityRisk: factor2_delaySeverityRisk,
      currentOverdueRisk: factor3_currentOverdueRisk,
    },
  };
}
