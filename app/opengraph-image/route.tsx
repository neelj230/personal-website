import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "serif",
        }}
      >
        {/* Globe icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 32 32"
          style={{ marginBottom: 32 }}
        >
          <defs>
            <radialGradient id="g" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#5cc8ff" />
              <stop offset="40%" stopColor="#1e7fd4" />
              <stop offset="100%" stopColor="#072b6e" />
            </radialGradient>
            <clipPath id="c">
              <circle cx="16" cy="16" r="15" />
            </clipPath>
          </defs>
          <circle cx="16" cy="16" r="15" fill="url(#g)" />
          <g
            clipPath="url(#c)"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.75"
          >
            <ellipse cx="16" cy="16" rx="15" ry="5.2" />
            <ellipse cx="16" cy="10" rx="12.5" ry="3.8" />
            <ellipse cx="16" cy="22" rx="12.5" ry="3.8" />
            <line x1="16" y1="1" x2="16" y2="31" />
          </g>
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.6"
          />
        </svg>

        <div style={{ fontSize: 64, fontWeight: 400, letterSpacing: "-0.02em" }}>
          Neel Jain
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
