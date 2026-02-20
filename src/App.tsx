import { useState, useEffect } from 'react';
import { Search, Clock, SlidersHorizontal } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import NetworkCard from './components/NetworkCard';
import DeploymentModal from './components/DeploymentModal';
import DomainService from './pages/DomainService';
import EligibilityChecker from './pages/EligibilityChecker';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';

interface Action {
  label: string;
}

interface Network {
  name: string;
  bgClass: string;
  icon: string;
  badges?: ('new' | 'hot' | 'testnet')[];
  actions: Action[];
}

import Layout from './components/Layout';

import { useLanguage } from './context/LanguageContext';

const ClockDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <div className="text-3xl font-black text-slate-800 tracking-tighter heading-font tabular-nums">
      {formatTime(currentTime)}
    </div>
  );
};

const Home = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);

  const networks: Network[] = [
    { name: 'Base', bgClass: 'bg-blue-600', icon: 'clogo/base.jpg', badges: ['new', 'hot'], actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Megaeth', bgClass: 'bg-black', icon: 'clogo/MegaETH.png', badges: ['new', 'hot'], actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Robinhood Testnet', bgClass: 'bg-lime-400', icon: 'clogo/robinhood.png', badges: ['new', 'hot', 'testnet'], actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Ink', bgClass: 'bg-purple-600', icon: 'clogo/logoInk.png', badges: ['new'], actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Unichain', bgClass: 'bg-pink-500', icon: 'clogo/unichain.jpg', badges: ['new'], actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Soneium', bgClass: 'bg-slate-900', icon: 'clogo/soneium.jpg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Monad', bgClass: 'bg-indigo-900', icon: 'clogo/monad.jpg', badges: ['hot'], actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Stable', bgClass: 'bg-emerald-900', icon: 'clogo/stable.jpg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Abstract', bgClass: 'bg-zinc-900', icon: 'clogo/abstract.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Berachain', bgClass: 'bg-amber-600', icon: 'clogo/bera.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Hyperliquid', bgClass: 'bg-orange-600', icon: 'clogo/hyperliquid.png', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Movement', bgClass: 'bg-blue-400', icon: 'clogo/movement.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Tabi', bgClass: 'bg-red-600', icon: 'clogo/tabi.jpg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Plume', bgClass: 'bg-slate-800', icon: 'clogo/plume.jpg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Taiko', bgClass: 'bg-pink-600', icon: 'clogo/taiko.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Zircuit', bgClass: 'bg-blue-800', icon: 'clogo/zircuit.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Manta', bgClass: 'bg-cyan-600', icon: 'clogo/manta.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Zksync', bgClass: 'bg-indigo-600', icon: 'clogo/logoZksync.png', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Linea', bgClass: 'bg-black', icon: 'clogo/linea.png', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Polygon', bgClass: 'bg-purple-700', icon: 'clogo/polygon.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Sepolia', bgClass: 'bg-slate-400', icon: 'clogo/ether.svg', badges: ['testnet'], actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Holesky', bgClass: 'bg-slate-500', icon: 'clogo/ether.svg', badges: ['testnet'], actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'BSC', bgClass: 'bg-yellow-500', icon: 'clogo/logoBsc.png', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Arbitrum', bgClass: 'bg-blue-900', icon: 'clogo/arbitrum.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Arbitrum Nova', bgClass: 'bg-cyan-900', icon: 'clogo/arbitrum-nova.png', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
    { name: 'Optimism', bgClass: 'bg-red-500', icon: 'clogo/optimism.svg', actions: [{ label: 'GM' }, { label: 'GN' }, { label: 'Deploy NFT' }, { label: 'Deploy Counter' }] },
  ];

  const filteredNetworks = networks.filter((network) => {
    const matchesSearch = network.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' ||
      (activeFilter === 'New Networks' && network.badges?.includes('new')) ||
      (activeFilter === 'Hot Networks' && network.badges?.includes('hot')) ||
      (activeFilter === 'Testnets' && network.badges?.includes('testnet'));
    return matchesSearch && matchesFilter;
  });

  const handleNetworkClick = (network: any) => {
    setSelectedNetwork(network);
    setIsModalOpen(true);
  };

  return (
    <>
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
                  {t.heroTitle1} <span className="text-primary italic">{t.heroTitle2}</span>
                </h1>
                <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
                  {t.heroSub}
                </p>
              </motion.div>

              {/* Integrated Search & Filters Area */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-10">
                <div className="relative flex-grow group">
                  <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative flex items-center bg-white border border-slate-200 rounded-full shadow-sm focus-within:border-primary transition-all">
                    <Search className="w-5 h-5 ml-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
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
                  {[
                    { label: t.all, value: 'All' },
                    { label: t.newNetworks, value: 'New Networks' },
                    { label: t.hotNetworks, value: 'Hot Networks' },
                    { label: t.testnets, value: 'Testnets' }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      className={`whitespace-nowrap px-6 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeFilter === filter.value
                        ? 'bg-primary text-white shadow-lg shadow-blue-100'
                        : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Timer Info - Premium Style */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-6 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/80 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">{t.tasksReset}</span>
                    <span className="text-slate-800 font-bold text-sm">{t.resetDaily}</span>
                  </div>
                </div>
                <ClockDisplay />
              </motion.div>
            </div>

            {/* Network Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredNetworks.length > 0 ? (
                  filteredNetworks.map((network) => (
                    <NetworkCard
                      key={network.name}
                      {...network}
                      isFavorite={network.name === 'Base' || network.name === 'Megaeth' || network.name === 'Robinhood Testnet'}
                      onClick={() => handleNetworkClick(network)}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 text-center"
                  >
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No networks found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Premium Sidebar Component */}
          <div className="w-full lg:w-[330px] flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </main>

      <DeploymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        network={selectedNetwork}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deploy" element={<Home />} />
          <Route path="/domain" element={<DomainService />} />
          <Route path="/checker" element={<EligibilityChecker />} />
          <Route path="/checkers" element={<EligibilityChecker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/airdrop" element={<EligibilityChecker />} />
          <Route path="/airdrops" element={<EligibilityChecker />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
