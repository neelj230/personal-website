"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import GlobeGL from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

interface PinData {
  lat: number;
  lng: number;
  isVisitor: boolean;
}

interface LabelData {
  lat: number;
  lng: number;
  text: string;
}

interface GlobeProps {
  visitorCoords: { lat: number; lng: number } | null;
  activeArc: ArcData | null;
  activeTripPins: LabelData[];
  onGlobeReady: (handle: GlobeMethods) => void;
}

export default function Globe({
  visitorCoords,
  activeArc,
  activeTripPins,
  onGlobeReady,
}: GlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  const handleGlobeReadyInternal = useCallback(() => {
    setIsGlobeReady(true);
  }, []);

  useEffect(() => {
    if (isGlobeReady && globeRef.current) {
      onGlobeReady(globeRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGlobeReady]);

  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Merge visitor pin + destination pins into one pointsData array.
  // This avoids labelsData entirely — react-globe.gl's sprite font can't
  // render non-ASCII characters (e.g. Galápagos → "Gal?pagos").
  const allPins: PinData[] = [
    ...(visitorCoords
      ? [{ lat: visitorCoords.lat, lng: visitorCoords.lng, isVisitor: true }]
      : []),
    ...activeTripPins.map((p) => ({
      lat: p.lat,
      lng: p.lng,
      isVisitor: false,
    })),
  ];

  const arcs: ArcData[] = activeArc ? [activeArc] : [];

  if (dimensions.width === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#000000",
        zIndex: 0,
      }}
    >
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="/textures/earth-blue-marble.jpg"
        bumpImageUrl="/textures/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        atmosphereColor="#4a90d9"
        atmosphereAltitude={0.15}
        // All pins: visitor = small white dot, destination = slightly larger white dot
        pointsData={allPins}
        pointColor={(d: object) =>
          (d as PinData).isVisitor
            ? "rgba(255,255,255,0.9)"
            : "rgba(255,255,255,0.95)"
        }
        pointAltitude={0.01}
        pointRadius={(d: object) => ((d as PinData).isVisitor ? 0.35 : 0.45)}
        pointsMerge={false}
        // Flight arc — white, high arc altitude for dramatic great-circle curve
        arcsData={arcs}
        arcColor={() => "rgba(255,255,255,0.85)"}
        arcDashLength={0.45}
        arcDashGap={0.04}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        arcAltitudeAutoScale={0.6}
        arcStartLat={(d: object) => (d as ArcData).startLat}
        arcStartLng={(d: object) => (d as ArcData).startLng}
        arcEndLat={(d: object) => (d as ArcData).endLat}
        arcEndLng={(d: object) => (d as ArcData).endLng}
        enablePointerInteraction={false}
        onGlobeReady={handleGlobeReadyInternal}
      />
    </div>
  );
}
