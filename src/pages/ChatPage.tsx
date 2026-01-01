
import { useState, useEffect, useRef } from "react";
import { terrasuck } from "../agent/terrasuck";

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { playSound } from "../utils/audio";
import mascot from "../assets/mascot.jpg";


// Type definitions for chat history
interface Message {
    role: 'user' | 'assistant';
    content: string;
    attachment?: string | null; // Base64 image
}

interface ChatSession {
    id: string;
    title: string;
    timestamp: number;
    messages: Message[];
}

// Modes available
const MODES = [
    { id: 'project', label: 'Project Assistant', color: 'text-blue-600', border: 'border-blue-900' },
    { id: 'content', label: 'Content & Copy', color: 'text-purple-600', border: 'border-purple-900' },
    { id: 'prompt', label: 'Prompt Engineer', color: 'text-emerald-600', border: 'border-emerald-900' }
];

// Component for Message with Brutalist Light Theme
const MessageContent = ({ content, isLatestAssistant }: { content: string, isLatestAssistant: boolean }) => {
    return (
        <div className={`prose prose-sm md:prose-base max-w-none text-gray-900 ${isLatestAssistant ? 'animate-in fade-in duration-700' : ''}`}>
            <ReactMarkdown
                components={{
                    // Style Headers
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-black text-gray-900 mt-6 mb-4 uppercase tracking-tighter" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-900 mt-5 mb-3 border-b-2 border-gray-900 pb-2 inline-block" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-gray-800 mt-4 mb-2" {...props} />,

                    // Style Paragraphs
                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed font-medium" {...props} />,

                    // Style Lists
                    ul: ({ node, ...props }) => <ul className="list-square list-outside ml-5 mb-4 space-y-2 marker:text-gray-900" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-2 marker:font-bold marker:text-gray-900" {...props} />,
                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,

                    // Style Code Blocks - Terminal Window Look
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <div className="my-6 border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="bg-gray-100 px-4 py-2 border-b-2 border-gray-900 flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-900 uppercase font-mono">{match[1]}</span>
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                                    </div>
                                </div>
                                <SyntaxHighlighter
                                    style={atomDark}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{ margin: 0, background: '#111', padding: '1.5rem', fontSize: '0.85rem' }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className="bg-gray-100 border border-gray-300 px-1.5 py-0.5 text-gray-900 font-mono text-sm mx-1 font-bold" {...props}>
                                {children}
                            </code>
                        )
                    },
                    strong: ({ node, ...props }) => <strong className="font-black text-gray-900" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-900 pl-4 italic bg-gray-50 py-2 pr-2 my-4" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default function ChatPage() {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // UI State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Model & Mode State
    const [mode, setMode] = useState("project");


    useEffect(() => {
        // Scroll to bottom when messages change with a slight delay
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
    }, [messages, isLoading]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to recalculate
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);



    // Session Management
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [isStorageLoaded, setIsStorageLoaded] = useState(false); // Safety flag

    // Load sessions from local storage (Guest Mode Only)
    useEffect(() => {
        const storageKey = `terrasuck_sessions_guest`;
        const saved = localStorage.getItem(storageKey);

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSessions(parsed);
            } catch (e) {
                setSessions([]);
            }
        } else {
            setSessions([]);
        }

        // Reset view for new context, but don't wipe sessions
        setMessages([]);
        setCurrentSessionId(null);
        setIsStorageLoaded(true); // Mark as loaded
    }, []);

    // Save sessions whenever they change
    useEffect(() => {
        if (!isStorageLoaded) return; // BLOCK SAVING UNTIL LOADED

        const storageKey = `terrasuck_sessions_guest`;

        if (sessions.length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(sessions));
        } else {
            localStorage.removeItem(storageKey);
        }
    }, [sessions, isStorageLoaded]);

    const createNewSession = () => {
        playSound('click');
        setMessages([]);
        setCurrentSessionId(null);
        if (window.innerWidth < 768) setIsSidebarOpen(false); // Close sidebar on mobile
    };

    const loadSession = (session: ChatSession) => {
        playSound('click');
        setCurrentSessionId(session.id);
        setMessages(session.messages);
        if (window.innerWidth < 768) setIsSidebarOpen(false); // Close sidebar on mobile
    };

    const deleteSession = (e: React.MouseEvent, sessionId: string) => {
        e.stopPropagation();
        playSound('click');
        if (window.confirm("Delete this extraction log?")) {
            setSessions(prev => prev.filter(s => s.id !== sessionId));
            if (currentSessionId === sessionId) {
                setMessages([]);
                setCurrentSessionId(null);
            }
        }
    };

    const exportSession = () => {
        if (!messages.length) return;
        playSound('click');
        const text = messages.map(m => `[${m.role.toUpperCase()}]\n${m.content}\n\n`).join('---');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nexora_extraction_${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const updateSession = (sessionId: string, newMessages: Message[]) => {
        setSessions(prev => {
            const exists = prev.find(s => s.id === sessionId);
            if (exists) {
                return prev.map(s => s.id === sessionId ? { ...s, messages: newMessages } : s);
            } else {
                const newSession: ChatSession = {
                    id: sessionId,
                    title: newMessages[0].content.slice(0, 30) + (newMessages[0].content.length > 30 ? '...' : ''),
                    timestamp: Date.now(),
                    messages: newMessages
                };
                return [newSession, ...prev];
            }
        });
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Allow sending if text exists
        if (!input || isLoading) return;

        playSound('send');
        const userMessage = input;
        const newMsg: Message = { role: 'user', content: userMessage };
        const newHistoryUser = [...messages, newMsg];

        let activeSessionId = currentSessionId;
        if (!activeSessionId) {
            activeSessionId = Date.now().toString();
            setCurrentSessionId(activeSessionId);
        }

        setInput("");
        setMessages(newHistoryUser);
        updateSession(activeSessionId, newHistoryUser);
        setIsLoading(true);

        try {
            const result = await terrasuck(userMessage, mode);
            playSound('receive');
            const newHistoryAssistant = [...newHistoryUser, { role: 'assistant', content: result } as Message];
            setMessages(newHistoryAssistant);
            updateSession(activeSessionId, newHistoryAssistant);
        } catch (error) {
            playSound('error');
            const errorMsg = [...newHistoryUser, { role: 'assistant', content: "Error: Protocol failure. Connection severed." } as Message];
            setMessages(errorMsg);
            updateSession(activeSessionId, errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white text-gray-900 font-sans selection:bg-green-100 selection:text-green-900 overflow-hidden animate-fade-in">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Sidebar - Brutalist Style */}
            <aside className={`
            fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r-2 border-gray-900
            transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
                <div className="p-6 border-b-2 border-gray-900">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-900"></div>
                            <span className="font-black text-xl text-gray-900 tracking-tighter">JOKI</span>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-900">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-900">
                    <button
                        onClick={createNewSession}
                        className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-green-500 hover:text-white transition-colors border-2 border-gray-900 font-mono text-sm font-bold flex items-center justify-between group shadow-sm hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-8"
                    >
                        <span>NEW_SESSION</span>
                        <span>+</span>
                    </button>

                    <div className="flex items-center justify-between px-1 mb-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Extraction Log</div>
                        {messages.length > 0 && (
                            <button onClick={exportSession} title="Export Current Log" className="text-gray-400 hover:text-gray-900">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </button>
                        )}
                    </div>

                    <div className="space-y-2">
                        {sessions.map(session => (
                            <div key={session.id} className="relative group/item">
                                <button
                                    onClick={() => loadSession(session)}
                                    className={`w-full text-left px-3 py-2 font-mono text-xs transition-all truncate pr-8 border border-transparent ${currentSessionId === session.id
                                        ? 'bg-gray-900 text-white font-bold'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {session.title || "Untitled_Session"}
                                </button>
                                <button
                                    onClick={(e) => deleteSession(e, session.id)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-1"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                        {sessions.length === 0 && (
                            <div className="px-1 py-2 text-xs text-gray-400 font-mono">NO_LOGS_FOUND</div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t-2 border-gray-900 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                            OP
                        </div>
                        <div className="flex-1">
                            <div className="text-xs font-bold text-gray-900 uppercase">Operator</div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-gray-500 font-mono">GUEST_ACCESS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Chat Area - White & Clean */}
            <main className="flex-1 flex flex-col relative h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] w-full">

                {/* Top Header - Floating with Blur */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">

                    {/* Mobile Menu Button */}
                    <div className="pointer-events-auto md:hidden mr-2">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>

                    {/* Mode Selector - Technical Tab Style */}
                    <div className="mx-auto bg-white px-1 py-1 border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] pointer-events-auto flex items-center gap-1">
                        {MODES.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id)}
                                className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border border-transparent ${mode === m.id ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                    <div className="w-8"></div> {/* Spacer */}
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-0 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent">
                    <div className="max-w-4xl mx-auto flex flex-col pt-24 md:pt-32 pb-32 md:pb-48">

                        {/* Empty State */}
                        {messages.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 min-h-[50vh] animate-fade-in px-4">
                                <div className="space-y-4">
                                    <div className="relative inline-block">
                                        <div className="absolute -inset-1 rounded-full bg-green-200 animate-pulse blur-sm"></div>
                                        <div className="relative w-24 h-24 rounded-full border-2 border-gray-900 overflow-hidden bg-white">
                                            <img src={mascot} alt="AI Assistant" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">System Ready</h2>
                                        <p className="text-gray-500 font-mono text-sm">Select extraction mode to begin.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                                    <div className="p-4 border-2 border-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-all cursor-pointer group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none" onClick={() => { setMode('project'); setInput("Help me draft a startup idea..."); }}>
                                        <div className="text-[10px] font-bold font-mono text-blue-600 group-hover:text-blue-300 mb-2 uppercase">Project</div>
                                        <div className="font-bold text-sm">Draft Concept</div>
                                    </div>
                                    <div className="p-4 border-2 border-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-all cursor-pointer group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none" onClick={() => { setMode('content'); setInput("Create a Twitter caption for launching..."); }}>
                                        <div className="text-[10px] font-bold font-mono text-purple-600 group-hover:text-purple-300 mb-2 uppercase">Content</div>
                                        <div className="font-bold text-sm">Create Copy</div>
                                    </div>
                                    <div className="p-4 border-2 border-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-all cursor-pointer group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none" onClick={() => { setMode('prompt'); setInput("Optimize this prompt: ..."); }}>
                                        <div className="text-[10px] font-bold font-mono text-emerald-600 group-hover:text-emerald-300 mb-2 uppercase">Prompt</div>
                                        <div className="font-bold text-sm">Refine Prompt</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`group w-full mb-8`}>
                                <div className="flex gap-4 md:gap-6 p-2 md:p-0 text-sm md:text-base m-auto md:max-w-3xl">
                                    <div className={`flex-shrink-0 flex flex-col relative items-end pt-1`}>
                                        <div className={`relative h-16 w-16 border-2 items-center justify-center overflow-hidden flex-shrink-0 ${msg.role === 'assistant'
                                            ? 'border-gray-900 bg-white'
                                            : 'bg-gray-900 border-gray-900'
                                            }`}>
                                            {msg.role === 'assistant' ?
                                                <img
                                                    src={mascot}
                                                    alt="AI"
                                                    className="w-full h-full object-cover"
                                                />
                                                :
                                                <div className="w-full h-full flex items-center justify-center font-mono text-xs font-bold text-white">
                                                    OP
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="relative flex-1 overflow-hidden min-w-0">
                                        <div className="text-[10px] text-gray-400 font-mono font-bold mb-2 uppercase flex items-center gap-2">
                                            {msg.role === 'user' ? 'OPERATOR' : 'JOKI_UNIT'}
                                            <span className="w-full h-px bg-gray-200"></span>
                                        </div>
                                        {msg.role === 'user' ? (
                                            <div className="font-medium text-gray-800 text-lg leading-relaxed">
                                                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                                            </div>
                                        ) : (
                                            <MessageContent content={msg.content} isLatestAssistant={i === messages.length - 1} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="w-full">
                                <div className="flex gap-4 md:gap-6 p-2 md:p-0 text-base m-auto md:max-w-3xl">
                                    <div className="flex-shrink-0 flex flex-col relative items-end pt-1">
                                        <div className="h-10 w-10 border-2 border-dashed border-gray-300 flex items-center justify-center animate-spin-slow">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="relative flex-1 pt-3">
                                        <span className="animate-pulse text-gray-400 font-mono text-xs font-bold uppercase tracking-widest">Processing_Vector...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Fixed Input Area - Brutalist Console */}
                <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t-2 border-gray-900 p-4 md:p-6 z-30">
                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={submit} className="relative flex w-full bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform focus-within:-translate-y-1">
                            <span className="absolute -top-3 left-4 bg-gray-900 text-white text-[10px] font-mono px-2 py-0.5 font-bold uppercase">Input_Stream</span>

                            <textarea
                                ref={textareaRef}
                                className="flex-1 max-h-[150px] md:max-h-[200px] m-0 w-full resize-none border-0 bg-transparent py-4 pl-4 pr-16 focus:ring-0 focus-visible:ring-0 text-gray-900 placeholder-gray-400 text-sm md:text-base font-medium leading-relaxed"
                                placeholder="Enter command..."
                                rows={1}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        submit(e as any);
                                    }
                                }}
                            />

                            {/* Send Button */}
                            <button
                                disabled={!input || isLoading}
                                type="submit"
                                className={`absolute right-2 bottom-2 px-3 py-1.5 text-[10px] font-mono font-bold uppercase border-2 transition-all duration-200 ${!input || isLoading ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-white bg-gray-900 border-gray-900 hover:bg-green-600 hover:border-green-600'}`}
                            >
                                {isLoading ? "EXE.." : "ENTER"}
                            </button>
                        </form>
                        <div className="mt-2 text-center hidden md:block">
                            <span className="text-[10px] text-gray-400 font-mono uppercase">Secure // End-to-End Encrypted</span>
                        </div>
                    </div>
                </div>

            </main>

        </div>
    );
}
