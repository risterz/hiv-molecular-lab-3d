export interface ReplicationStage {
  step: number;
  id: string;
  title: string;
  subtitle: string;
  cellularLocation: string;
  viralProteins: string[];
  hostFactors: string[];
  mechanism: string;
  keyMolecules: string;
  antiretroviralTargets: string[];
  clinicalHighlight: string;
  color: string;
  icon: string;
}

export const REPLICATION_STAGES: ReplicationStage[] = [
  {
    step: 1,
    id: 'binding',
    title: 'Binding & Attachment',
    subtitle: 'Receptor recognition on host helper T-cells',
    cellularLocation: 'Host T-cell Plasma Membrane Outer Surface',
    viralProteins: ['gp120 surface trimer'],
    hostFactors: ['CD4 receptor', 'CCR5 co-receptor', 'CXCR4 co-receptor'],
    mechanism:
      'The viral envelope glycoprotein gp120 docks with high affinity to the primary CD4 receptor on helper T-lymphocytes or macrophages. This interaction triggers a conformational shift exposing the chemokine binding domain, which subsequently engages a co-receptor (primarily CCR5 in early/transmitted infection, or CXCR4 in late progression).',
    keyMolecules: 'gp120 : CD4 : CCR5 ternary complex',
    antiretroviralTargets: [
      'Maraviroc (CCR5 antagonist)',
      'Fostemsavir (gp120 attachment blocker)',
      'Ibalizumab (post-attachment monoclonal CD4 antibody)',
    ],
    clinicalHighlight:
      'Individuals homozygous for the CCR5-delta32 gene deletion lack functional cell-surface CCR5 and are naturally resistant to common R5-tropic HIV strains (basis of stem-cell cure cases).',
    color: '#f43f5e',
    icon: 'Crosshair',
  },
  {
    step: 2,
    id: 'fusion',
    title: 'Fusion & Viral Entry',
    subtitle: 'Membrane coalescence and core release',
    cellularLocation: 'Host Cell Plasma Membrane',
    viralProteins: ['gp41 transmembrane fusion peptide'],
    hostFactors: ['Host plasma lipid membrane'],
    mechanism:
      'Co-receptor engagement triggers gp41 conformational rearrangement. Its hydrophobic N-terminal peptide harpoons into the host cell membrane, and the heptad repeats fold into a stable six-helix hairpin bundle. This pulls the viral and host membranes into intimate contact, forming a fusion pore through which the viral conical capsid enters the cytoplasm.',
    keyMolecules: 'gp41 six-helix bundle (6HB)',
    antiretroviralTargets: ['Enfuvirtide / T-20 (synthetic peptide fusion inhibitor)'],
    clinicalHighlight:
      'Membrane fusion is an energetically driven biophysical transition; blocking hairpins halts infection before viral genetic material enters the cytoplasm.',
    color: '#fb7185',
    icon: 'Minimize2',
  },
  {
    step: 3,
    id: 'reverse_transcription',
    title: 'Reverse Transcription',
    subtitle: 'Conversion of viral ssRNA to proviral dsDNA',
    cellularLocation: 'Host Cytoplasm / Migrating Capsid Core',
    viralProteins: ['Reverse Transcriptase (p66/p51 heterodimer)', 'Nucleocapsid (p7)', 'Capsid (p24)'],
    hostFactors: ['Host cellular dNTPs (deoxynucleotide pool)', 'tRNA-Lys3 primer'],
    mechanism:
      'Reverse Transcriptase uses a host tRNA-Lys primer to transcribe viral single-stranded positive-sense RNA into minus-strand cDNA. The RNase H domain simultaneously degrades the RNA template, after which the DNA polymerase synthesizes a complementary plus-strand, generating double-stranded linear proviral DNA.',
    keyMolecules: 'dsDNA provirus (~9.7 kbp) with Long Terminal Repeats (LTRs)',
    antiretroviralTargets: [
      'NRTIs: Tenofovir (TDF/TAF), Emtricitabine (FTC), Lamivudine (3TC), Abacavir (ABC)',
      'NNRTIs: Efavirenz (EFV), Doravirine (DOR), Rilpivirine (RPV)',
    ],
    clinicalHighlight:
      'Reverse Transcriptase lacks proofreading exonuclease activity (error rate ~1 in 10,000 nucleotides), generating massive viral diversity (quasi-species) that necessitates multi-drug regimens to prevent resistance.',
    color: '#10b981',
    icon: 'Dna',
  },
  {
    step: 4,
    id: 'integration',
    title: 'Nuclear Entry & Integration',
    subtitle: 'Covalent insertion into host chromosome',
    cellularLocation: 'Host Cell Nucleus (Active Chromatin)',
    viralProteins: ['Integrase (p32 tetramer)', 'p24 capsid fragments', 'p17 Matrix (MA)'],
    hostFactors: ['Nup153 / RanBP2 (nuclear pore complex)', 'LEDGF/p75 (chromatin tethering factor)'],
    mechanism:
      'The viral pre-integration complex (PIC) docks with nuclear pore proteins and enters the nucleus. Integrase catalyzes 3\'-end processing of proviral DNA by removing two terminal nucleotides, then performs strand transfer: covalently splicing viral DNA into open, transcriptionally active host chromosomal DNA.',
    keyMolecules: 'Host chromosome with stably integrated proviral DNA',
    antiretroviralTargets: [
      'INSTIs: Dolutegravir (DTG), Bictegravir (BIC), Cabotegravir (CAB), Raltegravir (RAL)',
      'Capsid Inhibitors: Lenacapavir (disrupts nuclear import & uncoating)',
    ],
    clinicalHighlight:
      'Integration establishes lifelong infection: proviral DNA is replicated alongside host DNA every time the cell divides, forming the latent reservoir in resting CD4+ memory T-cells.',
    color: '#a855f7',
    icon: 'Layers',
  },
  {
    step: 5,
    id: 'transcription',
    title: 'Transcription & Translation',
    subtitle: 'Host machinery hijacked for viral protein synthesis',
    cellularLocation: 'Host Nucleus & Cytoplasm / Rough ER',
    viralProteins: ['Tat (transactivator of transcription)', 'Rev (regulator of virion expression)'],
    hostFactors: ['Host RNA Polymerase II', 'P-TEFb (CDK9/Cyclin T1)', 'Host Ribosomes'],
    mechanism:
      'The viral 5\' LTR acts as a powerful promoter. Viral Tat protein binds TAR RNA loop and recruits host P-TEFb to hyper-phosphorylate RNA Polymerase II, driving massive full-length viral mRNA transcription. Viral Rev protein binds the RRE element, bypassing cellular splicing checkpoints to export unspliced genomic RNAs. Cytoplasmic ribosomes translate Gag and Gag-Pol precursor polyproteins.',
    keyMolecules: 'Gag polyprotein (Pr55), Gag-Pol polyprotein (Pr160), viral mRNA',
    antiretroviralTargets: ['Investigational Tat and Rev transcriptional inhibitors'],
    clinicalHighlight:
      'Latent T-cells maintain silent proviruses without transcription, hiding from immune detection; activating and purging this latent reservoir is the focus of "shock and kill" cure research.',
    color: '#06b6d4',
    icon: 'Cpu',
  },
  {
    step: 6,
    id: 'assembly',
    title: 'Assembly, Budding & Maturation',
    subtitle: 'Virion egress and proteolytic activation',
    cellularLocation: 'Host Plasma Membrane Outer Leaflet',
    viralProteins: ['Gag polyprotein', 'Gag-Pol polyprotein', 'Viral Protease (p10 homodimer)', 'gp120/gp41'],
    hostFactors: ['ESCRT complexes (ESCRT-I/TSG101, ALIX)', 'Host cell lipid rafts'],
    mechanism:
      'Gag and Gag-Pol polyproteins oligomerize at lipid rafts along the inner plasma membrane, capturing two copies of genomic (+)ssRNA and env glycoproteins. Host ESCRT machinery pinches off an immature, non-infectious spherical virion. During or immediately after budding, viral Protease auto-activates and cleaves Gag/Gag-Pol polyproteins into mature MA (p17), CA (p24), NC (p7), and enzymes, condensing the core into a conical capsid.',
    keyMolecules: 'Mature infectious conical core virion',
    antiretroviralTargets: [
      'Protease Inhibitors: Darunavir (DRV), Atazanavir (ATV) boosted with Ritonavir/Cobicistat',
      'Maturation Inhibitors (investigational Gag CA-SP1 cleavage blockers)',
    ],
    clinicalHighlight:
      'Protease inhibitors prevent maturation; un-cleaved immature virions remain non-infectious particles incapable of infecting subsequent cells.',
    color: '#f59e0b',
    icon: 'Radio',
  },
];
