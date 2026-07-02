"use client";

import { useEffect, useState, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

// PennReach browser window — Mac-style chrome around a live port of the
// pennreach.app landing-page campaign-wizard animation (5 auto-cycling steps).
// Native size: 640 × 460, self-contained inline styles (PennReach light theme).

const C = {
  bg: "#FAF7F2",
  card: "#FFFFFF",
  muted: "#F3EFE8",
  ink: "#1A1A1A",
  inkMuted: "#6B6660",
  inkFaint: "#A39E96",
  line: "#ECE8E2",
  accent: "#9B1B30",
};

const serif = "var(--font-instrument-serif), Georgia, serif";
const mono = "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace";

const STEPS = ["Name", "Recipients", "Opener", "Pacing", "Launch"] as const;
const STEP_DURATION = 4500; // ms per step
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const ROSTER = [
  { name: "Sarah Chen", first: "Sarah", email: "sarahchen@gmail.com", school: "Wharton", company: "Goldman Sachs" },
  { name: "Marcus Williams", first: "Marcus", email: "marcus.williams@gmail.com", school: "College", company: "McKinsey & Company" },
  { name: "Priya Patel", first: "Priya", email: "priya.patel@gmail.com", school: "Wharton", company: "Bridgewater Associates" },
  { name: "James O'Brien", first: "James", email: "jamesobrien@gmail.com", school: "Wharton", company: "Sequoia Capital" },
  { name: "Ana Rodriguez", first: "Ana", email: "ana.rodriguez@gmail.com", school: "College", company: "Apollo Global Management" },
  { name: "David Kim", first: "David", email: "davidkim@gmail.com", school: "Wharton", company: "Centerview Partners" },
  { name: "Maya Thompson", first: "Maya", email: "maya.thompson@gmail.com", school: "College", company: "Bain & Company" },
];

const OPENER_SUBJECT = "Wharton senior researching strategy at {{company}}";
const OPENER_BODY = `Hi {{first_name}},

I'm Neel, a Wharton senior researching how {{company}} thinks about growth. Your path through {{penn_school}} caught my eye and I'd love 15 minutes to learn from you.

Are you free sometime next week?

Best,
Neel`;

export default function PennReachDevice() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setStepIndex((i) => (i + 1) % STEPS.length),
      STEP_DURATION
    );
    return () => clearInterval(id);
  }, []);

  const step = STEPS[stepIndex];

  return (
    <div
      style={{
        width: 640,
        height: 460,
        borderRadius: 16,
        overflow: "hidden",
        background: C.card,
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
          padding: "9px 14px",
          borderBottom: `1px solid ${C.line}`,
          background: C.card,
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
            background: C.muted,
            color: C.inkFaint,
            fontFamily: mono,
            fontSize: 10.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          pennreach.app/campaigns/new
        </div>
        <div style={{ width: 42 }} />
      </div>

      {/* ── Body: sidebar + wizard ── */}
      <div style={{ display: "flex", height: 419 }}>
        <Sidebar />

        <div style={{ flex: 1, minWidth: 0, background: C.bg }}>
          {/* Progress bar */}
          <div style={{ padding: "14px 22px 0" }}>
            <div style={{ display: "flex", gap: 5 }}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 99,
                    background: C.line,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{ width: i <= stepIndex ? "100%" : "0%" }}
                    transition={{
                      duration: i === stepIndex ? STEP_DURATION / 1000 - 0.4 : 0.3,
                      ease: i === stepIndex ? "linear" : ease,
                    }}
                    style={{ height: "100%", background: C.accent }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Step body */}
          <div style={{ padding: "18px 22px 20px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
              >
                {step === "Name" && <StepName />}
                {step === "Recipients" && <StepRecipients />}
                {step === "Opener" && <StepOpener />}
                {step === "Pacing" && <StepPacing />}
                {step === "Launch" && <StepLaunch />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Chrome pieces ────────────────────────────────────────────────────────────

function Sidebar() {
  const items = [
    "Today",
    "Contacts",
    "Lists",
    "Templates",
    "Campaigns",
    "Activity",
    "Inbox",
    "Settings",
  ];
  return (
    <aside
      style={{
        width: 124,
        flexShrink: 0,
        borderRight: `1px solid ${C.line}`,
        background: "rgba(250,247,242,0.6)",
        padding: "14px 10px",
      }}
    >
      <div style={{ fontFamily: serif, fontSize: 14, color: C.ink, padding: "0 6px" }}>
        PennReach
      </div>
      <div
        style={{
          margin: "12px 0",
          padding: "5px 6px",
          borderRadius: 6,
          background: C.muted,
          color: C.inkFaint,
          fontFamily: mono,
          fontSize: 9,
        }}
      >
        Quick find ⌘K
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((label) => {
          const active = label === "Campaigns";
          return (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 6px",
                borderRadius: 6,
                fontSize: 10.5,
                background: active ? C.muted : "transparent",
                color: active ? C.ink : C.inkMuted,
              }}
            >
              <span
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "currentColor",
                  opacity: 0.4,
                }}
              />
              <span>{label}</span>
              {label === "Inbox" && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 8,
                    background: C.accent,
                    color: "#fff",
                    borderRadius: 99,
                    padding: "1px 5px",
                  }}
                >
                  6
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: serif,
        fontSize: 24,
        letterSpacing: "-0.02em",
        color: C.ink,
        fontWeight: 400,
        margin: 0,
        lineHeight: 1.15,
      }}
    >
      {children}
    </h3>
  );
}

function Cursor({ h = 18 }: { h?: number }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.9, repeat: Infinity }}
      style={{
        display: "inline-block",
        width: 2,
        height: h,
        background: C.ink,
        marginLeft: 2,
        verticalAlign: "middle",
      }}
    />
  );
}

