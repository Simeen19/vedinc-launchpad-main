import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    VANTA: any;
    p5?: any;
  }
} 

interface VantaBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const VantaBackground = ({ children, className = '' }: VantaBackgroundProps) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    const loadVanta = async () => {
      try {
        if (!vantaRef.current) return;
        console.log('Vanta: importing p5...');
        const p5Module = await import('p5');
        (window as any).p5 = p5Module && (p5Module.default || p5Module);
        console.log('Vanta: p5 loaded ->', !!(window as any).p5);

        const VANTA = await import('vanta/dist/vanta.topology.min');
        console.log('Vanta: module loaded ->', !!VANTA);

        if (!vantaEffect) {
          const effect = VANTA.default({
            el: vantaRef.current,
            p5: (window as any).p5,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            points: 16,
            spacing: 18,
            maxDistance: 40,
            speed: 1.2,
            showDots: true,
            color: 0x20b6f2,
            backgroundColor: 0x0e1010
          });
          setVantaEffect(effect);
         console.log('Vanta: effect created');}
      } catch (err) {
        console.error('Vanta init error:', err);
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
        console.log('Vanta: destroyed');
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className={`relative ${className} ${!vantaEffect ? 'vanta-fallback' : ''}`}
      data-vanta-status={vantaEffect ? 'ready' : 'loading'}
    >
      {children}
    </div>
  );
};

export default VantaBackground;
