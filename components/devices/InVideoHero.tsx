"use client";

import { useState, useEffect, CSSProperties } from "react";

// All 5 columns from HeroBanner3D — verbatim
const CURATED_VIDEOS = [
  // Column 1 — scrolls UP
  [
    { videoId: "WUvTyaaNkzM", title: "The Essence of Linear Algebra", channelName: "3Blue1Brown" },
    { videoId: "kCc8FmEb1nY", title: "Let's build GPT from scratch", channelName: "Andrej Karpathy" },
    { videoId: "h6fcK_fRYaI", title: "The Egg", channelName: "Kurzgesagt" },
    { videoId: "spUNpyF58BY", title: "The beauty of Bezier curves", channelName: "Freya Holmer" },
    { videoId: "sDv4f4s2SB8", title: "Gradient Descent, Step-by-Step", channelName: "StatQuest" },
    { videoId: "MFzDaBzBlL0", title: "The Backwards Brain Bicycle", channelName: "SmarterEveryDay" },
    { videoId: "AuA2EAgAegE", title: "e (Euler's Number)", channelName: "Numberphile" },
    { videoId: "17WoOqgXsRM", title: "Coding Challenge: Starfield", channelName: "The Coding Train" },
  ],
  // Column 2 — scrolls DOWN
  [
    { videoId: "MHS-htjGgSY", title: "Simulating Natural Selection", channelName: "Primer" },
    { videoId: "pEfrdAtAmqk", title: "God-Tier Developer Roadmap", channelName: "Fireship" },
    { videoId: "YuIIjLr6vUA", title: "How Electricity Actually Works", channelName: "Veritasium" },
    { videoId: "Cp5WWtMoeKg", title: "Coding Adventure: Ray Marching", channelName: "Sebastian Lague" },
    { videoId: "f5liqUk0ZTw", title: "What is a Tensor?", channelName: "Dan Fleisch" },
    { videoId: "p_o4aY7xkXg", title: "What is Gravity?", channelName: "MinutePhysics" },
    { videoId: "14zkfDTN_qo", title: "AI Learns Locomotion", channelName: "Two Minute Papers" },
    { videoId: "qhbuKbxJsk8", title: "Times Tables & Mandelbrot", channelName: "Mathologer" },
  ],
  // Column 3 — scrolls UP
  [
    { videoId: "T647CGsuOVU", title: "Imaginary Numbers Are Real", channelName: "Welch Labs" },
    { videoId: "ugvHCXCOmm4", title: "Dario Amodei: CEO of Anthropic", channelName: "Lex Fridman" },
    { videoId: "S9JGmA5_unY", title: "How Blurs & Filters Work", channelName: "Computerphile" },
    { videoId: "Kas0tIxDvrg", title: "The Longest-Standing Math Problem", channelName: "Veritasium" },
    { videoId: "7LKy3lrkTRA", title: "Why do calculators get this wrong?", channelName: "Stand-up Maths" },
    { videoId: "lXfEK8G8CUI", title: "The Immune System Explained", channelName: "Kurzgesagt" },
    { videoId: "5C_HPTJg5ek", title: "Rust in 100 Seconds", channelName: "Fireship" },
    { videoId: "R9OHn5ZF4Uo", title: "How Machines Learn", channelName: "CGP Grey" },
  ],
  // Column 4 — scrolls DOWN
  [
    { videoId: "OmJ-4B-mS-Y", title: "The Map of Mathematics", channelName: "Domain of Science" },
    { videoId: "OkmNXy7er84", title: "The Unreasonable Efficiency of JPEG", channelName: "Reducible" },
    { videoId: "ZK3O402wf1c", title: "MIT 18.06 Linear Algebra, Lecture 1", channelName: "MIT OpenCourseWare" },
    { videoId: "zjkBMFhNj_g", title: "Intro to Large Language Models", channelName: "Andrej Karpathy" },
    { videoId: "Af0_vWDfJwQ", title: "What is Dark Matter?", channelName: "MinutePhysics" },
    { videoId: "rSKMYc1CQHE", title: "Coding Adventure: Simulating Fluids", channelName: "Sebastian Lague" },
    { videoId: "AnaASTBn_K4", title: "How Does a Whip Break the Sound Barrier?", channelName: "SmarterEveryDay" },
    { videoId: "X3_LD3R_Ygs", title: "OpenAI DALL-E 2: Top 10 Results", channelName: "Two Minute Papers" },
  ],
  // Column 5 — scrolls UP
  [
    { videoId: "wjZofJX0v4M", title: "But what is a GPT? Visual intro", channelName: "3Blue1Brown" },
    { videoId: "s86-Z-CbaHA", title: "The Banach-Tarski Paradox", channelName: "Vsauce" },
    { videoId: "E1B4UoSQMFw", title: "Fractal Trees — L-Systems", channelName: "The Coding Train" },
    { videoId: "iJ8pnCO0nTY", title: "Euler's pentagonal formula", channelName: "Mathologer" },
    { videoId: "jGwO_UgTS7I", title: "Stanford CS229: Machine Learning", channelName: "Stanford Online" },
    { videoId: "BxV14h0kFs0", title: "This Video Has X Views", channelName: "Tom Scott" },
    { videoId: "XTeJ64KD5cg", title: "Graham's Number", channelName: "Numberphile" },
    { videoId: "PZRI1IfStY0", title: "Floating Point Numbers", channelName: "Computerphile" },
  ],
] as const;

