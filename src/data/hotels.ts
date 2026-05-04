import h1 from "@/assets/hotel-1.jpg";
import h2 from "@/assets/hotel-2.jpg";
import h3 from "@/assets/hotel-3.jpg";
import h4 from "@/assets/hotel-4.jpg";

export type Hotel = {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: string;
  image: string;
  images: string[];
  amenities: string[];
  isVerified: boolean;
  safetyScore: number;
  has360: boolean;
  sketchfabId?: string;
  description: string;
  rooms: { id: string; name: string; price: number; beds: string; size: string; guests: number; safety: number }[];
};

export const hotels: Hotel[] = [
  {
    id: "sea-breeze",
    name: "Sea Breeze Resort",
    location: "Calangute, Goa · Beachfront",
    price: 4290,
    rating: 4.8,
    reviews: "1.2K",
    image: h1,
    images: [h1, h2, h3],
    amenities: ["Free Wi-Fi", "Pool", "Breakfast", "Parking", "CCTV", "Verified Staff"],
    isVerified: true,
    safetyScore: 98,
    has360: true,
    sketchfabId: "b6042dea2df944bf904985a91b8597a8",
    description: "Beachfront resort with beautiful sea-view rooms, infinity pool, and verified staff.",
    rooms: [
      { id: "r1", name: "Deluxe Sea View Room", price: 4290, beds: "1 King Bed", size: "320 sq.ft", guests: 2, safety: 98 },
      { id: "r2", name: "Premium Pool View Room", price: 5290, beds: "1 King Bed", size: "350 sq.ft", guests: 2, safety: 96 },
      { id: "r3", name: "Family Suite", price: 7490, beds: "2 King Beds", size: "520 sq.ft", guests: 4, safety: 95 },
    ],
  },
  {
    id: "royal-taj",
    name: "Taj Palace Hotel",
    location: "Colaba, Mumbai · Heritage",
    price: 18500,
    rating: 4.9,
    reviews: "3.5K",
    image: h2,
    images: [h2, h1, h3],
    amenities: ["Free Wi-Fi", "Luxury Spa", "Breakfast", "CCTV", "Verified Staff", "24/7 Butler"],
    isVerified: true,
    safetyScore: 99,
    has360: true,
    sketchfabId: "3f99005c08fd4fbdbde571b61b0899cd",
    description: "Iconic heritage hotel overlooking the Gateway of India, offering world-class luxury and safety.",
    rooms: [
      { id: "r1", name: "Luxury Heritage Room", price: 18500, beds: "1 King Bed", size: "450 sq.ft", guests: 2, safety: 99 },
      { id: "r2", name: "Grand Palace Suite", price: 45000, beds: "1 King Bed", size: "850 sq.ft", guests: 2, safety: 99 },
    ],
  },
  {
    id: "jaipur-royal",
    name: "The Royal Jaipur Haveli",
    location: "Pink City, Jaipur",
    price: 5800,
    rating: 4.7,
    reviews: "942",
    image: h3,
    images: [h3, h1, h2],
    amenities: ["Free Wi-Fi", "Cultural Tours", "Parking", "CCTV", "Verified Staff"],
    isVerified: true,
    safetyScore: 97,
    has360: true,
    sketchfabId: "3f99005c08fd4fbdbde571b61b0899cd",
    description: "A beautifully restored 19th-century haveli in the heart of Jaipur, blending tradition with modern safety.",
    rooms: [
      { id: "r1", name: "Maharani Room", price: 5800, beds: "1 Queen Bed", size: "320 sq.ft", guests: 2, safety: 97 },
      { id: "r2", name: "Rajput Suite", price: 8200, beds: "1 King Bed", size: "480 sq.ft", guests: 3, safety: 96 },
    ],
  },
  {
    id: "munnar-green",
    name: "Munnar Green Hills Resort",
    location: "Tea Gardens, Munnar",
    price: 3600,
    rating: 4.6,
    reviews: "756",
    image: h4,
    images: [h4, h1, h2],
    amenities: ["Free Wi-Fi", "Trekking", "Breakfast", "CCTV"],
    isVerified: true,
    safetyScore: 95,
    has360: true,
    sketchfabId: "3f99005c08fd4fbdbde571b61b0899cd",
    description: "Nestled amidst lush tea plantations, offering panoramic mountain views and serene atmosphere.",
    rooms: [
      { id: "r1", name: "Valley View Room", price: 3600, beds: "1 Queen Bed", size: "280 sq.ft", guests: 2, safety: 95 },
      { id: "r2", name: "Mist Suite", price: 5400, beds: "1 King Bed", size: "400 sq.ft", guests: 2, safety: 94 },
    ],
  },
  {
    id: "delhi-grand",
    name: "Oberoi Grand Residency",
    location: "Connaught Place, Delhi",
    price: 12400,
    rating: 4.8,
    reviews: "1.8K",
    image: h1,
    images: [h1, h3, h4],
    amenities: ["Free Wi-Fi", "Business Center", "Pool", "CCTV", "Verified Staff"],
    isVerified: true,
    safetyScore: 98,
    has360: true,
    sketchfabId: "3f99005c08fd4fbdbde571b61b0899cd",
    description: "Premium business hotel in the heart of Delhi, known for its impeccable service and high safety standards.",
    rooms: [
      { id: "r1", name: "Executive Suite", price: 12400, beds: "1 King Bed", size: "420 sq.ft", guests: 2, safety: 98 },
      { id: "r2", name: "Presidential Wing", price: 28000, beds: "1 King Bed", size: "750 sq.ft", guests: 2, safety: 99 },
    ],
  },
  {
    id: "udaipur-lake",
    name: "Lake View Palace",
    location: "Pichola Lake, Udaipur",
    price: 9200,
    rating: 4.9,
    reviews: "1.1K",
    image: h2,
    images: [h2, h3, h4],
    amenities: ["Free Wi-Fi", "Boat Rides", "Pool", "CCTV", "Verified Staff"],
    isVerified: true,
    safetyScore: 99,
    has360: true,
    sketchfabId: "3f99005c08fd4fbdbde571b61b0899cd",
    description: "A stunning palace hotel on the banks of Lake Pichola, offering regal experiences and top-tier security.",
    rooms: [
      { id: "r1", name: "Lake Front Room", price: 9200, beds: "1 King Bed", size: "380 sq.ft", guests: 2, safety: 99 },
      { id: "r2", name: "Royal Maharana Suite", price: 15500, beds: "1 King Bed", size: "600 sq.ft", guests: 2, safety: 99 },
    ],
  },
  {
    id: "rishikesh-retreat",
    name: "Ganges Spirit Retreat",
    location: "Tapovan, Rishikesh",
    price: 2800,
    rating: 4.5,
    reviews: "542",
    image: h3,
    images: [h3, h4, h1],
    amenities: ["Free Wi-Fi", "Yoga Studio", "Breakfast", "CCTV"],
    isVerified: true,
    safetyScore: 94,
    has360: true,
    sketchfabId: "3f99005c08fd4fbdbde571b61b0899cd",
    description: "A peaceful retreat near the banks of the Ganges, perfect for spiritual rejuvenation and safe travel.",
    rooms: [
      { id: "r1", name: "Yoga View Room", price: 2800, beds: "1 Queen Bed", size: "260 sq.ft", guests: 2, safety: 94 },
    ],
  },
  {
    id: "bangalore-tech",
    name: "Tech Hub Residency",
    location: "Whitefield, Bangalore",
    price: 4500,
    rating: 4.6,
    reviews: "820",
    image: h4,
    images: [h4, h1, h2],
    amenities: ["Free Wi-Fi", "Workspace", "Parking", "CCTV", "Verified Staff"],
    isVerified: true,
    safetyScore: 96,
    has360: true,
    sketchfabId: "3f99005c08fd4fbdbde571b61b0899cd",
    description: "Modern stay in Bangalore's tech corridor, tailored for business travelers and digital nomads.",
    rooms: [
      { id: "r1", name: "Studio Room", price: 4500, beds: "1 Queen Bed", size: "300 sq.ft", guests: 2, safety: 96 },
      { id: "r2", name: "Work-Play Suite", price: 6200, beds: "1 King Bed", size: "450 sq.ft", guests: 2, safety: 95 },
    ],
  },
];

export const getHotel = (id: string) => hotels.find((h) => h.id === id);
