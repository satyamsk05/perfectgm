import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface NotificationContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within NotificationProvider');
    return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end space-y-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className="pointer-events-auto"
                        >
                            <div className={`
                                flex items-center space-x-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border
                                ${toast.type === 'success' ? 'bg-emerald-50/90 border-emerald-100 text-emerald-800' :
                                    toast.type === 'error' ? 'bg-rose-50/90 border-rose-100 text-rose-800' :
                                        'bg-white/90 border-slate-200 text-slate-800'}
                            `}>
                                <div className={`
                                    p-2 rounded-xl
                                    ${toast.type === 'success' ? 'bg-emerald-100' :
                                        toast.type === 'error' ? 'bg-rose-100' :
                                            'bg-slate-100'}
                                `}>
                                    {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                                        toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                                            <Info className="w-5 h-5" />}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-black tracking-tight">{toast.message}</p>
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 opacity-50" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};
