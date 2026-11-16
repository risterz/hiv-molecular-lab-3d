# HIV Molecular Lab 3D

[![Live Demo](https://img.shields.io/badge/Live%20Demo-hiv--molecular--lab--3d.pages.dev-F38020.svg?style=flat-square&logo=cloudflare)](https://hiv-molecular-lab-3d.pages.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black.svg?style=flat-square&logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Vitest-31%2F31%20Passing-brightgreen.svg?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Made by](https://img.shields.io/badge/Made%20by-risterz-0284c7.svg?style=flat-square&logo=github)](https://github.com/risterz)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)

An open-science, mathematically-generated, interactive 3D laboratory platform teaching HIV virology, molecular biology, antiretroviral pharmacology, biophysical drug resistance, and public health epidemiology.

**Live Deployment**: [**https://hiv-molecular-lab-3d.pages.dev**](https://hiv-molecular-lab-3d.pages.dev)

Built with **100% procedural WebGL math**—zero external `.gltf` / `.obj` 3D model files. Every atom, helix, capsid cone, and enzyme cluster is computed dynamically in code.

Created by [**risterz**](https://github.com/risterz).

---

## Table of Contents

- [Key Features](#key-features)
- [Mathematical & Procedural Foundations](#mathematical--procedural-foundations)
  - [1. Parametric B-DNA Double Helix](#1-parametric-b-dna-double-helix)
  - [2. Fibonacci Spherical Virion Lattice](#2-fibonacci-spherical-virion-lattice)
  - [3. Conical p24 Capsid & Internal Enzymes](#3-conical-p24-capsid--internal-enzymes)
  - [4. Dynamic Reverse Transcription & NRTI Chain-Termination](#4-dynamic-reverse-transcription--nrti-chain-termination)
  - [5. Biomathematical CD4+ & Viral Load Kinetics](#5-biomathematical-cd4--viral-load-kinetics)
  - [6. Active-Site Steric Clash Mechanics](#6-active-site-steric-clash-mechanics)
- [Interactive Modules](#interactive-modules)
  - [Module 1: 3D Procedural WebGL Studio](#module-1-3d-procedural-webgl-studio)
  - [Module 2: CD4+ & Viral Load Clinical Timeline Simulator](#module-2-cd4--viral-load-clinical-timeline-simulator)
  - [Module 3: HIV-1 Proviral Genome Architecture (9.7 kb)](#module-3-hiv-1-proviral-genome-architecture-97-kb)
  - [Module 4: 6-Stage Viral Replication Lifecycle](#module-4-6-stage-viral-replication-lifecycle)
  - [Module 5: Antiretroviral Drug Targets & U=U Scientific Consensus](#module-5-antiretroviral-drug-targets--uu-scientific-consensus)
  - [Module 6: Biophysical Drug Resistance Simulator](#module-6-biophysical-drug-resistance-simulator)
  - [Module 7: Transmission Risk Matrix & Diagnostic Window Calculator](#module-7-transmission-risk-matrix--diagnostic-window-calculator)
  - [Module 8: UNAIDS 95-95-95 Global Epidemic Tracker](#module-8-unaids-95-95-95-global-epidemic-tracker)
  - [Module 9: Evidence-Based Myth-Buster Quiz](#module-9-evidence-based-myth-buster-quiz)
  - [Module 10: High-Resolution Snapshot & Investigation Report Export](#module-10-high-resolution-snapshot--investigation-report-export)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Testing & Quality Assurance](#testing--quality-assurance)
- [Scientific & Clinical References](#scientific--clinical-references)
- [Author & Attribution](#author--attribution)
- [License](#license)

---

## Key Features

- **Zero External 3D Assets**: Fast loading, deterministic rendering, and mathematically exact proportions without heavy 3D mesh downloads.
- **Editorial Clinical Design**: Clean, peer-reviewed medical laboratory visual aesthetic (slate/navy `#0b0f19`, soft clinical sky `#0284c7`, balanced studio Three.js lighting) free from generic AI cyberpunk glows.
- **Interactive Simulation**: Full control over time scrubbers, rotation speeds, camera presets, drug inhibition toggles, and cross-section clipping planes.
- **Evidence-Based Public Health**: Strict alignment with CDC, WHO, NIH, and IAS-USA guidelines. Deep coverage of Undetectable = Untransmittable ($U=U$), PrEP/PEP, and UNAIDS 95-95-95 targets.
- **Cross-Linked Educational Architecture**: Clicking viral genes directly focuses the 3D WebGL viewer onto their corresponding protein products.
- **Lab Export Capabilities**: One-click high-resolution PNG snapshot generator with scientific watermarking, plus downloadable clinical investigation reports.

---

## Mathematical & Procedural Foundations

### 1. Parametric B-DNA Double Helix

The DNA model generates right-handed B-form double helix coordinates using parametric 3D space curves:

$$\vec{P}_1(t) = \begin{pmatrix} R \cos(t) \\ \frac{P \cdot t}{2\pi} \\ R \sin(t) \end{pmatrix}, \quad \vec{P}_2(t) = \begin{pmatrix} R \cos(t + \Delta\phi) \\ \frac{P \cdot t}{2\pi} \\ R \sin(t + \Delta\phi) \end{pmatrix}$$

- **Radius ($R$)**: $1.2\text{ nm}$ (scaled to 3D units).
- **Pitch ($P$)**: $3.4\text{ nm}$ per helical turn.
- **Base pairs per turn**: Exactly $10.5\text{ bp}$.
- **Major and Minor Grooves**: Asymmetric angular offset $\Delta\phi = 2.4\text{ rad}$ ($137.5^\circ$), accurately reproducing the characteristic wide major groove and narrow minor groove.
- **Watson-Crick Pairing**: Complementary pairs (Adenine-Thymine with 2 hydrogen bonds; Guanine-Cytosine with 3 hydrogen bonds) joined by phosphate backbone cylinders.

### 2. Fibonacci Spherical Virion Lattice

To distribute 72 trimeric gp120/gp41 glycoprotein spikes evenly across the spherical lipid bilayer membrane without clustering or polar distortion, the application utilizes the Golden Spiral Fibonacci Sphere algorithm:

$$y_i = 1 - \frac{2i}{N - 1}, \quad r_i = \sqrt{1 - y_i^2}, \quad \phi_i = i \cdot \pi (3 - \sqrt{5})$$

$$x_i = r_i \cos(\phi_i), \quad z_i = r_i \sin(\phi_i) \quad \text{for } i \in [0, N-1]$$

Each spike trimer is aligned with its surface normal vector $\vec{n} = \frac{\vec{P}}{\|\vec{P}\|}$ using quaternion orientation:

$$q = \text{Quaternion.setFromUnitVectors}((0, 1, 0), \vec{n})$$

### 3. Conical p24 Capsid & Internal Enzymes

- **Fullerene Cone Geometry**: Modeled as an asymmetric truncated cone ($R_{\text{wide}} = 1.6$, $R_{\text{narrow}} = 0.65$, Height = $4.8$) reflecting the asymmetric hexamer-pentamer fullerene lattice of the HIV-1 p24 capsid core.
- **Dimeric (+)ssRNA Twin Helices**: Procedural coiled coils running down the core cavity.
- **Catalytic Enzyme Clusters**: RT (p66/p51 heterodimer), Integrase (tetramer p32), and Protease (homodimer p11) positioned inside the nucleocapsid.
- **Dynamic Cross-Section Clipping**: Built using WebGL local clipping planes ($y > 0$) allowing real-time cutaway inspection without mesh rebuilding.

### 4. Dynamic Reverse Transcription & NRTI Chain-Termination

The enzyme-substrate complex simulates viral single-stranded RNA (ssRNA) being transcribed into double-stranded complementary DNA (cDNA):

- **Interpolated Unzipping Curve**:
  $$\vec{C}(s, t) = (1 - s)\vec{R}_{\text{template}}(s) + s \vec{D}_{\text{cDNA}}(s)$$
- **Active Drug Inhibition**: When the NRTI analog toggle is active, an unnatural nucleotide lacking a 3'-hydroxyl group (e.g., Zidovudine / Tenofovir) docks into the active site, physically terminating further DNA phosphodiester elongation.

### 5. Biomathematical CD4+ & Viral Load Kinetics

The clinical timeline simulates 12 years (624 weeks) of HIV pathophysiological progression with biphasic exponential decay upon Antiretroviral Therapy (ART) initiation:

$$V(t) = V_{\text{baseline}} \cdot \left[A \cdot e^{-k_1 t_{\text{art}}} + B \cdot e^{-k_2 t_{\text{art}}}\right] + V_{\text{suppressed}}$$

- **Phase 1 ($k_1 = 0.85\text{ wk}^{-1}$)**: Rapid clearance of free plasma virions and short-lived actively producing CD4+ T-lymphocytes (half-life $\approx 1-2$ days).
- **Phase 2 ($k_2 = 0.28\text{ wk}^{-1}$)**: Clearance of infected macrophages, dendritic cells, and transition to virological suppression ($<50\text{ copies/mL}$) by week 16–24.
- **Immune Reconstitution**: CD4+ cell recovery follows an asymptotic recovery model toward physiological baseline ($\approx 850\text{ cells/}\mu\text{L}$).

### 6. Active-Site Steric Clash Mechanics

Simulates van der Waals overlap when the M184V mutation alters the catalytic YMDD motif in Reverse Transcriptase:

- **Wild-Type ($Met184$)**: Flexible unbranched sidechain ($-CH_2-CH_2-S-CH_3$) allows planar and oxathiolane rings clearance ($d \approx 3.4\text{ \AA}$).
- **Mutant ($Val184$)**: Beta-branched sidechain ($-CH(CH_3)_2$) projects directly into the dNTP pocket, causing a severe steric clash ($d = 1.7\text{ \AA} < 2.0\text{ \AA}$ threshold) with 3TC/FTC oxathiolane rings, while permitting natural dCTP ($d = 2.9\text{ \AA}$) due to its flexible deoxyribose ring.

---

## Interactive Modules

```
HIV Molecular Lab 3D
├── Module 01: 3D Procedural WebGL Studio (B-DNA, Virion, Cutaway Core, RT Scrubber)
├── Module 02: CD4+ & Viral Load Clinical Timeline (Natural History vs. ART)
├── Module 03: HIV-1 Proviral Genome Architecture (9.7 kb, 9 Genes, 3 Frames)
├── Module 04: 6-Stage Viral Replication Cycle (Cellular Stepper & Drug Interventions)
├── Module 05: Antiretroviral Drug Targets & U=U Scientific Consensus
├── Module 06: Biophysical Drug Resistance Simulator (M184V, K103N, Q148H, I50V)
├── Module 07: Prevention Matrix & Diagnostic Window Period Calculator
├── Module 08: UNAIDS 95-95-95 Global Epidemic Tracker & Elimination Simulator
├── Module 09: Evidence-Based Virology & Public Health Myth-Buster Quiz
└── Module 10: High-Resolution Snapshot & Investigation Report Exporter
```

---

## Project Architecture

```
hiv-science-lab/
├── public/
├── src/
│   ├── components/
│   │   ├── ModelViewer/
│   │   │   ├── CanvasContainer.tsx             # Three.js lifecycle, studio lights, snapshot exporter
│   │   │   ├── ControlsOverlay.tsx             # Camera controls, speed, presets, HUD
│   │   │   ├── HotspotModal.tsx                # Anatomical detail dialog
│   │   │   ├── ProceduralDNA.ts                # Parametric double helix mesh generator
│   │   │   ├── ProceduralVirion.ts             # Fibonacci spike sphere, capsid cone, enzymes
│   │   │   └── ProceduralReverseTranscription.ts # Dynamic unzipping & NRTI docking
│   │   ├── Modules/
│   │   │   ├── ClinicalTimeline.tsx            # CD4/VL dual-axis graph & ART simulator
│   │   │   ├── GenomeMap.tsx                   # 9.7 kb proviral map with 3 reading frames
│   │   │   ├── ReplicationCycle.tsx            # 6-stage cellular lifecycle stepper
│   │   │   ├── DrugTargets.tsx                 # 6 ARV drug classes & U=U studies
│   │   │   ├── ResistanceSimulator.tsx         # Active-site pocket clash visualizer
│   │   │   ├── PreventionAndTesting.tsx        # Transmission matrix & window period slider
│   │   │   ├── GlobalTracker.tsx               # UNAIDS 95-95-95 regional dashboard
│   │   │   └── MythBusterQuiz.tsx              # 8-question cited knowledge check
│   │   └── Navigation.tsx                      # Header, tabs, and author attribution
│   ├── data/
│   │   ├── anatomyData.ts                      # Virion structural callout data
│   │   ├── drugMechanisms.ts                   # ARV classes, barrier to resistance, U=U citations
│   │   ├── genomeData.ts                       # HXB2 coordinates, reading frames, cleavage products
│   │   ├── globalHivData.ts                    # UNAIDS 2024 regional epidemiology cascades
│   │   ├── quizQuestions.ts                    # Cited myth-buster question bank
│   │   ├── replicationStages.ts                # Lifecycle stages & cellular locations
│   │   └── resistanceData.ts                   # Biophysical resistance mutations & clash distances
│   ├── test/                                   # 31 unit tests across 11 test suites
│   ├── utils/
│   │   ├── dnaMath.ts                          # B-DNA helical curves & Watson-Crick pairings
│   │   ├── virionMath.ts                       # Fibonacci sphere coordinates & cone geometry
│   │   ├── reverseTranscriptionMath.ts         # Unzipping interpolation curves
│   │   └── timelineMath.ts                     # CD4/VL clinical progression & decay models
│   ├── App.tsx                                 # Master layout & module router
│   ├── main.tsx                                # React entry point
│   └── index.css                               # Tailwind CSS & laboratory typography
├── index.html                                  # Document root & web fonts
├── tailwind.config.js                          # Neutral scientific color theme
├── tsconfig.json                               # Strict TypeScript configuration
└── vite.config.ts                              # Vite & Vitest configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` or `pnpm` or `yarn`

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/risterz/hiv-molecular-lab-3d.git
   cd hiv-molecular-lab-3d
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000) (or the port indicated in your terminal).

---

## Testing & Quality Assurance

The project includes an automated test suite executed via [Vitest](https://vitest.dev/):

```bash
# Run full unit test suite
npm test

# Run tests once with coverage report
npx vitest run

# Run TypeScript type check
npx tsc --noEmit

# Build production bundle
npm run build
```

### Test Coverage Highlights

- **`dnaMath.test.ts`**: Verifies major/minor groove angles, Watson-Crick pairings, and pitch calculations.
- **`virionMath.test.ts`**: Verifies Fibonacci sphere distribution ($N=72$), surface normal vectors, and cone radius math.
- **`reverseTranscriptionMath.test.ts`**: Verifies dynamic unzipping interpolation and NRTI drug chain-termination.
- **`timelineMath.test.ts`**: Verifies acute peak viremia, natural untreated AIDS progression, and biphasic viral clearance ($<50\text{ copies/mL}$).
- **`genomeData.test.ts`**: Verifies 9 genes, coordinates, reading frames, and $-1$ ribosomal frameshift overlap.
- **`newModules.test.tsx`**: Verifies M184V/K103N clash distances, UNAIDS 95-95-95 formulas, and regional cascade data.

---

## Scientific & Clinical References

1. **U=U Scientific Consensus**:
   - Rodger AJ, et al. *Risk of HIV transmission through condomless sex in MSM couples with suppressive ART (PARTNER 2)*. **The Lancet**, 2019.
   - Cohen MS, et al. *Antiretroviral Therapy for the Prevention of HIV-1 Transmission (HPTN 052)*. **N Engl J Med**, 2016.
2. **Structural Virology & Capsid Assembly**:
   - Pornillos O, et al. *X-ray structures of the hexameric and pentameric building blocks of the HIV-1 capsid*. **Cell**, 2011.
   - Lyumkis D, et al. *Cryo-EM structure of a native, fully glycosylated, cleaved HIV-1 envelope trimer*. **Science**, 2013.
3. **Clinical Guidelines & Testing Windows**:
   - **Centers for Disease Control and Prevention (CDC)**: HIV Testing Guidelines & Window Periods (2024).
   - **World Health Organization (WHO)**: Consolidated guidelines on HIV prevention, testing, treatment, service delivery & monitoring.
   - **UNAIDS**: Global HIV & AIDS statistics — 2024 Fact Sheet (Fast-Track 95-95-95 Targets).

---

## Author & Attribution

- **Project Lead & Developer**: [**risterz**](https://github.com/risterz)
- **GitHub Profile**: [https://github.com/risterz](https://github.com/risterz)
- **Domain**: Open Science Education & Computational Virology

---

## License

This project is open-source under the [MIT License](LICENSE).