// ─── Step 1: Name ─────────────────────────────────────────────────────────────

function StepName() {
  const [text, setText] = useState("");
  const target = "Blackstone Spring 2026";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <Heading>What do you call this one?</Heading>
      <p style={{ margin: "6px 0 0", fontSize: 11.5, color: C.inkMuted }}>
        Only you see this.
      </p>
      <div
        style={{
          marginTop: 34,
          maxWidth: 360,
          fontFamily: serif,
          fontSize: 21,
          color: C.ink,
          borderBottom: `2px solid ${C.accent}`,
          padding: "6px 0",
        }}
      >
        {text}
        <Cursor />
      </div>
      <div style={{ marginTop: 48, display: "flex", justifyContent: "flex-end" }}>
        <span
          style={{
            fontSize: 11.5,
            padding: "7px 14px",
            borderRadius: 6,
            background: text.length > 3 ? C.accent : "rgba(155,27,48,0.3)",
            color: "#fff",
            transition: "background 0.3s",
          }}
        >
          Next →
        </span>
      </div>
    </div>
  );
}

// ─── Step 2: Recipients ───────────────────────────────────────────────────────

function StepRecipients() {
  const total = ROSTER.length;
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setSelected(Math.min(i, total));
      if (i >= total) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
  }, [total]);

  const chips: [string, number, boolean][] = [
    ["All contacts", 765, false],
    ["Blackstone", 7, true],
    ["Centerview", 3, false],
    ["Real Estate SPRINT", 755, false],
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 10,
        }}
      >
        <Heading>Who are you reaching?</Heading>
        <div style={{ fontSize: 10.5, color: C.inkMuted, whiteSpace: "nowrap" }}>
          {selected} of {total} selected
        </div>
      </div>
      <div
        style={{
          fontSize: 8,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: C.inkFaint,
          marginBottom: 6,
        }}
      >
        Scrape runs
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {chips.map(([label, n, active]) => (
          <span
            key={label}
            style={{
              fontSize: 9,
              padding: "4px 10px",
              borderRadius: 99,
              border: active ? "none" : `1px solid ${C.line}`,
              background: active ? C.ink : "transparent",
              color: active ? "#fff" : C.inkMuted,
            }}
          >
            {label}{" "}
            <span style={{ fontFamily: mono, opacity: active ? 0.7 : 0.5 }}>{n}</span>
          </span>
        ))}
      </div>
      <div style={{ borderRadius: 10, border: `1px solid ${C.line}`, overflow: "hidden", background: C.card }}>
        {ROSTER.map((alum, i) => {
          const checked = i < selected;
          return (
            <div
              key={alum.email}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 12px",
                borderBottom: i < ROSTER.length - 1 ? `1px solid ${C.line}` : "none",
                fontSize: 10,
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 3,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: checked ? C.accent : C.card,
                  border: checked ? "none" : `1px solid ${C.line}`,
                  transition: "background 0.2s",
                }}
              >
                {checked && (
                  <svg width="7" height="7" viewBox="0 0 9 9" fill="none">
                    <path
                      d="M1.5 4.5L3.5 6.5L7.5 2"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
              <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ color: C.ink }}>{alum.name}</span>
                <span style={{ fontFamily: mono, fontSize: 8.5, color: C.inkFaint }}>
                  {alum.email}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 3: Opener ───────────────────────────────────────────────────────────

function StepOpener() {
  const [subject, setSubject] = useState("");
  const [bodyLines, setBodyLines] = useState<string[]>([]);
  const targetBodyLines = OPENER_BODY.split("\n");

  useEffect(() => {
    let i = 0;
    let bodyId: ReturnType<typeof setInterval> | undefined;
    const subjectId = setInterval(() => {
      i++;
      setSubject(OPENER_SUBJECT.slice(0, i));
      if (i >= OPENER_SUBJECT.length) {
        clearInterval(subjectId);
        let bi = 0;
        bodyId = setInterval(() => {
          bi++;
          setBodyLines(targetBodyLines.slice(0, bi));
          if (bi >= targetBodyLines.length) clearInterval(bodyId);
        }, 200);
      }
    }, 28);
    return () => {
      clearInterval(subjectId);
      if (bodyId) clearInterval(bodyId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alum = ROSTER[0];
  const previewSubject = subject.replace("{{company}}", alum.company);
  const previewBody = bodyLines
    .join("\n")
    .replace("{{first_name}}", alum.first)
    .replace("{{company}}", alum.company)
    .replace("{{penn_school}}", alum.school);

  const card: CSSProperties = {
    borderRadius: 10,
    border: `1px solid ${C.line}`,
    background: C.card,
    padding: 10,
    minWidth: 0,
  };

  return (
    <div>
      <Heading>Write your opener.</Heading>
      <div
        style={{
          marginTop: 8,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 5,
          fontSize: 9.5,
          color: C.inkMuted,
        }}
      >
        <span>Use</span>
        {["{{first_name}}", "{{company}}", "{{penn_school}}"].map((v) => (
          <code
            key={v}
            style={{
              fontFamily: mono,
              fontSize: 8.5,
              padding: "2px 6px",
              borderRadius: 4,
              background: C.muted,
              color: C.ink,
            }}
          >
            {v}
          </code>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 12,
        }}
      >
        <div style={card}>
          <div style={{ fontSize: 10, color: C.ink, minHeight: 13 }}>{subject}</div>
          <div
            style={{
              marginTop: 6,
              borderTop: `1px solid ${C.line}`,
              paddingTop: 6,
              fontFamily: mono,
              fontSize: 8.5,
              color: C.inkMuted,
              whiteSpace: "pre-wrap",
              minHeight: 150,
              lineHeight: 1.55,
            }}
          >
            {bodyLines.join("\n")}
            <Cursor h={10} />
          </div>
        </div>
        <div style={card}>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: C.inkFaint,
            }}
          >
            Preview · {alum.email}
          </div>
          <div style={{ marginTop: 6, fontSize: 10, color: C.ink, fontWeight: 500, minHeight: 13 }}>
            {previewSubject}
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 8.5,
              color: C.inkMuted,
              whiteSpace: "pre-wrap",
              lineHeight: 1.55,
              minHeight: 140,
            }}
          >
            {previewBody}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Pacing ───────────────────────────────────────────────────────────

function StepPacing() {
  const [days, setDays] = useState(0);
  const [cap, setCap] = useState(10);

  useEffect(() => {
    let d = 0;
    const dId = setInterval(() => {
      d += 1;
      setDays(d);
      if (d >= 6) clearInterval(dId);
    }, 90);
    let c = 10;
    const cId = setInterval(() => {
      c += 4;
      setCap(c);
      if (c >= 50) clearInterval(cId);
    }, 50);
    return () => {
      clearInterval(dId);
      clearInterval(cId);
    };
  }, []);

  const bar: CSSProperties = {
    flex: 1,
    height: 5,
    borderRadius: 99,
    background: C.line,
    overflow: "hidden",
  };

  return (
    <div>
      <Heading>How should follow-ups pace?</Heading>
      <p style={{ margin: "6px 0 0", fontSize: 10.5, color: C.inkMuted }}>
        Days count from the previous message. Replies pause everything automatically.
      </p>
      <div
        style={{
          marginTop: 14,
          borderRadius: 12,
          background: C.card,
          border: `1px solid ${C.line}`,
          padding: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 11,
          }}
        >
          <span style={{ color: C.ink }}>Follow-up 1</span>
          <span style={{ color: C.inkFaint }}>×</span>
        </div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 9.5, color: C.inkMuted }}>Delay</span>
          <div style={bar}>
            <div
              style={{
                height: "100%",
                background: C.accent,
                width: `${(days / 14) * 100}%`,
                transition: "width 0.1s",
              }}
            />
          </div>
          <span style={{ fontSize: 10.5, color: C.ink, fontFamily: mono, width: 44, textAlign: "right" }}>
            {days} days
          </span>
        </div>
        <div
          style={{
            marginTop: 10,
            borderRadius: 6,
            border: `1px solid ${C.line}`,
            padding: "6px 8px",
            fontSize: 9.5,
            color: C.inkMuted,
            background: "rgba(250,247,242,0.4)",
          }}
        >
          Re: Quick hello
        </div>
        <div
          style={{
            marginTop: 6,
            borderRadius: 6,
            border: `1px solid ${C.line}`,
            padding: 8,
            fontFamily: mono,
            fontSize: 8.5,
            color: C.inkMuted,
            background: "rgba(250,247,242,0.4)",
            lineHeight: 1.5,
          }}
        >
          Just floating this up — no worries if now isn&apos;t a good time. Would
          love to connect when you have 15 min.
        </div>
      </div>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div
          style={{
            borderRadius: 12,
            border: `2px solid ${C.accent}`,
            background: "rgba(155,27,48,0.05)",
            padding: "8px 12px",
          }}
        >
          <div style={{ fontSize: 11, color: C.ink }}>Auto-send</div>
          <div style={{ fontSize: 9, color: C.inkMuted, marginTop: 1 }}>
            Fire and forget. We pace and pause on reply.
          </div>
        </div>
        <div
          style={{
            borderRadius: 12,
            border: `1px solid ${C.line}`,
            background: C.card,
            padding: "8px 12px",
            opacity: 0.7,
          }}
        >
          <div style={{ fontSize: 11, color: C.ink }}>Ask before each send</div>
          <div style={{ fontSize: 9, color: C.inkMuted, marginTop: 1 }}>
            Every outbound queues for approval.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 9.5, color: C.inkMuted }}>Daily cap</span>
        <div style={bar}>
          <div
            style={{
              height: "100%",
              background: C.accent,
              width: `${cap}%`,
              transition: "width 0.05s",
            }}
          />
        </div>
        <span style={{ fontSize: 10.5, color: C.ink, fontFamily: mono, width: 48, textAlign: "right" }}>
          {cap}/day
        </span>
      </div>
    </div>
  );
}

// ─── Step 5: Launch ───────────────────────────────────────────────────────────

function StepLaunch() {
  const summary = [
    ["Name", "Blackstone Spring 2026"],
    ["Recipients", String(ROSTER.length)],
    ["Mode", "Auto"],
    ["Follow-ups", "1"],
    ["Daily cap", "50/day"],
  ];
  return (
    <div>
      <Heading>Let&apos;s send you a test first.</Heading>
      <p style={{ margin: "6px 0 0", fontSize: 10.5, color: C.inkMuted, maxWidth: 420 }}>
        We&apos;ll send step 0 to{" "}
        <span style={{ fontFamily: mono, color: C.ink }}>you@wharton.upenn.edu</span>{" "}
        with the first recipient&apos;s variables filled in. Check your inbox — if
        it reads right, launch.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
        style={{
          marginTop: 14,
          borderRadius: 12,
          background: C.card,
          border: `1px solid ${C.line}`,
          padding: "6px 16px",
        }}
      >
        {summary.map(([k, v], i) => (
          <div
            key={k}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 0",
              borderBottom: i < summary.length - 1 ? `1px solid ${C.line}` : "none",
              fontSize: 11,
            }}
          >
            <span style={{ color: C.inkMuted }}>{k}</span>
            <span style={{ color: C.ink }}>{v}</span>
          </div>
        ))}
      </motion.div>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            padding: "7px 14px",
            borderRadius: 6,
            background: C.ink,
            color: "#fff",
          }}
        >
          Send test to myself
        </span>
        <motion.span
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{
            fontSize: 11,
            padding: "7px 14px",
            borderRadius: 6,
            background: C.accent,
            color: "#fff",
          }}
        >
          ✓ Start campaign
        </motion.span>
      </div>
    </div>
  );
}
