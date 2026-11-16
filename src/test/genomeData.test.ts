import { describe, it, expect } from 'vitest';
import { HIV_GENES } from '../data/genomeData';

describe('HIV-1 Proviral Genome Data', () => {
  it('contains all 9 canonical genes plus LTRs', () => {
    const geneIds = HIV_GENES.map((g) => g.id);
    expect(geneIds).toContain('gag');
    expect(geneIds).toContain('pol');
    expect(geneIds).toContain('env');
    expect(geneIds).toContain('tat');
    expect(geneIds).toContain('rev');
    expect(geneIds).toContain('nef');
    expect(geneIds).toContain('vif');
    expect(geneIds).toContain('vpr');
    expect(geneIds).toContain('vpu');
    expect(geneIds).toContain('ltr-5');
    expect(geneIds).toContain('ltr-3');
  });

  it('verifies gag and pol overlap for -1 ribosomal frameshift', () => {
    const gag = HIV_GENES.find((g) => g.id === 'gag')!;
    const pol = HIV_GENES.find((g) => g.id === 'pol')!;
    expect(pol.startBp).toBeLessThan(gag.endBp); // overlap region ~2085 to 2292
    expect(pol.proteinProducts).toContain('Reverse Transcriptase (RT / p66/p51)');
  });

  it('verifies env encodes gp120 and gp41', () => {
    const env = HIV_GENES.find((g) => g.id === 'env')!;
    expect(env.proteinProducts).toContain('gp120 (Surface / SU)');
    expect(env.proteinProducts).toContain('gp41 (Transmembrane / TM)');
    expect(env.threeDLinkTarget).toBe('virion_outer');
  });
});
