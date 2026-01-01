import mascot from '../../assets/mascot.jpg';

export default function Footer() {
    return (
        <footer className="w-full border-t-2 border-gray-900 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Brand & Mascot */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full border-2 border-gray-900 overflow-hidden">
                            <img src={mascot} alt="Zyko Mascot" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tighter text-gray-900 leading-none">ZYKO</span>
                            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Autonomous Unit</span>
                        </div>
                    </div>

                    {/* Simple Right Side info */}
                    <div className="flex flex-col md:items-end gap-1 text-center md:text-right">
                        <div className="flex items-center justify-center md:justify-end gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-mono text-xs font-bold text-gray-900">SYSTEM ONLINE</span>
                        </div>
                        <span className="font-mono text-[10px] text-gray-400 uppercase">
                            © 2025 ZYKO INC. ALL RIGHTS RESERVED.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
