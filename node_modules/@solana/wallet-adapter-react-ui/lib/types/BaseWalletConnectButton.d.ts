import { useWalletConnectButton } from '@solana/wallet-adapter-base-ui';
import React from 'react';
import type { ButtonProps } from './Button.js';
declare type Props = ButtonProps & {
    labels: {
        [TButtonState in ReturnType<typeof useWalletConnectButton>['buttonState']]: string;
    };
};
export declare function BaseWalletConnectButton({ children, disabled, labels, onClick, ...props }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=BaseWalletConnectButton.d.ts.map