// 5 columns × 76px wide + 4 × 8px gap = 412px — fits in 436px container (444px screen − 8px padding)
const CARD_W = 76;
const CARD_H = 68;
const COL_GAP = 8;

const DIRECTIONS: ("up" | "down")[] = ["up", "down", "up", "down", "up"];
// Slightly different speeds per column so they don't look synced
const SPEEDS = ["28s", "35s", "22s", "32s", "19s"];

type VideoEntry = { videoId: string; title: string; channelName: string };

function Card({ videoId, title, channelName }: VideoEntry) {
  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
        background: "#0d0d0d",
        // Glass-like card border: subtle bright edge on top, dark bottom
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: [
          "0 4px 12px rgba(0,0,0,0.75)",
          "0 1px 0 rgba(255,255,255,0.06)",
          // Inset top highlight for glass feel
          "inset 0 1px 0 rgba(255,255,255,0.08)",
        ].join(", "),
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt={title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Title gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.30) 45%, transparent 100%)",
        }}
      />
      {/* Glass sheen on card — top-left highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 45%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "absolute", bottom: 4, left: 5, right: 5 }}>
        <p
          style={{
            fontSize: 7,
            lineHeight: 1.3,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            margin: 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          } as CSSProperties}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: 6,
            color: "rgba(255,255,255,0.48)",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            margin: "1.5px 0 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {channelName}
        </p>
      </div>
    </div>
  );
}

function Column({
  videos,
  direction,
  speed,
}: {
  videos: readonly VideoEntry[];
  direction: "up" | "down";
  speed: string;
}) {
  const cards = [...videos, ...videos]; // duplicate for seamless infinite loop
  return (
    <div style={{ width: CARD_W, flexShrink: 0 }}>
      <div
        className={direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}
        style={
          {
            "--scroll-speed": speed,
            display: "flex",
            flexDirection: "column",
            gap: COL_GAP,
          } as CSSProperties
        }
      >
        {cards.map((v, i) => (
          <Card key={`${v.videoId}-${i}`} videoId={v.videoId} title={v.title} channelName={v.channelName} />
        ))}
      </div>
    </div>
  );
}

export default function InVideoHero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#050505" }}>
      {/* Reveal curtain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          background: "#000",
          opacity: revealed ? 0 : 1,
          pointerEvents: revealed ? "none" : "auto",
          transition: "opacity 0.6s ease 0.1s",
        }}
      />

      {/*
       * Dramatic 3D scrolling grid — matches InVideo landing page reference.
       * Tight perspective (300px) + steep rotateX (54deg) = strong "table surface
       * receding into the distance" effect. perspectiveOrigin at top center so
       * the grid tilts away from you toward the upper screen.
       */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "300px",
          perspectiveOrigin: "50% 5%",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 4,
            right: 4,
            top: 0,
            display: "flex",
            gap: COL_GAP,
            transform: "rotateX(54deg)",
            transformOrigin: "50% 0%",
            height: 2400,
          }}
        >
          {CURATED_VIDEOS.map((videos, i) => (
            <Column
              key={i}
              videos={videos}
              direction={DIRECTIONS[i]}
              speed={SPEEDS[i]}
            />
          ))}
        </div>
      </div>

      {/* Top fade — heavier, hides the extreme perspective vanishing point */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "32%",
          background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, #050505 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "14%",
          background: "linear-gradient(to right, #050505 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "14%",
          background: "linear-gradient(to left, #050505 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Center radial vignette — dark edges, content visible at center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background:
            "radial-gradient(ellipse 80% 70% at 50% 60%, transparent 0%, rgba(5,5,5,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Glass sheen — top-center highlight for depth/glassy feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          background:
            "radial-gradient(ellipse 60% 35% at 50% 15%, rgba(255,255,255,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
