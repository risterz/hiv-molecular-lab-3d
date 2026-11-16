import * as THREE from 'three';
import {
  calculateReverseTranscriptionState,
  ReverseTranscriptionState,
  CDnaBase,
} from '../../utils/reverseTranscriptionMath';

export interface ProceduralReverseTranscriptionOptions {
  progress?: number;
  isDrugInhibited?: boolean;
}

export class ProceduralReverseTranscriptionModel {
  public group: THREE.Group;
  private baseGeometries: THREE.BufferGeometry[] = [];
  private baseMaterials: THREE.Material[] = [];
  private dynamicGeometries: THREE.BufferGeometry[] = [];
  private dynamicMaterials: THREE.Material[] = [];
  private enzymeMesh: THREE.Group;
  private cDnaMeshGroup: THREE.Group;
  private inhibitorMesh: THREE.Group;
  private currentProgress: number = 0.5;
  private isDrugInhibited: boolean = false;

  constructor(options: ProceduralReverseTranscriptionOptions = {}) {
    this.group = new THREE.Group();
    this.group.name = 'ProceduralReverseTranscription';

    this.enzymeMesh = new THREE.Group();
    this.cDnaMeshGroup = new THREE.Group();
    this.inhibitorMesh = new THREE.Group();

    this.currentProgress = options.progress ?? 0.5;
    this.isDrugInhibited = options.isDrugInhibited ?? false;

    this.build();
  }

