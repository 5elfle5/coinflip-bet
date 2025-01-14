import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
export function useWalletDisconnectButton() {
    const { disconnecting, disconnect, wallet } = useWallet();
    let buttonState;
    if (disconnecting) {
        buttonState = 'disconnecting';
    }
    else if (wallet) {
        buttonState = 'has-wallet';
    }
    else {
        buttonState = 'no-wallet';
    }
    const handleDisconnectButtonClick = useCallback(() => {
        disconnect().catch(() => {
            // Silently catch because any errors are caught by the context `onError` handler
        });
    }, [disconnect]);
    return {
        buttonDisabled: buttonState !== 'has-wallet',
        buttonState,
        onButtonClick: buttonState === 'has-wallet' ? handleDisconnectButtonClick : undefined,
        walletIcon: wallet?.adapter.icon,
        walletName: wallet?.adapter.name,
    };
}
//# sourceMappingURL=useWalletDisconnectButton.js.map