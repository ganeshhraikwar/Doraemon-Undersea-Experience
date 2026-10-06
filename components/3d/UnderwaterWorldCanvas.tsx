'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { audioEngine } from '@/lib/audioEngine';

interface UnderwaterWorldCanvasProps {
  currentDepthLevel: number;
  is4DXActive: boolean;
  isTekioActive: boolean;
  isPoseidonAlert: boolean;
  is5DMode?: boolean;
  isPureOceanView?: boolean;
  onSceneReady?: () => void;
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const testCanvas = document.createElement('canvas');
    return !!(testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export default function UnderwaterWorldCanvas({
  currentDepthLevel,
  is4DXActive,
  isTekioActive,
  isPoseidonAlert,
  is5DMode = false,
  isPureOceanView = false,
  onSceneReady,
}: UnderwaterWorldCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported] = useState<boolean>(checkWebGLSupport);

  // References for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const buggyGroupRef = useRef<THREE.Group | null>(null);
  const poseidonRingsRef = useRef<THREE.Group | null>(null);
  const bubblesMeshRef = useRef<THREE.Points | null>(null);
  const ventSparksRef = useRef<THREE.Points | null>(null);
  const fishGroupRef = useRef<THREE.Group | null>(null);
  const jellyfishGroupRef = useRef<THREE.Group | null>(null);
  const godRaysRef = useRef<THREE.Mesh | null>(null);

  // Target camera state based on depth level
  const targetCamZ = useRef<number>(36);
  const targetCamY = useRef<number>(20);
  const targetFogDensity = useRef<number>(0.004);
  const targetFogColor = useRef<THREE.Color>(new THREE.Color(0x0284c7));

  // Mouse / Pointer parallax + 5D Gyroscope
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    dragX: number;
    dragY: number;
    isDragging: boolean;
    lastX: number;
    lastY: number;
  }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    dragX: 0,
    dragY: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  // Handle Depth Level changes
  useEffect(() => {
    // Coordinate mapping per level
    const depthCoordinates: Record<number, { y: number; z: number; fogDensity: number; hexColor: number }> = {
      0: { y: 22, z: 36, fogDensity: 0.003, hexColor: 0x0284c7 },
      1: { y: 14, z: 30, fogDensity: 0.006, hexColor: 0x0ea5e9 },
      2: { y: 5, z: 24, fogDensity: 0.012, hexColor: 0x0369a1 },
      3: { y: -4, z: 20, fogDensity: 0.016, hexColor: 0x0c4a6e },
      4: { y: -14, z: 17, fogDensity: 0.022, hexColor: 0x082f49 },
      5: { y: -25, z: 15, fogDensity: 0.024, hexColor: 0x0369a1 },
      6: { y: -38, z: 13, fogDensity: 0.028, hexColor: 0x02162e },
      7: { y: -52, z: 11, fogDensity: 0.032, hexColor: 0x1e1b4b },
      8: { y: -66, z: 9, fogDensity: 0.036, hexColor: 0x2e0821 },
      9: { y: -80, z: 7, fogDensity: 0.04, hexColor: 0x1a0208 },
    };

    const target = depthCoordinates[currentDepthLevel] || depthCoordinates[0];
    targetCamY.current = target.y;
    targetCamZ.current = target.z;
    targetFogDensity.current = target.fogDensity;
    targetFogColor.current = new THREE.Color(target.hexColor);

    // Audio cues on level switch
    if (currentDepthLevel >= 8) {
      audioEngine.setPoseidonIntensity(true);
    } else {
      audioEngine.setPoseidonIntensity(false);
    }
  }, [currentDepthLevel]);

