import { NextResponse } from "next/server";

export interface RiskAnalysisRequest {
  clientName: string;
  clientType?: string;
  invoiceCount?: number;
  averageDelayDays?: number;
  contractAmount?: number;
}

export async function POST(request: Request) {
  try {
    const body: RiskAnalysisRequest = await request.json();

    const clientName = body.clientName || "Prospective Client";
    const clientType = body.clientType || "Commercial General Contractor";
    const invoiceCount = body.invoiceCount || 12;
    const averageDelayDays = body.averageDelayDays ?? 22;
    const contractAmount = body.contractAmount ?? 15000;

    // Calculate score (100 = flawless prompt payment, 0 = severe delinquency)
    let score = Math.max(10, Math.min(98, 100 - averageDelayDays * 1.8));

    // Size sensitivity penalty if contract is high and delay is present
    if (contractAmount > 10000 && averageDelayDays > 14) {
      score = Math.max(15, score - 8);
    }

    score = Math.round(score);

    let riskBand: "Low" | "Moderate" | "Elevated" | "High" = "Moderate";
    let depositRecommended = "20%";
    let recommendedTerms = "Net 15 with 20% deposit upfront.";
    let confidence: "High" | "Moderate" | "Preliminary" = "High";

    if (invoiceCount < 3) {
      confidence = "Preliminary";
    } else if (invoiceCount < 8) {
      confidence = "Moderate";
    }

    if (score >= 80) {
      riskBand = "Low";
      depositRecommended = "10% - 15%";
      recommendedTerms = "Standard Net 30 terms acceptable. High consistency.";
    } else if (score >= 60) {
      riskBand = "Moderate";
      depositRecommended = "25%";
      recommendedTerms = "Net 14 with 25% deposit. Progress billing on completion.";
    } else if (score >= 40) {
      riskBand = "Elevated";
      depositRecommended = "35%";
      recommendedTerms =
        "Require 35% deposit upfront. Bill weekly milestones. Cap outstanding exposure at $10k.";
    } else {
      riskBand = "High";
      depositRecommended = "50%";
      recommendedTerms =
        "Require 50% upfront deposit. Materials paid before delivery. Milestone releases required prior to work continuation.";
    }

    return NextResponse.json({
      success: true,
      data: {
        clientName,
        clientType,
        score,
        riskBand,
        confidence,
        invoiceCount,
        averageDelayDays,
        depositRecommended,
        recommendedTerms,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
