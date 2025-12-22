import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, User, LogOut, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/photographers', label: 'Photographers' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleSignOut = () => {
    setIsMenuOpen(false);
    signOut();
    navigate('/');
  };

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
              {isAuthenticated ? (
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs md:text-sm font-medium">{user?.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-muted-foreground hover:text-foreground text-xs md:text-sm px-2"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/auth?mode=signin">
                    <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground text-xs md:text-sm px-2">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button className="btn-gold text-primary-foreground px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
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
              <div className="pt-4 border-t border-border/50 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 py-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                      className="w-full justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth?mode=signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="btn-gold w-full text-primary-foreground rounded-xl">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
