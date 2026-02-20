import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, Info } from 'lucide-react';

export const BridgeWidget: React.FC = () => (
    <motion.div
        whileHover={{ y: -3 }}
        className="glass-card p-4 rounded-[1.5rem] flex items-center justify-between border-l-4 border-l-primary premium-shadow group cursor-pointer"
    >
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform flex-shrink-0">
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </div>
            <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0">Bridge NOW on</p>
                <p className="text-sm font-black text-slate-800 tracking-tight heading-font">Polymer! 🌈</p>
            </div>
        </div>
    </motion.div>
);

import { useAccount } from 'wagmi';

export const GMStreakWidget: React.FC = () => {
    const { address } = useAccount();
    const [streak, setStreak] = React.useState(0);

    React.useEffect(() => {
        if (address) {
            const savedStreak = localStorage.getItem(`gm_streak_${address}`);
            if (savedStreak) setStreak(parseInt(savedStreak));
        }
    }, [address]);

    return (
        <motion.div
            whileHover={{ y: -3 }}
            className="glass-card p-5 rounded-[1.5rem] space-y-4 premium-shadow"
        >
            <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GM Streak</h4>
                <div className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 text-[9px] font-black text-slate-600">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full pulse-primary"></div>
                    <span>Base Mainnet</span>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full" />
                    <div className="text-3xl relative z-10 animate-float">🔥</div>
                </div>
                <div>
                    <div className="text-3xl font-black text-slate-800 tracking-tighter heading-font">{streak} <span className="text-base font-bold text-slate-400 tracking-normal">days</span></div>
                    <p className="text-[10px] font-semibold text-slate-500 tracking-wide">Keep your streak alive!</p>
                </div>
            </div>
        </motion.div>
    );
};

export const ReferralWidget: React.FC = () => (
    <motion.div
        whileHover={{ y: -3 }}
        className="relative overflow-hidden p-6 rounded-[2rem] space-y-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-100/50 shadow-xl shadow-indigo-100/20"
    >
        <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
            <UserPlus className="w-20 h-20 text-indigo-500" />
        </div>

        <div className="flex items-center space-x-3 relative z-10">
            <div className="w-12 h-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
                <UserPlus className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
                <p className="text-base font-black text-indigo-900 tracking-tight heading-font leading-tight">Refer & Earn!</p>
                <p className="text-[10px] font-bold text-indigo-500/80">Invite friends and earn 10%</p>
            </div>
        </div>

        <div className="flex items-center space-x-2 relative z-10">
            <Info className="w-3 h-3 text-indigo-400" />
            <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider italic">Rewards added automatically</p>
        </div>

        <button className="w-full bg-white/60 backdrop-blur-md border border-indigo-100 text-indigo-400 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm cursor-not-allowed relative z-10">
            LOADING...
        </button>
    </motion.div>
);

import { Fuel, Zap, Droplets } from 'lucide-react';
import { useGasPrice } from 'wagmi';
import { formatUnits } from 'viem';
import { mainnet, base } from 'wagmi/chains';
import { ink } from '../config/web3';

export const GasTracker: React.FC = () => {
    const { data: ethPriceRaw } = useGasPrice({ chainId: mainnet.id, query: { refetchInterval: 10000 } });
    const { data: basePriceRaw } = useGasPrice({ chainId: base.id, query: { refetchInterval: 10000 } });
    const { data: inkPriceRaw } = useGasPrice({ chainId: ink.id, query: { refetchInterval: 10000 } });

    const formatGas = (raw: any, decimals: number = 2) => {
        if (!raw) return '...';
        const gwei = parseFloat(formatUnits(raw, 9));
        // For L2s, if it's very low, show more decimals. For Mainnet, 0-1 is fine.
        return gwei < 0.1 ? gwei.toFixed(4) : gwei.toFixed(decimals);
    };

    const gasValues = {
        eth: formatGas(ethPriceRaw, 0),
        base: formatGas(basePriceRaw, 2),
        ink: formatGas(inkPriceRaw, 2)
    };

    const GasRow = ({ icon: Icon, network, value, colorClass }: any) => {
        return (
            <div className="flex items-center justify-between group/row relative py-1">
                <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${colorClass} group-hover/row:scale-110 shadow-sm border border-black/5 dark:border-white/5`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{network}</span>
                </div>
                <div className="flex flex-col items-end">
                    <motion.div
                        key={value}
                        initial={{ opacity: 0.5, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-1.5"
                    >
                        <span className="text-sm font-black text-slate-800 dark:text-white tabular-nums tracking-tight">
                            {value}
                        </span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-tighter">Gwei</span>
                    </motion.div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl p-6 rounded-[2.5rem] space-y-6 border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/30 dark:shadow-black/20 overflow-hidden"
        >
            {/* Dynamic Background Pulse */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[40px] rounded-full animate-pulse" />

            <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-0.5">
                    <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic">Live Network</h4>
                    <p className="text-xs font-black text-slate-800 dark:text-white tracking-widest uppercase">Gas Tracker</p>
                </div>
                <div className="flex items-center space-x-1.5 bg-emerald-500/10 dark:bg-emerald-500/5 px-2.5 py-1 rounded-full border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest italic animate-pulse">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span>LIVE</span>
                </div>
            </div>

            <div className="relative z-10 space-y-4 pt-2">
                <GasRow
                    icon={Zap}
                    network="Ethereum"
                    value={gasValues.eth}
                    colorClass="bg-slate-100 dark:bg-slate-800 text-slate-500"
                    shadowClass="bg-slate-400/30"
                />
                <div className="h-px w-full bg-slate-100/50 dark:bg-slate-800/30" />
                <GasRow
                    icon={Fuel}
                    network="Base"
                    value={gasValues.base}
                    colorClass="bg-blue-500/10 dark:bg-blue-500/5 text-blue-500"
                    shadowClass="bg-blue-500/40 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
                <div className="h-px w-full bg-slate-100/50 dark:bg-slate-800/30" />
                <GasRow
                    icon={Droplets}
                    network="Ink"
                    value={gasValues.ink}
                    colorClass="bg-purple-500/10 dark:bg-purple-500/5 text-purple-500"
                    shadowClass="bg-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                />
            </div>

            <p className="relative z-10 text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest text-center pt-2 italic">
                Real-time data via Wagmi
            </p>
        </motion.div>
    );
};

const Sidebar: React.FC = () => {
    return (
        <aside className="space-y-4">
            <GasTracker />
            <BridgeWidget />
            <GMStreakWidget />
            <ReferralWidget />
        </aside>
    );
};

export default Sidebar;
