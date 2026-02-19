"use client";

import InVideoHero from "@/components/devices/InVideoHero";

// MacBook Pro 14" Space Gray — CSS replica matching reference image
// Total: 460 × 447  (lid 270 + hinge 5 + base 172, scaleY(0.72) → visual ≈ 399px)

// ─── Main component ───────────────────────────────────────────────────────────
export default function LaptopDevice() {
  return (
    <div style={{ width: 460 }}>

      {/* ══ LID ══ */}
      <div
        style={{
          position: "relative",
          width: 460,
          height: 270,
          // Space Gray aluminum — warm medium gray, lighter at top
          background:
            "linear-gradient(175deg, #8e8e92 0%, #848488 30%, #7c7c80 65%, #747478 100%)",
          borderRadius: "14px 14px 2px 2px",
          border: "1px solid rgba(0,0,0,0.26)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.50)",
            "inset 1px 0 0 rgba(255,255,255,0.18)",
            "inset -1px 0 0 rgba(0,0,0,0.14)",
            "0 2px 0 rgba(0,0,0,0.30)",
            "0 22px 64px rgba(0,0,0,0.65)",
            "0 8px 22px rgba(0,0,0,0.42)",
          ].join(", "),
        }}
      >
        {/* Thin inner dark border (bezel frame) */}
        <div
          style={{
            position: "absolute",
            top: 4, left: 4, right: 4, bottom: 0,
            background: "#18181c",
            borderRadius: "10px 10px 1px 1px",
            overflow: "hidden",
          }}
        >
          {/* Screen glass */}
          <div
            style={{
              position: "absolute",
              top: 2, left: 2, right: 2, bottom: 0,
              background: "#050508",
              borderRadius: "8px 8px 0 0",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => window.open("https://invideochat.vercel.app", "_blank")}
          >
            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: 0, left: "50%",
                transform: "translateX(-50%)",
                width: 50, height: 22,
                background: "#18181c",
                borderRadius: "0 0 12px 12px",
                zIndex: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 7,
              }}
            >
              <div
                style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: "#0e0e12",
                  border: "0.5px solid rgba(255,255,255,0.04)",
                }}
              />
            </div>

            {/* InVideoHero — fills the screen as "wallpaper" */}
            <InVideoHero />

            {/* Screen glare */}
            <div
              style={{
                position: "absolute", inset: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 38%)",
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
          </div>
        </div>

        {/* Top edge chamfer */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            borderRadius: "14px 14px 0 0",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.58) 28%, rgba(255,255,255,0.58) 72%, rgba(255,255,255,0.15) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Bottom chamfer */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 10, right: 10, height: 2,
            borderRadius: 1, background: "rgba(0,0,0,0.36)",
          }}
        />
      </div>

      {/* ══ HINGE ══ */}
      <div
        style={{
          width: 460, height: 5,
          background:
            "linear-gradient(90deg, #1e1e22 0%, #3a3a3e 12%, #4c4c52 50%, #3a3a3e 88%, #1e1e22 100%)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.10)",
            "inset 0 -1px 0 rgba(0,0,0,0.65)",
            "0 3px 8px rgba(0,0,0,0.65)",
          ].join(", "),
        }}
      />

      {/* ══ BASE — perspective wrapper makes keyboard lie flat toward viewer (L-shape) ══
           rotateX(+28deg): top edge (hinge) stays put, bottom comes TOWARD viewer.
           perspectiveOrigin at the hinge top so rotation feels anchored there.     */}
      {/* perspectiveOrigin at hinge = rotation anchored at hinge.
          overflow:visible on wrapper so 3D bottom edge isn't clipped. */}
      {/* scaleY compresses height to simulate a tilted-flat keyboard (L-shape)
          WITHOUT perspective — width stays exactly 460px so sides never clip.
          scaleY(0.72) ≈ cos(44°): visible tilt while keeping proportions. */}
      <div
        style={{
          position: "relative",
          width: 460, height: 172,
          background:
            "linear-gradient(178deg, #828286 0%, #7a7a7e 35%, #727276 65%, #6a6a6e 100%)",
          borderRadius: "0 0 12px 12px",
          border: "1px solid rgba(0,0,0,0.26)",
          borderTop: "none",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.08)",
            "inset 1px 0 0 rgba(255,255,255,0.10)",
            "inset -1px 0 0 rgba(0,0,0,0.10)",
            "0 30px 70px rgba(0,0,0,0.85)",
            "0 12px 28px rgba(0,0,0,0.60)",
            "0 3px 0 rgba(0,0,0,0.40)",
          ].join(", "),
          overflow: "hidden",
          transform: "scaleY(0.72)",
          transformOrigin: "top center",
        }}
      >
        <SpeakerGrille side="left" />
        <SpeakerGrille side="right" />

        {/* ── Keyboard cavity ── */}
        <div
          style={{
            position: "absolute",
            top: 5, left: 12, right: 12, bottom: 36,
            background:
              "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(200,150,80,0.12) 0%, #0c0c12 50%, #090910 100%)",
            borderRadius: "5px 5px 3px 3px",
            boxShadow: [
              "inset 0 8px 20px rgba(0,0,0,1)",
              "inset 0 3px 8px rgba(0,0,0,0.95)",
              "inset 10px 0 16px rgba(0,0,0,0.85)",
              "inset -10px 0 16px rgba(0,0,0,0.85)",
              "inset 0 -4px 10px rgba(0,0,0,0.75)",
            ].join(", "),
          }}
        >
          {/* Touch ID */}
          <div
            style={{
              position: "absolute",
              top: 3, right: 3,
              width: 14, height: 8,
              borderRadius: 2,
              background: "linear-gradient(180deg, #3a3a42 0%, #2a2a32 100%)",
              border: "1px solid rgba(0,0,0,0.80)",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,0.07)",
                "0 2px 0 rgba(0,0,0,0.95)",
                "0 4px 7px rgba(0,0,0,0.88)",
              ].join(", "),
            }}
          />
          <FnRow height={8} />
          <KeyRow top={16}  left={0}  right={0}  count={13} height={18} />
          <KeyRow top={39}  left={5}  right={5}  count={13} height={18} />
          <KeyRow top={62}  left={10} right={10} count={12} height={18} />
          <KeyRow top={85}  left={16} right={16} count={11} height={18} />
          <SpaceRow top={108} height={18} />
        </div>

        {/* Trackpad */}
        <div
          style={{
            position: "absolute",
            bottom: 7, left: "50%",
            transform: "translateX(-50%)",
            width: 200, height: 26,
            background:
              "linear-gradient(180deg, #525258 0%, #464650 50%, #404048 100%)",
            borderRadius: 7,
            border: "1px solid rgba(0,0,0,0.55)",
            boxShadow: [
              "inset 0 1.5px 0 rgba(255,255,255,0.07)",
              "inset 0 3px 10px rgba(0,0,0,0.70)",
              "0 1px 0 rgba(255,255,255,0.05)",
            ].join(", "),
          }}
        />

        {/* Bottom edge */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
            borderRadius: "0 0 12px 12px",
            background: "rgba(0,0,0,0.38)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Keyboard sub-components ──────────────────────────────────────────────────
//
// 3D key effect:
//   • Key cap surface is lighter gray — clearly visible against dark cavity floor
//   • "0 5px 0 rgba(0,0,0,1)" = solid black front-face wall below each key
//   • "0 8px 10px ..." = ambient drop shadow below the wall
//   • Combined: looks like a physical key sticking up out of a dark recessed bed

function FnRow({ height = 6 }: { height?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 3, left: 0, right: 18,
        height,
        display: "flex",
        gap: 1.5,
      }}
    >
      <div style={{ ...fnKeyStyle, width: 16, flexShrink: 0 }} />
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{ ...fnKeyStyle, flex: 1 }} />
      ))}
    </div>
  );
}

