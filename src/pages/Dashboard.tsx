import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Flame,
    Globe,
    Box,
    History,
    ShieldCheck,
    ExternalLink,
    ChevronRight,
    TrendingUp
} from 'lucide-react';
import { useAccount } from 'wagmi';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

const Dashboard: React.FC = () => {
    const { t } = useLanguage();
    const { address, isConnected } = useAccount();
    const [streak, setStreak] = useState(0);
    const [domainName, setDomainName] = useState<string | null>(null);

    useEffect(() => {
        if (address) {
            const savedStreak = localStorage.getItem(`gm_streak_${address}`);
            if (savedStreak) setStreak(parseInt(savedStreak));

            const savedName = localStorage.getItem(`perfectgm_name_${address}`);
            if (savedName) setDomainName(savedName);
        }
    }, [address]);

    const stats = [
        { label: t.gmStreak, value: `${streak} Days`, icon: <Flame className="w-6 h-6 text-orange-500" />, detail: 'Level 4 Explorer', progress: 65, color: 'from-orange-500/20 to-orange-500/5' },
        { label: t.deployments, value: '12', icon: <Box className="w-6 h-6 text-primary" />, detail: 'Top 10% Builder', progress: 40, color: 'from-blue-500/20 to-blue-500/5' },
        { label: t.domainNames, value: '3', icon: <Globe className="w-6 h-6 text-emerald-500" />, detail: domainName ? `${domainName}.perfectgm` : 'satya.perfectgm', progress: 85, color: 'from-emerald-500/20 to-emerald-500/5' },
        { label: t.pointsEarned, value: '2,450', icon: <TrendingUp className="w-6 h-6 text-indigo-500" />, detail: 'Elite Status', progress: 92, color: 'from-indigo-500/20 to-indigo-500/5' },
    ];

    const recentActivity = [
        { type: 'Deployment', network: 'Base', target: 'NFT Contract', time: '2 hours ago', status: 'Success' },
        { type: 'Domain', network: 'Ink', target: domainName ? `${domainName}.perfectgm` : 'satya.perfectgm', time: '5 hours ago', status: 'Success' },
        { type: 'GM', network: 'Base Mainnet', target: 'Streak Update', time: '12 hours ago', status: 'Complete' },
        { type: 'Deployment', network: 'Arbitrum', target: 'ERC-20 Token', time: '1 day ago', status: 'Success' },
    ];

    if (!isConnected) {
        return (
            <main className="flex-grow flex items-center justify-center p-8">
                <div className="text-center space-y-6 max-w-md">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mx-auto">
                        <ShieldCheck className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter heading-font">Connect Wallet</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Please connect your wallet to view your personal dashboard and activity.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-8xl">
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
                <div className="flex-grow space-y-8">
                    {/* Header with Explorer Aesthetic */}
                    <div className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-8 md:p-12 border border-slate-800 shadow-2xl">
                        {/* Interactive Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32 rounded-full animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 blur-[80px] -ml-24 -mb-24 rounded-full" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] italic">Active Explorer • Level 12</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter heading-font leading-none">
                                    {t.namaste}, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-emerald-400 italic">{domainName ? `${domainName}.perfectgm` : 'Explorer'}</span>
                                </h1>
                                <p className="text-slate-400 font-bold max-w-md">
                                    {t.kiHaalHai} <span className="text-white bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl min-w-[200px]">
                                <div className="relative">
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * 0.75)} className="text-primary" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                        <span className="text-3xl font-black heading-font">75%</span>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Exp Points</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col items-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Rank: <span className="text-white">Pro Builder</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid - High Fidelity Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden"
                            >
                                {/* Thematic Background Accent */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                            {stat.icon}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic">Stat Ref #{(Math.random() * 100).toFixed(0)}</div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter heading-font leading-none">{stat.value}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-tight">{stat.detail}</p>
                                    </div>
                                    <div className="space-y-1.5 pt-2">
                                        <div className="flex items-center justify-between text-[8px] font-black uppercase text-slate-400 tracking-widest">
                                            <span>Progress</span>
                                            <span className="text-primary">{stat.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stat.progress}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={`h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity Section - Refined Layout */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200/50 dark:border-slate-800 p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50/10 dark:bg-white/5 opacity-50 blur-[120px] pointer-events-none" />

                        <div className="relative z-10 flex items-center justify-between mb-10">
                            <div className="flex items-center space-x-5">
                                <div className="p-4 bg-primary rounded-2xl shadow-lg shadow-primary/20 transition-transform hover:rotate-6">
                                    <History className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">Activity Stream</h2>
                                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic">Real-time ecosystem updates</p>
                                </div>
                            </div>
                            <button className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-all">
                                <span>Explorer</span>
                                <ExternalLink className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="relative z-10 space-y-3">
                            {recentActivity.map((activity, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-100/50 dark:border-slate-700 group hover:-translate-x-1"
                                >
                                    <div className="flex items-center space-x-5">
                                        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all duration-500 group-hover:scale-110">
                                            {activity.type === 'Deployment' ? <Box className="w-6 h-6" /> :
                                                activity.type === 'Domain' ? <Globe className="w-6 h-6" /> :
                                                    <TrendingUp className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 dark:text-slate-100 text-base tracking-tighter">{activity.target}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest italic ${activity.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'
                                                    }`}>
                                                    {activity.status}
                                                </span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                                                    {activity.type} • {activity.network}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-8 text-right">
                                        <div className="hidden sm:block">
                                            <p className="text-[11px] font-black text-slate-500 dark:text-slate-400">{activity.time}</p>
                                            <p className="text-[8px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest italic">Tx Verified</p>
                                        </div>
                                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight className="w-5 h-5 text-primary" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[330px] flex-shrink-0">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
