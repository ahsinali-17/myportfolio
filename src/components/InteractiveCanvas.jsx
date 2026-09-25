import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

// Pure mathematical sphere distribution helper to avoid external module ESM import quirks
const generateInSphere = (count, radius) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = radius * Math.cbrt(Math.random());
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

function ParticleStars({ color1 = "#5eead4", color2 = "#f6a66d" }) {
  const ref1 = useRef();
  const ref2 = useRef();

  // Generate random particles in spheres of different radii
  const [sphere1] = useState(() => generateInSphere(800, 1.3));
  const [sphere2] = useState(() => generateInSphere(500, 1.8));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    // Slow automatic rotation combined with pointer reactive rotation (parallax effect)
    if (ref1.current) {
      ref1.current.rotation.y = time * 0.03 + pointerX * 0.15;
      ref1.current.rotation.x = time * 0.02 - pointerY * 0.15;
    }

    if (ref2.current) {
      ref2.current.rotation.y = -time * 0.05 + pointerX * 0.25;
      ref2.current.rotation.x = -time * 0.03 - pointerY * 0.25;
    }
  });

  return (
    <group>
      {/* Primary particles (Teal) */}
      <Points ref={ref1} positions={sphere1} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color1}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      {/* Secondary particles (Orange) */}
      <Points ref={ref2} positions={sphere2} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color2}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

const InteractiveCanvas = () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: true }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense fallback={null}>
          <ParticleStars />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default InteractiveCanvas;