  private build() {
    const state = calculateReverseTranscriptionState({
      progress: this.currentProgress,
      isDrugInhibited: this.isDrugInhibited,
    });

    // 1. Template Viral ssRNA Backbone Curve
    const rnaCurvePoints = state.templateCurvePoints.map((p) => new THREE.Vector3(p.x, p.y, p.z));
    const rnaCurve = new THREE.CatmullRomCurve3(rnaCurvePoints);
    const rnaTubeGeo = new THREE.TubeGeometry(rnaCurve, 100, 0.1, 10, false);
    this.baseGeometries.push(rnaTubeGeo);

    const rnaMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Orange 500 (ssRNA backbone)
      roughness: 0.35,
      metalness: 0.1,
    });
    this.baseMaterials.push(rnaMat);
    this.group.add(new THREE.Mesh(rnaTubeGeo, rnaMat));

    // 2. cDNA Strand & Base Pairs Group
    this.group.add(this.cDnaMeshGroup);
    this.group.add(this.enzymeMesh);
    this.group.add(this.inhibitorMesh);

    this.rebuildCdnaAndEnzyme(state);
  }

  private disposeDynamicResources() {
    this.dynamicGeometries.forEach((g) => g.dispose());
    this.dynamicMaterials.forEach((m) => m.dispose());
    this.dynamicGeometries = [];
    this.dynamicMaterials = [];
  }

  private rebuildCdnaAndEnzyme(state: ReverseTranscriptionState) {
    // Clean up GPU VRAM on every tick to prevent memory leak
    this.disposeDynamicResources();

    while (this.cDnaMeshGroup.children.length > 0) {
      this.cDnaMeshGroup.remove(this.cDnaMeshGroup.children[0]);
    }
    while (this.enzymeMesh.children.length > 0) {
      this.enzymeMesh.remove(this.enzymeMesh.children[0]);
    }
    while (this.inhibitorMesh.children.length > 0) {
      this.inhibitorMesh.remove(this.inhibitorMesh.children[0]);
    }

    // A. cDNA Backbone
    if (state.cDnaCurvePoints.length > 1) {
      const cdnaPoints = state.cDnaCurvePoints.map((p) => new THREE.Vector3(p.x, p.y, p.z));
      const cdnaCurve = new THREE.CatmullRomCurve3(cdnaPoints);
      const cdnaTubeGeo = new THREE.TubeGeometry(cdnaCurve, Math.max(10, state.synthesizedBpCount * 6), 0.1, 10, false);
      this.dynamicGeometries.push(cdnaTubeGeo);

      const cdnaMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8, // Sky 400 (cDNA)
        roughness: 0.3,
        metalness: 0.15,
      });
      this.dynamicMaterials.push(cdnaMat);
      this.cDnaMeshGroup.add(new THREE.Mesh(cdnaTubeGeo, cdnaMat));
    }

    // B. Base pair rungs
    const sphereGeo = new THREE.SphereGeometry(0.12, 10, 10);
    this.dynamicGeometries.push(sphereGeo);

    state.cDnaBases.forEach((bp: CDnaBase) => {
      const vT = new THREE.Vector3(bp.pTemplate.x, bp.pTemplate.y, bp.pTemplate.z);
      const vC = new THREE.Vector3(bp.pCdna.x, bp.pCdna.y, bp.pCdna.z);

      // Half-cylinder template
      this.createSegment(vT, vC, bp.hexColor, bp.isTerminator);

      // Junction spheres
      const sMat = new THREE.MeshStandardMaterial({
        color: bp.isTerminator ? 0xef4444 : 0x0284c7,
        roughness: 0.2,
      });
      this.dynamicMaterials.push(sMat);

      const sNode = new THREE.Mesh(sphereGeo, sMat);
      sNode.position.copy(vC);
      this.cDnaMeshGroup.add(sNode);
    });

    // C. Reverse Transcriptase Enzyme Complex (p66 / p51 heterodimer)
    const rtPos = new THREE.Vector3(state.enzymePosition.x, state.enzymePosition.y, state.enzymePosition.z);
    this.enzymeMesh.position.copy(rtPos);

    // Palm domain
    const palmGeo = new THREE.SphereGeometry(0.48, 16, 16);
    // Thumb domain
    const thumbGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.65, 12);
    // Fingers domain
    const fingersGeo = new THREE.CylinderGeometry(0.2, 0.26, 0.72, 12);
    this.dynamicGeometries.push(palmGeo, thumbGeo, fingersGeo);

    const enzymeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald 500
      roughness: 0.4,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    this.dynamicMaterials.push(enzymeMat);

    const palm = new THREE.Mesh(palmGeo, enzymeMat);
    palm.position.set(0, 0, 0);
    this.enzymeMesh.add(palm);

    const thumb = new THREE.Mesh(thumbGeo, enzymeMat);
    thumb.position.set(0.35, 0.25, 0);
    thumb.rotation.z = Math.PI / 4;
    this.enzymeMesh.add(thumb);

    const fingers = new THREE.Mesh(fingersGeo, enzymeMat);
    fingers.position.set(-0.35, 0.25, 0);
    fingers.rotation.z = -Math.PI / 4;
    this.enzymeMesh.add(fingers);

    // D. NRTI Inhibitor Blocker (if chain terminated)
    if (state.chainTerminated) {
      this.inhibitorMesh.position.copy(rtPos);

      const blockerGeo = new THREE.OctahedronGeometry(0.32, 0);
      const ringGeo = new THREE.TorusGeometry(0.55, 0.05, 12, 24);
      this.dynamicGeometries.push(blockerGeo, ringGeo);

      const blockerMat = new THREE.MeshStandardMaterial({
        color: 0xef4444, // Red 500
        emissive: 0xb91c1c,
        emissiveIntensity: 0.6,
        roughness: 0.1,
      });
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf87171,
        wireframe: true,
      });
      this.dynamicMaterials.push(blockerMat, ringMat);

      const blocker = new THREE.Mesh(blockerGeo, blockerMat);
      blocker.position.set(0, -0.2, 0.4);
      this.inhibitorMesh.add(blocker);

      const halo = new THREE.Mesh(ringGeo, ringMat);
      halo.position.set(0, -0.2, 0.4);
      this.inhibitorMesh.add(halo);
    }
  }

  private createSegment(pA: THREE.Vector3, pB: THREE.Vector3, hexColor: number, isTerminator?: boolean) {
    const distance = pA.distanceTo(pB);
    const cylGeo = new THREE.CylinderGeometry(0.06, 0.06, distance, 10);
    this.dynamicGeometries.push(cylGeo);

    const mat = new THREE.MeshStandardMaterial({
      color: hexColor,
      roughness: 0.3,
      emissive: isTerminator ? 0xef4444 : 0x000000,
      emissiveIntensity: isTerminator ? 0.4 : 0.0,
    });
    this.dynamicMaterials.push(mat);

    const mesh = new THREE.Mesh(cylGeo, mat);
    mesh.position.copy(new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5));
    const orientation = new THREE.Vector3().subVectors(pB, pA).normalize();
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), orientation);

    this.cDnaMeshGroup.add(mesh);
  }

  public update(progress: number, isDrugInhibited: boolean) {
    this.currentProgress = progress;
    this.isDrugInhibited = isDrugInhibited;
    const state = calculateReverseTranscriptionState({
      progress,
      isDrugInhibited,
    });
    this.rebuildCdnaAndEnzyme(state);
  }

  public dispose() {
    this.disposeDynamicResources();
    this.baseGeometries.forEach((g) => g.dispose());
    this.baseMaterials.forEach((m) => m.dispose());
    this.baseGeometries = [];
    this.baseMaterials = [];
  }
}
