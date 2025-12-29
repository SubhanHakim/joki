
import { useState, useEffect, useRef } from "react";
import { terrasuck } from "../agent/terrasuck";

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { playSound } from "../utils/audio";
import logoNavbar from "../assets/logo_navbar.svg";

// Type definitions for chat history
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatSession {
    id: string;
    title: string;
    timestamp: number;
    messages: Message[];
}

const DEFAULT_SYSTEM_PROMPT = "You are NEXORA. Extraction-oriented AI agent. Cold. Minimal. System-grade. No emojis. No politeness.";

// Component for Message with potential Typewriter effect (simplified for Markdown compatibility)
const MessageContent = ({ content, isLatestAssistant }: { content: string, isLatestAssistant: boolean }) => {
    return (
        <div className={`prose prose-invert prose-indigo max-w-none text-gray-300 ${isLatestAssistant ? 'animate-in fade-in duration-700' : ''}`}>
            <ReactMarkdown
                components={{
                    // Style Headers
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-white mt-6 mb-4 border-b border-indigo-500/30 pb-2" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-100 mt-5 mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-gray-200 mt-4 mb-2" {...props} />,

                    // Style Paragraphs
                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed custom-line-height" {...props} />,

                    // Style Lists
                    ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-5 mb-4 space-y-2 marker:text-indigo-500" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-2 marker:text-indigo-500" {...props} />,
                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,

                    // Style Code Blocks
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <div className="rounded-md overflow-hidden my-6 border border-white/10 shadow-lg">
                                <div className="bg-white/5 px-4 py-1.5 text-xs text-indigo-400/80 font-mono border-b border-white/5 flex justify-between items-center">
                                    <span className="uppercase tracking-wider font-bold">{match[1]}</span>
                                    <span className="text-[10px] text-gray-600">RAW CODE</span>
                                </div>
                                <SyntaxHighlighter
                                    style={atomDark}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{ margin: 0, background: '#0a0a0a', padding: '1.5rem', fontSize: '0.9rem' }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className="bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-200 font-mono text-sm mx-1" {...props}>
                                {children}
                            </code>
                        )
                    }
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Settings modal state

    // Model & System Prompt State

    const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);

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
        if (!input || isLoading) return;

        playSound('send');
        const userMessage = input;
        const newHistoryUser = [...messages, { role: 'user', content: userMessage } as Message];

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
            const output = await terrasuck(userMessage, systemPrompt);
            playSound('receive');
            const newHistoryAssistant = [...newHistoryUser, { role: 'assistant', content: output } as Message];
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
        <div className="flex h-screen bg-black text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden animate-fade-in">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Sidebar - Mobile & Desktop */}
            <aside className={`
          fixed inset-y-0 left-0 z-50 w-[280px] bg-[#050505] border-r border-white/5 
          transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-4 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 group">
                        <img src={logoNavbar} alt="NEXORA" className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-800">
                    <button
                        onClick={createNewSession}
                        className="w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 hover:bg-white/5 transition-colors text-sm text-gray-300 mb-6 border border-white/10 hover:border-orange-500/30 group"
                    >
                        <div className="w-5 h-5 rounded-full border border-gray-500 group-hover:border-indigo-500 flex items-center justify-center text-xs group-hover:text-indigo-500 transition-colors">+</div>
                        New Extraction
                    </button>

                    <div className="flex items-center justify-between px-3 py-2 mb-2">
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">History</div>
                        {messages.length > 0 && (
                            <button onClick={exportSession} title="Export Current Log" className="text-xs text-gray-600 hover:text-indigo-500">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </button>
                        )}
                    </div>

                    <div className="space-y-1">
                        {sessions.map(session => (
                            <div key={session.id} className="relative group/item">
                                <button
                                    onClick={() => loadSession(session)}
                                    className={`w-full text-left px-3 py-2.5 rounded text-sm transition-all truncate pr-8 ${currentSessionId === session.id
                                        ? 'bg-white/10 text-white shadow-inner'
                                        : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                                        }`}
                                >
                                    {session.title || "Untitled Session"}
                                </button>
                                <button
                                    onClick={(e) => deleteSession(e, session.id)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-1"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                        {sessions.length === 0 && (
                            <div className="px-3 py-2 text-sm text-gray-700 italic">No logs found.</div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-2 py-2 rounded hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-blue-600 flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-indigo-500/50">
                            OP
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="text-sm font-medium truncate text-gray-300">
                                Operator
                            </div>
                            <div className="text-xs text-green-500 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Guest Access
                            </div>
                        </div>
                    </div>

                    {/* Mobile Disconnect Button (Visible only when wallet is connected) */}

                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative h-full bg-black w-full">

                {/* Top Header Floating - Mobile Optimized */}
                <div className="absolute top-0 left-0 right-0 p-3 md:p-4 flex justify-between items-center z-20 pointer-events-none">
                    {/* Gradient Mask for Smooth Scroll under Header */}
                    <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-black via-black/80 to-transparent -z-10 pointer-events-none"></div>

                    {/* Left Side: Mobile Menu */}
                    <div className="pointer-events-auto md:hidden mr-2 flex-shrink-0">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-[#1a1a1a] rounded-lg border border-white/10 text-gray-400 hover:text-white active:bg-white/10 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>

                    {/* Center: Model Selector (Fixed) */}
                    <div className="mx-auto bg-[#1a1a1a]/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 md:gap-3 shadow-2xl pointer-events-auto relative z-50">
                        <span className="text-xs md:text-sm font-medium text-white flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            GPT-5.2
                        </span>
                        <div className="h-3 w-px bg-white/10 hidden sm:block"></div>
                        <span className="text-[10px] text-orange-500 font-bold tracking-widest px-1 hidden sm:inline">GOD MODE</span>
                    </div>

                    {/* Right Side: Settings & Wallet */}
                    <div className="pointer-events-auto flex items-center gap-2 ml-2 flex-shrink-0">
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-2 bg-[#1a1a1a]/80 backdrop-blur rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-indigo-500/30 transition-all active:scale-95"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </button>

                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-0 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    {/* Added extra padding bottom to account for auto-growing input */}
                    <div className="max-w-3xl mx-auto flex flex-col pt-24 md:pt-28 pb-32 md:pb-64">

                        {/* Empty State ... (No changes needed logic wise, just existing structure) */}
                        {messages.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 opacity-40 select-none px-4 min-h-[50vh]">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                                    <span className="text-4xl md:text-5xl text-gray-500">❖</span>
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">System Ready</h2>
                                    <p className="max-w-xs md:max-w-md text-sm md:text-base text-gray-400 mx-auto leading-relaxed">
                                        Awaiting input from node <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 font-mono font-bold">GUEST_NODE_01</span>.
                                        Configure persona in settings.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm md:max-w-lg">
                                    <div className="p-3 border border-white/10 rounded hover:border-indigo-500/50 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setInput("Analyze current market sentiment")}>
                                        <div className="text-xs text-gray-500 mb-1">Command</div>
                                        <div className="text-sm font-medium text-gray-300">Analyze market sentiment &rarr;</div>
                                    </div>
                                    <div className="p-3 border border-white/10 rounded hover:border-indigo-500/50 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setInput("Extract key entities from text")}>
                                        <div className="text-xs text-gray-500 mb-1">Task</div>
                                        <div className="text-sm font-medium text-gray-300">Extract key entities &rarr;</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`group w-full text-gray-100`}>
                                <div className="flex gap-3 md:gap-6 p-2 md:p-0 text-sm md:text-base m-auto md:max-w-3xl">
                                    <div className={`flex-shrink-0 flex flex-col relative items-end pt-1`}>
                                        <div className={`relative h-6 w-6 md:h-8 md:w-8 rounded-lg flex items-center justify-center shadow-lg ${msg.role === 'assistant'
                                            ? 'bg-gradient-to-br from-red-600 to-blue-600'
                                            : 'bg-gradient-to-br from-gray-800 to-black border border-gray-700'
                                            }`}>
                                            {msg.role === 'assistant' ?
                                                <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                                :
                                                <div className="w-full h-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
                                                    <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full blur-[2px]"></div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="relative flex-1 overflow-hidden min-w-0">
                                        {msg.role === 'user' ? (
                                            <div className="font-medium text-gray-200">
                                                <div className="text-[10px] text-gray-500 font-mono mb-1">
                                                    GUEST_NODE
                                                </div>
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
                            <div className="w-full text-gray-100">
                                <div className="flex gap-4 md:gap-6 p-2 md:p-0 text-base m-auto md:max-w-3xl">
                                    <div className="flex-shrink-0 flex flex-col relative items-end pt-1">
                                        <div className="relative h-6 w-6 md:h-8 md:w-8 rounded-lg flex items-center justify-center bg-transparent border border-orange-500/30">
                                            <span className="flex w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-500 rounded-full animate-ping"></span>
                                        </div>
                                    </div>
                                    <div className="relative flex-1 overflow-hidden pt-1">
                                        <span className="animate-pulse text-gray-500 font-mono text-xs md:text-sm">PROCESSING_VECTOR...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Fixed Input Area - Mobile Optimized */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black to-transparent pt-8 pb-4 md:pb-8 px-2 md:px-0 z-30">
                    <div className="max-w-3xl mx-auto px-1 md:px-4">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <form onSubmit={submit} className="relative flex items-end w-full bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden focus-within:border-indigo-500/40 focus-within:bg-[#1f1f1f] transition-all">
                                <textarea
                                    ref={textareaRef}
                                    className="flex-1 max-h-[150px] md:max-h-[200px] m-0 w-full resize-none border-0 bg-transparent py-3 md:py-4 pl-3 md:pl-4 pr-10 md:pr-12 focus:ring-0 focus-visible:ring-0 text-white placeholder-gray-500 leading-relaxed text-sm md:text-base scrollbar-thin scrollbar-thumb-gray-600"
                                    placeholder="Transmission content..."
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
                                <button
                                    disabled={!input || isLoading}
                                    type="submit"
                                    className="absolute bottom-1.5 md:bottom-2.5 right-1.5 md:right-2 p-2 rounded-xl text-gray-400 hover:bg-indigo-600 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            </form>
                        </div>
                        <div className="mt-2 text-center hidden md:block">
                            <span className="text-[10px] text-gray-600 uppercase tracking-widest">Encrypted // End-to-End</span>
                        </div>
                    </div>
                </div>

            </main>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <h3 className="font-bold text-gray-200">System Configuration</h3>
                            <button onClick={() => setIsSettingsOpen(false)} className="text-gray-500 hover:text-white">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Agent Persona (System Prompt)</label>
                                <textarea
                                    className="w-full h-32 bg-black border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none transition-all"
                                    value={systemPrompt}
                                    onChange={(e) => setSystemPrompt(e.target.value)}
                                    placeholder="Define how the AI should behave..."
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    onClick={() => setSystemPrompt(DEFAULT_SYSTEM_PROMPT)}
                                    className="px-4 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-white/5 transition-colors"
                                >
                                    Reset to Default
                                </button>
                                <button
                                    onClick={() => {
                                        setIsSettingsOpen(false);
                                        playSound('click');
                                    }}
                                    className="px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-blue-600 text-white hover:opacity-90 transition-colors shadow-lg shadow-indigo-900/20"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
