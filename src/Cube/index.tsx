import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

import ad1 from "./../assets/ads/ad1.webp";
import ad2 from "./../assets/ads/ad2.webp";
import ad3 from "./../assets/ads/ad3.webp";
import ad4 from "./../assets/ads/ad4.webp";
import ad5 from "./../assets/ads/ad5.webp";
import ad6 from "./../assets/ads/ad6.webp";

const images = [ad1, ad2, ad3, ad4, ad5, ad6];

function Box() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [currentFace, setCurrentFace] = useState(0);
  const targetRotation = useRef(new THREE.Euler());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFace((prevFace) => (prevFace + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const positions = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: Math.PI / 2, z: 0 },
    { x: 0, y: Math.PI / 2, z: 0 },
    { x: 0, y: -Math.PI / 2, z: 0 },
    { x: -Math.PI / 2, y: 0, z: 0 },
    { x: Math.PI / 2, y: 0, z: 0 },
  ];

  useEffect(() => {
    const { x, y, z } = positions[currentFace];
    targetRotation.current.set(x, y, z);
  }, [currentFace]);

  useFrame(() => {
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y,
      0.1
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotation.current.z,
      0.1
    );
  });

  const textures = useLoader(THREE.TextureLoader, images);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
        />
      ))}
    </mesh>
  );
}

const Cube = () => {
  return (
    <Canvas style={{ height: "400px" }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box />
    </Canvas>
  );
};

export default Cube;
