/**
 * Antiretroviral Drug Resistance Mutations Data & Biophysical Mechanics.
 */

export interface ResistanceMutation {
  id: string;
  name: string;
  targetEnzyme: 'Reverse Transcriptase' | 'Integrase' | 'Protease';
  wildTypeResidue: string;
  mutantResidue: string;
  codonNumber: number;
  affectedDrugClasses: string[];
  affectedDrugs: string[];
  sparedDrugs: string[];
  foldResistance: string;
  stericClashDistance: number; // Angstroms (clash < 2.0A, normal > 3.0A)
  fitnessImpact: string;
  molecularBiophysics: string;
  clinicalGuideline: string;
}

export const RESISTANCE_MUTATIONS: ResistanceMutation[] = [
  {
    id: 'm184v',
    name: 'M184V (RT Active Site)',
    targetEnzyme: 'Reverse Transcriptase',
    wildTypeResidue: 'Methionine (Met)',
    mutantResidue: 'Valine (Val)',
    codonNumber: 184,
    affectedDrugClasses: ['NRTI (Cytidine analogs)'],
    affectedDrugs: ['Lamivudine (3TC)', 'Emtricitabine (FTC)'],
    sparedDrugs: ['Tenofovir (TDF/TAF)', 'Zidovudine (AZT)', 'Abacavir (partial)'],
    foldResistance: '>1,000-fold high-level resistance to 3TC & FTC',
    stericClashDistance: 1.7, // 1.7 Angstroms - severe clash with oxathiolane ring
    fitnessImpact: 'Reduces viral replication fitness by ~40-60% and increases polymerase fidelity; hypersensitizes virus to Tenofovir and AZT.',
    molecularBiophysics:
      'The beta-branched sidechain of Valine (-CH(CH3)2) projects directly into the dNTP pocket adjacent to the catalytic YMDD loop. It physically collides with the unnatural oxathiolane ring of 3TC/FTC, preventing its incorporation into viral cDNA.',
    clinicalGuideline:
      'Often maintained intentionally in failing second-line regimens to preserve viral fitness crippling and Tenofovir hypersensitivity (e.g. NADIA & 2SD trials).',
  },
  {
    id: 'k103n',
    name: 'K103N (NNRTI Hydrophobic Pocket)',
    targetEnzyme: 'Reverse Transcriptase',
    wildTypeResidue: 'Lysine (Lys)',
    mutantResidue: 'Asparagine (Asn)',
    codonNumber: 103,
    affectedDrugClasses: ['NNRTI (1st Generation)'],
    affectedDrugs: ['Efavirenz (EFV)', 'Nevirapine (NVP)'],
    sparedDrugs: ['Etravirine (ETR)', 'Rilpivirine (RPV)', 'Doravirine (DOR)'],
    foldResistance: '20 to 50-fold resistance to 1st-gen NNRTIs',
    stericClashDistance: 1.9,
    fitnessImpact: 'Minimal fitness penalty (<10% cost); can persist in latent proviral reservoirs indefinitely even after drug removal.',
    molecularBiophysics:
      'In wild-type RT, Lys103 allows the hydrophobic pocket entrance to breathe open. In K103N, Asparagine-103 forms a novel hydrogen bond network with Tyr188, locking the entrance closed and denying NNRTI access without altering catalytic speed.',
    clinicalGuideline:
      'Single nucleotide transition (AAA->AAC). Most common transmitted drug resistance mutation worldwide; prompted transition from EFV to Dolutegravir as preferred global 1st-line.',
  },
  {
    id: 'q148h',
    name: 'Q148H/K/R (Integrase Catalytic Core)',
    targetEnzyme: 'Integrase',
    wildTypeResidue: 'Glutamine (Gln)',
    mutantResidue: 'Histidine (His)',
    codonNumber: 148,
    affectedDrugClasses: ['INSTI (1st Generation)'],
    affectedDrugs: ['Raltegravir (RAL)', 'Elvitegravir (EVG)'],
    sparedDrugs: ['Dolutegravir (DTG, with twice-daily dosing)', 'Bictegravir (BIC)', 'Cabotegravir (CAB)'],
    foldResistance: '>20-100-fold to 1st-gen INSTIs; requires compensatory G140S/A mutation',
    stericClashDistance: 1.8,
    fitnessImpact: 'Severely impairs integrase catalytic activity unless rescued by secondary mutations such as G140S.',
    molecularBiophysics:
      'Codon 148 coordinates divalent magnesium ions (Mg2+) in the integrase DDE catalytic triad. Substitution disrupts metal chelating coordination necessary for first-generation strand transfer inhibitors.',
    clinicalGuideline:
      'Second-generation INSTIs (Dolutegravir, Bictegravir) retain potent antiviral activity due to deeper active site penetration and much longer binding half-life (>70 hours).',
  },
  {
    id: 'i50v',
    name: 'I50V / I50L (Protease Flap)',
    targetEnzyme: 'Protease',
    wildTypeResidue: 'Isoleucine (Ile)',
    mutantResidue: 'Valine (Val) / Leucine (Leu)',
    codonNumber: 50,
    affectedDrugClasses: ['Protease Inhibitors (PIs)'],
    affectedDrugs: ['Darunavir (DRV - I50V)', 'Atazanavir (ATV - I50L)'],
    sparedDrugs: ['Lopinavir (LPV)', 'Non-PI classes'],
    foldResistance: 'High-level class resistance to target PI',
    stericClashDistance: 1.9,
    fitnessImpact: 'Significant decrease in Gag-Pol polyprotein cleavage processing efficiency.',
    molecularBiophysics:
      'Residue 50 sits at the tip of the flexible beta-hairpin flaps covering the protease catalytic pocket. Alteration shifts the flap closure stability, reducing inhibitor residency time.',
    clinicalGuideline:
      'High genetic barrier to resistance; requires accumulation of 3 or more primary and secondary PI mutations before clinical virological failure occurs.',
  },
];
