/**
 * UNAIDS 2024 Global AIDS Update & 95-95-95 Target Data.
 * Reference: UNAIDS Global HIV & AIDS statistics — 2024 fact sheet.
 */

export interface RegionalEpidemiology {
  id: string;
  name: string;
  plhivTotal: string; // e.g. "20.8 million"
  diagnosedPercent: number; // Pillar 1 (Target: 95%)
  onArtPercent: number; // Pillar 2 (Target: 95%)
  virallySuppressedPercent: number; // Pillar 3 (Target: 95%)
  overallSuppressedPercent: number; // Total PLHIV virally suppressed
  statusColor: string;
  highlights: string;
  keyChallenge: string;
}

export interface GlobalOverviewMetrics {
  totalPlhiv: string;
  newInfectionsAnnual: string;
  aidsDeathsAnnual: string;
  globalDiagnosed: number;
  globalOnArt: number;
  globalSuppressed: number;
  totalSuppressedPercent: number;
}

export const GLOBAL_METRICS: GlobalOverviewMetrics = {
  totalPlhiv: '39.9 Million',
  newInfectionsAnnual: '1.3 Million (reduced by 59% since 1995 peak)',
  aidsDeathsAnnual: '630,000 (reduced by 69% since 2004 peak)',
  globalDiagnosed: 86,
  globalOnArt: 89,
  globalSuppressed: 93,
  totalSuppressedPercent: 71, // 86% * 89% * 93% = ~71% of all PLHIV
};

export const REGIONAL_DATA: RegionalEpidemiology[] = [
  {
    id: 'esa',
    name: 'Eastern & Southern Africa',
    plhivTotal: '20.8 million',
    diagnosedPercent: 93,
    onArtPercent: 91,
    virallySuppressedPercent: 94,
    overallSuppressedPercent: 80,
    statusColor: '#10b981', // emerald
    highlights: 'Pioneer region; Botswana, Eswatini, Rwanda, Zambia, and Zimbabwe have achieved or exceeded 95-95-95.',
    keyChallenge: 'High vulnerability among adolescent girls and young women (3x higher incidence than male peers).',
  },
  {
    id: 'wcena',
    name: 'Western & Central Europe & North America',
    plhivTotal: '2.3 million',
    diagnosedPercent: 92,
    onArtPercent: 93,
    virallySuppressedPercent: 95,
    overallSuppressedPercent: 81,
    statusColor: '#0284c7', // sky
    highlights: 'Excellent viral suppression rates and rapid scale-up of injectable long-acting PrEP (CAB-LA).',
    keyChallenge: 'Persistent racial disparities, healthcare access inequality, and late diagnoses.',
  },
  {
    id: 'ap',
    name: 'Asia & the Pacific',
    plhivTotal: '6.7 million',
    diagnosedPercent: 78,
    onArtPercent: 87,
    virallySuppressedPercent: 95,
    overallSuppressedPercent: 64,
    statusColor: '#d97706', // amber
    highlights: 'Thailand and Cambodia demonstrate excellent testing and rapid treatment initiation models.',
    keyChallenge: 'Concentrated epidemics in key populations (men who have sex with men, transgender people, sex workers).',
  },
  {
    id: 'lac',
    name: 'Latin America & Caribbean',
    plhivTotal: '2.5 million',
    diagnosedPercent: 88,
    onArtPercent: 82,
    virallySuppressedPercent: 92,
    overallSuppressedPercent: 66,
    statusColor: '#6366f1', // indigo
    highlights: 'Widespread availability of free public ART regimens; strong community advocacy.',
    keyChallenge: 'Late presentation; nearly one-third of individuals present with advanced HIV disease (CD4 < 200).',
  },
  {
    id: 'eeca',
    name: 'Eastern Europe & Central Asia',
    plhivTotal: '2.1 million',
    diagnosedPercent: 74,
    onArtPercent: 76,
    virallySuppressedPercent: 91,
    overallSuppressedPercent: 51,
    statusColor: '#f43f5e', // rose
    highlights: 'Civil society organizations lead harm-reduction programs despite severe political headwinds.',
    keyChallenge: 'One of the few regions where new infections continue to rise; criminalization of drug use and punitive laws.',
  },
  {
    id: 'wca',
    name: 'Western & Central Africa',
    plhivTotal: '4.9 million',
    diagnosedPercent: 83,
    onArtPercent: 86,
    virallySuppressedPercent: 88,
    overallSuppressedPercent: 63,
    statusColor: '#8b5cf6', // purple
    highlights: 'Steady progress in maternal prevention; PMTCT scale-up reducing vertical infant transmission.',
    keyChallenge: 'Paediatric treatment gap; only 35% of children living with HIV are currently receiving antiretroviral therapy.',
  },
];
