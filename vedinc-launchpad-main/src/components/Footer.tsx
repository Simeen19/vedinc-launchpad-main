import {
    Instagram,
    Linkedin,
    Phone,
    MessageCircle,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative mt-24 border-t border-white/10 bg-gradient-to-b from-[#0b1624] to-[#060d18]">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Top section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3
                            className="text-xl font-semibold text-white"
                            style={{ fontFamily: '"Times New Roman", Times, serif' }}
                        >
                            VedInc
                        </h3>
                        <p className="mt-2 text-sm text-white/60 italic tracking-widest">
                            IT, SUPER SIMPLIFIED
                        </p>
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-5">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-icon"
                        >
                            <Instagram size={20} />
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-icon"
                        >
                            <Linkedin size={20} />
                        </a>

                        <a
                            href="https://wa.me/9705255161"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-icon"
                        >
                            <MessageCircle size={20} />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-white/10" />

                {/* Bottom */}
                <div className="text-center text-xs text-white/50 tracking-wide">
                    © {new Date().getFullYear()} VedInc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
