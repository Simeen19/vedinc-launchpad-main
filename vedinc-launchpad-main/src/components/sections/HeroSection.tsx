import { motion } from 'framer-motion';
import VantaBackground from '../VantaBackground';
import vedinbg from '@/assets/vedinbg.png';
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
          className="relative flex flex-col items-center"
          variants={heroContainer}
        >
          {/* The Logo: Using scale and negative margin to tighten the layout */}
          <motion.img
            variants={heroItem}
            src={vedinbg}
            alt="Vedinc Logo"
            className="h-32 md:h-48 lg:h-56 w-auto mx-auto object-contain"
            style={{
              transform: "scale(1.8)", // Blows up the logo graphic within its space
              filter: "drop-shadow(0px 0px 20px rgba(0, 212, 255, 0.3))", // Subtle cyan glow to match your accents
              marginBottom: "-1rem" // Pulls the paragraph text up closer
            }}
          />

          <motion.p
            variants={heroItem}
            className="mt-0 text-base md:text-lg text-white/90 italic max-w-2xl mx-auto"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              letterSpacing: "0.1em",
            }}
          >
            IT, SUPER SIMPLIFIED
          </motion.p>
        </motion.div>
      </motion.div>
    </VantaBackground>
  );
};

export default HeroSection;
