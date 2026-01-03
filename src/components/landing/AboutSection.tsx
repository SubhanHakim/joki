import characterGif from '../../assets/IMG_202601031453110.gif';

export default function AboutSection() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 relative" id="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                {/* Left Column: Image & Visuals */}
                <div className="relative group">
                    {/* Decorative Backdrop */}
                    <div className="absolute top-4 left-4 w-full h-full bg-gray-900 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>

                    <div className="relative z-10 border-2 border-gray-900 bg-white p-2">
                        <div className="aspect-square overflow-hidden relative transition-all duration-700">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-20 mix-blend-overlay"></div>
                            <img
                                src={characterGif}
                                alt="ZYKO Character"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Details */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-30 flex justify-between items-end">
                                <span className="bg-white px-2 py-1 text-xs font-black text-gray-900 border border-gray-900">
                                    IMG_REF_002
                                </span>
                            </div>
                        </div>

                        {/* Caption Area */}
                        <div className="pt-3 pb-1 px-1 flex justify-between items-center font-mono text-xs text-gray-500">
                            <span>SCANNING COMPLETE</span>
                            <span className="text-green-600 font-bold">100% MATCH</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Text Content */}
                <div className="flex flex-col justify-center h-full pt-8 lg:pt-0">
                    <div className="mb-8">
                        <div className="inline-block mb-4">
                            <span className="font-mono text-xs text-green-600 font-bold tracking-[0.2em] uppercase bg-green-50 px-2 py-1 rounded border border-green-100">
                                // About_Protocol
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6">
                            Direction In <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">Chaos</span>
                        </h2>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-6">
                            To RADPALS, Zyko is more than a leader. He is direction.
                        </p>
                        <div className="prose prose-lg text-gray-600 font-mono text-sm md:text-base leading-relaxed space-y-4">
                            <p>
                                Zyko is a symbol of resistance: calm, calculated, and silent about the past. No one knows where he came from, only that he trusts action over systems.
                            </p>
                            <p>
                                In this universe, every decision has consequences. Every character carries an ideology. Every move shifts the fragile balance of a dying world.
                            </p>
                            <p className="font-bold text-gray-900 border-l-2 border-green-500 pl-4">
                                RADPALS is not about saving the world. It’s about breaking it—so something fairer can rise from the ashes.
                            </p>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    );
}
