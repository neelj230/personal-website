"use client";

import { useState, useEffect } from "react";

interface LocalClockProps {
  visible: boolean;
}


function getTimeParts() {
  const now = new Date();

  // Date: M/D/YY
  const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${String(now.getFullYear()).slice(2)}`;

  // HH : MM : SS  AM/PM
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = String(h % 12 || 12).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");

  return { hh, mm, ss, ampm, dateStr };
}

export default function LocalClock({ visible }: LocalClockProps) {
  const [parts, setParts] = useState<ReturnType<typeof getTimeParts> | null>(null);

  useEffect(() => {
    setParts(getTimeParts());
    const id = setInterval(() => setParts(getTimeParts()), 1_000);
    return () => clearInterval(id);
  }, []);

  const mono: React.CSSProperties = {
    fontFamily:
      "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
  };

  return (
    <div
      className="local-clock"
      style={{
        position: "fixed",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 4,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {parts && (
        <>
          {/* Date row */}
          <span
            style={{
              ...mono,
              fontSize: 9,
              letterSpacing: "0.13em",
              color: "rgba(240,237,232,0.30)",
            }}
          >
            {parts.dateStr}
          </span>

          {/* Time — HH : MM : SS  AMPM */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
            <span
              style={{
                ...mono,
                fontSize: 20,
                letterSpacing: "0.04em",
                color: "rgba(240,237,232,0.65)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {parts.hh}
            </span>
            <span
              style={{
                ...mono,
                fontSize: 14,
                color: "rgba(240,237,232,0.22)",
                margin: "0 1px",
                position: "relative",
                top: -1,
              }}
            >
              :
            </span>
            <span
              style={{
                ...mono,
                fontSize: 20,
                letterSpacing: "0.04em",
                color: "rgba(240,237,232,0.65)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {parts.mm}
            </span>
            <span
              style={{
                ...mono,
                fontSize: 14,
                color: "rgba(240,237,232,0.22)",
                margin: "0 1px",
                position: "relative",
                top: -1,
              }}
            >
              :
            </span>
            <span
              style={{
                ...mono,
                fontSize: 20,
                letterSpacing: "0.04em",
                color: "rgba(240,237,232,0.50)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {parts.ss}
            </span>
            <span
              style={{
                ...mono,
                fontSize: 9,
                letterSpacing: "0.10em",
                color: "rgba(240,237,232,0.28)",
                marginLeft: 4,
                position: "relative",
                top: -2,
              }}
            >
              {parts.ampm}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
