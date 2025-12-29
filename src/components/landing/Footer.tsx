import dexscreenerIcon from '../../assets/dexscreener.svg';
import logoNavbar from '../../assets/logo_navbar.svg';

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-black/80 backdrop-blur-sm relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                    <img src={logoNavbar} alt="NEXORA" className="h-6 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                    <span>&copy; 2025 Nexora</span>
                </div>

                <div className="flex items-center gap-2">
                    <a href="https://x.com/nexora_key" target="_blank" className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" title="X (Twitter)">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a href="https://dexscreener.com/" target="_blank" className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" title="Dexscreener">
                        <img src={dexscreenerIcon} alt="Dexscreener" className="w-4 h-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                    </a>
                    <span className="flex items-center gap-2 text-green-500 font-mono text-xs bg-white/5 px-2 py-1 rounded ml-2 border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        ONLINE
                    </span>
                </div>
            </div>
        </footer>
    );
}
