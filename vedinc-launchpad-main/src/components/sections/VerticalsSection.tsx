import { motion, useScroll, useTransform } from 'framer-motion';
import { FunkyHeading } from "@/components/ui/FunkyHeading";
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const VerticalsSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const leftDoorRotate = useTransform(scrollYProgress, [0.1, 0.4], [0, -105]);
  const rightDoorRotate = useTransform(scrollYProgress, [0.1, 0.4], [0, 105]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.25, 0.45], [0.95, 1]);

  const services = {
    left: {
      title: "Website Design & Development",
      description: "Your brand deserves more than just a website. It deserves a digital experience.",
      details: "At VedInc, we don't just build websites, we build brand trust, user confidence, and business credibility."
    },
    right: {
      title: "Industry-Ready Training Hub",
      items: [
        { name: "Azure DevOps with AI-900", launching: false },
        { name: "Azure Cloud PC with Citrix", launching: false },
        { name: "Full Stack Development", launching: true },
        { name: "Azure Data Engineering", launching: true },
        { name: "AWS DevOps", launching: true }
      ]
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[90vh] md:min-h-[120vh] relative bg-gradient-dark overflow-hidden font-sans"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden px-4">

        {/* Header - Changed to font-display and font-bold to match Tools & Tech */}
        <div className="py-12 md:mb-12 z-50 relative text-center">
          <FunkyHeading className="text-5xl md:text-7xl">
            Courses
          </FunkyHeading>
        </div>

        <div className="relative w-full max-w-6xl h-[75vh] md:h-[65vh] flex items-center justify-center" style={{ perspective: '1500px' }}>

          {/* Left Door */}
          <motion.div
            style={{
              rotateY: leftDoorRotate,
              transformOrigin: 'left center'
            }}
            className="absolute left-0 w-1/2 h-full bg-card/80 backdrop-blur-sm border border-border/30 rounded-r-none z-20 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          </motion.div>

          {/* Right Door */}
          <motion.div
            style={{
              rotateY: rightDoorRotate,
              transformOrigin: 'right center'
            }}
            className="absolute right-0 w-1/2 h-full bg-card/80 backdrop-blur-sm border border-border/30 rounded-l-none z-20 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
          </motion.div>

          {/* Center Content */}
          <motion.div
            style={{
              opacity: contentOpacity,
              scale: contentScale
            }}
            className="absolute inset-0 z-30 flex flex-col items-center overflow-y-auto scrollbar-hide"
          >
            <div className="w-full px-6 md:px-16 max-w-5xl pt-10 pb-20 md:pt-0 md:pb-0 md:h-full md:flex md:items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 w-full">

                {/* Left Side Section - Title updated to font-display font-bold */}
                <div className="flex flex-col space-y-6">
                  <div className="text-left space-y-4">
                    <FunkyHeading headingLevel="h3" className="text-2xl md:text-3xl text-foreground">
                      {services.left.title}
                    </FunkyHeading>
                    <p className="text-primary text-base italic">{services.left.description}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{services.left.details}</p>
                  </div>
                  
                  <div className="text-left">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2.5 bg-primary text-primary-foreground rounded font-semibold text-sm tracking-wide"
                      onClick={() => navigate("/website-previews")}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>

                {/* Right Side Section - Title updated to font-display font-bold */}
                <div className="flex flex-col space-y-6 border-l-0 md:border-l border-white/10 pl-0 md:pl-12">
                  <div className="text-left space-y-4">
                    <FunkyHeading headingLevel="h3" className="text-2xl md:text-3xl text-foreground">
                      {services.right.title}
                    </FunkyHeading>
                    <ul className="space-y-3">
                      {services.right.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_rgba(var(--primary),0.5)]" />
                          <span className="font-medium">{item.name}</span>
                          {item.launching && (
                            <Star className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-left flex flex-wrap items-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/industry-hub")}
                      className="px-6 py-2.5 border border-primary text-primary rounded font-normal text-sm tracking-wide"
                    >
                      Explore Courses
                    </motion.button>

                    <div className="flex items-center gap-2 text-primary text-xs font-normal tracking-wide">
                      <Star className="w-3 h-3 fill-primary animate-pulse" />
                      Launching Soon
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;