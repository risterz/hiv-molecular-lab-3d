export type DnaNucleotide = 'A' | 'T' | 'G' | 'C' | 'U';

export interface BasePairInfo {
  name: string;
  fullName: string;
  type: 'purine' | 'pyrimidine';
  complement: DnaNucleotide;
  hBonds: number;
  color: string;
  hexColor: number;
}

export const BASE_PAIRS: Record<DnaNucleotide, BasePairInfo> = {
  A: {
    name: 'A',
    fullName: 'Adenine',
    type: 'purine',
    complement: 'T',
    hBonds: 2,
    color: '#10b981', // emerald
    hexColor: 0x10b981,
  },
  T: {
    name: 'T',
    fullName: 'Thymine',
    type: 'pyrimidine',
    complement: 'A',
    hBonds: 2,
    color: '#f43f5e', // rose
    hexColor: 0xf43f5e,
  },
  G: {
    name: 'G',
    fullName: 'Guanine',
    type: 'purine',
    complement: 'C',
    hBonds: 3,
    color: '#f59e0b', // amber
    hexColor: 0xf59e0b,
  },
  C: {
    name: 'C',
    fullName: 'Cytosine',
    type: 'pyrimidine',
    complement: 'G',
    hBonds: 3,
    color: '#06b6d4', // cyan
    hexColor: 0x06b6d4,
  },
  U: {
    name: 'U',
    fullName: 'Uracil (RNA)',
    type: 'pyrimidine',
    complement: 'A',
    hBonds: 2,
    color: '#fb923c', // orange
    hexColor: 0xfb923c,
  },
};

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface DnaBasePairCoord {
  index: number;
  base1: DnaNucleotide;
  base2: DnaNucleotide;
  p1: Point3D;
  p2: Point3D;
  center: Point3D;
  hBonds: number;
  t: number;
}

export interface DnaParams {
  turns: number;
  bpPerTurn: number;
  radius: number;
  pitch: number;
  deltaPhi?: number; // Major / minor groove angle offset in radians
}

export interface DnaCalculationResult {
  strand1: Point3D[];
  strand2: Point3D[];
  basePairs: DnaBasePairCoord[];
  totalBasePairs: number;
  totalLength: number;
}

/**
 * Calculates 3D coordinates of right-handed B-DNA double helix.
 * Uses parametric equations:
 * P1(t) = (R*cos(t), (pitch / (2*PI)) * t, R*sin(t))
 * P2(t) = (R*cos(t + deltaPhi), (pitch / (2*PI)) * t, R*sin(t + deltaPhi))
 */
export function calculateDnaPoints(params: DnaParams): DnaCalculationResult {
  const {
    turns = 2,
    bpPerTurn = 10.5,
    radius = 1.0,
    pitch = 3.4,
    deltaPhi = 2.4, // ~137.5 deg minor groove vs ~222.5 deg major groove
  } = params;

  const totalBasePairs = Math.round(turns * bpPerTurn);
  const totalAngle = turns * 2 * Math.PI;
  const c = pitch / (2 * Math.PI); // Vertical rise per radian
  const totalLength = c * totalAngle;

  const samplePointsPerTurn = 60;
  const totalSamples = turns * samplePointsPerTurn;
  const strand1: Point3D[] = [];
  const strand2: Point3D[] = [];

  // Generate smooth backbone curve samples
  for (let i = 0; i <= totalSamples; i++) {
    const t = (i / totalSamples) * totalAngle;
    const y = c * t - totalLength / 2; // Center along Y axis

    strand1.push({
      x: radius * Math.cos(t),
      y,
      z: radius * Math.sin(t),
    });

    strand2.push({
      x: radius * Math.cos(t + deltaPhi),
      y,
      z: radius * Math.sin(t + deltaPhi),
    });
  }

  // Pre-selected sequence simulating viral proviral DNA segment
  const sampleSequence: DnaNucleotide[] = [
    'A', 'T', 'G', 'C', 'C', 'A', 'T', 'G', 'T', 'A',
    'A', 'C', 'G', 'T', 'A', 'G', 'C', 'T', 'T', 'A', 'G',
  ];

  const basePairs: DnaBasePairCoord[] = [];
  const stepAngle = (2 * Math.PI) / bpPerTurn;

  for (let k = 0; k < totalBasePairs; k++) {
    const t = k * stepAngle;
    const y = c * t - totalLength / 2;

    const p1: Point3D = {
      x: radius * Math.cos(t),
      y,
      z: radius * Math.sin(t),
    };

    const p2: Point3D = {
      x: radius * Math.cos(t + deltaPhi),
      y,
      z: radius * Math.sin(t + deltaPhi),
    };

    const center: Point3D = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
      z: (p1.z + p2.z) / 2,
    };

    const base1 = sampleSequence[k % sampleSequence.length];
    const base2 = BASE_PAIRS[base1].complement;

    basePairs.push({
      index: k,
      base1,
      base2,
      p1,
      p2,
      center,
      hBonds: BASE_PAIRS[base1].hBonds,
      t,
    });
  }

  return {
    strand1,
    strand2,
    basePairs,
    totalBasePairs,
    totalLength,
  };
}
