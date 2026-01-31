import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const VerticalsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const leftDoorRotate = useTransform(scrollYProgress, [0.1, 0.4], [0, -105]);
  const rightDoorRotate = useTransform(scrollYProgress, [0.1, 0.4], [0, 105]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.25, 0.4], [0.9, 1]);

  const services = {
    left: {
      title: "Website Design & Development",
      description: "Your brand deserves more than just a website. It deserves a digital experience.",
      details: "At VedInc, we don't just build websites — we build brand trust, user confidence, and business credibility."
    },
    right: {
      title: "Industry-Ready Training Hub",
      items: [
        { name: "Azure DevOps with AI-900", launching: true },
        { name: "Azure Cloud PC with Citrix", launching: true },
        { name: "Full Stack Development", launching: false },
        { name: "Azure Data Engineering", launching: true },
        { name: "AWS DevOps", launching: true }
      ]
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-[200vh] relative bg-gradient-dark overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Title */}
        <motion.h2
          style={{ opacity: contentOpacity }}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 text-4xl md:text-6xl font-display text-gradient z-20 tracking-wide"
        >
          Our Verticals
        </motion.h2>

        {/* Door Container */}
        <div className="relative w-full max-w-6xl h-[70vh] flex items-center justify-center" style={{ perspective: '1500px' }}>
          
          {/* Left Door */}
          <motion.div
            style={{ 
              rotateY: leftDoorRotate,
              transformOrigin: 'left center'
            }}
            className="absolute left-0 w-1/2 h-full bg-card/80 backdrop-blur-sm border border-border/30 rounded-r-none flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <div className="relative z-10 text-left max-w-md">
              <h3 className="text-xl md:text-2xl font-display text-foreground mb-4 tracking-wide">
                {services.left.title}
              </h3>
              <p className="text-primary text-base mb-4 italic">{services.left.description}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{services.left.details}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 px-5 py-2.5 bg-primary text-primary-foreground rounded font-medium text-sm tracking-wide"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Right Door */}
          <motion.div
            style={{ 
              rotateY: rightDoorRotate,
              transformOrigin: 'right center'
            }}
            className="absolute right-0 w-1/2 h-full bg-card/80 backdrop-blur-sm border border-border/30 rounded-l-none flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
            <div className="relative z-10 text-left max-w-md">
              <h3 className="text-xl md:text-2xl font-display text-foreground mb-4 tracking-wide">
                {services.right.title}
              </h3>
              <ul className="space-y-3 mb-6">
                {services.right.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{item.name}</span>
                    {item.launching && (
                      <Star className="w-4 h-4 text-primary fill-primary ml-1" />
                    )}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded text-xs font-medium tracking-wide">
                <Star className="w-3 h-3 fill-primary" />
                Launching Soon
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 ml-4 px-5 py-2.5 bg-primary text-primary-foreground rounded font-medium text-sm tracking-wide"
              >
                Explore Courses
              </motion.button>
            </div>
          </motion.div>

          {/* Center Content (revealed when doors open) */}
          <motion.div
            style={{ 
              opacity: contentOpacity,
              scale: contentScale
            }}
            className="absolute inset-0 flex items-center justify-center z-[-1]"
          >
            <div className="text-center">
              <p className="text-xl text-muted-foreground italic">Your Journey Starts Here</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;
