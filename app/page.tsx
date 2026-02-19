"use client";

import { useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import BioText from "@/components/BioText";
import TravelCard from "@/components/TravelCard";
import BookShelf from "@/components/BookShelf";
import ProjectShelf from "@/components/ProjectShelf";
import LocalClock from "@/components/LocalClock";
import { trips } from "@/data/trips";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

type Phase = "idle" | "travel-animating" | "travel-landed" | "reading" | "projects";

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

interface LabelData {
  lat: number;
  lng: number;
  text: string;
}

// US center: good starting view for North America
const US_LAT = 39;
const US_LNG = -97;

export default function Home() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visitorCoords, setVisitorCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [activeTripIndex, setActiveTripIndex] = useState(0);
  const [activeArc, setActiveArc] = useState<ArcData | null>(null);
  const [activeTripPins, setActiveTripPins] = useState<LabelData[]>([]);
  const [cardVisible, setCardVisible] = useState(false);
  const globeRef = useRef<GlobeMethods | null>(null);

  const flyTo = useCallback(
    (lat: number, lng: number, altitude: number, ms: number) => {
      globeRef.current?.pointOfView({ lat, lng, altitude }, ms);
    },
    []
  );

  const handleGlobeReady = useCallback(
    (handle: GlobeMethods) => {
      globeRef.current = handle;

      // Mobile: start zoomed out so the full earth is visible
      const isMobile = window.innerWidth < 640;
      const startAlt = isMobile ? 4.2 : 2.8;
      const endAlt = isMobile ? 3.5 : 2.0;

      handle.pointOfView({ lat: US_LAT, lng: US_LNG, altitude: startAlt }, 0);
      setTimeout(() => {
        handle.pointOfView({ lat: US_LAT, lng: US_LNG, altitude: endAlt }, 1800);
      }, 100);

      // Background: fetch geolocation and drop visitor pin silently
      import("@/lib/geolocation").then(({ fetchVisitorLocation }) => {
        fetchVisitorLocation().then((geo) => {
          if (geo) setVisitorCoords({ lat: geo.lat, lng: geo.lng });
        });
      });
    },
    []
  );

  // Travel animation: zoom out → arc draws → camera flies to destination
  const startTravelSequence = useCallback(
    (tripIndex: number, fromCoords: { lat: number; lng: number }) => {
      setPhase("travel-animating");
      setCardVisible(false);

      const trip = trips[tripIndex];
      // Midpoint gives a dramatic "halfway there" camera angle while arc draws
      const midLat = (fromCoords.lat + trip.lat) / 2;
      const midLng = (fromCoords.lng + trip.lng) / 2;

      // Zoom out to midpoint (feel: launching off the ground)
      flyTo(midLat, midLng, 2.8, 700);

      // Arc appears once camera has pulled back
      setTimeout(() => {
        setActiveArc({
          startLat: fromCoords.lat,
          startLng: fromCoords.lng,
          endLat: trip.lat,
          endLng: trip.lng,
        });
        setActiveTripPins((prev) => [
          ...prev,
          { lat: trip.lat, lng: trip.lng, text: trip.label },
        ]);
      }, 800);

      // Fly to destination after arc has drawn most of the way
      setTimeout(() => {
        flyTo(trip.lat, trip.lng, 1.4, 1400);
      }, 1500);

      // Card slides up after camera lands
      setTimeout(() => {
        setPhase("travel-landed");
        setCardVisible(true);
      }, 3200);
    },
    [flyTo]
  );

  const handleTravelClick = useCallback(() => {
    // Block during animation or if already in travel
    if (phase === "travel-animating" || phase === "travel-landed") return;

    const fromCoords = visitorCoords ?? { lat: US_LAT, lng: US_LNG };

    if (phase === "reading" || phase === "projects") {
      // Close overlay, then start travel after exit animation
      setPhase("idle");
      setTimeout(() => {
        setActiveTripIndex(0);
        setActiveTripPins([]);
        setActiveArc(null);
        startTravelSequence(0, fromCoords);
      }, 350);
      return;
    }

    // idle
    setActiveTripIndex(0);
    setActiveTripPins([]);
    setActiveArc(null);
    startTravelSequence(0, fromCoords);
  }, [phase, visitorCoords, startTravelSequence]);

  const handleNext = useCallback(() => {
    const nextIndex = activeTripIndex + 1;
    if (nextIndex >= trips.length) return;
    const fromTrip = trips[activeTripIndex];
    setActiveTripIndex(nextIndex);
    startTravelSequence(nextIndex, { lat: fromTrip.lat, lng: fromTrip.lng });
  }, [activeTripIndex, startTravelSequence]);

  const handlePrev = useCallback(() => {
    const prevIndex = activeTripIndex - 1;
    if (prevIndex < 0) return;
    const fromTrip = trips[activeTripIndex];
    setActiveTripIndex(prevIndex);
    startTravelSequence(prevIndex, { lat: fromTrip.lat, lng: fromTrip.lng });
  }, [activeTripIndex, startTravelSequence]);

  const handleClose = useCallback(() => {
    setCardVisible(false);
    setActiveArc(null);
    setActiveTripPins([]);
    setActiveTripIndex(0);

    // Fly back to US view
    flyTo(US_LAT, US_LNG, 2.0, 1800);

    setTimeout(() => {
      setPhase("idle");
    }, 1900);
  }, [flyTo]);

  const handleReadingClick = useCallback(() => {
    // No-op if already reading or mid-animation
    if (phase === "reading" || phase === "travel-animating") return;
    // Coming from travel-landed: clean up travel state silently
    if (phase === "travel-landed") {
      setCardVisible(false);
      setActiveArc(null);
      setActiveTripPins([]);
      setActiveTripIndex(0);
    }
    setPhase("reading");
  }, [phase]);

  const handleReadingClose = useCallback(() => {
    setPhase("idle");
  }, []);

  const handleProjectsClick = useCallback(() => {
    if (phase === "projects" || phase === "travel-animating") return;
    if (phase === "travel-landed") {
      setCardVisible(false);
      setActiveArc(null);
      setActiveTripPins([]);
      setActiveTripIndex(0);
    }
    setPhase("projects");
  }, [phase]);

  const handleProjectsClose = useCallback(() => {
    setPhase("idle");
  }, []);

  const handleHomeClick = useCallback(() => {
    if (phase === "idle") return;
    setCardVisible(false);
    setActiveArc(null);
    setActiveTripPins([]);
    setActiveTripIndex(0);
    flyTo(US_LAT, US_LNG, 2.0, 1800);
    setTimeout(() => setPhase("idle"), 400);
  }, [phase, flyTo]);

  return (
    <main>
      <Globe
        visitorCoords={visitorCoords}
        activeArc={activeArc}
        activeTripPins={activeTripPins}
        onGlobeReady={handleGlobeReady}
      />

      {/* Globe dim overlay — between globe (z:0) and UI overlay (z:10) */}
      <AnimatePresence>
        {(phase === "reading" || phase === "projects") && (
          <motion.div
            className="globe-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      <BookShelf visible={phase === "reading"} onClose={handleReadingClose} />
      <ProjectShelf visible={phase === "projects"} onClose={handleProjectsClose} />

      {/*
       * BioText lives OUTSIDE .overlay so its z-index: 30 (set in CSS) sits
       * above the bookshelf-overlay (z-index: 20) in the root stacking context.
       * Children of .overlay (z-index: 10 stacking context) can never paint
       * above a sibling with higher z-index regardless of their own z-index.
       */}
      <BioText
        onTravelClick={handleTravelClick}
        onReadingClick={handleReadingClick}
        onProjectsClick={handleProjectsClick}
        onHomeClick={handleHomeClick}
        phase={phase}
        disabled={phase !== "idle"}
      />

      {/* Local clock + pin — bottom right, hidden during full-screen overlays */}
      <LocalClock visible={phase !== "reading" && phase !== "projects"} />

      {/* Travel card lives inside overlay so it can be layered independently */}
      <div className="overlay">
        <TravelCard
          trip={trips[activeTripIndex]}
          index={activeTripIndex}
          total={trips.length}
          visible={cardVisible}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
        />
      </div>
    </main>
  );
}
