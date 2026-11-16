import { describe, it, expect } from 'vitest';
import { calculateTimelinePoint, generateTimelineSeries } from './timelineMath';

describe('timelineMath', () => {
  it('calculates acute peak at week 4 without ART', () => {
    const pt = calculateTimelinePoint(4, { enabled: false, startWeek: 0, adherencePercent: 100 });
    expect(pt.phase).toBe('acute');
    expect(pt.viralLoad).toBeGreaterThan(1000000); // > 1 million copies
    expect(pt.cd4Count).toBeLessThan(700);
  });

  it('calculates AIDS progression at year 10 (520 weeks) without treatment', () => {
    const pt = calculateTimelinePoint(520, { enabled: false, startWeek: 0, adherencePercent: 100 });
    expect(pt.phase).toBe('advanced_aids');
    expect(pt.cd4Count).toBeLessThan(200); // AIDS definition
    expect(pt.oiRiskLevel).toBe('high');
  });

  it('suppresses viral load to undetectable (<50) after 24 weeks of ART with 100% adherence', () => {
    const startWeek = 52; // start at year 1
    const pt = calculateTimelinePoint(startWeek + 24, { enabled: true, startWeek, adherencePercent: 100 });
    expect(pt.isOnArt).toBe(true);
    expect(pt.viralLoad).toBeLessThanOrEqual(50);
    expect(pt.clinicalNote).toContain('Undetectable');
  });

  it('generates consistent timeline series dataset', () => {
    const series = generateTimelineSeries({ enabled: true, startWeek: 104, adherencePercent: 95 });
    expect(series.length).toBeGreaterThan(50);
    expect(series[0].timeWeeks).toBe(0);
    expect(series[series.length - 1].timeWeeks).toBe(624);
  });
});
