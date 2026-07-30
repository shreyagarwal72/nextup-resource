import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type Accent = "primary" | "secondary" | "tertiary" | "quaternary";

export type PaletteHsl = {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  edge: string;
};

const toThreeColor = (hsl: string) => {
  const [h, s, l] = hsl.split(/\s+/);
  return new THREE.Color().setStyle(`hsl(${h}, ${s}, ${l})`);
};

const CentralShape = ({ color, edgeColor }: { color: THREE.Color; edgeColor: THREE.Color }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const pulse = useRef(1);
  const lastColor = useRef(color.getHexString());

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.35, 0), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame((_, delta) => {
    if (!groupRef.current || !matRef.current) return;

    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x += delta * 0.1;

    // Trigger a little pop whenever the target color changes (i.e. step changed)
    if (color.getHexString() !== lastColor.current) {
      lastColor.current = color.getHexString();
      pulse.current = 1;
    }
    if (pulse.current > 0) {
      pulse.current = Math.max(0, pulse.current - delta * 1.8);
      const s = 1 + pulse.current * 0.22;
      groupRef.current.scale.setScalar(s);
    } else {
      groupRef.current.scale.setScalar(1);
    }

    matRef.current.color.lerp(color, delta * 4);
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial ref={matRef} color={color} flatShading roughness={0.35} metalness={0.05} />
      </mesh>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={edgeColor} />
      </lineSegments>
    </group>
  );
};

const shapes = ["box", "sphere", "torus"] as const;

const OrbitShape = ({
  color,
  index,
  total,
}: {
  color: THREE.Color;
  index: number;
  total: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  const angleOffset = (index / total) * Math.PI * 2;
  const shape = shapes[index % shapes.length];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.45 + angleOffset;
    const radius = 2.5;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.3) * 0.55, Math.sin(t) * radius);
    ref.current.rotation.x += 0.012;
    ref.current.rotation.y += 0.016;
  });

  return (
    <mesh ref={ref}>
      {shape === "box" && <boxGeometry args={[0.32, 0.32, 0.32]} />}
      {shape === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
      {shape === "torus" && <torusGeometry args={[0.2, 0.08, 8, 16]} />}
      <meshStandardMaterial color={color} flatShading roughness={0.4} />
    </mesh>
  );
};

const SceneContents = ({ paletteHsl, accent }: { paletteHsl: PaletteHsl; accent: Accent }) => {
  const palette = useMemo(
    () => ({
      primary: toThreeColor(paletteHsl.primary),
      secondary: toThreeColor(paletteHsl.secondary),
      tertiary: toThreeColor(paletteHsl.tertiary),
      quaternary: toThreeColor(paletteHsl.quaternary),
      edge: toThreeColor(paletteHsl.edge),
    }),
    [paletteHsl]
  );
  const orbitColors = [palette.primary, palette.secondary, palette.tertiary, palette.quaternary];

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} />
      <CentralShape color={palette[accent]} edgeColor={palette.edge} />
      {orbitColors.map((c, i) => (
        <OrbitShape key={i} color={c} index={i} total={orbitColors.length} />
      ))}
    </>
  );
};

const IntroScene = ({ accent, paletteHsl }: { accent: Accent; paletteHsl: PaletteHsl }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContents paletteHsl={paletteHsl} accent={accent} />
    </Canvas>
  );
};

export default IntroScene;
