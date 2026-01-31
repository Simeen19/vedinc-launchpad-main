import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import vedinbg from '@/assets/vedinbg.png';

const navItems = ['Home', 'Course', 'Tools', 'About', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (item: string) => {
    const sectionMap: Record<string, string> = {
      'Home': 'hero',
      'Course': 'verticals',
      'Tools': 'tools',
      'About': 'mentor',
      'Contact': 'contact'
    };
    const element = document.getElementById(sectionMap[item]);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent`}
    >
      <div className="container mx-auto px-6 py-4 md:py-6 lg:py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.img
            src={vedinbg}
            alt="VEDINBG logo"
            className="h-20 md:h-24 lg:h-28 w-auto cursor-pointer"
            style={{ background: 'transparent', filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.36))' }}
            whileHover={{ scale: 1.04 }}
            onClick={() => scrollToSection('Home')}
          />

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-foreground font-medium"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
            >
              Signup
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
