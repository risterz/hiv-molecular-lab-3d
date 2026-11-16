import { describe, it, expect } from 'vitest';
import { REPLICATION_STAGES } from '../data/replicationStages';

describe('ReplicationCycle data and stages', () => {
  it('contains exactly 6 sequential stages covering complete lifecycle', () => {
    expect(REPLICATION_STAGES.length).toBe(6);
    const steps = REPLICATION_STAGES.map((s) => s.step);
    expect(steps).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('includes Reverse Transcription at stage 3 with NRTI/NNRTI drug targets', () => {
    const stage3 = REPLICATION_STAGES.find((s) => s.step === 3);
    expect(stage3).toBeDefined();
    expect(stage3?.id).toBe('reverse_transcription');
    expect(stage3?.viralProteins).toContain('Reverse Transcriptase (p66/p51 heterodimer)');
    const targets = stage3?.antiretroviralTargets.join(' ');
    expect(targets).toContain('NRTIs');
    expect(targets).toContain('Tenofovir');
  });

  it('includes Integration at stage 4 with INSTI drug targets', () => {
    const stage4 = REPLICATION_STAGES.find((s) => s.step === 4);
    expect(stage4).toBeDefined();
    expect(stage4?.id).toBe('integration');
    const targets = stage4?.antiretroviralTargets.join(' ');
    expect(targets).toContain('INSTIs');
    expect(targets).toContain('Dolutegravir');
  });

  it('includes Assembly and Protease maturation at stage 6', () => {
    const stage6 = REPLICATION_STAGES.find((s) => s.step === 6);
    expect(stage6).toBeDefined();
    expect(stage6?.id).toBe('assembly');
    const targets = stage6?.antiretroviralTargets.join(' ');
    expect(targets).toContain('Protease Inhibitors');
  });
});
