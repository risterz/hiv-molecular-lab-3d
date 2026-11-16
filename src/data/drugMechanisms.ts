export interface DrugClassInfo {
  id: string;
  className: string;
  acronym: string;
  molecularTarget: string;
  mechanismOfAction: string;
  representativeDrugs: string[];
  geneticBarrier: 'Very High' | 'High' | 'Moderate' | 'Low' | string;
  commonSideEffects: string[];
  keyAdvantages: string;
  color: string;
}

export const DRUG_CLASSES: DrugClassInfo[] = [
  {
    id: 'insti',
    className: 'Integrase Strand Transfer Inhibitors',
    acronym: 'INSTI',
    molecularTarget: 'Viral Integrase (p32 tetramer active catalytic core)',
    mechanismOfAction:
      'Binds two divalent magnesium (Mg2+) ions in the catalytic core of Integrase, chelating the active site and preventing strand transfer of viral proviral cDNA into host chromosomal DNA.',
    representativeDrugs: ['Bictegravir (BIC)', 'Dolutegravir (DTG)', 'Cabotegravir (CAB - long-acting injectable)', 'Raltegravir (RAL)'],
    geneticBarrier: 'Very High',
    commonSideEffects: ['Mild headache', 'Insomnia', 'Weight gain', 'Rare neuropsychiatric symptoms'],
    keyAdvantages:
      'Preferred anchor drug in almost all initial first-line regimens worldwide due to rapid viral suppression and extremely high barrier to resistance.',
    color: '#a855f7',
  },
  {
    id: 'nrti',
    className: 'Nucleoside / Nucleotide Reverse Transcriptase Inhibitors',
    acronym: 'NRTI',
    molecularTarget: 'Reverse Transcriptase catalytic elongation cleft',
    mechanismOfAction:
      'Faulty nucleotide building blocks that lack a 3\'-hydroxyl (-OH) group on the ribose ring. When incorporated into synthesizing proviral DNA, the incoming nucleotide cannot form a 5\'-to-3\' phosphodiester bond, terminating elongation.',
    representativeDrugs: [
      'Tenofovir alafenamide (TAF)',
      'Tenofovir disoproxil fumarate (TDF)',
      'Emtricitabine (FTC)',
      'Lamivudine (3TC)',
      'Abacavir (ABC)',
    ],
    geneticBarrier: 'High (when paired)',
    commonSideEffects: ['Renal/tubular effects and bone density loss (TDF > TAF)', 'Hypersensitivity (ABC - requires HLA-B*5701 screen)'],
    keyAdvantages:
      'Forms the foundational dual-NRTI backbone ("two NRTIs + one anchor drug") of combination antiretroviral therapy (cART) and pre-exposure prophylaxis (PrEP).',
    color: '#10b981',
  },
  {
    id: 'nnrti',
    className: 'Non-Nucleoside Reverse Transcriptase Inhibitors',
    acronym: 'NNRTI',
    molecularTarget: 'Allosteric non-nucleoside binding pocket adjacent to RT active site',
    mechanismOfAction:
      'Binds to a hydrophobic allosteric pocket ~10 Å away from the polymerase active site, inducing a conformational distortion that locks the polymerase catalytic triad in an inactive geometry.',
    representativeDrugs: ['Doravirine (DOR)', 'Rilpivirine (RPV)', 'Efavirenz (EFV)', 'Etravirine (ETR)'],
    geneticBarrier: 'Moderate (Doravirine/Etravirine) to Low (Efavirenz/Nevirapine)',
    commonSideEffects: ['Vivid dreams / CNS effects (EFV)', 'Skin rash', 'Lipid alterations'],
    keyAdvantages:
      'Non-competitive mechanism that does not require intracellular triphosphorylation. Doravirine maintains activity against common first-generation NNRTI mutations (K103N).',
    color: '#06b6d4',
  },
  {
    id: 'pi',
    className: 'Protease Inhibitors',
    acronym: 'PI',
    molecularTarget: 'Viral Aspartyl Protease homodimer catalytic cavity',
    mechanismOfAction:
      'Peptidomimetic transition-state analogs that reversibly bind the active catalytic cleft of viral Protease, preventing cleavage of Gag and Gag-Pol polyproteins and halting virion condensation into infectious particles.',
    representativeDrugs: [
      'Darunavir (DRV) + Ritonavir or Cobicistat booster',
      'Atazanavir (ATV) + Ritonavir booster',
    ],
    geneticBarrier: 'Very High',
    commonSideEffects: ['GI upset/diarrhea', 'Dyslipidemia', 'Drug interactions via cytochrome P450 inhibition'],
    keyAdvantages:
      'Exceptional forgiveness against missed doses and primary resistance; cornerstone rescue therapy for second-line treatment failure.',
    color: '#f59e0b',
  },
  {
    id: 'capsid_inhibitor',
    className: 'Capsid Inhibitors',
    acronym: 'Capsid',
    molecularTarget: 'p24 hexamer-hexamer interface',
    mechanismOfAction:
      'Binds at the interface between capsid protein (CA) monomers, disrupting capsid nuclear translocation, virus assembly, and core disassembly (uncoating) simultaneously.',
    representativeDrugs: ['Lenacapavir (SUNLENCA)'],
    geneticBarrier: 'High',
    commonSideEffects: ['Injection site reactions'],
    keyAdvantages:
      'First-in-class multi-stage inhibitor administered subcutaneously only once every 6 months (twice yearly), revolutionizing multi-drug resistant salvage therapy and prevention.',
    color: '#ec4899',
  },
  {
    id: 'entry_inhibitor',
    className: 'Entry & Attachment Inhibitors',
    acronym: 'Entry',
    molecularTarget: 'Host CD4 receptor, CCR5 co-receptor, or viral gp120/gp41',
    mechanismOfAction:
      'Interferes with viral docking (Fostemsavir to gp120), host coreceptor engagement (Maraviroc to CCR5), or six-helix bundle hairpin formation (Enfuvirtide to gp41).',
    representativeDrugs: ['Fostemsavir (FSM)', 'Maraviroc (MVC)', 'Ibalizumab (IBA)', 'Enfuvirtide (T-20)'],
    geneticBarrier: 'Moderate',
    commonSideEffects: ['Injection site reactions (T-20)', 'Hepatotoxicity (MVC)'],
    keyAdvantages:
      'Essential options for heavily treatment-experienced patients with extensive multi-class resistance to standard reverse transcriptase and integrase inhibitors.',
    color: '#f43f5e',
  },
];

