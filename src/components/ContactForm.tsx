import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-4 relative">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-panel text-sm font-medium text-primary mb-4">
            Get In Touch
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? We’re here to help.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-panel p-6 md:p-8 shadow-lg rounded-2xl">

            {/* 🔥 NETLIFY FORM (FINAL) */}
            <form
              name="contact"
              method="POST"
              action="/success"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-4 md:space-y-5"
            >
              {/* REQUIRED HIDDEN FIELDS */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border"
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-gold py-3 rounded-lg font-semibold"
              >
                Send Message
              </Button>
            </form>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
