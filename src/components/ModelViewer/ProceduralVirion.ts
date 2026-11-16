import * as THREE from 'three';
import {
  generateFibonacciSpherePoints,
  generateRnaCoilPoints,
  VIRION_HOTSPOTS,
  VirionHotspot,
} from '../../utils/virionMath';

export interface ProceduralVirionOptions {
  radius?: number;
  spikeCount?: number;
  isCutaway?: boolean;
}

export class ProceduralVirionModel {
  public group: THREE.Group;
  public hotspotObjects: THREE.Object3D[] = [];
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];
  private clippingPlane: THREE.Plane;
  private isCutawayActive: boolean = false;

  constructor(options: ProceduralVirionOptions = {}) {
    this.group = new THREE.Group();
    this.group.name = 'ProceduralHivVirion';
    // Cutaway clipping plane: cuts along Z axis
    this.clippingPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
    this.isCutawayActive = options.isCutaway ?? false;
    this.build(options);
  }

  private build(options: ProceduralVirionOptions) {
    const radius = options.radius ?? 3.8;
    const spikeCount = options.spikeCount ?? 72;

    // 1. Outer Lipid Bilayer Envelope
    const sphereGeo = new THREE.SphereGeometry(radius, 48, 36);
    this.geometries.push(sphereGeo);

    const membraneMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9, // Sky 500
      roughness: 0.45,
      metalness: 0.1,
      transparent: true,
      opacity: 0.78,
      clippingPlanes: this.isCutawayActive ? [this.clippingPlane] : [],
      clipShadows: true,
      side: THREE.DoubleSide,
    });
    this.materials.push(membraneMat);

    const membraneMesh = new THREE.Mesh(sphereGeo, membraneMat);
    membraneMesh.name = 'virion_lipid_membrane';
    this.group.add(membraneMesh);

    // 2. Glycoprotein Spikes (gp120 clover trimer + gp41 stalk)
    const spikePoints = generateFibonacciSpherePoints(spikeCount, radius);
    const stalkGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.7, 8);
    const headGeo = new THREE.SphereGeometry(0.14, 10, 10);
    this.geometries.push(stalkGeo, headGeo);

    const stalkMat = new THREE.MeshStandardMaterial({
      color: 0xfb7185, // Rose 400 (gp41)
      roughness: 0.3,
      clippingPlanes: this.isCutawayActive ? [this.clippingPlane] : [],
    });
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e, // Rose 500 (gp120)
      roughness: 0.2,
      metalness: 0.1,
      clippingPlanes: this.isCutawayActive ? [this.clippingPlane] : [],
    });
    this.materials.push(stalkMat, headMat);

    spikePoints.forEach((point, i) => {
      // In cutaway mode, suppress spikes on the cut hemisphere for clean cross-section visibility
      if (this.isCutawayActive && point.z > 0.2) return;

      const spikeGroup = new THREE.Group();
      const pos = new THREE.Vector3(point.x, point.y, point.z);
      spikeGroup.position.copy(pos);

      // Orient outward along sphere normal
      const normal = pos.clone().normalize();
      spikeGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

      // gp41 Stalk
      const stalk = new THREE.Mesh(stalkGeo, stalkMat);
      stalk.position.set(0, 0.35, 0);
      spikeGroup.add(stalk);

      // gp120 Trimer Head (3 clover lobes)
      for (let angle = 0; angle < 3; angle++) {
        const rad = (angle * 2 * Math.PI) / 3;
        const lobe = new THREE.Mesh(headGeo, headMat);
        lobe.position.set(Math.cos(rad) * 0.14, 0.78, Math.sin(rad) * 0.14);
        spikeGroup.add(lobe);
      }

      spikeGroup.name = `spike_${i}`;
      this.group.add(spikeGroup);
    });

    // 3. Inner p17 Matrix Shell (visible in cutaway)
    const matrixGeo = new THREE.SphereGeometry(radius * 0.88, 36, 24);
    this.geometries.push(matrixGeo);

    const matrixMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1, // Indigo 500
      roughness: 0.5,
      metalness: 0.2,
      wireframe: true,
      clippingPlanes: this.isCutawayActive ? [this.clippingPlane] : [],
    });
    this.materials.push(matrixMat);

    const matrixMesh = new THREE.Mesh(matrixGeo, matrixMat);
    matrixMesh.name = 'virion_matrix_p17';
    this.group.add(matrixMesh);

    // 4. Conical p24 Capsid Core (Fullerene cone)
    const capsidHeight = 4.8;
    const capsidTopR = 1.35;
    const capsidBottomR = 0.65;
    const capsidGeo = new THREE.CylinderGeometry(capsidTopR, capsidBottomR, capsidHeight, 20, 4, false);
    this.geometries.push(capsidGeo);

    const capsidMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan 500
      roughness: 0.35,
      metalness: 0.25,
      transparent: true,
      opacity: this.isCutawayActive ? 0.72 : 0.9,
      wireframe: !this.isCutawayActive,
    });
    this.materials.push(capsidMat);

    const capsidMesh = new THREE.Mesh(capsidGeo, capsidMat);
    capsidMesh.name = 'virion_capsid_p24';
    this.group.add(capsidMesh);

    // 5. Twin Viral (+)ssRNA Genome Strands inside Capsid
    const rnaData = generateRnaCoilPoints({ loops: 7, height: 3.6, radius: 0.45 });
    const rnaCurveA = new THREE.CatmullRomCurve3(rnaData.strandA.map((p) => new THREE.Vector3(p.x, p.y, p.z)));
    const rnaCurveB = new THREE.CatmullRomCurve3(rnaData.strandB.map((p) => new THREE.Vector3(p.x, p.y, p.z)));

    const rnaTubeGeoA = new THREE.TubeGeometry(rnaCurveA, 80, 0.05, 8, false);
    const rnaTubeGeoB = new THREE.TubeGeometry(rnaCurveB, 80, 0.05, 8, false);
    this.geometries.push(rnaTubeGeoA, rnaTubeGeoB);

    const rnaMat = new THREE.MeshStandardMaterial({
      color: 0xec4899, // Pink 500
      roughness: 0.25,
      emissive: 0x831843,
      emissiveIntensity: 0.35,
    });
    this.materials.push(rnaMat);

    this.group.add(new THREE.Mesh(rnaTubeGeoA, rnaMat));
    this.group.add(new THREE.Mesh(rnaTubeGeoB, rnaMat));

    // 6. Enzyme Globule Clusters inside Capsid
    // Reverse Transcriptase (RT p66/p51 dimer)
    this.createEnzymeCluster(
      new THREE.Vector3(-0.35, 0.3, 0.25),
      0x10b981, // Emerald 500
      'reverse_transcriptase',
      3
    );

    // Integrase (IN p32 tetramer)
    this.createEnzymeCluster(
      new THREE.Vector3(0.35, -0.4, 0.25),
      0xa855f7, // Purple 500
      'integrase',
      4
    );

    // Protease (PR p10 dimer)
    this.createEnzymeCluster(
      new THREE.Vector3(0.0, -1.2, 0.25),
      0xf59e0b, // Amber 500
      'protease',
      2
    );

    // 7. Interactive Hotspot Markers
    this.buildHotspotPins();
  }

  private createEnzymeCluster(pos: THREE.Vector3, hexColor: number, name: string, lobeCount: number) {
    const cluster = new THREE.Group();
    cluster.name = `enzyme_${name}`;
    cluster.position.copy(pos);

    const lobeGeo = new THREE.SphereGeometry(0.16, 12, 12);
    this.geometries.push(lobeGeo);

    const lobeMat = new THREE.MeshStandardMaterial({
      color: hexColor,
      roughness: 0.3,
      metalness: 0.15,
      emissive: hexColor,
      emissiveIntensity: 0.2,
    });
    this.materials.push(lobeMat);

    for (let i = 0; i < lobeCount; i++) {
      const lobe = new THREE.Mesh(lobeGeo, lobeMat);
      const angle = (i * 2 * Math.PI) / lobeCount;
      lobe.position.set(Math.cos(angle) * 0.12, (i % 2) * 0.08, Math.sin(angle) * 0.12);
      cluster.add(lobe);
    }

    this.group.add(cluster);
  }

  private buildHotspotPins() {
    this.hotspotObjects = [];
    const pinRingGeo = new THREE.RingGeometry(0.18, 0.26, 24);
    const pinCenterGeo = new THREE.SphereGeometry(0.09, 12, 12);
    this.geometries.push(pinRingGeo, pinCenterGeo);

    VIRION_HOTSPOTS.forEach((hotspot: VirionHotspot) => {
      // In full closed view, skip internal core pins to avoid occlusion clutter
      if (!this.isCutawayActive && ['reverse_transcriptase', 'integrase', 'protease', 'rna_genome', 'capsid_p24', 'matrix_p17'].includes(hotspot.id)) {
        return;
      }

      const pinGroup = new THREE.Group();
      pinGroup.name = `hotspot_${hotspot.id}`;
      pinGroup.userData = { hotspot };
      pinGroup.position.set(hotspot.anchor.x, hotspot.anchor.y, hotspot.anchor.z);

      const color = new THREE.Color(hotspot.color);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      this.materials.push(ringMat, centerMat);

      const ring = new THREE.Mesh(pinRingGeo, ringMat);
      const center = new THREE.Mesh(pinCenterGeo, centerMat);
      pinGroup.add(ring);
      pinGroup.add(center);

      this.group.add(pinGroup);
      this.hotspotObjects.push(pinGroup);
    });
  }

  public setCutaway(cutaway: boolean) {
    if (this.isCutawayActive === cutaway) return;
    this.isCutawayActive = cutaway;
    // Rebuild group with updated cutaway configuration
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }
    this.dispose();
    this.build({ isCutaway: cutaway });
  }

  public dispose() {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
    this.geometries = [];
    this.materials = [];
    this.hotspotObjects = [];
  }
}
