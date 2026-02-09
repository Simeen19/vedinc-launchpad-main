import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { FunkyHeading } from "@/components/ui/FunkyHeading";

// --- Logo Imports ---
import azureLogo from '@/assets/azure-color-removebg-preview.png';
import dockerLogo from '@/assets/docker_logo-removebg-preview.png';
import k8sLogo from '@/assets/OIP-removebg-preview.png';
import gitLogo from '@/assets/git-removebg-preview.png';
import jenkinsLogo from '@/assets/Jenkins-removebg-preview.png';
import terraformLogo from '@/assets/terraform-logo-removebg-preview.png';
import linuxLogo from '@/assets/linux-tux-logo-png-transparent-svg-vector-bie-supply-14.png';
import pythonLogo from '@/assets/python logo.png';
import ansibleLogo from '@/assets/ansible-nobg-removebg-preview.png';
import helmLogo from '@/assets/helm_logo-removebg-preview.png';
import prometheusLogo from '@/assets/prometheous_logo-removebg-preview.png';
import grafanaLogo from '@/assets/Grafana-removebg-preview.png';
import vsCodeLogo from '@/assets/vsc_logo-removebg-preview.png';
import azureBoardsLogo from '@/assets/azure-boards-removebg-preview.png';
import azureReposLogo from '@/assets/azure_repos.png';
import azurePipelinesLogo from '@/assets/azure-pipelines-removebg-preview.png';
import azureTestPlansLogo from '@/assets/Icon-AzureTestPlans.png';
import azureArtifactsLogo from '@/assets/azure-artifacts.png';
import istioLogo from '@/assets/Istio-removebg-preview.png';

const tools = [
  { name: 'Azure', logo: azureLogo, size: 140, mobileSize: 90, isCenter: true, glow: 'rgba(0, 120, 212, 0.6)' },
  { name: 'Docker', logo: dockerLogo, size: 90, mobileSize: 60, glow: 'rgba(36, 150, 237, 0.5)' },
  { name: 'Kubernetes', logo: k8sLogo, size: 100, mobileSize: 65, glow: 'rgba(50, 108, 230, 0.5)' },
  { name: 'Terraform', logo: terraformLogo, size: 85, mobileSize: 55, glow: 'rgba(132, 73, 229, 0.5)' },
  { name: 'Python', logo: pythonLogo, size: 85, mobileSize: 55, glow: 'rgba(55, 115, 165, 0.5)' },
  { name: 'Linux', logo: linuxLogo, size: 90, mobileSize: 60, glow: 'rgba(255, 215, 0, 0.4)' },
  { name: 'Git', logo: gitLogo, size: 80, mobileSize: 45, glow: 'rgba(240, 80, 50, 0.5)' },
  { name: 'Ansible', logo: ansibleLogo, size: 80, mobileSize: 45, glow: 'rgba(255, 255, 255, 0.3)' },
  { name: 'Helm', logo: helmLogo, size: 80, mobileSize: 45, glow: 'rgba(15, 172, 230, 0.5)' },
  { name: 'Prometheus', logo: prometheusLogo, size: 85, mobileSize: 55, glow: 'rgba(230, 82, 44, 0.5)' },
  { name: 'Grafana', logo: grafanaLogo, size: 85, mobileSize: 55, glow: 'rgba(244, 104, 34, 0.5)' },
  { name: 'VS Code', logo: vsCodeLogo, size: 75, mobileSize: 45, glow: 'rgba(0, 122, 204, 0.5)' },
  { name: 'Azure Boards', logo: azureBoardsLogo, size: 85, mobileSize: 55, glow: 'rgba(0, 120, 212, 0.5)' },
  { name: 'Azure Repos', logo: azureReposLogo, size: 85, mobileSize: 55, glow: 'rgba(255, 80, 0, 0.5)' },
  { name: 'Azure Pipelines', logo: azurePipelinesLogo, size: 85, mobileSize: 55, glow: 'rgba(0, 100, 200, 0.5)' },
  { name: 'Azure Test Plans', logo: azureTestPlansLogo, size: 85, mobileSize: 55, glow: 'rgba(0, 180, 0, 0.5)' },
  { name: 'Azure Artifacts', logo: azureArtifactsLogo, size: 85, mobileSize: 55, glow: 'rgba(200, 50, 200, 0.5)' },
  { name: 'Istio', logo: istioLogo, size: 85, mobileSize: 55, glow: 'rgba(70, 107, 186, 0.5)' },
];

const StarBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const FloatingTool = ({ tool, index, pos, mouseX, mouseY }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scale and offset adjustment to keep tools visible and out of heading/footer
  const scale = isMobile ? 0.45 : 1;
  const horizontalSpread = isMobile ? 0.8 : 1.1; // Pack tighter horizontally on mobile
  const verticalStretch = isMobile ? 1.4 : 0.8; // Stretch vertically on mobile to use screen height

  const finalX = pos.x * scale * horizontalSpread;
  const finalY = pos.y * scale * verticalStretch + (isMobile ? 50 : 20); // Shift down slightly

  const x = useSpring(useTransform(mouseX, [-500, 500], [finalX - 12, finalX + 12]), { stiffness: 50, damping: 35 });
  const y = useSpring(useTransform(mouseY, [-300, 300], [finalY - 8, finalY + 8]), { stiffness: 50, damping: 35 });

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <motion.div 
        whileHover={{ scale: 1.1, zIndex: 100 }} 
        className="relative group flex flex-col items-center cursor-pointer"
      >
        <div 
          className="absolute inset-0 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: tool.glow, transform: 'scale(1.3)' }}
        />

        <motion.div
          animate={{ y: [0, (index % 2 === 0 ? -5 : 5), 0] }}
          transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <img
            src={tool.logo}
            alt={tool.name}
            style={{ width: isMobile ? tool.mobileSize : tool.size }}
            className="object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          />
          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white text-[10px] md:text-xs font-semibold bg-[#0f172a]/95 border border-white/20 px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap backdrop-blur-md shadow-2xl">
            {tool.name}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ToolsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const positions = useMemo(() => {
    const posArr: { x: number; y: number }[] = [];
    
    // We'll organize tools into "Orbits" with explicit safe counts
    // Orbit count distribution
    const orbits = [
      { radius: 0, items: 1 },    // Center (Azure)
      { radius: 220, items: 5 },  // Ring 1
      { radius: 400, items: 6 },  // Ring 2
      { radius: 560, items: 6 }   // Ring 3
    ];
    
    let currentItem = 0;

    orbits.forEach((orbit, orbitIdx) => {
      for (let i = 0; i < orbit.items; i++) {
        if (currentItem >= tools.length) break;
        
        const tool = tools[currentItem];
        if (tool.isCenter) {
          posArr.push({ x: 0, y: 0 });
          currentItem++;
          continue;
        }

        const angle = (2 * Math.PI * i) / orbit.items + (orbitIdx * 0.5); // Stagger rings
        const radius = orbit.radius;
        
        // Add minimal jitter to avoid looking like a rigid grid, but keep within bounds
        const jitter = 25;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * jitter;
        const y = Math.sin(angle) * radius + (Math.random() - 0.5) * jitter;

        posArr.push({ x, y });
        currentItem++;
      }
    });

    // Handle any remaining items if the counts didn't match (fallback)
    while (posArr.length < tools.length) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 600 + Math.random() * 100;
      posArr.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
    }

    return posArr;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen relative bg-[#01040f] overflow-hidden flex flex-col items-center pt-32 pb-24"
    >
      <StarBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center relative z-30 mb-20 pointer-events-none px-4"
      >
        <FunkyHeading className="text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 font-black">
          Tools & Technologies
        </FunkyHeading>
        <p className="text-blue-400/60 mt-4 text-sm md:text-base tracking-[0.2em] uppercase font-medium">
          The Powerhouse of Our Innovation
        </p>
      </motion.div>

      <div className="relative h-[650px] md:h-[750px] w-full max-w-7xl z-20 flex items-center justify-center">
        {tools.map((tool, index) => (
          <FloatingTool 
            key={tool.name} 
            tool={tool} 
            index={index} 
            pos={positions[index]}
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,18,45,0.4),transparent_70%)] pointer-events-none" />
    </section>
  );
};
export default ToolsSection;