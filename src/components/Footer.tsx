import React from 'react';
import { Twitter, Disc as Discord } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="relative mt-32 pt-24 pb-12 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />

            <div className="max-w-8xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center space-x-4 group cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-2xl relative overflow-hidden border border-white/10 group-hover:scale-105 transition-all duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="white" fillOpacity="0.2" />
                                        <path d="M8 8H13C14.6569 8 16 9.34315 16 11C16 12.6569 14.6569 14 13 14H10V16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter heading-font text-slate-800 uppercase leading-none">Perfectgm</span>
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/60 mt-1">Deployment Platform</span>
                            </div>
                        </div>

                        <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                            The ultimate deployment engine for Web3 enthusiasts. Launch contracts, register domains, and explore the future of decentralized identity.
                        </p>

                        <div className="flex items-center space-x-5">
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                                <Discord className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Platform</h4>
                            <ul className="space-y-4">
                                {['Deployments', 'Domain Service', 'Bridge', 'Airdrops'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors flex items-center group">
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all rounded-full" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Resources</h4>
                            <ul className="space-y-4">
                                {['Documentation', 'Community', 'Security', 'Support'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors flex items-center group">
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all rounded-full" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter / CTA Section */}
                    <div className="lg:col-span-4 lg:pl-12">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-xl shadow-slate-200/50">
                                <h4 className="text-lg font-black text-slate-800 tracking-tight leading-tight mb-2">Join the inner circle.</h4>
                                <p className="text-xs font-medium text-slate-500 mb-6">Get early access to new feature drops and alpha.</p>

                                <div className="space-y-3">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full bg-white/80 border border-slate-200 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                        />
                                    </div>
                                    <button className="w-full bg-slate-950 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                        Subscribe Now
                                    </button>
                                </div>

                                <div className="mt-6 flex items-center justify-center space-x-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 tracking-wider">30K+ JOINED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        © {new Date().getFullYear()} Perfectgm. Crafted for the Superchain.
                    </p>

                    <div className="flex items-center space-x-8">
                        <a href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
