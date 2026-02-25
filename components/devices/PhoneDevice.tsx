"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Exact 3D iPhone from RentBot's IPhone3DDemo — converted to inline styles
// deviceScale: the CSS scale applied by ProjectShelf so we can normalise clientX coords
export default function PhoneDevice({ deviceScale = 1 }: { deviceScale?: number }) {
  void deviceScale; // used indirectly via getBoundingClientRect (which returns visual coords)
  const [callState, setCallState] = useState<"incoming" | "active" | "ended">("incoming");
  const [slideProgress, setSlideProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/demo-call.mp3");
    const audio = audioRef.current;
    const handleEnded = () => {
      setCallState("incoming");
      setSlideProgress(0);
      setCallDuration(0);
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioRef.current) audioRef.current.currentTime = 0;
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (callState === "active") {
      timerRef.current = setInterval(() => setCallDuration((p) => p + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  const handleAnswerCall = useCallback(() => {
    setCallState("active");
    setSlideProgress(1);
    setIsDragging(false);
    setCallDuration(0);
    audioRef.current?.play();
  }, []);

  const handleSlideMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !sliderTrackRef.current) return;
      const track = sliderTrackRef.current.getBoundingClientRect();
      const buttonWidth = 58;
      const maxSlide = track.width - buttonWidth - 8;
      const progress = Math.max(
        0,
        Math.min(1, (clientX - track.left - buttonWidth / 2) / maxSlide)
      );
      setSlideProgress(progress);
      if (progress >= 0.9) handleAnswerCall();
    },
    [isDragging, handleAnswerCall]
  );

  const handleSlideEnd = useCallback(() => {
    setIsDragging(false);
    if (slideProgress < 0.9) setSlideProgress(0);
  }, [slideProgress]);

  const handleEndCall = useCallback(() => {
    setCallState("incoming");
    setSlideProgress(0);
    setCallDuration(0);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Capture pointer at window level when sliding — works regardless of CSS scale or
  // parent element boundaries. getBoundingClientRect returns visual (post-scale) coords
  // and clientX is also in screen coords, so the progress math is correct as-is.
  useEffect(() => {
    if (!isDragging || callState !== "incoming") return;
    const onMove = (e: PointerEvent) => handleSlideMove(e.clientX);
    const onEnd = () => handleSlideEnd();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };
  }, [isDragging, callState, handleSlideMove, handleSlideEnd]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    // Pointer tracking is now done at window level (see useEffect above)
    <div style={{ width: 290, position: "relative" }}>
      {/* Perspective container — same as RentBot's group div */}
      <div style={{ perspective: "1200px" }}>
        {/* Rotating wrapper — tilted exactly like RentBot */}
        <div
          style={{
            transform:
              callState === "active"
                ? "rotateY(0deg) rotateX(0deg)"
                : "rotateY(-18deg) rotateX(2deg)",
            transformStyle: "preserve-3d",
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* iPhone body — w-[290px] h-[600px] from RentBot */}
          <div
            style={{
              position: "relative",
              width: 290,
              height: 600,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Main frame — exact shadows from RentBot */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 50,
                background: "#1c1c1e",
                border: "3px solid #0a0a0c",
                boxShadow: [
                  "inset 0 0 0 1px rgba(255,255,255,0.05)",
                  "0 25px 50px rgba(0,0,0,0.45)",
                  "0 10px 20px rgba(0,0,0,0.25)",
                  "-18px 18px 40px rgba(0,0,0,0.2)",
                ].join(", "),
              }}
            >
              {/* Screen area — inset-[6px] rounded-[44px] from RentBot */}
              <div
                style={{
                  position: "absolute",
                  inset: 6,
                  borderRadius: 44,
                  overflow: "hidden",
                  background: "#000",
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {/* Dynamic Island — exact from RentBot */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 95,
                    height: 30,
                    background: "#000",
                    borderRadius: 9999,
                    zIndex: 30,
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#1a1a1c",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 1,
                        borderRadius: "50%",
                        background: "#0a0a0c",
                      }}
                    />
                  </div>
                </div>

                {callState === "incoming" && (
                  <IncomingCallScreen
                    slideProgress={slideProgress}
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                    sliderTrackRef={sliderTrackRef as React.RefObject<HTMLDivElement>}
                  />
                )}
                {callState === "active" && (
                  <ActiveCallScreen
                    callDuration={callDuration}
                    formatTime={formatTime}
                    onEndCall={handleEndCall}
                  />
                )}
                {callState === "ended" && (
                  <EndedCallScreen
                    onReplay={() => {
                      setCallState("incoming");
                      setSlideProgress(0);
                      setCallDuration(0);
                      if (audioRef.current) audioRef.current.currentTime = 0;
                    }}
                    callDuration={callDuration}
                    formatTime={formatTime}
                  />
                )}
              </div>
            </div>

            {/* Power button (right) */}
            <div
              style={{
                position: "absolute",
                top: 140,
                right: -2,
                width: 3,
                height: 65,
                borderRadius: "0 2px 2px 0",
                background: "linear-gradient(to right, #3d3d3f, #2d2d2f)",
              }}
            />
            {/* Volume up (left) */}
            <div
              style={{
                position: "absolute",
                top: 100,
                left: -2,
                width: 3,
                height: 38,
                borderRadius: "2px 0 0 2px",
                background: "linear-gradient(to left, #3d3d3f, #2d2d2f)",
              }}
            />
            {/* Volume down (left) */}
            <div
              style={{
                position: "absolute",
                top: 148,
                left: -2,
                width: 3,
                height: 38,
                borderRadius: "2px 0 0 2px",
                background: "linear-gradient(to left, #3d3d3f, #2d2d2f)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen components (inline-styled from RentBot originals) ───────────────

function IncomingCallScreen({
  slideProgress,
  isDragging,
  setIsDragging,
  sliderTrackRef,
}: {
  slideProgress: number;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  sliderTrackRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #8e8e93 0%, #6e6e73 50%, #5e5e63 100%)",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 24px 0",
          color: "white",
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        <span>9:41</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="14" height="10" viewBox="0 0 18 12" fill="white">
            <rect x="0" y="8" width="3" height="4" rx="0.5" />
            <rect x="5" y="5" width="3" height="7" rx="0.5" />
            <rect x="10" y="2" width="3" height="10" rx="0.5" />
            <rect x="15" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="14" height="10" viewBox="0 0 16 12" fill="white">
            <path d="M8 10a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
            <path d="M4.93 7.46a4.25 4.25 0 016.14 0l.93-.93a5.5 5.5 0 00-8 0l.93.93z" />
            <path d="M2.1 4.64a8 8 0 0111.8 0l.93-.94a9.25 9.25 0 00-13.66 0l.93.94z" />
          </svg>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 20,
                height: 9,
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.5)",
                padding: 1,
              }}
            >
              <div style={{ width: "100%", height: "100%", background: "white", borderRadius: 1 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Info icon */}
      <div style={{ position: "absolute", top: 44, right: 20 }}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, fontStyle: "italic" }}>i</span>
        </div>
      </div>

      {/* Caller info */}
      <div style={{ paddingTop: 64, textAlign: "center" }}>
        <h2
          style={{ color: "#fff", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}
        >
          RentBot
        </h2>
      </div>

      <div style={{ flex: 1 }} />

      {/* Action buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: 80, marginBottom: 24 }}>
        {[
          {
            label: "Remind Me",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            ),
          },
          {
            label: "Message",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            ),
          },
        ].map((btn) => (
          <div
            key={btn.label}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {btn.icon}
            </div>
            <span style={{ color: "white", fontSize: 10 }}>{btn.label}</span>
          </div>
        ))}
      </div>

      {/* Slide to answer */}
      <div style={{ padding: "0 20px 40px" }}>
        <div
          ref={sliderTrackRef}
          style={{
            position: "relative",
            height: 58,
            borderRadius: 9999,
            background: "rgba(120,120,128,0.32)",
          }}
        >
          {/* Shimmer text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative" }}>
              <span style={{ fontSize: 16, color: "rgba(80,80,90,0.7)", display: "block" }}>
                slide to answer
              </span>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  fontSize: 16,
                  whiteSpace: "nowrap",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "textShimmer 3.5s ease-in-out infinite",
                }}
              >
                slide to answer
              </span>
            </div>
          </div>

          {/* Green thumb */}
          <div
            style={{
              position: "absolute",
              top: 4,
              left: 4,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "grab",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              userSelect: "none",
              transform: `translateX(${
                slideProgress *
                (sliderTrackRef.current?.offsetWidth
                  ? sliderTrackRef.current.offsetWidth - 58
                  : 180)
              }px)`,
              transition: isDragging ? "none" : "all 0.3s ease-out",
            }}
            data-no-drag
            onPointerDown={(e) => {
              // Stop event reaching Framer's drag layer, then start slide tracking
              e.stopPropagation();
              setIsDragging(true);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#34c759">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveCallScreen({
  callDuration,
  formatTime,
  onEndCall,
}: {
  callDuration: number;
  formatTime: (s: number) => string;
  onEndCall: () => void;
}) {
  const controlButtons = [
    { label: "Mute", icon: <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /> },
    { label: "Keypad", icon: <path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /> },
    { label: "Speaker", icon: <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /> },
    { label: "Add", icon: <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /> },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #8e8e93 0%, #6e6e73 50%, #5e5e63 100%)",
      }}
    >
      <div style={{ padding: "14px 24px 0", color: "white", fontSize: 13, fontWeight: 500, pointerEvents: "none" }}>
        <span>9:41</span>
      </div>
      <div style={{ paddingTop: 48, textAlign: "center", pointerEvents: "none" }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, marginBottom: 4 }}>
          {formatTime(callDuration)}
        </p>
        <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
          RentBot
        </h2>
      </div>
      <div style={{ flex: 1, pointerEvents: "none" }} />
      <div style={{ padding: "0 24px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16, pointerEvents: "none" }}>
          {controlButtons.slice(0, 3).map((btn) => (
            <div key={btn.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">{btn.icon}</svg>
              </div>
              <span style={{ color: "white", fontSize: 10 }}>{btn.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {/* Add (no-op) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, pointerEvents: "none" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">{controlButtons[3].icon}</svg>
            </div>
            <span style={{ color: "white", fontSize: 10 }}>Add</span>
          </div>
          {/* End call */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <button
              type="button"
              style={{ width: 56, height: 56, borderRadius: "50%", background: "#ff3b30", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(255,59,48,0.5)" }}
              data-no-drag
              onMouseDown={(e) => { e.stopPropagation(); onEndCall(); }}
              onClick={(e) => { e.stopPropagation(); onEndCall(); }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ transform: "rotate(135deg)", pointerEvents: "none" }}>
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
            </button>
            <span style={{ color: "white", fontSize: 10 }}>End</span>
          </div>
          {/* FaceTime (no-op) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, pointerEvents: "none" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
            </div>
            <span style={{ color: "white", fontSize: 10 }}>FaceTime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EndedCallScreen({
  onReplay,
  callDuration,
  formatTime,
}: {
  onReplay: () => void;
  callDuration: number;
  formatTime: (s: number) => string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #8e8e93 0%, #6e6e73 50%, #5e5e63 100%)",
      }}
    >
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 style={{ color: "white", fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Call Ended</h3>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 24 }}>Duration: {formatTime(callDuration)}</p>
      <button
        onClick={onReplay}
        style={{ padding: "10px 24px", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 9999, color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
      >
        Replay Demo
      </button>
    </div>
  );
}
