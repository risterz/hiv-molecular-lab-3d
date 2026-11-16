# HIV 3D Educational Science Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mathematically precise, interactive educational 3D web platform exploring HIV biology, procedural B-DNA/RNA reverse transcription, viral anatomy with cutaway capsid/enzymes, antiretroviral drug mechanisms, and public health prevention science.

**Architecture:** A Vite + React 18 + TypeScript application featuring a dedicated procedural Three.js WebGL canvas (zero external 3D mesh files, all geometries generated via parametric equations and Fibonacci lattices) paired with responsive interactive educational modules (Replication Stepper, Drug Targets, Prevention Hub, Myth-Buster Quiz).

**Tech Stack:** React 18, TypeScript, Three.js (`three` + `@types/three`), Vite, Tailwind CSS, Lucide React, Vitest.

**Spec:** [docs/superpowers/specs/2026-11-16-hiv-educational-3d-lab-design.md](file:///d:/Antigravity/docs/superpowers/specs/2026-11-16-hiv-educational-3d-lab-design.md)

## Global Constraints
- Target workspace directory: `d:\Antigravity\hiv-science-lab`
- 100% procedural 3D models: No external `.gltf`, `.glb`, or `.obj` files. All helices, virions, capsids, and molecules generated via code.
- Responsive, dark-themed laboratory UI styling using Tailwind CSS.
- Medically accurate terminology and current CDC/WHO public health guidelines (U=U, PrEP, PEP).
- WebGL memory management: Explicit disposal of Three.js geometries, materials, and requestAnimationFrame loops on unmount.

## Review Focus
1. WebGL Context Loss / Disposal: Switching between 3D scene modes must not leak GPU memory or throw unhandled context loss errors.
2. Responsive Canvas Sizing: CanvasContainer must accurately handle viewport resizing and pixel ratio scaling across mobile and high-DPI desktop screens without stretching or distorted aspect ratios.
3. DNA Parametric Accuracy: Helix generator must maintain exact 10.5 base pairs per turn with distinguishable major ($\approx 222.5^\circ$) and minor ($\approx 137.5^\circ$) grooves.
4. Fibonacci Sphere Distribution: Glycoprotein spikes must be uniformly distributed across the viral sphere without clustering at poles or overlapping poles.
5. Quiz Scoring Edge Cases: Answering all questions, skipping, and retrying must maintain clean state transitions without NaN scores.

---

### Task 1: Project Scaffolding & Setup

**Files:**
- Create: `d:\Antigravity\hiv-science-lab/package.json`
- Create: `d:\Antigravity\hiv-science-lab/vite.config.ts`
- Create: `d:\Antigravity\hiv-science-lab/tsconfig.json`
- Create: `d:\Antigravity\hiv-science-lab/tailwind.config.js`
- Create: `d:\Antigravity\hiv-science-lab/postcss.config.js`
- Create: `d:\Antigravity\hiv-science-lab/index.html`
- Create: `d:\Antigravity\hiv-science-lab/src/index.css`
- Create: `d:\Antigravity\hiv-science-lab/src/main.tsx`
- Create: `d:\Antigravity\hiv-science-lab/src/App.tsx`
- Test: `d:\Antigravity\hiv-science-lab/src/test/smoke.test.ts`

**Interfaces:**
- Produces: Runnable Vite React TS app with Three.js, Lucide React, Tailwind CSS, and Vitest test runner.

- [ ] **Step 1: Write the failing smoke test**
```typescript
// src/test/smoke.test.ts
import { describe, it, expect } from 'vitest';

describe('Project Environment Smoke Test', () => {
  it('confirms vitest runner works', () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 2: Initialize Vite React TypeScript project and install dependencies**
Run in `d:\Antigravity\hiv-science-lab`:
```bash
npm init -y
npm install react react-dom three lucide-react clsx tailwind-merge
npm install -D typescript @types/react @types/react-dom @types/three @vitejs/plugin-react vite tailwindcss postcss autoprefixer vitest
```

- [ ] **Step 3: Create configuration files and App shell**
Set up `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/index.css`, `src/main.tsx`, and `src/App.tsx`.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/test/smoke.test.ts`
Expected: PASS

- [ ] **Step 5: Verify build succeeds**
Run: `npx vite build`
Expected: Build succeeds with `dist/` created.

---

### Task 2: Procedural B-DNA Mathematical Generator & Unit Tests

**Files:**
- Create: `d:\Antigravity\hiv-science-lab/src/utils/dnaMath.ts`
- Test: `d:\Antigravity\hiv-science-lab/src/test/dnaMath.test.ts`
- Create: `d:\Antigravity\hiv-science-lab/src/components/ModelViewer/ProceduralDNA.ts`

**Interfaces:**
- Produces: `generateDnaGeometry(params: DnaParams): DnaGeometries`
- Consumed by: `CanvasContainer.tsx`

- [ ] **Step 1: Write failing unit tests for DNA mathematical coordinates**
```typescript
// src/test/dnaMath.test.ts
import { describe, it, expect } from 'vitest';
import { calculateDnaPoints, BASE_PAIRS, DnaNucleotide } from '../utils/dnaMath';

describe('dnaMath', () => {
  it('generates 10.5 base pairs per helical pitch turn with major/minor groove offset', () => {
    const { strand1, strand2, basePairs } = calculateDnaPoints({
      turns: 2,
      bpPerTurn: 10.5,
      radius: 1.0,
      pitch: 3.4,
    });
    expect(strand1.length).toBeGreaterThan(20);
    expect(strand2.length).toBe(strand1.length);
    expect(basePairs.length).toBe(21);
    
    // Check complementary pairing
    basePairs.forEach(bp => {
      if (bp.base1 === 'A') expect(bp.base2).toBe('T');
      if (bp.base1 === 'T') expect(bp.base2).toBe('A');
      if (bp.base1 === 'G') expect(bp.base2).toBe('C');
      if (bp.base1 === 'C') expect(bp.base2).toBe('G');
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/test/dnaMath.test.ts`
Expected: FAIL ("cannot find module '../utils/dnaMath'")

- [ ] **Step 3: Implement `src/utils/dnaMath.ts`**
Implement parametric equations:
$P_1(t) = (R\cos(t), \frac{p}{2\pi}t, R\sin(t))$,
$P_2(t) = (R\cos(t + 2.4), \frac{p}{2\pi}t, R\sin(t + 2.4))$.
Implement complementary base generation with standard nucleotide color codes.

- [ ] **Step 4: Implement `src/components/ModelViewer/ProceduralDNA.ts`**
Create Three.js Group builder that converts calculated curves and base pair coordinates into `TubeGeometry`, `CylinderGeometry`, and `SphereGeometry` instances.

- [ ] **Step 5: Run test to verify it passes**
Run: `npx vitest run src/test/dnaMath.test.ts`
Expected: PASS

---

### Task 3: Procedural HIV Virion Mathematical Generator & Cutaway

**Files:**
- Create: `d:\Antigravity\hiv-science-lab/src/utils/virionMath.ts`
- Test: `d:\Antigravity\hiv-science-lab/src/test/virionMath.test.ts`
- Create: `d:\Antigravity\hiv-science-lab/src/components/ModelViewer/ProceduralVirion.ts`

**Interfaces:**
- Produces: `generateFibonacciSpherePoints(count: number, radius: number): Vector3[]`
- Produces: `buildVirionScene(options: VirionOptions): THREE.Group`
- Consumed by: `CanvasContainer.tsx`

- [ ] **Step 1: Write failing unit test for Fibonacci sphere distribution and capsid geometry**
```typescript
// src/test/virionMath.test.ts
import { describe, it, expect } from 'vitest';
import { generateFibonacciSpherePoints, calculateCapsidVertices } from '../utils/virionMath';

describe('virionMath', () => {
  it('generates uniform spherical points via Fibonacci lattice', () => {
    const points = generateFibonacciSpherePoints(72, 4.0);
    expect(points.length).toBe(72);
    // Ensure all points lie precisely on sphere radius
    points.forEach(p => {
      const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
      expect(dist).toBeCloseTo(4.0, 3);
    });
  });

  it('calculates conical capsid dimensions', () => {
    const capsid = calculateCapsidVertices({ height: 5.0, topRadius: 1.2, bottomRadius: 0.6 });
    expect(capsid.topRadius).toBe(1.2);
    expect(capsid.bottomRadius).toBe(0.6);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/test/virionMath.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/utils/virionMath.ts`**
Implement Fibonacci sphere algorithm, conical capsid coordinates, twin RNA coiled parametric curves, and enzyme cluster offset coordinates.

- [ ] **Step 4: Implement `src/components/ModelViewer/ProceduralVirion.ts`**
Construct Three.js Group:
- Lipid envelope with semi-translucent shader / material and cross-section clipping plane toggle ($z > 0$).
- 72 trimeric gp120/gp41 spikes placed on Fibonacci points with outward orientation.
- Internal p17 matrix layer, p24 truncated conical capsid, coiled twin ssRNA strands, and color-coded enzyme clusters (RT = Emerald, Integrase = Violet, Protease = Amber).
- 3D interactive hotspot anchor vectors.

- [ ] **Step 5: Run test to verify it passes**
Run: `npx vitest run src/test/virionMath.test.ts`
Expected: PASS

---

### Task 4: Procedural Reverse Transcription & 3D Drug Inhibitor

**Files:**
- Create: `d:\Antigravity\hiv-science-lab/src/utils/reverseTranscriptionMath.ts`
- Test: `d:\Antigravity\hiv-science-lab/src/test/reverseTranscriptionMath.test.ts`
- Create: `d:\Antigravity\hiv-science-lab/src/components/ModelViewer/ProceduralReverseTranscription.ts`

**Interfaces:**
- Produces: `calculateUnzippingPoints(progress: number, drugInhibited: boolean)`
- Produces: `buildReverseTranscriptionScene(options): THREE.Group`
- Consumed by: `CanvasContainer.tsx`

- [ ] **Step 1: Write failing unit test for reverse transcription interpolation**
```typescript
// src/test/reverseTranscriptionMath.test.ts
import { describe, it, expect } from 'vitest';
import { calculateReverseTranscriptionState } from '../utils/reverseTranscriptionMath';

describe('reverseTranscriptionMath', () => {
  it('correctly transitions RNA template to cDNA strand across elongation progress', () => {
    const uninhibited = calculateReverseTranscriptionState({ progress: 0.6, isDrugInhibited: false });
    expect(uninhibited.synthesizedBpCount).toBeGreaterThan(0);
    expect(uninhibited.chainTerminated).toBe(false);

    const inhibited = calculateReverseTranscriptionState({ progress: 0.6, isDrugInhibited: true, stopAtBp: 5 });
    expect(inhibited.chainTerminated).toBe(true);
    expect(inhibited.synthesizedBpCount).toBe(5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/test/reverseTranscriptionMath.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/utils/reverseTranscriptionMath.ts`**
Compute dynamic synthesis curve: viral RNA strand (single-stranded with Uracil), RT enzyme complex mesh position traversing the strand, incoming deoxynucleotide triphosphates (dNTPs), and NRTI chain terminator analog (e.g. Zidovudine/AZT) that lacks 3'-OH group to halt replication.

- [ ] **Step 4: Implement `src/components/ModelViewer/ProceduralReverseTranscription.ts`**
Build dynamic Three.js Group with animated RT enzyme traversal, growing cDNA duplex, and visual drug blocker docking effect.

- [ ] **Step 5: Run test to verify it passes**
Run: `npx vitest run src/test/reverseTranscriptionMath.test.ts`
Expected: PASS

---

### Task 5: 3D Canvas Studio & Interactive Controls Overlay

**Files:**
- Create: `d:\Antigravity\hiv-science-lab/src/components/ModelViewer/CanvasContainer.tsx`
- Create: `d:\Antigravity\hiv-science-lab/src/components/ModelViewer/ControlsOverlay.tsx`
- Create: `d:\Antigravity\hiv-science-lab/src/components/ModelViewer/HotspotModal.tsx`
- Create: `d:\Antigravity\hiv-science-lab/src/data/anatomyData.ts`
- Test: `d:\Antigravity\hiv-science-lab/src/test/canvasContainer.test.tsx`

**Interfaces:**
- Consumes: `ProceduralDNA`, `ProceduralVirion`, `ProceduralReverseTranscription`, `anatomyData`
- Produces: Complete interactive 3D studio with scene switcher, camera orbit, cutaway toggle, animation slider, and hotspot details.

- [ ] **Step 1: Create `src/data/anatomyData.ts` with hotspot data and descriptions**
Include gp120, gp41, lipid envelope, p17 matrix, p24 capsid, (+)ssRNA viral genome, Reverse Transcriptase, Integrase, Protease with biological and clinical significance.

- [ ] **Step 2: Implement `HotspotModal.tsx` and `ControlsOverlay.tsx`**
Create clean glassmorphic HUD controls:
- Model Selector: [B-DNA Double Helix, HIV Virion 3D, Virion Cutaway & Core, Reverse Transcription].
- Sliders: Rotation Speed, Cutaway Angle, Elongation Progress.
- Toggles: NRTI Drug Blocker ON/OFF, Base Pair Labels ON/OFF.
- Info Drawer / Modal for clicked hotspots.

- [ ] **Step 3: Implement `CanvasContainer.tsx`**
Initialize Three.js WebGLRenderer, PerspectiveCamera, OrbitControls (or custom mouse/touch drag rotation handler), Ambient/Directional lighting, raycaster for hotspot clicks, and clean disposal on component unmount.

- [ ] **Step 4: Write test verifying canvas container mounts and responds to scene switching**
Run: `npx vitest run src/test/canvasContainer.test.tsx`
Expected: PASS

---

### Task 6: Interactive 6-Stage Replication Lifecycle Module

**Files:**
- Create: `d:\Antigravity\hiv-science-lab/src/data/replicationStages.ts`
- Create: `d:\Antigravity\hiv-science-lab/src/components/Modules/ReplicationCycle.tsx`
- Test: `d:\Antigravity\hiv-science-lab/src/test/replicationCycle.test.tsx`

**Interfaces:**
- Produces: Interactive 6-stage lifecycle stepper component.

- [ ] **Step 1: Create `src/data/replicationStages.ts`**
Define structured data for 6 stages:
1. Binding (Attachment) - gp120 + CD4 & CCR5
2. Fusion - gp41 hairpins & viral entry
3. Reverse Transcription - ssRNA to proviral dsDNA
4. Integration - Integrase inserting into host DNA
5. Replication & Translation - Host RNA Pol II synthesizing viral mRNA & proteins
6. Assembly & Budding - Gag/Gag-Pol polyproteins assembling at membrane, Protease maturation cleavage

- [ ] **Step 2: Implement `src/components/Modules/ReplicationCycle.tsx`**
Build interactive stepper with:
- Stage tabs with status indicators.
- High-resolution SVG / Canvas diagrams showing cellular interactions.
- Key viral proteins & host targets involved.
- Targeted drug interventions for each stage (with links to Drug Targets tab).
- "Jump to 3D Demonstration" button when viewing Stage 3 (Reverse Transcription).

- [ ] **Step 3: Run component tests**
Run: `npx vitest run src/test/replicationCycle.test.tsx`
Expected: PASS

---

### Task 7: Drug Targets & Public Health Prevention Hub

**Files:**
- Create: `d:\Antigravity\hiv-science-lab/src/data/drugMechanisms.ts`
- Create: `d:\Antigravity\hiv-science-lab/src/components/Modules/DrugTargets.tsx`
- Create: `d:\Antigravity\hiv-science-lab/src/components/Modules/PreventionAndTesting.tsx`
- Test: `d:\Antigravity\hiv-science-lab/src/test/drugTargets.test.tsx`

**Interfaces:**
- Produces: Educational modules for Antiretroviral therapies and transmission/prevention guidelines.

- [ ] **Step 1: Create `src/data/drugMechanisms.ts`**
Cover 5 major drug classes:
- NRTIs (Nucleoside Reverse Transcriptase Inhibitors): e.g. Emtricitabine, Tenofovir
- NNRTIs (Non-Nucleoside RTIs): e.g. Efavirenz, Doravirine
- INSTIs (Integrase Strand Transfer Inhibitors): e.g. Dolutegravir, Bictegravir
- PIs (Protease Inhibitors): e.g. Darunavir, Atazanavir
- Entry / Post-Attachment Inhibitors: e.g. Maraviroc, Fostemsavir, Ibalizumab

- [ ] **Step 2: Implement `DrugTargets.tsx`**
Build interactive drug explorer with mechanism filter, target diagrams, resistance explanations, and U=U (Undetectable = Untransmittable) science.

- [ ] **Step 3: Implement `PreventionAndTesting.tsx`**
Comprehensive public health guides:
- Transmission matrices: High risk vs zero risk (air, saliva, touch, mosquitos).
- PrEP (Pre-Exposure Prophylaxis) efficacy & daily vs on-demand protocols.
- PEP (Post-Exposure Prophylaxis) 72-hour emergency window.
- Testing methods (4th-generation Ag/Ab immunoassay, nucleic acid RNA tests, window periods).

- [ ] **Step 4: Run test to verify module rendering**
Run: `npx vitest run src/test/drugTargets.test.tsx`
Expected: PASS

---

### Task 8: Myth-Buster Interactive Quiz & Final App Integration

**Files:**
- Create: `d:\Antigravity\hiv-science-lab/src/data/quizQuestions.ts`
- Create: `d:\Antigravity\hiv-science-lab/src/components/Modules/MythBusterQuiz.tsx`
- Create: `d:\Antigravity\hiv-science-lab/src/components/Navigation.tsx`
- Modify: `d:\Antigravity\hiv-science-lab/src/App.tsx`
- Test: `d:\Antigravity\hiv-science-lab/src/test/appIntegration.test.tsx`

**Interfaces:**
- Produces: Integrated educational web application with navigation, state persistence, and interactive quiz.

- [ ] **Step 1: Create `src/data/quizQuestions.ts`**
8 evidence-based quiz questions covering transmission, U=U, molecular genetics (reverse transcriptase lack of proofreading), and prevention.

- [ ] **Step 2: Implement `MythBusterQuiz.tsx`**
Interactive quiz interface with question cards, immediate rationale explanations, score tracking, and review summary.

- [ ] **Step 3: Implement `Navigation.tsx` and integrate in `App.tsx`**
Navigation header with tabs:
1. 🔬 3D Molecular Lab (Model Explorer)
2. 🔄 Viral Replication Cycle
3. 💊 Antiretroviral Drug Targets
4. 🛡️ Prevention, Testing & U=U
5. 🧠 Myth-Buster Quiz
Include quick summary stats, audio/visual theme toggles, and responsive mobile menu.

- [ ] **Step 4: Run full test suite**
Run: `npx vitest run`
Expected: All tests pass.

- [ ] **Step 5: Run production build verification**
Run: `npx vite build`
Expected: Build passes with zero TypeScript or bundling errors.
