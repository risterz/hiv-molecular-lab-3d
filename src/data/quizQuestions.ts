export interface QuizQuestion {
  id: number;
  question: string;
  category: 'Transmission' | 'Treatment & U=U' | 'Molecular Biology' | 'Prevention & Testing';
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  scientificReference: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Can HIV be transmitted through saliva, sharing drinking cups, or casual touching?',
    category: 'Transmission',
    options: [
      'Yes, small amounts of virus in saliva can easily cause infection.',
      'No, saliva contains protective enzymes and HIV cannot survive outside host cellular environments.',
      'Only if the cup is made of plastic rather than glass.',
      'Yes, but only during hot weather.',
    ],
    correctAnswerIndex: 1,
    explanation:
      'HIV is extremely fragile outside the human body and cannot survive environmental exposure. Saliva contains natural antiviral enzymes (such as SLPI) and lacks the viral concentration necessary to cause infection. Casual contact, sharing utensils, and toilet seats carry exactly zero risk.',
    scientificReference: 'CDC HIV Transmission Facts (2024)',
  },
  {
    id: 2,
    question: 'What is the scientifically verified meaning of "Undetectable = Untransmittable" (U=U)?',
    category: 'Treatment & U=U',
    options: [
      'A person with an undetectable viral load must still always use barrier protection to prevent transmission.',
      'A person living with HIV on effective ART with an undetectable viral load cannot sexually transmit HIV.',
      'The virus is undetectable only during morning hours.',
      'It means HIV has been permanently eradicated from the cellular genome.',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Supported by landmark clinical trials (PARTNER 1, PARTNER 2, and Opposites Attract) with over 76,000 condomless sexual acts, zero phylogenetically linked transmissions occurred when the HIV-positive partner maintained an undetectable viral load (<200 copies/mL).',
    scientificReference: 'Lancet 2019; 393: 2428–2438 (PARTNER 2)',
  },
  {
    id: 3,
    question: 'Why does HIV mutate so rapidly and develop resistance against single-drug treatments?',
    category: 'Molecular Biology',
    options: [
      'Host immune antibodies force the virus to rewrite its own genes.',
      'Viral Reverse Transcriptase lacks a 3\'→5\' proofreading exonuclease repair mechanism.',
      'HIV DNA is made of five nucleotides instead of four.',
      'The viral lipid membrane absorbs foreign bacterial DNA.',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Unlike cellular DNA polymerases, HIV-1 Reverse Transcriptase makes approximately 1 error per 10,000 nucleotides without self-correction. In an untreated individual producing billions of virions daily, every possible single-point mutation is generated daily, requiring multi-drug combination therapy to suppress replication.',
    scientificReference: 'Nature Reviews Microbiology 2021; 19: 507–523',
  },
  {
    id: 4,
    question: 'How effective is Pre-Exposure Prophylaxis (PrEP) when taken as prescribed?',
    category: 'Prevention & Testing',
    options: [
      'Approximately 40% effective.',
      'About 70% effective if combined with vitamins.',
      'Greater than 99% effective at preventing sexual HIV transmission.',
      'Only effective in individuals with specific blood types.',
    ],
    correctAnswerIndex: 2,
    explanation:
      'When taken consistently as prescribed (daily oral pills like Truvada/Descovy or bi-monthly injections like Apretude), PrEP reduces the risk of getting HIV from sex by over 99% and from injection drug use by at least 74%.',
    scientificReference: 'US Centers for Disease Control and Prevention (CDC)',
  },
  {
    id: 5,
    question: 'Within what maximum timeframe must Post-Exposure Prophylaxis (PEP) be initiated following a potential exposure?',
    category: 'Prevention & Testing',
    options: [
      'Within 72 hours (3 days), but ideally as soon as possible.',
      'Within 14 days.',
      'Within 30 days before symptoms develop.',
      'Any time within 6 months.',
    ],
    correctAnswerIndex: 0,
    explanation:
      'PEP is a 28-day emergency course of antiretroviral medications that must be initiated within 72 hours (3 days) of exposure to prevent HIV from establishing permanent infection in cellular reservoirs. Every hour counts.',
    scientificReference: 'WHO Guidelines on Post-Exposure Prophylaxis',
  },
  {
    id: 6,
    question: 'Which viral protein forms the prominent outer trimeric spikes that bind to host helper T-cell CD4 receptors?',
    category: 'Molecular Biology',
    options: ['p24 capsid protein', 'gp120 glycoprotein', 'Integrase p32', 'p17 matrix protein'],
    correctAnswerIndex: 1,
    explanation:
      'gp120 is the trimeric surface glycoprotein that docks with the primary host CD4 receptor and chemokine co-receptors (CCR5 or CXCR4), initiating the viral entry cascade.',
    scientificReference: 'Cell 2018; 173(4): 952–965',
  },
  {
    id: 7,
    question: 'What primary viral structural antigen is detected in modern 4th-generation combination blood tests?',
    category: 'Prevention & Testing',
    options: ['Viral envelope spike gp160', 'p24 capsid protein', 'Reverse transcriptase p66', 'Tat protein'],
    correctAnswerIndex: 1,
    explanation:
      '4th-generation antigen/antibody tests detect both host antibodies (IgM and IgG) and the viral p24 capsid core protein. Because p24 is detectable within 2 to 4 weeks of infection before antibody levels peak, it dramatically narrows the diagnostic window period.',
    scientificReference: 'CDC Diagnostic Testing Guidelines',
  },
  {
    id: 8,
    question: 'What rare genetic mutation confers natural cellular resistance to common R5-tropic strains of HIV?',
    category: 'Molecular Biology',
    options: ['CD4-epsilon4', 'HLA-B27 null', 'CCR5-delta32 homozygous deletion', 'p53 duplication'],
    correctAnswerIndex: 2,
    explanation:
      'A 32-base-pair deletion in the CCR5 gene (CCR5-delta32) produces a truncated non-functional co-receptor that does not reach the cell membrane. Homozygous carriers are highly resistant to HIV infection, forming the scientific blueprint behind the Berlin, London, and Düsseldorf cure cases via stem cell transplantation.',
    scientificReference: 'New England Journal of Medicine 2009; 360: 692–698',
  },
];
