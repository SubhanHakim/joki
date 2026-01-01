import { useState } from "react";
import { terrasuck } from "../agent/terrasuck";

export default function Terminal() {
    const [input, setInput] = useState("");
    const [mode, setMode] = useState("project");
    const [logs, setLogs] = useState<string[]>([]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input) return;

        setLogs((l) => [...l, `> ${input}`]);
        const output = await terrasuck(input, mode);
        setLogs((l) => [...l, output]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full bg-transparent text-gray-300 font-mono p-4 overflow-hidden">
            {/* Mode Selector */}
            <div className="flex justify-end mb-4">
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="bg-black/50 border border-gray-700 text-gray-300 text-xs rounded px-2 py-1 outline-none focus:border-emerald-500"
                >
                    <option value="project">Project Assistant</option>
                    <option value="content">Content & Copy</option>
                    <option value="prompt">Prompt Engineer</option>
                </select>
            </div>

            <div className="flex-1 overflow-y-auto mb-2 space-y-4 scrollbar-hide">
                {logs.map((log, i) => (
                    <div key={i} className="whitespace-pre-wrap break-all token-line">
                        {log.startsWith('>') ? (
                            <span className="text-emerald-500 font-bold">{log}</span>
                        ) : (
                            <div className="space-y-2">
                                {/* Simple Markdown rendering or raw text */}
                                <span>{log}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={submit} className="flex items-center pt-2 border-t border-white/10">
                <span className="mr-2 text-emerald-500 font-bold">~ {mode} $</span>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-700"
                    placeholder="Ketik pesan..."
                />
            </form>
        </div>
    );
}
