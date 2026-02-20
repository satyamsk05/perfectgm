import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Repeat } from 'lucide-react';

interface Action {
    label: string;
    fullWidth?: boolean;
}

interface NetworkCardProps {
    name: string;
    icon: React.ReactNode | string;
    bgClass: string;
    badges?: ('new' | 'hot' | 'testnet')[];
    actions: Action[];
    hasBridge?: boolean;
    isFavorite?: boolean;
    onClick?: () => void;
}

const NetworkCard: React.FC<NetworkCardProps> = ({
    name,
    icon,
    bgClass,
    badges = [],
    isFavorite = false,
    onClick,
}) => {
    return (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -10,
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.1), 0 0 40px rgba(59, 130, 246, 0.05)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="group relative bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-5 border border-slate-200/50 transition-all cursor-pointer flex flex-col items-center overflow-hidden h-full shadow-sm"
        >
            {/* Top Bar (Heart & Badges) */}
            <div className="w-full flex justify-between items-start mb-2">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-2xl bg-slate-50 shadow-sm border border-slate-100 ${isFavorite ? 'text-red-500' : 'text-slate-300'} transition-colors`}
                >
                    <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={3} />
                </motion.button>

                <div className="flex flex-col items-end space-y-1.5">
                    {badges.includes('new') && (
                        <span className="px-2.5 py-1 bg-emerald-400 text-white text-[9px] font-black tracking-[0.15em] uppercase rounded-full shadow-lg shadow-emerald-200/50">
                            NEW
                        </span>
                    )}
                    {badges.includes('hot') && (
                        <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="px-2.5 py-1 bg-white text-orange-500 text-[9px] font-black tracking-[0.15em] uppercase rounded-full border border-orange-100 shadow-sm flex items-center"
                        >
                            🔥 HOT
                        </motion.span>
                    )}
                </div>
            </div>

            {/* Horizontal Header (Icon & Name) */}
            <div className="w-full flex items-center space-x-4 mb-4 mt-2 px-1">
                {/* Scaled Icon - 25% Larger (75px) */}
                <div className="relative group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500/15 blur-xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative w-[75px] h-[75px] rounded-full border-[3px] border-white bg-slate-50 shadow-inner flex items-center justify-center overflow-hidden p-0.5">
                        <div className={`w-full h-full rounded-full ${bgClass} flex items-center justify-center overflow-hidden border border-black/5 shadow-md shadow-black/5`}>
                            {typeof icon === 'string' ? (
                                <img src={icon} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="transform scale-150 text-white">{icon}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Network Name - Premium Typography */}
                <h3 className="text-xl font-black text-slate-800 tracking-tight heading-font leading-tight">{name}</h3>
            </div>

            {/* Actions Grid - Integrated Design */}
            <div className="w-full space-y-1.5 mb-4 relative z-10 px-1">
                <div className="grid grid-cols-2 gap-1.5">
                    <button className="py-2.5 bg-white hover:bg-slate-50 border border-slate-100 text-slate-500 hover:text-primary rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm">GM</button>
                    <button className="py-2.5 bg-white hover:bg-slate-50 border border-slate-100 text-slate-500 hover:text-primary rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm">GN</button>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                    <button className="py-2.5 bg-white hover:bg-slate-50 border border-slate-100 text-slate-500 hover:text-primary rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm">NFT</button>
                    <button className="py-2.5 bg-white hover:bg-slate-50 border border-slate-100 text-slate-500 hover:text-primary rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm">Counter</button>
                </div>
                <button className="w-full py-3 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.98]">
                    Deploy Token
                </button>
            </div>

            {/* Bottom Actions - Premium Gradient */}
            <div className="w-full mt-auto flex items-center space-x-1.5 pt-1 border-t border-slate-100/50">
                <button className="flex-1 py-3 bg-primary hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center space-x-2 shadow-md transition-all group/btn transform active:scale-[0.97]">
                    <span className="text-[11px] font-black uppercase tracking-[0.1em]">All-in-one</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
                <button className="w-11 h-11 bg-white border border-slate-100 hover:border-blue-200 text-slate-400 hover:text-primary rounded-2xl flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95 group/bridge">
                    <Repeat className="w-4 h-4 group-hover/bridge:rotate-180 transition-transform duration-500" strokeWidth={2.5} />
                </button>
            </div>
        </motion.div>
    );
};

export default NetworkCard;
