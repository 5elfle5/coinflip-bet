import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import React from 'react';
import type { ButtonProps } from './Button.js';
declare type Props = ButtonProps & {
    labels: Omit<{
        [TButtonState in ReturnType<typeof useWalletMultiButton>['buttonState']]: string;
    }, 'connected' | 'disconnecting'> & {
        'copy-address': string;
        copied: string;
        'change-wallet': string;
        disconnect: string;
    };
};
export declare function BaseWalletMultiButton({ children, labels, ...props }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=BaseWalletMultiButton.d.ts.map