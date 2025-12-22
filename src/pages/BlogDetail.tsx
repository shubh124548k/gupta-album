import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, User, ImageIcon } from 'lucide-react';
import Room3D from '@/components/Room3D';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlassPanel from '@/components/GlassPanel';
import { getBlogBySlug } from '@/data/blogs';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = getBlogBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  if (!blog) {
    return (
      <Room3D>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-24 px-4">
          <GlassPanel className="p-6 md:p-12 text-center">
            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4">Blog Not Found</h2>
            <button onClick={() => navigate('/blog')} className="btn-gold text-primary-foreground px-6 py-3 rounded-lg md:rounded-xl text-sm md:text-base">Back to Blog</button>
          </GlassPanel>
        </div>
        <Footer />
      </Room3D>
    );
  }

  // Parse content into sections with better structure
  const renderContent = () => {
    const lines = blog.content.split('\n').filter(line => line.trim());
    const sections: React.ReactNode[] = [];
    let currentSection: { title?: string; items: string[] } | null = null;
    let itemIndex = 0;

    lines.forEach((line, idx) => {
      if (line.startsWith('# ')) {
        if (currentSection && currentSection.items.length > 0) {
          sections.push(renderSection(currentSection, itemIndex++));
        }
        currentSection = { title: line.replace('# ', '').trim(), items: [] };
      } else if (line.startsWith('## ')) {
        if (currentSection && currentSection.items.length > 0) {
          sections.push(renderSection(currentSection, itemIndex++));
        }
        currentSection = { title: line.replace('## ', '').trim(), items: [] };
      } else if (line.startsWith('- ')) {
        if (!currentSection) currentSection = { items: [] };
        currentSection.items.push(line.replace('- ', '').trim());
      } else if (line.trim() && !line.startsWith('---')) {
        if (!currentSection) currentSection = { items: [] };
        if (!line.match(/^\*.*\*$|^`.*`$/)) {
          currentSection.items.push(line.trim());
        }
      }
    });

    if (currentSection && currentSection.items.length > 0) {
      sections.push(renderSection(currentSection, itemIndex));
    }

    return sections;
  };

  const renderSection = (section: { title?: string; items: string[] }, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassPanel className="p-6 md:p-8 mb-6 md:mb-8 border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-rose-gold/5 shadow-lg" hover={false}>
        {section.title && (
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-5 pb-3 md:pb-4 border-b border-primary/20">
            {section.title}
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          <div className="space-y-4">
            {section.items.slice(0, Math.ceil(section.items.length / 2)).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + i) * 0.05 }}
                className="flex gap-3 items-start"
              >
                <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-primary-foreground">{i + 1}</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed pt-0.5">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="space-y-4">
            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-56 md:h-72 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 flex items-center justify-center overflow-hidden group"
            >
              <div className="text-center space-y-2">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <ImageIcon className="w-12 h-12 text-primary/40 mx-auto" />
                </motion.div>
                <p className="text-xs md:text-sm text-muted-foreground">Image Placeholder</p>
              </div>
            </motion.div>
            {/* Additional content for second column */}
            {section.items.slice(Math.ceil(section.items.length / 2)).map((item, i) => (
              <motion.div
                key={i + Math.ceil(section.items.length / 2)}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + i + Math.ceil(section.items.length / 2)) * 0.05 }}
                className="flex gap-3 items-start"
              >
                <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-primary-foreground">{Math.ceil(section.items.length / 2) + i + 1}</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed pt-0.5">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );

  return (
    <Room3D>
      <Header />
      <section className="pt-20 md:pt-28 pb-14 md:pb-18 px-3 md:px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 md:mb-8 text-xs md:text-sm group">
              <motion.div
                whileHover={{ x: -4 }}
              >
                <ChevronLeft className="w-4 h-4 group-hover:text-primary transition-colors" />
              </motion.div>
              Back to Blog
            </Link>
          </motion.div>

          {/* Main Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassPanel className="p-0 border border-primary/10 overflow-hidden mb-8 md:mb-10 shadow-xl" hover={false}>
              {/* Hero Image */}
              <motion.img
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />

              {/* Header Content */}
              <div className="p-6 md:p-10 lg:p-12 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-8"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm"
                  >
                    {blog.category}
                  </motion.span>
                  <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {blog.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {blog.readTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {blog.author}
                    </div>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight text-3d"
                >
                  {blog.title}
                </motion.h1>

                {/* SEO Meta Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl"
                >
                  Comprehensive guide covering essential information about {blog.title.toLowerCase()}. Read on to discover key insights and expert tips.
                </motion.p>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Content Sections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {renderContent()}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <GlassPanel className="p-8 md:p-10 text-center border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-rose-gold/5 shadow-lg mt-12 md:mt-16" hover={false}>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                Ready to Find Your Perfect Photographer?
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
                Browse through our curated collection of verified wedding photographers and turn your wedding vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/photographers')}
                  className="btn-gold text-primary-foreground px-8 py-3 h-auto rounded-lg text-sm md:text-base font-semibold w-full sm:w-auto"
                >
                  Browse Photographers
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/blog')}
                  className="px-8 py-3 h-auto rounded-lg text-sm md:text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5 w-full sm:w-auto"
                >
                  More Articles
                </motion.button>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>
      <Footer />
    </Room3D>
  );
};

export default BlogDetail;
