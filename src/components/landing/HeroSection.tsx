import { useNavigate } from 'react-router-dom';
import mascot from '../../assets/mascot.jpg';
import dexscreener from '../../assets/dexscreener.svg';
import VelocityScroll from '../ui/velocity-scroll';

export default function HeroSection() {
    const navigate = useNavigate();

    const handleEnterTerminal = () => {
        navigate('/chat');
    };

    return (
        <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden text-gray-900 pt-28 pb-20 md:pt-48 md:pb-32 px-4 md:px-8">
            {/* Horizontal Separators with Scale Markers */}
            <div className="absolute top-28 md:top-48 inset-x-0 h-px bg-gray-200 z-0">
                <div className="absolute left-10 md:left-20 -top-1.5 w-3 h-3 bg-gray-900 rounded-full"></div>
                <div className="absolute right-10 md:right-20 -top-1.5 w-3 h-3 bg-white border-2 border-gray-900 rounded-full"></div>
            </div>
            <div className="absolute bottom-20 md:bottom-32 inset-x-0 h-px bg-gray-200 z-0"></div>

            {/* Background Decorative - Left Vertical Line */}
            <div className="absolute left-8 md:left-16 top-28 md:top-48 bottom-0 w-px bg-gray-100 hidden md:block"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center">

                {/* Left Column: Narrative Typography */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-100 border border-gray-200 text-xs font-mono text-green-600">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                        </span>
                        IDENTITY_CONFIRMED // STORY_MODE
                    </div>

                    <div className="relative">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                            ZYKO, <br />
                            Leader of the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Radpals</span>
                        </h1>
                    </div>

                    <div className="relative lg:pl-8 lg:border-l-4 border-gray-900">
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-xl font-bold leading-tight mx-auto lg:mx-0 text-center lg:text-left">
                            A leader without a crown. Not elected—followed. In the noise of the network, he is the only clear signal.
                        </p>
                        <div className="mt-4 flex gap-2 justify-center lg:justify-start">
                            <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-mono font-bold text-gray-500 uppercase rounded">Sentience: High</span>
                            <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-mono font-bold text-gray-500 uppercase rounded">Origin: Unknown</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 sm:pt-4">
                        {/* Social Links - Now the Primary Action */}
                        <div className="flex gap-4">
                            {/* X Button - Brutalist White */}
                            <a href="https://x.com/Zyko_world" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-14 h-14 bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>

                            {/* DexScreener Button - Brutalist Black & Green */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-14 h-14 bg-gray-900 border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] transition-all">
                                <img src={dexscreener} alt="DexScreener" className="w-6 h-6 brightness-0 invert" />
                            </a>
                        </div>

                        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-gray-500">
                            <span>[ EST: 2025 ]</span>
                            <span>[ MOOD: ZYKO ]</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: ID Card Visual */}
                <div className="lg:col-span-5 relative max-w-sm mx-auto lg:max-w-none">
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 border-t border-r border-white/20"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 border-b border-l border-white/20"></div>

                    <div className="relative bg-white border border-gray-200 p-3 shadow-[20px_20px_0px_rgba(0,0,0,0.05)] transition-all duration-500 group hover:translate-y-[-5px] hover:shadow-[25px_25px_0px_rgba(34,197,94,0.1)]">
                        {/* Technical Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-900"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gray-900"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gray-900"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-900"></div>

                        {/* ID Header */}
                        <div className="flex justify-between items-center p-4 border-b-2 border-gray-100 mb-2">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">Entity Identifier</span>
                                <span className="text-2xl font-black font-mono tracking-tighter text-gray-900">ZK-88</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <div className="h-6 w-12 bg-gray-100 border border-gray-200 flex items-center justify-center">
                                    <span className="text-[8px] font-mono font-bold">GEN.1</span>
                                </div>
                            </div>
                        </div>

                        {/* ID Image */}
                        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 mb-2 border border-gray-100">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10"></div>
                            <img src={mascot} alt="ZYKO AGENT" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />

                            {/* Overlay UI */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                <div className="bg-white/95 backdrop-blur-sm border border-gray-200 p-2 flex justify-between items-center shadow-lg">
                                    <span className="font-mono text-xs font-bold text-gray-900">STATE: AWAKE</span>
                                    <div className="flex gap-0.5">
                                        <div className="w-1 h-3 bg-green-500"></div>
                                        <div className="w-1 h-3 bg-green-500"></div>
                                        <div className="w-1 h-3 bg-green-500"></div>
                                        <div className="w-1 h-3 bg-green-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ID Stats - Bar Code Aesthetic */}
                        <div className="grid grid-cols-4 gap-2 pt-2">
                            <div className="col-span-3 flex flex-col justify-center gap-1">
                                <div className="h-1 w-full bg-gray-900"></div>
                                <div className="h-1 w-2/3 bg-gray-400"></div>
                                <div className="flex justify-between text-[8px] font-mono text-gray-400 mt-1">
                                    <span>CONSCIOUSNESS_LEVEL</span>
                                    <span>99.9%</span>
                                </div>
                            </div>
                            <div className="col-span-1 bg-gray-900 flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Feature Ticker / Narrative Ticker */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white/90 backdrop-blur-sm py-4 overflow-hidden">
                <VelocityScroll
                    items={[
                        "Zyko",
                        "Leader of the Radpals",
                        "The Signal Runner",
                        "Direction In Chaos",
                        "Trust Action",
                        "Break The System",
                        "Digital Resistance"
                    ]}
                />
            </div>
        </div>
    );
}
