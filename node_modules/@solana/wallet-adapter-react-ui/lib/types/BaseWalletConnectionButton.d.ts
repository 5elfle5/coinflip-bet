import type { WalletName } from '@solana/wallet-adapter-base';
import React from 'react';
import { Button } from './Button.js';
declare type Props = React.ComponentProps<typeof Button> & {
    walletIcon?: string;
    walletName?: WalletName;
};
export declare function BaseWalletConnectionButton({ walletIcon, walletName, ...props }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=BaseWalletConnectionButton.d.ts.map