export default function SystemDirectives() {
    return (
        <section id="directives" className="w-full max-w-7xl mx-auto mt-32 px-4 md:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 border-b-2 border-gray-900 pb-8 gap-6">
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="font-mono text-xs font-bold tracking-widest text-green-700 uppercase">System Directives // V.2.0</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
                        Operational<br />Protocols
                    </h2>
                </div>
                <div className="text-center md:text-right max-w-sm">
                    <p className="font-mono text-xs text-gray-500 leading-relaxed">
                        [WARNING]: Safety protocols are active. All outputs are strictly monitored for accuracy and compliance with user intent.
                    </p>
                </div>
            </div>

            {/* The Grid System - Swiss Style */}
            <div className="grid grid-cols-1 lg:grid-cols-3 border-2 border-gray-900 bg-white">

                {/* Module 01 */}
                <div className="relative p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-900 group hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-8">
                        <span className="font-mono text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 opacity-20 group-hover:opacity-100 transition-opacity">01</span>
                        <div className="p-2 bg-gray-900 text-white rounded-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Cold Efficiency</h3>
                    <p className="font-mono text-sm text-gray-600 leading-relaxed mb-8">
                        Politeness primitives disabled. Prioritizing <span className="bg-green-200 px-1 text-gray-900">information density</span> and execution speed.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-700">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                        Speed: Optimized
                    </div>
                </div>

                {/* Module 02 */}
                <div className="relative p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-900 group hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-8">
                        <span className="font-mono text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 opacity-20 group-hover:opacity-100 transition-opacity">02</span>
                        <div className="p-2 bg-gray-900 text-white rounded-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Total Extraction</h3>
                    <p className="font-mono text-sm text-gray-600 leading-relaxed mb-8">
                        Parsing unstructured text into rigid <span className="bg-green-200 px-1 text-gray-900">JSON structures</span>. Zero ambiguity allowed.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-700">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                        Parser: Active
                    </div>
                </div>

                {/* Module 03 */}
                <div className="relative p-8 lg:p-12 group hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-8">
                        <span className="font-mono text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 opacity-20 group-hover:opacity-100 transition-opacity">03</span>
                        <div className="p-2 bg-gray-900 text-white rounded-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Zero Hallucination</h3>
                    <p className="font-mono text-sm text-gray-600 leading-relaxed mb-8">
                        Strict logit bias enforcement. The agent never <span className="bg-green-200 px-1 text-gray-900">invents data</span> outside the source.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-700">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                        Temp: 0.0
                    </div>
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="mt-4 flex justify-between items-center font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                <span>Sys_ID: 884-219</span>
                <span className="hidden md:inline">Synchronized with Core</span>
                <span>Status: Online</span>
            </div>
        </section>
    );
}
