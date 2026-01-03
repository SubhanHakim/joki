import mascot from '../../assets/mascot.jpg';

export default function Footer() {
    return (
        <footer className="w-full border-t-2 border-gray-900 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">

                    {/* Left: Brand Identity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 border-2 border-gray-900 bg-gray-100 p-1">
                                <img src={mascot} alt="Zyko" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                                {/* Corner Accents */}
                                <div className="absolute top-0 right-0 w-2 h-2 bg-green-500"></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-900"></div>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-black text-4xl tracking-tighter text-gray-900 leading-none">ZYKO</h3>
                                <span className="font-mono text-xs font-bold text-green-600 bg-green-50 px-1 w-fit mt-1">LEADER OF RADPALS</span>
                            </div>
                        </div>
                        <p className="font-mono text-xs text-gray-500 max-w-xs leading-relaxed">
                            A symbol of resistance in a fractured world. Trusts action over systems.
                        </p>
                    </div>

                    {/* Right: Network Status & Credits */}
                    <div className="flex flex-col md:items-end gap-4">
                        <div className="flex gap-4">
                            <a href="https://x.com/Zyko_world" target="_blank" rel="noreferrer" className="text-gray-900 font-black hover:text-green-600 underline decoration-2 underline-offset-4">TWITTER / X</a>
                            <a href="#" className="text-gray-900 font-black hover:text-green-600 underline decoration-2 underline-offset-4">RADPALS</a>
                        </div>

                        <div className="h-px w-full md:w-64 bg-gray-200"></div>

                        <div className="flex flex-col md:items-end gap-1">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="font-mono text-xs font-bold text-gray-900 tracking-widest">SIGNAL: STRONG</span>
                            </div>
                            <span className="font-mono text-[10px] text-gray-400 uppercase">
                                © 2025 RADPALS INT. BREAK THE SYSTEM.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
