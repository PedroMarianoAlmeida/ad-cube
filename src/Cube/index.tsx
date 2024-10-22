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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    switch (currentFace) {
      case 0:
        targetRotation.current.set(0, 0, 0);
        break; // Front
      case 1:
        targetRotation.current.set(0, Math.PI / 2, 0);
        break; // Right
      case 2:
        targetRotation.current.set(0, Math.PI, 0);
        break; // Back
      case 3:
        targetRotation.current.set(0, -Math.PI / 2, 0);
        break; // Left
      case 4:
        targetRotation.current.set(-Math.PI / 2, 0, 0);
        break; // Top
      case 5:
        targetRotation.current.set(Math.PI / 2, 0, 0);
        break; // Bottom
    }
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
