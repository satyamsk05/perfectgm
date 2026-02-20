import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useChainId } from 'wagmi';
import { base } from 'wagmi/chains';
import { useNotification } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';
import { triggerPataka } from '../utils/confetti';

const CONTRACT_ADDRESS = '0x775b45CebEFcb2FA8393ea5D96A6377e6897636C';

const GMStreakHeader: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { showToast } = useNotification();
    const { t } = useLanguage();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();
    const [streak, setStreak] = useState(0);
    const [isGmAvailable, setIsGmAvailable] = useState(true);

    const { writeContract, data: hash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
    const processedHashRef = useRef<string | null>(null);

    // Load streak from localStorage
    useEffect(() => {
        const savedStreak = localStorage.getItem(`gm_streak_${address}`);
        const savedLastDate = localStorage.getItem(`gm_last_date_${address}`);

        if (savedStreak && savedLastDate) {
            const lastDate = new Date(savedLastDate);
            const now = new Date();
            const diffInHours = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);

            if (diffInHours < 24) {
                // Already GM'd today or less than 24h passed
                setStreak(parseInt(savedStreak));

                // Check if it's actually the same calendar day
                if (lastDate.toDateString() === now.toDateString()) {
                    setIsGmAvailable(false);
                }
            } else if (diffInHours < 48) {
                // Within 48 hours, streak continues
                setStreak(parseInt(savedStreak));
                setIsGmAvailable(true);
            } else {
                // Streak broken
                setStreak(0);
                localStorage.setItem(`gm_streak_${address}`, '0');
                setIsGmAvailable(true);
            }
        }
    }, [address, isSuccess]);

    const handleSendGm = async () => {
        if (!isConnected) {
            showToast('Connect wallet to send GM', 'info');
            return;
        }

        if (chainId !== base.id) {
            showToast('Switching to Base Mainnet...', 'info');
            switchChain({ chainId: base.id });
            return;
        }

        try {
            writeContract({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: [{ "inputs": [], "name": "gm", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
                functionName: 'gm',
            });
        } catch (error) {
            console.error('GM Error:', error);
            showToast('Transaction failed', 'error');
        }
    };

    useEffect(() => {
        if (isSuccess && isConnected && hash && processedHashRef.current !== hash) {
            processedHashRef.current = hash;
            const now = new Date();
            setStreak(prev => {
                const newStreak = prev + 1;
                localStorage.setItem(`gm_streak_${address}`, newStreak.toString());
                localStorage.setItem(`gm_last_date_${address}`, now.toISOString());
                showToast(t.gmSuccess, 'success');
                triggerPataka(); // BLAST!
                return newStreak;
            });
            setIsGmAvailable(false);
        }
    }, [isSuccess, isConnected, address, showToast, hash, t]);

    if (!isConnected) return null;

    return (
        <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-slate-200/50 shadow-sm">
            <div className="flex items-center space-x-2">
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={streak}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative z-10"
                        >
                            <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-slate-300'}`} />
                        </motion.div>
                    </AnimatePresence>
                    {streak > 0 && (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-orange-400 blur-md rounded-full -z-10"
                        />
                    )}
                </div>
                <span className="text-sm font-black text-slate-800 tracking-tighter tabular-nums">
                    {streak} <span className="text-[10px] text-slate-400 uppercase tracking-widest ml-0.5">{t.streak || 'streak'}</span>
                </span>
            </div>

            <div className="w-px h-4 bg-slate-200 mx-1" />

            <button
                onClick={handleSendGm}
                disabled={!isGmAvailable || isPending || isConfirming}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${!isGmAvailable
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-primary text-white shadow-lg shadow-blue-100 hover:shadow-xl hover:-translate-y-0.5 active:scale-95'
                    }`}
            >
                {isPending || isConfirming ? (
                    <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : !isGmAvailable ? (
                    <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Done</span>
                    </>
                ) : (
                    <>
                        <Send className="w-3 h-3" />
                        <span>Send GM</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default GMStreakHeader;
