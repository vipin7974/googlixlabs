"use client";

import { useEffect, useRef, useState } from "react";
import { hexA } from "@/lib/hex";
import { ACCENTS } from "@/lib/content";

// ── Virtual game space — all physics/spawn math happens in this fixed
// coordinate system, then scaled to whatever size the canvas is actually
// displayed at. Keeps difficulty tuning independent of screen size. ──
const VW = 800;
const VH = 320;
const GROUND_Y = 250;
const PLAYER_X = 108;
const PLAYER_R = 15;
const GRAVITY = 1700;
const JUMP_VELOCITY = -620;
const BASE_SPEED = 280;
const MAX_SPEED = 720;
const SPEED_RAMP = 16; // px/s gained per second survived

const INK = "#17181B";
const PAPER = "#F4F3EE";
const ACCENT = ACCENTS.Signal; // #2B5CFF
const BUG = ACCENTS.Molten; // #FF5B2E
const PACKET = ACCENTS.Botanic; // #1F9B57

type Obstacle = { x: number; w: number; h: number };
type Packet = { x: number; y: number; r: number; taken: boolean };
type FloatText = { x: number; y: number; life: number; text: string; color: string };
type Drifter = { x: number; y: number; s: number; kind: 0 | 1 };

type Phase = "ready" | "playing" | "over";

