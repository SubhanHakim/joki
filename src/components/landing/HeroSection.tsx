import { useNavigate } from 'react-router-dom';
import dexscreenerIcon from '../../assets/dexscreener.svg';

export default function HeroSection() {
    const navigate = useNavigate();

    const handleEnterTerminal = () => {
        navigate('/chat');
    };

    return (
        <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
                Connecting Intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">Across Systems</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                Nexora is a modern intelligence layer designed to unify models, logic, and workflows into a single scalable foundation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                {/* X Link */}
                <a href="https://x.com/nexora_key" target="_blank" className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white flex items-center gap-2 transition-all duration-300 group">
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    <span>Follow Protocol</span>
                </a>

                {/* Dexscreener Link */}
                <a href="#" target="_blank" className="px-6 py-3 rounded-full bg-[#1e2329]/50 hover:bg-[#2b323b]/80 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white flex items-center gap-2 transition-all duration-300 font-medium">
                    <img src={dexscreenerIcon} alt="Dexscreener" className="w-5 h-5" />
                    <span>Dexscreener</span>
                </a>

                {/* Dashboard Entry */}
                <button
                    onClick={handleEnterTerminal}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-red-600 to-blue-600 hover:opacity-90 text-white font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                    <span>Enter Terminal</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
            </div>
        </div>
    );
}
