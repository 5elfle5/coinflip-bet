import { type Wallet } from '@solana/wallet-adapter-react';
declare type ButtonState = {
    buttonDisabled: boolean;
    buttonState: 'connecting' | 'connected' | 'has-wallet' | 'no-wallet';
    onButtonClick?: () => void;
    walletIcon?: Wallet['adapter']['icon'];
    walletName?: Wallet['adapter']['name'];
};
export declare function useWalletConnectButton(): ButtonState;
export {};
//# sourceMappingURL=useWalletConnectButton.d.ts.map