const fnKeyStyle: React.CSSProperties = {
  height: "100%",
  borderRadius: "2px 2px 1px 1px",
  background: "linear-gradient(180deg, #303038 0%, #242430 100%)",
  border: "0.5px solid rgba(255,255,255,0.04)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.08)",
    "0 2px 0 rgba(0,0,0,0.95)",
    "0 3px 5px rgba(0,0,0,0.85)",
  ].join(", "),
};

function KeyRow({ top, left, right, count, height = 10 }: {
  top: number; left: number; right: number; count: number; height?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top, left, right,
        height,
        display: "flex",
        gap: 2,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={keyCapStyle} />
      ))}
    </div>
  );
}

const keyCapStyle: React.CSSProperties = {
  flex: 1,
  height: "100%",
  borderRadius: "3px 3px 2px 2px",
  background: "linear-gradient(170deg, #323238 0%, #27272e 50%, #22222a 100%)",
  border: "0.5px solid rgba(255,255,255,0.05)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.10)",
    "0 3px 0 rgba(0,0,0,0.96)",
    "0 5px 7px rgba(0,0,0,0.88)",
    // Real MacBook backlight: very faint warm-white glow from cavity floor
    "0 0 8px rgba(220,180,120,0.14)",
  ].join(", "),
};

function SpaceRow({ top, height = 10 }: { top: number; height?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top, left: 14, right: 14,
        height,
        display: "flex",
        gap: 2,
      }}
    >
      {[15, 13, 13, 15].map((w, i) => <ModKey key={i} width={w} />)}

      {/* Space bar */}
      <div
        style={{
          flex: 1,
          height: "100%",
          borderRadius: "3px 3px 2px 2px",
          background: "linear-gradient(170deg, #323238 0%, #27272e 50%, #22222a 100%)",
          border: "0.5px solid rgba(255,255,255,0.05)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.10)",
            "0 3px 0 rgba(0,0,0,0.96)",
            "0 5px 7px rgba(0,0,0,0.88)",
          ].join(", "),
        }}
      />

      {[15, 13].map((w, i) => <ModKey key={i} width={w} />)}

      {/* Arrow cluster */}
      <div
        style={{
          width: 28, height: "100%", flexShrink: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 2,
        }}
      >
        <div />
        <div style={arrowKeyStyle} />
        <div />
        {[0, 1, 2].map((i) => <div key={i} style={arrowKeyStyle} />)}
      </div>
    </div>
  );
}

