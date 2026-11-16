# HIV Molecular Lab 3D

An authoritative, mathematically generated, interactive 3D science platform teaching HIV molecular biology, virology, antiretroviral pharmacology, and public health prevention science.

## Highlights

- **100% Procedural 3D Models (Zero External Meshes)**:
  - **B-DNA Double Helix**: Parametric right-handed helix ($P(t) = (R\cos(t), ct, R\sin(t))$) with Watson-Crick base pairing (A-T, G-C), 10.5 bp/turn, and asymmetric major/minor grooves.
  - **HIV Virion Envelope**: Spherical lipid bilayer with 72 trimeric gp120/gp41 spikes placed via the golden angle Fibonacci sphere lattice.
  - **Cutaway Core Anatomy**: Interactive cross-section revealing p17 matrix, conical p24 fullerene capsid, coiled twin diploid (+)ssRNA genomes, and active enzyme globule clusters (Reverse Transcriptase, Integrase, Protease).
  - **Reverse Transcription & NRTI Blocker**: Dynamic real-time unzipping and cDNA synthesis simulation with interactive 3D NRTI chain-termination docking.
- **Replication Lifecycle Module**: Interactive 6-stage cellular stepper (Attachment $\to$ Fusion $\to$ RT $\to$ Integration $\to$ Translation $\to$ Maturation).
- **Drug Targets & U=U**: Comprehensive guide to 6 antiretroviral drug classes, resistance barriers, and the evidence-based science of Undetectable = Untransmittable.
- **Transmission & Testing**: Clear transmission matrix (actual vectors vs common zero-risk myths), PrEP/PEP biomedical protocols, and diagnostic window periods (NAT RNA, 4th-gen Ag/Ab, rapid tests).
- **Interactive Myth-Buster Quiz**: 8 curated virology and public health questions with real-time scoring and scientific citations.

## Quick Start

```bash
# Navigate to project folder
cd d:/Antigravity/hiv-science-lab

# Start local development server
npm run dev

# Run unit tests
npm test

# Build for production
npm run build
```

## Tech Stack

- React 18 & TypeScript
- Three.js WebGL Engine
- Vite
- Tailwind CSS & Lucide Icons
- Vitest Test Runner (20 passing unit tests)
