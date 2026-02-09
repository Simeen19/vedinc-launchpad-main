import { motion } from 'framer-motion';
import VantaBackground from '../VantaBackground';
import vedinbg from '@/assets/vedinbg1.png';

const HeroSection = () => {
  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <VantaBackground className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <motion.div
          className="relative flex flex-col items-center"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.img
            variants={heroItem}
            src={vedinbg}
            alt="Vedinc Logo"
            className="h-16 md:h-24 lg:h-28 w-auto mx-auto object-contain"
            style={{
              filter:
                'drop-shadow(0px 0px 6px rgba(40, 40, 40, 0.9)) ' +
                'drop-shadow(0px 0px 16px rgba(90, 90, 90, 0.45)) ' +
                'drop-shadow(0px 0px 28px rgba(0, 0, 0, 0.25))',
              marginBottom: '-0.2rem',
            }}
          />

          {/* Subheading */}
          <motion.p
            variants={heroItem}
            className="mt-1 text-sm md:text-base text-white font-semibold font-sans tracking-wide uppercase"
          >
            IT, SUPER SIMPLIFIED
          </motion.p>
        </motion.div>
      </motion.div>
    </VantaBackground>
  );
};

export default HeroSection;
