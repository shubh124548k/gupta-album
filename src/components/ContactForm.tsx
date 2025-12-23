import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground">
            We'd love to hear from you.
          </p>
        </motion.div>

        {/* FORM */}
        <div className="max-w-2xl mx-auto glass-panel p-6 rounded-2xl">

          <form
            action="https://formsubmit.co/navinguta133@gmail.com"
            method="POST"
          >
            {/* REQUIRED FORM SUBMIT CONFIG */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_next"
              value="https://melodic-dolphin-73c253.netlify.app/contact"
            />

            {/* Name */}
            <div className="mb-4">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-3 border rounded"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 border rounded"
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label>Message *</label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full p-3 border rounded"
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
