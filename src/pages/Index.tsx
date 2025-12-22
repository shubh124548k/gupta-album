import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Room3D from '@/components/Room3D';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlassPanel from '@/components/GlassPanel';
import FloatingCard3D from '@/components/FloatingCard3D';
import { Button } from '@/components/ui/button';
import { getFeaturedPhotographers } from '@/data/photographers';
import { getRecentBlogs } from '@/data/blogs';
import { Star, Camera, Heart, Award, Users, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const featuredPhotographers = getFeaturedPhotographers();
  const recentBlogs = getRecentBlogs(3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Room3D>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 md:pt-32 pb-12 md:pb-20 px-3 md:px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs font-medium text-primary mb-3 md:mb-4">❤️ India's Premier Wedding Photography Platform</span>
            <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground text-3d leading-[1.1] md:leading-[1.15]">
                Capture Your
              </h1>
              <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold text-3d leading-[1.1] md:leading-[1.15] mt-1 md:mt-2" style={{
                backgroundImage: 'linear-gradient(to right, #d97706, #f59e0b, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Perfect Moments
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2 leading-snug mt-4 md:mt-6">
              Connect with India's finest wedding photographers. From traditional ceremonies to contemporary celebrations, find the artist who tells your love story.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-8 md:mt-10 max-w-2xl mx-auto"
          >
            <Button
              onClick={() => {
                const auth = localStorage.getItem('user') ? true : false;
                if (!auth) {
                  navigate('/auth?mode=signin');
                } else {
                  navigate('/photographers');
                }
              }}
              className="btn-gold text-primary-foreground px-8 md:px-10 py-3 md:py-4 h-auto rounded-lg font-semibold text-base md:text-lg w-full sm:w-auto"
            >
              Browse Photographers
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              variant="outline"
              className="px-8 md:px-10 py-3 md:py-4 h-auto rounded-lg font-semibold text-base md:text-lg border-2 w-full sm:w-auto hover:bg-primary/5"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-14 px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Camera, value: '500+', label: 'Photographers' },
              { icon: Users, value: '10,000+', label: 'Happy Couples' },
              { icon: Award, value: '50+', label: 'Cities' },
              { icon: Clock, value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <GlassPanel key={index} delay={index * 0.1} className="text-center p-5 md:p-6 border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-rose-gold/5 shadow-lg">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="w-14 h-14 mx-auto mb-3 md:mb-4 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-glow"
                >
                  <stat.icon className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Photographers */}
      <section className="py-12 md:py-16 px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs md:text-sm font-medium text-primary mb-3 md:mb-4">
              Featured Artists
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-3 md:mb-4 text-3d leading-tight">
              Top Wedding Photographers
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Discover our handpicked selection of India's most talented wedding photographers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
            {featuredPhotographers.map((photographer, index) => (
              <FloatingCard3D
                key={photographer.id}
                delay={index * 0.15}
                onClick={() => navigate(`/photographer/${photographer.id}`)}
                className="h-full"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent rounded-lg md:rounded-xl">
                  <img
                    src={photographer.gallery[0]}
                    alt={photographer.name}
                    className="w-full h-56 md:h-60 object-cover"
                  />
                  {photographer.verified && (
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                  {photographer.featured && (
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 px-3 py-1 rounded-full bg-rose-gold text-white text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-1.5">
                    {photographer.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm mb-2.5">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    {photographer.city}
                  </div>
                  <div className="flex items-center gap-2 mb-3 md:mb-3.5">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="font-semibold text-sm">{photographer.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-xs md:text-sm">({photographer.reviewCount})</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2 leading-snug">
                    {photographer.about}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {photographer.categories.slice(0, 2).map((category, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-muted text-xs font-medium text-muted-foreground">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <span className="text-xs md:text-sm font-medium text-primary">{photographer.priceRange}</span>
                    <Button variant="ghost" className="text-primary hover:text-primary/80 text-xs md:text-sm h-auto px-0">
                      View →
                    </Button>
                  </div>
                </div>
              </FloatingCard3D>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button
              onClick={() => navigate('/photographers')}
              className="btn-gold text-primary-foreground px-8 py-4 h-auto rounded-lg text-base font-semibold"
            >
              View All Photographers
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs md:text-sm font-medium text-primary mb-3 md:mb-4">
              Simple Process
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-3 md:mb-4 text-3d leading-tight">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-max">
            {[
              {
                step: '01',
                title: 'Search & Discover',
                description: 'Browse through our curated collection of verified photographers based on your location, style, and budget.',
              },
              {
                step: '02',
                title: 'Compare & Connect',
                description: 'Review portfolios, read genuine reviews, and connect directly with photographers who match your vision.',
              },
              {
                step: '03',
                title: 'Book & Celebrate',
                description: 'Finalize your booking with confidence and let the magic of your wedding day be captured perfectly.',
              },
            ].map((item, index) => (
              <GlassPanel key={index} delay={index * 0.2} className="relative p-6 md:p-7 border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-transparent shadow-md overflow-visible">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                    className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-glow border border-primary/20"
                  >
                    <span className="text-primary-foreground font-bold text-sm">{item.step}</span>
                  </motion.div>
                </div>
                <div className="text-center pt-3">
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-snug">
                    {item.description}
                  </p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 md:py-16 px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs md:text-sm font-medium text-primary mb-3 md:mb-4">
              Wedding Insights
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-3 md:mb-4 text-3d leading-tight">
              From Our Blog
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-snug">
              Tips, trends, and inspiration for your perfect wedding
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {recentBlogs.map((blog, index) => (
              <FloatingCard3D
                key={blog.id}
                delay={index * 0.15}
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 md:h-60 object-cover"
                />
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      {blog.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                  </div>
                  <h3 className="font-serif text-base md:text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4">
                    {blog.excerpt}
                  </p>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 text-xs md:text-sm">
                    Read More →
                  </Button>
                </div>
              </FloatingCard3D>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6 md:mt-8"
          >
            <Button
              onClick={() => navigate('/blog')}
              variant="outline"
              className="px-8 py-3 h-auto rounded-lg text-sm md:text-base font-medium border-2 hover:bg-primary/5"
            >
              View All Articles
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-14 px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <GlassPanel className="p-8 md:p-10 lg:p-12 text-center border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-rose-gold/5 shadow-lg" hover={false}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3 md:mb-4 text-3d leading-tight">
                Ready to Find Your Perfect Photographer?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-snug">
                Join thousands of happy couples who found their dream wedding photographer through Gupta Album.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <Button
                  onClick={() => navigate('/photographers')}
                  className="btn-gold text-primary-foreground px-8 py-3 h-auto rounded-lg text-sm md:text-base font-semibold w-full sm:w-auto"
                >
                  Browse Photographers
                </Button>
                <Button
                  onClick={() => navigate('/auth?mode=signup')}
                  variant="outline"
                  className="px-8 py-3 h-auto rounded-lg text-sm md:text-base font-medium border-2 w-full sm:w-auto"
                >
                  Create Account
                </Button>
              </div>
            </motion.div>
          </GlassPanel>
        </div>
      </section>

      <Footer />
    </Room3D>
  );
};

export default Index;
