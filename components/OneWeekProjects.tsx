"use client";

import LaughAndLearnDevice from "@/components/devices/LaughAndLearnDevice";

// Native size of LaughAndLearnDevice (see components/devices/LaughAndLearnDevice.tsx)
const NATIVE_W = 1200;
const NATIVE_H = 760;

interface OneWeekProjectsProps {
  variant?: "desktop" | "mobile";
}

export default function OneWeekProjects({ variant = "desktop" }: OneWeekProjectsProps) {
  const displayW = variant === "desktop" ? 560 : 270;
  const scale = displayW / NATIVE_W;
  const displayH = Math.round(NATIVE_H * scale);

  return (
    <div className={`one-week-projects one-week-projects--${variant}`}>
      <h2 className="one-week-heading">One Week Projects:</h2>

      <div className="one-week-mockup-wrap" style={{ width: displayW }}>
        <span className="one-week-tag">example site:</span>
        <div style={{ width: displayW, height: displayH, overflow: "hidden", borderRadius: 16 }}>
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: NATIVE_W,
              height: NATIVE_H,
            }}
          >
            <LaughAndLearnDevice />
          </div>
        </div>
      </div>

      <p className="device-caption one-week-caption">
        Bootstrapped website design agency to five figure revenue, redesigning
        interfaces for daycares, real estate, and accounting businesses.
      </p>
    </div>
  );
}
