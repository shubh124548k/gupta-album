export interface Review {
  id: string;
  photographerId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
}

// Initial reviews data - in production this would come from a database
export const initialReviews: Review[] = [
  {
    id: "r1",
    photographerId: "1",
    userId: "u1",
    userName: "Priya Mehta",
    rating: 5,
    text: "Arjun and his team were absolutely amazing! They captured every moment beautifully. Our wedding album is something we'll cherish forever.",
    date: "2024-11-15"
  },
  {
    id: "r2",
    photographerId: "1",
    userId: "u2",
    userName: "Rahul Verma",
    rating: 5,
    text: "Professional, punctual, and incredibly talented. The candid shots were beyond our expectations. Highly recommend!",
    date: "2024-10-28"
  },
  {
    id: "r3",
    photographerId: "2",
    userId: "u3",
    userName: "Anita Sharma",
    rating: 4,
    text: "Great experience working with Mumbai Moments. The cinematic video they created was stunning. Only minor delay in delivery.",
    date: "2024-11-20"
  },
  {
    id: "r4",
    photographerId: "3",
    userId: "u4",
    userName: "Sourav Banerjee",
    rating: 5,
    text: "They perfectly understood Bengali wedding traditions. Every ritual was captured with such attention to detail. Thank you!",
    date: "2024-11-10"
  },
  {
    id: "r5",
    photographerId: "4",
    userId: "u5",
    userName: "Sneha Reddy",
    rating: 5,
    text: "Bangalore Bliss Photography made our destination wedding in Goa absolutely magical. The drone shots are breathtaking!",
    date: "2024-12-01"
  },
  {
    id: "r6",
    photographerId: "5",
    userId: "u6",
    userName: "Karthik Iyer",
    rating: 4,
    text: "Excellent temple photography. They knew exactly where to stand during the rituals. Very traditional and elegant work.",
    date: "2024-10-15"
  }
];

// Get reviews for a specific photographer
export const getReviewsByPhotographer = (photographerId: string, reviews: Review[]): Review[] => {
  return reviews.filter(r => r.photographerId === photographerId);
};

// Calculate average rating for a photographer
export const getAverageRating = (photographerId: string, reviews: Review[]): number => {
  const photographerReviews = getReviewsByPhotographer(photographerId, reviews);
  if (photographerReviews.length === 0) return 0;
  const sum = photographerReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / photographerReviews.length) * 10) / 10;
};
