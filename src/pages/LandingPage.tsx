import Terminal from '../components/Terminal'
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
    const navigate = useNavigate();

    const handleEnterTerminal = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/chat');
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500/30 selection:text-orange-200">

            {/* Background - Dot Pattern */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#ea580c 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}>
            </div>

            {/* Gradient Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1400px] mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-mono font-bold tracking-tight text-white select-none">
                            [POLYCORE]
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Manifesto</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Protocol</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Docs</a>
                    </div>

                    {/* Enter Terminal Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleEnterTerminal}
                            className="bg-[#ea580c] text-white px-4 py-2 text-sm md:px-5 md:py-2 md:text-base rounded-md font-semibold hover:bg-[#c2410c] transition-all duration-200 flex items-center gap-2 shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] whitespace-nowrap"
                        >
                            Launch Terminal
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center justify-center pt-20 md:pt-32 pb-20">

                <div className="text-center space-y-8 max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]">
                        Build Agents, <br />
                        <span className="text-gray-600">Not Infrastructure</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
                        Create and <span className="text-orange-500 font-normal">deploy</span> extraction AI agents in one command. Open source. Zero lock-in.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                        {/* X Link */}
                        <a href="https://x.com" target="_blank" className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white flex items-center gap-2 transition-all duration-300 group">
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            <span>Follow Protocol</span>
                        </a>

                        {/* Pump.fun Link */}
                        <a href="#" className="px-6 py-3 rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/40 text-green-400 hover:text-green-300 flex items-center gap-2 transition-all duration-300 font-medium">
                            <span>💊</span>
                            <span>Pump.fun</span>
                        </a>

                        {/* Dashboard Entry */}
                        <button
                            onClick={handleEnterTerminal}
                            className="px-8 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <span>Enter Terminal</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </div>
                </div>

                {/* Terminal / Code Block Demo */}
                <div className="mt-20 w-full max-w-3xl mx-auto terminal-container">
                    <div className="rounded-lg border border-gray-800 bg-[#0A0A0A] overflow-hidden shadow-2xl shadow-orange-900/10">
                        {/* Fake 'tab' or header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-white/5">
                            <div className="text-xs font-mono text-gray-500">polycore-cli — 80x24</div>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            </div>
                        </div>

                        {/* Terminal Component Content */}
                        <div className="p-2 min-h-[300px]">
                            <Terminal />
                        </div>

                        {/* Footer instruction line */}
                        <div className="px-4 py-3 border-t border-gray-800 bg-white/5 text-xs text-orange-500 font-mono">
                            $ npx polycore init
                        </div>
                    </div>
                </div>

                {/* Agent Behavior / Rules Section */}
                <section className="w-full max-w-5xl mx-auto mt-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-gray-800 flex-1" />
                        <h2 className="text-xl font-mono text-gray-500 tracking-widest uppercase">System_Directives</h2>
                        <div className="h-px bg-gray-800 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Rule 01 */}
                        <div className="p-6 border border-gray-800 bg-black/50 backdrop-blur hover:border-orange-500/50 transition-colors group">
                            <div className="text-4xl font-bold text-gray-800 mb-4 group-hover:text-orange-900 transition-colors">01</div>
                            <h3 className="text-lg font-bold text-white mb-2">Cold Efficiency</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Politeness primitives are disabled. The agent prioritizes speed and density of information over conversational fluff.
                            </p>
                        </div>

                        {/* Rule 02 */}
                        <div className="p-6 border border-gray-800 bg-black/50 backdrop-blur hover:border-orange-500/50 transition-colors group">
                            <div className="text-4xl font-bold text-gray-800 mb-4 group-hover:text-orange-900 transition-colors">02</div>
                            <h3 className="text-lg font-bold text-white mb-2">Total Extraction</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Designed to parse, strip, and restructure unstructured text into rigid JSON schemas. No ambiguity allowed.
                            </p>
                        </div>

                        {/* Rule 03 */}
                        <div className="p-6 border border-gray-800 bg-black/50 backdrop-blur hover:border-orange-500/50 transition-colors group">
                            <div className="text-4xl font-bold text-gray-800 mb-4 group-hover:text-orange-900 transition-colors">03</div>
                            <h3 className="text-lg font-bold text-white mb-2">Zero Hallucination</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Strict temperature controls and logit bias enforcement ensure the agent never invents data outside the source.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Trust Architecture Section */}
                <section className="w-full max-w-5xl mx-auto mt-32 mb-20">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-px bg-gray-800 flex-1" />
                        <h2 className="text-xl font-mono text-gray-500 tracking-widest uppercase">Trust_Architecture</h2>
                        <div className="h-px bg-gray-800 flex-1" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        {/* Left Side: Explainer */}
                        <div className="flex-1 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                    Verifiable Inference
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Every inference cycle is cryptographically signed. The chain of thought is preserved in an immutable ledger, ensuring that the extraction process is audit-proof and tamper-resistant.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded bg-white/5 border border-white/5 hover:border-orange-500/30 transition-colors">
                                    <div className="mt-1 font-mono text-orange-500 font-bold">01</div>
                                    <div>
                                        <h4 className="text-white font-medium">Input Sanitization</h4>
                                        <p className="text-sm text-gray-500 mt-1">Malicious prompts are neutralized before they reach the core model.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded bg-white/5 border border-white/5 hover:border-orange-500/30 transition-colors">
                                    <div className="mt-1 font-mono text-orange-500 font-bold">02</div>
                                    <div>
                                        <h4 className="text-white font-medium">Isolated Execution</h4>
                                        <p className="text-sm text-gray-500 mt-1">Running within ephemeral containers that self-destruct post-extraction.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded bg-white/5 border border-white/5 hover:border-orange-500/30 transition-colors">
                                    <div className="mt-1 font-mono text-orange-500 font-bold">03</div>
                                    <div>
                                        <h4 className="text-white font-medium">Output Validation</h4>
                                        <p className="text-sm text-gray-500 mt-1">JSON schemas are enforced strictly. Hallucinations trigger automatic retries.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Visual Abstraction */}
                        <div className="flex-1 w-full relative">
                            <div className="relative z-10 p-1 rounded-2xl bg-gradient-to-b from-gray-800 to-black">
                                <div className="bg-black rounded-xl p-6 border border-gray-800 space-y-2 font-mono text-sm">
                                    {/* Code Visual */}
                                    <div className="text-gray-500">{'// Trust Layer Validation'}</div>
                                    <div>
                                        <span className="text-purple-400">const</span> <span className="text-blue-400">verifyOutput</span> = <span className="text-yellow-400">async</span> (payload) ={'>'} {'{'}
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-purple-400">const</span> signature = <span className="text-blue-400">await</span> keypair.<span className="text-blue-300">sign</span>(payload);
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-purple-400">if</span> (!<span className="text-blue-300">verify</span>(signature)) {'{'}
                                    </div>
                                    <div className="pl-8 text-red-400">
                                        throw new SecurityException("Tampering Detected");
                                    </div>
                                    <div className="pl-4">{'}'}</div>
                                    <div className="pl-4 text-green-400">
                                        return true;
                                    </div>
                                    <div>{'}'}</div>
                                </div>
                            </div>

                            {/* Decorative Glow Behind */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/10 blur-3xl -z-10 rounded-full" />
                        </div>
                    </div>
                </section>

                {/* Access / Entry Point Section */}
                <section className="w-full max-w-4xl mx-auto mt-20 mb-32 text-center">
                    <div className="p-8 md:p-12 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-black backdrop-blur relative overflow-hidden group">

                        {/* Animated Background Grid */}
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                                backgroundSize: '32px 32px'
                            }}
                        />

                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Initialize Extraction Protocol
                            </h2>
                            <p className="text-gray-400 max-w-lg mx-auto text-lg">
                                Join the network of autonomous extraction nodes. Start mining intelligence from raw chaos today.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                                <button className="px-8 py-3.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:scale-105 active:scale-95">
                                    Get Access Keys
                                </button>
                                <button className="px-8 py-3.5 rounded-lg border border-gray-700 hover:border-white text-gray-300 hover:text-white font-medium bg-black/50 transition-all hover:bg-white/5">
                                    Read Protocol Specs
                                </button>
                            </div>

                            <div className="pt-8 flex justify-center items-center gap-2 text-xs font-mono text-gray-600">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Total Nodes Active: 1,420
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="w-full border-t border-white/5 bg-black/80 backdrop-blur-sm relative z-10">
                <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-gray-300">[POLYCORE]</span>
                        <span>&copy; 2025</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-orange-500 transition-colors">Documentation</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">GitHub</a>
                        <span className="flex items-center gap-2 text-green-500 font-mono text-xs bg-white/5 px-2 py-1 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            ONLINE
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
