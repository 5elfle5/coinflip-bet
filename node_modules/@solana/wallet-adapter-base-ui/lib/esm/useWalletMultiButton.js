import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
export function useWalletMultiButton({ onSelectWallet }) {
    const { connect, connected, connecting, disconnect, disconnecting, publicKey, select, wallet, wallets } = useWallet();
    let buttonState;
    if (connecting) {
        buttonState = 'connecting';
    }
    else if (connected) {
        buttonState = 'connected';
    }
    else if (disconnecting) {
        buttonState = 'disconnecting';
    }
    else if (wallet) {
        buttonState = 'has-wallet';
    }
    else {
        buttonState = 'no-wallet';
    }
    const handleConnect = useCallback(() => {
        connect().catch(() => {
            // Silently catch because any errors are caught by the context `onError` handler
        });
    }, [connect]);
    const handleDisconnect = useCallback(() => {
        disconnect().catch(() => {
            // Silently catch because any errors are caught by the context `onError` handler
        });
    }, [disconnect]);
    const handleSelectWallet = useCallback(() => {
        onSelectWallet({ onSelectWallet: select, wallets });
    }, [onSelectWallet, select, wallets]);
    return {
        buttonState,
        onConnect: buttonState === 'has-wallet' ? handleConnect : undefined,
        onDisconnect: buttonState !== 'disconnecting' && buttonState !== 'no-wallet' ? handleDisconnect : undefined,
        onSelectWallet: handleSelectWallet,
        publicKey: publicKey ?? undefined,
        walletIcon: wallet?.adapter.icon,
        walletName: wallet?.adapter.name,
    };
}
//# sourceMappingURL=useWalletMultiButton.js.map