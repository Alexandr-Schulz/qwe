"use client";

import { Renderer, Program, Mesh, Color, Triangle, Transform, Camera } from 'ogl';
import { useLayoutEffect, useRef } from 'react';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 6.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

interface IridescenceProps {
  className?: string;
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  onReady?: () => void;
}

export default function Iridescence({
  className,
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  onReady
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useLayoutEffect(() => {
    if (!ctnDom.current || !canvasRef.current) return;
    const ctn = ctnDom.current;
    let ro: ResizeObserver | null = null;
    let scrollTimer: any = null;
    try {
      const DPR = Math.min(window.devicePixelRatio || 1, 1.25);
      const renderer = new Renderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: false,
        dpr: DPR as any,
      });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);

      let program: Program;

      const camera = new Camera(gl);
      camera.position.z = 1;

      // Set size synchronously before first paint
      const initW = Math.max(1, ctn.clientWidth);
      const initH = Math.max(1, ctn.clientHeight);
      renderer.setSize(initW, initH);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });

      // debounced resize to avoid thrashing during scroll
      const doResize = () => {
        const w = Math.max(1, ctn.offsetWidth);
        const h = Math.max(1, ctn.offsetHeight);
        renderer.setSize(Math.round(w * DPR), Math.round(h * DPR));
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        if (program) {
          program.uniforms.uResolution.value = new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          );
        }
      };
      function debounce<T extends (...args: any[]) => void>(fn: T, ms = 120) {
        let h: any;
        return (...args: Parameters<T>) => {
          clearTimeout(h);
          h = setTimeout(() => fn(...args), ms);
        };
      }
      const resize = debounce(doResize, 120);
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => resize());
        ro.observe(ctn);
      } else {
        window.addEventListener('resize', resize, false);
      }
      doResize();
      // retry sizing after layout settles (navigation back/SSR hydration cases)
      requestAnimationFrame(() => doResize());
      setTimeout(() => doResize(), 50);

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(color[0] ?? 1, color[1] ?? 1, color[2] ?? 1) },
          uResolution: {
            value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
          },
          uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
          uAmplitude: { value: amplitude },
          uSpeed: { value: speed }
        }
      });

      const mesh = new Mesh(gl, { geometry, program });
      const root = new Transform();
      mesh.setParent(root);
      let animateId: number;
      let io: IntersectionObserver | null = null;
      const onScreen = { current: true } as { current: boolean };
      let last = 0; // frame throttle

      if (gl.canvas.width > 0 && gl.canvas.height > 0) {
        program.uniforms.uTime.value = 0;
        renderer.render({ scene: root, camera });
        ctn.style.opacity = '1';
        onReady?.();
      }

      function update(t: number) {
        animateId = requestAnimationFrame(update);
        if (gl.canvas.width === 0 || gl.canvas.height === 0) return;
        if (!onScreen.current) return;
        if (t - last < 32) return; // ~30fps
        last = t;
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: root, camera });
      }
      animateId = requestAnimationFrame(update);

      function handleMouseMove(e: MouseEvent) {
        const rect = ctn.getBoundingClientRect();
        const rawX = (e.clientX - rect.left) / rect.width;
        const rawY = 1.0 - (e.clientY - rect.top) / rect.height;
        const x = Math.min(1, Math.max(0, rawX));
        const y = Math.min(1, Math.max(0, rawY));
        mousePos.current = { x, y };
        program.uniforms.uMouse.value[0] = x;
        program.uniforms.uMouse.value[1] = y;
      }
      if (mouseReact) {
        window.addEventListener('mousemove', handleMouseMove);
      }
      if (typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(([entry]) => {
          onScreen.current = entry.isIntersecting;
        }, { root: null, threshold: 0 });
        io.observe(ctn);
      }
      function handleVisibility() {
        if (document.visibilityState === 'visible') {
          doResize();
        }
      }
      function onScroll() {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          doResize();
        }, 120);
      }
      document.addEventListener('visibilitychange', handleVisibility);
      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        cancelAnimationFrame(animateId);
        if (!ro) {
          window.removeEventListener('resize', resize);
        } else {
          ro.disconnect();
        }
        if (mouseReact) {
          window.removeEventListener('mousemove', handleMouseMove);
        }
        io?.disconnect();
        document.removeEventListener('visibilitychange', handleVisibility);
        window.removeEventListener('scroll', onScroll as any);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    } catch (err) {
      // Fail silently and reveal container using CSS fallback
      ctn.style.opacity = '1';
      return;
    }
  }, [color, speed, amplitude, mouseReact]);

  return (
    <div
      ref={ctnDom}
      className={"w-full h-full irid-willchange" + (className ? " " + className : "")}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block irid-canvas"
      />
    </div>
  );
}
