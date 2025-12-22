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
      
      {/* Auth Modal Overlay */}
      {showAuthModal && !isAuthenticated && (
        <div 
          className="fixed inset-0 z-40 flex items-center justify-center px-4"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
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
            className="relative z-50 w-full max-w-md"
          >
            <GlassPanel className="p-8 md:p-10 border border-primary/20 relative" hover={false}>
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  navigate('/');
                }}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="text-center mb-6 md:mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
                  Unlock Our Gallery
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-snug">
                  Create an account or sign in to browse our curated collection of wedding photographers and view their stunning portfolios.
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3 md:space-y-4">
                <Button
                  onClick={handleCreateAccount}
                  className="w-full btn-gold text-primary-foreground py-3 md:py-3.5 h-auto rounded-lg font-semibold text-base md:text-base"
                >
                  Create Account
                </Button>
                <Button
                  onClick={handleSignIn}
                  variant="outline"
                  className="w-full py-3 md:py-3.5 h-auto rounded-lg font-semibold text-base border-2 hover:bg-primary/5"
                >
                  Sign In
                </Button>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/');
                  }}
                  className="w-full text-muted-foreground hover:text-foreground text-sm md:text-base py-2 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border/50 space-y-2 md:space-y-3 text-xs md:text-sm text-muted-foreground text-center">
                <p>✓ Verified Photographers</p>
                <p>✓ Genuine Reviews</p>
                <p>✓ Secure Booking</p>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      )}
      
      {/* Hero Section - EXTREME mobile optimization */}
      <section className="pt-2 md:pt-10 lg:pt-14 pb-0 md:pb-1 lg:pb-2 px-2 md:px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-0.5 md:mb-1.5 px-0"
          >
            <h1 className="font-serif text-lg sm:text-xl md:text-5xl lg:text-6xl font-bold text-foreground mb-0 md:mb-1 text-3d leading-tight">
              Perfect Photographer
            </h1>
            <p className="text-xs md:text-base text-muted-foreground max-w-3xl mx-auto px-0 leading-snug hidden md:block">
              Browse our finest wedding photographers
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <GlassPanel className="p-1 md:p-2 max-w-3xl mx-auto" hover={false}>
            <div className="flex flex-col md:flex-row gap-0.5 md:gap-1.5">
              {/* Search Input */}
              <div className="flex-1 relative min-w-0">
                <Search className="absolute left-1.5 md:left-2.5 top-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Find..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-6 md:pl-8 pr-1 md:pr-2.5 py-0.5 md:py-1 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-xs md:text-sm"
                />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="btn-gold text-primary-foreground px-2 md:px-3 py-0.5 md:py-1 h-auto rounded-lg text-xs md:text-sm font-semibold w-full md:w-auto"
              >
                Go
              </Button>
            </div>
          </GlassPanel>

          {/* Results Count */}
          <div className="max-w-3xl mx-auto flex items-center justify-between mt-0.5 md:mt-1 mb-0 px-0">
            <p className="text-muted-foreground text-xs">
              <span className="font-semibold text-foreground">{filteredPhotographers.length}</span>
            </p>
            {searchQuery && (
              <Button variant="ghost" onClick={clearFilters} className="text-xs p-0 h-auto">
                ✕
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Photographers Grid */}
      <section className="py-0.5 md:py-2 lg:py-3 px-2 md:px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl px-0">
          {filteredPhotographers.length === 0 ? (
            <GlassPanel className="p-2.5 md:p-4 text-center max-w-2xl mx-auto" hover={false}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 mx-auto mb-1 rounded-lg bg-muted flex items-center justify-center"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
              </motion.div>
              <h3 className="font-serif text-sm font-semibold text-foreground mb-0.5">
                No Results
              </h3>
              <p className="text-muted-foreground mb-2 text-xs">
                Try adjusting search.
              </p>
              <Button onClick={clearFilters} className="btn-gold text-primary-foreground rounded-lg text-xs py-1 px-2">
                Clear
              </Button>
            </GlassPanel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 lg:gap-3">
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
                      className="w-full h-24 md:h-32 object-cover"
                    />
                    {photographer.verified && (
                      <div className="absolute top-0.5 left-0.5 px-1 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-0.5">
                        <Award className="w-1.5 h-1.5" />
                      </div>
                    )}
                    {photographer.featured && (
                      <div className="absolute top-0.5 right-0.5 px-1 py-0.5 rounded-full bg-rose-gold text-white text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-1 md:p-1.5">
                    <h3 className="font-serif text-xs md:text-sm font-semibold text-foreground mb-0 truncate">
                      {photographer.name}
                    </h3>
                    <div className="flex items-center gap-0.5 text-muted-foreground text-xs mb-0.5 truncate">
                      <MapPin className="w-2 h-2 flex-shrink-0" />
                      <span className="truncate text-xs">{photographer.city}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-0.5 text-xs">
                      <Star className="w-2 h-2 text-primary fill-primary" />
                      <span className="font-semibold">{photographer.rating}</span>
                      <span className="text-muted-foreground">({photographer.reviewCount})</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-0.5 line-clamp-1">
                      {photographer.about}
                    </p>
                    <div className="flex flex-wrap gap-0.5 mb-0.5">
                      {photographer.categories.slice(0, 1).map((category, i) => (
                        <span key={i} className="px-0.5 py-0.5 rounded bg-muted text-xs font-medium text-muted-foreground truncate">
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-0.5 border-t border-border/50">
                      <span className="text-xs font-medium text-primary">{photographer.priceRange}</span>
                      <Button variant="ghost" className="text-primary hover:text-primary/80 text-xs p-0 h-auto">
                        →
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
