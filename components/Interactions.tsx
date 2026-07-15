"use client";

import { useEffect } from "react";

/**
 * Site-wide interaction layer, ported from the source design's
 * componentDidMount() controller: scroll reveals, animated counters,
 * scroll progress bar, magnetic buttons and the custom cursor.
 * Renders the progress bar + cursor dot/ring (fixed, top-level elements)
 * and wires up behaviour for any [data-fade] / .gx-mask / [data-count] /
 * [data-magnetic] / [data-cursor] element anywhere on the page.
 */
export default function Interactions() {
  useEffect(() => {
    const timers: number[] = [];
    const cleanups: Array<() => void> = [];

    const t = window.setTimeout(() => {
      initReveals();
      initCounters();
      initProgress();
      initMagnetic();
      initCursor();
    }, 50);
    timers.push(t);

    function initReveals() {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-fade], .gx-mask"));
      if (!("IntersectionObserver" in window)) {
        els.forEach((e) => e.classList.add("gx-shown"));
        return;
      }
      const io = new IntersectionObserver(
        (ents) => {
          ents.forEach((ent) => {
            if (!ent.isIntersecting) return;
            const el = ent.target as HTMLElement;
            const sibs = el.parentElement
              ? Array.from(el.parentElement.children).filter((c) => c.matches("[data-fade],.gx-mask"))
              : [el];
            const delay = Math.min(sibs.indexOf(el), 6) * 80;
            const id = window.setTimeout(() => el.classList.add("gx-shown"), delay);
            timers.push(id);
            io.unobserve(el);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
      );
      els.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());

      const revealInView = () => {
        els.forEach((el) => {
          if (el.classList.contains("gx-shown")) return;
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
            const sibs = el.parentElement
              ? Array.from(el.parentElement.children).filter((c) => c.matches("[data-fade],.gx-mask"))
              : [el];
            const delay = Math.min(Math.max(sibs.indexOf(el), 0), 6) * 90;
            const id = window.setTimeout(() => el.classList.add("gx-shown"), delay);
            timers.push(id);
          }
        });
      };
      const id2 = window.setTimeout(revealInView, 300);
      timers.push(id2);
      window.addEventListener("scroll", revealInView, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", revealInView));
    }

    function initCounters() {
      const els = Array.from(document.querySelectorAll<HTMLElement & { _counted?: boolean }>("[data-count]"));
      const run = (el: HTMLElement & { _counted?: boolean }) => {
        if (el._counted) return;
        el._counted = true;
        const target = parseFloat(el.getAttribute("data-count") || "0") || 0;
        const dur = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * e));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(
        (ents) => {
          ents.forEach((ent) => {
            if (!ent.isIntersecting) return;
            run(ent.target as HTMLElement);
            io.unobserve(ent.target);
          });
        },
        { threshold: 0.6 }
      );
      els.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
      const id = window.setTimeout(() => {
        els.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) run(el);
        });
      }, 500);
      timers.push(id);
    }

    function initProgress() {
      const bar = document.getElementById("prog");
      const upd = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      };
      upd();
      window.addEventListener("scroll", upd, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", upd));
    }

    function initMagnetic() {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
      const onMove = (el: HTMLElement) => (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${
          (e.clientY - r.top - r.height / 2) * 0.35
        }px)`;
        el.style.transition = "transform .1s";
      };
      const onLeave = (el: HTMLElement) => () => {
        el.style.transform = "translate(0,0)";
        el.style.transition = "transform .4s cubic-bezier(.2,.7,.2,1)";
      };
      els.forEach((el) => {
        const move = onMove(el);
        const leave = onLeave(el);
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });
    }

    function initCursor() {
      if (!window.matchMedia || !window.matchMedia("(pointer:fine)").matches) return;
      document.body.classList.add("gx-cn");
      cleanups.push(() => document.body.classList.remove("gx-cn"));
      const dot = document.getElementById("cursor-dot");
      const ring = document.getElementById("cursor-ring");
      if (!dot || !ring) return;
      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;
      let rx = mx;
      let ry = my;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      };
      window.addEventListener("mousemove", onMove);
      cleanups.push(() => window.removeEventListener("mousemove", onMove));
      let raf = 0;
      const loop = () => {
        rx += (mx - rx) * 0.2;
        ry += (my - ry) * 0.2;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        raf = requestAnimationFrame(loop);
      };
      loop();
      cleanups.push(() => cancelAnimationFrame(raf));

      const hoverables = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor],a,button"));
      hoverables.forEach((h) => {
        const onDark = !!h.closest("#work, #contact");
        const enter = () => {
          ring.style.width = "52px";
          ring.style.height = "52px";
          if (onDark) {
            ring.style.borderColor = "var(--paper)";
            ring.style.background = "rgba(244,243,238,.1)";
            ring.style.color = "var(--paper)";
          } else {
            ring.style.borderColor = "var(--accent)";
            ring.style.background = "color-mix(in srgb,var(--accent) 12%,transparent)";
            ring.style.color = "var(--accent)";
          }
        };
        const leave = () => {
          ring.style.width = "36px";
          ring.style.height = "36px";
          ring.style.background = "transparent";
          ring.style.color = "transparent";
          ring.style.borderColor = h.closest("#work, #contact") ? "var(--paper)" : "var(--ink)";
        };
        h.addEventListener("mouseenter", enter);
        h.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          h.removeEventListener("mouseenter", enter);
          h.removeEventListener("mouseleave", leave);
        });
      });
    }

    return () => {
      timers.forEach((id) => clearTimeout(id));
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <div
        id="prog"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 2,
          width: "0%",
          zIndex: 80,
          background: "var(--accent)",
        }}
      />
      <div
        id="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
        }}
      />
      <div
        id="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid var(--ink)",
          zIndex: 9998,
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          color: "var(--ink)",
          transition: "width .25s,height .25s,background .25s,color .25s,border-color .25s",
        }}
      />
    </>
  );
}
