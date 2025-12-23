import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Award, Phone, Mail, Clock, ChevronLeft, ChevronRight, Play, Send, Trash2 } from 'lucide-react';
import Room3D from '@/components/Room3D';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlassPanel from '@/components/GlassPanel';
import { Button } from '@/components/ui/button';
import { getPhotographerById, Photographer } from '@/data/photographers';
import { useReviews } from '@/contexts/ReviewsContext';
import { toast } from 'sonner';

const PhotographerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReviewsForPhotographer, addReview, deleteReview } = useReviews();
  
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  
  // Contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Review form
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    text: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    if (id) {
      // Safely convert id to number for lookup
      const numId = parseInt(id, 10);
      const found = getPhotographerById(String(numId));
      setPhotographer(found || null);
    }
    
    setIsLoading(false);
  }, [id]);

  // Show loading state
  if (isLoading) {
    return (
      <Room3D>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-24 px-4">
          <GlassPanel className="p-8 md:p-12 text-center max-w-md">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded" />
            </div>
          </GlassPanel>
        </div>
        <Footer />
      </Room3D>
    );
  }

  // Show not found state with proper fallback UI
  if (!photographer) {
    return (
      <Room3D>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20 md:pt-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassPanel className="p-8 md:p-12 text-center max-w-md">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3 md:mb-4 text-foreground">
                Photographer Not Found
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                The photographer you're looking for doesn't exist. Please check the ID or browse our collection.
              </p>
              <Button 
                onClick={() => navigate('/photographers')} 
                className="btn-gold text-primary-foreground rounded-xl w-full"
              >
                Browse All Photographers
              </Button>
            </GlassPanel>
          </motion.div>
        </div>
        <Footer />
      </Room3D>
    );
  }

  const photographerReviews = getReviewsForPhotographer(photographer.id);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Enquiry sent successfully! The photographer will contact you soon.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewForm.text || reviewForm.text.length < 10) {
      toast.error('Please write a review with at least 10 characters');
      return;
    }

    setIsSubmittingReview(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addReview({
      photographerId: photographer.id,
      userId: `u${Date.now()}`,
      userName: 'Anonymous User',
      rating: reviewForm.rating,
      text: reviewForm.text
    });
    
    toast.success('Review posted successfully!');
    setReviewForm({ rating: 5, text: '' });
    setIsSubmittingReview(false);
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${photographer.phone}`;
  };

  return (
    <Room3D>
      <Header />
      
      {/* Hero Section - Mobile optimized */}
      <section className="pt-20 md:pt-28 pb-6 md:pb-8 px-3 md:px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-6 md:mb-8 overflow-x-auto"
          >
            <Link to="/photographers" className="hover:text-primary transition-colors whitespace-nowrap">
              Photographers
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-foreground truncate">{photographer?.name || 'Unknown'}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Gallery - Responsive with fixed aspect ratio */}
              <GlassPanel className="p-3 md:p-4 overflow-hidden" hover={false}>
                <div className="relative w-full aspect-square md:aspect-video">
                  <motion.img
                    key={activeGalleryIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={photographer?.gallery?.[activeGalleryIndex] || 'https://via.placeholder.com/800x600?text=No+Image'}
                    alt={`${photographer?.name || 'Photographer'} work`}
                    className="w-full h-full object-cover rounded-lg md:rounded-xl"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Failed';
                    }}
                  />
                  
                  {/* Navigation - Mobile optimized buttons */}
                  {(photographer?.gallery?.length ?? 0) > 1 && (
                    <>
                      <button
                        onClick={() => setActiveGalleryIndex((prev) => (prev === 0 ? (photographer?.gallery?.length ?? 1) - 1 : prev - 1))}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full glass-panel flex items-center justify-center hover:scale-110 transition-transform z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 md:w-6 h-5 md:h-6" />
                      </button>
                      <button
                        onClick={() => setActiveGalleryIndex((prev) => (prev === (photographer?.gallery?.length ?? 1) - 1 ? 0 : prev + 1))}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full glass-panel flex items-center justify-center hover:scale-110 transition-transform z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 flex gap-2 flex-wrap">
                    {photographer?.verified && (
                      <div className="px-2 md:px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-medium flex items-center gap-1 whitespace-nowrap">
                        <Award className="w-3 md:w-4 h-3 md:h-4" />
                        <span className="hidden sm:inline">Verified</span>
                      </div>
                    )}
                    {photographer?.featured && (
                      <div className="px-2 md:px-3 py-1 rounded-full bg-rose-gold text-white text-xs md:text-sm font-medium whitespace-nowrap">
                        <span className="hidden sm:inline">Featured</span>
                        <span className="sm:hidden">⭐</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnails - Responsive scrollable */}
                {(photographer?.gallery?.length ?? 0) > 1 && (
                  <div className="flex gap-1 md:gap-2 mt-3 md:mt-4 overflow-x-auto pb-2">
                    {photographer?.gallery?.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveGalleryIndex(index)}
                        className={`flex-shrink-0 w-16 md:w-20 h-16 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          activeGalleryIndex === index ? 'border-primary shadow-glow' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img 
                          src={img} 
                          alt="" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/80x80';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </GlassPanel>

              {/* About */}
              <GlassPanel className="p-4 md:p-8" hover={false}>
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">About</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {photographer?.about || 'No description available'}
                </p>
              </GlassPanel>

              {/* Services */}
              {(photographer?.services?.length ?? 0) > 0 && (
                <GlassPanel className="p-4 md:p-8" hover={false}>
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">Services</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {photographer?.services?.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-background/50"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm md:text-base text-foreground">{service}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlassPanel>
              )}

              {/* Videos */}
              {(photographer?.videos?.length ?? 0) > 0 && (
                <GlassPanel className="p-4 md:p-8" hover={false}>
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">Videos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {photographer?.videos?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => { setActiveVideoIndex(index); setShowVideoModal(true); }}
                        className="relative aspect-video rounded-lg md:rounded-xl bg-muted flex items-center justify-center group overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <img
                          src={photographer?.gallery?.[index] || photographer?.gallery?.[0] || 'https://via.placeholder.com/400x300'}
                          alt="Video thumbnail"
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Video';
                          }}
                        />
                        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                        <div className="relative w-12 md:w-16 h-12 md:h-16 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                          <Play className="w-6 md:w-8 h-6 md:h-8 text-primary-foreground ml-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </GlassPanel>
              )}

              {/* Reviews */}
              <GlassPanel className="p-4 md:p-8" hover={false}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                    Reviews ({photographerReviews?.length ?? 0})
                  </h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 md:w-5 h-4 md:h-5 text-primary fill-primary" />
                    <span className="font-semibold text-base md:text-lg">{photographer?.rating?.toFixed(1) ?? 'N/A'}</span>
                  </div>
                </div>

                {/* Review Form */}
                <form onSubmit={handleReviewSubmit} className="mb-6 md:mb-8 p-3 md:p-6 rounded-lg md:rounded-xl bg-background/50">
                  <h3 className="font-medium text-foreground mb-3 md:mb-4 text-sm md:text-base">Write a Review</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3 md:mb-4 flex-wrap">
                    <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 md:w-6 h-5 md:h-6 transition-colors ${
                              star <= reviewForm.rating ? 'text-primary fill-primary' : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <textarea
                    placeholder="Share your experience..."
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-sm md:text-base"
                    rows={4}
                  />
                  
                  <Button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full mt-3 md:mt-4 btn-gold text-primary-foreground rounded-lg md:rounded-xl text-sm md:text-base"
                  >
                    {isSubmittingReview ? 'Posting...' : 'Post Review'}
                  </Button>
                </form>

                {/* Reviews List */}
                <div className="space-y-3 md:space-y-4">
                  {(photographerReviews?.length ?? 0) === 0 ? (
                    <p className="text-center text-sm md:text-base text-muted-foreground py-6 md:py-8">
                      No reviews yet. Be the first to review!
                    </p>
                  ) : (
                    photographerReviews?.map((review) => (
                      <motion.div
                        key={review?.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background/50 border border-border/30"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground text-sm md:text-base truncate">{review?.userName || 'Anonymous'}</h4>
                            <div className="flex items-center gap-0.5 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 md:w-4 h-3 md:h-4 ${
                                    i < (review?.rating ?? 0) ? 'text-primary fill-primary' : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                            {review?.date || 'N/A'}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">{review?.text || 'No text'}</p>
                      </motion.div>
                    ))
                  )}
                </div>
              </GlassPanel>
            </div>

            {/* Sidebar - Mobile responsive */}
            <div className="space-y-4 md:space-y-6">
              {/* Info Card */}
              <GlassPanel className="p-4 md:p-6 sticky top-20 md:top-28 z-40" hover={false}>
                <h1 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2">
                  {photographer?.name || 'Photographer'}
                </h1>
                
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{photographer?.city || 'Location Unknown'}</span>
                </div>

                <div className="flex items-center gap-4 mb-4 md:mb-6 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 md:w-5 h-4 md:h-5 text-primary fill-primary flex-shrink-0" />
                    <span className="font-semibold text-sm md:text-base">{photographer?.rating?.toFixed(1) ?? 'N/A'}</span>
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    ({photographerReviews?.length ?? 0} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{photographer?.experience || 'Experience Unknown'}</span>
                </div>

                <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-primary/10 mb-4 md:mb-6">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Price Range</p>
                  <p className="text-base md:text-xl font-semibold text-primary">{photographer?.priceRange || 'N/A'}</p>
                </div>

                {/* Quick Contact */}
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePhoneClick}
                    className="w-full flex items-center justify-center gap-2 p-3 md:p-4 rounded-lg md:rounded-xl bg-gold-gradient text-primary-foreground font-semibold shadow-glow text-sm md:text-base"
                  >
                    <Phone className="w-4 md:w-5 h-4 md:h-5" />
                    Call Now
                  </motion.button>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {photographer?.categories?.map((category, i) => (
                    <span key={i} className="px-2 md:px-3 py-1 rounded-full bg-muted text-xs md:text-sm font-medium text-muted-foreground">
                      {category}
                    </span>
                  ))}
                </div>
              </GlassPanel>

              {/* Contact Form - Full width on mobile */}
              <GlassPanel className="p-4 md:p-6" hover={false}>
                <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">
                  Send Enquiry
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-3 md:space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 md:p-3 rounded-lg md:rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2 md:p-3 rounded-lg md:rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-2 md:p-3 rounded-lg md:rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base"
                  />
                  <textarea
                    placeholder="Your Message *"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full p-2 md:p-3 rounded-lg md:rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-sm md:text-base"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold text-primary-foreground rounded-lg md:rounded-xl py-2 md:py-4 h-auto font-semibold text-sm md:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 md:w-5 h-4 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 md:w-5 h-4 md:h-5" />
                        Send Enquiry
                      </span>
                    )}
                  </Button>
                </form>
              </GlassPanel>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Video Modal - Responsive */}
      {showVideoModal && photographer?.videos?.[activeVideoIndex] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-3 md:p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glass-panel rounded-lg md:rounded-2xl p-2 md:p-4 max-w-4xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={photographer.videos[activeVideoIndex]}
              className="w-full h-full rounded-lg md:rounded-xl"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      )}
    </Room3D>
  );
};

export default PhotographerDetail;