const HIGH_SCORE_KEY = "gx_signal_highscore";
const MUTED_KEY = "gx_signal_muted";

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function SignalRun() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const phaseRef = useRef<Phase>("ready");
  const elapsedRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);

  const playerYRef = useRef(GROUND_Y - PLAYER_R);
  const velRef = useRef(0);
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);

  const obstaclesRef = useRef<Obstacle[]>([]);
  const spawnTimerRef = useRef(1.1);
  const packetsRef = useRef<Packet[]>([]);
  const packetTimerRef = useRef(1.8);
  const floatTextsRef = useRef<FloatText[]>([]);
  const driftersRef = useRef<Drifter[]>(
    Array.from({ length: 5 }, () => ({
      x: Math.random() * VW,
      y: randRange(24, 130),
      s: randRange(18, 46),
      kind: Math.random() < 0.5 ? 0 : 1,
    }))
  );

  const mutedRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("ready");
  const [displayScore, setDisplayScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const [justBeat, setJustBeat] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
      if (saved) setHighScore(saved);
      const mutedSaved = localStorage.getItem(MUTED_KEY) === "1";
      mutedRef.current = mutedSaved;
      setMuted(mutedSaved);
    } catch {
      /* localStorage unavailable — ignore, defaults stand */
    }
  }, []);

  function beep(freq: number, duration = 0.09, type: OscillatorType = "sine", peak = 0.16) {
    if (mutedRef.current) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(peak, ctx.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch {
      /* WebAudio unsupported — game still works silently */
    }
  }

  function resetGame() {
    elapsedRef.current = 0;
    speedRef.current = BASE_SPEED;
    scoreRef.current = 0;
    comboRef.current = 0;
    playerYRef.current = GROUND_Y - PLAYER_R;
    velRef.current = 0;
    trailRef.current = [];
    obstaclesRef.current = [];
    packetsRef.current = [];
    floatTextsRef.current = [];
    spawnTimerRef.current = 1.15;
    packetTimerRef.current = 1.6;
    setDisplayScore(0);
    setJustBeat(false);
  }

  function startGame() {
    resetGame();
    phaseRef.current = "playing";
    lastTsRef.current = null;
    setPhase("playing");
    beep(660, 0.07, "square", 0.12);
  }

  function jump() {
    if (phaseRef.current !== "playing") return;
    const onGround = playerYRef.current >= GROUND_Y - PLAYER_R - 0.5;
    if (!onGround) return;
    velRef.current = JUMP_VELOCITY;
    beep(520, 0.08, "square", 0.11);
  }

  function endGame() {
    phaseRef.current = "over";
    setPhase("over");
    beep(140, 0.28, "sawtooth", 0.14);
    const final = Math.floor(scoreRef.current);
    setDisplayScore(final);
    setHighScore((prev) => {
      if (final > prev) {
        setJustBeat(true);
        try {
          localStorage.setItem(HIGH_SCORE_KEY, String(final));
        } catch {
          /* ignore */
        }
        return final;
      }
      return prev;
    });
  }

  function toggleMute() {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    try {
      localStorage.setItem(MUTED_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }

  async function shareScore() {
    const text = `I scored ${Math.floor(scoreRef.current)} on Signal Run — GooglixLabs' arcade break. Beat me: https://googlixlabs.com/play`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — silently skip */
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let scale = 1;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      scale = rect.width / VW;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    function spawnMin() {
      return Math.max(0.52, 1.0 - elapsedRef.current * 0.012);
    }

    function spawnObstacle() {
      const h = randRange(28, 52);
      const w = randRange(20, 32);
      obstaclesRef.current.push({ x: VW + w, w, h });
      if (elapsedRef.current > 9 && Math.random() < 0.22) {
        const w2 = randRange(20, 32);
        const h2 = randRange(28, 52);
        obstaclesRef.current.push({ x: VW + w + 34 + w2, w: w2, h: h2 });
      }
    }

    function spawnPacket() {
      const upcoming = obstaclesRef.current[obstaclesRef.current.length - 1];
      let x = VW + randRange(40, 90);
      let y = GROUND_Y - 90;
      if (upcoming && Math.random() < 0.45) {
        x = upcoming.x + upcoming.w / 2;
        y = GROUND_Y - upcoming.h - 55;
      }
      packetsRef.current.push({ x, y, r: 8, taken: false });
    }

    const update = (dt: number) => {
      elapsedRef.current += dt;
      speedRef.current = Math.min(MAX_SPEED, BASE_SPEED + elapsedRef.current * SPEED_RAMP);
      const speed = speedRef.current;

      velRef.current += GRAVITY * dt;
      playerYRef.current += velRef.current * dt;
      const restY = GROUND_Y - PLAYER_R;
      if (playerYRef.current > restY) {
        playerYRef.current = restY;
        velRef.current = 0;
      }

      trailRef.current.push({ x: PLAYER_X, y: playerYRef.current });
      if (trailRef.current.length > 10) trailRef.current.shift();

      spawnTimerRef.current -= dt;
      if (spawnTimerRef.current <= 0) {
        spawnObstacle();
        spawnTimerRef.current = randRange(spawnMin(), spawnMin() + 0.6);
      }
      packetTimerRef.current -= dt;
      if (packetTimerRef.current <= 0) {
        spawnPacket();
        packetTimerRef.current = randRange(1.6, 3.2);
      }

      const pr = PLAYER_R;
      const px = PLAYER_X;
      const py = playerYRef.current;

      for (const o of obstaclesRef.current) {
        o.x -= speed * dt;
        const oy = GROUND_Y - o.h;
        const cx = Math.max(o.x, Math.min(px, o.x + o.w));
        const cy = Math.max(oy, Math.min(py, GROUND_Y));
        const dx = px - cx;
        const dy = py - cy;
        if (dx * dx + dy * dy < pr * pr) {
          endGame();
          return;
        }
      }
      obstaclesRef.current = obstaclesRef.current.filter((o) => o.x + o.w > -5);

      for (const p of packetsRef.current) {
        if (p.taken) continue;
        p.x -= speed * dt;
        const dx = px - p.x;
        const dy = py - p.y;
        if (dx * dx + dy * dy < (pr + p.r) * (pr + p.r)) {
          p.taken = true;
          comboRef.current += 1;
          const bonus = 5 + comboRef.current * 2;
          scoreRef.current += bonus;
          floatTextsRef.current.push({ x: p.x, y: p.y - 10, life: 0.9, text: `+${bonus}`, color: PACKET });
          beep(440 + comboRef.current * 40, 0.09, "triangle", 0.13);
        } else if (p.x < -20) {
          comboRef.current = 0;
        }
      }
      packetsRef.current = packetsRef.current.filter((p) => p.x > -20 && !p.taken);

      for (const d of driftersRef.current) {
        d.x -= speed * dt * 0.28;
        if (d.x < -60) {
          d.x = VW + randRange(0, 120);
          d.y = randRange(24, 130);
        }
      }

      for (const f of floatTextsRef.current) {
        f.life -= dt;
        f.y -= 26 * dt;
      }
      floatTextsRef.current = floatTextsRef.current.filter((f) => f.life > 0);

      scoreRef.current += dt * 11 * (speed / BASE_SPEED);
      setDisplayScore(Math.floor(scoreRef.current));
    };

    const render = () => {
      ctx.clearRect(0, 0, VW, VH);
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, VW, VH);

      for (const d of driftersRef.current) {
        ctx.strokeStyle = hexA(d.kind === 0 ? ACCENT : PAPER, 0.16);
        ctx.lineWidth = 1.4;
        if (d.kind === 0) {
          ctx.strokeRect(d.x, d.y, d.s, d.s);
        } else {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.s / 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.strokeStyle = hexA(PAPER, 0.22);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + PLAYER_R + 2);
      ctx.lineTo(VW, GROUND_Y + PLAYER_R + 2);
      ctx.stroke();

      const tickSpacing = 34;
      const offset = (elapsedRef.current * speedRef.current) % tickSpacing;
      ctx.strokeStyle = hexA(PAPER, 0.14);
      ctx.lineWidth = 3;
      for (let x = VW + tickSpacing - offset; x > -tickSpacing; x -= tickSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, GROUND_Y + PLAYER_R + 2);
        ctx.lineTo(x - 16, GROUND_Y + PLAYER_R + 2);
        ctx.stroke();
      }

      for (const o of obstaclesRef.current) {
        const oy = GROUND_Y - o.h;
        ctx.fillStyle = hexA(BUG, 0.92);
        ctx.fillRect(o.x, oy, o.w, o.h);
        ctx.strokeStyle = hexA(INK, 0.35);
        ctx.lineWidth = 1;
        ctx.strokeRect(o.x, oy, o.w, o.h);
        ctx.fillStyle = hexA(PAPER, 0.9);
        ctx.font = `${Math.max(11, o.w * 0.5)}px var(--font-mono), monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("×", o.x + o.w / 2, oy + o.h / 2 + 1);
      }

      const pulse = 0.75 + Math.sin(elapsedRef.current * 6) * 0.25;
      for (const p of packetsRef.current) {
        if (p.taken) continue;
        ctx.beginPath();
        ctx.fillStyle = hexA(PACKET, 0.9);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = hexA(PACKET, 0.35 * pulse);
        ctx.lineWidth = 3;
        ctx.arc(p.x, p.y, p.r + 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const f of floatTextsRef.current) {
        ctx.globalAlpha = Math.max(0, Math.min(1, f.life / 0.9));
        ctx.fillStyle = f.color;
        ctx.font = "bold 15px var(--font-mono), monospace";
        ctx.textAlign = "center";
        ctx.fillText(f.text, f.x, f.y);
        ctx.globalAlpha = 1;
      }

      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        const a = (i / trail.length) * 0.28;
        ctx.beginPath();
        ctx.fillStyle = hexA(ACCENT, a);
        ctx.arc(t.x, t.y, PLAYER_R * (0.4 + (i / trail.length) * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.fillStyle = ACCENT;
      ctx.arc(PLAYER_X, playerYRef.current, PLAYER_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = hexA(PAPER, 0.5);
      ctx.lineWidth = 2;
      ctx.arc(PLAYER_X, playerYRef.current, PLAYER_R + 4, 0, Math.PI * 2);
      ctx.stroke();
    };

    const frame = (now: number) => {
      if (lastTsRef.current == null) lastTsRef.current = now;
      let dt = (now - lastTsRef.current) / 1000;
      lastTsRef.current = now;
      dt = Math.min(dt, 0.05);
      if (phaseRef.current === "playing") update(dt);
      render();
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.code !== "ArrowUp") return;
      e.preventDefault();
      if (phaseRef.current === "playing") jump();
      else startGame();
    };
    const onPointer = () => {
      if (phaseRef.current === "playing") jump();
      else startGame();
    };
    const onVisibility = () => {
      if (document.hidden) lastTsRef.current = null;
    };
    window.addEventListener("keydown", onKey);
    wrap.addEventListener("pointerdown", onPointer);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      wrap.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
      <div
        ref={wrapRef}
        data-cursor
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${VW} / ${VH}`,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--line)",
          cursor: "pointer",
          userSelect: "none",
          touchAction: "manipulation",
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

        {/* HUD */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 18,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13,
            letterSpacing: ".04em",
            color: "rgba(244,243,238,.85)",
            pointerEvents: "none",
          }}
        >
          SCORE {String(displayScore).padStart(6, "0")}
        </div>
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 54,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13,
            letterSpacing: ".04em",
            color: "rgba(244,243,238,.5)",
            pointerEvents: "none",
          }}
        >
          BEST {String(highScore).padStart(6, "0")}
        </div>

        <button
          type="button"
          data-cursor
          aria-label={muted ? "Unmute sound" : "Mute sound"}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(244,243,238,.08)",
            border: "1px solid rgba(244,243,238,.2)",
            borderRadius: "50%",
            color: "rgba(244,243,238,.75)",
            cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
            {!muted && (
              <path
                d="M17 8.5a5 5 0 0 1 0 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            )}
            {muted && (
              <path
                d="M18 9l4 6M22 9l-4 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        {phase !== "playing" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              textAlign: "center",
              padding: 24,
              background: "rgba(23,24,27,.55)",
              backdropFilter: "blur(2px)",
            }}
          >
            {phase === "ready" && (
              <>
                <span
                  style={{
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.4rem,3.5vw,2.1rem)",
                    color: "var(--paper)",
                    letterSpacing: "-.02em",
                  }}
                >
                  Signal Run
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: 14,
                    color: "rgba(244,243,238,.75)",
                    maxWidth: "34ch",
                  }}
                >
                  Dodge the bugs, catch the signal. Space / ↑ / tap to jump.
                </span>
                <span
                  style={{
                    marginTop: 6,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    color: "var(--ink)",
                    background: "var(--paper)",
                    borderRadius: 100,
                    padding: "10px 20px",
                  }}
                >
                  Press Space or tap to start
                </span>
              </>
            )}

            {phase === "over" && (
              <>
                <span
                  style={{
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.3rem,3.2vw,1.9rem)",
                    color: "var(--paper)",
                    letterSpacing: "-.02em",
                  }}
                >
                  {justBeat ? "New high score!" : "Signal lost"}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 15,
                    color: "rgba(244,243,238,.85)",
                  }}
                >
                  Score {displayScore} · Best {highScore}
                </span>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
                  <button
                    type="button"
                    data-cursor
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      startGame();
                    }}
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 12,
                      color: "var(--ink)",
                      background: "var(--paper)",
                      border: "none",
                      borderRadius: 100,
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                  >
                    Run again
                  </button>
                  <button
                    type="button"
                    data-cursor
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      shareScore();
                    }}
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 12,
                      color: "var(--paper)",
                      background: "transparent",
                      border: "1px solid rgba(244,243,238,.35)",
                      borderRadius: 100,
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                  >
                    {copied ? "Copied!" : "Copy score"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
