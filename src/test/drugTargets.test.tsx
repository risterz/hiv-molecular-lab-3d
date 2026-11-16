import { describe, it, expect } from 'vitest';
import { DRUG_CLASSES, U_EQUALS_U_SCIENCE } from '../data/drugMechanisms';

describe('DrugTargets and Prevention data', () => {
  it('covers all major antiretroviral drug classes', () => {
    expect(DRUG_CLASSES.length).toBeGreaterThanOrEqual(5);
    const acronyms = DRUG_CLASSES.map((c) => c.acronym);
    expect(acronyms).toContain('INSTI');
    expect(acronyms).toContain('NRTI');
    expect(acronyms).toContain('NNRTI');
    expect(acronyms).toContain('PI');
    expect(acronyms).toContain('Capsid');
  });

  it('validates U=U scientific consensus and citations', () => {
    expect(U_EQUALS_U_SCIENCE.statement).toContain('Undetectable = Untransmittable');
    expect(U_EQUALS_U_SCIENCE.clinicalThreshold).toContain('<200 copies/mL');
    expect(U_EQUALS_U_SCIENCE.landmarkStudies.length).toBeGreaterThanOrEqual(3);
    const studyNames = U_EQUALS_U_SCIENCE.landmarkStudies.map((s) => s.name).join(' ');
    expect(studyNames).toContain('PARTNER');
    expect(studyNames).toContain('HPTN 052');
  });
});
