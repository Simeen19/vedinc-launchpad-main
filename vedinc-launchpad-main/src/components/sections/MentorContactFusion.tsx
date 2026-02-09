import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, X } from 'lucide-react';
import mentorPic from '@/assets/barat_pic_final.png';
import { FunkyHeading } from "@/components/ui/FunkyHeading";

const MentorContactFusion = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yValues = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-black text-white overflow-hidden pt-20 px-4 md:px-12 flex items-center justify-center">

            {/* Geometric Shapes - Triangles - Spinning Animation */}
            <motion.div
                style={{ y: yValues }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[15%] left-[15%] w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-blue-600 border-r-[30px] border-r-transparent opacity-80 z-10"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-[20%] left-[25%] w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-sky-400 border-r-[20px] border-r-transparent opacity-80 z-10"
            />
             <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[10%] left-[22%] w-0 h-0 border-l-[15px] border-l-transparent border-b-[25px] border-b-indigo-500 border-r-[15px] border-r-transparent opacity-80 z-10"
            />


            {/* Mentor Image - Absolute Background */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-0 left-0 md:left-[15%] z-10 w-full md:w-auto flex items-end justify-center pointer-events-none"
            >
                <motion.img 
                    src={mentorPic} 
                    alt="Mentor" 
                    className="h-[60vh] md:h-[80vh] w-auto object-contain filter grayscale brightness-110 contrast-125 opacity-40 md:opacity-100" 
                style={{ transformOrigin: 'bottom center' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-20 w-full max-w-7xl h-full items-end">

                {/* Left Column: Vertical Text Only */}
                <div className="lg:col-span-4 flex relative h-full items-start lg:items-center">

                    {/* Vertical Text CONTACT */}
                    <div className="hidden lg:flex flex-col justify-between items-center mr-auto ml-10 h-[60vh] py-10">
                        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-none text-outline-gray tracking-widest" style={{ writingMode: 'vertical-rl', WebkitTextStroke: '2px #334155', color: 'transparent' }}>
                            CONTACT
                        </h2>
                         {/* Social Icons Stack */}
                        <div className="flex flex-col gap-6 mt-8">
                            <SocialIcon Icon={Facebook} link="https://facebook.com" />
                            <SocialIcon Icon={X} link="https://twitter.com" />
                            <SocialIcon Icon={Instagram} link="https://www.instagram.com/bharathreddy_sa/" />
                            <SocialIcon Icon={Linkedin} link="https://in.linkedin.com/in/bharath-reddy329" />
                        </div>
                    </div>

                </div>

                {/* Right Column: Content Area */}
                <div className="lg:col-span-8 flex flex-col justify-center lg:pl-0 pt-10 pb-20 lg:py-20 relative z-30">
                    <FunkyHeading className="text-4xl md:text-6xl text-white leading-tight mb-8 !bg-none !text-white !drop-shadow-none" headingLevel="h2">
                       Want to band together on a future-forward project?
                    </FunkyHeading>
                    
                    <p className="text-lg text-gray-400 mb-12 max-w-lg leading-relaxed">
                        We'd love to learn more about you and work together on your DevOps journey. 
                        Please get in touch with our expert mentor, Bharath Reddy.
                    </p>

                    <div className="space-y-6 mb-12">
                         <ContactItem icon={<Phone className="text-cyan-400" size={20} />} text="+91 9705255161" />
                         <ContactItem icon={<Mail className="text-cyan-400" size={20} />} text="bharath@vedinc.in" />
                         <ContactItem icon={<MapPin className="text-cyan-400" size={20} />} text="Hyderabad, India" />
                    </div>

                    <div className="mb-10 lg:mb-0">
                        <Link to="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: '#22d3ee', color: '#000' }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-10 py-4 text-sm font-bold tracking-widest uppercase transition-colors"
                            >
                                Get In Touch
                            </motion.button>
                        </Link>
                    </div>

                     {/* Mobile Social Icons - In Flow */}
                     <div className="lg:hidden flex gap-6 mt-4">
                            <SocialIcon Icon={Facebook} link="https://facebook.com" />
                            <SocialIcon Icon={X} link="https://twitter.com" />
                            <SocialIcon Icon={Instagram} link="https://www.instagram.com/bharathreddy_sa/" />
                            <SocialIcon Icon={Linkedin} link="https://in.linkedin.com/in/bharath-reddy329" />
                     </div>

                </div>

            </div>
        </section>
    );
};

const SocialIcon = ({ Icon, link }: { Icon: any, link: string }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
        <Icon size={24} />
    </a>
)

const ContactItem = ({ icon, text }: { icon: any, text: string }) => (
    <div className="flex items-center gap-4">
        {icon}
        <span className="text-lg font-bold text-gray-100">{text}</span>
    </div>
)

export default MentorContactFusion;
