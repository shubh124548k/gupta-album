import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Camera } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/photographers', label: 'Photographers' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="mx-3 md:mx-4 mt-1.5 md:mt-2">
        <div className="glass-panel rounded-xl px-4 md:px-6 py-1.5 md:py-2.5 overflow-x-hidden">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gold-gradient flex items-center justify-center shadow-glow flex-shrink-0"
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="font-serif text-base md:text-lg font-bold text-foreground leading-tight">Gupta Album</h1>
                <p className="text-xs text-muted-foreground">Wedding Photos</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <span className={`text-xs md:text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
                  }`}>
                    {link.label}
                  </span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2.5 lg:gap-3">
              {/* Removed auth buttons - accessible to all */}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`block py-2 font-medium ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
