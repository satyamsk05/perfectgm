import React, { useState } from 'react';
import { Globe, AtSign, ChevronDown, Rocket, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { parseEther } from 'viem';
import { ink } from '../config/web3';
import { useNotification } from '../context/NotificationContext';

const DOMAIN_SERVICE_ADDRESS = '0xF0f0A312026A16a956c98dB1A8052b01c048b6B9';
const DOMAIN_SERVICE_ABI = [
    {
        name: 'register',
        type: 'function',
        stateMutability: 'payable',
        inputs: [{ name: 'name', type: 'string' }],
        outputs: [],
    },
] as const;

const chains = [
    { id: 8453, name: 'Base', symbol: 'ETH', icon: <img src="/clogo/base.jpg" className="w-full h-full object-cover" /> },
    { id: 57073, name: 'Ink', symbol: 'ETH', icon: <img src="/clogo/logoInk.png" className="w-full h-full object-cover" /> },
    { id: 130, name: 'Unichain', symbol: 'ETH', icon: <img src="/clogo/unichain.jpg" className="w-full h-full object-cover" /> },
    { id: 1, name: 'Mainnet', symbol: 'ETH', icon: <img src="/clogo/ether.svg" className="w-full h-full object-cover" /> },
];

const DomainService: React.FC = () => {
    const [name, setName] = useState('');
    const [selectedChain, setSelectedChain] = useState(chains[1]); // Default to Ink
    const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
    const { showToast } = useNotification();

    const { address, isConnected, chainId } = useAccount();
    const { switchChain } = useSwitchChain();
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const handleRegister = async () => {
        if (!name) return;

        // Ensure we are on the Ink chain
        if (chainId !== ink.id) {
            showToast('Switching to Ink Network...', 'info');
            switchChain({ chainId: ink.id });
            return;
        }

        try {
            writeContract({
                address: DOMAIN_SERVICE_ADDRESS,
                abi: DOMAIN_SERVICE_ABI,
                functionName: 'register',
                args: [name],
                value: parseEther('0.00025'),
            });
        } catch (err) {
            showToast('Registration failed', 'error');
        }
    };

    React.useEffect(() => {
        if (isConfirmed && address && name) {
            // Save to localStorage for simulated header resolution
            localStorage.setItem(`perfectgm_name_${address}`, name);
            showToast(`Success! ${name}.perfectgm is yours. 💎`, 'success');
        }
    }, [isConfirmed, address, name, showToast]);

    React.useEffect(() => {
        if (error) {
            showToast('Transaction rejected or failed', 'error');
        }
    }, [error, showToast]);

    return (
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-8xl">
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
                <div className="flex-grow">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black text-slate-800 mb-4 tracking-tighter heading-font leading-tight">
                            Perfectgm <span className="text-primary italic">Names.</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                            Register your unique .perfectgm identity across multiple blockchains and dominate the metaverse.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Side: Registration Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-slate-200/50 shadow-sm"
                        >
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-3 bg-primary/5 rounded-2xl shadow-sm">
                                    <AtSign className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-800">Register Your Name</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Claim your unique .perfectgm identity</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Desired Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="yourname"
                                                className="w-full bg-white border border-slate-200 rounded-full px-6 py-5 text-xl font-black text-slate-800 focus:border-primary outline-none transition-all"
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xl italic group-focus-within:text-primary transition-colors">
                                                .perfectgm
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Chain Selection</label>
                                    <button
                                        className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-full px-6 py-4 hover:border-primary transition-all shadow-sm"
                                        onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden border-2 border-slate-100">
                                                {selectedChain.icon}
                                            </div>
                                            <span className="font-black text-slate-800 text-sm tracking-tight">{selectedChain.name} Network</span>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isChainDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isChainDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden"
                                            >
                                                {chains.map((chain) => (
                                                    <button
                                                        key={chain.id}
                                                        className="w-full flex items-center space-x-3 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                                                        onClick={() => {
                                                            setSelectedChain(chain);
                                                            setIsChainDropdownOpen(false);
                                                        }}
                                                    >
                                                        <div className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden border border-slate-200">
                                                            {chain.icon}
                                                        </div>
                                                        <span className="font-bold text-slate-700">{chain.name}</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-6 shadow-inner">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registration Fee</span>
                                        <span className="text-sm font-black text-slate-800 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">0.00025 ETH</span>
                                    </div>
                                    <p className="text-[10px] font-medium text-slate-400">
                                        * Registration is valid for 1 year and can be renewed indefinitely.
                                    </p>
                                </div>

                                <button
                                    onClick={handleRegister}
                                    disabled={!name || isPending || isConfirming || !isConnected}
                                    className={`w-full flex items-center justify-center space-x-3 py-5 rounded-full font-black text-lg transition-all shadow-lg ${!name || !isConnected
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-primary text-white shadow-blue-100 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]'
                                        }`}
                                >
                                    {isPending || isConfirming ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>{isConfirming ? 'Confirming...' : 'Processing...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Rocket className="w-5 h-5" />
                                            <span>{chainId !== ink.id && isConnected ? 'Switch to Ink' : 'Register Identity'}</span>
                                        </>
                                    )}
                                </button>

                                {isConnected ? (
                                    <div className="flex items-center justify-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
                                    </div>
                                ) : (
                                    <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50">
                                        Connect wallet to start registration
                                    </p>
                                )
                                }

                                {(error || isConfirmed) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-2xl flex items-start space-x-3 ${isConfirmed ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                                            }`}
                                    >
                                        {isConfirmed ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        )}
                                        <div className="flex-grow min-w-0">
                                            <p className={`text-xs font-bold ${isConfirmed ? 'text-green-700' : 'text-red-700'}`}>
                                                {isConfirmed ? 'Success! Domain registered.' : (error as any)?.shortMessage || 'Transaction failed.'}
                                            </p>
                                            {hash && (
                                                <a
                                                    href={`https://explorer.inkonchain.com/tx/${hash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`text-[10px] font-black uppercase tracking-widest mt-1 block hover:underline ${isConfirmed ? 'text-green-600' : 'text-red-600'
                                                        }`}
                                                >
                                                    View on Explorer →
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Right Side: Supported Chains */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-slate-200/50 shadow-sm"
                        >
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-3 bg-primary/5 rounded-2xl shadow-sm">
                                    <Globe className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-800">Supported Chains</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global cross-chain registry</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {chains.map((chain) => (
                                    <div
                                        key={chain.id}
                                        onClick={() => setSelectedChain(chain)}
                                        className={`flex items-center space-x-4 p-4 bg-white border rounded-[2rem] hover:border-primary transition-all cursor-pointer group shadow-sm ${selectedChain.id === chain.id ? 'border-primary ring-2 ring-primary/10' : 'border-slate-100'
                                            }`}
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full group-hover:scale-110 transition-transform overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                                            {chain.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-black text-slate-800 truncate">{chain.name}</p>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">{chain.symbol}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
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

export default DomainService;
