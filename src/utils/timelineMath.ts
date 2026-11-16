/**
 * Mathematical modeling of HIV clinical progression:
 * Simulates CD4+ T-cell count (cells/uL) and HIV-1 RNA Viral Load (copies/mL)
 * over time (Weeks 0-12 Acute, Years 1-12 Chronic), with realistic biphasic
 * decay kinetics upon Antiretroviral Therapy (ART) initiation.
 */

export interface SimulationPoint {
  timeWeeks: number;
  timeLabel: string;
  phase: 'acute' | 'chronic_early' | 'chronic_mid' | 'chronic_late' | 'advanced_aids';
  cd4Count: number; // cells/uL
  viralLoad: number; // copies/mL (exact)
  viralLoadLog10: number; // log10 copies/mL
  isOnArt: boolean;
  oiRiskLevel: 'none' | 'low' | 'moderate' | 'high' | 'critical';
  clinicalNote: string;
}

export interface ArtConfig {
  enabled: boolean;
  startWeek: number; // When ART starts (e.g., 24 for 6 mos, 156 for 3 yrs)
  adherencePercent: number; // 0 - 100
}

/**
 * Calculate natural history (untreated) vs ART-treated CD4 and Viral Load.
 */
export function calculateTimelinePoint(timeWeeks: number, art: ArtConfig): SimulationPoint {
  const isTreated = art.enabled && timeWeeks >= art.startWeek;
  const weeksOnArt = isTreated ? timeWeeks - art.startWeek : 0;

  // 1. Natural History Baseline (Untreated)
  let baseCd4: number;
  let baseVl: number;
  let phase: SimulationPoint['phase'];
  let oiRisk: SimulationPoint['oiRiskLevel'] = 'none';
  let clinicalNote = '';

  if (timeWeeks <= 4) {
    // Acute Infection Peak (0 - 4 weeks)
    // Massive viremia, transient CD4 drop
    const t = timeWeeks / 4;
    baseVl = Math.pow(10, 3.5 + 2.8 * Math.sin(t * Math.PI * 0.5)); // reaches ~2,000,000 copies/mL
    baseCd4 = 1000 - 450 * Math.sin(t * Math.PI * 0.5); // drops to ~550
    phase = 'acute';
    clinicalNote = 'Acute seroconversion; high viremia, flu-like symptoms possible.';
  } else if (timeWeeks <= 12) {
    // Post-acute viral set point establishment (4 - 12 weeks)
    const t = (timeWeeks - 4) / 8;
    baseVl = Math.pow(10, 6.3 - 1.8 * t); // drops to set point ~30,000 copies/mL
    baseCd4 = 550 + 150 * t; // transient rebound to ~700
    phase = 'acute';
    clinicalNote = 'Viral set point establishing; cytotoxic T-lymphocyte response.';
  } else if (timeWeeks <= 260) {
    // Chronic Asymptomatic / Latency (Year 1 - Year 5, weeks 12 - 260)
    const t = (timeWeeks - 12) / 248;
    baseVl = Math.pow(10, 4.5 + 0.4 * t); // slow creep ~30k to ~80k
    baseCd4 = 700 - 250 * t; // 700 down to 450
    phase = t < 0.5 ? 'chronic_early' : 'chronic_mid';
    clinicalNote = 'Clinical latency; active replication in lymph nodes, gradual CD4 decline.';
  } else if (timeWeeks <= 468) {
    // Symptomatic / Late Chronic (Year 5 - Year 9, weeks 260 - 468)
    const t = (timeWeeks - 260) / 208;
    baseVl = Math.pow(10, 4.9 + 0.7 * t); // 80k to 400k
    baseCd4 = 450 - 250 * t; // 450 down to 200 (AIDS threshold)
    phase = 'chronic_late';
    clinicalNote = 'Immunodeficiency advancing; mild symptoms, oral candidiasis/thrush risk.';
  } else {
    // Advanced HIV / AIDS (Year 9+, CD4 < 200)
    const t = Math.min((timeWeeks - 468) / 156, 1.0);
    baseVl = Math.pow(10, 5.6 + 0.7 * t); // up to 2 million
    baseCd4 = Math.max(200 - 180 * t, 20); // down to 20
    phase = 'advanced_aids';
    clinicalNote = 'AIDS diagnosis (CD4 < 200). High vulnerability to life-threatening opportunistic infections.';
  }

  // 2. ART Treatment Dynamics (Biphasic viral decay + Immune reconstitution)
  let finalCd4 = baseCd4;
  let finalVl = baseVl;

  if (isTreated) {
    const adherence = Math.max(0, Math.min(100, art.adherencePercent)) / 100;
    
    // Biphasic viral clearance:
    // Phase 1 (rapid clearance of free virus & short-lived CD4 cells, half-life ~1-2 days)
    // Phase 2 (decay of infected macrophages & resting cells, modern INSTI regimen ~12-16 weeks to <50)
    const decayPhase1 = Math.exp(-0.85 * weeksOnArt); // rapid early drop
    const decayPhase2 = Math.exp(-0.28 * weeksOnArt); // suppression to undetectable <50 by week 16-24

    const suppressedVlTarget = adherence >= 0.95 ? 20 : (adherence >= 0.8 ? 200 : 2000);
    const suppressedFraction = 1 - (decayPhase1 * 0.9 + decayPhase2 * 0.1);
    
    finalVl = Math.max(
      suppressedVlTarget,
      baseVl * (1 - suppressedFraction * adherence) + suppressedVlTarget * suppressedFraction * adherence
    );

    // CD4 Recovery (Immune reconstitution):
    // Typically gains 100-150 cells in first year, then 50/year toward normal (600-900)
    const cd4GainRate = adherence >= 0.9 ? 1.0 : (adherence >= 0.8 ? 0.6 : 0.2);
    const recoveryCeiling = 850;
    const cd4Boost = (recoveryCeiling - baseCd4) * (1 - Math.exp(-0.035 * weeksOnArt)) * cd4GainRate;
    finalCd4 = Math.min(recoveryCeiling, baseCd4 + cd4Boost);

    if (finalVl <= 50) {
      clinicalNote = 'Undetectable viral load (<50 copies/mL). U=U: Zero risk of sexual transmission. Immune reconstitution active.';
    } else if (finalVl <= 200) {
      clinicalNote = 'Virologically suppressed (<200 copies/mL). Immune system regenerating.';
    } else {
      clinicalNote = 'Partial viral suppression. Suboptimal adherence may risk drug resistance.';
    }
  }

  // Determine Opportunistic Infection (OI) Risk
  if (finalCd4 > 500) {
    oiRisk = 'none';
  } else if (finalCd4 > 350) {
    oiRisk = 'low';
  } else if (finalCd4 > 200) {
    oiRisk = 'moderate';
  } else if (finalCd4 > 50) {
    oiRisk = 'high';
  } else {
    oiRisk = 'critical';
  }

  // Format time label
  let timeLabel = '';
  if (timeWeeks < 52) {
    timeLabel = `Wk ${Math.round(timeWeeks)}`;
  } else {
    const yr = (timeWeeks / 52).toFixed(1);
    timeLabel = `Yr ${yr}`;
  }

  return {
    timeWeeks,
    timeLabel,
    phase,
    cd4Count: Math.round(finalCd4),
    viralLoad: Math.round(finalVl),
    viralLoadLog10: Math.round(Math.log10(Math.max(1, finalVl)) * 100) / 100,
    isOnArt: isTreated,
    oiRiskLevel: oiRisk,
    clinicalNote,
  };
}

/**
 * Generate full simulation dataset for visualization.
 * 624 weeks = 12 years.
 */
export function generateTimelineSeries(art: ArtConfig, totalWeeks = 624, step = 8): SimulationPoint[] {
  const points: SimulationPoint[] = [];
  
  // Include fine-grained resolution in first 12 weeks
  for (let w = 0; w <= 12; w += 2) {
    points.push(calculateTimelinePoint(w, art));
  }
  
  // Then coarse resolution over the 12 years
  for (let w = 16; w <= totalWeeks; w += step) {
    points.push(calculateTimelinePoint(w, art));
  }

  return points;
}
