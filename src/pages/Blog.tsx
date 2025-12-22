import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Room3D from '@/components/Room3D';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlassPanel from '@/components/GlassPanel';
import FloatingCard3D from '@/components/FloatingCard3D';
import { blogs } from '@/data/blogs';

const Blog = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <Room3D>
      <Header />
      <section className="pt-20 md:pt-28 pb-14 md:pb-18 px-3 md:px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-14">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-3 md:mb-4 text-3d leading-tight">Wedding Blog</h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2 leading-snug">Tips, trends, and inspiration for your perfect wedding</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {blogs.map((blog, index) => (
              <FloatingCard3D key={blog.id} delay={index * 0.1} onClick={() => navigate(`/blog/${blog.slug}`)}>
                <img src={blog.image} alt={blog.title} className="w-full h-56 md:h-60 object-cover" />
                <div className="p-5 md:p-6">
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">{blog.category}</span>
                  <h3 className="font-serif text-base md:text-lg font-semibold text-foreground mt-2 md:mt-2.5 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4">{blog.excerpt}</p>
                  <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                </div>
              </FloatingCard3D>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Room3D>
  );
};

export default Blog;
