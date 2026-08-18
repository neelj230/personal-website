"use client";

// Laugh & Learn Childcare — live embed of the deployed, sold site
// (laughandlearnchildcare.com) inside Mac-style browser chrome.
// Native size matches PennReachDevice (640 × 460) so the two browser
// mockups render at an identical box size in the shelf grid.

const LINE = "rgba(0,0,0,0.12)";
const mono = "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace";

const CHROME_H = 41;
const NATIVE_W = 640;
const NATIVE_H = 460;

export default function LaughAndLearnDevice() {
  return (
    <div
      style={{
        width: NATIVE_W,
        height: NATIVE_H,
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.28)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.65)",
          "0 22px 64px rgba(0,0,0,0.65)",
          "0 8px 22px rgba(0,0,0,0.42)",
        ].join(", "),
        userSelect: "none",
      }}
    >
      {/* ── Window chrome ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: CHROME_H,
          padding: "0 14px",
          borderBottom: `1px solid ${LINE}`,
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span
              key={c}
              style={{ width: 10, height: 10, borderRadius: "50%", background: c }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 22,
            borderRadius: 6,
            background: "#F3F3F1",
            color: "#8A8580",
            fontFamily: mono,
            fontSize: 10.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <rect x="2" y="4.5" width="6" height="4.5" rx="1" stroke="#8A8580" strokeWidth="1" />
            <path d="M3.2 4.5V3a1.8 1.8 0 0 1 3.6 0v1.5" stroke="#8A8580" strokeWidth="1" fill="none" />
          </svg>
          laughandlearnchildcare.com
        </div>
        <div style={{ width: 42 }} />
      </div>

      {/* ── Live site ── */}
      <iframe
        src="https://laughandlearnchildcare.com/"
        title="Laugh & Learn Childcare — live site"
        style={{
          width: "100%",
          height: NATIVE_H - CHROME_H,
          border: "none",
          display: "block",
        }}
        loading="lazy"
      />
    </div>
  );
}
