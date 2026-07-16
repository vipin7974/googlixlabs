"use client";

import { useEffect } from "react";
import { getProjects } from "@/lib/content";

export default function Work({ accent = "#2B5CFF" }: { accent?: string }) {
  const projects = getProjects(accent);

  useEffect(() => {
    const list = document.getElementById("worklist");
    const prev = document.getElementById("wpreview");
    if (!list || !prev) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-work]"));
    const panels = Array.from(prev.querySelectorAll<HTMLElement>("[data-prev]"));
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const cleanups: Array<() => void> = [];
    rows.forEach((row) => {
      const idx = row.getAttribute("data-work");
      const enter = () => {
        prev.style.opacity = "1";
        prev.style.transform = "translate(-50%,-50%) scale(1)";
        panels.forEach((pn) => {
          pn.style.opacity = pn.getAttribute("data-prev") === idx ? "1" : "0";
        });
      };
      const leave = () => {
        prev.style.opacity = "0";
        prev.style.transform = "translate(-50%,-50%) scale(.9)";
      };
      const move = (e: MouseEvent) => {
        tx = e.clientX + 150;
        ty = e.clientY;
      };
      row.addEventListener("mouseenter", enter);
      row.addEventListener("mouseleave", leave);
      row.addEventListener("mousemove", move);
      cleanups.push(() => {
        row.removeEventListener("mouseenter", enter);
        row.removeEventListener("mouseleave", leave);
        row.removeEventListener("mousemove", move);
      });
    });

    let raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      prev.style.left = cx + "px";
      prev.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cleanups.forEach((fn) => fn());
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="work"
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "clamp(80px,12vw,150px) clamp(20px,5vw,60px)",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div
          data-fade
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: "clamp(40px,6vw,64px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "rgba(244,243,238,.5)",
                marginBottom: 16,
              }}
            >
              (02) — Selected work
            </div>
            <h2
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2rem,5vw,3.6rem)",
                lineHeight: 1,
                letterSpacing: "-.035em",
                margin: 0,
              }}
            >
              Recent{" "}
              <span style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic" }}>
                projects
              </span>
            </h2>
          </div>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "rgba(244,243,238,.5)" }}>
            Hover to preview →
          </span>
        </div>

        <div id="worklist" style={{ position: "relative", borderTop: "1px solid rgba(244,243,238,.16)" }}>
          {projects.map((p) => {
            const external = p.href.startsWith("http");
            return (
              <a
                key={p.idx}
                href={p.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener" : undefined}
                data-cursor
                data-fade
                data-work={p.idx}
                className="gx-work-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr auto",
                  alignItems: "center",
                  gap: 20,
                  padding: "clamp(22px,3vw,34px) 6px",
                  borderBottom: "1px solid rgba(244,243,238,.16)",
                  position: "relative",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "rgba(244,243,238,.4)" }}>
                  {p.no}
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-bricolage), sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.4rem,3.2vw,2.4rem)",
                      letterSpacing: "-.03em",
                      lineHeight: 1,
                    }}
                  >
                    {p.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11.5, color: "rgba(244,243,238,.5)" }}>
                    {p.tagline}
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "end" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11,
                      letterSpacing: ".05em",
                      textTransform: "uppercase",
                      padding: "5px 11px",
                      borderRadius: 100,
                      border: `1px solid ${p.tagBorder}`,
                      color: p.tagColor,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.status}
                  </span>
                  <span aria-hidden style={{ fontFamily: "var(--font-mono), monospace", fontSize: 15, color: "rgba(244,243,238,.6)" }}>
                    ↗
                  </span>
                </span>
              </a>
            );
          })}

          {/* floating hover preview */}
          <div
            id="wpreview"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 300,
              height: 210,
              pointerEvents: "none",
              zIndex: 75,
              opacity: 0,
              transform: "translate(-50%,-50%) scale(.9)",
              transition: "opacity .35s,transform .35s",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(0,0,0,.4)",
            }}
          >
            {projects.map((p) => (
              <div
                key={p.idx}
                data-prev={p.idx}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  transition: "opacity .3s",
                  background: "#0e0f12",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(120px 120px at 30% 30%, ${accent}33, transparent 70%)`,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    color: "rgba(244,243,238,.55)",
                    padding: "0 20px",
                    textAlign: "center",
                  }}
                >
                  {p.slotHint}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
