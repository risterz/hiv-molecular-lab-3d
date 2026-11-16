# Design Document: Interactive HIV & Molecular 3D Science Lab

- **Date:** 2026-11-16
- **Status:** Complete (Awaiting User Approval)
- **Author:** Antigravity Engineering
- **Target Directory:** `d:\Antigravity\hiv-science-lab`

---

## 1. Intent and Why
Provide an authoritative, mathematically precise, and engaging educational web application that demystifies HIV virology, molecular biology (DNA/RNA double helix structure, reverse transcription), transmission facts, and modern medical prevention/treatment (ART, PrEP, PEP, U=U).

The user explicitly requested that all 3D molecular and viral structures be built from pure mathematical formulas and procedural generation (zero external `.gltf`/`.obj` 3D model dependencies).

The replication cycle follows **Option A**: dedicated high-fidelity 3D procedural scenes for DNA/RNA, Virion anatomy, and Reverse Transcription unzipping, paired with an interactive 2D lifecycle stepper for cellular stages.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
1. **100% Procedural 3D Graphics**: Generate all molecular models (B-DNA double helix, single-stranded viral RNA, HIV virion envelope with trimeric gp120/gp41 spikes, and conical p24 capsid) using explicit parametric formulas, spherical lattices, and custom Three.js geometries.
2. **Interactive Biological Exploration**:
   - Camera orbit/pan/zoom and responsive preset viewpoints.
   - Cutaway / cross-section toggle revealing the inner matrix, capsid, and RNA genome.
   - Interactive hotspots highlighting viral proteins with medically accurate educational cards.
3. **Replication & Drug Action Visualizer**:
   - Step-by-step interactive replication stages: Binding/Attachment, Fusion, Reverse Transcription, Integration, Assembly, and Budding.
   - Interactive drug inhibitor overlays showing where Antiretroviral Therapies (NRTIs, NNRTIs, PIs, INSTIs) disrupt the cycle.
4. **Public Health & Educational Content**:
   - Clear distinction between HIV and AIDS.
   - Medically backed transmission science (dispelling myths: saliva, touch, mosquitos vs actual blood/fluid vectors).
   - Prevention & Harm Reduction: PrEP, PEP, condoms, sterile supplies.
   - U=U (Undetectable = Untransmittable) and standard viral load concepts.
   - Knowledge Check / Interactive Quiz to test user understanding.

### Non-Goals
- Real-time molecular dynamics / quantum force-field simulations (e.g., GROMACS or CHARMM physics). Geometries follow accurate structural biology proportions and parametric models, not compute-heavy molecular dynamics.
- Clinical diagnosis or personal medical prescription tools.

### Anti-Goals
- Bloated loading times: No multi-megabyte 3D model assets; must load instantly via pure code generation.
- Stigmatizing language or confusing medical jargon without plain-language explanations.

---

## 3. Mathematical Formulations for Procedural 3D Models

### A. Parametric B-DNA Double Helix
Standard right-handed B-DNA geometry is generated parametrically:
- Radius: $R \approx 1.0\text{ nm}$ (scaled for scene units)
- Helical pitch: $p \approx 3.4\text{ nm}$ per turn
- Base pairs per turn: $N_{bp} \approx 10.5$ ($\approx 36^\circ$ twist per pair)
- Major/Minor Groove Angle Offset: $\Delta\phi = 2.4\text{ rad}$ ($137.5^\circ$ minor groove vs $222.5^\circ$ major groove)

**Strand Equations:**
$$P_1(t) = \begin{pmatrix} R \cos(t) \\ \frac{p}{2\pi} t \\ R \sin(t) \end{pmatrix}, \quad P_2(t) = \begin{pmatrix} R \cos(t + \Delta\phi) \\ \frac{p}{2\pi} t \\ R \sin(t + \Delta\phi) \end{pmatrix}$$

**Nucleotide Base Pairs & Hydrogen Bonds:**
- At regular step parameter $t_k = k \cdot \frac{2\pi}{10.5}$, connect $P_1(t_k)$ to $P_2(t_k)$ with color-coded cylinders:
  - Adenine (Green) $\leftrightarrow$ Thymine (Red) (2 hydrogen bonds)
  - Guanine (Yellow) $\leftrightarrow$ Cytosine (Blue) (3 hydrogen bonds)
- Sugar-phosphate backbone rendered via smooth 3D tube geometry derived from Catmull-Rom splines along $P_1(t)$ and $P_2(t)$.

### B. Viral RNA & Reverse Transcription Unzipping
- Viral RNA rendered as single-stranded helical strand with exposed single bases (Uracil replacing Thymine in Orange).
- Unzipping / Transcription animation slider interpolates distance:
  $$P_{cDNA}(t, \lambda) = P_{template}(t) + \lambda \cdot \vec{d}(t)$$
  demonstrating RNA-dependent DNA polymerase synthesizing complementary DNA strand.

### C. HIV Virion Anatomy & Fibonacci Glycoprotein Distribution
HIV virion has spherical/icosahedral symmetry with roughly $70\text{--}80$ trimers of gp120/gp41:
- Membrane Envelope: Procedural sphere with customizable vertex displacement noise to simulate fluid lipid bilayer.
- Spikes generated using the **Golden Spiral / Fibonacci Sphere Lattice**:
  For $i \in [0, N-1]$ where $N = 72$:
  $$y_i = 1 - \frac{2i}{N - 1}$$
  $$r_i = \sqrt{1 - y_i^2}$$
  $$\theta_i = \pi (3 - \sqrt{5}) \cdot i \approx 2.399963 \cdot i$$
  $$x_i = r_i \cos(\theta_i), \quad z_i = r_i \sin(\theta_i)$$
