import { DnaNucleotide, BASE_PAIRS } from './dnaMath';

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const RNA_SEQUENCE: DnaNucleotide[] = [
  'U', 'A', 'C', 'G', 'A', 'U', 'C', 'C', 'G', 'U',
  'A', 'G', 'U', 'A', 'C', 'G', 'U', 'U', 'A', 'C',
];

export interface CDnaBase {
  index: number;
  nucleotide: DnaNucleotide;
  templateNucleotide: DnaNucleotide;
  pTemplate: Point3D;
  pCdna: Point3D;
  center: Point3D;
  color: string;
  hexColor: number;
  isTerminator?: boolean;
}

export interface ReverseTranscriptionParams {
  progress: number; // 0 to 1
  isDrugInhibited?: boolean;
  stopAtBp?: number;
  radius?: number;
  pitch?: number;
}

export interface ReverseTranscriptionState {
  progress: number;
  totalTemplateBases: number;
  synthesizedBpCount: number;
  chainTerminated: boolean;
  enzymePosition: Point3D;
  templateCurvePoints: Point3D[];
  cDnaCurvePoints: Point3D[];
  cDnaBases: CDnaBase[];
  inhibitorDrug?: {
    name: string;
    class: string;
    mechanism: string;
  };
}

export function getRnaComplement(base: DnaNucleotide): DnaNucleotide {
  if (base === 'U') return 'A';
  if (base === 'A') return 'T';
  if (base === 'C') return 'G';
  if (base === 'G') return 'C';
  return 'A';
}

export function calculateReverseTranscriptionState(
  params: ReverseTranscriptionParams
): ReverseTranscriptionState {
  const {
    progress = 0,
    isDrugInhibited = false,
    stopAtBp = 6,
    radius = 1.1,
    pitch = 3.2,
  } = params;

  const totalTemplateBases = RNA_SEQUENCE.length;
  const maxCalculated = Math.floor(totalTemplateBases * Math.min(1, Math.max(0, progress)));

  let chainTerminated = false;
  let synthesizedBpCount = maxCalculated;

  if (isDrugInhibited && maxCalculated >= stopAtBp) {
    chainTerminated = true;
    synthesizedBpCount = stopAtBp;
  }

  const c = pitch / (2 * Math.PI);
  const deltaPhi = 2.4;
  const stepAngle = (2 * Math.PI) / 10.5;
  const totalLength = c * (totalTemplateBases * stepAngle);

  // Template RNA curve samples
  const templateCurvePoints: Point3D[] = [];
  const sampleCount = totalTemplateBases * 4;
  for (let i = 0; i <= sampleCount; i++) {
    const t = (i / sampleCount) * (totalTemplateBases * stepAngle);
    const y = c * t - totalLength / 2;
    templateCurvePoints.push({
      x: radius * Math.cos(t),
      y,
      z: radius * Math.sin(t),
    });
  }

  // cDNA curve points (only synthesized up to synthesizedBpCount)
  const cDnaCurvePoints: Point3D[] = [];
  const cDnaSampleCount = Math.max(2, synthesizedBpCount * 4);
  for (let i = 0; i <= cDnaSampleCount; i++) {
    const t = (i / cDnaSampleCount) * (synthesizedBpCount * stepAngle);
    const y = c * t - totalLength / 2;
    cDnaCurvePoints.push({
      x: radius * Math.cos(t + deltaPhi),
      y,
      z: radius * Math.sin(t + deltaPhi),
    });
  }

  // Synthesized base pairs
  const cDnaBases: CDnaBase[] = [];
  for (let k = 0; k < synthesizedBpCount; k++) {
    const t = k * stepAngle;
    const y = c * t - totalLength / 2;

    const pTemplate: Point3D = {
      x: radius * Math.cos(t),
      y,
      z: radius * Math.sin(t),
    };

    const pCdna: Point3D = {
      x: radius * Math.cos(t + deltaPhi),
      y,
      z: radius * Math.sin(t + deltaPhi),
    };

    const center: Point3D = {
      x: (pTemplate.x + pCdna.x) / 2,
      y: (pTemplate.y + pCdna.y) / 2,
      z: (pTemplate.z + pCdna.z) / 2,
    };

    const templateNucleotide = RNA_SEQUENCE[k];
    const complement = getRnaComplement(templateNucleotide);
    const isTerminator = chainTerminated && k === stopAtBp - 1;

    cDnaBases.push({
      index: k,
      nucleotide: complement,
      templateNucleotide,
      pTemplate,
      pCdna,
      center,
      color: isTerminator ? '#ef4444' : BASE_PAIRS[complement].color,
      hexColor: isTerminator ? 0xef4444 : BASE_PAIRS[complement].hexColor,
      isTerminator,
    });
  }

  // Current active enzyme position
  const activeT = synthesizedBpCount * stepAngle;
  const enzymePosition: Point3D = {
    x: radius * Math.cos(activeT + deltaPhi / 2),
    y: c * activeT - totalLength / 2,
    z: radius * Math.sin(activeT + deltaPhi / 2),
  };

  return {
    progress,
    totalTemplateBases,
    synthesizedBpCount,
    chainTerminated,
    enzymePosition,
    templateCurvePoints,
    cDnaCurvePoints,
    cDnaBases,
    inhibitorDrug: isDrugInhibited
      ? {
          name: 'NRTI Analog (Zidovudine / Tenofovir)',
          class: 'Nucleoside Reverse Transcriptase Inhibitor (NRTI)',
          mechanism: 'Lacks 3\'-OH group, terminating viral DNA chain elongation upon incorporation.',
        }
      : undefined,
  };
}
