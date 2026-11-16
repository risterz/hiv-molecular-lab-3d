import * as THREE from 'three';
import { calculateDnaPoints, BASE_PAIRS, DnaBasePairCoord } from '../../utils/dnaMath';

export interface ProceduralDnaOptions {
  turns?: number;
  bpPerTurn?: number;
  radius?: number;
  pitch?: number;
  showHydrogenBonds?: boolean;
}

export class ProceduralDnaModel {
  public group: THREE.Group;
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];

  constructor(options: ProceduralDnaOptions = {}) {
    this.group = new THREE.Group();
    this.group.name = 'ProceduralDnaDoubleHelix';
    this.build(options);
  }

  private build(options: ProceduralDnaOptions) {
    const dnaData = calculateDnaPoints({
      turns: options.turns ?? 2.5,
      bpPerTurn: options.bpPerTurn ?? 10.5,
      radius: options.radius ?? 1.2,
      pitch: options.pitch ?? 3.4,
    });

    // 1. Backbones via CatmullRomCurve3 and TubeGeometry
    const curve1Points = dnaData.strand1.map((p) => new THREE.Vector3(p.x, p.y, p.z));
    const curve2Points = dnaData.strand2.map((p) => new THREE.Vector3(p.x, p.y, p.z));

    const curve1 = new THREE.CatmullRomCurve3(curve1Points);
    const curve2 = new THREE.CatmullRomCurve3(curve2Points);

    const tubeGeo1 = new THREE.TubeGeometry(curve1, 140, 0.12, 12, false);
    const tubeGeo2 = new THREE.TubeGeometry(curve2, 140, 0.12, 12, false);
    this.geometries.push(tubeGeo1, tubeGeo2);

    const backboneMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Sky blue
      roughness: 0.3,
      metalness: 0.2,
    });
    const backboneMat2 = new THREE.MeshStandardMaterial({
      color: 0x818cf8, // Indigo
      roughness: 0.3,
      metalness: 0.2,
    });
    this.materials.push(backboneMat1, backboneMat2);

    this.group.add(new THREE.Mesh(tubeGeo1, backboneMat1));
    this.group.add(new THREE.Mesh(tubeGeo2, backboneMat2));

    // 2. Base Pairs & Hydrogen Bonds
    const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
    this.geometries.push(sphereGeo);

    dnaData.basePairs.forEach((bp) => {
      this.createBasePairRung(bp);
    });
  }

  private createBasePairRung(bp: DnaBasePairCoord) {
    const v1 = new THREE.Vector3(bp.p1.x, bp.p1.y, bp.p1.z);
    const v2 = new THREE.Vector3(bp.p2.x, bp.p2.y, bp.p2.z);
    const center = new THREE.Vector3(bp.center.x, bp.center.y, bp.center.z);

    const color1 = BASE_PAIRS[bp.base1].hexColor;
    const color2 = BASE_PAIRS[bp.base2].hexColor;

    // Segment 1 (p1 to center)
    this.createCylinderSegment(v1, center, color1, `bp_${bp.index}_${bp.base1}`);
    // Segment 2 (center to p2)
    this.createCylinderSegment(center, v2, color2, `bp_${bp.index}_${bp.base2}`);

    // Phosphate junction spheres
    const sphereGeo = new THREE.SphereGeometry(0.18, 12, 12);
    this.geometries.push(sphereGeo);

    const sphereMat1 = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 });
    const sphereMat2 = new THREE.MeshStandardMaterial({ color: 0x4f46e5, roughness: 0.2 });
    this.materials.push(sphereMat1, sphereMat2);

    const sphere1 = new THREE.Mesh(sphereGeo, sphereMat1);
    sphere1.position.copy(v1);
    this.group.add(sphere1);

    const sphere2 = new THREE.Mesh(sphereGeo, sphereMat2);
    sphere2.position.copy(v2);
    this.group.add(sphere2);

    // Hydrogen bond dashed nodes at center
    const bondGeo = new THREE.SphereGeometry(0.06, 8, 8);
    this.geometries.push(bondGeo);
    const bondMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.materials.push(bondMat);

    const bondNode = new THREE.Mesh(bondGeo, bondMat);
    bondNode.position.copy(center);
    this.group.add(bondNode);
  }

  private createCylinderSegment(pA: THREE.Vector3, pB: THREE.Vector3, hexColor: number, name: string) {
    const distance = pA.distanceTo(pB);
    const cylGeo = new THREE.CylinderGeometry(0.08, 0.08, distance, 12);
    this.geometries.push(cylGeo);

    const cylMat = new THREE.MeshStandardMaterial({
      color: hexColor,
      roughness: 0.35,
      metalness: 0.1,
    });
    this.materials.push(cylMat);

    const mesh = new THREE.Mesh(cylGeo, cylMat);
    mesh.name = name;

    // Position and orient cylinder along segment
    const midPoint = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
    mesh.position.copy(midPoint);

    const orientation = new THREE.Vector3().subVectors(pB, pA).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    mesh.quaternion.setFromUnitVectors(up, orientation);

    this.group.add(mesh);
  }

  public dispose() {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
    this.geometries = [];
    this.materials = [];
  }
}
