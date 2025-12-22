import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { photographers } from '@/data/photographers';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    photographer: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (!formData.name || !formData.email || !formData.message) {
    toast.error("Please fill all required fields");
    setIsSubmitting(false);
    return;
  }

  try {
    const selectedPhotographer = photographers.find(
      p => p.id === formData.photographer
    );

    const response = await fetch("/.netlify/functions/send-enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,

        photographerName: selectedPhotographer?.name || "General Enquiry",
        photographerEmail: selectedPhotographer?.email || null,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send enquiry");
    }

    setIsSuccess(true);
    toast.success("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      photographer: "",
    });

    setTimeout(() => setIsSuccess(false), 2000);
  } catch (error) {
    console.error(error);
    toast.error("Failed to send message. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <section className="py-14 md:py-20 px-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-xs md:text-sm font-medium text-primary mb-3 md:mb-4">
            Get In Touch
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-3 md:mb-4 text-3d leading-tight">
            Contact Us
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-snug">
            Have questions or need assistance? We're here to help you find the perfect photographer for your special day.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-panel p-6 md:p-8 lg:p-10 border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-rose-gold/5 shadow-lg relative">
            {/* Success State */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-2xl md:rounded-3xl flex items-center justify-center bg-gradient-to-br from-green-50/95 to-emerald-50/95 backdrop-blur-sm z-50"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="mb-4 md:mb-6"
                  >
                    <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-emerald-600 mx-auto" />
                  </motion.div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-emerald-900 mb-2 md:mb-3">
                    Thank You!
                  </h3>
                  <p className="text-sm md:text-base text-emerald-800">
                    We've received your message and will get back to you shortly.
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                  <User className="w-3.5 h-3.5 inline mr-1.5" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                  <Mail className="w-3.5 h-3.5 inline mr-1.5" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                  <Phone className="w-3.5 h-3.5 inline mr-1.5" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXX XXXX XX"
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Photographer Selection */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                  Photographer (Optional)
                </label>
                <select
                  name="photographer"
                  value={formData.photographer}
                  onChange={handleChange}
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base text-muted-foreground"
                >
                  <option value="">Select a photographer</option>
                  {photographers.map(photographer => (
                    <option key={photographer.id} value={photographer.id}>
                      {photographer.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-foreground mb-2">
                  <MessageSquare className="w-3.5 h-3.5 inline mr-1.5" />
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your vision for your wedding day..."
                  rows={5}
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm md:text-base placeholder:text-muted-foreground/50 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold text-primary-foreground py-3 md:py-3.5 h-auto rounded-lg font-semibold text-base md:text-base mt-2 md:mt-3"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>

              {/* Form Note */}
              <p className="text-xs md:text-sm text-muted-foreground text-center">
                We respect your privacy. Your information will be used only to respond to your inquiry.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
