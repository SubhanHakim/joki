
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
    { id: 'project', label: 'Project Assistant', color: 'text-blue-400', border: 'border-blue-500/30' },
    { id: 'content', label: 'Content & Copy', color: 'text-purple-400', border: 'border-purple-500/30' },
    { id: 'prompt', label: 'Prompt Engineer', color: 'text-emerald-400', border: 'border-emerald-500/30' }
];

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
                    },
                    img: (props: any) => (
                        <div className="relative group inline-block my-4">
                            <img
                                {...props}
                                className="rounded-xl border border-white/10 shadow-2xl max-w-full h-auto"
                            />
                            <a
                                href={props.src}
                                download={`nexora_art_${Date.now()}.png`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-3 right-3 bg-black/60 hover:bg-indigo-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-white/20 shadow-lg"
                                title="Download High-Res"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </a>
                        </div>
                    )
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
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans selection:bg-green-100 selection:text-green-900 overflow-hidden animate-fade-in">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Sidebar - Mobile & Desktop */}
            <aside className={`
          fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-4 flex items-center justify-between border-b border-gray-100">
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-gray-900 tracking-widest font-mono">JOKI_OS</span>
                        <span className="text-[10px] text-green-600 font-mono">READY</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-800">
                    <button
                        onClick={createNewSession}
                        className="w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors text-sm text-gray-600 mb-6 border border-gray-200 hover:border-green-500/30 group"
                    >
                        <div className="w-5 h-5 rounded-full border border-gray-400 group-hover:border-green-500 flex items-center justify-center text-xs group-hover:text-green-600 transition-colors">+</div>
                        New Chat
                    </button>

                    <div className="flex items-center justify-between px-3 py-2 mb-2">
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">History</div>
                        {messages.length > 0 && (
                            <button onClick={exportSession} title="Export Current Log" className="text-xs text-gray-600 hover:text-green-500">
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
                                        ? 'bg-green-50 text-green-700 shadow-sm border border-green-100'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
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

                <div className="p-4 border-t border-gray-200 space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-xs font-bold ring-2 ring-transparent group-hover:ring-green-500/50 text-gray-700">
                            OP
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="text-sm font-medium truncate text-gray-700">
                                Operator
                            </div>
                            <div className="text-xs text-green-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Guest Access
                            </div>
                        </div>
                    </div>

                    {/* Mobile Disconnect Button (Visible only when wallet is connected) */}

                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative h-full bg-gray-50 w-full">

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

                    {/* Center: Mode Selector */}
                    <div className="mx-auto bg-white/80 backdrop-blur-md px-2 py-1.5 rounded-full border border-gray-200 flex items-center gap-1 shadow-lg pointer-events-auto relative z-50">
                        {MODES.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMode(m.id)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${mode === m.id ? 'bg-gray-900 text-white shadow-md ' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    {/* Right Side: Spacer */}
                    <div className="pointer-events-auto flex items-center gap-2 ml-2 flex-shrink-0 w-8">
                        {/* Placeholder to balance layout if needed, or keeping empty */}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-0 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    {/* Added extra padding bottom to account for auto-growing input */}
                    <div className="max-w-3xl mx-auto flex flex-col pt-24 md:pt-28 pb-32 md:pb-64">

                        {/* Empty State ... (No changes needed logic wise, just existing structure) */}
                        {messages.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 opacity-40 select-none px-4 min-h-[50vh]">
                                <div className="w-32 h-32 border border-gray-200 p-2 bg-white rotate-3 hover:rotate-0 transition-transform duration-300 mb-4 shadow-lg">
                                    <div className="w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all">
                                        <img src={mascot} alt="AI Assistant" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-black tracking-tight mb-2 text-gray-900">JOKI <span className="text-green-600">ONLINE</span></h2>
                                    <p className="max-w-xs md:max-w-md text-sm md:text-base text-gray-400 mx-auto leading-relaxed">
                                        Select a mode above. I handle the rest.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-sm md:max-w-2xl">
                                    <div className="p-3 border border-gray-200 bg-white rounded hover:border-green-500/50 hover:bg-green-50 transition-colors cursor-pointer" onClick={() => { setMode('project'); setInput("Help me draft a startup idea..."); }}>
                                        <div className="text-xs text-blue-600 mb-1 font-bold">Project</div>
                                        <div className="text-sm font-medium text-gray-600">Draft AI Concept</div>
                                    </div>
                                    <div className="p-3 border border-gray-200 bg-white rounded hover:border-green-500/50 hover:bg-green-50 transition-colors cursor-pointer" onClick={() => { setMode('content'); setInput("Create a Twitter caption for launching..."); }}>
                                        <div className="text-xs text-purple-600 mb-1 font-bold">Content</div>
                                        <div className="text-sm font-medium text-gray-600">Create Copywriting</div>
                                    </div>
                                    <div className="p-3 border border-gray-200 bg-white rounded hover:border-green-500/50 hover:bg-green-50 transition-colors cursor-pointer" onClick={() => { setMode('prompt'); setInput("Optimize this prompt: ..."); }}>
                                        <div className="text-xs text-emerald-600 mb-1 font-bold">Prompt</div>
                                        <div className="text-sm font-medium text-gray-600">Refine Prompt</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`group w-full text-gray-100`}>
                                <div className="flex gap-3 md:gap-6 p-2 md:p-0 text-sm md:text-base m-auto md:max-w-3xl">
                                    <div className={`flex-shrink-0 flex flex-col relative items-end pt-1`}>
                                        <div className={`relative h-10 w-10 md:h-12 md:w-12 border items-center justify-center p-0.5 shadow-sm overflow-hidden ${msg.role === 'assistant'
                                            ? 'border-green-500/50 bg-white'
                                            : 'bg-gray-200 border-gray-300'
                                            }`}>
                                            {msg.role === 'assistant' ?
                                                <img src={mascot} alt="AI" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300" />
                                                :
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center font-mono text-xs text-gray-500">
                                                    OP
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="relative flex-1 overflow-hidden min-w-0">
                                        {msg.role === 'user' ? (
                                            <div className="font-medium text-gray-800">
                                                <div className="text-[10px] text-gray-400 font-mono mb-1">
                                                    USER
                                                </div>
                                                {msg.content && <div className="whitespace-pre-wrap break-words">{msg.content}</div>}
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
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

                            <form onSubmit={submit} className="relative flex flex-col w-full bg-white border border-gray-200 focus-within:border-green-500 transition-colors overflow-hidden shadow-xl">
                                <span className="absolute top-0 right-0 p-1 text-[8px] font-mono text-gray-400">INPUT_STREAM</span>

                                <textarea
                                    ref={textareaRef}
                                    className="flex-1 max-h-[150px] md:max-h-[200px] m-0 w-full resize-none border-0 bg-transparent py-4 md:py-6 px-4 focus:ring-0 focus-visible:ring-0 text-gray-900 placeholder-gray-400 text-sm md:text-base font-mono font-medium leading-relaxed"
                                    placeholder="> Enter command to JOKI..."
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
                                <div className="absolute right-2 bottom-3">
                                    <button
                                        disabled={!input || isLoading}
                                        type="submit"
                                        className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-300 ${!input || isLoading ? 'text-gray-700 border-transparent' : 'text-black bg-green-400 border-green-500 hover:bg-green-300'}`}
                                    >
                                        {isLoading ? (
                                            "EXE..."
                                        ) : (
                                            "ENTER"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="mt-2 text-center hidden md:block">
                            <span className="text-[10px] text-gray-600 uppercase tracking-widest">Encrypted // End-to-End</span>
                        </div>
                    </div>
                </div>

            </main>

        </div>
    );
}
