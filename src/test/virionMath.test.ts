import { describe, it, expect } from 'vitest';
import {
  generateFibonacciSpherePoints,
  calculateCapsidDimensions,
  generateRnaCoilPoints,
  VIRION_HOTSPOTS,
} from '../utils/virionMath';

describe('virionMath', () => {
  it('generates uniform spherical points via Fibonacci lattice', () => {
    const radius = 4.0;
    const points = generateFibonacciSpherePoints(72, radius);
    expect(points.length).toBe(72);

    // Ensure all points lie precisely on sphere radius
    points.forEach((p) => {
      const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
      expect(dist).toBeCloseTo(radius, 3);
    });

    // Check that points are distributed across all octants
    const hasPositiveY = points.some((p) => p.y > 2.0);
    const hasNegativeY = points.some((p) => p.y < -2.0);
    const hasPositiveX = points.some((p) => p.x > 2.0);
    const hasNegativeX = points.some((p) => p.x < -2.0);
    expect(hasPositiveY && hasNegativeY && hasPositiveX && hasNegativeX).toBe(true);
  });

  it('safely handles edge cases like count <= 1 without division by zero', () => {
    const single = generateFibonacciSpherePoints(1, 4.0);
    expect(single.length).toBe(1);
    expect(single[0].y).toBe(4.0);
    expect(Number.isNaN(single[0].x)).toBe(false);

    const empty = generateFibonacciSpherePoints(0, 4.0);
    expect(empty.length).toBe(0);
  });

  it('calculates conical capsid dimensions and boundary checks', () => {
    const capsid = calculateCapsidDimensions({ height: 4.8, topRadius: 1.4, bottomRadius: 0.7 });
    expect(capsid.topRadius).toBe(1.4);
    expect(capsid.bottomRadius).toBe(0.7);
    expect(capsid.height).toBe(4.8);
    expect(capsid.taperRatio).toBeCloseTo(2.0, 2);
  });

  it('generates twin coiled ssRNA genome curves', () => {
    const coils = generateRnaCoilPoints({ loops: 8, height: 3.5, radius: 0.5 });
    expect(coils.strandA.length).toBeGreaterThan(30);
    expect(coils.strandB.length).toBeGreaterThan(30);
    expect(coils.strandA.length).toBe(coils.strandB.length);
  });

  it('defines essential virion anatomy hotspot metadata', () => {
    expect(VIRION_HOTSPOTS.length).toBeGreaterThanOrEqual(6);
    const ids = VIRION_HOTSPOTS.map((h) => h.id);
    expect(ids).toContain('gp120');
    expect(ids).toContain('gp41');
    expect(ids).toContain('capsid_p24');
    expect(ids).toContain('reverse_transcriptase');
    expect(ids).toContain('integrase');
    expect(ids).toContain('protease');
  });
});
