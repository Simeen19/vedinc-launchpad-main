import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import VerticalsSection from '@/components/sections/VerticalsSection';
import ToolsSection from '@/components/sections/ToolsSection';
import MentorSection from '@/components/sections/MentorSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="verticals">
        <VerticalsSection />
      </section>

      <section id="tools">
        <ToolsSection />
      </section>

      <section id="mentor">
        <MentorSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />

    </div>
  );
};

export default Index;
