import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Review, initialReviews } from '@/data/reviews';

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (reviewId: string) => void;
  getReviewsForPhotographer: (photographerId: string) => Review[];
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  const getReviewsForPhotographer = (photographerId: string) => {
    return reviews.filter(r => r.photographerId === photographerId);
  };

  return (
    <ReviewsContext.Provider value={{
      reviews,
      addReview,
      deleteReview,
      getReviewsForPhotographer
    }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = (): ReviewsContextType => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};
