import { motion } from 'framer-motion';
import VantaBackground from '../VantaBackground';

const HeroSection = () => {
  // stagger container for heading lines
  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };
  const heroItem = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <VantaBackground className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={heroContainer}
        >
            <motion.h1
              variants={heroItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold shimmer-text floating"              style={{
                fontFamily: '"Times New Roman", Times, serif',
                letterSpacing: '0.04em'
              }}
            >
              Simplifying IT. Powering Growth.
            </motion.h1>

            <motion.p
              variants={heroItem}
            className="mt-6 text-base md:text-lg text-white/90 italic max-w-2xl mx-auto"              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Cloud · Dev · Automation
            </motion.p>
        </motion.div>



      </motion.div>
    </VantaBackground>
  );
};

export default HeroSection;