const arrowKeyStyle: React.CSSProperties = {
  borderRadius: "2px 2px 1px 1px",
  background: "linear-gradient(170deg, #323238 0%, #22222a 100%)",
  border: "0.5px solid rgba(255,255,255,0.05)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.09)",
    "0 2.5px 0 rgba(0,0,0,0.95)",
    "0 4px 6px rgba(0,0,0,0.85)",
  ].join(", "),
};

function ModKey({ width }: { width: number }) {
  return (
    <div
      style={{
        width,
        height: "100%",
        flexShrink: 0,
        borderRadius: "3px 3px 2px 2px",
        background: "linear-gradient(170deg, #323238 0%, #27272e 50%, #22222a 100%)",
        border: "0.5px solid rgba(255,255,255,0.05)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.10)",
          "0 3px 0 rgba(0,0,0,0.96)",
          "0 5px 7px rgba(0,0,0,0.88)",
        ].join(", "),
      }}
    />
  );
}

function SpeakerGrille({ side }: { side: "left" | "right" }) {
  const COLS = 4, ROWS = 3, DOT = 3, GAP = 3;
  return (
    <div
      style={{
        position: "absolute",
        top: 9,
        [side === "left" ? "left" : "right"]: 4,
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${DOT}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${DOT}px)`,
        gap: GAP,
        opacity: 0.55,
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: DOT, height: DOT, borderRadius: "50%",
            background: "rgba(0,0,0,0.70)",
            boxShadow:
              "inset 0 0.5px 0 rgba(0,0,0,0.90), 0 0.5px 0 rgba(255,255,255,0.10)",
          }}
        />
      ))}
    </div>
  );
}
