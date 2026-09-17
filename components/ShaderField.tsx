"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";

/* Soft, domain-warped flow field — a premium "light through frosted glass"
   backdrop in the brand accent + warm tones. Deliberately low-contrast. */
const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;

// hash / value noise
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0., amp=0.5;
  for(int i=0;i<5;i++){ v+=amp*noise(p); p*=2.02; amp*=0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x/uRes.y;

  float t = uTime*0.045;
  vec2 m = (uMouse-0.5)*0.35;

  // domain warp
  vec2 q = vec2(fbm(p*1.4 + t + m), fbm(p*1.4 - t*0.8 - m + 5.2));
  vec2 r = vec2(fbm(p*1.6 + 1.7*q + t*0.6), fbm(p*1.6 + 1.7*q - t*0.5));
  float f = fbm(p*1.5 + 2.0*r);

  // palette — near-white base, faint cobalt + warm sand
  vec3 base  = vec3(0.984, 0.984, 0.992);
  vec3 blue  = vec3(0.62, 0.78, 0.98);
  vec3 sand  = vec3(0.98, 0.93, 0.86);
  vec3 col = base;
  col = mix(col, blue, smoothstep(0.35,0.95,f)*0.55);
  col = mix(col, sand, smoothstep(0.30,0.85,r.x)*0.28);

  // gentle radial vignette back to base at the edges
  float vig = smoothstep(1.1, 0.25, distance(uv, vec2(0.5,0.42)));
  col = mix(base, col, vig);

  // fine grain
  float g = hash(gl_FragCoord.xy + uTime)*0.02 - 0.01;
  col += g;

  gl_FragColor = vec4(col, 1.0);
}
`;

const vertex = /* glsl */ `
void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

function Field() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!mat.current) return;
    mouse.current.lerp(target.current, 0.04);
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uRes.value.set(size.width * viewport.dpr, size.height * viewport.dpr);
    uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <ScreenQuad>
      <shaderMaterial ref={mat} fragmentShader={fragment} vertexShader={vertex} uniforms={uniforms} />
    </ScreenQuad>
  );
}

export function ShaderField() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 640px)").matches;
    if (!reduced && !small) setEnabled(true);

    // Stop rendering once the hero has scrolled away.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActive(window.scrollY < window.innerHeight * 1.05);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!enabled) return null;

  return (
    <div className="shader-field" aria-hidden="true">
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        style={{ width: "100%", height: "100%" }}
      >
        <Field />
      </Canvas>
    </div>
  );
}
