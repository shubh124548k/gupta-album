import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Helper function to scroll to top
  const scrollToTop = () => {
    // Multiple approaches to ensure scroll reaches top
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Force again after a microtask to ensure it sticks
    Promise.resolve().then(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  // On route change
  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  // On component mount (page load/refresh)
  useEffect(() => {
    scrollToTop();
    
    // Scroll again on mount to catch any late scrolling
    const timer = setTimeout(() => {
      scrollToTop();
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default ScrollToTop;
