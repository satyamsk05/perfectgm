import React from 'react';
import { ChevronDown, Sun, Fingerprint, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { ink } from '../config/web3';
import GMStreakHeader from './GMStreakHeader';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { address, isConnected } = useAccount();
    const { switchChain } = useSwitchChain();
    const { language, setLanguage, t } = useLanguage();
    const [domainName, setDomainName] = React.useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('perfectgm_theme') as 'light' | 'dark') || 'light';
    });

    // Theme Effect
    React.useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('perfectgm_theme', theme);
    }, [theme]);

    const searchItems = [
        { label: t.checkers, path: '/checkers', icon: '🔍' },
        { label: t.domain, path: '/domain', icon: '💎' },
        { label: t.deploy, path: '/', icon: '🚀' },
        { label: t.dashboard, path: '/dashboard', icon: '📊' },
        { label: 'Base Mainnet', network: 'Base', chainId: base.id, icon: '🔵' },
        { label: 'Ink Network', network: 'Ink', chainId: ink.id, icon: '🟣' },
    ];

    const filteredItems = searchQuery
        ? searchItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : searchItems.slice(0, 4);

    // Reset active index when query changes
    React.useEffect(() => {
        setActiveIndex(0);
    }, [searchQuery]);

    const handleAction = (item: any) => {
        if (item.path) {
            navigate(item.path);
        } else if (item.chainId) {
            switchChain({ chainId: item.chainId });
        }
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsSearchOpen((open) => !open);
            }

            if (isSearchOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (filteredItems[activeIndex]) {
                        handleAction(filteredItems[activeIndex]);
                    }
                } else if (e.key === 'Escape') {
                    setIsSearchOpen(false);
                }
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [isSearchOpen, activeIndex, filteredItems]);

    React.useEffect(() => {
        if (isConnected && address) {
            const savedName = localStorage.getItem(`perfectgm_name_${address}`);
            if (savedName) {
                setDomainName(`${savedName}.perfectgm`);
            } else {
                setDomainName(null);
            }
        }
    }, [isConnected, address]);

    return (
        <>
            <header className="sticky top-0 z-50 w-full glass-effect border-b border-slate-200/50">
                {/* Dynamic Background Glow - Optimized */}
                <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-xl -z-10 pointer-events-none" />

                {/* Top Row: Brand and Actions */}
                <div className="max-w-8xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between border-b border-slate-100/30">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-4 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-slate-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden border border-white/10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="white" fillOpacity="0.2" />
                                        <path d="M8 8H13C14.6569 8 16 9.34315 16 11C16 12.6569 14.6569 14 13 14H10V16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" className="group-hover:stroke-primary transition-colors duration-500" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter heading-font text-slate-800 dark:text-white uppercase leading-none group-hover:text-primary transition-colors">Perfectgm</span>
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/60 mt-0.5 ml-0.5">{t.deploy}</span>
                            </div>
                        </Link>
                    </div>

                    {/* Actions Group */}
                    <div className="flex items-center space-x-4">
                        <div className="relative flex items-center justify-end min-w-[3rem]">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="h-12 flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group relative w-44 hover:w-64 overflow-hidden pl-4 z-10"
                            >
                                <Search className="w-5 h-5 flex-shrink-0 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 text-slate-400 group-hover:text-primary" />
                                <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-slate-400/50 group-hover:text-primary group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">
                                    {t.searchPlaceholder}
                                </span>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 rounded-md px-1.5 py-0.5 text-[8px] font-black shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-white transition-colors">
                                    ⌘K
                                </div>
                            </button>
                        </div>

                        <div className="h-8 w-px bg-slate-200/50 mx-1 hidden lg:block" />

                        {isConnected && domainName && (
                            <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-primary/5 px-2 py-1.5 rounded-xl border border-primary/20 shadow-sm shadow-primary/5 group transition-all hover:border-primary/40">
                                {/* Farcaster Avatar Simulation */}
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-lg bg-slate-200 overflow-hidden border border-white/20">
                                        <img
                                            src={`https://avatar.vercel.sh/${address}`}
                                            alt="avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                                        <span className="text-[5px] text-white font-black">F</span>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-primary uppercase tracking-widest px-2">{domainName}</span>
                            </div>
                        )}

                        {/* Language & Theme Group */}
                        <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                                className="px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600 mr-1"
                            >
                                {language === 'en' ? 'EN' : 'HI'}
                            </button>
                            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
                            <button
                                onClick={() => setTheme('light')}
                                className={`p-2 rounded-xl transition-all ${theme === 'light' ? 'text-primary bg-white shadow-lg shadow-primary/10 border border-primary/10 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <Sun className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'text-cyan-400 bg-slate-900 shadow-lg shadow-cyan-900/20 border border-cyan-500/20 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                <Fingerprint className="w-5 h-5" />
                            </button>
                        </div>

                        <GMStreakHeader />
                        <ConnectButton />
                    </div>
                </div>

                {/* Bottom Row: Navigation */}
                <div className="max-w-8xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-center relative">
                    <nav className="flex items-center space-x-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                        {['Dashboard', 'Leaderboard', 'Airdrop', 'Deploy', 'Domain', 'Checkers'].map((item) => {
                            const path = item === 'Deploy' ? '/' : `/${item.toLowerCase()}`;
                            const isActive = location.pathname === path;
                            const label = t[item.toLowerCase()];
                            return (
                                <Link
                                    key={item}
                                    to={path}
                                    className={`flex items-center space-x-2 hover:text-slate-900 dark:hover:text-white transition-all relative py-4 group ${isActive ? 'text-slate-900 dark:text-white' : ''}`}
                                >
                                    <span className="relative z-10 transition-transform group-hover:-translate-y-0.5">{label || item}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* Search Dashboard Overlay - Moved outside header stacking context */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl flex items-start justify-center pt-[12vh] px-4 overflow-y-auto pb-20"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: -20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: -20, opacity: 0 }}
                            className="w-full max-w-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] border border-white/20 dark:border-slate-700/30 relative h-fit overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative p-8 border-b border-slate-200/20 dark:border-slate-700/30 bg-white/20 dark:bg-slate-800/20">
                                <Search className="absolute left-12 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                                <input
                                    autoFocus
                                    placeholder="Search pages, networks, or domains..."
                                    className="w-full bg-white/40 dark:bg-slate-800/40 border-2 border-slate-200/30 dark:border-slate-700/30 rounded-[1.5rem] py-5 pl-16 pr-8 text-xl font-black text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="p-4 max-h-[60vh] overflow-y-auto">
                                <div className="px-4 py-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Suggestions</p>
                                </div>
                                <div className="space-y-1 mt-2">
                                    {filteredItems.map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAction(item)}
                                            onMouseEnter={() => setActiveIndex(i)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-left ${i === activeIndex
                                                ? 'bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/40 shadow-sm'
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-10 h-10 rounded-xl shadow-sm border flex items-center justify-center text-xl transition-transform ${i === activeIndex ? 'bg-white dark:bg-slate-800 border-primary/20 scale-110' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 group-hover:scale-110'
                                                    }`}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className={`font-black transition-colors ${i === activeIndex ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>{item.label}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
                                                        {item.path ? 'Navigation' : 'Network'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`transition-all ${i === activeIndex ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
                                                <ChevronDown className="w-4 h-4 text-primary -rotate-90" />
                                            </div>
                                        </button>
                                    ))}
                                    {filteredItems.length === 0 && (
                                        <div className="p-12 text-center">
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No results found for "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white/30 p-4 px-8 border-t border-slate-200/20 flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                                        <span className="bg-white/50 px-2 py-0.5 rounded border border-white/40 shadow-sm text-slate-600">ESC</span>
                                        <span>to close</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                                        <span className="bg-white/50 px-2 py-0.5 rounded border border-white/40 shadow-sm text-slate-600">↵</span>
                                        <span>to select</span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest italic opacity-60">Powered by Perfectgm</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
