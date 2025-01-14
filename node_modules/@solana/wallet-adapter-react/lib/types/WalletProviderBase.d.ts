import { type Adapter, type WalletError, type WalletName } from '@solana/wallet-adapter-base';
import React, { type ReactNode } from 'react';
export interface WalletProviderBaseProps {
    children: ReactNode;
    wallets: Adapter[];
    adapter: Adapter | null;
    isUnloadingRef: React.RefObject<boolean>;
    onAutoConnectRequest?: () => Promise<void>;
    onConnectError: () => void;
    onError?: (error: WalletError, adapter?: Adapter) => void;
    onSelectWallet: (walletName: WalletName | null) => void;
}
export declare function WalletProviderBase({ children, wallets: adapters, adapter, isUnloadingRef, onAutoConnectRequest, onConnectError, onError, onSelectWallet, }: WalletProviderBaseProps): React.JSX.Element;
//# sourceMappingURL=WalletProviderBase.d.ts.map