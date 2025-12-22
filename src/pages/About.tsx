import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Camera } from 'lucide-react';
import Room3D from '@/components/Room3D';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlassPanel from '@/components/GlassPanel';

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <Room3D>
      <Header />
      <section className="pt-20 md:pt-28 pb-14 md:pb-18 px-3 md:px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-14">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-3 md:mb-4 text-3d leading-tight">About Gupta Album</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-2 leading-snug">India's Premier Wedding Photography Platform</p>
          </motion.div>
          <GlassPanel className="p-6 md:p-8 mb-8 md:mb-10 border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-transparent shadow-lg" hover={false}>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-5">
              Gupta Album was founded with a singular vision: to connect couples with the finest wedding photographers across India. We believe every love story deserves to be captured beautifully, with artistry and elegance that stands the test of time.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Our platform brings together verified, talented photographers who specialize in capturing the magic of weddings – from traditional ceremonies to contemporary celebrations, from intimate gatherings to grand festivities.
            </p>
          </GlassPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {[
              { icon: Camera, title: 'Verified Artists', desc: 'Every photographer is carefully vetted for quality and professionalism.' },
              { icon: Heart, title: 'Love Stories', desc: 'We help capture moments that will be cherished for generations.' },
              { icon: Award, title: 'Excellence', desc: 'Committed to connecting you with the best talent in the industry.' },
              { icon: Users, title: 'Trust', desc: 'Thousands of happy couples have found their perfect photographer through us.' },
            ].map((item, i) => (
              <GlassPanel key={i} delay={i * 0.1} className="p-5 md:p-6 text-center border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-transparent shadow-md">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-lg bg-gold-gradient flex items-center justify-center shadow-glow">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{item.desc}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Room3D>
  );
};

export default About;
