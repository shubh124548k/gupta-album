import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FloatingCard3DProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

const FloatingCard3D = ({ children, className = '', delay = 0, onClick }: FloatingCard3DProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ 
        y: -15, 
        rotateY: 5,
        rotateX: 5,
        scale: 1.03,
        transition: { duration: 0.4 }
      }}
      onClick={onClick}
      className={cn(
        "card-3d glass-panel rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer",
        "transform-gpu backface-hidden active:scale-95",
        className
      )}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 -translate-x-full hover:translate-x-full" 
           style={{ transition: 'transform 0.8s ease-out' }} 
      />
      {children}
    </motion.div>
  );
};

export default FloatingCard3D;
