import { describe, it, expect } from 'vitest';
import { RESISTANCE_MUTATIONS } from '../data/resistanceData';
import { GLOBAL_METRICS, REGIONAL_DATA } from '../data/globalHivData';

describe('Biophysical Resistance & Global Epidemiology Data', () => {
  it('validates M184V mutation steric clash and 3TC/FTC resistance', () => {
    const m184v = RESISTANCE_MUTATIONS.find((m) => m.id === 'm184v');
    expect(m184v).toBeDefined();
    expect(m184v?.codonNumber).toBe(184);
    expect(m184v?.affectedDrugs).toContain('Lamivudine (3TC)');
    expect(m184v?.affectedDrugs).toContain('Emtricitabine (FTC)');
    expect(m184v?.sparedDrugs).toContain('Tenofovir (TDF/TAF)');
    // Clash distance must be less than 2.0 Angstroms
    expect(m184v?.stericClashDistance).toBeLessThan(2.0);
  });

  it('validates K103N NNRTI hydrophobic pocket closing mechanism', () => {
    const k103n = RESISTANCE_MUTATIONS.find((m) => m.id === 'k103n');
    expect(k103n).toBeDefined();
    expect(k103n?.codonNumber).toBe(103);
    expect(k103n?.affectedDrugs).toContain('Efavirenz (EFV)');
    expect(k103n?.sparedDrugs).toContain('Doravirine (DOR)');
  });

  it('validates UNAIDS 95-95-95 global target calculation', () => {
    expect(GLOBAL_METRICS.globalDiagnosed).toBe(86);
    expect(GLOBAL_METRICS.globalOnArt).toBe(89);
    expect(GLOBAL_METRICS.globalSuppressed).toBe(93);

    const calculatedTotal =
      (GLOBAL_METRICS.globalDiagnosed / 100) *
      (GLOBAL_METRICS.globalOnArt / 100) *
      (GLOBAL_METRICS.globalSuppressed / 100);

    expect(Math.round(calculatedTotal * 100)).toBe(71);
  });

  it('validates regional epidemiology coverage and ensures all 6 regions are represented', () => {
    expect(REGIONAL_DATA.length).toBe(6);
    REGIONAL_DATA.forEach((reg) => {
      expect(reg.diagnosedPercent).toBeGreaterThan(50);
      expect(reg.diagnosedPercent).toBeLessThanOrEqual(100);
      expect(reg.onArtPercent).toBeGreaterThan(50);
      expect(reg.onArtPercent).toBeLessThanOrEqual(100);
      expect(reg.virallySuppressedPercent).toBeGreaterThan(50);
      expect(reg.virallySuppressedPercent).toBeLessThanOrEqual(100);
      expect(reg.highlights.length).toBeGreaterThan(10);
      expect(reg.keyChallenge.length).toBeGreaterThan(10);
    });
  });
});
