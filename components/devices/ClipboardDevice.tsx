"use client";

export default function ClipboardDevice() {
  return (
    <div style={{ width: 260, height: 360 }}>
      {/* Board */}
      <div
        style={{
          width: 260,
          height: 340,
          background: "#7a5c2e",
          borderRadius: 6,
          position: "relative",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
          overflow: "visible",
        }}
      >
        {/* Wood grain texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 6,
            background:
              "repeating-linear-gradient(92deg, transparent 0px, transparent 18px, rgba(0,0,0,0.06) 18px, rgba(0,0,0,0.06) 19px)",
            pointerEvents: "none",
          }}
        />

        {/* Clip assembly */}
        {/* Spring arc above the plate */}
        <div
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 70,
            height: 20,
            border: "5px solid #888",
            borderBottom: "none",
            borderRadius: "14px 14px 0 0",
          }}
        />

        {/* Base plate */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 26,
            background: "linear-gradient(180deg, #b0b0b0 0%, #808080 100%)",
            borderRadius: 4,
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        />

        {/* Paper hold-down bar */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: "50%",
            transform: "translateX(-50%)",
            width: 86,
            height: 6,
            background: "#999",
            borderRadius: "0 0 3px 3px",
            zIndex: 3,
          }}
        />

        {/* Hole in board */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#5a3e18",
            zIndex: 4,
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
          }}
        />

        {/* Paper area */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 16,
            right: 16,
            bottom: 12,
            background: "#faf7f0",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/penn-faces-flyer.png"
            alt="Penn Faces flyer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
            onError={(e) => {
              // Show placeholder if image not yet present
              (e.target as HTMLImageElement).style.display = "none";
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent && !parent.querySelector(".flyer-placeholder")) {
                const placeholder = document.createElement("div");
                placeholder.className = "flyer-placeholder";
                placeholder.style.cssText =
                  "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px;";
                placeholder.innerHTML = `
                  <div style="font-size:28px">🎓</div>
                  <div style="font-family:ui-monospace,monospace;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:#7a5c2e;text-align:center">Penn Faces</div>
                  <div style="font-size:9px;color:#aaa;font-family:ui-monospace,monospace;text-align:center">add penn-faces-flyer.jpg to public/</div>
                `;
                parent.appendChild(placeholder);
              }
            }}
          />
        </div>
      </div>

      {/* Bottom lip */}
      <div
        style={{
          width: 260,
          height: 20,
          background: "#6b4e25",
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}
