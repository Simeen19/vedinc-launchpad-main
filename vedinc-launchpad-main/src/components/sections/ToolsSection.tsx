import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';

const tools = [
  { name: 'Azure', size: 'xl', color: '#0078D4' },
  { name: 'Docker', size: 'lg', color: '#2496ED' },
  { name: 'Kubernetes', size: 'lg', color: '#326CE5' },
  { name: 'Git', size: 'md', color: '#F05032' },
  { name: 'Jenkins', size: 'md', color: '#D24939' },
  { name: 'Terraform', size: 'lg', color: '#7B42BC' },
  { name: 'Linux', size: 'md', color: '#FCC624' },
  { name: 'Python', size: 'md', color: '#3776AB' },
  { name: 'AWS', size: 'lg', color: '#FF9900' },
  { name: 'Ansible', size: 'sm', color: '#EE0000' },
  { name: 'Helm', size: 'sm', color: '#0F1689' },
  { name: 'Prometheus', size: 'md', color: '#E6522C' },
  { name: 'Grafana', size: 'sm', color: '#F46800' },
  { name: 'VS Code', size: 'sm', color: '#007ACC' },
];

const sizeClasses = {
  xl: 'text-4xl md:text-5xl font-semibold',
  lg: 'text-2xl md:text-3xl font-medium',
  md: 'text-lg md:text-xl',
  sm: 'text-sm md:text-base',
};

interface FloatingToolProps {
  tool: typeof tools[0];
  index: number;
  mouseX: any;
  mouseY: any;
}

const FloatingTool = ({ tool, index, mouseX, mouseY }: FloatingToolProps) => {
  // Calculate position in a scattered layout - Azure in center
  const isAzure = tool.name === 'Azure';
  
  let baseX: number, baseY: number;
  
  if (isAzure) {
    baseX = 0;
    baseY = 0;
  } else {
    const angle = ((index - 1) / (tools.length - 1)) * Math.PI * 2;
    const radius = 200 + (index % 3) * 80;
    baseX = Math.cos(angle) * radius;
    baseY = Math.sin(angle) * radius * 0.6;
  }
  
  const offsetX = isAzure ? 0 : Math.sin(index * 1.7) * 40;
  const offsetY = isAzure ? 0 : Math.cos(index * 1.7) * 30;
  
  const x = useSpring(useTransform(mouseX, [-500, 500], [baseX + offsetX - 15, baseX + offsetX + 15]), {
    stiffness: 40,
    damping: 25
  });
  
  const y = useSpring(useTransform(mouseY, [-300, 300], [baseY + offsetY - 10, baseY + offsetY + 10]), {
    stiffness: 40,
    damping: 25
  });

  const floatDelay = index * 0.2;

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: floatDelay,
        duration: 0.5,
        type: "spring"
      }}
      whileHover={{ 
        scale: 1.1,
        zIndex: 10
      }}
      className="absolute left-1/2 top-1/2 cursor-pointer"
    >
      <motion.div
        animate={{
          y: [0, isAzure ? -10 : -8, 0],
        }}
        transition={{
          duration: 3 + index * 0.15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay
        }}
        className="flex flex-col items-center"
      >
        <span 
          className={`${sizeClasses[tool.size as keyof typeof sizeClasses]} font-display tracking-wider transition-all duration-300`}
          style={{
            color: tool.color,
            textShadow: `0 0 20px ${tool.color}40`,
          }}
        >
          {tool.name}
        </span>
      </motion.div>
    </motion.div>
  );
};

const ToolsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="tools"
      className="min-h-screen relative bg-background overflow-hidden py-20"
    >
      <motion.div style={{ opacity }} className="relative z-10">
        {/* Title */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-gradient mb-3 tracking-wide"
          >
            Tools & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-muted-foreground italic"
          >
            Industry-standard tools that companies actually use
          </motion.p>
        </div>

        {/* Floating Tools Container */}
        <div className="relative h-[550px] max-w-5xl mx-auto">
          {tools.map((tool, index) => (
            <FloatingTool
              key={tool.name}
              tool={tool}
              index={index}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ToolsSection;
