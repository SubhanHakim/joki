import { useState, useEffect } from 'react';
import mascot from '../../assets/mascot.jpg';

export default function WorkflowVisualizer() {
    const [step, setStep] = useState(0);

    // Animation loop for the visualization
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 relative">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-8 md:gap-6">
                <div className="text-center md:text-left">
                    <div className="inline-block md:block mb-2">
                        <span className="font-mono text-xs md:text-sm text-green-600 font-bold tracking-[0.3em] uppercase bg-green-50 px-2 py-1 rounded">
                            How_It_Works
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
                        Workflow<br />Visualized
                    </h2>
                </div>

                {/* Status Badge - Unified Design */}
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default w-fit">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] font-bold text-gray-400 font-mono leading-none mb-0.5">STATUS</span>
                        <span className="text-xs font-bold text-gray-900 font-mono leading-none">AUTO_SEQUENCE: ACTIVE</span>
                    </div>
                </div>
            </div>

            {/* Main Visualizer Box - Swiss Industrial Style */}
            <div className="relative border-2 border-gray-900 bg-white">

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                {/* Connecting Line (Desktop) - Rigid Conduit */}
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-100 hidden md:block -translate-y-1/2 z-0 border-y border-gray-200"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-900">

                    {/* STEP 1: INPUT */}
                    <div className={`p-12 transition-all duration-500 ${step === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <div className="flex flex-col items-start h-full justify-between space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-4xl font-black text-gray-200">01</span>
                                <h3 className="font-bold text-gray-900 uppercase tracking-tight">Data Ingestion</h3>
                            </div>

                            <div className="w-full bg-white border-2 border-gray-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        <span className="text-xs font-mono font-bold text-gray-900">PROMPT.TXT</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-400">12KB</span>
                                </div>
                                <p className="font-mono text-xs text-gray-600 leading-relaxed">
                                    "Analyze market trends for AI logistics startups in 2025..."
                                </p>
                            </div>

                            <div className={`w-full h-1 bg-gray-100 mt-auto overflow-hidden`}>
                                <div className={`h-full bg-gray-900 transition-all duration-1000 ${step === 0 ? 'w-full' : 'w-0'}`}></div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2: PROCESSING */}
                    <div className={`p-12 transition-all duration-500 ${step === 1 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                            <div className="relative">
                                {/* Technical Ring */}
                                <div className={`absolute inset-0 rounded-full border-2 border-dashed border-gray-300 md:animate-spin-slow transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}></div>

                                <div className={`w-32 h-32 rounded-full border-4 border-gray-900 p-1 bg-white relative overflow-hidden transition-transform duration-500 ${step === 1 ? 'scale-110' : 'grayscale'}`}>
                                    <img src={mascot} alt="Processing" className="w-full h-full object-cover rounded-full" />

                                    {/* Scanline Effect */}
                                    {step === 1 && (
                                        <div className="absolute inset-0 bg-green-500/20 mix-blend-multiply animate-pulse"></div>
                                    )}
                                </div>

                                {/* Status Chip */}
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 text-[10px] font-mono font-bold uppercase whitespace-nowrap">
                                    {step === 1 ? 'Processing...' : 'Standby'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 3: OUTPUT */}
                    <div className={`p-12 transition-all duration-500 ${step >= 2 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <div className="flex flex-col items-start h-full justify-between space-y-8">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-4xl font-black text-gray-200">03</span>
                                <h3 className="font-bold text-gray-900 uppercase tracking-tight">Execution</h3>
                            </div>

                            <div className="w-full bg-gray-900 p-4 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] transition-transform duration-300 hover:-translate-y-1">
                                <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs font-mono font-bold text-white">RESULT.JSON</span>
                                    </div>
                                </div>
                                <div className="font-mono text-[10px] text-green-400 space-y-1">
                                    <div>{'{'}</div>
                                    <div className="pl-2"><span className="text-white">"status"</span>: <span className="text-green-400">"success"</span>,</div>
                                    <div className="pl-2"><span className="text-white">"confidence"</span>: <span className="text-blue-300">0.99</span>,</div>
                                    <div className="pl-2"><span className="text-white">"data"</span>: [...]</div>
                                    <div>{'}'}</div>
                                </div>
                            </div>

                            <div className={`w-full h-1 bg-gray-100 mt-auto overflow-hidden`}>
                                <div className={`h-full bg-green-500 transition-all duration-1000 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Decor */}
                <div className="border-t-2 border-gray-900 p-2 bg-gray-100 flex justify-between items-center px-4 font-mono text-[10px] text-gray-500 uppercase">
                    <span>Latency: 45ms</span>
                    <span>Load: 12%</span>
                </div>
            </div>
        </section>
    );
}
