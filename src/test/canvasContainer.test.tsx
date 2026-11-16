import { describe, it, expect } from 'vitest';
import { ANATOMY_DETAILS } from '../data/anatomyData';

describe('CanvasContainer data and components', () => {
  it('loads all core anatomy entries with clinical significance', () => {
    const keys = Object.keys(ANATOMY_DETAILS);
    expect(keys.length).toBeGreaterThanOrEqual(8);
    expect(ANATOMY_DETAILS.gp120.name).toContain('gp120');
    expect(ANATOMY_DETAILS.capsid_p24.therapeutics).toContain(
      'Lenacapavir (first-in-class multi-stage capsid inhibitor with 6-month subcutaneous dosing)'
    );
    expect(ANATOMY_DETAILS.reverse_transcriptase.category).toBe('Enzyme');
  });

  it('verifies color accents are defined for all models', () => {
    Object.values(ANATOMY_DETAILS).forEach((item) => {
      expect(item.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(item.therapeutics.length).toBeGreaterThan(0);
    });
  });
});
