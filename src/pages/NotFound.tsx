import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Room3D from '@/components/Room3D';
import GlassPanel from '@/components/GlassPanel';
import { Button } from '@/components/ui/button';

const NotFound = () => (
  <Room3D className="min-h-screen flex items-center justify-center px-3 md:px-4 py-8">
    <GlassPanel className="p-6 md:p-12 text-center max-w-md" hover={false}>
      <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} className="font-serif text-5xl md:text-6xl font-bold text-primary mb-4">404</motion.h1>
      <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">Page Not Found</h2>
      <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/"><Button className="btn-gold text-primary-foreground rounded-lg md:rounded-xl text-sm md:text-base"><Home className="w-4 h-4 mr-2" />Go Home</Button></Link>
    </GlassPanel>
  </Room3D>
);

export default NotFound;
