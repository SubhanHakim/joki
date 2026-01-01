

interface VelocityScrollProps {
    items: string[];
    className?: string;
}

export default function VelocityScroll({ items, className = "" }: VelocityScrollProps) {
    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            <div className="flex w-max animate-scroll-ticker">
                {/* First set of items */}
                <div className="flex items-center shrink-0 gap-4 md:gap-12 px-2 md:px-6">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 md:gap-4 text-[10px] sm:text-xs md:text-sm font-mono font-bold text-gray-400 uppercase tracking-[0.15em] md:tracking-[0.2em] opacity-80 whitespace-nowrap">
                            <span>{item}</span>
                            <span className="text-green-600">+++</span>
                        </div>
                    ))}
                </div>
                {/* Duplicate set for infinite loop */}
                <div className="flex items-center shrink-0 gap-4 md:gap-12 px-2 md:px-6">
                    {items.map((item, index) => (
                        <div key={`dup-${index}`} className="flex items-center gap-2 md:gap-4 text-[10px] sm:text-xs md:text-sm font-mono font-bold text-gray-400 uppercase tracking-[0.15em] md:tracking-[0.2em] opacity-80 whitespace-nowrap">
                            <span>{item}</span>
                            <span className="text-green-600">+++</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
