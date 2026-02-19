export interface Trip {
  id: string;
  label: string;
  city: string;
  lat: number;
  lng: number;
  year: string;
  substackUrl?: string;
  postTitle?: string;
  postSubtitle?: string;
  coverImage?: string;
}

export const trips: Trip[] = [
  {
    id: "saudi",
    label: "Saudi Arabia",
    city: "Riyadh",
    lat: 24.71,
    lng: 46.68,
    year: "2025",
  },
  {
    id: "galapagos",
    label: "Galápagos",
    city: "Santa Cruz Island",
    lat: -0.74,
    lng: -90.31,
    year: "2024",
    substackUrl: "https://substack.com/home/post/p-185006355",
    postTitle: "A week on a boat in the Galapagos",
    postSubtitle:
      "Snorkeling with penguins, playing soccer with locals on a 100-person island",
    coverImage:
      "https://substackcdn.com/image/fetch/w_1200,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67a4fd72-a8ac-48b4-8af2-43dd0397c33b_2048x1536.jpeg",
  },
  {
    id: "india",
    label: "India",
    city: "Mumbai",
    lat: 19.08,
    lng: 72.88,
    year: "2024",
    substackUrl: "https://substack.com/home/post/p-180349032",
    postTitle: "A week at an ashram in India",
    postSubtitle: "Documenting my experience",
    coverImage:
      "https://substackcdn.com/image/fetch/w_1200,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F651e5db5-3a9c-4439-aad9-4ac6e6718bbd.heic",
  },
  {
    id: "greenland",
    label: "Greenland",
    city: "Nuuk",
    lat: 64.18,
    lng: -51.72,
    year: "2023",
  },
  {
    id: "sydney",
    label: "Sydney",
    city: "Sydney, Australia",
    lat: -33.87,
    lng: 151.21,
    year: "2023",
    substackUrl: "https://global.upenn.edu/pennabroad/life-at-livelo/",
    postTitle: "Summer study abroad in Sydney",
    postSubtitle:
      "Interning at a bike-sharing startup through Penn's GRIP program — work, surf, and a very different pace of life",
    coverImage: "/sydney-opera-house.jpg",
  },
];