  // Pointer move & drag handlers
  const handlePointerDown = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    mouseRef.current.isDragging = true;
    mouseRef.current.lastX = clientX;
    mouseRef.current.lastY = clientY;
  }, []);

  const handlePointerUp = useCallback(() => {
    mouseRef.current.isDragging = false;
  }, []);

  const handlePointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (mouseRef.current.isDragging && is5DMode) {
      const deltaX = clientX - mouseRef.current.lastX;
      const deltaY = clientY - mouseRef.current.lastY;
      mouseRef.current.dragX += deltaX * 0.005;
      mouseRef.current.dragY = Math.max(-0.6, Math.min(0.6, mouseRef.current.dragY + deltaY * 0.004));
      mouseRef.current.lastX = clientX;
      mouseRef.current.lastY = clientY;
    }

    const normX = (clientX / window.innerWidth) * 2 - 1;
    const normY = -(clientY / window.innerHeight) * 2 + 1;
    mouseRef.current.targetX = normX * 2.5;
    mouseRef.current.targetY = normY * 1.5;
  }, [is5DMode]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container || !webGLSupported) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const initialFogColor = new THREE.Color(0x0284c7);
    scene.fog = new THREE.FogExp2(initialFogColor, 0.005);
    scene.background = initialFogColor;

    const isMobileInitial = width < 768;
    const camera = new THREE.PerspectiveCamera(isMobileInitial ? 65 : 50, width / height, 0.1, 400);
    camera.position.set(0, targetCamY.current, targetCamZ.current);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x0c4a6e, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xbae6fd, 2.5);
    sunLight.position.set(10, 50, 20);
    scene.add(sunLight);

    // 4. Godrays / Volumetric Light Cone
    const coneGeo = new THREE.ConeGeometry(18, 50, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const godRays = new THREE.Mesh(coneGeo, coneMat);
    godRays.position.set(0, 30, 0);
    godRays.rotation.x = Math.PI;
    scene.add(godRays);
    godRaysRef.current = godRays;

    // 5. Rising Bubbles Particle System
    const bubbleCount = 450;
    const bubbleGeo = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleVelocities = new Float32Array(bubbleCount);

    for (let i = 0; i < bubbleCount; i++) {
      bubblePositions[i * 3] = (Math.random() - 0.5) * 60;
      bubblePositions[i * 3 + 1] = Math.random() * 120 - 90;
      bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      bubbleVelocities[i] = 0.05 + Math.random() * 0.1;
    }

    bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));

    // Custom round bubble texture
    const bubbleCanvas = document.createElement('canvas');
    bubbleCanvas.width = 64;
    bubbleCanvas.height = 64;
    const bCtx = bubbleCanvas.getContext('2d');
    if (bCtx) {
      const grad = bCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.5, 'rgba(125, 211, 252, 0.4)');
      grad.addColorStop(0.85, 'rgba(56, 189, 248, 0.7)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      bCtx.fillStyle = grad;
      bCtx.beginPath();
      bCtx.arc(32, 32, 30, 0, Math.PI * 2);
      bCtx.fill();
    }
    const bubbleTexture = new THREE.CanvasTexture(bubbleCanvas);

    const bubbleMat = new THREE.PointsMaterial({
      size: 1.4,
      map: bubbleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });
    const bubblesMesh = new THREE.Points(bubbleGeo, bubbleMat);
    scene.add(bubblesMesh);
    bubblesMeshRef.current = bubblesMesh;

    // 6. Marine Life - Fish Schools (Level 1)
    const fishGroup = new THREE.Group();
    const fishCount = 35;
    const fishBodyGeo = new THREE.ConeGeometry(0.25, 1.0, 4);
    fishBodyGeo.rotateZ(Math.PI / 2);
    const fishMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.4,
      metalness: 0.3,
    });

    const fishData: { mesh: THREE.Mesh; speed: number; phase: number; radius: number; baseAngle: number }[] = [];
    for (let i = 0; i < fishCount; i++) {
      const fishMesh = new THREE.Mesh(fishBodyGeo, fishMat);
      const angle = (i / fishCount) * Math.PI * 2;
      const radius = 8 + Math.random() * 8;
      const yOffset = 10 + (Math.random() - 0.5) * 6;
      fishMesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      fishGroup.add(fishMesh);
      fishData.push({
        mesh: fishMesh,
        speed: 0.008 + Math.random() * 0.006,
        phase: Math.random() * Math.PI,
        radius,
        baseAngle: angle,
      });
    }
    scene.add(fishGroup);
    fishGroupRef.current = fishGroup;

    // 7. Bioluminescent Jellyfish (Level 2)
    const jellyfishGroup = new THREE.Group();
    const jellyCount = 7;
    for (let j = 0; j < jellyCount; j++) {
      const singleJelly = new THREE.Group();
      // Dome
      const bellGeo = new THREE.SphereGeometry(1.2, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
      const bellMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0891b2,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.65,
        roughness: 0.2,
      });
      const bellMesh = new THREE.Mesh(bellGeo, bellMat);
      singleJelly.add(bellMesh);

      // Tentacles
      for (let t = 0; t < 5; t++) {
        const tentacleGeo = new THREE.CylinderGeometry(0.04, 0.01, 2.5, 4);
        const tentacleMat = new THREE.MeshBasicMaterial({
          color: 0x67e8f9,
          transparent: true,
          opacity: 0.45,
        });
        const tentacle = new THREE.Mesh(tentacleGeo, tentacleMat);
        const tAngle = (t / 5) * Math.PI * 2;
        tentacle.position.set(Math.cos(tAngle) * 0.6, -1.2, Math.sin(tAngle) * 0.6);
        singleJelly.add(tentacle);
      }

      const jAngle = (j / jellyCount) * Math.PI * 2;
      singleJelly.position.set(Math.cos(jAngle) * 12, 3 + (j % 3) * 2, Math.sin(jAngle) * 10 - 5);
      jellyfishGroup.add(singleJelly);
    }
    scene.add(jellyfishGroup);
    jellyfishGroupRef.current = jellyfishGroup;

    // 8. Level 4 - Sunken Galleon Shipwreck
    const shipwreck = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
    });
    // Hull keel
    const keelGeo = new THREE.BoxGeometry(2, 1.2, 14);
    const keel = new THREE.Mesh(keelGeo, woodMat);
    shipwreck.add(keel);
    // Broken Mast
    const mastGeo = new THREE.CylinderGeometry(0.3, 0.4, 9, 8);
    const mast = new THREE.Mesh(mastGeo, woodMat);
    mast.position.set(0, 4, -2);
    mast.rotation.z = 0.35;
    shipwreck.add(mast);
    // Rib frames
    for (let r = -5; r <= 5; r += 2) {
      const ribGeo = new THREE.TorusGeometry(2.5, 0.25, 6, 12, Math.PI);
      const rib = new THREE.Mesh(ribGeo, woodMat);
      rib.rotation.y = Math.PI / 2;
      rib.position.set(0, 0, r);
      shipwreck.add(rib);
    }
    shipwreck.position.set(8, -16, -4);
    shipwreck.rotation.y = 0.4;
    scene.add(shipwreck);

    // 9. Level 5 - Mu Federation Bioluminescent Crystal Spires
    const muGroup = new THREE.Group();
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    for (let c = 0; c < 8; c++) {
      const h = 8 + (c % 4) * 3;
      const crystalGeo = new THREE.ConeGeometry(1.6, h, 6);
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      const cAngle = (c / 8) * Math.PI * 2;
      crystal.position.set(Math.cos(cAngle) * 16, -26 + h / 2, Math.sin(cAngle) * 12 - 4);
      muGroup.add(crystal);
    }
    scene.add(muGroup);

    // 10. Level 7 - Atlantis Sunken Monoliths
    const atlantisGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.5,
    });
    for (let a = 0; a < 6; a++) {
      const pillarGeo = new THREE.BoxGeometry(2.2, 16, 2.2);
      const pillar = new THREE.Mesh(pillarGeo, stoneMat);
      pillar.position.set(-18 + a * 7, -54, -12);
      atlantisGroup.add(pillar);
    }
    scene.add(atlantisGroup);

    // 11. Level 8 - Monolithic Castle of the Undersea Devil (海底鬼岩城)
    const castleGroup = new THREE.Group();
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.6,
      metalness: 0.8,
    });
    const glowVentMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
    });

    // Massive Fortress Central Keep
    const fortressBaseGeo = new THREE.CylinderGeometry(14, 20, 24, 8);
    const fortressBase = new THREE.Mesh(fortressBaseGeo, darkMetalMat);
    fortressBase.position.set(0, -68, -25);
    castleGroup.add(fortressBase);

    // Horn / Jagged Bastion Towers
    for (let b = 0; b < 4; b++) {
      const hornGeo = new THREE.ConeGeometry(3, 16, 5);
      const horn = new THREE.Mesh(hornGeo, darkMetalMat);
      const hAngle = (b / 4) * Math.PI * 2;
      horn.position.set(Math.cos(hAngle) * 12, -56, Math.sin(hAngle) * 12 - 25);
      horn.rotation.z = Math.sin(hAngle) * 0.25;
      castleGroup.add(horn);

      // Warning glow circuits
      const circuitGeo = new THREE.BoxGeometry(0.3, 10, 0.3);
      const circuit = new THREE.Mesh(circuitGeo, glowVentMat);
      circuit.position.set(Math.cos(hAngle) * 12, -60, Math.sin(hAngle) * 12 - 25);
      castleGroup.add(circuit);
    }
    scene.add(castleGroup);

    // 12. Level 9 - Poseidon AI Core (ポセイドン)
    const poseidonGroup = new THREE.Group();
    poseidonGroup.position.set(0, -82, -18);

    // Monolithic Ocular Array Core
    const eyeCoreGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const eyeCoreMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xdc2626,
      emissiveIntensity: 1.2,
      roughness: 0.1,
    });
    const eyeCore = new THREE.Mesh(eyeCoreGeo, eyeCoreMat);
    poseidonGroup.add(eyeCore);

    // Concentric Gyroscopic Rings
    const ringsGroup = new THREE.Group();
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.2,
    });
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.TorusGeometry(5.5 + r * 2.2, 0.25, 16, 64);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringsGroup.add(ringMesh);
    }
    poseidonGroup.add(ringsGroup);
    poseidonRingsRef.current = ringsGroup;
    scene.add(poseidonGroup);

    // 13. Interactive 3D Underwater Buggy Vehicle (水中バギー)
    const buggyGroup = new THREE.Group();
    // Yellow/Amber Main Body Chassis
    const chassisGeo = new THREE.BoxGeometry(3.2, 1.4, 4.6);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.4,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    buggyGroup.add(chassis);

    // Cockpit Bubble Dome
    const domeGeo = new THREE.SphereGeometry(1.6, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.1,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.set(0, 0.7, 0.2);
    buggyGroup.add(dome);

    // Front Headlights with Dynamic SpotLights
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
    for (let l = -1; l <= 1; l += 2) {
      const lampGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16);
      lampGeo.rotateX(Math.PI / 2);
      const lamp = new THREE.Mesh(lampGeo, lightMat);
      lamp.position.set(l * 1.1, 0.1, 2.3);
      buggyGroup.add(lamp);

      // Light beam
      const spot = new THREE.SpotLight(0xffedd5, 4, 30, Math.PI * 0.25, 0.5);
      spot.position.set(l * 1.1, 0.1, 2.4);
      spot.target.position.set(l * 1.1, -1.0, 16);
      buggyGroup.add(spot);
      buggyGroup.add(spot.target);
    }

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.6, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.9,
    });
    const wheelPositions = [
      [-1.8, -0.6, 1.5],
      [1.8, -0.6, 1.5],
      [-1.8, -0.6, -1.5],
      [1.8, -0.6, -1.5],
    ];
    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(pos[0], pos[1], pos[2]);
      buggyGroup.add(wheel);
    });

    const initialBuggyX = width < 768 ? 1.0 : 4.0;
    buggyGroup.position.set(initialBuggyX, 18, 12);
    buggyGroup.scale.set(0.85, 0.85, 0.85);
    scene.add(buggyGroup);
    buggyGroupRef.current = buggyGroup;

    // Attach interaction events
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!is5DMode || e.gamma === null || e.beta === null) return;
      mouseRef.current.targetX = (e.gamma / 45) * 2;
      mouseRef.current.targetY = ((e.beta - 45) / 45) * 1.5;
    };
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.fov = w < 768 ? 65 : 50;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    onSceneReady?.();

    // 14. Animation Render Loop
    let clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation toward target level
      camera.position.y += (targetCamY.current - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ.current - camera.position.z) * 0.05;

      // Mouse parallax smooth lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // 5D spatial drag + parallax
      const panY = is5DMode ? mouseRef.current.dragX : 0;
      const panX = is5DMode ? mouseRef.current.dragY : 0;

      // Realistic oceanic water current sway (5D dimension)
      const currentSwayX = Math.sin(elapsed * 0.8) * 0.18;
      const currentSwayY = Math.cos(elapsed * 0.6) * 0.12;

      camera.position.x = mouseRef.current.x * 1.5 + currentSwayX;
      camera.rotation.y = -mouseRef.current.x * 0.02 + panY;
      camera.rotation.x = mouseRef.current.y * 0.015 + panX + currentSwayY * 0.05;

      // 4DX mode camera shake
      if (is4DXActive) {
        camera.position.x += (Math.random() - 0.5) * 0.45;
        camera.position.y += (Math.random() - 0.5) * 0.35;
      }

      // Smooth Fog transition
      if (scene.fog && scene.fog instanceof THREE.FogExp2) {
        scene.fog.density += (targetFogDensity.current - scene.fog.density) * 0.04;
        scene.fog.color.lerp(targetFogColor.current, 0.04);
        scene.background = scene.fog.color;
      }

      // Godrays rotation & pulse
      if (godRaysRef.current) {
        godRaysRef.current.rotation.y = elapsed * 0.03;
        const mat = godRaysRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.08 + Math.sin(elapsed * 0.8) * 0.04;
      }

      // Animate Bubbles
      if (bubblesMeshRef.current) {
        const positions = bubblesMeshRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < bubbleCount; i++) {
          positions[i * 3 + 1] += bubbleVelocities[i] * (is4DXActive ? 2.5 : 1);
          positions[i * 3] += Math.sin(elapsed * 2 + i) * 0.02;
          // Wrap bubbles around camera Y
          if (positions[i * 3 + 1] > camera.position.y + 25) {
            positions[i * 3 + 1] = camera.position.y - 35;
          }
        }
        bubblesMeshRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Fish
      if (fishData.length > 0) {
        fishData.forEach((f) => {
          f.baseAngle += f.speed;
          f.mesh.position.x = Math.cos(f.baseAngle) * f.radius;
          f.mesh.position.z = Math.sin(f.baseAngle) * f.radius;
          f.mesh.position.y += Math.sin(elapsed * 3 + f.phase) * 0.01;
          f.mesh.rotation.y = -f.baseAngle + Math.PI / 2;
        });
      }

      // Animate Jellyfish
      if (jellyfishGroupRef.current) {
        jellyfishGroupRef.current.children.forEach((jelly, index) => {
          jelly.position.y += Math.sin(elapsed * 1.5 + index) * 0.015;
          const dome = jelly.children[0];
          if (dome) {
            dome.scale.y = 1 + Math.sin(elapsed * 2 + index) * 0.15;
          }
        });
      }

      // Animate Buggy companion following near camera depth
      if (buggyGroupRef.current) {
        const isMobileScreen = window.innerWidth < 768;
        const targetBuggyY = camera.position.y - 2.5 + Math.sin(elapsed * 1.2) * 0.4;
        buggyGroupRef.current.position.y += (targetBuggyY - buggyGroupRef.current.position.y) * 0.06;
        const baseBuggyX = isMobileScreen ? 0.9 : 3.5;
        buggyGroupRef.current.position.x = baseBuggyX + Math.cos(elapsed * 0.8) * 0.5;
        buggyGroupRef.current.rotation.z = Math.sin(elapsed * 1.2) * 0.04;
        buggyGroupRef.current.rotation.y = -0.3 + Math.cos(elapsed * 0.6) * 0.08;
      }

      // Animate Poseidon gyroscopic logic rings
      if (poseidonRingsRef.current) {
        poseidonRingsRef.current.children[0].rotation.x = elapsed * 0.4;
        poseidonRingsRef.current.children[1].rotation.y = -elapsed * 0.3;
        poseidonRingsRef.current.children[2].rotation.z = elapsed * 0.5;
      }

      // Tekio Light glow aura effect
      if (isTekioActive) {
        ambientLight.intensity = 1.8;
      } else {
        ambientLight.intensity = Math.max(0.3, 1.2 - currentDepthLevel * 0.09);
      }

      // Poseidon alert pulse
      if (isPoseidonAlert) {
        targetFogColor.current.set(0x38050e);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchend', handlePointerUp);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [handlePointerMove, handlePointerDown, handlePointerUp, onSceneReady, is4DXActive, isTekioActive, isPoseidonAlert, is5DMode, isPureOceanView, currentDepthLevel, webGLSupported]);

  return (
    <div
      className={`fixed inset-0 z-0 overflow-hidden select-none transition-all ${
        isPureOceanView ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
    >
      {webGLSupported ? (
        <div ref={mountRef} className="w-full h-full" />
      ) : (
        /* Graceful high-fidelity 2.5D CSS Fallback */
        <div className="w-full h-full bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.25),transparent_70%)]" />
          <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-black via-slate-950/80 to-transparent" />
        </div>
      )}

      {/* Atmospheric Caustics & Depth Scrim Overlays */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background:
            currentDepthLevel === 0
              ? 'radial-gradient(ellipse at 50% 0%, rgba(125,211,252,0.18) 0%, transparent 75%)'
              : currentDepthLevel >= 8
              ? 'radial-gradient(ellipse at 50% 100%, rgba(225,29,72,0.15) 0%, transparent 65%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 80%)',
        }}
      />
    </div>
  );
}
