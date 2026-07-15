"use client";

import { useEffect, useRef } from "react";
import { hexA } from "@/lib/hex";

/**
 * Canvas 2D flow-field particle background, ported from the source
 * design's initFlow(). Lives behind the hero copy.
 */
export default function FlowCanvas({ accent = "#2B5CFF" }: { accent?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const paper =
      getComputedStyle(document.documentElement).getPropertyValue("--paper").trim() || "#F4F3EE";

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, W, H);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = Math.max(40, Math.min(90, Math.floor(W / 16)));
    const parts = Array.from({ length: N }, () => {
      const x = Math.random() * W;
      const y = Math.random() * H;
      return { x, y, px: x, py: y, acc: Math.random() < 0.14 };
    });

    let mx = -999;
    let my = -999;
    const parent = canvas.parentElement;
    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    parent?.addEventListener("mousemove", onMouseMove);

    let t = 0;
    let scrollFade = 1;
    const onScroll = () => {
      scrollFade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.9));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const speed = 0.7;
    let raf = 0;
    const step = () => {
      t += 0.6;
      ctx.fillStyle = paper.startsWith("#") ? hexA(paper, 0.05) : paper;
      ctx.fillRect(0, 0, W, H);
      for (const p of parts) {
        const ang =
          (Math.sin(p.x * 0.0016 + t * 0.002) + Math.cos(p.y * 0.0021 - t * 0.0015)) * Math.PI;
        let vx = Math.cos(ang) * speed;
        let vy = Math.sin(ang) * speed;
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (1 - d2 / 14000) * 1.6;
          vx += (dx / Math.sqrt(d2 + 1)) * f;
          vy += (dy / Math.sqrt(d2 + 1)) * f;
        }
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        if (Math.abs(p.x - p.px) > W / 2 || Math.abs(p.y - p.py) > H / 2) continue;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.acc ? hexA(accent, 0.5 * scrollFade) : hexA("#17181B", 0.32 * scrollFade);
        ctx.lineWidth = p.acc ? 1.4 : 0.9;
        ctx.stroke();
      }
      raf = requestAnimationFrame(step);
    };
    step();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      parent?.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [accent]);

  return (
    <canvas
      id="flow"
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
