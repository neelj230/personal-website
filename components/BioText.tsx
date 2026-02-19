"use client";

type Phase = "idle" | "travel-animating" | "travel-landed" | "reading" | "projects";

interface BioTextProps {
  onTravelClick: () => void;
  onReadingClick: () => void;
  onProjectsClick: () => void;
  onHomeClick: () => void;
  phase: Phase;
  disabled: boolean;
}

export default function BioText({
  onTravelClick,
  onReadingClick,
  onProjectsClick,
  onHomeClick,
  phase,
  disabled,
}: BioTextProps) {
  const bioHidden = phase === "reading" || phase === "projects";

  return (
    <div className="bio-container">
      {/* ── Left column: nav ── */}
      <nav className="site-nav">
        <span className="nav-label">NAVIGATION</span>
        <button
          className={`nav-item${phase === "idle" ? " nav-item--active" : ""}`}
          onClick={onHomeClick}
        >
          Home
        </button>
        <button
          className={`nav-item${phase === "reading" ? " nav-item--active" : ""}${
            phase === "travel-animating" ? " nav-item--muted" : ""
          }`}
          onClick={onReadingClick}
        >
          Reading
        </button>
        <button
          className={`nav-item${
            phase === "travel-landed" || phase === "travel-animating"
              ? " nav-item--active"
              : ""
          }${phase === "travel-animating" ? " nav-item--muted" : ""}`}
          onClick={onTravelClick}
        >
          Travel
        </button>
        <button
          className={`nav-item${phase === "projects" ? " nav-item--active" : ""}${
            phase === "travel-animating" ? " nav-item--muted" : ""
          }`}
          onClick={onProjectsClick}
        >
          Projects
        </button>
      </nav>

      {/* ── Right column: name + bio ── */}
      <div className={`bio-content${bioHidden ? " bio-content--reading" : ""}`}>
        <h1 className="name-heading">Neel Jain</h1>
        <p className="bio-text">
          Currently I&apos;m at Penn and writing scout checks for a16z.{" "}
          In my free time I like{" "}
          <span
            className={`interactive-link travel-link${disabled ? " disabled" : ""}`}
            onClick={disabled ? undefined : onReadingClick}
            role={disabled ? undefined : "button"}
            tabIndex={disabled ? undefined : 0}
            onKeyDown={
              disabled
                ? undefined
                : (e) => {
                    if (e.key === "Enter" || e.key === " ") onReadingClick();
                  }
            }
          >
            reading
          </span>,{" "}
          <span
            className={`interactive-link travel-link${disabled ? " disabled" : ""}`}
            onClick={disabled ? undefined : onProjectsClick}
            role={disabled ? undefined : "button"}
            tabIndex={disabled ? undefined : 0}
            onKeyDown={
              disabled
                ? undefined
                : (e) => {
                    if (e.key === "Enter" || e.key === " ") onProjectsClick();
                  }
            }
          >
            working on projects
          </span>
          , and{" "}
          <span
            className={`interactive-link travel-link${disabled ? " disabled" : ""}`}
            onClick={disabled ? undefined : onTravelClick}
            role={disabled ? undefined : "button"}
            tabIndex={disabled ? undefined : 0}
            onKeyDown={
              disabled
                ? undefined
                : (e) => {
                    if (e.key === "Enter" || e.key === " ") onTravelClick();
                  }
            }
          >
            exploring new places
          </span>
          .
        </p>
      </div>
    </div>
  );
}
