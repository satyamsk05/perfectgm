import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';
import { QueryClient } from "@tanstack/react-query";
import { defineChain } from 'viem';

// Define Ink Mainnet
export const ink = defineChain({
    id: 57073,
    name: 'Ink',
    network: 'ink',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc-gel.inkonchain.com'],
        },
        public: {
            http: ['https://rpc-gel.inkonchain.com'],
        },
    },
    blockExplorers: {
        default: { name: 'Ink Explorer', url: 'https://explorer.inkonchain.com' },
    },
});

export const config = getDefaultConfig({
    appName: 'GM Deploy',
    projectId: 'YOUR_PROJECT_ID', // Placeholder, user can replace if needed
    chains: [ink, base, mainnet, polygon, optimism, arbitrum],
    transports: {
        [ink.id]: http(),
        [base.id]: http(),
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
    },
});

export const queryClient = new QueryClient();
