export interface AnatomyDetail {
  id: string;
  name: string;
  shortName: string;
  category: 'Envelope' | 'Matrix' | 'Capsid' | 'Enzyme' | 'Genome';
  molecularWeight: string;
  function: string;
  structure: string;
  clinicalSignificance: string;
  therapeutics: string[];
  color: string;
}

export const ANATOMY_DETAILS: Record<string, AnatomyDetail> = {
  gp120: {
    id: 'gp120',
    name: 'gp120 Surface Docking Glycoprotein',
    shortName: 'gp120',
    category: 'Envelope',
    molecularWeight: '120 kDa (heavily glycosylated)',
    function: 'Mediates primary attachment of the virion to the host CD4 receptor and chemokine co-receptors (CCR5 or CXCR4) on target helper T cells and macrophages.',
    structure: 'Trimeric surface spike. Variable loops (V1–V5) create an evolving glycan shield that evades host neutralizing antibodies.',
    clinicalSignificance: 'CCR5 tropism testing determines eligibility for CCR5 antagonists. Target of broadly neutralizing antibodies (bNAbs).',
    therapeutics: ['Fostemsavir (gp120 attachment inhibitor)', 'Ibalizumab (post-attachment CD4 blocker)', 'Maraviroc (CCR5 co-receptor antagonist)'],
    color: '#f43f5e',
  },
  gp41: {
    id: 'gp41',
    name: 'gp41 Transmembrane Fusion Glycoprotein',
    shortName: 'gp41',
    category: 'Envelope',
    molecularWeight: '41 kDa',
    function: 'Undergoes dramatic conformational changes following gp120 receptor binding, inserting its hydrophobic fusion peptide into the host membrane and folding into a six-helix bundle to pull the viral and host membranes together.',
    structure: 'Trimeric coiled-coil stalk crossing the lipid bilayer non-covalently tethered to gp120.',
    clinicalSignificance: 'Essential gateway for viral core entry into the host cytoplasm.',
    therapeutics: ['Enfuvirtide / T-20 (fusion peptide inhibitor)'],
    color: '#fb7185',
  },
  lipid_membrane: {
    id: 'lipid_membrane',
    name: 'Host-Derived Lipid Bilayer Envelope',
    shortName: 'Membrane',
    category: 'Envelope',
    molecularWeight: 'Variable lipid composition',
    function: 'Encloses and protects the viral core. Enriched with cholesterol, sphingomyelin, and host cell surface proteins incorporated during viral budding.',
    structure: 'Spherical fluid lipid bilayer approximately 100–120 nm in diameter.',
    clinicalSignificance: 'Rapidly inactivated by standard lipid solvents, soaps, household bleach, and environmental drying outside the body.',
    therapeutics: ['Physical barrier protection (latex/polyurethane condoms)', 'Medical sterilization protocols'],
    color: '#0ea5e9',
  },
  matrix_p17: {
    id: 'matrix_p17',
    name: 'p17 Matrix Protein (MA)',
    shortName: 'p17 Matrix',
    category: 'Matrix',
    molecularWeight: '17 kDa (~132 amino acids)',
    function: 'Forms a spherical shell underneath the lipid bilayer, stabilizing the viral membrane and directing viral Gag polyproteins to the plasma membrane during assembly.',
    structure: 'Globular trimer units that polymerize into a geodesic spherical meshwork.',
    clinicalSignificance: 'Contains a nuclear localization signal facilitating active transport of the viral pre-integration complex across the nuclear pore.',
    therapeutics: ['Investigational assembly inhibitors'],
    color: '#6366f1',
  },
  capsid_p24: {
    id: 'capsid_p24',
    name: 'p24 Capsid Protein (CA)',
    shortName: 'p24 Capsid',
    category: 'Capsid',
    molecularWeight: '24 kDa',
    function: 'Assembles into a conical shell enclosing the diploid RNA viral genome and replication enzymes; docks with host nuclear import factors (Nup153, CPSF6) for nuclear transport.',
    structure: 'Fullerene cone composed of ~1,500 CA monomers arranged into ~250 hexamers and exactly 12 pentamers (7 at wide end, 5 at narrow end).',
    clinicalSignificance: 'Primary antigen detected in 4th-generation HIV antibody/antigen combination tests. First viral protein detectable in blood within 2 weeks of exposure.',
    therapeutics: ['Lenacapavir (first-in-class multi-stage capsid inhibitor with 6-month subcutaneous dosing)'],
    color: '#06b6d4',
  },
  reverse_transcriptase: {
    id: 'reverse_transcriptase',
    name: 'Reverse Transcriptase (p66 / p51)',
    shortName: 'Reverse Transcriptase',
    category: 'Enzyme',
    molecularWeight: 'p66 (66 kDa) / p51 (51 kDa) heterodimer',
    function: 'Transcribes single-stranded viral RNA into double-stranded proviral DNA. Contains both RNA/DNA-dependent DNA polymerase and RNase H activity.',
    structure: 'Asymmetric heterodimer: p66 subunit contains polymerase active site (fingers, palm, thumb domains) and RNase H; p51 provides structural support.',
    clinicalSignificance: 'Lacks 3\'→5\' proofreading exonuclease activity, creating high mutation rates (~1 error per 10^4 bases) that drive rapid drug resistance if viral load is unsuppressed.',
    therapeutics: [
      'NRTIs: Tenofovir (TDF/TAF), Emtricitabine (FTC), Lamivudine (3TC), Abacavir (ABC)',
      'NNRTIs: Efavirenz (EFV), Rilpivirine (RPV), Doravirine (DOR)',
    ],
    color: '#10b981',
  },
  integrase: {
    id: 'integrase',
    name: 'Integrase (p32)',
    shortName: 'Integrase',
    category: 'Enzyme',
    molecularWeight: '32 kDa (forms active tetramer/octamer)',
    function: 'Carries out 3\'-end processing of synthesized viral cDNA and strand transfer to permanently integrate viral DNA into transcriptionally active host chromosomal DNA.',
    structure: 'Multimeric complex assembled at the ends of viral DNA inside the pre-integration complex (PIC).',
    clinicalSignificance: 'Once integrated, the virus creates a permanent latent reservoir. Integrase inhibitors offer high genetic barriers to resistance and rapid viral suppression.',
    therapeutics: ['INSTIs: Dolutegravir (DTG), Bictegravir (BIC), Cabotegravir (CAB), Raltegravir (RAL)'],
    color: '#a855f7',
  },
  protease: {
    id: 'protease',
    name: 'Protease (p10)',
    shortName: 'Protease',
    category: 'Enzyme',
    molecularWeight: '10.8 kDa monomer (active as homodimer)',
    function: 'Cleaves immature precursor Gag and Gag-Pol polyproteins into individual structural proteins (MA, CA, NC, p6) and active enzymes during or immediately after budding.',
    structure: 'Symmetric C2-homodimer with an active aspartic protease catalytic cleft covered by two flexible beta-hairpin flaps.',
    clinicalSignificance: 'Inhibition results in non-infectious, structurally immature virus particles incapable of establishing new cycles of infection.',
    therapeutics: ['PIs: Darunavir (DRV), Atazanavir (ATV) usually boosted with Ritonavir (RTV) or Cobicistat (COBI)'],
    color: '#f59e0b',
  },
  rna_genome: {
    id: 'rna_genome',
    name: 'Diploid (+)ssRNA Viral Genome',
    shortName: 'Viral RNA',
    category: 'Genome',
    molecularWeight: '~9.7 kilobases per strand',
    function: 'Encodes nine genes producing 15 viral proteins: gag, pol, env (structural/enzymes), tat, rev (regulatory), nef, vif, vpr, vpu (accessory virulence factors).',
    structure: 'Two identical capped and polyadenylated single-stranded positive-sense RNA molecules linked at their 5\' ends by a dimer linkage site and coated with nucleocapsid p7.',
    clinicalSignificance: 'Directly measured in plasma by real-time quantitative RT-PCR (viral load). Less than 50 copies/mL denotes viral suppression and U=U (Undetectable = Untransmittable).',
    therapeutics: ['Suppressed by combination Antiretroviral Therapy (cART)'],
    color: '#ec4899',
  },
};
