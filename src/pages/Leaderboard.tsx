import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, ArrowUpRight, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

const Leaderboard: React.FC = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = React.useState('');

    const topThree = [
        { rank: 2, name: 'OxAlpha...4b21', points: '14,250', xp: 'Level 42', avatar: 'https://i.pravatar.cc/150?img=32', color: 'text-slate-400', bg: 'bg-slate-100' },
        { rank: 1, name: 'satya.perfectgm', points: '18,840', xp: 'Level 50', avatar: 'https://i.pravatar.cc/150?img=68', color: 'text-amber-500', bg: 'bg-amber-100' },
        { rank: 3, name: 'Web3Guru...e912', points: '12,900', xp: 'Level 38', avatar: 'https://i.pravatar.cc/150?img=12', color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    const rankings = [
        { rank: 4, name: 'CryptoKing', points: '11,200', xp: 'Level 35', change: '+2', trend: 'up' },
        { rank: 5, name: 'EthWhale', points: '10,850', xp: 'Level 32', change: '-1', trend: 'down' },
        { rank: 6, name: 'Layer2God', points: '9,400', xp: 'Level 28', change: '0', trend: 'neutral' },
        { rank: 7, name: 'DefiDegen', points: '8,900', xp: 'Level 25', change: '+5', trend: 'up' },
        { rank: 8, name: 'NftMaster', points: '7,600', xp: 'Level 22', change: '+1', trend: 'up' },
        { rank: 9, name: 'InkExplorer', points: '6,200', xp: 'Level 18', change: '-3', trend: 'down' },
        { rank: 10, name: 'BaseBuilder', points: '5,500', xp: 'Level 15', change: '0', trend: 'neutral' },
    ];

    const filteredRankings = rankings.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-8xl">
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
                <div className="flex-grow space-y-12">
                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 mb-4"
                        >
                            <Trophy className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">Global Rankings</span>
                        </motion.div>
                        <h1 className="text-5xl font-black text-slate-800 tracking-tighter heading-font leading-tight">
                            Top <span className="text-primary italic">Explorers.</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                            The elite circle of builders and innovators on the Superchain.
                        </p>
                    </div>

                    {/* Podium Section */}
                    <div className="flex flex-col md:flex-row items-end justify-center gap-6 pt-12">
                        {topThree.map((user, i) => (
                            <motion.div
                                key={user.rank}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative flex flex-col items-center ${user.rank === 1 ? 'order-1 md:order-2 mb-8' : user.rank === 2 ? 'order-2 md:order-1' : 'order-3'
                                    }`}
                            >
                                <div className="relative mb-4">
                                    <div className={`absolute inset-0 ${user.rank === 1 ? 'bg-amber-400/30' : 'bg-slate-400/20'} blur-3xl rounded-full`} />
                                    <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] border-4 ${user.rank === 1 ? 'border-amber-400' : 'border-white'} overflow-hidden shadow-2xl`}>
                                        <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                                    </div>
                                    <div className={`absolute -bottom-2 -right-2 w-10 h-10 ${user.bg} rounded-2xl flex items-center justify-center shadow-lg border-2 border-white`}>
                                        {user.rank === 1 ? <Trophy className="w-5 h-5 text-amber-500" /> : <Medal className={`w-5 h-5 ${user.color}`} />}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">{user.name}</h3>
                                    <div className="flex items-center justify-center space-x-2 mt-1">
                                        <span className="text-primary font-black">{user.points}</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.points}</span>
                                    </div>
                                </div>
                                {/* Visual Podium Base */}
                                <div className={`mt-6 w-48 h-2 ${user.bg} rounded-full opacity-50`} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Search Table Section */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200/50 dark:border-slate-800 p-8 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">Rankings</h2>
                            <div className="relative w-full md:w-64 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search player..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-700 dark:text-slate-100 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                                        <th className="px-6 py-4">Rank</th>
                                        <th className="px-6 py-4">Explorer</th>
                                        <th className="px-6 py-4">Points</th>
                                        <th className="px-6 py-4">Level</th>
                                        <th className="px-6 py-4">Change</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                    {filteredRankings.map((user) => (
                                        <motion.tr
                                            key={user.rank}
                                            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.02)' }}
                                            className="group"
                                        >
                                            <td className="px-6 py-5">
                                                <span className="text-lg font-black text-slate-400 group-hover:text-primary transition-colors">#{user.rank}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <span className="font-bold text-slate-800 dark:text-slate-100">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center space-x-1.5">
                                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                    <span className="font-black text-slate-800 dark:text-slate-100">{user.points}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    {user.xp}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`text-[10px] font-black uppercase ${user.trend === 'up' ? 'text-emerald-500' : user.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                                                    {user.change}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all hover:text-primary">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Component */}
                <div className="w-full lg:w-[330px] flex-shrink-0">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
};

export default Leaderboard;
