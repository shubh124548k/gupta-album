export interface Photographer {
  id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  services: string[];
  categories: string[];
  about: string;
  experience: string;
  gallery: string[];
  videos: string[];
  featured: boolean;
  verified: boolean;
}

export const photographers: Photographer[] = [
  {
    id: "1",
    name: "Arjun Sharma Photography",
    city: "Delhi",
    email: "arjun@example.com",
    phone: "9876543210",
    priceRange: "₹50,000 - ₹1,50,000",
    rating: 4.9,
    reviewCount: 127,
    services: ["Wedding Photography", "Pre-Wedding Shoots", "Candid Photography", "Drone Coverage", "Album Design"],
    categories: ["Wedding", "Pre-Wedding", "Candid"],
    about: "With over 10 years of experience capturing love stories, Arjun Sharma Photography specializes in creating timeless memories. Our team blends traditional elegance with contemporary creativity to deliver photographs that speak to your heart.",
    experience: "10+ years",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800"
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    ],
    featured: true,
    verified: true
  },
  {
    id: "2",
    name: "Mumbai Moments Studio",
    city: "Mumbai",
    email: "mumbaimoments@example.com",
    phone: "9876543211",
    priceRange: "₹75,000 - ₹2,00,000",
    rating: 4.8,
    reviewCount: 98,
    services: ["Wedding Photography", "Destination Wedding", "Fashion Photography", "Cinematic Videos", "Photo Booth"],
    categories: ["Wedding", "Destination", "Fashion"],
    about: "Mumbai Moments Studio brings the glamour of Bollywood to your wedding day. Our award-winning team captures the grandeur, emotions, and intimate moments that make your celebration unique.",
    experience: "8 years",
    gallery: [
      "https://images.unsplash.com/photo-1623894434303-dffbb03a225b?w=800",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800"
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    ],
    featured: true,
    verified: true
  },
  {
    id: "3",
    name: "Kolkata Creative Clicks",
    city: "Kolkata",
    email: "kolkataclicks@example.com",
    phone: "9876543212",
    priceRange: "₹40,000 - ₹1,20,000",
    rating: 4.7,
    reviewCount: 156,
    services: ["Bengali Wedding", "Pre-Wedding", "Traditional Photography", "Reception Coverage", "Maternity Shoots"],
    categories: ["Wedding", "Traditional", "Pre-Wedding"],
    about: "Specializing in Bengali weddings, we understand the rich traditions and rituals that make your ceremony special. Our photographers are experts at capturing the essence of Bengali culture with artistic flair.",
    experience: "12 years",
    gallery: [
      "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800",
      "https://images.unsplash.com/photo-1585347890539-14a6bd19d08f?w=800",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800",
      "https://images.unsplash.com/photo-1549417229-7686ac5595fd?w=800",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800"
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    ],
    featured: false,
    verified: true
  },
  {
    id: "4",
    name: "Bangalore Bliss Photography",
    city: "Bangalore",
    email: "bangalorebliss@example.com",
    phone: "9876543213",
    priceRange: "₹60,000 - ₹1,80,000",
    rating: 4.9,
    reviewCount: 89,
    services: ["Wedding Photography", "Pre-Wedding", "Birthday Photography", "Corporate Events", "Live Streaming"],
    categories: ["Wedding", "Birthday", "Corporate"],
    about: "From tech city weddings to intimate garden ceremonies, Bangalore Bliss Photography captures every moment with precision and artistry. Our modern approach combines cutting-edge technology with timeless aesthetics.",
    experience: "7 years",
    gallery: [
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800",
      "https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=800",
      "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?w=800",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800",
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800"
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    ],
    featured: true,
    verified: true
  },
  {
    id: "5",
    name: "Chennai Classic Studios",
    city: "Chennai",
    email: "chennaistudios@example.com",
    phone: "9876543214",
    priceRange: "₹35,000 - ₹1,00,000",
    rating: 4.6,
    reviewCount: 203,
    services: ["South Indian Wedding", "Temple Photography", "Tourism Photography", "Engagement Shoots", "Anniversary"],
    categories: ["Wedding", "Tourism", "Traditional"],
    about: "Chennai Classic Studios specializes in South Indian weddings, understanding the beauty of silk sarees, temple backdrops, and traditional ceremonies. We blend classical aesthetics with modern photography techniques.",
    experience: "15 years",
    gallery: [
      "https://images.unsplash.com/photo-1609151162039-bfce9a2ae04c?w=800",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
      "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800",
      "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800"
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    ],
    featured: false,
    verified: false
  }
];

export const getPhotographerById = (id: string): Photographer | undefined => {
  return photographers.find(p => p.id === id);
};

export const getPhotographersByCity = (city: string): Photographer[] => {
  if (!city || city === "all") return photographers;
  return photographers.filter(p => p.city.toLowerCase() === city.toLowerCase());
};

export const searchPhotographers = (query: string, city?: string): Photographer[] => {
  let results = city && city !== "all" ? getPhotographersByCity(city) : photographers;
  
  if (!query) return results;
  
  const lowerQuery = query.toLowerCase();
  return results.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.services.some(s => s.toLowerCase().includes(lowerQuery)) ||
    p.categories.some(c => c.toLowerCase().includes(lowerQuery)) ||
    p.city.toLowerCase().includes(lowerQuery)
  );
};

export const getFeaturedPhotographers = (): Photographer[] => {
  return photographers.filter(p => p.featured);
};
