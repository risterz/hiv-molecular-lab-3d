import { describe, it, expect } from 'vitest';
import {
  calculateReverseTranscriptionState,
  RNA_SEQUENCE,
  ReverseTranscriptionParams,
} from '../utils/reverseTranscriptionMath';

describe('reverseTranscriptionMath', () => {
  it('correctly transitions RNA template to cDNA strand across elongation progress', () => {
    const params: ReverseTranscriptionParams = {
      progress: 0.6,
      isDrugInhibited: false,
    };
    const state = calculateReverseTranscriptionState(params);

    expect(state.totalTemplateBases).toBe(RNA_SEQUENCE.length);
    expect(state.synthesizedBpCount).toBe(Math.floor(RNA_SEQUENCE.length * 0.6));
    expect(state.chainTerminated).toBe(false);
    expect(state.enzymePosition).toBeDefined();
    expect(state.cDnaBases.length).toBe(state.synthesizedBpCount);

    // Verify nucleotide complement rules with Uracil
    // Uracil in RNA templates pairs with Adenine in cDNA
    // Adenine in RNA templates pairs with Thymine in cDNA
    state.cDnaBases.forEach((base, idx) => {
      const templateBase = RNA_SEQUENCE[idx];
      if (templateBase === 'U') expect(base.nucleotide).toBe('A');
      if (templateBase === 'A') expect(base.nucleotide).toBe('T');
      if (templateBase === 'C') expect(base.nucleotide).toBe('G');
      if (templateBase === 'G') expect(base.nucleotide).toBe('C');
    });
  });

  it('correctly halts synthesis and flags chain termination when NRTI inhibitor is active', () => {
    const params: ReverseTranscriptionParams = {
      progress: 0.8,
      isDrugInhibited: true,
      stopAtBp: 6,
    };
    const state = calculateReverseTranscriptionState(params);

    expect(state.chainTerminated).toBe(true);
    expect(state.synthesizedBpCount).toBe(6);
    expect(state.cDnaBases.length).toBe(6);
    expect(state.inhibitorDrug).toBeDefined();
    expect(state.inhibitorDrug?.name).toContain('NRTI');
  });
});
