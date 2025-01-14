import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
export function useWalletConnectButton() {
    const { connect, connected, connecting, wallet } = useWallet();
    let buttonState;
    if (connecting) {
        buttonState = 'connecting';
    }
    else if (connected) {
        buttonState = 'connected';
    }
    else if (wallet) {
        buttonState = 'has-wallet';
    }
    else {
        buttonState = 'no-wallet';
    }
    const handleConnectButtonClick = useCallback(() => {
        connect().catch(() => {
            // Silently catch because any errors are caught by the context `onError` handler
        });
    }, [connect]);
    return {
        buttonDisabled: buttonState !== 'has-wallet',
        buttonState,
        onButtonClick: buttonState === 'has-wallet' ? handleConnectButtonClick : undefined,
        walletIcon: wallet?.adapter.icon,
        walletName: wallet?.adapter.name,
    };
}
//# sourceMappingURL=useWalletConnectButton.js.map