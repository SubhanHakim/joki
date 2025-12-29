import { useState, useEffect } from 'react';

export default function WorkflowVisualizer() {
    const [step, setStep] = useState(0);

    // Animation loop for the visualization
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4); // 4 steps logic
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="code" className="mt-20 w-full max-w-5xl mx-auto px-4">
            <div className="relative p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center">

                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] -z-10" />

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full z-10">

                    {/* Step 1: Raw Input */}
                    <div className={`relative p-6 rounded-xl border transition-all duration-700 ${step === 0 || step === 3 ? 'border-indigo-500/50 bg-indigo-900/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'border-white/5 bg-white/5 opacity-50'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${step === 0 ? 'bg-indigo-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-sm font-bold text-gray-200">Raw Input</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse" />
                            <div className="h-2 w-full bg-white/10 rounded animate-pulse delay-75" />
                            <div className="h-2 w-5/6 bg-white/10 rounded animate-pulse delay-150" />
                        </div>
                        <div className="mt-4 text-xs font-mono text-gray-500 leading-relaxed">
                            <span className="text-gray-600">&gt;</span> Monitoring solana_new_pairs...<br />
                            <span className="text-green-500/50">&gt;</span> "Found $NEXORA launching. CA verified. Sending it! 🚀"
                        </div>
                    </div>

                    {/* Step 2: Processing (Center) */}
                    <div className="flex flex-col items-center justify-center relative">
                        {/* Connecting Lines (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -z-10">
                            <div className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-1000 ${step === 1 ? 'opacity-100 translate-x-full' : 'opacity-0 -translate-x-full'}`} />
                        </div>

                        {/* Arrows (Mobile) */}
                        <div className="md:hidden py-4 text-gray-600">
                            <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        </div>

                        <div className={`relative z-10 w-24 h-24 rounded-full border flex items-center justify-center transition-all duration-500 ${step === 1 ? 'border-indigo-500 bg-indigo-900/20 scale-110 shadow-[0_0_50px_rgba(99,102,241,0.4)]' : 'border-white/10 bg-black scale-100'}`}>
                            <div className={`absolute inset-0 rounded-full border-t-2 border-indigo-500 ${step === 1 ? 'animate-spin' : 'hidden'}`} />
                            <svg className={`w-10 h-10 transition-colors ${step === 1 ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3M3.343 19.05l1.414-1.414M18.364 19.05l-1.414-1.414M20.657 5.343l-1.414-1.414" /></svg>
                        </div>
                        <div className="mt-4 text-xs font-mono tracking-widest text-indigo-400 uppercase">
                            {step === 1 ? 'Analysing CA...' : 'Nexora AI'}
                        </div>
                    </div>

                    {/* Step 3: Structured Output */}
                    <div className={`relative p-6 rounded-xl border transition-all duration-700 ${step === 2 || step === 3 ? 'border-green-500/50 bg-green-900/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-white/5 bg-white/5 opacity-50'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${step === 2 || step === 3 ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-sm font-bold text-gray-200">Alpha Signal</h3>
                        </div>
                        <div className="font-mono text-[10px] md:text-xs text-green-400 bg-black/50 p-3 rounded-lg border border-white/5 shadow-inner">
                            <span className="text-purple-400">{"{"}</span><br />
                            &nbsp;&nbsp;<span className="text-blue-400">"token"</span>: <span className="text-yellow-300">"$NEXORA"</span>,<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"network"</span>: <span className="text-yellow-300">"SOLANA"</span>,<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"safety"</span>: <span className="text-green-300">"VERIFIED"</span>,<br />
                            &nbsp;&nbsp;<span className="text-blue-400">"sentiment"</span>: <span className="text-green-300">"BULLISH"</span><br />
                            <span className="text-purple-400">{"}"}</span>
                        </div>
                    </div>

                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
                Visual representation of autonomous extraction pipeline v1.0
            </div>
        </div>
    );
}
