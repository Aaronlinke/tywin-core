import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { NodeT, LinkT } from '../types';

interface NexusCanvasProps {
  nodes: NodeT[];
  links: LinkT[];
}

export default function NexusCanvas({ nodes, links }: NexusCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const nodeMapRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const linkLinesRef = useRef<THREE.Line[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a12);
    scene.fog = new THREE.Fog(0x0a0a12, 1000, 3000);

    // Camera
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 5000);
    camera.position.set(0, 0, 1500);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x00ffcc, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff33ff, 1.0);
    pointLight.position.set(300, 300, 400);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00ffcc, 0.8);
    pointLight2.position.set(-300, -300, -400);
    scene.add(pointLight2);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.0005;
      camera.position.x = Math.sin(time) * 800;
      camera.position.z = Math.cos(time) * 800;
      camera.lookAt(0, 0, 0);

      // Rotate nodes slightly
      nodeMapRef.current.forEach((mesh) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update nodes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const map = nodeMapRef.current;
    const needed = new Set(nodes.map(n => n.id));

    // Remove stale nodes
    for (const [id, mesh] of map) {
      if (!needed.has(id)) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
        map.delete(id);
      }
    }

    // Add/update nodes
    nodes.forEach(n => {
      let mesh = map.get(n.id);
      if (!mesh) {
        const geometry = new THREE.SphereGeometry(12, 16, 16);
        const material = new THREE.MeshStandardMaterial({
          color: 0x00ffcc,
          emissive: 0x00ffcc,
          transparent: true,
          opacity: 0.85,
          metalness: 0.5,
          roughness: 0.2
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          Math.random() * 800 - 400,
          Math.random() * 600 - 300,
          Math.random() * 600 - 300
        );
        scene.add(mesh);
        map.set(n.id, mesh);
      }

      // Update material based on energy
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = n.energy / 100;
      mat.opacity = 0.5 + (n.energy / 200);
    });
  }, [nodes]);

  // Update links
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove old links
    linkLinesRef.current.forEach(line => {
      scene.remove(line);
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    });
    linkLinesRef.current = [];

    const map = nodeMapRef.current;
    links.forEach(link => {
      const fromMesh = map.get(link.from);
      const toMesh = map.get(link.to);
      if (!fromMesh || !toMesh) return;

      const points = [fromMesh.position, toMesh.position];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xff33ff,
        transparent: true,
        opacity: 0.4 * link.intensity
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      linkLinesRef.current.push(line);
    });
  }, [links]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
  );
}
