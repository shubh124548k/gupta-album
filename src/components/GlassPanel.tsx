import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const GlassPanel = ({ children, className = '', hover = true, delay = 0 }: GlassPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)"
      } : undefined}
      className={cn(
        "glass-panel rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-500 overflow-x-hidden",
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;
