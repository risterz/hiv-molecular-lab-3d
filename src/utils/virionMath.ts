export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface CapsidParams {
  height: number;
  topRadius: number;
  bottomRadius: number;
}

export interface CapsidDimensions extends CapsidParams {
  taperRatio: number;
}

export interface VirionHotspot {
  id: string;
  name: string;
  category: 'envelope' | 'matrix' | 'capsid' | 'enzyme' | 'genome';
  description: string;
  clinicalSignificance: string;
  anchor: Point3D;
  color: string;
}

export const VIRION_HOTSPOTS: VirionHotspot[] = [
  {
    id: 'gp120',
    name: 'gp120 Surface Glycoprotein',
    category: 'envelope',
    description: 'Trimeric viral attachment protein that recognizes and binds host CD4 receptors on helper T-lymphocytes.',
    clinicalSignificance: 'Target of entry inhibitors (e.g., Fostemsavir) and neutralizing antibody research.',
    anchor: { x: 0, y: 4.6, z: 0 },
    color: '#f43f5e',
  },
  {
    id: 'gp41',
    name: 'gp41 Transmembrane Glycoprotein',
    category: 'envelope',
    description: 'Non-covalently bound stalk holding gp120 to the lipid membrane; mediates viral-to-host membrane fusion.',
    clinicalSignificance: 'Target of fusion inhibitors (e.g., Enfuvirtide/T-20).',
    anchor: { x: 0, y: 4.1, z: 0 },
    color: '#fb7185',
  },
  {
    id: 'lipid_membrane',
    name: 'Lipid Bilayer Envelope',
    category: 'envelope',
    description: 'Host cell-derived plasma membrane acquired during viral budding, studded with viral glycoproteins.',
    clinicalSignificance: 'Vulnerable to detergents, alcohol, and external environmental desiccation.',
    anchor: { x: 3.8, y: 0, z: 0 },
    color: '#0284c7',
  },
  {
    id: 'matrix_p17',
    name: 'p17 Matrix Shell',
    category: 'matrix',
    description: 'Icosahedral protein shell lining the inner surface of the viral membrane, maintaining virion structural integrity.',
    clinicalSignificance: 'Facilitates targeting of viral genome pre-integration complexes to the nucleus.',
    anchor: { x: 3.2, y: 0, z: 0 },
    color: '#6366f1',
  },
  {
    id: 'capsid_p24',
    name: 'p24 Conical Capsid Core',
    category: 'capsid',
    description: 'Fullerene cone assembled from ~1,500 copies of p24 protein organized into hexamer and pentamer rings.',
    clinicalSignificance: 'Target of capsid inhibitors (e.g., Lenacapavir); standard clinical biomarker in 4th-gen HIV p24 antigen tests.',
    anchor: { x: 1.3, y: 1.0, z: 0 },
    color: '#06b6d4',
  },
  {
    id: 'reverse_transcriptase',
    name: 'Reverse Transcriptase (p66/p51)',
    category: 'enzyme',
    description: 'Viral heterodimer RNA-dependent DNA polymerase that converts (+)ssRNA genome into double-stranded proviral DNA.',
    clinicalSignificance: 'Primary target of NRTIs (Tenofovir, Emtricitabine) and NNRTIs (Efavirenz, Doravirine).',
    anchor: { x: -0.4, y: 0.2, z: 0.5 },
    color: '#10b981',
  },
  {
    id: 'integrase',
    name: 'Integrase (p32)',
    category: 'enzyme',
    description: 'Enzyme catalyzing covalent insertion of viral cDNA into human host chromosomal DNA.',
    clinicalSignificance: 'Target of INSTIs (Dolutegravir, Bictegravir, Cabotegravir) - cornerstone of first-line ART.',
    anchor: { x: 0.4, y: -0.4, z: 0.5 },
    color: '#a855f7',
  },
  {
    id: 'protease',
    name: 'Protease (p10)',
    category: 'enzyme',
    description: 'Aspartyl protease dimer that cleaves Gag and Gag-Pol polyproteins into functional units during virion maturation.',
    clinicalSignificance: 'Target of Protease Inhibitors (Darunavir, Atazanavir) preventing maturation into infectious virus.',
    anchor: { x: 0.0, y: -1.2, z: 0.5 },
    color: '#f59e0b',
  },
  {
    id: 'rna_genome',
    name: 'Twin (+)ssRNA Genome',
    category: 'genome',
    description: 'Two identical positive-sense single-stranded RNA molecules (~9.7 kb each) coated with nucleocapsid p7 proteins.',
    clinicalSignificance: 'Quantified in blood plasma via HIV viral load PCR tests to measure therapy efficacy and U=U status.',
    anchor: { x: 0.0, y: 0.6, z: -0.2 },
    color: '#ec4899',
  },
];

/**
 * Distributes N points uniformly across a sphere using the Fibonacci lattice (golden spiral).
 */
export function generateFibonacciSpherePoints(count: number, radius: number): Point3D[] {
  if (count <= 0) return [];
  if (count === 1) return [{ x: 0, y: radius, z: 0 }];

  const points: Point3D[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.3999632297 rad

  for (let i = 0; i < count; i++) {
    const y = (1 - (2 * i) / (count - 1)) * radius; // y ranges from +radius to -radius
    const radiusAtY = Math.sqrt(Math.max(0, radius * radius - y * y));
    const theta = goldenAngle * i;

    const x = radiusAtY * Math.cos(theta);
    const z = radiusAtY * Math.sin(theta);

    points.push({ x, y, z });
  }

  return points;
}

export function calculateCapsidDimensions(params: CapsidParams): CapsidDimensions {
  const taperRatio = params.topRadius / params.bottomRadius;
  return {
    ...params,
    taperRatio,
  };
}

/**
 * Generates twin helical coil points for diploid viral ssRNA inside conical capsid.
 */
export function generateRnaCoilPoints(options: {
  loops: number;
  height: number;
  radius: number;
}): { strandA: Point3D[]; strandB: Point3D[] } {
  const { loops = 8, height = 3.5, radius = 0.5 } = options;
  const samples = loops * 20;
  const strandA: Point3D[] = [];
  const strandB: Point3D[] = [];

  for (let i = 0; i <= samples; i++) {
    const progress = i / samples; // 0 to 1
    const y = progress * height - height / 2;
    // Taper radius matching conical capsid (wider at top, narrower at bottom)
    const localRadius = radius * (0.6 + 0.6 * progress);
    const theta = progress * loops * 2 * Math.PI;

    strandA.push({
      x: localRadius * Math.cos(theta) - 0.15,
      y,
      z: localRadius * Math.sin(theta),
    });

    strandB.push({
      x: localRadius * Math.cos(theta + Math.PI) + 0.15,
      y,
      z: localRadius * Math.sin(theta + Math.PI),
    });
  }

  return { strandA, strandB };
}
