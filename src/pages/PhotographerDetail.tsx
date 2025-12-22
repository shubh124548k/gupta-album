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
import { useAuth } from '@/contexts/AuthContext';
import { useReviews } from '@/contexts/ReviewsContext';
import { toast } from 'sonner';

const PhotographerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getReviewsForPhotographer, addReview, deleteReview } = useReviews();
  
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
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
    if (id) {
      const found = getPhotographerById(id);
      setPhotographer(found || null);
    }
  }, [id]);

  if (!photographer) {
    return (
      <Room3D>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-24">
          <GlassPanel className="p-12 text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">Photographer Not Found</h2>
            <p className="text-muted-foreground mb-6">The photographer you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/photographers')} className="btn-gold text-primary-foreground rounded-xl">
              Browse Photographers
            </Button>
          </GlassPanel>
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
    
    if (!isAuthenticated) {
      toast.error('Please sign in to post a review');
      navigate('/auth?mode=signin');
      return;
    }

    if (!reviewForm.text || reviewForm.text.length < 10) {
      toast.error('Please write a review with at least 10 characters');
      return;
    }

    setIsSubmittingReview(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addReview({
      photographerId: photographer.id,
      userId: user!.id,
      userName: user!.name,
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
      
      {/* Hero Section */}
      <section className="pt-28 pb-8 px-4">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link to="/photographers" className="hover:text-primary transition-colors">
              Photographers
            </Link>
            <span>/</span>
            <span className="text-foreground">{photographer.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <GlassPanel className="p-4 overflow-hidden" hover={false}>
                <div className="relative">
                  <motion.img
                    key={activeGalleryIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={photographer.gallery[activeGalleryIndex]}
                    alt={`${photographer.name} work`}
                    className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
                  />
                  
                  {/* Navigation */}
                  <button
                    onClick={() => setActiveGalleryIndex((prev) => (prev === 0 ? photographer.gallery.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setActiveGalleryIndex((prev) => (prev === photographer.gallery.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {photographer.verified && (
                      <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Verified
                      </div>
                    )}
                    {photographer.featured && (
                      <div className="px-3 py-1 rounded-full bg-rose-gold text-white text-sm font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {photographer.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveGalleryIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeGalleryIndex === index ? 'border-primary shadow-glow' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </GlassPanel>

              {/* About */}
              <GlassPanel className="p-8" hover={false}>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">{photographer.about}</p>
              </GlassPanel>

              {/* Services */}
              <GlassPanel className="p-8" hover={false}>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {photographer.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-background/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>

              {/* Videos */}
              {photographer.videos.length > 0 && (
                <GlassPanel className="p-8" hover={false}>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Videos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {photographer.videos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => { setActiveVideoIndex(index); setShowVideoModal(true); }}
                        className="relative aspect-video rounded-xl bg-muted flex items-center justify-center group overflow-hidden"
                      >
                        <img
                          src={photographer.gallery[index] || photographer.gallery[0]}
                          alt="Video thumbnail"
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                        <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </GlassPanel>
              )}

              {/* Reviews */}
              <GlassPanel className="p-8" hover={false}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    Reviews ({photographerReviews.length})
                  </h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <span className="font-semibold text-lg">{photographer.rating}</span>
                  </div>
                </div>

                {/* Review Form */}
                <form onSubmit={handleReviewSubmit} className="mb-8 p-6 rounded-xl bg-background/50">
                  <h3 className="font-medium text-foreground mb-4">Write a Review</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= reviewForm.rating ? 'text-primary fill-primary' : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  
                  <textarea
                    placeholder="Share your experience..."
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full p-4 rounded-xl bg-background border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    rows={4}
                  />
                  
                  <Button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="mt-4 btn-gold text-primary-foreground rounded-xl"
                  >
                    {isSubmittingReview ? 'Posting...' : 'Post Review'}
                  </Button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {photographerReviews.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No reviews yet. Be the first to review!
                    </p>
                  ) : (
                    photographerReviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-4 rounded-xl bg-background/50 border border-border/30"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-foreground">{review.userName}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                            {user && user.id === review.userId && (
                              <button
                                onClick={() => {
                                  deleteReview(review.id);
                                  toast.success('Review deleted');
                                }}
                                className="p-1 hover:bg-destructive/10 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{review.text}</p>
                      </motion.div>
                    ))
                  )}
                </div>
              </GlassPanel>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Card */}
              <GlassPanel className="p-6 sticky top-28" hover={false}>
                <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {photographer.name}
                </h1>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  {photographer.city}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <span className="font-semibold">{photographer.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({photographerReviews.length} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{photographer.experience} experience</span>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Price Range</p>
                  <p className="text-xl font-semibold text-primary">{photographer.priceRange}</p>
                </div>

                {/* Quick Contact */}
                <div className="space-y-3 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePhoneClick}
                    className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gold-gradient text-primary-foreground font-semibold shadow-glow"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </motion.button>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {photographer.categories.map((category, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                      {category}
                    </span>
                  ))}
                </div>
              </GlassPanel>

              {/* Contact Form */}
              <GlassPanel className="p-6" hover={false}>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Send Enquiry
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <textarea
                    placeholder="Your Message *"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full p-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold text-primary-foreground rounded-xl py-4 h-auto font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
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

      {/* Video Modal */}
      {showVideoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glass-panel rounded-2xl p-4 max-w-4xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={photographer.videos[activeVideoIndex]}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </Room3D>
  );
};

export default PhotographerDetail;
