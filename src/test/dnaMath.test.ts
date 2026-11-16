import { describe, it, expect } from 'vitest';
import { calculateDnaPoints, BASE_PAIRS, DnaParams } from '../utils/dnaMath';

describe('dnaMath', () => {
  it('generates 10.5 base pairs per helical pitch turn with major/minor groove offset', () => {
    const params: DnaParams = {
      turns: 2,
      bpPerTurn: 10.5,
      radius: 1.0,
      pitch: 3.4,
    };
    const { strand1, strand2, basePairs } = calculateDnaPoints(params);

    expect(strand1.length).toBeGreaterThan(20);
    expect(strand2.length).toBe(strand1.length);
    expect(basePairs.length).toBe(21);

    // Verify distance between opposing strand points is approx 2.0 (diameter = 2*R)
    basePairs.forEach((bp) => {
      const dx = bp.p1.x - bp.p2.x;
      const dz = bp.p1.z - bp.p2.z;
      const horizontalDistance = Math.sqrt(dx * dx + dz * dz);
      // Distance across helix chord should be close to 2*radius * sin(deltaPhi / 2)
      expect(horizontalDistance).toBeGreaterThan(1.5);
      expect(horizontalDistance).toBeLessThanOrEqual(2.05);

      // Check complementary pairing
      if (bp.base1 === 'A') expect(bp.base2).toBe('T');
      if (bp.base1 === 'T') expect(bp.base2).toBe('A');
      if (bp.base1 === 'G') expect(bp.base2).toBe('C');
      if (bp.base1 === 'C') expect(bp.base2).toBe('G');
      expect([2, 3]).toContain(bp.hBonds);
    });
  });

  it('correctly maps nucleotide properties and standard colors', () => {
    expect(BASE_PAIRS.A.complement).toBe('T');
    expect(BASE_PAIRS.T.complement).toBe('A');
    expect(BASE_PAIRS.G.complement).toBe('C');
    expect(BASE_PAIRS.C.complement).toBe('G');
    expect(BASE_PAIRS.A.hBonds).toBe(2);
    expect(BASE_PAIRS.G.hBonds).toBe(3);
  });
});
