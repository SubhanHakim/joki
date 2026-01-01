export default function InitializeSection() {
    return (
        <section className="w-full max-w-7xl mx-auto mt-20 mb-32 px-4 md:px-8">
            <div className="relative border-2 border-gray-900 bg-white p-12 md:p-24 overflow-hidden">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                </div>

                {/* Decorative Corner Tab */}
                <div className="absolute top-0 left-0 bg-gray-900 px-4 py-1">
                    <span className="font-mono text-xs font-bold text-white tracking-widest">INIT_SEQUENCE</span>
                </div>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-green-50 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-32 h-1 bg-gray-900"></div>
                <div className="absolute bottom-0 right-0 w-1 h-32 bg-gray-900"></div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">

                    {/* Signal Status */}
                    <div className="flex items-center gap-2 mb-8 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Uplink Established</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-none">
                        Initialize <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600">Protocol</span>
                    </h2>

                    <p className="text-lg text-gray-600 font-medium max-w-xl mx-auto mb-10 leading-relaxed">
                        Join the neural network. Receive critical transmission updates on <span className="font-bold text-gray-900 bg-green-100 px-1">protocol upgrades</span> and system governance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <a href="#" target="_blank" rel="noopener noreferrer"
                            className="group relative px-8 py-4 bg-gray-900 text-white font-mono font-bold tracking-wider uppercase border-2 border-transparent overflow-hidden transition-all hover:bg-white hover:text-gray-900 hover:border-gray-900">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                Connect_Terminal
                            </span>
                        </a>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="h-px w-12 bg-gray-400"></div>
                        <span className="font-mono text-xs text-gray-400">SECURE TRANSMISSION</span>
                        <div className="h-px w-12 bg-gray-400"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
