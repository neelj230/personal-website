"use client";

// Apple TV setup — matching Apple's official marketing image
// TV panel: 420×236 (16:9), ambient glow + Apple TV box + Siri Remote below
// Total: 420×278
export default function TVDevice() {
  return (
    <div style={{ position: "relative", width: 420, height: 278 }}>
      {/* ═══════════════ TV PANEL ═══════════════ */}
      <div
        style={{
          position: "relative",
          width: 420,
          height: 236,
          // Near-black premium aluminum — ultra-thin bezel TV
          background:
            "linear-gradient(180deg, #1c1c1e 0%, #121214 55%, #0e0e10 100%)",
          borderRadius: "8px 8px 4px 4px",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: [
            "0 0 0 1px rgba(0,0,0,0.7)",
            "0 36px 90px rgba(0,0,0,0.92)",
            "0 14px 35px rgba(0,0,0,0.65)",
            "inset 0 1px 0 rgba(255,255,255,0.09)",
          ].join(", "),
        }}
      >
        {/* Screen — ultra-thin bezels (3px sides, 6px chin) */}
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 3,
            right: 3,
            bottom: 6,
            background: "#000",
            borderRadius: "6px 6px 2px 2px",
            overflow: "hidden",
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,0.9), inset 0 2px 10px rgba(0,0,0,0.75)",
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <iframe
            src="https://www.youtube.com/embed/7h_hiBWmjGg?rel=0&modestbranding=1"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="PDX Concierge on GMA"
          />
          {/* Glass sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(148deg, rgba(255,255,255,0.045) 0%, transparent 38%)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        </div>

        {/* Top edge chamfer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            borderRadius: "8px 8px 0 0",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.13) 18%, rgba(255,255,255,0.13) 82%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Left edge sheen */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 0,
            width: 1,
            bottom: 2,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ═══════════════ SUBTLE SURFACE REFLECTION ═══════════════ */}
      {/* Soft white glow beneath the TV panel — like light reflecting off a surface */}
      <div
        style={{
          position: "absolute",
          top: 232,
          left: 60,
          right: 60,
          height: 10,
          background: "rgba(255,255,255,0.06)",
          filter: "blur(6px)",
          borderRadius: "50%",
        }}
      />

      {/* ═══════════════ APPLE TV BOX ═══════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: 9,
          left: "50%",
          transform: "translateX(-50%)",
          width: 46,
          height: 11,
          background: "linear-gradient(180deg, #2e2e32 0%, #1a1a1e 100%)",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: [
            "0 4px 14px rgba(0,0,0,0.75)",
            "inset 0 1px 0 rgba(255,255,255,0.07)",
          ].join(", "),
        }}
      >
        {/* LED indicator */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
      </div>

      {/* ═══════════════ SIRI REMOTE ═══════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: 5,
          left: "calc(50% + 34px)",
          width: 12,
          height: 36,
          background:
            "linear-gradient(180deg, #c4c4cc 0%, #adadb5 40%, #9a9aa2 100%)",
          borderRadius: "5px 5px 4px 4px",
          border: "1px solid rgba(0,0,0,0.20)",
          boxShadow: [
            "0 3px 10px rgba(0,0,0,0.55)",
            "inset 0 1px 0 rgba(255,255,255,0.28)",
            "inset -1px 0 0 rgba(0,0,0,0.10)",
          ].join(", "),
        }}
      >
        {/* Clickpad ring at top */}
        <div
          style={{
            position: "absolute",
            top: 5,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.18)",
            background: "rgba(0,0,0,0.10)",
          }}
        />
        {/* Back button */}
        <div
          style={{
            position: "absolute",
            top: 17,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 3,
            borderRadius: 1,
            background: "rgba(0,0,0,0.15)",
          }}
        />
        {/* Menu + mic buttons */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            display: "flex",
            gap: 2,
          }}
        >
          {[0, 0].map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 1,
                background: "rgba(0,0,0,0.14)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
