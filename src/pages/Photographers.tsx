import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Award, X } from 'lucide-react';
import Room3D from '@/components/Room3D';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlassPanel from '@/components/GlassPanel';
import FloatingCard3D from '@/components/FloatingCard3D';
import { Button } from '@/components/ui/button';
import { photographers, searchPhotographers, Photographer } from '@/data/photographers';
import { useAuth } from '@/contexts/AuthContext';

const Photographers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredPhotographers, setFilteredPhotographers] = useState<Photographer[]>(photographers);
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  useEffect(() => {
    // Force scroll to absolute top on mount
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Double-check with microtask queue
    Promise.resolve().then(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    
    // Triple check after brief delay
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [isAuthenticated]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showAuthModal && !isAuthenticated) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAuthModal, isAuthenticated]);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    const results = searchPhotographers(query, '');
    setFilteredPhotographers(results);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  const handleCreateAccount = () => {
    setShowAuthModal(false);
    navigate('/auth?mode=signup');
  };

  const handleSignIn = () => {
    setShowAuthModal(false);
    navigate('/auth?mode=signin');
  };

  return (
    <Room3D>
      <Header />
      
      {/* Auth Modal Overlay - Mobile visible */}
      {showAuthModal && !isAuthenticated && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center px-3 md:px-4 overflow-y-auto"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            zIndex: 50,
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowAuthModal(false);
              navigate('/');
            }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative z-50 w-full max-w-sm md:max-w-md my-auto"
          >
            <GlassPanel className="p-5 md:p-8 border border-primary/20 relative rounded-2xl" hover={false}>
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  navigate('/');
                }}
                className="absolute top-3 right-3 md:top-4 md:right-4 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 md:w-5 h-4 md:h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="text-center mb-4 md:mb-6">
                <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-1.5 md:mb-2">
                  Unlock Our Gallery
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground leading-snug">
                  Sign in to browse our collection of wedding photographers and view portfolios.
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-2 md:space-y-3">
                <Button
                  onClick={handleCreateAccount}
                  className="w-full btn-gold text-primary-foreground py-2.5 md:py-3 h-auto rounded-lg font-semibold text-sm md:text-base"
                >
                  Create Account
                </Button>
                <Button
                  onClick={handleSignIn}
                  variant="outline"
                  className="w-full py-2.5 md:py-3 h-auto rounded-lg font-semibold text-sm md:text-base border-2 hover:bg-primary/5"
                >
                  Sign In
                </Button>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/');
                  }}
                  className="w-full text-muted-foreground hover:text-foreground text-xs md:text-sm py-1.5 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-border/50 space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground text-center">
                <p className="text-xs">✓ Verified Photographers</p>
                <p className="text-xs">✓ Genuine Reviews</p>
                <p className="text-xs">✓ Secure Booking</p>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      )}
      
      {/* Hero Section - Mobile-first: minimal padding, expanded on desktop */}
      <section className="pt-12 md:pt-16 lg:pt-20 pb-2 md:pb-3 lg:pb-4 px-3 md:px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-2 md:mb-3"
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-1 md:mb-1.5 text-3d leading-tight">
              Find Your Perfect Photographer
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-3xl mx-auto px-1 leading-snug">
              Browse through our curated collection of India's finest wedding photographers
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <GlassPanel className="p-2 md:p-2.5 max-w-3xl mx-auto" hover={false}>
            <div className="flex flex-col md:flex-row gap-1 md:gap-2">
              {/* Search Input */}
              <div className="flex-1 relative min-w-0">
                <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 md:w-4 h-3.5 md:h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search photographers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-8 md:pl-9 pr-2 md:pr-3 py-1.5 md:py-2 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-xs md:text-sm"
                />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="btn-gold text-primary-foreground px-3 md:px-5 py-1.5 md:py-2 h-auto rounded-lg text-xs md:text-sm font-semibold w-full md:w-auto"
              >
                Search
              </Button>
            </div>
          </GlassPanel>

          {/* Results Count & Clear Filters */}
          <div className="max-w-3xl mx-auto flex items-center justify-between mt-1.5 md:mt-2 mb-0">
            <p className="text-muted-foreground text-xs">
              Found <span className="font-semibold text-foreground">{filteredPhotographers.length}</span>
            </p>
            {searchQuery && (
              <Button variant="ghost" onClick={clearFilters} className="text-xs p-0 h-auto">
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Photographers Grid - Mobile optimized */}
      <section className="py-2 md:py-4 lg:py-6 px-3 md:px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          {filteredPhotographers.length === 0 ? (
            <GlassPanel className="p-4 md:p-6 text-center max-w-2xl mx-auto" hover={false}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 mx-auto mb-2 rounded-lg bg-muted flex items-center justify-center"
              >
                <Search className="w-6 h-6 text-muted-foreground" />
              </motion.div>
              <h3 className="font-serif text-base md:text-lg font-semibold text-foreground mb-1">
                No Photographers Found
              </h3>
              <p className="text-muted-foreground mb-3 text-xs">
                Couldn't find photographers matching your search. Try adjusting filters.
              </p>
              <Button onClick={clearFilters} className="btn-gold text-primary-foreground rounded-lg text-xs md:text-sm">
                Clear Filters
              </Button>
            </GlassPanel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {filteredPhotographers.map((photographer, index) => (
                <FloatingCard3D
                  key={photographer.id}
                  delay={index * 0.1}
                  onClick={() => navigate(`/photographer/${photographer.id}`)}
                >
                  <div className="relative">
                    <img
                      src={photographer.gallery[0]}
                      alt={photographer.name}
                      className="w-full h-32 md:h-40 object-cover"
                    />
                    {photographer.verified && (
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-0.5">
                        <Award className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline">Verified</span>
                      </div>
                    )}
                    {photographer.featured && (
                      <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-rose-gold text-white text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-2 md:p-2.5">
                    <h3 className="font-serif text-xs md:text-sm font-semibold text-foreground mb-0.5 truncate">
                      {photographer.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1 truncate">
                      <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                      <span className="truncate text-xs">{photographer.city}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5 text-xs">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 text-primary fill-primary" />
                        <span className="font-semibold">{photographer.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({photographer.reviewCount})</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1.5 line-clamp-1">
                      {photographer.about}
                    </p>
                    <div className="flex flex-wrap gap-0.5 mb-1.5">
                      {photographer.categories.slice(0, 1).map((category, i) => (
                        <span key={i} className="px-1 py-0.5 rounded bg-muted text-xs font-medium text-muted-foreground truncate">
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-border/50">
                      <span className="text-xs font-medium text-primary">{photographer.priceRange}</span>
                      <Button variant="ghost" className="text-primary hover:text-primary/80 text-xs p-0 h-auto">
                        View →
                      </Button>
                    </div>
                  </div>
                </FloatingCard3D>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </Room3D>
  );
};

export default Photographers;
