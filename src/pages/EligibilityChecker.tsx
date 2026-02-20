import { useState } from 'react';
import { ExternalLink, Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

const checkers = [
    { name: 'Ramses', icon: 'clogo/base.jpg', category: 'Live' },
    { name: 'Anichess', icon: 'A', category: 'Upcoming' },
    { name: 'Beamable', icon: 'B', category: 'Live' },
    { name: 'Monad', icon: 'clogo/monad.jpg', category: 'Upcoming' },
    { name: 'Capx AI', icon: 'C', category: 'Live' },
    { name: 'Allora', icon: 'A', category: 'Upcoming' },
    { name: 'Ethena', icon: 'clogo/linea.png', category: 'Live' },
    { name: 'Ink', icon: 'clogo/logoInk.png', category: 'Upcoming' },
    { name: 'Berachain', icon: 'clogo/bera.svg', category: 'Upcoming' },
    { name: 'Hyperliquid', icon: 'clogo/hyperliquid.png', category: 'Live' },
    { name: 'Movement', icon: 'clogo/movement.svg', category: 'Upcoming' },
    { name: 'Taiko', icon: 'clogo/taiko.svg', category: 'Live' },
    { name: 'Zircuit', icon: 'clogo/zircuit.svg', category: 'Upcoming' },
    { name: 'Manta', icon: 'clogo/manta.svg', category: 'Live' },
    { name: 'Zksync', icon: 'clogo/logoZksync.png', category: 'Live' },
    { name: 'Polygon', icon: 'clogo/polygon.svg', category: 'Live' },
];

const EligibilityChecker: React.FC = () => {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredCheckers = checkers.filter((checker) => {
        const matchesSearch = checker.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || checker.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-8xl">
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
                {/* Main Content Area */}
                <div className="flex-grow">
                    {/* Premium Hero Section */}
                    <div className="mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h1 className="text-5xl font-black text-slate-800 mb-4 tracking-tighter heading-font leading-tight">
                                AirDrop <span className="text-primary italic">{t.checkers}.</span>
                            </h1>
                            <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
                                {t.checkEligibility}
                            </p>
                        </motion.div>

                        {/* Search & Filters */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-10">
                            <div className="relative flex-grow group">
                                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <div className="relative flex items-center bg-white border border-slate-200 rounded-full shadow-sm focus-within:border-primary transition-all">
                                    <Search className="w-5 h-5 ml-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search airdrop checkers..."
                                        className="w-full bg-transparent px-4 py-4.5 outline-none text-slate-700 font-semibold"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <div className="hidden md:flex items-center space-x-1.5 mr-4 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 py-1 overflow-x-auto no-scrollbar">
                                {['All', 'Live', 'Upcoming'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`whitespace-nowrap px-6 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeFilter === filter
                                            ? 'bg-primary text-white shadow-lg shadow-blue-100'
                                            : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredCheckers.length > 0 ? (
                                filteredCheckers.map((checker) => (
                                    <motion.div
                                        key={checker.name}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-6 border border-slate-200/50 shadow-sm flex flex-col items-center text-center group transition-all"
                                    >
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative w-20 h-20 rounded-full border-[3px] border-white bg-slate-50 shadow-inner overflow-hidden flex items-center justify-center">
                                                {checker.icon.includes('/') ? (
                                                    <img src={checker.icon} alt={checker.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-2xl font-black text-slate-300">{checker.icon}</span>
                                                )}
                                            </div>
                                            <div className={`absolute -top-1 -right-1 px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${checker.category === 'Live' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {checker.category}
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-black text-slate-800 mb-1">{checker.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 w-full">Network Checker</p>

                                        <button className="w-full py-3.5 bg-slate-50 border border-slate-100 hover:bg-primary hover:text-white hover:border-primary rounded-full flex items-center justify-center space-x-2 transition-all group/btn">
                                            <span className="text-xs font-black uppercase tracking-widest">Verify Now</span>
                                            <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100" />
                                        </button>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 text-center"
                                >
                                    <div className="text-4xl mb-4">🔍</div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">No checkers found</h3>
                                    <p className="text-slate-500">Try adjusting your search or filters.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[330px] flex-shrink-0">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
};

export default EligibilityChecker;
