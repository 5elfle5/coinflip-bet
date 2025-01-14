import { type Adapter, type WalletError } from '@solana/wallet-adapter-base';
import React, { type ReactNode } from 'react';
export interface WalletProviderProps {
    children: ReactNode;
    wallets: Adapter[];
    autoConnect?: boolean | ((adapter: Adapter) => Promise<boolean>);
    localStorageKey?: string;
    onError?: (error: WalletError, adapter?: Adapter) => void;
}
export declare function WalletProvider({ children, wallets: adapters, autoConnect, localStorageKey, onError, }: WalletProviderProps): React.JSX.Element;
//# sourceMappingURL=WalletProvider.d.ts.map