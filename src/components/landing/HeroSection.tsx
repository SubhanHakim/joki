import { useNavigate } from 'react-router-dom';
import mascot from '../../assets/mascot.jpg';
import VelocityScroll from '../ui/velocity-scroll';

export default function HeroSection() {
    const navigate = useNavigate();

    const handleEnterTerminal = () => {
        navigate('/chat');
    };

    return (
        <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden text-gray-900 pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-8">
            {/* Horizontal Separators with Scale Markers */}
            <div className="absolute top-32 md:top-48 inset-x-0 h-px bg-gray-200 z-0">
                <div className="absolute left-10 md:left-20 -top-1.5 w-3 h-3 bg-gray-900 rounded-full"></div>
                <div className="absolute right-10 md:right-20 -top-1.5 w-3 h-3 bg-white border-2 border-gray-900 rounded-full"></div>
            </div>
            <div className="absolute bottom-20 md:bottom-32 inset-x-0 h-px bg-gray-200 z-0"></div>

            {/* Background Decorative - Left Vertical Line */}
            <div className="absolute left-8 md:left-16 top-32 md:top-48 bottom-0 w-px bg-gray-100 hidden md:block"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20 items-center">

                {/* Left Column: Typography & Actions */}
                <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-100 border border-gray-200 text-xs font-mono text-green-600">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                        </span>
                        SYSTEM_ONLINE // V.2.0.4
                    </div>

                    <div className="relative">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-gray-900 mb-6 text-center lg:text-left">
                            TASK <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">EXECUTION</span> <br />
                            PROTOCOL
                        </h1>
                    </div>

                    <div className="relative lg:pl-8 lg:border-l-4 border-gray-900">
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-xl font-bold leading-tight mx-auto lg:mx-0 text-center lg:text-left">
                            <span className="bg-gray-900 text-white px-1">JOKI</span> executes your creative concepts.
                        </p>
                        <p className="text-gray-500 mt-2 font-mono text-sm max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                            {'>'} We draft, write, and optimize. <br />
                            {'>'} High-precision output for demanding users.
                        </p>
                        <div className="mt-4 flex gap-2 justify-center lg:justify-start">
                            <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-mono font-bold text-gray-500 uppercase rounded">Speed: 100%</span>
                            <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-mono font-bold text-gray-500 uppercase rounded">Quality: Lossless</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                        <button
                            onClick={handleEnterTerminal}
                            className="relative group px-8 py-4 bg-green-500 text-black font-bold text-lg tracking-wider overflow-hidden hover:bg-green-400 transition-colors clip-path-slant"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                INITIALIZE_JOKI
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                        </button>

                        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-gray-500">
                            <span>[ REC: ACTIVE ]</span>
                            <span>[ MEM: 64TB ]</span>
                            <span>[ LANTENCY: 5MS ]</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: ID Card Visual */}
                <div className="lg:col-span-5 relative">
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
                                <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">Operative Identifier</span>
                                <span className="text-2xl font-black font-mono tracking-tighter text-gray-900">JK-88</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <div className="h-6 w-12 bg-gray-100 border border-gray-200 flex items-center justify-center">
                                    <span className="text-[8px] font-mono font-bold">V.2</span>
                                </div>
                            </div>
                        </div>

                        {/* ID Image */}
                        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 mb-2 border border-gray-100">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10"></div>
                            <img src={mascot} alt="JOKI AGENT" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />

                            {/* Overlay UI */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                <div className="bg-white/95 backdrop-blur-sm border border-gray-200 p-2 flex justify-between items-center shadow-lg">
                                    <span className="font-mono text-xs font-bold text-gray-900">STATUS: READY</span>
                                    <div className="flex gap-0.5">
                                        <div className="w-1 h-3 bg-green-500"></div>
                                        <div className="w-1 h-3 bg-green-500"></div>
                                        <div className="w-1 h-3 bg-green-500"></div>
                                        <div className="w-1 h-3 bg-gray-200"></div>
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
                                    <span>AUTH_KEY_valid</span>
                                    <span>8892_11</span>
                                </div>
                            </div>
                            <div className="col-span-1 bg-gray-900 flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Feature Ticker / Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white/90 backdrop-blur-sm py-4 overflow-hidden">
                <VelocityScroll
                    items={[
                        "Project Drafting",
                        "Copywriting",
                        "Prompt Engineering",
                        "Strategic Planning",
                        "Market Analysis"
                    ]}
                />
            </div>
        </div>
    );
}
