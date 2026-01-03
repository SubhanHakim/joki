import img1 from '../../assets/gallery/IMG_7047.PNG';
import img2 from '../../assets/gallery/IMG_7046.PNG';
import img3 from '../../assets/gallery/IMG_7045.PNG';

export default function GallerySection() {
    const galleryItems = [
        { type: 'image', src: img1, label: 'EVIDENCE_01' },
        { type: 'image', src: img2, label: 'EVIDENCE_02' },
        { type: 'image', src: img3, label: 'EVIDENCE_03' },
    ];

    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 relative" id="gallery">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div>
                    <div className="inline-block mb-4">
                        <span className="font-mono text-xs text-green-600 font-bold tracking-[0.2em] uppercase bg-green-50 px-2 py-1 rounded border border-green-100">
                            // Visual_Database
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                        RADPALS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">ARCHIVES</span>
                    </h2>
                </div>
                <div className="font-mono text-xs text-gray-500 text-right">
                    <p>TOTAL_ENTRIES: [ 892 ]</p>
                    <p>ACCESS_LEVEL: PUBLIC</p>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                {galleryItems.map((item, index) => (
                    <div key={index} className="group relative aspect-square border-2 border-gray-900 bg-gray-100 overflow-hidden hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300">

                        {/* Image */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 mix-blend-overlay pointer-events-none"></div>
                            <img
                                src={item.src}
                                alt={item.label}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Overlay Information */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/20">
                            <div className="flex justify-between items-start">
                                <span className="bg-white text-black text-[10px] font-mono font-bold px-1.5 py-0.5 border border-black">
                                    IMG_0{index + 1}
                                </span>
                            </div>
                            <div className="self-end">
                                <span className="bg-green-500 text-white text-[10px] font-mono font-bold px-1.5 py-0.5">
                                    {item.label}
                                </span>
                            </div>
                        </div>

                        {/* Corner Accents (Static) */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-900 z-30"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-900 z-30"></div>
                    </div>
                ))}
            </div>

            {/* Footer Marquee or Line */}
            <div className="w-full h-px bg-gray-200 mt-12 flex items-center justify-between overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap font-mono text-[10px] text-gray-400 uppercase">
                    <span>EVIDENCE OF RESISTANCE</span>
                    <span>///</span>
                    <span>NO AI GENERATED ARTIFACTS DETECTED</span>
                    <span>///</span>
                    <span>BLOCKCHAIN VERIFIED</span>
                    <span>///</span>
                    <span>EVIDENCE OF RESISTANCE</span>
                    <span>///</span>
                </div>
            </div>
        </section>
    );
}