- Spike trimer geometry: Stalk cylinder (gp41 trans-membrane protein) topped with 3 clover-leaf spheres (gp120 docking glycoprotein).
- Conical Capsid (p24): Truncated cone geometry oriented along center axis, housing twin coil curves representing diploid viral (+)ssRNA genomes.
- Cutaway / Section View: Cross-section clipping plane toggle ($z > 0$) allowing viewers to peer inside the virion.

---

## 4. Architecture & Technical Choices

### Builder Decisions Settled
1. **Viewport Architecture**: Tabbed application layout. The 3D Lab Explorer operates as a full-featured WebGL studio; educational modules (Drug Targets, Prevention, Quiz) use dedicated high-readability responsive layouts with embedded mini-viewer controls where relevant.
2. **Internal Virion Proteins**: Modeled inside the cutaway p24 capsid using procedural protein cluster geometries (colored molecular globule meshes for RT, Integrase, Protease) paired with interactive 3D hotspot pins that open deep-dive detail cards.
3. **Drug Mechanism Visuals**: The 3D Reverse Transcription model includes an interactive toggle to inject an NRTI chain-terminator nucleotide analog into the growing DNA strand, physically demonstrating chain termination in 3D. The broader drug catalog provides structured biochemical pathway diagrams.

### Stack
- **Framework**: Vite + React 18 + TypeScript.
- **Styling**: Tailwind CSS + Lucide React icons.
- **3D Engine**: Three.js (`three` + `@types/three`) with direct WebGL Canvas.
- **State Management**: React state + hooks for active model, animation play/pause, cutaway toggles, and quiz state.

### Project Directory Structure
```
d:\Antigravity\hiv-science-lab/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── ModelViewer/
│   │   │   ├── CanvasContainer.tsx
│   │   │   ├── ProceduralDNA.ts
│   │   │   ├── ProceduralVirion.ts
│   │   │   ├── ProceduralReverseTranscription.ts
│   │   │   ├── ControlsOverlay.tsx
│   │   │   └── HotspotModal.tsx
│   │   ├── Modules/
│   │   │   ├── BiologyOverview.tsx
│   │   │   ├── ReplicationCycle.tsx
│   │   │   ├── DrugTargets.tsx
│   │   │   ├── PreventionAndTesting.tsx
│   │   │   └── MythBusterQuiz.tsx
│   │   └── UI/
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── Tabs.tsx
│   ├── data/
│   │   ├── anatomyData.ts
│   │   ├── replicationStages.ts
│   │   ├── drugMechanisms.ts
│   │   └── quizQuestions.ts
│   └── styles/
│       └── index.css
```

---

## 5. Educational Modules & Content Specification

1. **Model Explorer (Primary 3D Interactive Screen)**:
   - View Modes:
     1. *B-DNA Double Helix*: Interactive twist, base pairing inspection, nucleotide chemistry toggle.
     2. *HIV Virion Outer Membrane*: gp120/gp41 spikes, lipid membrane, viral size comparison.
     3. *Internal Anatomy (Cutaway / Exploded)*: p17 Matrix, p24 conical capsid, ssRNA dimer, Reverse Transcriptase (RT), Integrase, Protease.
     4. *Reverse Transcription Stage*: Visualizing viral RNA to single-strand cDNA to double-stranded proviral DNA.
   - Interactive parameters: Auto-rotation speed, major/minor groove markers, nucleotide color key, cross-section slider.

2. **Replication Cycle (6 Interactive Stages)**:
   - Stage 1: Attachment & Binding (gp120 binds CD4 receptor & CCR5/CXCR4 co-receptor).
   - Stage 2: Fusion & Entry (Viral membrane fuses with CD4 T-cell membrane).
   - Stage 3: Reverse Transcription (RT enzyme translates viral RNA into proviral DNA).
   - Stage 4: Integration (Integrase enzyme inserts viral DNA into host T-cell chromosome).
   - Stage 5: Transcription & Translation (Host machinery produces viral polyproteins).
   - Stage 6: Assembly, Budding & Maturation (Protease cleaves polyproteins into functional units).

3. **Drug Mechanism & Medical Interventions**:
   - NRTIs & NNRTIs: Block Reverse Transcriptase.
   - Integrase Strand Transfer Inhibitors (INSTIs): Block integration into host DNA.
   - Protease Inhibitors (PIs): Prevent budding virus from maturing.
   - Entry / Fusion Inhibitors: Block CD4/CCR5 attachment.
   - Explanation of Treatment as Prevention (TasP) & $U=U$ (Undetectable = Untransmittable).

4. **Public Health, Prevention & Transmission Facts**:
   - Modes of transmission (unprotected sex, blood sharing, vertical mother-to-child) vs Non-transmission vectors (saliva, sweat, tears, toilet seats, casual contact, insects).
   - Prevention toolkit: PrEP (pre-exposure prophylaxis), PEP (post-exposure prophylaxis within 72 hours), barrier methods, harm reduction.
   - Testing guidelines (rapid antigen/antibody tests, window periods, confirmatory viral RNA PCR tests).

5. **Myth Buster & Knowledge Check Quiz**:
   - 6–8 curated questions testing understanding of transmission, U=U, and biology.
   - Immediate feedback with scientific explanations.

---

## 6. What's Left to the Builder
- Exact color palette hex values within modern dark laboratory theme (e.g. Slate 900 background, Cyan/Emerald nucleotide highlights, Coral/Rose for viral glycoproteins).
- Three.js animation tick loop optimization using `requestAnimationFrame` and clean memory disposal on unmount.
- Specific responsive breakpoints for tablet and mobile screens.
