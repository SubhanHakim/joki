import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mascot from '../../assets/mascot.jpg';

export default function Navbar() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleEnterTerminal = () => {
        navigate('/chat');
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false); // Close menu on click

        if (window.lenis) {
            // Use Lenis for luxury smooth scroll
            window.lenis.scrollTo(`#${id}`, {
                offset: -100, // Negative value for top offset
                duration: 1.5, // Slower duration for smoother feel
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            // Fallback
            const element = document.getElementById(id);
            if (element) {
                const offset = 100;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1400px] mx-auto">
                <div className="flex items-center gap-3 relative z-50 group">
                    <div className="h-10 w-10 md:h-12 md:w-12 border border-gray-200 p-0.5 bg-gray-50 transition-transform group-hover:scale-105">
                        <img src={mascot} alt="ZYKO" className="h-full w-full object-cover transition-all font-mono" />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                        <span className="font-bold text-xl tracking-tighter text-black leading-none">ZYKO</span>
                    </div>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
                    <a href="#directives" onClick={(e) => handleScroll(e, 'directives')} className="text-gray-500 hover:text-green-600 transition-colors duration-200">[ Directives ]</a>
                    <a href="#architecture" onClick={(e) => handleScroll(e, 'architecture')} className="text-gray-500 hover:text-green-600 transition-colors duration-200">[ Architecture ]</a>
                    <a href="#code" onClick={(e) => handleScroll(e, 'code')} className="text-gray-500 hover:text-green-600 transition-colors duration-200">[ CLI ]</a>
                </div>

                {/* Enter Terminal Button (Desktop Only) */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={handleEnterTerminal}
                        className="bg-green-600 text-white px-6 py-2 text-xs font-bold font-mono tracking-wider hover:bg-green-700 transition-all duration-200 flex items-center gap-2 border border-green-600 clip-path-slant shadow-sm"
                    >
                        INITIALIZE_ZYKO
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden relative z-[101] p-2 text-gray-400 hover:text-white focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay - Full Screen with Solid White Background */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl h-screen w-screen z-[100] flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible delay-300'}`}>

                {/* Mobile Menu Logo */}
                <div className={`absolute top-8 left-6 transition-all duration-700 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 -translate-y-4 delay-0'}`}>
                    <div className="flex items-center gap-2">
                        <img src={mascot} alt="ZYKO" className="h-10 w-10 rounded-full border border-gray-200" />
                        <span className="font-black text-black text-2xl tracking-tighter">ZYKO</span>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-8">
                    {/* Mobile Nav Links with Staggered Animation */}
                    <a href="#directives" onClick={(e) => handleScroll(e, 'directives')}
                        className={`text-3xl font-bold text-gray-300 hover:text-white transition-all duration-500 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4 delay-100'}`}>
                        System Directives
                    </a>
                    <a href="#architecture" onClick={(e) => handleScroll(e, 'architecture')}
                        className={`text-3xl font-bold text-gray-300 hover:text-white transition-all duration-500 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4 delay-75'}`}>
                        Trust Architecture
                    </a>
                    <a href="#code" onClick={(e) => handleScroll(e, 'code')}
                        className={`text-3xl font-bold text-gray-300 hover:text-white transition-all duration-500 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4 delay-50'}`}>
                        CLI
                    </a>

                    {/* Mobile Launch Button */}
                    <div className={`pt-4 transition-all duration-500 ease-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-4 delay-0'}`}>
                        <button
                            onClick={() => { setIsMobileMenuOpen(false); handleEnterTerminal(); }}
                            className="bg-white text-black px-12 py-4 text-xl rounded-full font-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
                        >
                            START ZYKO
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
