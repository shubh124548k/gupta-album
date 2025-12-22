import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <footer className="relative mt-16 md:mt-20">
      {/* 3D Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/50 to-cream" />
      
      <div className="relative glass-panel rounded-t-3xl md:rounded-t-[3rem] mx-2 md:mx-4 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center shadow-glow"
                >
                  <Camera className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Gupta Album</h2>
                  <p className="text-sm text-muted-foreground">Premium Wedding Photography</p>
                </div>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                India's premier platform connecting couples with the finest wedding photographers. 
                Capturing your love story with artistry and elegance.
              </p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  href="#"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-primary hover:shadow-glow transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  href="#"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-primary hover:shadow-glow transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -3 }}
                  href="#"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-primary hover:shadow-glow transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-semibold text-foreground">Quick Links</h3>
              <nav className="space-y-3">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/photographers', label: 'Find Photographers' },
                  { path: '/blog', label: 'Wedding Blog' },
                  { path: '/about', label: 'About Us' },
                ].map((link) => (
                  <motion.div key={link.path} whileHover={{ x: 5 }}>
                    <Link
                      to={link.path}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-semibold text-foreground">Contact Us</h3>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePhoneClick('7003208167')}
                  className="flex items-center gap-3 w-full glass-panel rounded-xl p-3 hover:shadow-glow transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Call Us Now
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePhoneClick('9330564851')}
                  className="flex items-center gap-3 w-full glass-panel rounded-xl p-3 hover:shadow-glow transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Alternate Number
                  </span>
                </motion.button>

                <a
                  href="mailto:navinbusinessgupta@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">navinbusinessgupta@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 Gupta Album. All rights reserved.
              </p>
              
              {/* Webscraft Studio Credit */}
              <motion.a
                href="https://webscraftstudio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.02 }}
              >
                <div 
                  className="relative px-6 py-3 rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                    transform: 'perspective(500px) rotateX(2deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-champagne/20 via-rose-gold/20 to-champagne/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* 3D Text */}
                  <p 
                    className="relative text-sm font-medium"
                    style={{
                      background: 'linear-gradient(135deg, hsl(38, 60%, 35%), hsl(15, 45%, 45%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transform: 'translateZ(10px)'
                    }}
                  >
                    Website Designed & Developed by <span className="font-bold">Webscraft Studio</span>
                  </p>
                </div>
              </motion.a>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
