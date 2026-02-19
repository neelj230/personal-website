export interface GeoLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export async function fetchVisitorLocation(): Promise<GeoLocation | null> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.latitude || !data.longitude) return null;
    return {
      lat: data.latitude,
      lng: data.longitude,
      city: data.city ?? "Unknown",
      country: data.country_name ?? "Unknown",
    };
  } catch {
    return null;
  }
}
