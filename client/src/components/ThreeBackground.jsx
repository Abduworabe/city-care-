import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeDBackground = () => {
  const mountRef = useRef(null);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [clickedElement, setClickedElement] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const raycasterRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2());
  const animationRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const controlsRef = useRef(null);
  const pointLightsRef = useRef([]);
  const ambientLightRef = useRef(null);
  const directionalLightRef = useRef(null);
  const hemisphereLightRef = useRef(null);
  const worabeTextRef = useRef(null);
  const fireworksRef = useRef([]);
  const particlesRef = useRef(null);
  const celebrationLightsRef = useRef([]);

  // Fixed settings (no controls needed)
  const timeOfDay = "day";
  const weather = "clear";
  const trafficDensity = "medium";
  const pedestrianActivity = "medium";
  const constructionSpeed = "normal";

  // Performance optimization - geometry and material caching
  const geometryCache = useRef(new Map());
  const materialCache = useRef(new Map());

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Create larger and more animated 3D Worabe text for background with mobile responsiveness
  const createWorabeText = useCallback((scene) => {
    // Clean up existing text if any
    if (worabeTextRef.current && worabeTextRef.current.group) {
      if (worabeTextRef.current.group.parent) {
        worabeTextRef.current.group.parent.remove(worabeTextRef.current.group);
      }
    }

    const textGroup = new THREE.Group();

    const isMobileDevice = window.innerWidth <= 768;
    const baseScale = isMobileDevice ? 0.8 : 1.5;
    const fontSize = isMobileDevice ? 120 : 180;
    const canvasSize = isMobileDevice ? 256 : 512;

    // Create text using multiple planes for a 3D effect with enhanced animations
    const createLetter = (letter, x, y, z, index) => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return null;

        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // Gradient text effect
        const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "#ff3000");
        gradient.addColorStop(0.5, "#ff6000");
        gradient.addColorStop(1, "#ff9000");

        context.fillStyle = gradient;
        context.font = `bold ${fontSize}px Arial`;
        context.textAlign = "center";
        context.textBaseline = "middle";

        // Add text shadow for depth
        context.shadowColor = "rgba(0, 0, 0, 0.8)";
        context.shadowBlur = 20;
        context.shadowOffsetX = 10;
        context.shadowOffsetY = 10;

        context.fillText(letter, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 0.9,
        });

        const geometry = new THREE.PlaneGeometry(6, 6);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.userData = {
          originalX: x,
          originalY: y,
          originalZ: z,
          index: index,
          phase: Math.random() * Math.PI * 2,
        };

        return mesh;
      } catch (error) {
        console.error("Error creating letter:", error);
        return null;
      }
    };

    // Create individual letters with enhanced 3D effect
    const letters = [
      { letter: "W", x: -18, y: 0, z: 0 },
      { letter: "O", x: -10, y: 0, z: 0.5 },
      { letter: "R", x: -2, y: 0, z: 1.0 },
      { letter: "A", x: 6, y: 0, z: 1.5 },
      { letter: "B", x: 14, y: 0, z: 2.0 },
      { letter: "E", x: 22, y: 0, z: 2.5 },
    ];

    const letterMeshes = [];
    letters.forEach(({ letter, x, y, z }, index) => {
      const letterMesh = createLetter(letter, x, y, z, index);
      if (letterMesh) {
        textGroup.add(letterMesh);
        letterMeshes.push(letterMesh);
      }
    });

    // Add multiple glowing effect with point lights
    const glowLights = [];
    for (let i = 0; i < 4; i++) {
      const glowLight = new THREE.PointLight(0xff6000, 0.8, 15);
      glowLight.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      textGroup.add(glowLight);
      glowLights.push(glowLight);
    }

    // Add particle system around text
    let particleSystem = null;
    try {
      const particleCount = isMobileDevice ? 50 : 100;
      const particles = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40;
      }

      particles.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );

      const particleMaterial = new THREE.PointsMaterial({
        size: isMobileDevice ? 0.2 : 0.3,
        color: 0xff6000,
        transparent: true,
        opacity: 0.6,
      });

      particleSystem = new THREE.Points(particles, particleMaterial);
      textGroup.add(particleSystem);
    } catch (error) {
      console.error("Error creating particle system:", error);
    }

    // Position the text in top left background - responsive positioning
    const textX = isMobileDevice ? -15 : -25;
    const textY = isMobileDevice ? 8 : 15;
    const textZ = isMobileDevice ? -15 : -20;

    textGroup.position.set(textX, textY, textZ);
    textGroup.rotation.y = Math.PI / 6;
    textGroup.scale.set(baseScale, baseScale, baseScale);

    worabeTextRef.current = {
      group: textGroup,
      lights: glowLights,
      particles: particleSystem,
      letters: letterMeshes,
      isMobile: isMobileDevice,
    };

    scene.add(textGroup);

    return textGroup;
  }, []);

  // Create fantastic fireworks
  const createFireworks = useCallback((scene) => {
    const fireworks = [];
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

    for (let i = 0; i < 8; i++) {
      try {
        const fireworkGroup = new THREE.Group();
        const fireworkColor = colors[Math.floor(Math.random() * colors.length)];

        // Create explosion particles
        const particleCount = 50;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let j = 0; j < particleCount; j++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 0.5;
          positions[j * 3] = 0;
          positions[j * 3 + 1] = 0;
          positions[j * 3 + 2] = 0;

          velocities.push({
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
            z: (Math.random() - 0.5) * speed,
            life: 1.0,
          });
        }

        particles.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );

        const particleMaterial = new THREE.PointsMaterial({
          size: 0.3,
          color: fireworkColor,
          transparent: true,
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        fireworkGroup.add(particleSystem);

        // Random position in the sky
        const x = (Math.random() - 0.5) * 40;
        const y = 10 + Math.random() * 10;
        const z = (Math.random() - 0.5) * 40;

        fireworkGroup.position.set(x, y, z);

        fireworks.push({
          group: fireworkGroup,
          particles: particleSystem,
          velocities: velocities,
          age: 0,
          maxAge: 2 + Math.random() * 1,
        });

        scene.add(fireworkGroup);
      } catch (error) {
        console.error("Error creating firework:", error);
      }
    }

    return fireworks;
  }, []);

  // Create celebration lights
  const createCelebrationLights = useCallback((scene) => {
    const lights = [];
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

    for (let i = 0; i < 12; i++) {
      try {
        const light = new THREE.PointLight(
          colors[Math.floor(Math.random() * colors.length)],
          1,
          20
        );

        light.position.set(
          (Math.random() - 0.5) * 60,
          5 + Math.random() * 10,
          (Math.random() - 0.5) * 60
        );

        scene.add(light);
        lights.push({
          light: light,
          originalY: light.position.y,
          speed: 0.5 + Math.random() * 1,
          phase: Math.random() * Math.PI * 2,
        });
      } catch (error) {
        console.error("Error creating celebration light:", error);
      }
    }

    return lights;
  }, []);

  // Enhanced animation for Worabe text
  const animateWorabeText = useCallback((time) => {
    if (!worabeTextRef.current) return;

    const { group, lights, particles, letters, isMobile } =
      worabeTextRef.current;

    if (!group) return;

    // Enhanced floating animation
    const floatAmplitude = isMobile ? 0.8 : 1.5;
    group.position.y =
      (isMobile ? 8 : 15) + Math.sin(time * 0.8) * floatAmplitude;
    group.position.x = (isMobile ? -15 : -25) + Math.cos(time * 0.5) * 0.5;

    // Enhanced rotation
    group.rotation.y = Math.PI / 6 + Math.sin(time * 0.4) * 0.3;
    group.rotation.x = Math.sin(time * 0.3) * 0.2;
    group.rotation.z = Math.sin(time * 0.2) * 0.1;

    // Pulsing scale with more variation
    const baseScale = isMobile ? 0.8 : 1.5;
    const scale = baseScale + Math.sin(time * 3) * 0.2;
    group.scale.set(scale, scale, scale);

    // Enhanced individual letter animations
    if (letters && letters.length) {
      letters.forEach((letter, index) => {
        if (!letter || !letter.userData) return;

        const userData = letter.userData;

        // Floating with phase offset
        const letterFloatAmplitude = isMobile ? 0.8 : 1.2;
        letter.position.y =
          userData.originalY +
          Math.sin(time * 2 + userData.phase) * letterFloatAmplitude;

        // Rotation animation
        letter.rotation.y = Math.sin(time * 1.5 + userData.index) * 0.5;
        letter.rotation.x = Math.cos(time * 1.2 + userData.index) * 0.3;

        // Scale animation per letter
        const letterScale = 1 + Math.sin(time * 2 + userData.index) * 0.2;
        letter.scale.set(letterScale, letterScale, 1);

        // Z-position wave
        letter.position.z =
          userData.originalZ + Math.sin(time * 1.8 + userData.index) * 0.8;
      });
    }

    // Animate glow lights
    if (lights && lights.length) {
      lights.forEach((light, index) => {
        if (!light) return;

        light.position.x = Math.sin(time + index) * 15;
        light.position.y = Math.cos(time * 1.3 + index) * 8;
        light.position.z = Math.sin(time * 0.7 + index) * 4;

        // Pulsing intensity
        light.intensity = 0.8 + Math.sin(time * 2 + index) * 0.4;
      });
    }

    // Animate particles
    if (
      particles &&
      particles.geometry &&
      particles.geometry.attributes &&
      particles.geometry.attributes.position
    ) {
      try {
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(time * 0.5 + i) * 0.05;
          positions[i + 1] += Math.cos(time * 0.3 + i) * 0.05;
          positions[i + 2] += Math.sin(time * 0.7 + i) * 0.03;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      } catch (error) {
        console.error("Error updating particles:", error);
      }
    }

    // Color cycling effect for the entire text
    const hue = (time * 0.1) % 1;
    const color = new THREE.Color().setHSL(hue, 0.8, 0.6);

    if (letters && letters.length) {
      letters.forEach((letter) => {
        if (!letter || !letter.material || !letter.material.map) return;

        try {
          // Update canvas with new color
          const canvas = letter.material.map.image;
          const context = canvas.getContext("2d");
          if (!context) return;

          context.clearRect(0, 0, canvas.width, canvas.height);

          const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
          gradient.addColorStop(0, `hsl(${hue * 360}, 100%, 50%)`);
          gradient.addColorStop(
            0.5,
            `hsl(${(hue * 360 + 30) % 360}, 100%, 50%)`
          );
          gradient.addColorStop(1, `hsl(${(hue * 360 + 60) % 360}, 100%, 50%)`);

          context.fillStyle = gradient;
          context.font = `bold ${isMobile ? 120 : 180}px Arial`;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.shadowColor = "rgba(0, 0, 0, 0.8)";
          context.shadowBlur = 20;
          context.shadowOffsetX = 10;
          context.shadowOffsetY = 10;

          const lettersArray = ["W", "O", "R", "A", "B", "E"];
          const letterIndex = letters.findIndex((l) => l === letter);
          if (letterIndex >= 0) {
            context.fillText(
              lettersArray[letterIndex],
              canvas.width / 2,
              canvas.height / 2
            );
            letter.material.map.needsUpdate = true;
          }
        } catch (error) {
          console.error("Error updating letter color:", error);
        }
      });
    }
  }, []);

  // Animate fireworks
  const animateFireworks = useCallback((time, delta) => {
    if (!fireworksRef.current || !fireworksRef.current.length) return;

    for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
      const firework = fireworksRef.current[i];
      if (!firework || !firework.particles || !firework.group) continue;

      firework.age += delta;

      if (firework.age >= firework.maxAge) {
        // Remove expired firework
        if (firework.group.parent) {
          firework.group.parent.remove(firework.group);
        }
        fireworksRef.current.splice(i, 1);
        continue;
      }

      const progress = firework.age / firework.maxAge;

      if (
        firework.particles.geometry &&
        firework.particles.geometry.attributes &&
        firework.particles.geometry.attributes.position
      ) {
        try {
          const positions =
            firework.particles.geometry.attributes.position.array;

          // Update particle positions
          firework.velocities.forEach((vel, j) => {
            if (j * 3 + 2 < positions.length) {
              const life = 1 - progress;
              positions[j * 3] += vel.x * delta * 10;
              positions[j * 3 + 1] += vel.y * delta * 10;
              positions[j * 3 + 2] += vel.z * delta * 10;

              // Gravity effect
              positions[j * 3 + 1] -= delta * 2;
            }
          });

          firework.particles.geometry.attributes.position.needsUpdate = true;

          // Fade out
          const opacity = 1 - progress;
          firework.particles.material.opacity = opacity;
        } catch (error) {
          console.error("Error updating firework particles:", error);
        }
      }
    }
  }, []);

  // Animate celebration lights
  const animateCelebrationLights = useCallback((time) => {
    if (!celebrationLightsRef.current || !celebrationLightsRef.current.length)
      return;

    celebrationLightsRef.current.forEach((lightData) => {
      if (!lightData || !lightData.light) return;

      const { light, originalY, speed, phase } = lightData;

      // Floating animation
      light.position.y = originalY + Math.sin(time * speed + phase) * 3;

      // Color cycling
      const hue = (time * 0.5 + phase) % 1;
      light.color.setHSL(hue, 0.8, 0.6);

      // Intensity pulsing
      light.intensity = 0.5 + Math.sin(time * 2 + phase) * 0.5;
    });
  }, []);

  // Create surprise winning animation
  const createWinningAnimation = useCallback((scene) => {
    try {
      // Create a burst of golden particles
      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;

        velocities.push({
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
          z: (Math.random() - 0.5) * speed,
          life: 1.0,
        });
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const material = new THREE.PointsMaterial({
        size: 0.2,
        color: 0xffd700,
        transparent: true,
        opacity: 1,
      });

      const particleSystem = new THREE.Points(geometry, material);
      particleSystem.position.set(0, 5, 0);

      scene.add(particleSystem);

      return {
        particles: particleSystem,
        velocities: velocities,
        age: 0,
        maxAge: 3,
      };
    } catch (error) {
      console.error("Error creating winning animation:", error);
      return null;
    }
  }, []);

  // Animate winning particles
  const animateWinningParticles = useCallback((time, delta) => {
    if (!particlesRef.current || !particlesRef.current.particles) return;

    particlesRef.current.age += delta;

    if (particlesRef.current.age >= particlesRef.current.maxAge) {
      if (particlesRef.current.particles.parent) {
        particlesRef.current.particles.parent.remove(
          particlesRef.current.particles
        );
      }
      particlesRef.current = null;
      return;
    }

    const progress = particlesRef.current.age / particlesRef.current.maxAge;

    if (
      particlesRef.current.particles.geometry &&
      particlesRef.current.particles.geometry.attributes &&
      particlesRef.current.particles.geometry.attributes.position
    ) {
      try {
        const positions =
          particlesRef.current.particles.geometry.attributes.position.array;

        // Update particle positions
        particlesRef.current.velocities.forEach((vel, i) => {
          if (i * 3 + 2 < positions.length) {
            positions[i * 3] += vel.x * delta * 10;
            positions[i * 3 + 1] += vel.y * delta * 10;
            positions[i * 3 + 2] += vel.z * delta * 10;

            // Gravity effect
            positions[i * 3 + 1] -= delta * 3;
          }
        });

        particlesRef.current.particles.geometry.attributes.position.needsUpdate = true;

        // Fade out
        const opacity = 1 - progress;
        particlesRef.current.particles.material.opacity = opacity;
      } catch (error) {
        console.error("Error updating winning particles:", error);
      }
    }
  }, []);

  const getCachedGeometry = useCallback((type, params) => {
    const key = `${type}_${JSON.stringify(params)}`;
    if (!geometryCache.current.has(key)) {
      let geometry;
      switch (type) {
        case "box":
          geometry = new THREE.BoxGeometry(
            params.width,
            params.height,
            params.depth
          );
          break;
        case "cylinder":
          geometry = new THREE.CylinderGeometry(
            params.radiusTop,
            params.radiusBottom,
            params.height,
            params.segments
          );
          break;
        case "sphere":
          geometry = new THREE.SphereGeometry(
            params.radius,
            params.widthSegments,
            params.heightSegments
          );
          break;
        case "plane":
          geometry = new THREE.PlaneGeometry(
            params.width,
            params.height,
            params.segments
          );
          break;
        default:
          geometry = new THREE.BoxGeometry(1, 1, 1);
      }
      geometryCache.current.set(key, geometry);
    }
    return geometryCache.current.get(key);
  }, []);

  const getCachedMaterial = useCallback((type, params) => {
    const key = `${type}_${JSON.stringify(params)}`;
    if (!materialCache.current.has(key)) {
      let material;
      switch (type) {
        case "standard":
          material = new THREE.MeshStandardMaterial(params);
          break;
        case "basic":
          material = new THREE.MeshBasicMaterial(params);
          break;
        default:
          material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      }
      materialCache.current.set(key, material);
    }
    return materialCache.current.get(key);
  }, []);

  // Enhanced city elements with Worabe-specific data
  const elementsData = {
    construction: [
      {
        id: "construction-1",
        position: { x: -18, y: 0, z: 12 },
        scale: { x: 5, y: 3, z: 4 },
        progress: 25,
        type: "school",
        workers: 4,
        completion: "2024-08-30",
        budget: "₹1.8Cr",
        description: "Worabe Community School",
        animationSpeed: 0.003,
      },
      {
        id: "construction-2",
        position: { x: 8, y: 0, z: -8 },
        scale: { x: 6, y: 4, z: 5 },
        progress: 60,
        type: "clinic",
        workers: 6,
        completion: "2024-06-15",
        budget: "₹3.2Cr",
        description: "Health Clinic",
        animationSpeed: 0.002,
      },
      {
        id: "construction-3",
        position: { x: -20, y: 0, z: -15 },
        scale: { x: 4, y: 2, z: 3 },
        progress: 40,
        type: "market",
        workers: 5,
        completion: "2024-07-20",
        budget: "₹1.5Cr",
        description: "Local Market",
        animationSpeed: 0.0025,
      },
    ],
    buildings: [
      {
        id: "building-1",
        position: { x: -12, y: 0, z: -15 },
        scale: { x: 3, y: 3.5, z: 3 },
        color: "#8B4513",
        type: "residential",
        floors: 2,
        residents: 8,
        name: "Old Town Homes",
        lightIntensity: 0.3,
        style: "traditional",
        roofType: "slanted",
        windowStyle: "basic",
        condition: "old",
      },
      {
        id: "building-2",
        position: { x: 15, y: 0, z: -12 },
        scale: { x: 4, y: 4, z: 4 },
        color: "#A0522D",
        type: "commercial",
        floors: 2,
        business: "General Store",
        name: "Worabe Market",
        lightIntensity: 0.4,
        style: "simple",
        roofType: "flat",
        windowStyle: "grid",
        condition: "fair",
      },
      {
        id: "building-3",
        position: { x: -15, y: 0, z: -18 },
        scale: { x: 4.5, y: 3, z: 4.5 },
        color: "#CD853F",
        type: "government",
        floors: 1,
        department: "Administration",
        name: "Town Office",
        lightIntensity: 0.5,
        style: "classic",
        roofType: "flat",
        windowStyle: "basic",
        condition: "good",
      },
      {
        id: "building-4",
        position: { x: 18, y: 0, z: 8 },
        scale: { x: 5, y: 4, z: 5 },
        color: "#2F4F4F",
        type: "religious",
        floors: 1,
        business: "Community Center",
        name: "Worabe Mosque",
        lightIntensity: 0.6,
        style: "traditional",
        roofType: "domed",
        windowStyle: "arched",
        condition: "good",
      },
      {
        id: "building-5",
        position: { x: -5, y: 0, z: 15 },
        scale: { x: 3, y: 2, z: 3 },
        color: "#696969",
        type: "residential",
        floors: 1,
        residents: 4,
        name: "Village House",
        lightIntensity: 0.2,
        style: "rustic",
        roofType: "thatched",
        windowStyle: "basic",
        condition: "poor",
      },
    ],
    water: [
      {
        id: "water-1",
        position: { x: -25, y: 0.1, z: 18 },
        scale: { x: 8, y: 0.2, z: 5 },
        type: "well",
        capacity: "50KL",
        status: "operational",
        description: "Community Water Well",
        waveSpeed: 0.5,
      },
      {
        id: "water-2",
        position: { x: 28, y: 0.1, z: -18 },
        scale: { x: 6, y: 0.2, z: 4 },
        type: "pond",
        capacity: "200KL",
        status: "natural",
        description: "Village Pond",
        waveSpeed: 0.3,
      },
    ],
    parks: [
      {
        id: "park-1",
        position: { x: 0, y: 0, z: 18 },
        scale: { x: 12, y: 0.1, z: 8 },
        trees: 15,
        benches: 8,
        name: "Worabe Central Park",
        activity: "medium",
      },
      {
        id: "park-2",
        position: { x: -25, y: 0, z: -8 },
        scale: { x: 8, y: 0.1, z: 6 },
        trees: 10,
        benches: 5,
        name: "Riverside Gathering",
        activity: "low",
      },
    ],
    infrastructure: [
      {
        id: "road-main",
        position: { x: 0, y: 0.05, z: 0 },
        scale: { x: 50, y: 0.1, z: 6 },
        type: "main_road",
        lanes: 2,
        condition: "fair",
        traffic: "medium",
      },
      {
        id: "road-cross",
        position: { x: 0, y: 0.05, z: 0 },
        scale: { x: 6, y: 0.1, z: 50 },
        type: "cross_road",
        lanes: 2,
        condition: "fair",
        traffic: "medium",
      },
      {
        id: "road-side-1",
        position: { x: -12, y: 0.05, z: 8 },
        scale: { x: 4, y: 0.1, z: 15 },
        type: "side_road",
        lanes: 1,
        condition: "poor",
        traffic: "low",
      },
      {
        id: "road-side-2",
        position: { x: 15, y: 0.05, z: -10 },
        scale: { x: 15, y: 0.1, z: 4 },
        type: "side_road",
        lanes: 1,
        condition: "poor",
        traffic: "low",
      },
    ],
    vehicles: [
      {
        id: "vehicle-1",
        position: { x: -20, y: 0.3, z: 0 },
        type: "minibus",
        route: "Worabe Center",
        speed: 0.6,
        color: 0x0000ff,
        size: "medium",
      },
      {
        id: "vehicle-2",
        position: { x: 15, y: 0.3, z: -18 },
        type: "truck",
        route: "Goods Transport",
        speed: 0.4,
        color: 0x8b4513,
        size: "large",
      },
      {
        id: "vehicle-3",
        position: { x: 10, y: 0.3, z: 12 },
        type: "car_old",
        route: "Taxi Service",
        speed: 0.8,
        color: 0xff0000,
        size: "small",
      },
      {
        id: "vehicle-4",
        position: { x: -8, y: 0.3, z: 20 },
        type: "motorcycle",
        route: "Personal",
        speed: 1.2,
        color: 0x00ff00,
        size: "small",
      },
      {
        id: "vehicle-5",
        position: { x: 22, y: 0.3, z: 5 },
        type: "car_old",
        route: "Private",
        speed: 0.7,
        color: 0xffff00,
        size: "small",
      },
      {
        id: "vehicle-6",
        position: { x: -18, y: 0.3, z: -15 },
        type: "minibus",
        route: "Outskirts",
        speed: 0.5,
        color: 0xff00ff,
        size: "medium",
      },
      {
        id: "vehicle-7",
        position: { x: 5, y: 0.3, z: -22 },
        type: "truck_small",
        route: "Local Delivery",
        speed: 0.6,
        color: 0x2f4f4f,
        size: "medium",
      },
      {
        id: "vehicle-8",
        position: { x: -25, y: 0.3, z: 8 },
        type: "motorcycle",
        route: "Delivery",
        speed: 1.1,
        color: 0xffffff,
        size: "small",
      },
      {
        id: "vehicle-9",
        position: { x: 18, y: 0.3, z: -5 },
        type: "car_old",
        route: "Family",
        speed: 0.9,
        color: 0xffa500,
        size: "small",
      },
      {
        id: "vehicle-10",
        position: { x: -12, y: 0.3, z: -20 },
        type: "minibus",
        route: "School Bus",
        speed: 0.5,
        color: 0x800080,
        size: "medium",
      },
    ],
    streetLights: [
      { x: -15, y: 0, z: 0, intensity: 1 },
      { x: -5, y: 0, z: 0, intensity: 1 },
      { x: 5, y: 0, z: 0, intensity: 1 },
      { x: 15, y: 0, z: 0, intensity: 1 },
      { x: 0, y: 0, z: -15, intensity: 1 },
      { x: 0, y: 0, z: -5, intensity: 1 },
      { x: 0, y: 0, z: 5, intensity: 1 },
      { x: 0, y: 0, z: 15, intensity: 1 },
    ],
    pedestrians: [
      { x: 2, y: 0, z: 16, speed: 0.2, type: "walker" },
      { x: -3, y: 0, z: 17, speed: 0.3, type: "walker" },
      { x: -24, y: 0, z: -7, speed: 0.4, type: "walker" },
      { x: 16, y: 0, z: -9, speed: 0.25, type: "walker" },
      { x: 8, y: 0, z: 14, speed: 0.35, type: "walker" },
      { x: -18, y: 0, z: 12, speed: 0.3, type: "walker" },
    ],
    animals: [
      { x: -22, y: 0, z: -6, speed: 0.15, type: "goat" },
      { x: 20, y: 0, z: 14, speed: 0.1, type: "chicken" },
      { x: 5, y: 0, z: -18, speed: 0.12, type: "goat" },
    ],
  };

  // Time of day effects
  const timeSettings = {
    day: {
      ambientIntensity: 0.7,
      directionalIntensity: 1.0,
      hemisphereIntensity: 0.5,
      fogColor: 0x87ceeb,
      fogNear: 40,
      fogFar: 120,
      skyColor: 0x87ceeb,
    },
    evening: {
      ambientIntensity: 0.5,
      directionalIntensity: 0.6,
      hemisphereIntensity: 0.3,
      fogColor: 0xff8c00,
      fogNear: 30,
      fogFar: 90,
      skyColor: 0xff8c00,
    },
    night: {
      ambientIntensity: 0.2,
      directionalIntensity: 0.1,
      hemisphereIntensity: 0.1,
      fogColor: 0x191970,
      fogNear: 20,
      fogFar: 70,
      skyColor: 0x000080,
    },
  };

  // Weather effects
  const weatherSettings = {
    clear: {
      fogDensity: 0,
      particleCount: 0,
    },
    rain: {
      fogDensity: 0.2,
      particleCount: 800,
    },
    cloudy: {
      fogDensity: 0.1,
      particleCount: 300,
    },
  };

  // Traffic density settings
  const trafficSettings = {
    low: { vehicleCount: 6, speedMultiplier: 0.8 },
    medium: { vehicleCount: 9, speedMultiplier: 1.0 },
    high: { vehicleCount: 12, speedMultiplier: 1.2 },
  };

  // Create construction site
  const createConstructionSite = useCallback(
    (data) => {
      const group = new THREE.Group();

      // Base platform
      const platformGeometry = getCachedGeometry("box", {
        width: data.scale.x,
        height: 0.2,
        depth: data.scale.z,
      });
      const platformMaterial = getCachedMaterial("standard", {
        color: 0x8b4513,
        roughness: 0.9,
      });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.y = 0.1;
      group.add(platform);

      // Construction progress representation
      const progressHeight = (data.progress / 100) * data.scale.y;
      const progressGeometry = getCachedGeometry("box", {
        width: data.scale.x * 0.8,
        height: progressHeight,
        depth: data.scale.z * 0.8,
      });
      const progressMaterial = getCachedMaterial("standard", {
        color: 0x32cd32,
      });
      const progress = new THREE.Mesh(progressGeometry, progressMaterial);
      progress.position.y = progressHeight / 2 + 0.2;
      progress.userData = { isProgress: true };
      group.add(progress);

      // Simple construction crane
      const craneBaseGeometry = getCachedGeometry("cylinder", {
        radiusTop: 0.3,
        radiusBottom: 0.4,
        height: 1,
        segments: 8,
      });
      const craneBaseMaterial = getCachedMaterial("standard", {
        color: 0x666666,
      });
      const craneBase = new THREE.Mesh(craneBaseGeometry, craneBaseMaterial);
      craneBase.position.set(2, 0.5, 0);
      group.add(craneBase);

      const craneTowerGeometry = getCachedGeometry("box", {
        width: 0.3,
        height: data.scale.y + 1.5,
        depth: 0.3,
      });
      const craneTowerMaterial = getCachedMaterial("standard", {
        color: 0x888888,
      });
      const craneTower = new THREE.Mesh(craneTowerGeometry, craneTowerMaterial);
      craneTower.position.set(2, (data.scale.y + 1.5) / 2, 0);
      group.add(craneTower);

      group.position.set(data.position.x, data.position.y, data.position.z);
      group.userData = { ...data, isInteractive: true, type: "construction" };

      return group;
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Enhanced building creation for Worabe
  const createEnhancedBuilding = useCallback(
    (data) => {
      const group = new THREE.Group();

      // Main building structure
      const mainGeometry = getCachedGeometry("box", {
        width: data.scale.x,
        height: data.scale.y,
        depth: data.scale.z,
      });
      const mainMaterial = getCachedMaterial("standard", {
        color: data.color || 0x8b4513,
        metalness: 0.1,
        roughness:
          data.condition === "poor"
            ? 0.9
            : data.condition === "fair"
            ? 0.7
            : 0.5,
      });
      const mainBuilding = new THREE.Mesh(mainGeometry, mainMaterial);
      mainBuilding.position.y = data.scale.y / 2;
      mainBuilding.castShadow = true;
      mainBuilding.receiveShadow = true;
      group.add(mainBuilding);

      // Add windows
      createWorabeWindows(group, data);

      // Add roof
      createWorabeRoof(group, data);

      // Add entrance
      createWorabeEntrance(group, data);

      group.position.set(data.position.x, data.position.y, data.position.z);
      group.userData = { ...data, isInteractive: true, type: "building" };

      return group;
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Create Worabe-style windows
  const createWorabeWindows = useCallback(
    (group, data) => {
      const floorHeight = data.scale.y / Math.max(data.floors, 1);
      const windowWidth = 0.3;
      const windowHeight = 0.4;

      for (let floor = 0; floor < data.floors; floor++) {
        const floorY = floor * floorHeight + floorHeight * 0.3;
        const windowsPerSide = data.floors === 1 ? 1 : 2;

        for (let i = 0; i < windowsPerSide; i++) {
          const windowSpacing = data.scale.x / (windowsPerSide + 1);

          // Front windows
          const windowGeometry = getCachedGeometry("box", {
            width: windowWidth,
            height: windowHeight,
            depth: 0.05,
          });
          const windowMaterial = getCachedMaterial("standard", {
            color: 0x87ceeb,
            emissive: timeOfDay === "night" ? 0x222222 : 0x000000,
            emissiveIntensity: 0.2,
          });
          const window = new THREE.Mesh(windowGeometry, windowMaterial);
          window.position.set(
            -data.scale.x / 2 + windowSpacing * (i + 1),
            floorY,
            data.scale.z / 2 + 0.01
          );
          group.add(window);
        }
      }
    },
    [timeOfDay, getCachedGeometry, getCachedMaterial]
  );

  // Create Worabe-style roofs
  const createWorabeRoof = useCallback(
    (group, data) => {
      const roofY = data.scale.y;

      switch (data.roofType) {
        case "thatched":
          // Thatched roof for traditional houses
          const thatchGeometry = getCachedGeometry("cylinder", {
            radiusTop: 0,
            radiusBottom: data.scale.x * 0.7,
            height: data.scale.y * 0.4,
            segments: 8,
          });
          const thatchMaterial = getCachedMaterial("standard", {
            color: 0x8b4513,
            roughness: 1.0,
          });
          const thatch = new THREE.Mesh(thatchGeometry, thatchMaterial);
          thatch.position.y = roofY + data.scale.y * 0.2;
          group.add(thatch);
          break;

        case "slanted":
          // Slanted tin roof
          const roofGeometry = getCachedGeometry("box", {
            width: data.scale.x * 1.1,
            height: 0.1,
            depth: data.scale.z * 1.1,
          });
          const roofMaterial = getCachedMaterial("standard", {
            color: 0x708090,
            metalness: 0.8,
            roughness: 0.3,
          });
          const roof = new THREE.Mesh(roofGeometry, roofMaterial);
          roof.position.y = roofY + 0.05;
          roof.rotation.x = Math.PI / 8;
          group.add(roof);
          break;

        case "domed":
          // Domed roof for religious buildings
          const domeGeometry = getCachedGeometry("sphere", {
            radius: data.scale.x * 0.5,
            widthSegments: 16,
            heightSegments: 8,
          });
          const domeMaterial = getCachedMaterial("standard", {
            color: 0x228b22,
          });
          const dome = new THREE.Mesh(domeGeometry, domeMaterial);
          dome.position.y = roofY + data.scale.x * 0.3;
          dome.scale.y = 0.5;
          group.add(dome);
          break;

        default:
          // Default flat roof
          const flatRoofGeometry = getCachedGeometry("box", {
            width: data.scale.x * 1.02,
            height: 0.1,
            depth: data.scale.z * 1.02,
          });
          const flatRoofMaterial = getCachedMaterial("standard", {
            color: 0x666666,
          });
          const flatRoof = new THREE.Mesh(flatRoofGeometry, flatRoofMaterial);
          flatRoof.position.y = roofY + 0.05;
          group.add(flatRoof);
      }
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Create Worabe-style entrance
  const createWorabeEntrance = useCallback(
    (group, data) => {
      const entranceWidth = data.scale.x * 0.3;
      const entranceHeight = data.scale.y * 0.4;

      const entranceGeometry = getCachedGeometry("box", {
        width: entranceWidth,
        height: entranceHeight,
        depth: 0.3,
      });
      const entranceMaterial = getCachedMaterial("standard", {
        color: 0x8b4513,
      });
      const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
      entrance.position.set(0, entranceHeight / 2, data.scale.z / 2 + 0.15);
      group.add(entrance);

      // Simple door
      const doorGeometry = getCachedGeometry("box", {
        width: entranceWidth * 0.6,
        height: entranceHeight * 0.8,
        depth: 0.05,
      });
      const doorMaterial = getCachedMaterial("standard", { color: 0x2f4f4f });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(0, entranceHeight * 0.4, data.scale.z / 2 + 0.2);
      group.add(door);
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Create water body
  const createWater = useCallback(
    (data) => {
      const group = new THREE.Group();

      const geometry = getCachedGeometry("box", {
        width: data.scale.x,
        height: data.scale.y,
        depth: data.scale.z,
      });
      const material = getCachedMaterial("standard", {
        color: data.type === "well" ? 0x1e90ff : 0x4682b4,
        transparent: true,
        opacity: 0.7,
        metalness: 0.1,
        roughness: 0.2,
      });
      const water = new THREE.Mesh(geometry, material);
      water.position.y = data.scale.y / 2;
      group.add(water);

      // Add well structure if it's a well
      if (data.type === "well") {
        const wellGeometry = getCachedGeometry("cylinder", {
          radiusTop: 0.8,
          radiusBottom: 1,
          height: 0.5,
          segments: 16,
        });
        const wellMaterial = getCachedMaterial("standard", { color: 0x8b4513 });
        const well = new THREE.Mesh(wellGeometry, wellMaterial);
        well.position.y = 0.25;
        group.add(well);
      }

      group.position.set(data.position.x, data.position.y, data.position.z);
      group.userData = { ...data, isInteractive: true, type: "water" };

      return group;
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Create park
  const createPark = useCallback(
    (data) => {
      const group = new THREE.Group();

      // Ground with grass texture
      const groundGeometry = getCachedGeometry("box", {
        width: data.scale.x,
        height: data.scale.y,
        depth: data.scale.z,
      });
      const groundMaterial = getCachedMaterial("standard", {
        color: 0x228b22,
        roughness: 0.9,
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.position.y = data.scale.y / 2;
      group.add(ground);

      // Trees with Worabe-style vegetation
      for (let i = 0; i < data.trees; i++) {
        const treeGroup = new THREE.Group();

        // Trunk
        const trunkGeometry = getCachedGeometry("cylinder", {
          radiusTop: 0.08,
          radiusBottom: 0.12,
          height: 0.8,
          segments: 8,
        });
        const trunkMaterial = getCachedMaterial("standard", {
          color: 0x8b4513,
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 0.4;
        treeGroup.add(trunk);

        // Leaves - simplified for performance
        const leavesGeometry = getCachedGeometry("sphere", {
          radius: 0.3,
          widthSegments: 8,
          heightSegments: 6,
        });
        const leavesMaterial = getCachedMaterial("standard", {
          color: 0x006400,
        });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 1.0;
        treeGroup.add(leaves);

        treeGroup.position.set(
          (Math.random() - 0.5) * data.scale.x * 0.8,
          0,
          (Math.random() - 0.5) * data.scale.z * 0.8
        );
        group.add(treeGroup);
      }

      // Simple benches
      for (let i = 0; i < data.benches; i++) {
        const benchGroup = new THREE.Group();

        const seatGeometry = getCachedGeometry("box", {
          width: 0.8,
          height: 0.05,
          depth: 0.2,
        });
        const seatMaterial = getCachedMaterial("standard", { color: 0x8b4513 });
        const seat = new THREE.Mesh(seatGeometry, seatMaterial);
        seat.position.y = 0.25;
        benchGroup.add(seat);

        benchGroup.position.set(
          (Math.random() - 0.5) * data.scale.x * 0.6,
          0,
          (Math.random() - 0.5) * data.scale.z * 0.6
        );
        benchGroup.rotation.y = Math.random() * Math.PI;
        group.add(benchGroup);
      }

      group.position.set(data.position.x, data.position.y, data.position.z);
      group.userData = { ...data, isInteractive: true, type: "park" };

      return group;
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Create infrastructure
  const createInfrastructure = useCallback(
    (data) => {
      const group = new THREE.Group();

      const geometry = getCachedGeometry("box", {
        width: data.scale.x,
        height: data.scale.y,
        depth: data.scale.z,
      });

      let roadColor;
      switch (data.condition) {
        case "good":
          roadColor = 0x333333;
          break;
        case "fair":
          roadColor = 0x555555;
          break;
        case "poor":
          roadColor = 0x8b4513; // Dirt road color
          break;
        default:
          roadColor = 0x666666;
      }

      const material = getCachedMaterial("standard", {
        color: roadColor,
        roughness: 0.9,
      });
      const road = new THREE.Mesh(geometry, material);
      road.position.y = data.scale.y / 2;
      group.add(road);

      // Road markings only for main roads in good condition
      if (data.type === "main_road" && data.condition === "good") {
        const markingGeometry = getCachedGeometry("box", {
          width: 1.5,
          height: 0.02,
          depth: 0.1,
        });
        const markingMaterial = getCachedMaterial("standard", {
          color: 0xffffff,
        });

        for (let i = -20; i <= 20; i += 5) {
          const marking = new THREE.Mesh(markingGeometry, markingMaterial);
          marking.position.set(i, data.scale.y + 0.01, 0);
          group.add(marking);
        }
      }

      group.position.set(data.position.x, data.position.y, data.position.z);
      group.userData = { ...data, isInteractive: true, type: "infrastructure" };

      return group;
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Enhanced vehicle creation for Worabe
  const createEnhancedVehicle = useCallback(
    (data) => {
      const group = new THREE.Group();

      const speedMultiplier = trafficSettings[trafficDensity].speedMultiplier;
      const adjustedSpeed = data.speed * speedMultiplier;

      group.userData = {
        ...data,
        direction: Math.random() > 0.5 ? 1 : -1,
        moveSpeed: adjustedSpeed,
        originalX: data.position.x,
        originalZ: data.position.z,
        laneOffset: (Math.random() - 0.5) * 1.5,
        wobbleOffset: Math.random() * Math.PI * 2,
      };

      let bodyGeometry,
        bodyColor = data.color;

      switch (data.type) {
        case "minibus":
          bodyGeometry = getCachedGeometry("box", {
            width: 1.8,
            height: 1.2,
            depth: 3.5,
          });
          break;
        case "truck":
          bodyGeometry = getCachedGeometry("box", {
            width: 1.6,
            height: 1.4,
            depth: 3,
          });
          break;
        case "truck_small":
          bodyGeometry = getCachedGeometry("box", {
            width: 1.2,
            height: 1,
            depth: 2.2,
          });
          break;
        case "car_old":
          bodyGeometry = getCachedGeometry("box", {
            width: 1.2,
            height: 0.8,
            depth: 2.5,
          });
          break;
        case "motorcycle":
          bodyGeometry = getCachedGeometry("box", {
            width: 0.4,
            height: 0.6,
            depth: 1.2,
          });
          break;
        default:
          bodyGeometry = getCachedGeometry("box", {
            width: 1.2,
            height: 0.8,
            depth: 2.5,
          });
      }

      const bodyMaterial = getCachedMaterial("standard", {
        color: bodyColor,
        metalness: 0.2,
        roughness: 0.7,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      group.add(body);

      // Add windows for larger vehicles
      if (data.type !== "motorcycle") {
        const windowGeometry = getCachedGeometry("box", {
          width: bodyGeometry.parameters.width * 0.7,
          height: 0.3,
          depth: 0.05,
        });
        const windowMaterial = getCachedMaterial("standard", {
          color: 0x87ceeb,
          transparent: true,
          opacity: 0.6,
        });
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        window.position.y = 0.3;
        window.position.z = -bodyGeometry.parameters.depth * 0.2;
        group.add(window);
      }

      // Add wheels
      const wheelRadius = data.type === "motorcycle" ? 0.15 : 0.25;
      const wheelGeometry = getCachedGeometry("cylinder", {
        radiusTop: wheelRadius,
        radiusBottom: wheelRadius,
        height: 0.15,
        segments: 12,
      });
      wheelGeometry.rotateZ(Math.PI / 2);
      const wheelMaterial = getCachedMaterial("standard", {
        color: 0x222222,
        roughness: 0.9,
      });

      const wheelPositions =
        data.type === "motorcycle"
          ? [
              [-0.15, -wheelRadius, 0.3],
              [0.15, -wheelRadius, 0.3],
            ]
          : [
              [-0.6, -wheelRadius, -0.8],
              [0.6, -wheelRadius, -0.8],
              [-0.6, -wheelRadius, 0.8],
              [0.6, -wheelRadius, 0.8],
            ];

      wheelPositions.forEach((pos) => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(...pos);
        wheel.castShadow = true;
        wheel.userData = { rotationSpeed: adjustedSpeed * 10 };
        group.add(wheel);
      });

      group.position.set(data.position.x, data.position.y, data.position.z);
      return group;
    },
    [trafficDensity, getCachedGeometry, getCachedMaterial]
  );

  // Create street lights
  const createStreetLights = useCallback(
    (data) => {
      const group = new THREE.Group();

      // Simple light pole
      const poleGeometry = getCachedGeometry("cylinder", {
        radiusTop: 0.05,
        radiusBottom: 0.08,
        height: 3,
        segments: 8,
      });
      const poleMaterial = getCachedMaterial("standard", { color: 0x666666 });
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.y = 1.5;
      group.add(pole);

      // Light fixture
      const fixtureGeometry = getCachedGeometry("sphere", {
        radius: 0.2,
        widthSegments: 8,
        heightSegments: 6,
      });
      const fixtureMaterial = getCachedMaterial("standard", {
        color: 0xffffcc,
        emissive: 0xffff99,
        emissiveIntensity: data.intensity,
      });
      const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
      fixture.position.y = 3;
      group.add(fixture);

      // Point light for illumination
      const pointLight = new THREE.PointLight(0xffffcc, data.intensity, 8, 1.5);
      pointLight.position.y = 2.8;
      group.add(pointLight);

      group.position.set(data.x, 0, data.z);
      return { group, pointLight };
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Create pedestrians
  const createPedestrians = useCallback(
    (data) => {
      const group = new THREE.Group();

      // Simple body
      const bodyGeometry = getCachedGeometry("cylinder", {
        radiusTop: 0.08,
        radiusBottom: 0.08,
        height: 0.5,
        segments: 8,
      });
      const bodyMaterial = getCachedMaterial("standard", { color: 0x0000ff });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.25;
      group.add(body);

      // Head
      const headGeometry = getCachedGeometry("sphere", {
        radius: 0.06,
        widthSegments: 8,
        heightSegments: 6,
      });
      const headMaterial = getCachedMaterial("standard", { color: 0xffdbac });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 0.55;
      group.add(head);

      group.position.set(data.x, 0, data.z);
      group.userData = {
        ...data,
        originalX: data.x,
        originalZ: data.z,
        direction: Math.random() * Math.PI * 2,
        changeDirectionTime: 0,
      };

      return group;
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Create animals
  const createAnimals = useCallback(
    (data) => {
      const group = new THREE.Group();

      let bodyGeometry, bodyColor;

      if (data.type === "goat") {
        bodyGeometry = getCachedGeometry("box", {
          width: 0.3,
          height: 0.2,
          depth: 0.5,
        });
        bodyColor = 0xffffff;
      } else {
        // chicken
        bodyGeometry = getCachedGeometry("sphere", {
          radius: 0.1,
          widthSegments: 8,
          heightSegments: 6,
        });
        bodyColor = 0xff0000;
      }

      const bodyMaterial = getCachedMaterial("standard", {
        color: bodyColor,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      group.add(body);

      group.position.set(data.x, 0.1, data.z);
      group.userData = {
        ...data,
        originalX: data.x,
        originalZ: data.z,
        direction: Math.random() * Math.PI * 2,
        changeDirectionTime: 0,
      };

      return group;
    },
    [getCachedGeometry, getCachedMaterial]
  );

  // Enhanced construction site with workers
  const createEnhancedConstructionSite = useCallback(
    (data) => {
      const group = createConstructionSite(data);

      // Adjust construction speed
      const speedMultiplier =
        constructionSpeed === "slow"
          ? 0.5
          : constructionSpeed === "normal"
          ? 1.0
          : 1.5;
      group.userData.animationSpeed = data.animationSpeed * speedMultiplier;

      // Add construction workers
      for (let i = 0; i < data.workers; i++) {
        const workerGroup = new THREE.Group();

        // Worker body
        const bodyGeometry = getCachedGeometry("cylinder", {
          radiusTop: 0.06,
          radiusBottom: 0.06,
          height: 0.3,
          segments: 8,
        });
        const bodyMaterial = getCachedMaterial("standard", { color: 0x0000ff });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.15;
        workerGroup.add(body);

        // Worker head
        const headGeometry = getCachedGeometry("sphere", {
          radius: 0.05,
          widthSegments: 8,
          heightSegments: 6,
        });
        const headMaterial = getCachedMaterial("standard", { color: 0xffdbac });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 0.35;
        workerGroup.add(head);

        workerGroup.position.set(
          (Math.random() - 0.5) * data.scale.x * 0.6,
          0,
          (Math.random() - 0.5) * data.scale.z * 0.6
        );

        workerGroup.userData = {
          moveSpeed: (0.2 + Math.random() * 0.3) * speedMultiplier,
          workCycle: Math.random() * Math.PI * 2,
        };
        group.add(workerGroup);
      }

      group.position.set(data.position.x, data.position.y, data.position.z);
      return group;
    },
    [
      createConstructionSite,
      constructionSpeed,
      getCachedGeometry,
      getCachedMaterial,
    ]
  );

  // Update lighting based on time of day
  const updateLighting = useCallback(() => {
    const settings = timeSettings[timeOfDay];
    if (!settings) return;

    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = settings.ambientIntensity;
    }
    if (directionalLightRef.current) {
      directionalLightRef.current.intensity = settings.directionalIntensity;
    }
    if (hemisphereLightRef.current) {
      hemisphereLightRef.current.intensity = settings.hemisphereIntensity;
    }
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(settings.skyColor);
      sceneRef.current.fog = new THREE.Fog(
        settings.fogColor,
        settings.fogNear,
        settings.fogFar
      );
    }

    // Update street lights
    pointLightsRef.current.forEach((light) => {
      if (light) {
        light.intensity = timeOfDay === "night" ? 1 : 0;
      }
    });
  }, [timeOfDay]);

  // Update weather effects
  const updateWeather = useCallback(() => {
    const settings = weatherSettings[weather];
    if (!settings) return;

    // Update fog density
    if (sceneRef.current.fog) {
      sceneRef.current.fog.far = 120 * (1 - settings.fogDensity);
    }
  }, [weather]);

  // Performance-optimized animation system
  const enhancedAnimate = useCallback(
    (time, delta) => {
      if (!sceneRef.current) return;

      // Animate Worabe text
      if (worabeTextRef.current) {
        animateWorabeText(time);
      }

      // Animate fireworks
      if (showFireworks && fireworksRef.current.length) {
        animateFireworks(time, delta);

        // Create new fireworks periodically
        if (time % 2 < delta && fireworksRef.current.length < 8) {
          const newFireworks = createFireworks(sceneRef.current);
          fireworksRef.current.push(...newFireworks);
        }
      }

      // Animate celebration lights
      if (celebrationLightsRef.current.length) {
        animateCelebrationLights(time);
      }

      // Animate winning particles
      if (particlesRef.current) {
        animateWinningParticles(time, delta);
      }

      // Animate vehicles
      sceneRef.current.children.forEach((child) => {
        if (!child || !child.userData) return;

        // Vehicle animation
        if (child.userData.type && child.userData.type.includes("vehicle")) {
          const vehicle = child.userData;

          // Move vehicles along roads
          if (Math.abs(child.position.x) > 25) {
            vehicle.direction *= -1;
          }

          child.position.x += vehicle.moveSpeed * vehicle.direction * delta;

          // Add slight wobble for realism
          child.position.y =
            0.3 + Math.sin(time * 5 + vehicle.wobbleOffset) * 0.05;

          // Rotate wheels
          if (child.children) {
            child.children.forEach((part) => {
              if (part && part.userData && part.userData.rotationSpeed) {
                part.rotation.x +=
                  vehicle.moveSpeed *
                  vehicle.direction *
                  part.userData.rotationSpeed *
                  delta;
              }
            });
          }
        }

        // Animate pedestrians
        if (child.userData && child.userData.type === "walker") {
          const ped = child.userData;
          ped.changeDirectionTime += delta;

          if (ped.changeDirectionTime > 4) {
            ped.direction = Math.random() * Math.PI * 2;
            ped.changeDirectionTime = 0;
          }

          child.position.x += Math.cos(ped.direction) * ped.speed * delta;
          child.position.z += Math.sin(ped.direction) * ped.speed * delta;

          // Keep pedestrians in bounds
          const distanceFromOriginal = Math.sqrt(
            Math.pow(child.position.x - ped.originalX, 2) +
              Math.pow(child.position.z - ped.originalZ, 2)
          );

          if (distanceFromOriginal > 6) {
            ped.direction += Math.PI;
          }

          // Walking animation
          child.position.y = 0.1 + Math.sin(time * ped.speed * 8) * 0.03;
        }

        // Animate animals
        if (
          child.userData &&
          child.userData.type &&
          (child.userData.type === "goat" || child.userData.type === "chicken")
        ) {
          const animal = child.userData;
          animal.changeDirectionTime += delta;

          if (animal.changeDirectionTime > 6) {
            animal.direction = Math.random() * Math.PI * 2;
            animal.changeDirectionTime = 0;
          }

          child.position.x += Math.cos(animal.direction) * animal.speed * delta;
          child.position.z += Math.sin(animal.direction) * animal.speed * delta;

          // Keep animals in bounds
          const distanceFromOriginal = Math.sqrt(
            Math.pow(child.position.x - animal.originalX, 2) +
              Math.pow(child.position.z - animal.originalZ, 2)
          );

          if (distanceFromOriginal > 4) {
            animal.direction += Math.PI;
          }
        }

        // Animate construction progress
        if (child.userData && child.userData.type === "construction") {
          const construction = child.userData;

          // Update progress based on construction speed
          if (construction.progress < 100) {
            construction.progress += construction.animationSpeed * delta * 10;
            if (construction.progress > 100) construction.progress = 100;

            // Update progress visualization
            child.children.forEach((subChild) => {
              if (
                subChild &&
                subChild.userData &&
                subChild.userData.isProgress
              ) {
                const progressHeight =
                  (construction.progress / 100) * construction.scale.y;
                subChild.scale.y = progressHeight / construction.scale.y;
                subChild.position.y = progressHeight / 2 + 0.2;
              }
            });

            // Trigger celebration when construction completes
            if (construction.progress >= 100 && !construction.celebrated) {
              construction.celebrated = true;
              setShowFireworks(true);
              celebrationLightsRef.current = createCelebrationLights(
                sceneRef.current
              );

              // Auto-stop fireworks after 10 seconds
              setTimeout(() => {
                setShowFireworks(false);
              }, 10000);
            }
          }
        }
      });
    },
    [
      showFireworks,
      animateWorabeText,
      animateFireworks,
      animateCelebrationLights,
      animateWinningParticles,
      createFireworks,
      createCelebrationLights,
    ]
  );

  // Handle click for surprise features
  const handleElementClick = (element) => {
    if (!element) return;

    setClickedElement(element);

    // Random surprise effects
    const surprise = Math.random();

    if (surprise < 0.3) {
      // Trigger winning animation
      particlesRef.current = createWinningAnimation(sceneRef.current);
    } else if (surprise < 0.6) {
      // Trigger fireworks
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 5000);
    }
  };

  // Main initialization effect
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera with responsive settings
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Responsive camera position
    const isMobileDevice = window.innerWidth <= 768;
    camera.position.set(0, isMobileDevice ? 15 : 20, isMobileDevice ? 25 : 35);
    cameraRef.current = camera;

    // Initialize renderer with performance settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Add renderer to DOM
    mount.appendChild(renderer.domElement);

    // Initialize controls with responsive settings
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = isMobileDevice ? 10 : 15;
    controls.maxDistance = isMobileDevice ? 50 : 80;
    controlsRef.current = controls;

    // Initialize raycaster
    raycasterRef.current = new THREE.Raycaster();

    // Create lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    directionalLightRef.current = directionalLight;

    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x8b4513, 0.4);
    scene.add(hemisphereLight);
    hemisphereLightRef.current = hemisphereLight;

    // Create ground with Worabe-style texture
    const groundGeometry = getCachedGeometry("plane", {
      width: 100,
      height: 100,
      segments: 10,
    });
    const groundMaterial = getCachedMaterial("standard", {
      color: 0x90ee90,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create larger and more animated Worabe 3D text in background
    createWorabeText(scene);

    // Create city elements for Worabe with traffic density consideration
    const vehicleCount = trafficSettings[trafficDensity].vehicleCount;
    const selectedVehicles = elementsData.vehicles.slice(0, vehicleCount);

    // Create constructions
    elementsData.construction.forEach((data) => {
      try {
        const construction = createEnhancedConstructionSite(data);
        scene.add(construction);
      } catch (error) {
        console.error("Error creating construction site:", error);
      }
    });

    // Create buildings
    elementsData.buildings.forEach((data) => {
      try {
        const building = createEnhancedBuilding(data);
        scene.add(building);
      } catch (error) {
        console.error("Error creating building:", error);
      }
    });

    // Create water bodies
    elementsData.water.forEach((data) => {
      try {
        const water = createWater(data);
        scene.add(water);
      } catch (error) {
        console.error("Error creating water body:", error);
      }
    });

    // Create parks
    elementsData.parks.forEach((data) => {
      try {
        const park = createPark(data);
        scene.add(park);
      } catch (error) {
        console.error("Error creating park:", error);
      }
    });

    // Create infrastructure
    elementsData.infrastructure.forEach((data) => {
      try {
        const infrastructure = createInfrastructure(data);
        scene.add(infrastructure);
      } catch (error) {
        console.error("Error creating infrastructure:", error);
      }
    });

    // Create vehicles
    selectedVehicles.forEach((data) => {
      try {
        const vehicle = createEnhancedVehicle(data);
        scene.add(vehicle);
      } catch (error) {
        console.error("Error creating vehicle:", error);
      }
    });

    // Create street lights
    const streetLights = [];
    elementsData.streetLights.forEach((data) => {
      try {
        const { group, pointLight } = createStreetLights(data);
        scene.add(group);
        streetLights.push(pointLight);
      } catch (error) {
        console.error("Error creating street light:", error);
      }
    });
    pointLightsRef.current = streetLights;

    // Create pedestrians
    const pedestrianCount =
      pedestrianActivity === "low"
        ? 4
        : pedestrianActivity === "medium"
        ? 6
        : 8;
    const selectedPedestrians = elementsData.pedestrians.slice(
      0,
      pedestrianCount
    );
    selectedPedestrians.forEach((data) => {
      try {
        const pedestrian = createPedestrians(data);
        scene.add(pedestrian);
      } catch (error) {
        console.error("Error creating pedestrian:", error);
      }
    });

    // Create animals
    elementsData.animals.forEach((data) => {
      try {
        const animal = createAnimals(data);
        scene.add(animal);
      } catch (error) {
        console.error("Error creating animal:", error);
      }
    });

    // Handle mouse events
    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      if (!hoveredElement) return;
      handleElementClick(hoveredElement.userData);
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("click", handleClick);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime();

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Update lighting and weather
      updateLighting();
      updateWeather();

      // Enhanced animations
      enhancedAnimate(time, delta);

      // Update raycaster for hover effects
      if (raycasterRef.current && cameraRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(
          scene.children,
          true
        );

        if (intersects.length > 0) {
          const interactiveObject = intersects.find(
            (intersect) => intersect.object.userData?.isInteractive
          );
          if (interactiveObject) {
            setHoveredElement(interactiveObject.object);
          } else {
            setHoveredElement(null);
          }
        } else {
          setHoveredElement(null);
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle resize with responsive updates
    const handleResize = () => {
      const isMobileNow = window.innerWidth <= 768;
      setIsMobile(isMobileNow);

      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }

      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }

      // Update camera position for mobile
      if (isMobileNow && cameraRef.current) {
        cameraRef.current.position.set(0, 15, 25);
        if (controlsRef.current) {
          controlsRef.current.minDistance = 10;
          controlsRef.current.maxDistance = 50;
        }
      } else if (cameraRef.current) {
        cameraRef.current.position.set(0, 20, 35);
        if (controlsRef.current) {
          controlsRef.current.minDistance = 15;
          controlsRef.current.maxDistance = 80;
        }
      }

      // Recreate Worabe text with new responsive settings
      if (
        worabeTextRef.current &&
        worabeTextRef.current.group &&
        worabeTextRef.current.group.parent
      ) {
        scene.remove(worabeTextRef.current.group);
      }
      createWorabeText(scene);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.removeEventListener(
          "mousemove",
          handleMouseMove
        );
        rendererRef.current.domElement.removeEventListener(
          "click",
          handleClick
        );
      }

      if (mount && rendererRef.current && rendererRef.current.domElement) {
        mount.removeChild(rendererRef.current.domElement);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      // Clear geometry and material caches
      if (geometryCache.current) {
        geometryCache.current.forEach((geometry) => geometry.dispose());
        geometryCache.current.clear();
      }

      if (materialCache.current) {
        materialCache.current.forEach((material) => material.dispose());
        materialCache.current.clear();
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    createEnhancedConstructionSite,
    createEnhancedBuilding,
    createWater,
    createPark,
    createInfrastructure,
    createEnhancedVehicle,
    createStreetLights,
    createPedestrians,
    createAnimals,
    createWorabeText,
    updateLighting,
    updateWeather,
    enhancedAnimate,
    getCachedGeometry,
    getCachedMaterial,
  ]);

  // Info panel component
  const InfoPanel = () => {
    if (!clickedElement) return null;

    return (
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: isMobile ? "10px" : "20px",
          background: "rgba(255, 255, 255, 0.98)",
          padding: isMobile ? "15px" : "25px",
          borderRadius: "20px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
          maxWidth: isMobile ? "300px" : "380px",
          zIndex: 1000,
          border: "3px solid #ff6000",
          backdropFilter: "blur(15px)",
        }}
      >
        <h3
          style={{
            margin: "0 0 15px 0",
            color: "#ff6000",
            fontSize: isMobile ? "1.2em" : "1.4em",
          }}
        >
          {clickedElement.name || clickedElement.description}
        </h3>

        <div style={{ marginBottom: "15px" }}>
          <strong>Type:</strong> {clickedElement.type}
        </div>

        {clickedElement.progress !== undefined && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Progress:</strong>{" "}
            {Math.min(100, Math.round(clickedElement.progress))}%
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#f0f0f0",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, clickedElement.progress)}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #ff6000, #ff8c00)",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </div>
        )}

        {clickedElement.completion && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Completion:</strong> {clickedElement.completion}
          </div>
        )}

        {clickedElement.budget && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Budget:</strong> {clickedElement.budget}
          </div>
        )}

        {clickedElement.floors && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Floors:</strong> {clickedElement.floors}
          </div>
        )}

        {clickedElement.capacity && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Capacity:</strong> {clickedElement.capacity}
          </div>
        )}

        {clickedElement.condition && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Condition:</strong> {clickedElement.condition}
          </div>
        )}

        {clickedElement.business && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Business:</strong> {clickedElement.business}
          </div>
        )}

        <button
          onClick={() => setClickedElement(null)}
          style={{
            padding: "8px 16px",
            background: "#ff6000",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mountRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          cursor: hoveredElement ? "pointer" : "grab",
        }}
      />

      {/* Info panel for clicked element */}
      <InfoPanel />
    </div>
  );
};

export default ThreeDBackground;