export const U_EQUALS_U_SCIENCE = {
  statement: 'Undetectable = Untransmittable (U=U)',
  summary:
    'A person living with HIV who takes antiretroviral therapy as prescribed and achieves and maintains an undetectable viral load (<200 copies/mL) cannot sexually transmit the virus to HIV-negative partners.',
  landmarkStudies: [
    {
      name: 'PARTNER 1 & PARTNER 2 (2016, 2019)',
      details:
        'Tracked over 1,000 serodiscordant couples (both heterosexual and gay male couples) engaging in over 76,000 condomless sexual acts while the positive partner was virally suppressed. Result: Exactly ZERO phylogenetically linked transmissions.',
    },
    {
      name: 'Opposites Attract Study (2018)',
      details:
        'Studied 343 serodiscordant male couples across Australia, Thailand, and Brazil over 16,800 acts of condomless intercourse. Result: Zero linked transmissions.',
    },
    {
      name: 'HPTN 052 (2011, 2016)',
      details:
        'Landmark multinational randomized trial demonstrating that early initiation of ART reduced the risk of heterosexual HIV transmission by 96% initially, and by 100% when viral suppression was maintained.',
    },
  ],
  clinicalThreshold: '<200 copies/mL (Standard clinical tests detect down to <20 to 50 copies/mL)',
};
