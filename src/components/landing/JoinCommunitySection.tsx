import communityGif from '../../assets/IMG_2565.gif';

export default function JoinCommunitySection() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 relative overflow-hidden" id="community">

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gray-200"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 hidden lg:block"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Content Column */}
                <div className="flex flex-col justify-center order-2 lg:order-1">
                    <div className="mb-8">
                        <div className="inline-block mb-4">
                            <span className="font-mono text-xs text-green-600 font-bold tracking-[0.2em] uppercase bg-green-50 px-2 py-1 rounded border border-green-100">
                                // Uplink_Established
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
                            JOIN THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">RADPALS</span>
                        </h2>
                        <p className="text-xl font-bold text-gray-800 leading-tight mb-6 max-w-md">
                            Connect with other anomalies. Share signals, decode the noise, and ride the volatility together.
                        </p>
                        <p className="font-mono text-sm text-gray-500 mb-8 max-w-md">
                            Warning: High bandwidth communication channel. Expect chaotic intelligence and rapid consensus formation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#" className="group relative px-8 py-4 bg-gray-900 text-white font-mono font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                                <span className="relative z-10">Twitter / X</span>
                            </a>
                        </div>
                    </div>


                </div>

                {/* Visual Column */}
                <div className="relative order-1 lg:order-2">
                    <div className="relative z-10 border-2 border-gray-900 bg-white p-2 shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[15px_15px_0px_rgba(0,0,0,1)] transition-all duration-300">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-green-500 z-20"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-green-500 z-20"></div>

                        <div className="aspect-[4/3] overflow-hidden relative">
                            {/* CRT/Noise Overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 z-20 mix-blend-overlay pointer-events-none"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent z-20 pointer-events-none"></div>

                            <img
                                src={communityGif}
                                alt="Join The Community"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay UI */}
                            <div className="absolute top-4 right-4 z-30">
                                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest animate-pulse">
                                    Recruiting
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
