export interface Project {
  id: string;
  title: string;
  description: string;
  device: "phone" | "laptop" | "clipboard" | "tv";
  w: number;
  h: number;
  x: number;
  y: number;
  scale: number;
  floatDuration: number;
  floatDelay: number;
  url?: string;
  /** Pull caption up (negative) or push down (positive) relative to clip bottom */
  captionOffset?: number;
}

// 2×2 layout, viewport center = (0,0)
// Captions aligned per row at caption_top = y + vH/2 + 14
//   Top row caption_top  = -100  (284px from top on 768px screen — always in view)
//   Bottom row caption_top = 311  (695px from top — full text fits before 768px)
//
//   TV  y=-232 vH≈236 → cap@-100   Phone y=-246 vH=264 → cap@-100
//   Clip y=168 vH≈259 → cap@311    Laptop y=172 vH≈250 → cap@311

export const projects: Project[] = [
  {
    id: "pdx-concierge",
    title: "PDX Concierge",
    description:
      "At 16, I founded PDX Concierge, a grocery delivery service for the elderly & food-insecure fueled by students. Grew to 100+ team, 10,000+ meals delivered, featured on Good Morning America & MSNBC.",
    device: "tv",
    w: 420,
    h: 278,
    x: -210,
    y: -232,
    scale: 0.85,
    floatDuration: 3.8,
    floatDelay: 0,
  },
  {
    id: "penn-faces",
    title: "Penn Faces",
    description:
      "Founded Penn Faces, a platform to randomly pair Penn students for free lunches. 600 sign-ups in 48 hours, 1,000+ matched — 80% exchanged numbers, 100% would do it again.",
    device: "clipboard",
    w: 260,
    h: 360,
    x: -210,
    y: 168,
    scale: 0.72,
    floatDuration: 2.7,
    floatDelay: 0.6,
  },
  {
    id: "invideochat",
    title: "InVideoChat",
    description:
      "Built InVideo, an AI-native platform to watch educational YouTube videos and interact via chat and voice, with a knowledge graph of context between videos.",
    url: "https://invideochat.vercel.app/",
    captionOffset: -32,
    device: "laptop",
    w: 460,
    h: 447,
    x: 210,
    y: 184,
    scale: 0.65,
    floatDuration: 3.4,
    floatDelay: 0.9,
  },
  {
    id: "rentbot",
    title: "RentBot",
    description:
      "Built RentBot, an AI leasing agent for property managers to field questions and book showings 24/7.",
    url: "https://rentbot.dev",
    device: "phone",
    w: 290,
    h: 600,
    x: 210,
    y: -246,
    scale: 0.44,
    floatDuration: 3.1,
    floatDelay: 0.3,
  },
];
