import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Share2, Loader2, Sparkles } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { useNotification } from '../context/NotificationContext';
import { triggerPataka } from '../utils/confetti';

interface Network {
    name: string;
    bgClass: string;
    icon: React.ReactNode | string;
}

interface DeploymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    network: Network | null;
}

const COUNTER_ABI = [
    { name: 'increment', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] },
] as const;

// Example address for testing (Replace with real ones per network if needed)
const TEST_COUNTER_ADDRESS = '0x1234567890123456789012345678901234567890';

const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose, network }) => {
    const { isConnected } = useAccount();
    const { showToast } = useNotification();
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [activeTask, setActiveTask] = useState<string | null>(null);

    const { data: hash, error, writeContract } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isConfirmed) {
            setCompletedTasks(prev => [...prev, activeTask!]);
            showToast('Contract deployed successfully! 🚀', 'success');
            triggerPataka(); // BLAST!
            setActiveTask(null);
        }
    }, [isConfirmed, activeTask, showToast]);

    useEffect(() => {
        if (error) {
            showToast('Transaction failed', 'error');
            setActiveTask(null);
        }
    }, [error, showToast]);

    if (!network) return null;

    const tasks = [
        { id: 'gm', label: 'Say GM' },
        { id: 'gn', label: 'Say GN' },
        { id: 'nft', label: 'Deploy NFT' },
        { id: 'token', label: 'Deploy Token' },
        { id: 'counter', label: 'Deploy Counter' },
    ];

    const handleAction = (taskId: string) => {
        if (!isConnected) {
            showToast('Please connect your wallet first', 'info');
            return;
        }

        if (completedTasks.includes(taskId)) return;

        setActiveTask(taskId);

        // Logic for different tasks
        if (taskId === 'counter') {
            try {
                writeContract({
                    address: TEST_COUNTER_ADDRESS, // In a real app, this would be network-specific
                    abi: COUNTER_ABI,
                    functionName: 'increment',
                });
            } catch (err) {
                showToast('Something went wrong', 'error');
                setActiveTask(null);
            }
        } else {
            // Simulate for others for now or add more ABIs
            setTimeout(() => {
                setCompletedTasks(prev => [...prev, taskId]);
                showToast(`${taskId.toUpperCase()} processed (Simulated)`, 'success');
                setActiveTask(null);
            }, 2000);
        }
    };

    const progressPercent = (completedTasks.length / tasks.length) * 100;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="relative w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-[1.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white overflow-hidden"
                    >
                        {/* Condensed Header */}
                        <div className="flex items-center justify-between p-5 pb-3">
                            <div className="flex items-center space-x-3">
                                <div className={`w-9 h-9 ${network.bgClass} rounded-xl flex items-center justify-center overflow-hidden text-white shadow-sm border border-black/5`}>
                                    {typeof network.icon === 'string' ? (
                                        <img src={network.icon} alt={network.name} className="w-full h-full object-cover p-1" />
                                    ) : (
                                        network.icon
                                    )}
                                </div>
                                <h2 className="text-lg font-black text-slate-800 tracking-tight">One-click {network.name}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all"
                            >
                                <X className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>

                        {/* Compact Quick Actions */}
                        <div className="px-5 pb-2">
                            <div className="flex flex-wrap gap-1.5">
                                {tasks.map((task) => (
                                    <button
                                        key={task.id}
                                        onClick={() => handleAction(task.id)}
                                        disabled={activeTask !== null || completedTasks.includes(task.id)}
                                        className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center space-x-1.5 ${completedTasks.includes(task.id)
                                            ? 'bg-emerald-50 text-emerald-500 border border-emerald-100'
                                            : activeTask === task.id
                                                ? 'bg-primary/10 text-primary border border-primary/20 animate-pulse'
                                                : 'bg-slate-50 border border-slate-100 text-slate-500 hover:bg-white'
                                            }`}
                                    >
                                        <span>{task.id === 'counter' && isConfirming ? 'CONFIRMING...' : task.label.split(' ')[1] || task.label}</span>
                                        {completedTasks.includes(task.id) && <Check className="w-2 h-2 stroke-[4px]" />}
                                        {activeTask === task.id && <Loader2 className="w-2 h-2 animate-spin" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Condensed Workflow */}
                        <div className="px-5 py-3">
                            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                                    <span className="text-[9px] font-bold text-slate-400">{completedTasks.length}/{tasks.length} Done</span>
                                </div>

                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercent}%` }}
                                        className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-2.5">
                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            onClick={() => handleAction(task.id)}
                                            className={`flex items-center justify-between p-2 rounded-xl transition-all ${completedTasks.includes(task.id) ? 'bg-emerald-50/50' : 'hover:bg-white cursor-pointer'
                                                } group`}
                                        >
                                            <div className="flex items-center space-x-2.5">
                                                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all flex items-center justify-center ${completedTasks.includes(task.id)
                                                    ? 'border-emerald-500 bg-emerald-500'
                                                    : 'border-slate-200 bg-white group-hover:border-primary'
                                                    }`}>
                                                    {completedTasks.includes(task.id) && <Check className="w-2 h-2 text-white stroke-[3px]" />}
                                                </div>
                                                <span className={`text-xs font-bold transition-colors ${completedTasks.includes(task.id) ? 'text-slate-400 line-through' : 'text-slate-600 group-hover:text-slate-900'
                                                    }`}>
                                                    {task.label}
                                                </span>
                                            </div>
                                            {activeTask === task.id && <Loader2 className="w-3 h-3 text-primary animate-spin" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Compact Reward Section */}
                        <div className="px-5 pb-3">
                            <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center space-x-1.5 mb-1">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reward</span>
                                        <span className="px-1.5 py-0.5 bg-emerald-400 text-[8px] font-black text-white rounded tracking-tighter">LIVE</span>
                                    </div>
                                    <div className="flex items-baseline space-x-1">
                                        <span className="text-2xl font-black text-emerald-500 tracking-tighter">+{completedTasks.length * 15}</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase">pts</span>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-emerald-400 text-white rounded-xl flex items-center justify-center shadow-md shadow-emerald-100 group"
                                >
                                    <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Simplified Footer Actions */}
                        <div className="px-5 pb-5 space-y-2.5">
                            <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white transition-all">
                                <div className="flex items-center space-x-2">
                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Complete all for Bonus</span>
                                </div>
                                <span className="px-2 py-1 bg-amber-50 rounded-lg border border-amber-200 text-[8px] font-black text-amber-600">+50 Pts</span>
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-black uppercase tracking-[0.15em] rounded-2xl shadow-lg transition-all active:scale-[0.98]"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DeploymentModal;
