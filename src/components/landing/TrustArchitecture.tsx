export default function TrustArchitecture() {
    return (
        <section id="architecture" className="w-full max-w-7xl mx-auto mt-32 mb-20 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-sm font-mono text-green-600 font-bold tracking-[0.3em] uppercase mb-1">
                        Security_Protocol
                    </h2>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                        TRUST ARCHITECTURE
                    </h2>
                </div>
                <div className="hidden md:block h-px bg-gray-200 flex-1 md:ml-12 relative top-[-10px]">
                    <div className="absolute right-0 -top-1 w-2 h-2 bg-gray-200 rounded-full"></div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 items-start">
                {/* Left Side: Explainer */}
                <div className="flex-1 space-y-12">
                    <div className="prose prose-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                            </span>
                            Verifiable Inference
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Every inference cycle is cryptographically signed. The chain of thought is preserved in an <span className="text-gray-900 font-bold bg-gray-100 px-1">immutable ledger</span>, ensuring that the extraction process is audit-proof and tamper-resistant.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Item 01 */}
                        <div className="group flex items-start gap-6">
                            <div className="mt-1 font-mono text-xl font-bold text-gray-300 group-hover:text-green-600 transition-colors">01</div>
                            <div className="border-l-2 border-gray-100 pl-6 group-hover:border-green-500 transition-colors duration-300">
                                <h4 className="text-lg font-bold text-gray-900">Input Sanitization</h4>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Malicious prompts are neutralized before they reach the core model.</p>
                            </div>
                        </div>

                        {/* Item 02 */}
                        <div className="group flex items-start gap-6">
                            <div className="mt-1 font-mono text-xl font-bold text-gray-300 group-hover:text-green-600 transition-colors">02</div>
                            <div className="border-l-2 border-gray-100 pl-6 group-hover:border-green-500 transition-colors duration-300">
                                <h4 className="text-lg font-bold text-gray-900">Isolated Execution</h4>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Running within ephemeral containers that self-destruct post-extraction.</p>
                            </div>
                        </div>

                        {/* Item 03 */}
                        <div className="group flex items-start gap-6">
                            <div className="mt-1 font-mono text-xl font-bold text-gray-300 group-hover:text-green-600 transition-colors">03</div>
                            <div className="border-l-2 border-gray-100 pl-6 group-hover:border-green-500 transition-colors duration-300">
                                <h4 className="text-lg font-bold text-gray-900">Output Validation</h4>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed">JSON schemas are enforced strictly. Hallucinations trigger automatic retries.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Visual Abstraction */}
                <div className="flex-1 w-full lg:w-auto">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-900 group">
                        {/* Terminal Header */}
                        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <span className="ml-2 font-mono text-xs text-gray-400">security_guard.ts</span>
                        </div>

                        {/* Code Visual */}
                        <div className="bg-gray-900 p-8 font-mono text-sm leading-7 min-h-[300px]">
                            <div className="text-gray-500 mb-4">{'// Trust Layer Validation'}</div>

                            <div className="flex">
                                <span className="text-purple-400 mr-2">const</span>
                                <span className="text-blue-400">verifyOutput</span>
                                <span className="text-white mx-2">=</span>
                                <span className="text-yellow-400">async</span>
                                <span className="text-gray-300 ml-1">(payload)</span>
                                <span className="text-white ml-2">{'=>'}</span>
                                <span className="text-white ml-2">{'{'}</span>
                            </div>

                            <div className="pl-6 flex">
                                <span className="text-purple-400 mr-2">const</span>
                                <span className="text-gray-300">signature</span>
                                <span className="text-white mx-2">=</span>
                                <span className="text-blue-400">await</span>
                                <span className="text-gray-300 ml-2">keypair.</span>
                                <span className="text-green-400">sign</span>
                                <span className="text-gray-300">(payload);</span>
                            </div>

                            <div className="pl-6 mt-4 flex">
                                <span className="text-purple-400 mr-2">if</span>
                                <span className="text-gray-300">(!</span>
                                <span className="text-blue-400">verify</span>
                                <span className="text-gray-300">(signature))</span>
                                <span className="text-white ml-2">{'{'}</span>
                            </div>

                            <div className="pl-12 text-red-400">
                                throw new SecurityException("Tampering Detected");
                            </div>

                            <div className="pl-6 text-white">{'}'}</div>

                            <div className="pl-6 mt-4 flex items-center">
                                <span className="text-purple-400 mr-2">return</span>
                                <span className="text-green-400">true</span>;
                                <span className="ml-4 w-2 h-4 bg-green-500 animate-pulse block"></span>
                            </div>

                            <div className="text-white">{'}'}</div>
                        </div>

                        {/* overlay gradient */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50"></div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex justify-between mt-4 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        <span>Encrypted: SHA-256</span>
                        <span>Node: Secure-1</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
